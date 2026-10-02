/**
 * Shivang Gupta Portfolio — Comprehensive Client Logic
 * Infallible event delegation, complete interactivity, dynamic domain showcase & CV data mapping.
 */

(() => {
  // Safe environment helpers
  const isReducedMotion = () => {
    try {
      return typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (_) {
      return false;
    }
  };

  const isTouchDevice = () => {
    try {
      return (typeof window.matchMedia === 'function' && window.matchMedia('(pointer: coarse)').matches) ||
             (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0);
    } catch (_) {
      return false;
    }
  };

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function scrollToTarget(selector) {
    try {
      const target = document.querySelector(selector);
      if (target) {
        target.scrollIntoView({ behavior: isReducedMotion() ? 'auto' : 'smooth', block: 'start' });
      }
    } catch (e) {
      console.warn('Scroll error:', e);
    }
  }

  /* ==========================================================================
     DATA DEFINITIONS (SOURCED 1:1 FROM CV)
     ========================================================================== */

  const DOMAINS_DATA = {
    automotive: {
      badge: 'AUTOMOTIVE QA & TEST AUTOMATION',
      eyebrow: 'ACTIVE DOMAIN: AUTOMOTIVE',
      title: 'Infotainment Testing & CAN Signal Automation',
      meta: 'BMW, Mini Cooper, Rolls-Royce • Expleo Technologies India Pvt Ltd',
      desc: '2+ years validating BMW and Mini Cooper infotainment systems, flashing ECUs via E-SYS/Ediabas, and building custom Python CAN automation scripts that achieved an 88% reduction in test execution time.',
      highlights: [
        'Engineered Python test automation tool utilizing CAN database signals, completing an 8-hour workload in just 1 hour (88% time cut).',
        'Authored and executed 100+ detailed test cases for BMW, Mini Cooper, and Rolls-Royce head units.',
        'Conducted Vehicle Testing, Safety Validation, and Noise Vibration & Harshness (NVH) Testing.',
        'Reduced defect turnaround by 35% through meticulous bug logging in Jira and requirement traceability in IBM DOORS.',
        'Mentored 5+ team members and onboarded 10+ new engineers on automotive protocol standards.'
      ],
      chips: ['CANoe', 'Ediabas', 'E-SYS', 'FAT Tool', 'DOORS', 'Python', 'Jira', 'NVH Testing', 'CAN/Ethernet', 'IPC'],
      projectId: 'expleo',
      projectBtnText: 'Open Expleo Automation Details',
      filter: 'automotive'
    },
    banking: {
      badge: 'BANKING CI/CD & MICROSERVICES',
      eyebrow: 'ACTIVE DOMAIN: BANKING',
      title: 'High-Availability Microservices & Automated CI/CD',
      meta: 'Banking Domain Platform • StarAgile Technologies',
      desc: 'Implemented resilient end-to-end CI/CD pipelines using Jenkins and Docker to automate code deployment for faster release cycles, orchestrating microservices on Kubernetes for high availability and zero-downtime rollouts.',
      highlights: [
        'Implemented automated CI/CD pipeline using Jenkins and Docker to automate code deployment ensuring faster release cycles.',
        'Deployed microservices-based application on Kubernetes ensuring high availability, fault tolerance, and automated scaling.',
        'Set up centralized logging and monitoring system with Grafana and Prometheus tracking transaction latency and cluster metrics.'
      ],
      chips: ['Jenkins', 'Docker', 'Kubernetes', 'Prometheus', 'Grafana', 'CI/CD', 'Microservices', 'High Availability'],
      projectId: 'banking',
      projectBtnText: 'Open Banking Project Details',
      filter: 'banking'
    },
    healthcare: {
      badge: 'HEALTHCARE CLOUD & IAC',
      eyebrow: 'ACTIVE DOMAIN: HEALTHCARE',
      title: 'Automated AWS Infrastructure Provisioning with Terraform (IaC)',
      meta: 'Healthcare Cloud Platform • StarAgile Technologies',
      desc: 'Designed and deployed AWS-based cloud infrastructure using Terraform for Infrastructure as Code (IaC), containerizing sensitive health-tech workloads on Kubernetes for strict reliability and compliance.',
      highlights: [
        'Designed and deployed AWS-based cloud infrastructure using Terraform for Infrastructure as Code (IaC).',
        'Codified VPC topology, public/private subnets, EC2 compute instances, and IAM least-privilege security roles.',
        'Integrated Docker containers with Kubernetes ensuring seamless, scalable application deployment.'
      ],
      chips: ['AWS', 'Terraform', 'IaC', 'Docker', 'Kubernetes', 'EC2', 'S3', 'VPC', 'IAM', 'Security'],
      projectId: 'healthcare',
      projectBtnText: 'Open Healthcare Project Details',
      filter: 'healthcare'
    },
    insurance: {
      badge: 'INSURANCE PROVISIONING & OBSERVABILITY',
      eyebrow: 'ACTIVE DOMAIN: INSURANCE',
      title: 'Rapid AWS Provisioning & Incident Resolution Telemetry',
      meta: 'Insurance Domain Platform • StarAgile Technologies',
      desc: 'Built an automated deployment pipeline with Jenkins and Terraform for rapid AWS provisioning, containerized claims microservices on Kubernetes, and set up Prometheus/Grafana observability reducing incident resolution time.',
      highlights: [
        'Built an automated deployment pipeline with Jenkins and Terraform for fast AWS provisioning and dynamic environments.',
        'Containerized and orchestrated claims microservices using Docker and Kubernetes for high scalability.',
        'Automated infrastructure monitoring using Prometheus and Grafana reducing incident resolution time (MTTR).'
      ],
      chips: ['Jenkins', 'Terraform', 'AWS', 'Docker', 'Kubernetes', 'Prometheus', 'Grafana', 'Observability'],
      projectId: 'insurance',
      projectBtnText: 'Open Insurance Project Details',
      filter: 'insurance'
    },
    'data-ai': {
      badge: 'ENTERPRISE AI & PLATFORM CONSULTING',
      eyebrow: 'ACTIVE DOMAIN: DATA / ANALYTICS / AI',
      title: 'Enterprise AI-Driven Systems & Platform Engineering',
      meta: 'DATAEKO.AI Pvt Ltd • Hyderabad, Telangana',
      desc: 'Working on real-world consulting and engineering solutions focused on Data, Analytics, and AI-driven systems. Contributing to data projects, application development, and platform engineering workflows while collaborating with industry platforms.',
      highlights: [
        'Consulting on real-world engineering solutions focused on enterprise Data, Analytics, and AI-driven systems.',
        'Contributing to core data projects, application development, and platform engineering workflows.',
        'Collaborating across industry-leading platforms including JFrog Artifactory, IBM watsonx AI, and ClickHouse.'
      ],
      chips: ['JFrog Artifactory', 'IBM watsonx', 'ClickHouse', 'Platform Engineering', 'AI Systems'],
      projectId: null,
      projectBtnText: 'View DATAEKO.AI Experience Details',
      filter: 'experience'
    }
  };

  const EXPERIENCE_DATA = {
    dataeko: {
      roleBadge: 'PLATFORM & AI ENGINEERING',
      title: 'DevOps Engineer',
      company: 'DATAEKO.AI Pvt Ltd • Hyderabad, Telangana',
      period: '',
      bullets: [
        'Working on real-world consulting and engineering solutions focused on Data, Analytics, and AI-driven systems.',
        'Contributing to enterprise data initiatives, application development, and platform engineering workflows.',
        'Collaborating across industry-leading platforms including JFrog, IBM watsonx, and ClickHouse.'
      ],
      chips: ['JFrog', 'IBM watsonx', 'ClickHouse', 'Data & Analytics', 'Platform Engineering'],
      metricIcon: '⚡',
      metricText: 'Enterprise Data Consulting & AI Platform Workflows',
      actionText: 'View Cloud & AI Projects',
      filter: 'cloud'
    },
    staragile: {
      roleBadge: 'CLOUD & CONTAINER ORCHESTRATION',
      title: 'DevOps Intern',
      company: 'StarAgile Technologies Pvt Ltd • Bengaluru, Karnataka',
      period: '',
      bullets: [
        'Built and optimized CI/CD pipelines using Jenkins, Docker, and Kubernetes, boosting deployment efficiency and reducing downtime.',
        'Automated AWS infrastructure with Terraform and Ansible, improving scalability and cutting manual work by 80%.',
        'Managed Kubernetes clusters with auto-scaling and monitoring using Prometheus and Grafana, enhancing system reliability and observability.',
        'Supported cloud migration across major domains and improved Dev-Ops collaboration for faster, smoother delivery.'
      ],
      chips: ['AWS', 'Terraform', 'Ansible', 'Jenkins', 'Docker', 'Kubernetes', 'Prometheus', 'Grafana', 'CI/CD'],
      metricIcon: '☁️',
      metricText: '80% Cut in Manual Infrastructure Work via Terraform & Ansible',
      actionText: 'View DevOps & Cloud Projects',
      filter: 'devops'
    },
    expleo: {
      roleBadge: 'AUTOMOTIVE QA & TEST AUTOMATION',
      title: 'Associate Software Engineer',
      company: 'Expleo Technologies India Pvt Ltd • Bengaluru, Karnataka',
      period: '',
      bullets: [
        'Reviewed software requirements and created 100+ detailed test cases aligned with business goals ensuring comprehensive functionality coverage for automotive infotainment systems.',
        'Performed manual and exploratory testing on infotainment systems for BMW and Mini Cooper conducting Vehicle Testing, NVH Testing, and Safety Validation.',
        'Led defect management and regression testing efforts during release cycles logging and tracking defects in Jira reducing bug resolution time by 35%.',
        'Provided technical guidance and mentorship to 5+ team members on testing methodologies, automotive protocols, and best practices improving team productivity by 30%.',
        'Communicated effectively with international automotive clients (BMW, Mini Cooper) providing regular updates, addressing technical concerns, and maintaining strong stakeholder relationships.',
        'Conducted training and onboarding for 10+ new team members on project processes, testing frameworks, tools, and automotive domain standards.'
      ],
      chips: ['CANoe', 'Ediabas', 'E-SYS', 'FAT Tool', 'DOORS', 'Jira', 'PuTTY', 'Vehicle Testing', 'NVH Testing', 'Python'],
      metricIcon: '⚡',
      metricText: '88% Test Time Reduction & 35% Faster Bug Resolution',
      actionText: 'View Automotive QA & Automation Projects',
      filter: 'automotive'
    }
  };

  const PROJECTS_DATA = {
    expleo: {
      num: '01',
      tag: 'AUTOMATION',
      title: 'Expleo Internal Automation Project',
      meta: 'Associate Software Engineer • Expleo Technologies',
      overview: 'Developed an innovative Python test automation tool utilizing CAN database signals and parameter values specified in test cases, replacing manual repetitive testing procedures. Successfully achieved an 88% reduction in test execution time from 8 hours of manual testing down to 1 hour automated run.',
      highlights: [
        'Engineered Vector CANdb (.dbc) signal parser to automatically map simulated vehicle bus signals with test parameter specifications.',
        'Integrated automation script with Vector CANoe COM APIs for synchronous stimulus injection and real-time response capture.',
        'Automated diagnostic validation checks across ECU message sequences and timing constraints, eliminating human error in repetitive cycles.',
        'Generated automated test execution logs and RTM traceability matrices for defect tracking and engineering audits.'
      ],
      chips: ['Python', 'CAN Protocol', 'CANoe', 'Signal Automation', 'ECU Validation', 'Vector Informatik', 'COM API']
    },
    garmin: {
      num: '02',
      tag: 'AUTOMOTIVE QA',
      title: 'Garmin – Infotainment System QA',
      meta: 'Clients: BMW, Mini Cooper, Rolls-Royce',
      overview: 'Comprehensive testing and QA including Test Planning, Requirement Extraction, Tagging, and Requirement Traceability Matrix (RTM) preparation for premium international automotive clients. Conducted vehicle safety validation, NVH testing, and defect management.',
      highlights: [
        'Authored and executed 100+ comprehensive test cases for BMW, Mini Cooper, and Rolls-Royce head units.',
        'Performed ECU software flashing and firmware parameter coding using BMW E-SYS and Ediabas diagnostic tools.',
        'Extracted and tagged requirements in IBM DOORS to build rigorous end-to-end Requirement Traceability Matrices.',
        'Reduced defect resolution turnaround by 35% through meticulous bug logging, reproduction steps, and Jira regression tracking.'
      ],
      chips: ['Jira', 'DOORS', 'PuTTY', 'Ediabas', 'CANoe', 'FAT Tool', 'IPC', 'CAN/Ethernet', 'E-SYS', 'Software Flashing', 'NVH Testing']
    },
    banking: {
      num: '03',
      tag: 'BANKING DEVOPS',
      title: 'Banking Domain CI/CD & Orchestration',
      meta: 'DevOps Engineer • StarAgile Technologies',
      overview: 'Automated deployment pipeline and microservices container orchestration on Kubernetes ensuring high availability, fault tolerance, and centralized telemetry for high-concurrency banking transactions.',
      highlights: [
        'Engineered automated Jenkins CI/CD pipelines triggered on Git pushes, executing automated unit tests, linting, and Docker container builds.',
        'Orchestrated multi-replica microservices deployment on Kubernetes with zero-downtime rolling updates and automated health probes.',
        'Configured cluster ingress controllers, secrets management, and persistent volume claims for strict banking data isolation.',
        'Deployed centralized Prometheus scraping and custom Grafana visual dashboards for proactive transaction latency monitoring.'
      ],
      chips: ['Jenkins', 'Docker', 'Kubernetes', 'Grafana', 'Prometheus', 'High Availability', 'Git', 'Linux']
    },
    healthcare: {
      num: '04',
      tag: 'HEALTHCARE CLOUD',
      title: 'Healthcare Infrastructure as Code (IaC)',
      meta: 'DevOps Engineer • StarAgile Technologies',
      overview: 'Designed and deployed AWS-based cloud infrastructure using Terraform for Infrastructure as Code (IaC), integrating Docker containers with Kubernetes for seamless application deployment and scalability.',
      highlights: [
        'Codified complete AWS VPC topology, public/private subnets, Internet Gateways, and NAT Gateways using declarative Terraform modules.',
        'Automated EC2 compute provisioning, S3 bucket encryption, and IAM least-privilege role policies with remote Terraform state locking.',
        'Containerized sensitive healthcare patient record APIs using Docker and orchestrated reliable container pods on Kubernetes.',
        'Enforced strict security controls and audit logging compliant with healthcare cloud standards.'
      ],
      chips: ['AWS', 'Terraform', 'IaC', 'Docker', 'Kubernetes', 'Scalability', 'VPC', 'IAM', 'EC2']
    },
    insurance: {
      num: '05',
      tag: 'INSURANCE CLOUD',
      title: 'Insurance Automated Provisioning & Monitoring',
      meta: 'DevOps Engineer • StarAgile Technologies',
      overview: 'Built an automated deployment pipeline with Jenkins and Terraform for fast AWS provisioning, containerized workloads on Kubernetes, and set up Prometheus/Grafana monitoring reducing incident resolution time.',
      highlights: [
        'Integrated Terraform automation within Jenkins CI/CD stages to dynamically spin up and tear down AWS test environments on demand.',
        'Containerized insurance claim processing microservices into lightweight Docker images and deployed them across Kubernetes worker nodes.',
        'Established alerting rules and custom Grafana visual panels tracking CPU/memory saturation, HTTP error rates, and response latency.',
        'Drastically reduced mean time to incident resolution (MTTR) through centralized observability and automated health checks.'
      ],
      chips: ['Jenkins', 'Terraform', 'AWS', 'Docker', 'Kubernetes', 'Prometheus', 'Grafana', 'Alertmanager']
    }
  };

  const SKILL_INSIGHTS = {
    'AWS': { insight: 'Engineered resilient cloud infrastructure using EC2, S3, VPC, and IAM across banking and healthcare microservices.', filter: 'cloud' },
    'EC2': { insight: 'Provisioned and configured elastic compute instances hosting containerized application workloads and CI/CD runners.', filter: 'cloud' },
    'S3': { insight: 'Implemented secure, versioned object storage for build artifacts, configuration backups, and compliance logs.', filter: 'cloud' },
    'VPC': { insight: 'Architected isolated virtual private clouds with custom subnets, security groups, and route tables for microservices security.', filter: 'cloud' },
    'IAM': { insight: 'Enforced least-privilege access control policies and role-based permissions across AWS cloud resources.', filter: 'cloud' },
    'Jenkins': { insight: 'Designed automated declarative CI/CD pipelines for automated testing, Docker container builds, and Kubernetes rollouts.', filter: 'devops' },
    'Docker': { insight: 'Containerized microservices architectures, crafting multi-stage Dockerfiles for lightweight and secure production deployments.', filter: 'devops' },
    'Kubernetes': { insight: 'Orchestrated scalable microservice clusters with automated rollouts, health checks, services, and ingress controllers.', filter: 'devops' },
    'Terraform': { insight: 'Used in Healthcare and Insurance projects for automated AWS infrastructure as code (IaC).', filter: 'cloud' },
    'Ansible': { insight: 'Automated configuration management and infrastructure provisioning across distributed server environments.', filter: 'cloud' },
    'Git': { insight: 'Managed distributed version control, branching strategies, code reviews, and GitOps workflows.', filter: 'devops' },
    'GitHub Actions': { insight: 'Built automated CI workflows for automated linting, test suites, and containerized deployment triggers.', filter: 'devops' },
    'Prometheus': { insight: 'Configured metrics scraping, alerts, and time-series telemetry monitoring across Kubernetes microservices.', filter: 'devops' },
    'Grafana': { insight: 'Constructed real-time visual dashboards tracking cluster performance, latency, and pipeline health.', filter: 'devops' },
    'CloudWatch': { insight: 'Monitored AWS cloud metrics, configured alarms, and centralized application log telemetry.', filter: 'cloud' },
    'Manual Testing': { insight: 'Authored and executed comprehensive test suites for safety-critical automotive infotainment systems.', filter: 'qa' },
    'Regression Testing': { insight: 'Executed rigorous regression test runs to verify zero regression after software flashing and ECU upgrades.', filter: 'qa' },
    'Test Case Development': { insight: 'Crafted 100+ end-to-end test cases based on OEM specifications for BMW and Mini Cooper.', filter: 'qa' },
    'Defect Management': { insight: 'Triaged, logged, and tracked defects through resolution lifecycle in Jira with 35% faster turnaround.', filter: 'qa' },
    'CANoe': { insight: 'Simulated vehicle bus network communications, analyzed CAN traffic, and validated infotainment ECU responses.', filter: 'automotive' },
    'Ediabas': { insight: 'Diagnostic interface utilized for low-level ECU communication and parameter validation in luxury vehicles.', filter: 'automotive' },
    'E-SYS': { insight: 'Engineered ECU software flashing, parameter coding, and firmware verification for BMW Group vehicles.', filter: 'automotive' },
    'FAT Tool': { insight: 'Utilized Factory Acceptance Testing tools to validate infotainment hardware-software integration.', filter: 'automotive' },
    'CAN Protocol': { insight: 'Deep protocol-level analysis of Controller Area Network message frames, signals, and timings.', filter: 'automotive' },
    'UDS Protocol': { insight: 'Unified Diagnostic Services protocol implementation for automotive diagnostic request-response validation.', filter: 'automotive' },
    'ECU Testing': { insight: 'Comprehensive electronic control unit validation ensuring strict automotive safety and functional integrity.', filter: 'automotive' },
    'NVH Testing': { insight: 'Assessed Noise, Vibration, and Harshness test parameters during vehicle infotainment interaction.', filter: 'automotive' },
    'Software Flashing': { insight: 'Automated firmware deployment and ECU flashing routines across multiple electronic control modules.', filter: 'automotive' },
    'Jira': { insight: 'Administered sprint tracking, defect workflows, and requirement traceability linking test cases to Jira issues.', filter: 'qa' },
    'DOORS': { insight: 'IBM Rational DOORS requirement engineering, extraction, and Requirement Traceability Matrix (RTM) maintenance.', filter: 'qa' },
    'SharePoint': { insight: 'Maintained technical documentation repositories, test plans, and cross-functional compliance deliverables.', filter: 'qa' },
    'Microsoft Visual Studio': { insight: 'IDE utilized for script authoring, test framework debugging, and code development.', filter: 'automation' },
    'PuTTY': { insight: 'Secure SSH and serial terminal access for embedded Linux console debugging on infotainment hardware.', filter: 'automotive' },
    'Agile': { insight: 'Practiced Agile/Scrum methodologies with 2-week sprint cadences, standups, and retrospective ceremonies.', filter: 'devops' },
    'SDLC': { insight: 'Full Software Development Life Cycle adherence spanning requirement gathering, architecture, implementation, and deployment.', filter: 'devops' },
    'STLC': { insight: 'Structured Software Testing Life Cycle execution including test planning, design, execution, defect tracking, and closure.', filter: 'qa' },
    'CI/CD': { insight: 'Designed end-to-end Continuous Integration and Continuous Deployment pipelines reducing release cycles.', filter: 'devops' },
    'Infrastructure as Code': { insight: 'Codified cloud infrastructure using Terraform, enabling repeatable, audit-ready, and drift-free deployments.', filter: 'cloud' },
    'ITIL 4 Framework': { insight: 'IT Service Management certified practices for change management, incident handling, and service delivery.', filter: 'devops' },
    'Linux': { insight: 'Extensive hands-on command-line expertise across Ubuntu, Debian, RedHat, and embedded automotive Linux environments.', filter: 'devops' },
    'Python': { insight: 'Engineered custom CAN automation scripts and testing tools, cutting execution workload by 88%.', filter: 'automation' },
    'Windows': { insight: 'Client environment expertise for vehicle diagnostic suites, test execution, and corporate tooling.', filter: 'devops' },
    'Windows Server': { insight: 'Enterprise server management, active directory integration, and test harness execution environments.', filter: 'devops' }
  };

  const TOPIC_TEMPLATES = {
    'DevOps & Cloud Infrastructure Opportunity':
      "Hi Shivang,\n\nI reviewed your portfolio and would like to connect regarding DevOps & Cloud Infrastructure engineering opportunities. We are seeking expertise in AWS, Kubernetes orchestration, CI/CD automation, and Terraform/Ansible Infrastructure as Code.\n\nLooking forward to speaking with you!",

    'Automotive QA & Infotainment Automation':
      "Hi Shivang,\n\nI saw your automotive testing experience with BMW, Mini Cooper, and Rolls-Royce, as well as your custom Python CAN signal automation tool that achieved an 88% workload reduction. We have an automotive software QA and test automation opportunity we'd love to discuss.\n\nBest regards,",

    'Kubernetes Microservices & CI/CD Pipeline':
      "Hi Shivang,\n\nI am reaching out regarding a project requiring microservices deployment on Kubernetes, automated Jenkins CI/CD pipelines, and Prometheus/Grafana observability tracking.\n\nLet's schedule a time to speak.",

    'General Engineering Inquiry':
      "Hi Shivang,\n\nI explored your portfolio and engineering achievements across QA and DevOps. I'd love to connect and discuss potential collaboration.\n\nBest regards,"
  };

  // Expose data objects on window for global access
  window.DOMAINS_DATA = DOMAINS_DATA;
  window.EXPERIENCE_DATA = EXPERIENCE_DATA;
  window.PROJECTS_DATA = PROJECTS_DATA;

  /* ==========================================================================
     GLOBAL ACTION HANDLERS (CALLABLE ANYWHERE / VIA EVENT DELEGATION)
     ========================================================================== */

  window.selectDomain = function(domainKey) {
    const data = DOMAINS_DATA[domainKey] || DOMAINS_DATA.automotive;

    // Update tabs active state
    document.querySelectorAll('.domain-tab').forEach((tab) => {
      const isActive = tab.dataset.domain === domainKey;
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
    });

    // Populate active domain details directly
    const badgeNode = document.getElementById('active-domain-badge');
    const titleNode = document.getElementById('active-domain-title');
    const metaNode = document.getElementById('active-domain-meta');
    const descNode = document.getElementById('active-domain-desc');
    const highlightsNode = document.getElementById('active-domain-highlights');
    const chipsNode = document.getElementById('active-domain-chips');
    const projectBtn = document.getElementById('active-domain-project-btn');
    const projectBtnText = document.getElementById('active-domain-project-btn-text');
    const filterBtn = document.getElementById('active-domain-filter-btn');

    if (badgeNode) badgeNode.textContent = data.badge;
    if (titleNode) titleNode.textContent = data.title;
    if (metaNode) metaNode.textContent = data.meta;
    if (descNode) descNode.textContent = data.desc;

    if (highlightsNode) {
      highlightsNode.innerHTML = data.highlights.map(h => `<li>${escapeHtml(h)}</li>`).join('');
    }

    if (chipsNode) {
      chipsNode.innerHTML = data.chips.map(c => `<span>${escapeHtml(c)}</span>`).join('');
    }

    if (projectBtn && projectBtnText) {
      projectBtn.dataset.projectId = data.projectId || '';
      projectBtnText.textContent = data.projectBtnText;
    }

    if (filterBtn) {
      filterBtn.dataset.filter = data.filter;
    }
  };

  window.selectExperience = function(expKey) {
    const data = EXPERIENCE_DATA[expKey] || EXPERIENCE_DATA.dataeko;

    document.querySelectorAll('.experience-tab').forEach((tab) => {
      const isActive = tab.dataset.exp === expKey;
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
    });

    const roleBadge = document.getElementById('exp-role-badge');
    const titleNode = document.getElementById('exp-detail-title');
    const companyNode = document.getElementById('exp-detail-company');
    const periodNode = document.getElementById('exp-detail-period');
    const bulletsList = document.getElementById('exp-bullets-list');
    const chipsNode = document.getElementById('exp-detail-chips');
    const metricIcon = document.getElementById('exp-metric-icon');
    const metricText = document.getElementById('exp-metric-text');
    const actionBtn = document.getElementById('exp-action-btn');
    const actionBtnText = document.getElementById('exp-action-btn-text');

    if (roleBadge) roleBadge.textContent = data.roleBadge;
    if (titleNode) titleNode.textContent = data.title;
    if (companyNode) companyNode.textContent = data.company;
    if (periodNode) periodNode.textContent = data.period;

    if (bulletsList) {
      bulletsList.innerHTML = data.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join('');
    }

    if (chipsNode) {
      chipsNode.innerHTML = data.chips.map(c => `<span>${escapeHtml(c)}</span>`).join('');
    }

    if (metricIcon) metricIcon.textContent = data.metricIcon;
    if (metricText) metricText.textContent = data.metricText;

    if (actionBtn && actionBtnText) {
      actionBtn.dataset.filter = data.filter;
      actionBtnText.textContent = data.actionText;
    }
  };

  window.filterProjects = function(category) {
    const f = (category || 'all').toLowerCase();
    const filterPills = document.querySelectorAll('.filter-pill');
    const featuredCard = document.querySelector('.featured-project-card');
    const modernCards = document.querySelectorAll('.modern-project-card');
    const counterBadge = document.getElementById('project-counter-badge');

    filterPills.forEach((pill) => {
      const isMatch = (pill.dataset.filter || 'all').toLowerCase() === f;
      pill.classList.toggle('is-active', isMatch);
      pill.setAttribute('aria-selected', String(isMatch));
    });

    let visibleCount = 0;
    if (featuredCard) {
      const cat = (featuredCard.dataset.category || '').toLowerCase();
      const matches = f === 'all' || cat.includes(f);
      featuredCard.classList.toggle('is-hidden', !matches);
      if (matches) visibleCount++;
    }

    modernCards.forEach((card) => {
      const cat = (card.dataset.category || '').toLowerCase();
      const matches = f === 'all' || cat.includes(f);
      card.classList.toggle('is-hidden', !matches);
      if (matches) visibleCount++;
    });

    if (counterBadge) {
      counterBadge.textContent = `${visibleCount} Project${visibleCount === 1 ? '' : 's'}`;
    }
  };

  window.openProjectModal = function(projectId) {
    const data = PROJECTS_DATA[projectId] || PROJECTS_DATA.expleo;
    const modal = document.getElementById('project-modal');
    if (!modal) return;

    const badgeNumNode = document.getElementById('modal-badge-num');
    const badgeTagNode = document.getElementById('modal-badge-tag');
    const titleNode = document.getElementById('modal-project-title');
    const metaNode = document.getElementById('modal-meta');
    const overviewNode = document.getElementById('modal-overview');
    const highlightsNode = document.getElementById('modal-highlights');
    const chipsNode = document.getElementById('modal-chips');

    if (badgeNumNode) badgeNumNode.textContent = data.num;
    if (badgeTagNode) badgeTagNode.textContent = data.tag;
    if (titleNode) titleNode.textContent = data.title;
    if (metaNode) metaNode.textContent = data.meta;
    if (overviewNode) overviewNode.textContent = data.overview;

    if (highlightsNode) {
      highlightsNode.innerHTML = data.highlights.map(h => `<li>${escapeHtml(h)}</li>`).join('');
    }

    if (chipsNode) {
      chipsNode.innerHTML = data.chips.map(c => `<span>${escapeHtml(c)}</span>`).join('');
    }

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  window.closeProjectModal = function() {
    const modal = document.getElementById('project-modal');
    if (modal) {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  window.openCertModal = function(certId) {
    const certs = (typeof window !== 'undefined' && Array.isArray(window.CERTIFICATIONS_DATA)) ? window.CERTIFICATIONS_DATA : [];
    const certIndex = certs.findIndex(c => c.id === certId);
    const cert = certIndex >= 0 ? certs[certIndex] : certs[0];
    if (!cert) return;

    const modal = document.getElementById('cert-modal');
    if (!modal) return;

    const numNode = document.getElementById('modal-cert-num');
    const tagNode = document.getElementById('modal-cert-tag');
    const titleNode = document.getElementById('modal-cert-title');
    const issuerNode = document.getElementById('modal-cert-issuer');
    const descNode = document.getElementById('modal-cert-desc');
    const chipsNode = document.getElementById('modal-cert-chips');

    if (numNode) numNode.textContent = String(certIndex + 1).padStart(2, '0');
    if (tagNode) tagNode.textContent = (cert.category || 'CERTIFICATION').toUpperCase();
    if (titleNode) titleNode.textContent = cert.name;
    if (issuerNode) issuerNode.textContent = `Issued by ${cert.issuer}`;
    if (descNode) descNode.textContent = cert.description || 'Verified industry credential and standard examination.';

    if (chipsNode) {
      const skillsList = Array.isArray(cert.skills) ? cert.skills : [cert.category];
      chipsNode.innerHTML = skillsList.map(s => `<span>${escapeHtml(s)}</span>`).join('');
    }

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  window.closeCertModal = function() {
    const modal = document.getElementById('cert-modal');
    if (modal) {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  window.filterCertifications = function(filterCategory) {
    const f = (filterCategory || 'all').toLowerCase();
    const pills = document.querySelectorAll('.cert-filter-pill');
    const cards = document.querySelectorAll('#certs-grid .cert-card');
    const certsCount = document.getElementById('certs-count');

    pills.forEach((p) => {
      const isMatch = (p.dataset.filter || 'all').toLowerCase() === f;
      p.classList.toggle('is-active', isMatch);
      p.setAttribute('aria-selected', String(isMatch));
    });

    let visible = 0;
    cards.forEach((card) => {
      const cat = (card.dataset.category || '').toLowerCase();
      const matches = f === 'all' || cat === f;
      card.classList.toggle('is-hidden', !matches);
      if (matches) visible++;
    });

    if (certsCount) {
      certsCount.textContent = f === 'all' ? `${cards.length} Certifications` : `Showing ${visible} of ${cards.length} Certifications`;
    }
  };

  window.inspectSkill = function(skillName) {
    const banner = document.getElementById('skill-inspector-banner');
    const titleNode = document.getElementById('inspector-title');
    const descNode = document.getElementById('inspector-desc');
    const linkBtn = document.getElementById('inspector-link-btn');
    const linkText = document.getElementById('inspector-link-text');

    document.querySelectorAll('.cap-chip').forEach((c) => {
      const name = c.dataset.skill || c.textContent.trim();
      c.classList.toggle('is-active', name.toLowerCase() === skillName.toLowerCase());
    });

    const info = SKILL_INSIGHTS[skillName] || { insight: 'Key engineering capability applied in cloud infrastructure, automation, and continuous delivery workflows.', filter: 'devops' };

    if (titleNode) titleNode.textContent = skillName;
    if (descNode) descNode.textContent = info.insight;

    if (linkBtn && linkText) {
      linkBtn.dataset.filter = info.filter;
      linkText.textContent = `View ${skillName} in Projects`;
    }

    if (banner) {
      banner.classList.remove('is-hidden');
    }
  };

  window.selectQuickTopic = function(topic) {
    const messageField = document.getElementById('contact-message');
    if (!messageField) return;

    const template = TOPIC_TEMPLATES[topic] || `Hi Shivang,\n\nI would like to discuss: ${topic}.\n\nBest regards,`;
    messageField.value = template;
    messageField.focus();

    messageField.classList.add('flash-highlight');
    window.setTimeout(() => messageField.classList.remove('flash-highlight'), 600);
  };

  /* ==========================================================================
     GLOBAL EVENT DELEGATION (INFALLIBLE CLICK BINDING)
     ========================================================================== */

  document.addEventListener('click', (e) => {
    // 1. Domain tab click
    const domainTab = e.target.closest('[data-domain]');
    if (domainTab) {
      e.preventDefault();
      window.selectDomain(domainTab.dataset.domain);
      return;
    }

    // 2. Active domain project action button
    const domainProjectBtn = e.target.closest('#active-domain-project-btn');
    if (domainProjectBtn) {
      e.preventDefault();
      const pid = domainProjectBtn.dataset.projectId;
      if (pid && PROJECTS_DATA[pid]) {
        window.openProjectModal(pid);
      } else {
        scrollToTarget('#experience');
        window.selectExperience('dataeko');
      }
      return;
    }

    // 3. Active domain filter action button
    const domainFilterBtn = e.target.closest('#active-domain-filter-btn');
    if (domainFilterBtn) {
      e.preventDefault();
      const filter = domainFilterBtn.dataset.filter || 'automotive';
      scrollToTarget('#projects');
      window.filterProjects(filter);
      return;
    }

    // 4. Experience tab click
    const expTab = e.target.closest('[data-exp]');
    if (expTab) {
      e.preventDefault();
      window.selectExperience(expTab.dataset.exp);
      return;
    }

    // 5. Experience action button
    const expActionBtn = e.target.closest('#exp-action-btn');
    if (expActionBtn) {
      e.preventDefault();
      const filter = expActionBtn.dataset.filter || 'devops';
      scrollToTarget('#projects');
      window.filterProjects(filter);
      return;
    }

    // 6. Project filter pill click
    const filterPill = e.target.closest('.filter-pill');
    if (filterPill) {
      e.preventDefault();
      window.filterProjects(filterPill.dataset.filter);
      return;
    }

    // 7. Project card or view button click
    const projectTrigger = e.target.closest('[data-project-id]');
    if (projectTrigger) {
      e.preventDefault();
      window.openProjectModal(projectTrigger.dataset.projectId);
      return;
    }

    // 8. Skill chip click
    const capChip = e.target.closest('.cap-chip');
    if (capChip) {
      e.preventDefault();
      window.inspectSkill(capChip.dataset.skill || capChip.textContent.trim());
      return;
    }

    // 9. Inspector link button
    const inspectorLinkBtn = e.target.closest('#inspector-link-btn');
    if (inspectorLinkBtn) {
      e.preventDefault();
      const filter = inspectorLinkBtn.dataset.filter || 'devops';
      scrollToTarget('#projects');
      window.filterProjects(filter);
      return;
    }

    // 10. Inspector close button
    const inspectorCloseBtn = e.target.closest('#inspector-close');
    if (inspectorCloseBtn) {
      e.preventDefault();
      document.getElementById('skill-inspector-banner')?.classList.add('is-hidden');
      document.querySelectorAll('.cap-chip').forEach(c => c.classList.remove('is-active'));
      return;
    }

    // 11. Cert filter pill click
    const certFilterPill = e.target.closest('.cert-filter-pill');
    if (certFilterPill) {
      e.preventDefault();
      window.filterCertifications(certFilterPill.dataset.filter);
      return;
    }

    // 12. Cert card or view button click
    const certTrigger = e.target.closest('[data-cert-id]');
    if (certTrigger) {
      // Don't intercept if clicking an external link inside
      if (!e.target.closest('a')) {
        e.preventDefault();
        window.openCertModal(certTrigger.dataset.certId);
      }
      return;
    }

    // 13. Quick topic button click
    const quickTopicBtn = e.target.closest('.quick-topic-btn');
    if (quickTopicBtn) {
      e.preventDefault();
      window.selectQuickTopic(quickTopicBtn.dataset.topic);
      return;
    }

    // 14. Project modal close buttons
    if (e.target.closest('#modal-close-btn') || e.target.matches('#project-modal-backdrop')) {
      e.preventDefault();
      window.closeProjectModal();
      return;
    }

    // 15. Cert modal close buttons
    if (e.target.closest('#cert-modal-close-btn') || e.target.matches('#cert-modal-backdrop')) {
      e.preventDefault();
      window.closeCertModal();
      return;
    }

    // 16. Discuss build button in modal
    if (e.target.closest('#modal-discuss-btn')) {
      window.closeProjectModal();
      return;
    }
  });

  // Keyboard accessibility (Escape key closes modals)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeProjectModal();
      window.closeCertModal();
    }
  });

  /* ==========================================================================
     INITIALIZATION ROUTINE
     ========================================================================== */

  function initPortfolio() {
    try {
      document.documentElement.classList.add('js-enabled');
    } catch (_) {}

    // Year in footer
    const yearNode = document.getElementById('year');
    if (yearNode) {
      yearNode.textContent = String(new Date().getFullYear());
    }

    // Hero rotating word
    const roleNode = document.getElementById('rotating-word');
    const roles = ['DevOps Engineer', 'Cloud Infrastructure', 'Kubernetes Orchestration', 'Automotive QA', 'Test Automation'];
    if (roleNode && !isReducedMotion()) {
      let roleIdx = 0;
      window.setInterval(() => {
        roleIdx = (roleIdx + 1) % roles.length;
        roleNode.classList.add('changing');
        window.setTimeout(() => {
          roleNode.textContent = roles[roleIdx];
          roleNode.classList.remove('changing');
        }, 140);
      }, 2200);
    }

    // Mobile nav toggle
    const menuButton = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuButton && navLinks) {
      menuButton.addEventListener('click', () => {
        const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
        menuButton.setAttribute('aria-expanded', String(!isOpen));
        menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
        navLinks.classList.toggle('open', !isOpen);
      });

      navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          menuButton.setAttribute('aria-expanded', 'false');
          menuButton.setAttribute('aria-label', 'Open navigation');
          navLinks.classList.remove('open');
        });
      });
    }

    // ScrollSpy
    try {
      const sections = [...document.querySelectorAll('main section[id]')];
      const navItems = navLinks ? [...navLinks.querySelectorAll('a')] : [];
      if (sections.length && navItems.length && typeof window.IntersectionObserver === 'function') {
        const sectionObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            navItems.forEach((link) => {
              const active = link.hash === `#${entry.target.id}`;
              link.classList.toggle('active', active);
              if (active) link.setAttribute('aria-current', 'location');
              else link.removeAttribute('aria-current');
            });
          });
        }, { rootMargin: '-24% 0px -64% 0px', threshold: 0 });
        sections.forEach(s => sectionObserver.observe(s));
      }
    } catch (_) {}

    // Reveal animations
    try {
      if (typeof window.IntersectionObserver === 'function') {
        const revealObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          });
        }, { threshold: 0.12 });

        document.querySelectorAll('.reveal').forEach((el, index) => {
          el.style.transitionDelay = `${(index % 4) * 65}ms`;
          revealObserver.observe(el);
        });
      } else {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
      }
    } catch (_) {}

    // Key Metrics click navigation
    try {
      const metricCards = document.querySelectorAll('.metric-card');
      const metricTargets = ['#project-01', '#project-04', '#project-02', '#project-02', '#experience'];
      metricCards.forEach((card, i) => {
        card.addEventListener('click', () => {
          const target = metricTargets[i];
          if (target) {
            scrollToTarget(target);
            if (target === '#experience') window.selectExperience('expleo');
          }
        });
      });
    } catch (_) {}

    // Populate Certifications
    try {
      renderCertifications();
    } catch (e) {
      console.warn('renderCertifications error:', e);
    }

    // 3D Badges Carousel
    try {
      setupBadgesRoundCarousel();
    } catch (e) {
      console.warn('setupBadgesRoundCarousel error:', e);
    }

    // Contact Form
    const form = document.getElementById('contact-form');
    if (form) {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!form.reportValidity()) return;
        const formData = new FormData(form);
        const subject = encodeURIComponent(`Portfolio inquiry from ${formData.get('name')}`);
        const body = encodeURIComponent(`Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\n\n${formData.get('message')}`);
        const status = document.getElementById('form-status');
        if (status) status.textContent = 'Opening your email app…';
        window.location.href = `mailto:shivanggupta998@gmail.com?subject=${subject}&body=${body}`;
      });
    }

    // WebGL Accretion Disk Background
    try {
      setupBackground();
    } catch (e) {
      console.warn('setupBackground error:', e);
    }
  }

  function renderCertifications() {
    const certsGrid = document.getElementById('certs-grid');
    const badgeStatCount = document.getElementById('badge-stat-count');
    const certsCount = document.getElementById('certs-count');
    const badgesCount = document.getElementById('badges-count');

    const certs = (typeof window !== 'undefined' && Array.isArray(window.CERTIFICATIONS_DATA)) ? window.CERTIFICATIONS_DATA : [];
    const badges = (typeof window !== 'undefined' && Array.isArray(window.BADGES_DATA)) ? window.BADGES_DATA : [];
    const totalCount = certs.length + badges.length;

    if (badgeStatCount) badgeStatCount.textContent = `${totalCount}+ Verified Credentials`;
    if (certsCount) certsCount.textContent = `${certs.length} Certifications`;
    if (badgesCount) badgesCount.textContent = `${badges.length} Verified Badges`;

    if (!certsGrid) return;
    certsGrid.innerHTML = '';

    certs.forEach((cert, index) => {
      const card = document.createElement('article');
      card.className = 'cert-card glass-panel reveal is-visible';
      card.dataset.category = (cert.filterCategory || 'cloud').toLowerCase();
      card.dataset.certId = cert.id;
      const numStr = String(index + 1).padStart(2, '0');

      card.innerHTML = `
        <div class="cert-card-top">
          <span class="cert-category-tag">${escapeHtml(cert.category || 'Certification')}</span>
          <span class="cert-icon" aria-hidden="true">${cert.badgeIcon || '📜'}</span>
        </div>
        <div class="cert-content">
          <h3 class="cert-title">${escapeHtml(cert.name)}</h3>
          <p class="cert-issuer">
            <span class="cert-verified-check" aria-hidden="true">✓</span>
            ${escapeHtml(cert.issuer)}
          </p>
          ${cert.description ? `<p class="cert-desc">${escapeHtml(cert.description)}</p>` : ''}
        </div>
        <div class="cert-card-footer">
          <span class="cert-status-badge">Certified Standard</span>
          <button class="cert-view-btn" type="button" data-cert-id="${cert.id}">View Details &rarr;</button>
        </div>
      `;

      certsGrid.appendChild(card);
    });
  }

  function setupBadgesRoundCarousel() {
    const ring = document.getElementById('round-carousel-ring');
    const scene = document.getElementById('round-carousel-scene');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const playBtn = document.getElementById('carousel-toggle-play');

    if (!ring || !scene) return;

    const badges = (typeof window !== 'undefined' && Array.isArray(window.BADGES_DATA)) ? window.BADGES_DATA : [];
    if (!badges.length) {
      ring.innerHTML = '<p style="color: var(--muted); font-size: 13px;">No badges loaded.</p>';
      return;
    }

    const count = badges.length;
    const angle = 360 / count;
    const sensitivity = 5;
    const speed = 5;
    const degPerSec = speed * 6;
    const innerDim = 6;

    let rotY = 0;
    let targetRotY = null;
    let vel = 0;
    let lastTime = Date.now();
    let isPlaying = !isReducedMotion();
    const dragState = { active: false, startX: 0, lastX: 0, moved: 0 };

    let imageWidth = 301;
    let imageHeight = 460;
    let spacing = 1;
    let radius = 533;
    let perspective = 3000;

    function updateConfig() {
      const w = window.innerWidth;
      if (w < 480) {
        imageWidth = 195;
        imageHeight = 300;
        spacing = 0.8;
        perspective = 1500;
      } else if (w < 850) {
        imageWidth = 240;
        imageHeight = 370;
        spacing = 0.9;
        perspective = 2200;
      } else {
        imageWidth = 301;
        imageHeight = 460;
        spacing = 1;
        perspective = 3000;
      }

      const factor = 1 + spacing * 0.15;
      radius = (imageWidth * factor) / (2 * Math.tan(Math.PI / count));

      scene.style.perspective = `${perspective}px`;
      ring.style.width = `${imageWidth}px`;
      ring.style.height = `${imageHeight}px`;

      const items = ring.querySelectorAll('.round-carousel-item');
      items.forEach((item, i) => {
        item.style.transform = `rotateY(${i * angle}deg) translateZ(${radius}px)`;
      });

      applyTransform();
    }

    function applyTransform() {
      ring.style.transform = `translateZ(${-radius}px) rotateY(${rotY}deg)`;
    }

    ring.innerHTML = '';
    badges.forEach((badge, index) => {
      const item = document.createElement('div');
      item.className = 'round-carousel-item';
      item.dataset.index = String(index);

      const skillsList = Array.isArray(badge.skills) ? badge.skills.slice(0, 3) : [];
      const skillsHtml = skillsList.length > 0
        ? `<div class="badge-skills" aria-label="Skills covered">
            ${skillsList.map((s) => `<span>${escapeHtml(s)}</span>`).join('')}
           </div>`
        : '';

      item.innerHTML = `
        <div class="carousel-face carousel-face-front">
          <div class="badge-card-top">
            <span class="badge-issuer-tag">
              <span class="badge-verified-check" aria-hidden="true">✓</span>
              ${escapeHtml(badge.issuer)}
            </span>
          </div>
          <div class="badge-visual-link">
            <div class="badge-visual-glow" aria-hidden="true"></div>
            <img class="badge-image" src="${escapeHtml(badge.image)}" alt="${escapeHtml(badge.name)} badge icon" loading="lazy" width="104" height="104" />
          </div>
          <div class="badge-content">
            <h4 class="badge-title">
              <a class="badge-card-link" href="${escapeHtml(badge.credentialUrl)}" target="_blank" rel="noopener noreferrer">
                ${escapeHtml(badge.name)}
              </a>
            </h4>
            <p class="badge-issuer-sub">${escapeHtml(badge.issuer)} &bull; Verified Credential</p>
            ${badge.description ? `<p class="badge-desc" title="${escapeHtml(badge.description)}">${escapeHtml(badge.description)}</p>` : ''}
            ${skillsHtml}
          </div>
          <div class="badge-action">
            <a class="badge-btn badge-card-link" href="${escapeHtml(badge.credentialUrl)}" target="_blank" rel="noopener noreferrer">
              <span>Verify Credential</span>
              <span class="badge-btn-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <div class="carousel-face carousel-face-back" style="filter: brightness(${innerDim / 10});" aria-hidden="true">
          <span class="carousel-back-crest">🏆</span>
          <span class="carousel-back-text">Credly Verified</span>
        </div>
      `;

      item.addEventListener('click', (e) => {
        if (dragState.moved > 8) return;
        if (e.target.closest('.badge-card-link')) return;
        rotateToCard(index);
      });

      ring.appendChild(item);
    });

    function rotateToCard(index) {
      const currentCards = Math.round(rotY / angle);
      const targetCard = -index;
      let diff = (targetCard - currentCards) % count;
      if (diff > count / 2) diff -= count;
      if (diff < -count / 2) diff += count;
      targetRotY = (currentCards + diff) * angle;
      vel = 0;
      isPlaying = false;
      if (playBtn) {
        playBtn.classList.add('is-paused');
        playBtn.textContent = '▶';
      }
    }

    function stepBadge(direction) {
      const currentPos = targetRotY !== null ? targetRotY : rotY;
      const nearestCard = Math.round(currentPos / angle);
      targetRotY = (nearestCard + direction) * angle;
      vel = 0;
      isPlaying = false;
      if (playBtn) {
        playBtn.classList.add('is-paused');
        playBtn.textContent = '▶';
      }
    }

    updateConfig();

    function draw() {
      const now = Date.now();
      const dt = lastTime ? (now - lastTime) / 1000 : 0;
      lastTime = now;
      const f = Math.min(dt, 0.1);

      if (!dragState.active) {
        if (targetRotY !== null) {
          const diff = targetRotY - rotY;
          if (Math.abs(diff) < 0.15) {
            rotY = targetRotY;
            targetRotY = null;
            vel = 0;
          } else {
            rotY += diff * 0.14;
            vel = 0;
          }
        } else if (Math.abs(vel) > 0.01) {
          rotY += vel * f;
          vel *= 0.94;
        } else if (isPlaying) {
          rotY += degPerSec * f;
        }
      }
      applyTransform();

      if (typeof window.requestAnimationFrame === 'function') {
        window.requestAnimationFrame(draw);
      }
    }

    if (typeof window.requestAnimationFrame === 'function') {
      window.requestAnimationFrame(draw);
    }

    scene.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      try { scene.setPointerCapture?.(e.pointerId); } catch (_) {}
      dragState.active = true;
      dragState.startX = e.clientX;
      dragState.lastX = e.clientX;
      dragState.moved = 0;
      targetRotY = null;
      vel = 0;
    });

    scene.addEventListener('pointermove', (e) => {
      if (!dragState.active) return;
      const dx = e.clientX - dragState.lastX;
      dragState.lastX = e.clientX;
      dragState.moved += Math.abs(dx);
      const k = 0.3 * sensitivity;
      rotY += dx * k;
      vel = dx * k * 60;
      applyTransform();
    });

    const endDrag = (e) => {
      if (dragState.active) {
        try { scene.releasePointerCapture?.(e.pointerId); } catch (_) {}
        dragState.active = false;
      }
    };
    scene.addEventListener('pointerup', endDrag);
    scene.addEventListener('pointercancel', endDrag);

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        stepBadge(1);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        stepBadge(-1);
      });
    }
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        const paused = playBtn.classList.toggle('is-paused');
        isPlaying = !paused;
        targetRotY = null;
        playBtn.textContent = paused ? '▶' : '❚❚';
      });
    }

    window.addEventListener('resize', updateConfig, { passive: true });
  }

  function setupBackground() {
    const canvas = document.getElementById('accretion-canvas');
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'low-power' });
    if (!gl) {
      canvas.classList.add('no-webgl');
      return;
    }

    const vertexSource = `
      attribute vec2 a_position;
      void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
    `;
    const fragmentSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_time;
      void main() {
        vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);
        float r = max(length(p), 0.001);
        float angle = atan(p.y, p.x);
        float time = u_time * 0.42;
        float ringRadius = length(vec2(p.x, p.y * 2.4));
        float band = exp(-pow((ringRadius - 0.29) / 0.074, 2.0));
        float spiral = 0.5 + 0.5 * cos(angle * 3.0 - log(r) * 5.8 - time);
        float disc = band * (0.23 + 0.77 * pow(spiral, 3.0));
        vec3 orange = vec3(1.0, 0.25, 0.0);
        vec3 gold = vec3(1.0, 0.75, 0.45);
        vec3 color = mix(orange, gold, clamp(0.22 + spiral * 0.58, 0.0, 1.0)) * disc * 1.5;
        vec3 background = vec3(0.012, 0.012, 0.013);
        gl_FragColor = vec4(background + color, 1.0);
      }
    `;

    const compile = (type, src) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    };

    const vs = compile(gl.VERTEX_SHADER, vertexSource);
    const fs = compile(gl.FRAGMENT_SHADER, fragmentSource);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    gl.useProgram(prog);

    const pos = gl.getAttribLocation(prog, 'a_position');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    const uTime = gl.getUniformLocation(prog, 'u_time');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.round(window.innerWidth * dpr));
      canvas.height = Math.max(1, Math.round(window.innerHeight * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const startTime = Date.now();
    function renderBg() {
      if (!document.hidden) {
        const elapsed = (Date.now() - startTime) * 0.0004;
        gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.uniform1f(uTime, elapsed);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      if (typeof window.requestAnimationFrame === 'function') {
        window.requestAnimationFrame(renderBg);
      }
    }
    if (typeof window.requestAnimationFrame === 'function') {
      window.requestAnimationFrame(renderBg);
    }
  }

  // Double-guarantee DOM readiness
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolio);
  } else {
    initPortfolio();
  }
})();
