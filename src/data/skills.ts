/**
 * Skills data for Shivang Gupta
 * Strictly derived from CV
 */
export const SKILLS_CATEGORIES = [
  {
    category: "DevOps & Cloud",
    index: "01",
    description: "Cloud infrastructure automation, container orchestration, and continuous integration/continuous delivery pipelines.",
    skills: [
      { name: "AWS", detail: "EC2, S3, VPC, IAM provisioning used across Healthcare and Insurance projects." },
      { name: "Terraform", detail: "Used in Healthcare and Insurance projects for AWS infrastructure automation (IaC)." },
      { name: "Docker", detail: "Containerized microservices applications across Banking, Healthcare, and Insurance domains." },
      { name: "Kubernetes", detail: "Managed clusters with auto-scaling, deployment orchestration, and high availability." },
      { name: "Jenkins", detail: "Built automated CI/CD pipelines boosting deployment efficiency and reducing downtime." },
      { name: "Ansible", detail: "Configuration management and infrastructure automation cutting manual work by 80%." },
      { name: "Git", detail: "Version control for pipeline scripts, IaC code, and microservices repositories." },
      { name: "GitHub Actions", detail: "Automated workflow execution and CI/CD pipeline automation." },
      { name: "EC2", detail: "Elastic Compute Cloud instances configuration and sizing on AWS." },
      { name: "S3", detail: "Object storage management for application artifacts and backups on AWS." },
      { name: "VPC", detail: "Virtual Private Cloud network isolation, subnets, and routing on AWS." },
      { name: "IAM", detail: "Identity and Access Management policies, security roles, and access control on AWS." }
    ]
  },
  {
    category: "Monitoring & Logging",
    index: "02",
    description: "Centralized observability, telemetry metrics, and dashboards to reduce incident resolution times.",
    skills: [
      { name: "Prometheus", detail: "Centralized metrics collection, scraping, and alerting for Kubernetes clusters." },
      { name: "Grafana", detail: "Visual monitoring dashboards tracking application metrics and cluster health in real-time." },
      { name: "CloudWatch", detail: "AWS-native resource monitoring, logging, and alarms configuration." }
    ]
  },
  {
    category: "Testing & QA",
    index: "03",
    description: "Comprehensive software quality assurance, test planning, defect management, and vehicle safety validation.",
    skills: [
      { name: "Manual Testing", detail: "Exploratory and specification-based manual testing on automotive infotainment systems." },
      { name: "Regression Testing", detail: "Release cycle regression testing reducing bug resolution time by 35%." },
      { name: "Test Case Development", detail: "Authored 100+ detailed test cases aligned with business goals and RTM." },
      { name: "Defect Management", detail: "Defect logging, tracking, root-cause triage, and lifecycle management in Jira." }
    ]
  },
  {
    category: "Automotive Tools & Protocols",
    index: "04",
    description: "Specialized vehicle bus protocols, ECU diagnostic flashing, and hardware-in-the-loop infotainment validation.",
    skills: [
      { name: "CANoe", detail: "Vector CANoe environment for vehicle network simulation, measurement, and signal analysis." },
      { name: "Ediabas", detail: "BMW diagnostic communication system for ECU communication and status readout." },
      { name: "E-SYS", detail: "BMW electronic control unit coding, parameter tuning, and firmware flashing." },
      { name: "FAT Tool", detail: "Factory Acceptance Testing tool used during automotive infotainment test execution." },
      { name: "CAN Protocol", detail: "Controller Area Network messaging, database DBC signal decoding, and bus logging." },
      { name: "UDS Protocol", detail: "Unified Diagnostic Services (ISO 14229) for ECU diagnostic services." },
      { name: "ECU Testing", detail: "Electronic Control Unit functional verification, power cycle, and network diagnostics." },
      { name: "NVH Testing", detail: "Noise, Vibration, and Harshness infotainment physical feedback validation." },
      { name: "Software Flashing", detail: "Flashing firmware and infotainment releases to target vehicle hardware." }
    ]
  },
  {
    category: "Project Management & Tools",
    index: "05",
    description: "Enterprise lifecycle collaboration, requirement management, and terminal tooling.",
    skills: [
      { name: "Jira", detail: "Issue tracking, agile sprints, defect management, and workflow administration." },
      { name: "DOORS", detail: "IBM Rational DOORS for requirement extraction, tagging, and RTM traceability." },
      { name: "SharePoint", detail: "Centralized documentation, engineering templates, and team collaboration." },
      { name: "Microsoft Visual Studio", detail: "Development IDE for script writing, debugging, and tool maintenance." },
      { name: "PuTTY", detail: "SSH and serial console connection for embedded automotive hardware debugging." }
    ]
  },
  {
    category: "Methodologies & Frameworks",
    index: "06",
    description: "Structured industry engineering processes, safety standards, and delivery frameworks.",
    skills: [
      { name: "Agile", detail: "Scrum ceremonies, sprint planning, daily standups, and retrospective cadence." },
      { name: "SDLC", detail: "Full Software Development Life Cycle execution from requirement analysis to deployment." },
      { name: "STLC", detail: "Software Testing Life Cycle execution including RTM, execution, and sign-off." },
      { name: "CI/CD", detail: "Continuous Integration & Continuous Delivery automation for rapid, reliable releases." },
      { name: "Infrastructure as Code (IaC)", detail: "Declarative cloud provisioning with Terraform and automated configuration." },
      { name: "ITIL 4 Framework", detail: "Certified in ITIL 4 Foundation for IT service management best practices." }
    ]
  },
  {
    category: "Operating Systems & Languages",
    index: "07",
    description: "Server administration and automation scripting foundations.",
    skills: [
      { name: "Linux", detail: "Shell navigation, process management, permissions, and server administration for DevOps." },
      { name: "Python", detail: "Developed custom CAN signal automation tool reducing 8-hour workload to 1 hour (88% reduction)." },
      { name: "Windows", detail: "Workstation administration and tool execution environments." },
      { name: "Windows Server", detail: "Enterprise server configuration and directory integration." }
    ]
  }
];

if (typeof window !== "undefined") {
  window.SKILLS_CATEGORIES = SKILLS_CATEGORIES;
}
