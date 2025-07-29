import * as jose from 'jose';

// exchange code for token
export async function exchangeFaydaCodeForToken(code: string) {
  const signedJwt = await generateSignedJwt(process.env.NEXT_PUBLIC_CLIENT_ID!);

  const res = await fetch(`${process.env.TOKEN_ENDPOINT}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID!,
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI!,
      client_assertion_type: process.env.CLIENT_ASSERTION_TYPE!,
      client_assertion: signedJwt,
      code_verifier: 'dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk',
    }),
  });

  if (!res.ok) throw new Error('Token exchange failed');

  const data = await res.json();
  const { access_token } = data;
  console.log('Access token:', access_token);

  return res.json();
}

// fetch user
export async function getUserInfo(accessToken: string) {
  const res = await fetch(`${process.env.USERINFO_ENDPOINT}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) throw new Error('Failed to fetch user info');

  const data = await res.json();
  const { userInfoResponse } = data;

  console.log('User info response:', userInfoResponse);
  const decodedUserInfo = await decodeUserInfoResponse(userInfoResponse);
  console.log('Decoded user info:', decodedUserInfo);

  return res.json();
}

// jwt
const generateSignedJwt = async (clientId: string) => {
  const header = {
    alg: 'RS256',
    typ: 'JWT',
  };

  const payload = {
    iss: clientId,
    sub: clientId,
    aud: process.env.REACT_APP_TOKEN_ENDPOINT,
  };

  const decodeKey = Buffer.from(process.env.PRIVATE_KEY!, 'base64')?.toString();
  const jwkObject = JSON.parse(decodeKey);
  const privateKey = await jose.importJWK(jwkObject, 'RS256');

  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader(header)
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(privateKey);

  return jwt;
};

const decodeUserInfoResponse = async (userinfoJwtToken: string) => {
  try {
    return jose.decodeJwt(userinfoJwtToken);
  } catch (error) {
    console.error('Error decoding JWT user info:', error);
    return null;
  }
};
