import * as jose from 'jose';

// exchange code for token
export async function exchangeFaydaCodeForToken(code: string) {
  try {
    const signedJwt = await generateSignedJwt(
      process.env.NEXT_PUBLIC_CLIENT_ID!
    );
    // debug
    console.log('Generated signedJwt:', signedJwt);
    console.log('Environment variables check:', {
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
      redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI!,
      tokenEndpoint: process.env.TOKEN_ENDPOINT!,
      clientAssertionType: process.env.CLIENT_ASSERTION_TYPE!, // Ensure this is correct
    });

    const clientAssertionType = process.env.CLIENT_ASSERTION_TYPE!;

    const getVerifier = () => {
      return sessionStorage.getItem('code_verifier');
    };

    const codeVerifier = getVerifier();

    if (!codeVerifier) {
      throw new Error('Missing code_verifier in sessionStorage');
    }

    const sentData = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID!,
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI!,
      client_assertion_type: clientAssertionType, // Use the explicitly defined type
      client_assertion: signedJwt,
      code_verifier: codeVerifier, // Ensure this matches what was sent in auth request
    });

    // fetch token
    const res = await fetch(`${process.env.TOKEN_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: sentData,
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(
        'Token exchange failed with status:',
        res.status,
        'Error:',
        errorText
      );
      console.log('Full response object:', res);
      throw new Error(`Token exchange failed: ${errorText}`);
    }

    const data = await res.json();
    sessionStorage.removeItem('code_verifier');
    console.log('Access token:', data.access_token);
    return data;
  } catch (error) {
    console.error('Fayda auth error during token exchange:', error);
    throw error; // Re-throw to propagate the error
  }
}

// fetch user
export async function getUserInfo(accessToken: string) {
  try {
    const res = await fetch(`${process.env.USERINFO_ENDPOINT}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      const errorText = await res.text();
      console.error('Failed to fetch user info:', errorText);
      throw new Error(`Failed to fetch user info: ${errorText}`);
    }

    // *** FIX START ***
    // The user info endpoint returns a JWT string, not a JSON object.
    const userInfoJwtToken = await res.text();
    // *** FIX END ***

    console.log('User info response (raw JWT):', userInfoJwtToken); // Log the raw JWT
    const decodedUserInfo = decodeUserInfoResponse(userInfoJwtToken);
    console.log('Decoded user info:', decodedUserInfo);
    return decodedUserInfo;
  } catch (error) {
    console.error('Fayda auth error during user info retrieval:', error);
    throw error;
  }
}

const generateSignedJwt = async (clientId: string) => {
  const header = {
    alg: 'RS256',
    typ: 'JWT',
  };
  const payload = {
    iss: clientId,
    sub: clientId,
    aud: 'https://esignet.ida.fayda.et/v1/esignet/oauth/v2/token',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 300, // 5 min expiry
  };
  let privateKey;
  try {
    // Decode base64 PRIVATE_KEY env, then parse JSON
    const decodedKey = Buffer.from(process.env.PRIVATE_KEY!, 'base64').toString(
      'utf-8'
    );
    const jwkObject = JSON.parse(decodedKey);

    privateKey = await jose.importJWK(jwkObject, 'RS256');
  } catch (error) {
    console.error('Error decoding or importing PRIVATE_KEY as JWK:', error);
    throw new Error(
      'Invalid PRIVATE_KEY format or content. Please check your environment variable.'
    );
  }
  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader(header)
    .setIssuedAt()
    .setExpirationTime('5m')
    .sign(privateKey);
  return jwt;
};

const decodeUserInfoResponse = (userinfoJwtToken: string) => {
  try {
    // For user info JWT, Fayda documentation suggests decoding without signature verification
    // if you are just extracting claims. If you need to verify the signature,
    // you would need Fayda's public key.
    // For now, we'll use jose.decodeJwt which does not verify signature by default.
    return jose.decodeJwt(userinfoJwtToken);
  } catch (error) {
    console.error('Error decoding JWT user info:', error);
    return null;
  }
};
