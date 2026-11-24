/**
 * ─────────────────────────────────────────────────────────────
 *  PORTFOLIO CONTENT — single source of truth
 *  Edit this file to update anything on the website.
 *  Every fact here comes from Hema_SE_resume.pdf. Leave optional
 *  fields empty ("" / null) rather than inventing details: the UI
 *  hides anything that is not configured.
 * ─────────────────────────────────────────────────────────────
 */

export type IconKey =
  | "python"
  | "c"
  | "html"
  | "css"
  | "javascript"
  | "aws"
  | "mysql"
  | "linux"
  | "cisco"
  | "git"
  | "vscode"
  | "redhat";

export const site = {
  url: "https://hema-portfolio-beige.vercel.app", // ← change if you add a custom domain
  title: "Hema N — Software Engineer | Portfolio",
  description:
    "Explore Hema N's software engineering portfolio featuring Python, web development, IoT projects, AWS cloud infrastructure and enterprise networking.",
  closing: "Built with curiosity. Driven by purpose.",
};

export const profile = {
  name: "Hema N",
  initials: "HN",
  title: "Software Engineer",
  designation: "Software Engineer · MCA Graduate",
  qualification: "Master of Computer Applications (MCA)",
  careerLevel: "Entry-level / Fresher",
  location: "Chennai, India",
  email: "hemanatarajan52@gmail.com",
  phone: "+91 9361637571",
  /** Set to false to hide the phone number everywhere on the site. */
  showPhone: true,
  availability: "Open to Work",
  linkedin: "https://www.linkedin.com/in/hema-n-263820281",
  /** Leave empty until a real GitHub profile exists. */
  github: "",
  resume: "/resume/Hema_SE_resume.pdf",
  /**
   * Path to a real photo, e.g. "/images/profile/hema.jpg".
   * While null, the hero shows an HN monogram instead.
   */
  portrait: "/images/profile/hema.jpg" as string | null,
  hero: {
    badge: "Available for opportunities",
    intro: "Hello, I'm Hema N.",
    headline: ["Building solutions.", "Driven by curiosity."],
    description:
      "I'm an aspiring Software Engineer with a foundation in programming, web development, cloud computing and networking. Passionate about solving real-world problems through technology and continuously expanding my technical knowledge.",
  },
};

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

export const marquee: { icon: IconKey; name: string }[] = [
  { icon: "python", name: "Python" },
  { icon: "c", name: "C" },
  { icon: "html", name: "HTML5" },
  { icon: "css", name: "CSS3" },
  { icon: "javascript", name: "JavaScript" },
  { icon: "aws", name: "AWS" },
  { icon: "mysql", name: "MySQL" },
  { icon: "linux", name: "Linux" },
  { icon: "cisco", name: "Cisco" },
  { icon: "git", name: "Git" },
  { icon: "vscode", name: "Visual Studio Code" },
];

export const about = {
  label: "01 / About Me",
  headline: ["Curious by nature.", "An engineer by choice."],
  paragraphs: [
    "I'm Hema N, an MCA graduate with a strong interest in software engineering, web technologies, cloud computing and computer networking.",
    "Through academic projects and industrial training, I have gained practical exposure to Python programming, IoT applications, AWS infrastructure and enterprise networking.",
    "I enjoy exploring new technologies, solving technical challenges and collaborating with others to create efficient software solutions. I'm looking forward to contributing my knowledge, growing as an engineer and building meaningful digital experiences.",
  ],
};

export type ExpertiseVisual = "code" | "browser" | "cloud" | "network" | "database" | "terminal";

