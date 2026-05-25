export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  duration: string;
  description: string[];
  skills: string[];
}

export interface SkillItem {
  name: string;
  level: number; // 0-100
  color: string; // Tailwind glow accent color description
}

export interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

export interface ProjectItem {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category: 'Full-Stack' | 'Frontend' | 'Creative 3D' | 'Open Source';
  metrics?: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  credentialId?: string;
}

export interface BlogPostItem {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  tags: string[];
}

export interface PortfolioConfig {
  personalInfo: {
    fullName: string;
    role: string;
    tagline: string;
    shortBio: string;
    longBio: string;
    email: string;
    phone: string;
    location: string;
    resumeUrl: string;
    avatarUrl: string;
  };
  socialLinks: {
    github: string;
    linkedin: string;
    twitter?: string;
    email: string;
  };
  metrics: {
    label: string;
    value: string;
    suffix?: string;
  }[];
  experience: ExperienceItem[];
  skills: SkillCategory[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  blogPosts: BlogPostItem[];
}

export const portfolioConfig: PortfolioConfig = {
  personalInfo: {
    fullName: "Ajay Kapuria",
    role: "Senior Software Engineer",
    tagline: "Building Resilient Distributed Systems, Apache Kafka Pipelines & High-Scale Integrations",
    shortBio: "Senior Software Engineer with 7+ years of experience specializing in event-driven integrations (Kafka), Transactional Outbox patterns, optimized databases, and real-time operations dashboards.",
    longBio: "I am a Senior Software Engineer with over 7 years of professional experience building high-scale enterprise applications, reliable integration layers, and real-time monitoring systems. Expert in the Microsoft technology stack, event-driven streaming (Apache Kafka), transactional outbox patterns, and complex database tuning. Proven record of delivering production-ready Manufacturing Execution Systems (MES) and securing enterprise portals globally.",
    email: "jkapuriya6@gmail.com",
    phone: "+91 8655062586",
    location: "Mumbai, Maharashtra, India",
    resumeUrl: "/resume.pdf",
    avatarUrl: "/assets/avatar.png",
  },
  socialLinks: {
    github: "https://github.com",
    linkedin: "https://www.linkedin.com/in/ajay-kapuria",
    email: "mailto:jkapuriya6@gmail.com",
  },
  metrics: [
    { label: "Years Experience", value: "7", suffix: "+" },
    { label: "Enterprise Web Apps Supported", value: "25", suffix: "+" },
    { label: "Security Scanning Vulnerabilities Remediated", value: "730", suffix: "+" },
    { label: "Regression Testing Cycle Reduction", value: "50", suffix: "%" },
  ],
  experience: [
    {
      role: "Senior Software Engineer",
      company: "Saint-Gobain INDEC (International Centre of Excellence)",
      location: "Mumbai, India",
      duration: "April 2024 - Present",
      description: [
        "Contributed to the successful production go-live of the IN4.0RM Manufacturing Execution System (MES) supporting global glass manufacturing plants.",
        "Designed and implemented Kafka-based event streaming workflows enabling high-throughput asynchronous communication with EWMS and SAP enterprise systems.",
        "Pioneered the Outbox Pattern to guarantee atomic messaging and maintain perfect consistency between database transactions and Kafka event publishing.",
        "Developed multi-threaded .NET Worker Services and Windows Services to reliably process critical manufacturing pipeline queues.",
        "Created interactive control-room dashboards using SignalR, ASP.NET MVC, and Kendo UI to visualize production events in real-time.",
        "Recognized with the prestigious IN4.0RM Excellence Award at Saint-Gobain International IT Delivery Centre for outstanding engineering contributions."
      ],
      skills: ["Apache Kafka", ".NET Core", "ASP.NET MVC", "SignalR", "SQL Server", "Windows Services", "WCF Services", "Kendo UI"]
    },
    {
      role: "Senior Software Engineer",
      company: "Ness Digital Engineering",
      location: "Navi Mumbai, India",
      duration: "May 2018 - April 2024",
      description: [
        "Maintained and enhanced 25+ global educational evaluation platforms (CCIS for Pearson) supporting high-stake certification programs.",
        "Identified, remediated, and patched 730+ high and medium-level application security vulnerabilities scanned via Checkmarx and Contrast.",
        "Architected AWS Secrets Manager configuration pipelines to securely manage database keys and protect sensitive credentials.",
        "Integrated Google reCAPTCHA bot controls, decreasing malicious script abuse and automated network traffic by 60–80%.",
        "Led Proof of Concepts for SpecFlow automation testing framework, successfully reducing regression pipeline times by 50%."
      ],
      skills: ["ASP.NET WebForms", "ASP.NET MVC", "SQL Server", "AWS Secrets Manager", "reCAPTCHA", "SpecFlow Automation", "Jenkins", "Git", "WCF", "ADO.NET"]
    }
  ],
  skills: [
    {
      title: "Languages & Frameworks",
      skills: [
        { name: "C# (.NET Core / Framework)", level: 95, color: "cyan" },
        { name: "ASP.NET MVC & WebForms", level: 96, color: "emerald" },
        { name: "Web APIs & WCF Services", level: 92, color: "blue" },
        { name: "ADO.NET & Database Layering", level: 94, color: "cyan" },
      ]
    },
    {
      title: "Messaging & Architecture",
      skills: [
        { name: "Apache Kafka Streaming", level: 94, color: "emerald" },
        { name: "Event-Driven Architecture", level: 92, color: "blue" },
        { name: "Outbox Pattern (Eventual Consistency)", level: 90, color: "cyan" },
        { name: "SignalR Real-Time Hubs", level: 88, color: "emerald" },
      ]
    },
    {
      title: "Databases & Cloud Operations",
      skills: [
        { name: "SQL Server (SP & Query Tuning)", level: 95, color: "blue" },
        { name: "AWS Solutions Architecture", level: 88, color: "cyan" },
        { name: "AWS Secrets Manager", level: 86, color: "emerald" },
        { name: "Checkmarx & Contrast Security Scan Compliance", level: 90, color: "blue" },
      ]
    },
    {
      title: "DevOps & Automation Testing",
      skills: [
        { name: "SpecFlow Automation Testing", level: 85, color: "cyan" },
        { name: "Git / GitHub / SVN / Azure DevOps", level: 90, color: "emerald" },
        { name: "Jenkins CI/CD Pipelines", level: 86, color: "blue" },
        { name: "Frontend Integrations (JS, jQuery, Kendo UI)", level: 88, color: "cyan" },
      ]
    }
  ],
  projects: [
    {
      id: "mes-integration-platform",
      title: "IN4.0RM MES Integration Platform",
      shortDesc: "A high-availability manufacturing event-streaming integration platform and real-time dashboard for Saint-Gobain global plants.",
      longDesc: "Contributed to the successful go-live of the IN4.0RM MES platform across glass manufacturing factories. Designed event streaming topologies using Apache Kafka to sync manufacturing operations asynchronously with enterprise EWMS and SAP systems. Engineered reliable transactional publishing via the Outbox Pattern and developed .NET Worker Services for message processing. Implemented low-latency production dashboard visualization via ASP.NET MVC, SignalR, and Kendo UI.",
      tech: ["ASP.NET MVC", ".NET Core Worker Services", "Apache Kafka", "SQL Server", "SignalR", "Kendo UI", "WCF Services"],
      liveUrl: "https://www.saint-gobain.com",
      githubUrl: "https://github.com",
      featured: true,
      category: "Full-Stack",
      metrics: [
        "Ensured 100% atomic transaction delivery via the Transactional Outbox Pattern",
        "Created real-time control-room operational dashboards with SignalR",
        "Honored with the IN4.0RM Excellence Award for outstanding MES delivery"
      ]
    },
    {
      id: "ccis-assessment-portals",
      title: "Pearson CCIS Assessment Portals",
      shortDesc: "Secure, high-throughput educational assessment and certification engine supporting 25+ global web portals.",
      longDesc: "Maintained and enhanced 25+ highly trafficked enterprise educational testing web portals for Pearson CCIS. Optimized SQL Server performance by tuning complex stored procedures, reducing database latency. Led critical security initiatives, resolving over 730 vulnerability vectors discovered in Checkmarx/Contrast scans, and designed integrations for AWS Secrets Manager and Google reCAPTCHA.",
      tech: ["ASP.NET MVC", "ASP.NET WebForms", "WCF Services", "SQL Server", "AWS Secrets Manager", "reCAPTCHA", "Jenkins"],
      liveUrl: "https://www.pearson.com",
      githubUrl: "https://github.com",
      featured: true,
      category: "Full-Stack",
      metrics: [
        "Remediated 730+ enterprise security vulnerabilities scanned via Checkmarx",
        "Reduced automated bot traffic by 60–80% with reCAPTCHA security controls",
        "Halved regression testing cycle times via SpecFlow automated pipelines"
      ]
    },
    {
      id: "kafka-event-flow-visualizer",
      title: "3D Event-Flow Topography Visualizer",
      shortDesc: "An interactive, web-based 3D node visualizer mapping Apache Kafka event streams and transactional pipelines in real-time.",
      longDesc: "A high-fidelity WebGL system visualizer built in React Three Fiber. It connects to simulated local socket hubs, parsing incoming Kafka events and rendering them as glowing 3D data nodes flowing between system blocks (e.g. database, Outbox, Kafka brokers, SAP services). Users can interactively orbit the network topology and drill down into individual event payloads.",
      tech: ["Next.js", "React", "Three.js", "React Three Fiber", "Tailwind CSS", "SignalR"],
      featured: true,
      category: "Creative 3D",
      metrics: [
        "Visualizes system node relationships in immersive interactive 3D WebGL space",
        "Helps control-room operators monitor complex event streams at a glance",
        "Maintains smooth 60 FPS under high event throughput using geometry instancing"
      ]
    },
    {
      id: "transactional-outbox-engine",
      title: "Transactional Outbox NuGet Engine",
      shortDesc: "A lightweight, high-reliability event publishing engine implementing the Outbox Pattern in .NET Core.",
      longDesc: "A reusable template and NuGet package demonstrating the Outbox pattern in C#. It persists outgoing events to a SQL database transactionally before using a background worker service to stream them reliably to Apache Kafka, ensuring eventual consistency in distributed systems even during network partitions.",
      tech: ["C#", ".NET Core", "SQL Server", "Apache Kafka", "Worker Services"],
      githubUrl: "https://github.com",
      featured: false,
      category: "Open Source",
      metrics: [
        "Demonstrates resilient distributed systems design patterns",
        "Out-of-the-box support for SQL Server and Apache Kafka integration",
        "Provides at-least-once transactional delivery guarantees"
      ]
    }
  ],
  certifications: [
    {
      title: "Amazon Web Services Solutions Architect - Associate",
      issuer: "Amazon Web Services",
      date: "Dec 2022",
      credentialId: "AWS-ASA-2022"
    },
    {
      title: "Amazon Web Services Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "Nov 2022",
      credentialId: "AWS-ACP-2022"
    }
  ],
  blogPosts: [
    {
      slug: "reliable-messaging-outbox-pattern",
      title: "Resilient Event-Streaming: Implementing the Outbox Pattern in .NET & Kafka",
      summary: "Event-driven systems must maintain transactional consistency. Discover how to build a robust Transactional Outbox pattern in .NET with SQL Server and Apache Kafka to guarantee at-least-once message delivery.",
      date: "Apr 2026",
      readTime: "8 min read",
      tags: [".NET Core", "Kafka", "Outbox Pattern", "Architecture"]
    },
    {
      slug: "securing-credentials-aws-secrets-manager",
      title: "Securing Sensitive App Configurations with AWS Secrets Manager in C#",
      summary: "Hardcoded connection strings are a high security risk. Learn how to securely integrate AWS Secrets Manager into legacy and modern enterprise .NET applications to rotate and fetch secrets dynamically.",
      date: "Feb 2026",
      readTime: "6 min read",
      tags: [".NET Framework", "AWS", "Cloud Security", "Best Practices"]
    },
    {
      slug: "optimizing-sql-server-query-performance",
      title: "Tuning Enterprise Databases: SQL Query Optimization for High-Throughput Apps",
      summary: "Enterprise applications are only as fast as their database. Explore proven strategies for indexing, optimizing stored procedures, and analyzing execution plans in SQL Server to dramatically reduce database latency.",
      date: "Dec 2025",
      readTime: "10 min read",
      tags: ["SQL Server", "Databases", "Performance Tuning"]
    }
  ]
};
