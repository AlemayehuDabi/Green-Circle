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
    