export const expertise = {
  label: "02 / Technical Expertise",
  headline: ["Different technologies.", "One problem-solving mindset."],
  items: [
    {
      title: "Programming",
      visual: "code" as ExpertiseVisual,
      icons: ["python", "c"] as IconKey[],
      tech: ["Python", "C"],
      description:
        "Applying programming fundamentals and logical thinking to develop efficient software solutions.",
    },
    {
      title: "Web Development",
      visual: "browser" as ExpertiseVisual,
      icons: ["html", "css", "javascript"] as IconKey[],
      tech: ["HTML", "CSS", "JavaScript"],
      description:
        "Creating structured, responsive and user-friendly web interfaces using core web technologies.",
    },
    {
      title: "Cloud Computing",
      visual: "cloud" as ExpertiseVisual,
      icons: ["aws"] as IconKey[],
      tech: ["Amazon Web Services", "Amazon EC2", "Amazon VPC", "Auto Scaling", "Load Balancing", "NAT Gateway"],
      description: "Practical exposure to secure and scalable cloud infrastructure using AWS services.",
    },
    {
      title: "Networking",
      visual: "network" as ExpertiseVisual,
      icons: ["cisco"] as IconKey[],
      tech: ["CCNA Fundamentals", "Cisco Packet Tracer", "Subnetting", "VLANs", "Routing", "Switching"],
      description:
        "Understanding enterprise network architecture, network segmentation, connectivity and secure communication.",
    },
    {
      title: "Database Management",
      visual: "database" as ExpertiseVisual,
      icons: ["mysql"] as IconKey[],
      tech: ["MySQL"],
      description: "Working with relational database fundamentals and structured data management.",
    },
    {
      title: "Linux & Developer Tools",
      visual: "terminal" as ExpertiseVisual,
      icons: ["linux", "git", "vscode"] as IconKey[],
      tech: ["Linux", "Git", "Visual Studio Code", "Red Hat System Administration training"],
      description: "Working with Linux environments, version control and essential software development tools.",
    },
  ],
};

export type ProjectVisual = "malware" | "fire" | "network" | "aws";

export type Project = {
  slug: string;
  number: string;
  shortTitle: string;
  title: string;
  category: string;
  description: string;
  visual: ProjectVisual;
  /** Raw colours used for the card's identity. */
  theme: { from: string; to: string; accent: string; dark: boolean };
  tags: string[];
  overview: string;
  objective: string;
  concepts: { title: string; text: string }[];
  /** Simple concept flow drawn in the case study's architecture section. */
  flow: string[];
  /** Only list what is documented. Empty array → section shows a note. */
  implementation: string[];
  learning: string[];
  /** Real screenshots, e.g. "/images/projects/aws-1.png". Empty → placeholder note shown. */
  screenshots: { src: string; alt: string }[];
  /** Leave empty unless a real repository / live URL exists — buttons are hidden otherwise. */
  github: string;
  demo: string;
};

