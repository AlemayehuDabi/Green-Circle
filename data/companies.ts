export interface FundingRound {
    date: string;
    investor: string;
    amount: string;
    roundType: string;
  }
  
  export interface Executive {
    name: string;
    role: string;
    since: string;
  }
  
  export interface MonthlyData {
    month: string;
    revenue: number;
    activeUsers: number;
    registeredUsers: number;
  }
  
  export interface Company {
    id: string;
    name: string;
    logo: string;
    sector: string;
    status: "Verified" | "Pending" | "Under Review";
    revenueStage: string;
    lastFunding: string;
    foundedDate: string;
    verificationScore: number;
    kpis: {
      annualRevenue: string;
      employeeCount: number;
      employeeTrend: "up" | "down" | "neutral";
      marketShare: string;
      burnRate: string;
    };
    monthlyData: MonthlyData[];
    fundingRounds: FundingRound[];
    executives: Executive[];
    complianceDocuments: { name: string; status: string; date: string }[];
  }
  
  export const companies: Company[] = [
    {
      id: "chapa",
      name: "Chapa",
      logo: "C",
      sector: "Fintech",
      status: "Verified",
      revenueStage: "Series A",
      lastFunding: "2024-03-15",
      foundedDate: "2020",
      verificationScore: 98,
      kpis: {
        annualRevenue: "ETB 450M",
        employeeCount: 127,
        employeeTrend: "up",
        marketShare: "23.5%",
        burnRate: "ETB 8.2M",
      },
      monthlyData: [
        { month: "Jan", revenue: 28, activeUsers: 45000, registeredUsers: 120000 },
        { month: "Feb", revenue: 32, activeUsers: 52000, registeredUsers: 135000 },
        { month: "Mar", revenue: 35, activeUsers: 58000, registeredUsers: 148000 },
        { month: "Apr", revenue: 38, activeUsers: 64000, registeredUsers: 162000 },
        { month: "May", revenue: 42, activeUsers: 71000, registeredUsers: 178000 },
        { month: "Jun", revenue: 45, activeUsers: 78000, registeredUsers: 195000 },
        { month: "Jul", revenue: 48, activeUsers: 85000, registeredUsers: 215000 },
        { month: "Aug", revenue: 52, activeUsers: 92000, registeredUsers: 238000 },
        { month: "Sep", revenue: 55, activeUsers: 98000, registeredUsers: 260000 },
        { month: "Oct", revenue: 58, activeUsers: 105000, registeredUsers: 285000 },
        { month: "Nov", revenue: 62, activeUsers: 112000, registeredUsers: 310000 },
        { month: "Dec", revenue: 68, activeUsers: 120000, registeredUsers: 340000 },
      ],
      fundingRounds: [
        { date: "2024-03-15", investor: "Partech Africa", amount: "$15M", roundType: "Series A" },
        { date: "2022-08-20", investor: "Saviu Ventures", amount: "$2.5M", roundType: "Seed" },
        { date: "2021-03-10", investor: "Angel Investors", amount: "$500K", roundType: "Pre-Seed" },
      ],
      executives: [
        { name: "Israel Goytom", role: "CEO & Founder", since: "2020" },
        { name: "Bethel Amanuel", role: "CTO", since: "2020" },
        { name: "Sara Tesfaye", role: "CFO", since: "2022" },
      ],
      complianceDocuments: [
        { name: "NBE License", status: "Active", date: "2023-06-15" },
        { name: "Tax Clearance", status: "Active", date: "2024-01-20" },
        { name: "Audit Report 2023", status: "Submitted", date: "2024-02-28" },
      ],
    },
    {
      id: "ride",
      name: "Ride",
      logo: "R",
      sector: "Mobility",
      status: "Verified",
      revenueStage: "Series B",
      lastFunding: "2023-11-08",
      foundedDate: "2019",
      verificationScore: 95,
      kpis: {
        annualRevenue: "ETB 680M",
        employeeCount: 245,
        employeeTrend: "up",
        marketShare: "41.2%",
        burnRate: "ETB 15.5M",
      },
      monthlyData: [
        { month: "Jan", revenue: 42, activeUsers: 85000, registeredUsers: 320000 },
        { month: "Feb", revenue: 45, activeUsers: 92000, registeredUsers: 345000 },
        { month: "Mar", revenue: 48, activeUsers: 98000, registeredUsers: 370000 },
        { month: "Apr", revenue: 52, activeUsers: 105000, registeredUsers: 395000 },
        { month: "May", revenue: 55, activeUsers: 112000, registeredUsers: 420000 },
        { month: "Jun", revenue: 58, activeUsers: 120000, registeredUsers: 448000 },
        { month: "Jul", revenue: 62, activeUsers: 128000, registeredUsers: 475000 },
        { month: "Aug", revenue: 65, activeUsers: 135000, registeredUsers: 502000 },
        { month: "Sep", revenue: 68, activeUsers: 142000, registeredUsers: 530000 },
        { month: "Oct", revenue: 72, activeUsers: 150000, registeredUsers: 560000 },
        { month: "Nov", revenue: 75, activeUsers: 158000, registeredUsers: 590000 },
        { month: "Dec", revenue: 80, activeUsers: 165000, registeredUsers: 620000 },
      ],
      fundingRounds: [
        { date: "2023-11-08", investor: "EchoVC Partners", amount: "$25M", roundType: "Series B" },
        { date: "2022-04-15", investor: "Partech Africa", amount: "$8M", roundType: "Series A" },
        { date: "2020-09-22", investor: "Local Angels", amount: "$1.2M", roundType: "Seed" },
      ],
      executives: [
        { name: "Samrawit Fikru", role: "CEO & Founder", since: "2019" },
        { name: "Dawit Bekele", role: "COO", since: "2019" },
        { name: "Hanna Mesfin", role: "VP Engineering", since: "2021" },
      ],
      complianceDocuments: [
        { name: "Transport License", status: "Active", date: "2023-08-10" },
        { name: "Tax Clearance", status: "Active", date: "2024-01-15" },
        { name: "Insurance Certificate", status: "Active", date: "2024-03-01" },
      ],
    },
    {
      id: "telebirr",
      name: "Telebirr",
      logo: "T",
      sector: "Fintech",
      status: "Verified",
      revenueStage: "Enterprise",
      lastFunding: "2021-05-01",
      foundedDate: "2021",
      verificationScore: 99,
      kpis: {
        annualRevenue: "ETB 2.8B",
        employeeCount: 520,
        employeeTrend: "up",
        marketShare: "67.8%",
        burnRate: "ETB 45M",
      },
      monthlyData: [
        { month: "Jan", revenue: 180, activeUsers: 2800000, registeredUsers: 8500000 },
        { month: "Feb", revenue: 195, activeUsers: 3100000, registeredUsers: 9200000 },
        { month: "Mar", revenue: 210, activeUsers: 3400000, registeredUsers: 9800000 },
        { month: "Apr", revenue: 225, activeUsers: 3700000, registeredUsers: 10500000 },
        { month: "May", revenue: 240, activeUsers: 4000000, registeredUsers: 11200000 },
        { month: "Jun", revenue: 255, activeUsers: 4300000, registeredUsers: 12000000 },
        { month: "Jul", revenue: 270, activeUsers: 4600000, registeredUsers: 12800000 },
        { month: "Aug", revenue: 285, activeUsers: 4900000, registeredUsers: 13600000 },
        { month: "Sep", revenue: 300, activeUsers: 5200000, registeredUsers: 14500000 },
        { month: "Oct", revenue: 315, activeUsers: 5500000, registeredUsers: 15400000 },
        { month: "Nov", revenue: 330, activeUsers: 5800000, registeredUsers: 16300000 },
        { month: "Dec", revenue: 350, activeUsers: 6200000, registeredUsers: 17500000 },
      ],
      fundingRounds: [
        { date: "2021-05-01", investor: "Ethio Telecom", amount: "$50M", roundType: "Corporate" },
      ],
      executives: [
        { name: "Frehiwot Tamiru", role: "CEO", since: "2021" },
        { name: "Yonas Assefa", role: "CTO", since: "2021" },
        { name: "Meaza Birru", role: "Head of Operations", since: "2021" },
      ],
      complianceDocuments: [
        { name: "NBE License", status: "Active", date: "2021-04-15" },
        { name: "Telecom License", status: "Active", date: "2021-04-15" },
        { name: "Annual Audit 2023", status: "Submitted", date: "2024-03-15" },
      ],
    },
    {
      id: "kubik",
      name: "Kubik",
      logo: "K",
      sector: "CleanTech",
      status: "Verified",
      revenueStage: "Series A",
      lastFunding: "2024-01-20",
      foundedDate: "2021",
      verificationScore: 92,
      kpis: {
        annualRevenue: "ETB 120M",
        employeeCount: 78,
        employeeTrend: "up",
        marketShare: "8.5%",
        burnRate: "ETB 4.2M",
      },
      monthlyData: [
        { month: "Jan", revenue: 8, activeUsers: 1200, registeredUsers: 3500 },
        { month: "Feb", revenue: 9, activeUsers: 1400, registeredUsers: 4200 },
        { month: "Mar", revenue: 10, activeUsers: 1650, registeredUsers: 5000 },
        { month: "Apr", revenue: 11, activeUsers: 1900, registeredUsers: 5800 },
        { month: "May", revenue: 12, activeUsers: 2200, registeredUsers: 6700 },
        { month: "Jun", revenue: 13, activeUsers: 2500, registeredUsers: 7600 },
        { month: "Jul", revenue: 14, activeUsers: 2850, registeredUsers: 8600 },
        { month: "Aug", revenue: 15, activeUsers: 3200, registeredUsers: 9700 },
        { month: "Sep", revenue: 16, activeUsers: 3600, registeredUsers: 10900 },
        { month: "Oct", revenue: 18, activeUsers: 4050, registeredUsers: 12200 },
        { month: "Nov", revenue: 19, activeUsers: 4550, registeredUsers: 13600 },
        { month: "Dec", revenue: 21, activeUsers: 5100, registeredUsers: 15200 },
      ],
      fundingRounds: [
        { date: "2024-01-20", investor: "Norrsken Foundation", amount: "$5M", roundType: "Series A" },
        { date: "2022-06-10", investor: "Climate Fund", amount: "$1.5M", roundType: "Seed" },
      ],
      executives: [
        { name: "Kidus Asfaw", role: "CEO & Founder", since: "2021" },
        { name: "Liya Tadesse", role: "Head of Product", since: "2022" },
      ],
      complianceDocuments: [
        { name: "Manufacturing License", status: "Active", date: "2022-03-20" },
        { name: "Environmental Permit", status: "Active", date: "2023-07-15" },
      ],
    },
    {
      id: "gebeya",
      name: "Gebeya",
      logo: "G",
      sector: "EdTech",
      status: "Verified",
      revenueStage: "Series A",
      lastFunding: "2022-09-12",
      foundedDate: "2016",
      verificationScore: 94,
      kpis: {
        annualRevenue: "ETB 85M",
        employeeCount: 62,
        employeeTrend: "neutral",
        marketShare: "15.2%",
        burnRate: "ETB 3.1M",
      },
      monthlyData: [
        { month: "Jan", revenue: 5.5, activeUsers: 8500, registeredUsers: 45000 },
        { month: "Feb", revenue: 6, activeUsers: 9200, registeredUsers: 48000 },
        { month: "Mar", revenue: 6.5, activeUsers: 10000, registeredUsers: 52000 },
        { month: "Apr", revenue: 7, activeUsers: 10800, registeredUsers: 56000 },
        { month: "May", revenue: 7.2, activeUsers: 11500, registeredUsers: 60000 },
        { month: "Jun", revenue: 7.5, activeUsers: 12200, registeredUsers: 64000 },
        { month: "Jul", revenue: 7.8, activeUsers: 13000, registeredUsers: 68000 },
        { month: "Aug", revenue: 8, activeUsers: 13800, registeredUsers: 72000 },
        { month: "Sep", revenue: 8.2, activeUsers: 14600, registeredUsers: 76000 },
        { month: "Oct", revenue: 8.5, activeUsers: 15400, registeredUsers: 80000 },
        { month: "Nov", revenue: 8.8, activeUsers: 16200, registeredUsers: 84000 },
        { month: "Dec", revenue: 9.2, activeUsers: 17000, registeredUsers: 88000 },
      ],
      fundingRounds: [
        { date: "2022-09-12", investor: "Atlantica Ventures", amount: "$2M", roundType: "Series A" },
        { date: "2019-04-20", investor: "CRE Venture Capital", amount: "$800K", roundType: "Seed" },
      ],
      executives: [
        { name: "Amadou Daffe", role: "CEO & Founder", since: "2016" },
        { name: "Hirut Solomon", role: "COO", since: "2018" },
      ],
      complianceDocuments: [
        { name: "Education License", status: "Active", date: "2017-02-15" },
        { name: "Tax Clearance", status: "Active", date: "2024-02-01" },
      ],
    },
    {
      id: "arifpay",
      name: "ArifPay",
      logo: "A",
      sector: "Fintech",
      status: "Pending",
      revenueStage: "Seed",
      lastFunding: "2023-07-25",
      foundedDate: "2022",
      verificationScore: 78,
      kpis: {
        annualRevenue: "ETB 28M",
        employeeCount: 34,
        employeeTrend: "up",
        marketShare: "4.2%",
        burnRate: "ETB 2.8M",
      },
      monthlyData: [
        { month: "Jan", revenue: 1.5, activeUsers: 5200, registeredUsers: 18000 },
        { month: "Feb", revenue: 1.8, activeUsers: 6100, registeredUsers: 21000 },
        { month: "Mar", revenue: 2.1, activeUsers: 7200, registeredUsers: 25000 },
        { month: "Apr", revenue: 2.4, activeUsers: 8400, registeredUsers: 29000 },
        { month: "May", revenue: 2.7, activeUsers: 9800, registeredUsers: 34000 },
        { month: "Jun", revenue: 3, activeUsers: 11400, registeredUsers: 39000 },
        { month: "Jul", revenue: 3.4, activeUsers: 13200, registeredUsers: 45000 },
        { month: "Aug", revenue: 3.8, activeUsers: 15300, registeredUsers: 52000 },
        { month: "Sep", revenue: 4.2, activeUsers: 17700, registeredUsers: 60000 },
        { month: "Oct", revenue: 4.7, activeUsers: 20500, registeredUsers: 69000 },
        { month: "Nov", revenue: 5.2, activeUsers: 23700, registeredUsers: 79000 },
        { month: "Dec", revenue: 5.8, activeUsers: 27400, registeredUsers: 91000 },
      ],
      fundingRounds: [
        { date: "2023-07-25", investor: "500 Global", amount: "$1.2M", roundType: "Seed" },
        { date: "2022-12-10", investor: "Angel Syndicate", amount: "$300K", roundType: "Pre-Seed" },
      ],
      executives: [
        { name: "Abel Getachew", role: "CEO & Founder", since: "2022" },
        { name: "Meron Haile", role: "CTO", since: "2022" },
      ],
      complianceDocuments: [
        { name: "NBE License", status: "Pending", date: "2024-01-15" },
        { name: "Tax Registration", status: "Active", date: "2023-03-20" },
      ],
    },
  ];
  
  export const getCompanyById = (id: string): Company | undefined => {
    return companies.find((c) => c.id === id);
  };
  