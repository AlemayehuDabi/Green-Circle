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
```
MONGODB_URI="mongodb+srv://ethiopia-startup:DC9INGrNIEwRpNME@ethiopia-startup.wntchjs.mongodb.net/?retryWrites=true&w=majority&appName=ethiopia-startup"
BETTER_AUTH_SECRET=WAO90U0TadhEll77yCpnzGrHbJQGrlVX
BETTER_AUTH_URL=http://localhost:3000 #Base URL of your app
NEXT_PUBLIC_CLIENT_ID=GCE-a3iRabzdfqh17DH8LaxhhZKvtarwHc1X3H6mn1k
NEXT_PUBLIC_REDIRECT_URI=http://localhost:3000/callback
NEXT_PUBLIC_AUTHORIZATION_ENDPOINT=https://esignet.ida.fayda.et/authorize
TOKEN_ENDPOINT=https://esignet.ida.fayda.et/v1/esignet/oauth/v2/token
USERINFO_ENDPOINT=https://esignet.ida.fayda.et/v1/esignet/oidc/userinfo
EXPIRATION_TIME=15
ALGORITHM=RS256
CLIENT_ASSERTION_TYPE=urn:ietf:params:oauth:client-assertion-type:jwt-bearer
PRIVATE_KEY='ew0KICAia3R5IjogIlJTQSIsDQogICJrZXlfb3BzIjogWw0KICAgICJzaWduIg0KICBdLA0KICAia2lkIjogIjFkZGM2YTNkLTFmMGItNGQ
zNy1hZmQ1LTVmZTdhMjcwOWQyNSIsDQogICJkIjogIkctcTFXVDBERldCOHJ0bjBIZks1eDdqOEY5QWtDQ0Y3Y1NCdXNYRzNlWEY1NE5XZUpXVFBRdVRDdVFLcExCYUZ
GdWozcktoZHhZVjZLNWptMFBaekdpT3VfZnlHamgtbjBxd3hSaVp6aWN3RVFaQjEzZjN1ekhUek1jWHNPekZscTVSZGFaOU80Unh0RGRKMDJPVFlkT2RocTdIazdhNjd
aUVZHM3g0OS1BbXNvUVJDeUpuak5aZnNiSFJQZDQycGhhaVd4c09lWGd1U2NBMlNSX0VYMzh2bm5vY3BpejZ1MmtyV1VCRUFNQk1Cc3ZXY1BwMzNUVGdFSFd4WFJRZE5
HQkkxUHBkS3ZEQ001UHFON2xneDFVZm5Ic0o1UzhNVHdnTktPbVFLUm1MOVFUckpteTFDRzhSdG9ETW1Ea0syczgzOExyeVA4QWVrckdxRXk1RExrUSIsDQogICJuIjo
gIjBiZjNxaVlvTnBGZnBLUHlKWWJielZfR1JoVEZiOG1rU1plSFpDS0pNSUUyYWR3TmVDbnNSWnI4UzctOXd6Q0M2dTYwT01fVVJnMWZPWHpYeTFXdjkwZElBRmFGNDA
2ekw2ZlpHWFo3dVJkTkM4SS1LaUh4X0I2Q0JFSWthM0t6OTlmaTFOT0hXUy0zX3d2dTloS1YweWczOWo2eW9zcmNFMFVEeElXNWhleVhaN3dmRkJCZFJLaW5IbFZlQkx
NbkVwYVZZcjQ3c2VBbi1BNlFtMUpZaHNneTRrNS13VEpMYmZraTcxcVpGMEw5NS1ZRHphNTZGd213QXVwTEhpMUk2U082ZWJhX2JPSnR2OENyMVZNa3gyVWVPenZjaHp
yckYtTkVtSzFjZjhnclhxY2hBUnhqZkpGb19FaVYyNXBzS2ZMNVZ0S09kbkJ5cGNWWDc3TW1vUSIsDQogICJlIjogIkFRQUIiLA0KICAicCI6ICJfT3k1Y1prbjAwdnU
5RnByT2dKZURSMzZra1dyUENHQ1lRQ25xQllzMlF5V0JlYk9rUUhKejNySVlpeXJBNjg1cEotVlNscTF0ZHRYZ1ZSTFMzZk1ka3dLcTJwTVRJLXY0SDFoRnBOejZMN0F
qcVl4eFlnbThYOV9zQjhQejRaZlY2SjlsaWt5NVIyQzBnZzFqVXlNQS1XRml2XzFmSVNqazNoMUFaanVoQnMiLA0KICAicSI6ICIxRVRCaWdIQlZ5bVVialN4VlJPcno
4ci04dEV0bkJpenJ1cEJaWHVLTm85VWxaeVR3MnZVTE04YkkwV3ktdWdBWUVSMlR2c3VsaUM0SVNRNFJlczBDaWJOVDlROTdIdHhieXB4enZzSDlaQmx3SkZhbS10WkF
jZWFSVkE3WjFlZ1cycXpmckltWF9ERDVaUHJhVHlFZGUweUotUklDaTRsQUdTZlNfTFZVX00iLA0KICAiZHAiOiAiQndVZkJJc21zdE9wdHppSFAxM3ZkRmVfcTYycFd
ncm9Ebjh4S0JZdGVuekI4VG45dzhLVDhtRkxESWFHM0p4UmNrTkhwbi1zQ1hja0Q1X2lVeDdwR3VOemJGeVA3NVFSWXA2NFFpTW5sVzh0OHdlajNBS3lhZ09LN0wxXzk
5ZVg3OXVfdHBwQUltSFdUclFSb0hGZWRZRTZXcWhPRFAyMWVKTmdWQUlGcEw4IiwNCiAgImRxIjogIjAyLXBXTTVteDJ1amJpTU9nTEFYYy1QQUVCNU1VREJLeXZDTU0
0bmJJbjJpdzJRenkzU2M1QVZvQXJwcWpZS0szVmxVZjFlMEQ5YUhrbnVCa2lPMnNtWDBISkJOSGtIWHUtT0xlYUNUVFFlSVUwaDEtTmwwejFFRFdnZVJKRjhrVy1yczR
FYVQ4dnpnSk00eXI2Q1lVTjcwRnNoTS1kYjlCR2MyUlhDZERnRSIsDQogICJxaSI6ICJMbXpvV3JvLVF4em1xSDVQNmg2LVhhS3NkYUxkX2VNTjMybXBkajN5VE1xTTR
faVNTdzUzeW1TcUpyVkthcS05eHltTXVYTVJzZHlXN0Y2Y1FBTnhadGZkeUFRYXpFWk1pbWtfa04tQklQMmtuc3hHcnh6RGdnZ1NGVGNaa3RZWERLUVcxUExvbTJqYkg
0WXFjN1U1Q3NDekFRRnlvZEtjazdFOVZrNVNjWDAiDQp9'
```


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
    