export const projects: Project[] = [
  {
    slug: "iot-malware-detection",
    number: "01",
    shortTitle: "IoT Malware Detection",
    title: "Effective Multitask Deep Learning for IoT Malware Detection",
    category: "Python · Deep Learning · IoT Security",
    description:
      "An academic Python project exploring multitask deep learning approaches for detecting malware in Internet of Things environments.",
    visual: "malware",
    theme: { from: "#0B1020", to: "#1B1540", accent: "#A78BFA", dark: true },
    tags: ["Python", "Multitask Deep Learning", "IoT Security", "Malware Detection"],
    overview:
      "An academic project built in Python that explores how multitask deep learning can be applied to detecting malware in Internet of Things (IoT) environments.",
    objective:
      "To study and apply multitask deep learning techniques to the problem of identifying malicious software in connected IoT environments.",
    concepts: [
      { title: "Python programming", text: "The project is implemented in Python, the primary language for the work." },
      {
        title: "Multitask deep learning",
        text: "A deep learning approach in which a single model learns more than one related task at the same time.",
      },
      { title: "IoT security", text: "Protecting connected Internet of Things devices and the networks they operate on." },
      { title: "Malware detection", text: "Identifying malicious software so that threats can be recognised and handled." },
    ],
    flow: ["IoT environment", "Python", "Multitask deep learning", "Malware detection"],
    implementation: [],
    learning: [
      "Applying Python to an applied research-style problem",
      "Understanding how multitask learning differs from single-task models",
      "Exploring the security challenges specific to IoT environments",
    ],
    screenshots: [],
    github: "",
    demo: "",
  },
  {
    slug: "iot-fire-alarm",
    number: "02",
    shortTitle: "IoT-Based Fire Alarm",
    title: "IoT-Based Android Application for Fire Alarming",
    category: "IoT · Android Application",
    description:
      "An IoT-based Android application project focused on fire alarm functionality and connected-device safety applications.",
    visual: "fire",
    theme: { from: "#FFF4EC", to: "#FFE2D0", accent: "#F2552C", dark: false },
    tags: ["Internet of Things", "Android Application", "Fire Alarm", "Safety Technology"],
    overview:
      "An academic project combining the Internet of Things with an Android application, built around fire alarm functionality.",
    objective:
      "To explore how connected devices and a mobile application can work together to support fire alarm and safety use cases.",
    concepts: [
      { title: "Internet of Things", text: "Connecting physical devices so they can share information with software." },
      { title: "Android application", text: "A mobile application on the Android platform as the user-facing part of the system." },
      { title: "Fire alarm functionality", text: "The safety-focused purpose the project is designed around." },
      { title: "Safety-focused technology", text: "Using connected technology to support personal and property safety." },
    ],
    flow: ["IoT device", "Android application", "Fire alarm", "User safety"],
    implementation: [],
    learning: [
      "Seeing how IoT devices and mobile applications fit together",
      "Designing software around a real-world safety use case",
      "Gaining exposure to Android application concepts",
    ],
    screenshots: [],
    github: "",
    demo: "",
  },
  {
    slug: "enterprise-network",
    number: "03",
    shortTitle: "Secure Enterprise Network",
    title: "Enterprise Network Design and Implementation",
    category: "Networking · Cisco Packet Tracer",
    description:
      "Designed and implemented a secure enterprise network using Cisco Packet Tracer, incorporating subnetting, VLANs, routing and switching.",
    visual: "network",
    theme: { from: "#EAF6FF", to: "#D6EEFF", accent: "#0E7CC2", dark: false },
    tags: ["Cisco Packet Tracer", "Subnetting", "VLANs", "Routing", "Switching", "Enterprise Networking"],
    overview:
      "A networking project in which a secure enterprise network was designed and implemented in Cisco Packet Tracer.",
    objective:
      "To design and build a secure, well-segmented enterprise network using core networking techniques: subnetting, VLANs, routing and switching.",
    concepts: [
      { title: "Subnetting", text: "Dividing an IP address space into smaller networks for structure and efficiency." },
      { title: "VLANs", text: "Logically segmenting a network so different groups of devices are kept apart." },
      { title: "Routing", text: "Moving traffic between different networks and subnets." },
      { title: "Switching", text: "Forwarding traffic between devices within the local network." },
    ],
    flow: ["Router", "Switches", "VLAN segments", "Subnets"],
    implementation: [
      "Designed the network in Cisco Packet Tracer",
      "Applied subnetting to structure the address space",
      "Configured VLANs for network segmentation",
      "Implemented routing and switching to connect the network",
    ],
    learning: [
      "Planning an enterprise network end to end",
      "Hands-on configuration of VLANs, routing and switching",
      "Thinking about segmentation as part of network security",
    ],
    screenshots: [],
    github: "",
    demo: "",
  },
  {
    slug: "aws-cloud-infrastructure",
    number: "04",
    shortTitle: "AWS Cloud Infrastructure",
    title: "Secure and Scalable AWS Cloud Infrastructure",
    category: "AWS · Cloud Computing",
    description:
      "Built a secure and scalable AWS setup using Amazon VPC, EC2, Auto Scaling, Load Balancer and NAT Gateway.",
    visual: "aws",
    theme: { from: "#FFF8EE", to: "#FCEBD2", accent: "#FF9900", dark: false },
    tags: ["Amazon VPC", "Amazon EC2", "Auto Scaling", "Load Balancer", "NAT Gateway", "Cloud Infrastructure"],
    overview: "A cloud project in which a secure and scalable infrastructure was built on Amazon Web Services.",
    objective:
      "To build cloud infrastructure that is both secure and able to scale, using core AWS networking and compute services.",
    concepts: [
      { title: "Amazon VPC", text: "An isolated virtual network in AWS that the rest of the setup runs inside." },
      { title: "Amazon EC2", text: "Virtual servers that provide the compute capacity." },
      { title: "Auto Scaling", text: "Adjusting the number of EC2 instances to match demand." },
      { title: "Load Balancer", text: "Distributing incoming traffic across instances." },
      { title: "NAT Gateway", text: "Letting resources in private subnets reach the internet without being directly exposed." },
    ],
    flow: ["Users", "Load Balancer", "EC2 · Auto Scaling", "NAT Gateway"],
    implementation: [
      "Set up an Amazon VPC as the network foundation",
      "Deployed compute on Amazon EC2",
      "Configured Auto Scaling for scalability",
      "Placed a Load Balancer in front of the instances",
      "Used a NAT Gateway for outbound access from private resources",
    ],
    learning: [
      "How core AWS services fit together into one architecture",
      "Designing for both security and scalability",
      "Practical experience with cloud networking concepts",
    ],
    screenshots: [],
    github: "",
    demo: "",
  },
];

