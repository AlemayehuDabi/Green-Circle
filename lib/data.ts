import type { Startup, SubmissionStatus } from "@/types"

export const mockStartups: Startup[] = [
  {
    id: 1,
    name: "EthioPay",
    logo: "/placeholder.svg?height=60&width=60&text=EP",
    sector: "FinTech",
    location: "Addis Ababa",
    description: "Digital payment solutions for Ethiopian businesses and consumers",
    foundedYear: 2022,
    employees: "11-50",
    website: "https://ethiopay.com",
    verified: true,
    founders: [
      {
        name: "Meron Tadesse",
        role: "CEO & Co-founder",
        bio: "Former software engineer at Commercial Bank of Ethiopia with 8 years of experience in financial technology.",
        image: "/placeholder.svg?height=60&width=60&text=MT",
      },
      {
        name: "Daniel Bekele",
        role: "CTO & Co-founder",
        bio: "Tech entrepreneur with expertise in blockchain and mobile payment systems.",
        image: "/placeholder.svg?height=60&width=60&text=DB",
      },
    ],
    pitch:
      "Ethiopia has over 120 million people, but only 35% have access to formal banking services. EthioPay bridges this gap by providing a comprehensive digital payment ecosystem that works on any mobile device.",
    achievements: [
      "Processed $2M+ in transactions",
      "10,000+ active users",
      "Partnership with 3 major banks",
      "Winner of Ethiopia Innovation Award 2023",
    ],
    contact: {
      email: "hello@ethiopay.com",
      phone: "+251-911-123456",
    },
  },
  {
    id: 2,
    name: "AgriTech Solutions",
    logo: "/placeholder.svg?height=60&width=60&text=AS",
    sector: "Agriculture",
    location: "Bahir Dar",
    description: "Smart farming technology and IoT solutions for Ethiopian farmers",
    foundedYear: 2021,
    employees: "1-10",
    verified: true,
    founders: [
      {
        name: "Alemayehu Worku",
        role: "Founder & CEO",
        bio: "Agricultural engineer with 10 years of experience in sustainable farming practices.",
        image: "/placeholder.svg?height=60&width=60&text=AW",
      },
    ],
    pitch: "Revolutionizing Ethiopian agriculture through smart farming technology and data-driven insights.",
    achievements: ["Served 500+ farmers", "Increased crop yields by 30%", "Partnership with Ministry of Agriculture"],
    contact: {
      email: "info@agritech.et",
      phone: "+251-911-234567",
    },
  },
  {
    id: 3,
    name: "EduConnect",
    logo: "/placeholder.svg?height=60&width=60&text=EC",
    sector: "Education",
    location: "Mekelle",
    description: "Online learning platform connecting Ethiopian students with quality education",
    foundedYear: 2023,
    employees: "11-50",
    verified: true,
    founders: [
      {
        name: "Hanan Mohammed",
        role: "Founder & CEO",
        bio: "Former teacher and education technology specialist with passion for accessible learning.",
        image: "/placeholder.svg?height=60&width=60&text=HM",
      },
    ],
    pitch:
      "Making quality education accessible to every Ethiopian student through innovative online learning solutions.",
    achievements: ["5,000+ active students", "200+ courses available", "Partnership with 10 universities"],
    contact: {
      email: "contact@educonnect.et",
      phone: "+251-911-345678",
    },
  },
]

export const mockSubmissions: SubmissionStatus[] = [
  {
    id: 1,
    name: "TechSolutions Ethiopia",
    founder: "Sarah Alemayehu",
    sector: "FinTech",
    location: "Addis Ababa",
    submittedDate: "2024-01-15",
    status: "pending",
    fayda_verified: true,
  },
  {
    id: 2,
    name: "GreenFarm Tech",
    founder: "Dawit Bekele",
    sector: "Agriculture",
    location: "Bahir Dar",
    submittedDate: "2024-01-14",
    status: "under_review",
    fayda_verified: true,
  },
  {
    id: 3,
    name: "EduPlatform",
    founder: "Hanan Mohammed",
    sector: "Education",
    location: "Mekelle",
    submittedDate: "2024-01-13",
    status: "pending",
    fayda_verified: false,
  },
]
