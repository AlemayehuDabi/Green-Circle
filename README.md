# Project Title: Ethiopia Startup — Verified Startup Ecosystem Platform

## Contributors
- Alemayehu Dabi *(Registered participant)*
- Bemnet Mussa *(Registered participant)*

## Project Synopsis

### Problem Statement
Ethiopian startups lack visibility, official recognition, and access to government support provided under the new Startup Law. There’s no centralized digital system for identifying real startups or connecting them with government programs or diaspora support. As a result, trust is low and growth is slow.

### Planned Solution
We will build a web platform where:
- Startups register and verify team identity using Fayda Digital ID.
- Verified startups submit applications to be officially recognized under the startup law.
- Approved startups get listed publicly as “Verified Ethiopian Startups.”
- Diaspora, investors, and organizations can browse startups, offer investment, mentorship, or collaboration.

### Expected Outcome
- Trusted, visible ecosystem of verified Ethiopian startups.
- A centralized, government-aligned database.
- Simplified access to legal and financial benefits for startups.
- Improved investment confindece and mentorship from diaspora and local partners.
- Reduced fraud and duplication via digital ID-based validation.

### Fayda's Role
Fayda will be used to:
- Verify startup founders' identities during registration.
- Build trust in the authenticity of submitted startups.
- Prevent fraud and duplication.

## Tech Stack
- Frontend: **Next.js** — Web framework
- Authentication: VeriFayda OIDC integration
- Database: MongoDB
- Deployment: Railway or Vercel (TBD)
- Version Control: GitHub



## Installation and Deployment

Follow these instructions to set up and run the project locally or deploy it using Docker.

### Prerequisites
*   Node.js (v20 or later recommended)
*   npm or Yarn
*   Docker (for Docker deployment)

### 1. Clone the Repository
\`\`\`bash
git clone https://github.com/BemnetMussa/Startup-Ethiopia.git
cd Startup-Ethiopia # Navigate into your project directory
\`\`\`

### 2. Install Dependencies
Using npm:
\`\`\`bash
npm install
\`\`\`
Or using Yarn:
\`\`\`bash
yarn install
\`\`\`

### 3. Environment Variables
Create a `.env.local` file in the root of your project and add the following environment variables. These are crucial for the application's functionality, especially for database connection and Fayda OIDC integration.

\`\`\`
# Database Connection
MONGODB_URI="mongodb+srv://<your-username>:<your-password>@ethiopia-startup.wntchjs.mongodb.net/?retryWrites=true&w=majority&appName=ethiopia-startup"

# Better Auth Configuration (if applicable, ensure these match your auth solution)
BETTER_AUTH_SECRET="<your_super_strong_random_secret>" # Generate a strong, random string for production
BETTER_AUTH_URL="http://localhost:3000" # Base URL of your app (e.g., http://localhost:3000 or your deployed domain)

# Fayda e-Signet OIDC Configuration (Client-side public variables)
NEXT_PUBLIC_CLIENT_ID="<your_fayda_client_id>" # Your client ID from Fayda e-Signet
NEXT_PUBLIC_REDIRECT_URI="http://localhost:3000/callback" # Your registered redirect URI for Fayda

# Fayda e-Signet OIDC Configuration (Server-side private variables)
NEXT_PUBLIC_AUTHORIZATION_ENDPOINT="https://esignet.ida.fayda.et/authorize"
TOKEN_ENDPOINT="https://esignet.ida.fayda.et/v1/esignet/oauth/v2/token"
USERINFO_ENDPOINT="https://esignet.ida.fayda.et/v1/esignet/oidc/userinfo"
EXPIRATION_TIME=15 # Token expiration time in minutes
ALGORITHM=RS256 # JWT signing algorithm
CLIENT_ASSERTION_TYPE=urn:ietf:params:oauth:client-assertion-type:jwt-bearer
PRIVATE_KEY='<your_base64_encoded_private_key>' # **CRITICAL: Your private key for client assertion. Handle with extreme care.**
\`\`\`

**Important Notes on Environment Variables:**
*   **`MONGODB_URI`**: Replace `<your-username>` and `<your-password>` with your actual MongoDB Atlas credentials.
*   **`BETTER_AUTH_SECRET`**: This should be a long, random, and highly secure string. Never commit this directly to version control.
*   **`PRIVATE_KEY`**: This is a highly sensitive key used for signing JWTs for client assertions with Fayda. It must be kept absolutely secure and never exposed publicly. Ensure it's correctly base64 encoded if required by your authentication library.

### 4. Running the App Locally
To run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`
Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### 5. Deploying the App using Docker
Ensure Docker is installed and running on your system.

#### Build and Run with Docker Compose
This is the recommended method for easy setup and deployment.
\`\`\`bash
docker-compose up --build -d
\`\`\`
*   `--build`: Builds the Docker image from the `Dockerfile`.
*   `-d`: Runs the containers in detached mode (in the background).

The application will be accessible at [http://localhost:3000](http://localhost:3000).

#### Stop Docker Containers
To stop the running containers:
\`\`\`bash
docker-compose down
\`\`\`

#### Manual Docker Build and Run (Alternative)
You can also build and run the Docker image manually:
1.  **Build the Docker image:**
    \`\`\`bash
    docker build -t ethiopia-startup-app .
    \`\`\`
2.  **Run the Docker container:**
    \`\`\`bash
    docker run -p 3000:3000 ethiopia-startup-app
    