export const toolkit = {
  label: "04 / My Toolkit",
  headline: ["The tools behind my work."],
  groups: [
    { title: "Programming Languages", items: [{ name: "Python", icon: "python" }, { name: "C", icon: "c" }] },
    {
      title: "Web Technologies",
      items: [
        { name: "HTML", icon: "html" },
        { name: "CSS", icon: "css" },
        { name: "JavaScript", icon: "javascript" },
      ],
    },
    {
      title: "Networking",
      items: [
        { name: "CCNA Fundamentals", icon: "cisco" },
        { name: "Cisco Packet Tracer" },
        { name: "Subnetting" },
        { name: "VLANs" },
        { name: "Routing" },
        { name: "Switching" },
      ],
    },
    { title: "Cloud Platform", items: [{ name: "AWS", icon: "aws" }] },
    { title: "Database", items: [{ name: "MySQL", icon: "mysql" }] },
    { title: "Operating System", items: [{ name: "Linux", icon: "linux" }] },
    {
      title: "Development Tools",
      items: [
        { name: "Git", icon: "git" },
        { name: "Visual Studio Code", icon: "vscode" },
      ],
    },
  ] as { title: string; items: { name: string; icon?: IconKey }[] }[],
};

export const training = {
  label: "05 / Industrial Exposure",
  headline: ["Learning beyond the classroom."],
  items: [
    {
      role: "Web Development Intern",
      organization: "Thirumoolar IT Solutions Pvt. Ltd.",
      category: "Internship",
      description: "Gained industrial exposure to web development through internship training.",
    },
    {
      role: "App Designing Training",
      organization: "",
      category: "Hands-on training",
      description: "Completed hands-on training in app designing.",
    },
  ],
};

export const education = {
  label: "06 / Education",
  headline: ["The foundation of my journey."],
  items: [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "Karpagam Academy of Higher Education",
      place: "Coimbatore",
      period: "2024 – 2026",
    },
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "GTN Arts College",
      place: "Dindigul",
      period: "2021 – 2024",
    },
  ],
};

export type Credential = {
  number: string;
  title: string;
  detail: string;
  provider: string;
  /** "certification" = certificate held · "training" = training programme completed */
  kind: "certification" | "training";
  icons: IconKey[];
  tags: string[];
  /** Completed courses / modules backed by evidence, shown as a short list on the card. */
  courses?: { name: string; note: string }[];
  /** Optional badge images shown on the card, e.g. ["/images/certificates/badge.png"]. */
  badges?: string[];
  /**
   * Real certificate images. Any entry enables the preview modal (one tab per file).
   * `original` (optional) is the source PDF, opened by the modal's "Open" link.
   */
  files: { src: string; label: string; original?: string }[];
  /** Optional public verification URL. */
  verifyUrl: string;
};

export const credentials = {
  label: "07 / Credentials",
  headline: ["Always learning.", "Always evolving."],
  note: "Programmes marked “Training” were completed through a training institute and are not presented as independently verified vendor certifications.",
  items: [
    {
      number: "01",
      title: "Web Development Certification",
      detail: "Certification in web development covering front-end technologies and Python.",
      provider: "",
      kind: "certification",
      icons: ["html", "css", "javascript", "python"],
      tags: ["HTML", "CSS", "JavaScript", "Python"],
      files: [],
      verifyUrl: "",
    },
    {
      number: "02",
      title: "Cisco Certified Network Associate (CCNA)",
      detail:
        "CCNA programme completed through KGiSL MicroCollege, Coimbatore, delivered via the Cisco Networking Academy.",
      provider: "KGiSL MicroCollege, Coimbatore",
      kind: "training",
      icons: ["cisco"],
      tags: ["Cisco Networking Academy", "Routing", "Switching"],
      courses: [
        { name: "CCNA: Introduction to Networks", note: "Course certificate · Oct 2025" },
        { name: "CCNA: Enterprise Networking, Security & Automation", note: "Verified badge" },
      ],
      badges: ["/images/certificates/ccna-ensa-badge.png"],
      files: [
        {
          src: "/images/certificates/ccna-introduction-to-networks.jpg",
          original: "/images/certificates/ccna-introduction-to-networks.pdf",
          label: "Introduction to Networks",
        },
        { src: "/images/certificates/ccna-ensa-badge.png", label: "ENSA badge" },
      ],
      verifyUrl: "",
    },
    {
      number: "03",
      title: "Red Hat System Administration",
      detail:
        "RH-124 & RH-134 programme completed through KGiSL MicroCollege, Coimbatore, via the Red Hat Academy.",
      provider: "KGiSL MicroCollege, Coimbatore",
      kind: "training",
      icons: ["redhat", "linux"],
      tags: ["RH-124", "RH-134", "Linux"],
      courses: [
        { name: "Red Hat System Administration I (RH124)", note: "Red Hat Academy · course attendance badge" },
        { name: "Red Hat System Administration II (RH134)", note: "Red Hat Academy · course attendance badge" },
      ],
      badges: ["/images/certificates/redhat-sa1-badge.png", "/images/certificates/redhat-sa2-badge.png"],
      files: [
        { src: "/images/certificates/redhat-sa1-badge.png", label: "System Administration I" },
        { src: "/images/certificates/redhat-sa2-badge.png", label: "System Administration II" },
      ],
      verifyUrl: "",
    },
    {
      number: "04",
      title: "AWS Academy Cloud Architecting",
      detail: "Completed through KGiSL MicroCollege, Coimbatore.",
      provider: "KGiSL MicroCollege, Coimbatore",
      kind: "training",
      icons: ["aws"],
      tags: ["Cloud Architecting", "AWS"],
      courses: [{ name: "AWS Academy Cloud Architecting", note: "AWS Academy · Trained badge" }],
      badges: ["/images/certificates/aws-cloud-architecting-badge.png"],
      files: [{ src: "/images/certificates/aws-cloud-architecting-badge.png", label: "Cloud Architecting badge" }],
      verifyUrl: "",
    },
  ] as Credential[],
};

export const softSkills = {
  headline: "Beyond technical skills.",
  items: [
    { name: "Teamwork", text: "Collaborating to reach shared goals." },
    { name: "Adaptability", text: "Comfortable picking up new tools and contexts." },
    { name: "Communication", text: "Explaining ideas clearly to different people." },
    { name: "Multitasking", text: "Balancing several responsibilities at once." },
  ],
};

export const contact = {
  headline: ["Let's build", "something meaningful."],
  text: "I'm open to entry-level software engineering opportunities, technical collaborations and exciting learning experiences.",
};
