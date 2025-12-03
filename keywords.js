class KeywordsController {
  constructor() {
    this.init();
  }

  init() {
    this.loadAllKeywords();
    this.setupSearch();
  }

  setupSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
      this.filterKeywords(e.target.value);
    });
  }

  filterKeywords(query) {
    const allKeywords = this.getAllKeywords();
    const filteredKeywords = allKeywords.filter(keyword => {
      const searchText = `${keyword.service} ${keyword.summary} ${keyword.keywords.join(' ')}`.toLowerCase();
      return searchText.includes(query.toLowerCase());
    });
    this.renderKeywords(filteredKeywords);
  }

  renderKeywords(keywords) {
    const tableBody = document.getElementById('keywordsTableBody');
    tableBody.innerHTML = '';

    keywords.forEach(keyword => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${keyword.service}</td>
        <td>${keyword.summary}</td>
        <td>${keyword.keywords.join(', ')}</td>
      `;
      tableBody.appendChild(row);
    });
  }

  loadAllKeywords() {
    const allKeywords = this.getAllKeywords();
    const tableBody = document.getElementById('keywordsTableBody');
    tableBody.innerHTML = '';

    allKeywords.forEach(keyword => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${keyword.service}</td>
        <td>${keyword.summary}</td>
        <td>${keyword.keywords.join(', ')}</td>
      `;
      tableBody.appendChild(row);
    });
  }

  getAllKeywords() {
    return [
      {
        service: "Amazon Athena",
        summary: "Interactive query service to analyze data directly in Amazon S3 using standard SQL. Serverless, so no infrastructure to manage, and you pay per query.",
        keywords: ["Serverless", "S3", "SQL", "Presto", "Pay-per-query", "Schema-on-read", "Federated queries"]
      },
      {
        service: "Amazon CloudSearch",
        summary: "Fully managed search service that makes it easy to set up, manage, and scale a search solution for your website or application.",
        keywords: ["Managed search", "Full-text search", "Indexing", "Faceting", "Auto-scaling", "Relevance tuning"]
      },
      {
        service: "Amazon DataZone",
        summary: "Data management service that helps you catalog, discover, share, and govern data across AWS, on-premises, and SaaS sources.",
        keywords: ["Data catalog", "Data governance", "Data sharing", "Metadata", "Collaboration", "Data portal"]
      },
      {
        service: "Amazon EMR (Elastic MapReduce)",
        summary: "Managed big data platform for running open-source frameworks like Hadoop, Spark, and Hive to process large datasets efficiently.",
        keywords: ["Big data", "Hadoop", "Spark", "Hive", "Presto", "Cluster", "Data processing", "Spot instances"]
      },
      {
        service: "Amazon FinSpace",
        summary: "Data management and analytics service for the financial industry to store, prepare, and analyze financial data at scale.",
        keywords: ["Financial data", "Analytics", "Data catalog", "Time-series", "Compliance", "Data preparation"]
      },
      {
        service: "Amazon Kinesis",
        summary: "Platform for real-time data collection, processing, and analysis. Supports data streaming for analytics, machine learning, and monitoring.",
        keywords: ["Real-time analytics", "Streaming data", "Producers", "Consumers", "Partition key", "Shards"]
      },
      {
        service: "Amazon Kinesis Data Firehose",
        summary: "Fully managed service to reliably load streaming data into data lakes, warehouses, and analytics tools like S3, Redshift, and OpenSearch.",
        keywords: ["Data delivery", "Real-time streaming", "Buffering", "Transformation", "Compression", "Destination"]
      },
      {
        service: "Amazon Managed Service for Apache Flink",
        summary: "Managed Apache Flink for real-time stream processing, enabling stateful analytics and complex event processing.",
        keywords: ["Real-time processing", "Apache Flink", "Stateful", "Streaming analytics", "ETL", "Scalability"]
      },
      {
        service: "Amazon Kinesis Data Streams",
        summary: "Ingests and processes large amounts of streaming data in real-time for analytics or event-driven applications.",
        keywords: ["Real-time", "Shards", "Consumers", "Data producers", "Throughput", "Checkpoints", "Scaling"]
      },
      {
        service: "Amazon Kinesis Video Streams",
        summary: "Makes it easy to securely stream video from connected devices to AWS for analytics, machine learning, and playback.",
        keywords: ["Video streaming", "Real-time", "IoT cameras", "Playback", "Rekognition integration", "Storage"]
      },
      {
        service: "Amazon OpenSearch Service",
        summary: "Managed service to deploy, operate, and scale OpenSearch clusters for search and analytics workloads.",
        keywords: ["OpenSearch", "Elasticsearch", "Kibana", "Visualization", "Indexing", "Domains", "Clusters"]
      },
      {
        service: "Amazon OpenSearch Serverless",
        summary: "Serverless variant of OpenSearch for on-demand search and analytics without managing clusters or capacity.",
        keywords: ["Serverless", "OpenSearch", "Search analytics", "Auto scaling", "On-demand", "Cost efficiency"]
      },
      {
        service: "Amazon Redshift",
        summary: "Fully managed cloud data warehouse that allows querying and analyzing structured and semi-structured data using SQL.",
        keywords: ["Data warehouse", "SQL", "OLAP", "Columnar storage", "Spectrum", "Cluster", "Concurrency scaling"]
      },
      {
        service: "Amazon Redshift Serverless",
        summary: "Lets you run and scale analytics without managing clusters or capacity; you only pay for the compute used.",
        keywords: ["Serverless", "Data warehouse", "SQL", "On-demand scaling", "Workload isolation", "Pay-per-use"]
      },
      {
        service: "QuickSight",
        summary: "Business intelligence (BI) service for creating interactive dashboards and visualizations from AWS and external data sources.",
        keywords: ["BI", "Dashboards", "Visualizations", "ML insights", "SPICE engine", "Sharing", "Embedded analytics"]
      },
      {
        service: "AWS Clean Rooms",
        summary: "Enables multiple parties to analyze and collaborate on datasets securely without sharing or revealing raw data.",
        keywords: ["Data collaboration", "Privacy-preserving", "Analytics", "Encryption", "Multi-party", "Governance"]
      },
      {
        service: "AWS Data Exchange",
        summary: "Makes it easy to find, subscribe to, and use third-party data in the cloud securely and efficiently.",
        keywords: ["Data marketplace", "Subscriptions", "Third-party data", "APIs", "Licensing", "Integration"]
      },
      {
        service: "AWS Data Pipeline",
        summary: "Orchestration service to move and process data between AWS compute and storage services at defined intervals.",
        keywords: ["Data workflow", "ETL", "Scheduling", "Automation", "Data movement", "Fault tolerance"]
      },
      {
        service: "AWS Entity Resolution",
        summary: "Service to match, link, and identify related data across multiple data sources using ML-based matching algorithms.",
        keywords: ["Data matching", "Record linkage", "ML matching", "Identity resolution", "Data quality"]
      },
      {
        service: "AWS Glue",
        summary: "Serverless data integration service that prepares and transforms data for analytics, ML, and application development.",
        keywords: ["ETL", "Data catalog", "Crawlers", "Jobs", "PySpark", "Serverless", "Transformations"]
      },
      {
        service: "AWS Lake Formation",
        summary: "Simplifies building and securing a data lake on AWS; helps manage data ingestion, access control, and cataloging.",
        keywords: ["Data lake", "Permissions", "Catalog", "S3", "Governance", "Access control", "Blueprint"]
      },
      {
        service: "Amazon MSK (Managed Streaming for Apache Kafka)",
        summary: "Fully managed service to build and run applications using Apache Kafka for real-time data streaming.",
        keywords: ["Apache Kafka", "Managed streaming", "Topics", "Brokers", "Producers", "Consumers", "Scaling"]
      },
      {
        service: "AWS Step Functions",
        summary: "Serverless orchestration service that coordinates multiple AWS services into workflows using visual state machines. Ideal for building data pipelines, automation, and microservices coordination.",
        keywords: ["Workflow orchestration", "State machines", "Lambda integration", "JSON definition", "Retry", "Parallel execution", "Automation", "Serverless"]
      },
      {
        service: "Amazon AppFlow",
        summary: "Integration service that securely transfers data between AWS services and SaaS applications like Salesforce, Slack, and ServiceNow without writing code.",
        keywords: ["SaaS integration", "Data transfer", "Automation", "No-code", "Data mapping", "Security", "Bidirectional sync"]
      },
      {
        service: "AWS B2B Data Interchange",
        summary: "Managed service for securely exchanging electronic business documents (EDI) between partners using industry-standard formats.",
        keywords: ["EDI", "B2B integration", "Partner connectivity", "Secure data exchange", "Automation", "Compliance"]
      },
      {
        service: "Amazon EventBridge",
        summary: "Serverless event bus that makes it easy to connect applications using events from AWS services, SaaS apps, or custom sources.",
        keywords: ["Event-driven architecture", "Event bus", "Rules", "Targets", "Schema registry", "Integration", "Serverless"]
      },
      {
        service: "Amazon Managed Workflows for Apache Airflow (MWAA)",
        summary: "Managed Apache Airflow service for building, scheduling, and monitoring workflows using Python-based DAGs.",
        keywords: ["Workflow orchestration", "Apache Airflow", "DAGs", "Scheduling", "Python", "Managed service", "Automation"]
      },
      {
        service: "Amazon MQ",
        summary: "Managed message broker service for Apache ActiveMQ and RabbitMQ, making it easy to migrate existing message-based applications to AWS.",
        keywords: ["Message broker", "JMS", "ActiveMQ", "RabbitMQ", "Queues", "Topics", "Pub/Sub", "Migration"]
      },
      {
        service: "Amazon Simple Notification Service (SNS)",
        summary: "Fully managed publish/subscribe messaging service for sending notifications to distributed systems, mobile devices, or email endpoints.",
        keywords: ["Pub/Sub", "Topics", "Subscribers", "Fan-out", "Push notifications", "SMS", "Email", "Lambda triggers"]
      },
      {
        service: "Amazon Simple Queue Service (SQS)",
        summary: "Fully managed message queuing service that decouples and scales microservices, distributed systems, and serverless applications.",
        keywords: ["Message queue", "Decoupling", "FIFO", "Standard queue", "Visibility timeout", "Polling", "Dead-letter queue"]
      },
      {
        service: "Amazon Simple Workflow Service (SWF)",
        summary: "Service for coordinating tasks across distributed systems with a central workflow engine, offering more control than Step Functions.",
        keywords: ["Task coordination", "Workflow engine", "Decider", "Worker", "Durable state", "Human tasks", "Reliability"]
      },
      {
        service: "Amazon Managed Blockchain",
        summary: "Fully managed service for creating and managing scalable blockchain networks using frameworks like Hyperledger Fabric and Ethereum.",
        keywords: ["Blockchain", "Distributed ledger", "Hyperledger Fabric", "Ethereum", "Decentralized", "Membership", "Peer nodes"]
      },
      {
        service: "AWS AppFabric",
        summary: "Simplifies integration and security of SaaS applications across your organization by unifying logs, metrics, and access data.",
        keywords: ["SaaS integration", "Security", "Observability", "Data aggregation", "Compliance", "Workforce analytics"]
      },
      {
        service: "Amazon Chime",
        summary: "Communication service for online meetings, video conferencing, chat, and business calls with secure collaboration tools.",
        keywords: ["Video conferencing", "Chat", "Screen sharing", "Meetings", "Business communication", "Collaboration"]
      },
      {
        service: "Amazon Chime SDK",
        summary: "Developer toolkit to add real-time voice, video, and messaging to web or mobile applications using Chime's communication infrastructure.",
        keywords: ["SDK", "Real-time communication", "Audio", "Video", "Messaging", "APIs", "Custom apps"]
      },
      {
        service: "Amazon Connect",
        summary: "Cloud-based contact center service that enables businesses to set up customer service centers with AI and analytics.",
        keywords: ["Contact center", "IVR", "Customer service", "Call routing", "AI insights", "Omnichannel", "Chatbots"]
      },
      {
        service: "Amazon Pinpoint",
        summary: "Marketing communication service for sending targeted push notifications, emails, SMS, and voice messages to engage users.",
        keywords: ["Targeted campaigns", "SMS", "Email", "Push notifications", "Segmentation", "Analytics", "Personalization"]
      },
      {
        service: "Amazon Simple Email Service (SES)",
        summary: "Cloud-based email sending service for marketing, transactional, and notification emails with high deliverability and cost efficiency.",
        keywords: ["Email service", "SMTP", "API", "Deliverability", "DKIM", "SPF", "Notifications", "Inbound email"]
      },
      {
        service: "Amazon WorkDocs",
        summary: "Secure content collaboration and document storage service for businesses, integrated with AWS IAM for access control.",
        keywords: ["File sharing", "Collaboration", "Document storage", "Versioning", "Security", "Integration"]
      },
      {
        service: "Amazon WorkMail",
        summary: "Managed business email and calendar service compatible with Microsoft Outlook and mobile devices.",
        keywords: ["Email hosting", "Calendar", "Outlook integration", "Encryption", "Mobile access", "Security"]
      },
      {
        service: "AWS Billing Conductor",
        summary: "Customizes AWS billing and cost reporting by grouping accounts, adjusting rates, and creating tailored billing views.",
        keywords: ["Billing groups", "Custom pricing", "Chargeback", "Cost allocation", "Multi-account", "Reporting"]
      },
      {
        service: "AWS Cost Explorer",
        summary: "Visualization and analysis tool to view, understand, and optimize AWS costs and usage over time.",
        keywords: ["Cost analysis", "Visualization", "Usage reports", "Filtering", "Trends", "Optimization"]
      },
      {
        service: "AWS Budgets",
        summary: "Lets you set custom cost and usage budgets and receive alerts when thresholds are exceeded.",
        keywords: ["Budget alerts", "Cost control", "Usage tracking", "Notifications", "Forecasting"]
      },
      {
        service: "AWS Cost and Usage Report (CUR)",
        summary: "Provides detailed cost and usage data for AWS accounts, enabling advanced analysis and integration with BI tools.",
        keywords: ["Detailed billing", "CSV reports", "S3 export", "Cost tracking", "Integration", "Analytics"]
      },
      {
        service: "Reserved Instance (RI) Reporting",
        summary: "Reporting tool to analyze usage, savings, and coverage for Reserved Instances across accounts.",
        keywords: ["RI coverage", "Utilization", "Savings analysis", "Cost optimization", "Reporting"]
      },
      {
        service: "Savings Plans",
        summary: "Flexible pricing model that provides cost savings for AWS compute usage in exchange for a consistent hourly commitment.",
        keywords: ["Cost savings", "Flexible pricing", "Compute usage", "Commitments", "EC2", "Fargate", "Lambda"]
      },
      {
        service: "Amazon EC2 (Elastic Compute Cloud)",
        summary: "Provides scalable virtual servers in the AWS Cloud. Lets you launch, configure, and manage compute capacity with multiple instance types and pricing options.",
        keywords: ["Virtual servers", "Instance types", "AMI", "EBS", "Key pairs", "Security groups", "Elastic IP", "Auto Scaling", "Spot", "Reserved", "On-Demand"]
      },
      {
        service: "Amazon EC2 Auto Scaling",
        summary: "Automatically adjusts the number of EC2 instances based on demand to maintain performance and optimize costs.",
        keywords: ["Scaling policies", "Desired capacity", "CloudWatch alarms", "Dynamic scaling", "Predictive scaling", "Launch template"]
      },
      {
        service: "Amazon EC2 Image Builder",
        summary: "Simplifies building, testing, and deploying secure and up-to-date OS and application images for EC2 or on-premises.",
        keywords: ["AMI creation", "Image pipeline", "Automation", "Version control", "Testing", "Compliance"]
      },
      {
        service: "Amazon Lightsail",
        summary: "Simplified compute service designed for developers needing quick deployment of websites and applications with predictable pricing.",
        keywords: ["VPS", "Preconfigured stacks", "Simplicity", "Fixed pricing", "DNS", "Static IP", "Small businesses"]
      },
      {
        service: "Amazon Linux 2023",
        summary: "Latest Amazon Linux distribution optimized for performance, security, and long-term AWS support.",
        keywords: ["Linux OS", "Optimized performance", "Kernel tuning", "Security updates", "AWS integration"]
      },
      {
        service: "AWS App Runner",
        summary: "Fully managed service to deploy containerized web applications and APIs directly from source code or container registry without managing servers.",
        keywords: ["Containers", "Web apps", "Serverless", "CI/CD", "Load balancing", "Auto scaling"]
      },
      {
        service: "AWS Batch",
        summary: "Enables batch computing jobs to run efficiently on AWS using EC2 and Spot Instances. Automatically provisions compute resources based on job volume.",
        keywords: ["Batch processing", "Job queue", "Compute environment", "Parallel jobs", "Scheduling", "Spot"]
      },
      {
        service: "AWS Elastic Beanstalk",
        summary: "Platform as a Service (PaaS) for deploying and scaling web applications. Manages infrastructure provisioning, scaling, and monitoring.",
        keywords: ["Paas", "Deployment automation", "Application environments", "Scaling", "Health monitoring", "Load balancer"]
      },
      {
        service: "AWS Fargate",
        summary: "Serverless compute engine for containers that works with ECS and EKS, eliminating the need to manage servers.",
        keywords: ["Containers", "Serverless", "ECS", "EKS", "Task definition", "Auto scaling", "Pay-per-use"]
      },
      {
        service: "AWS Lambda",
        summary: "Serverless compute service that runs code in response to events without provisioning or managing servers. Supports multiple languages.",
        keywords: ["Serverless", "Event-driven", "Function", "Triggers", "Cold start", "Concurrency", "Layers"]
      },
      {
        service: "AWS Serverless Application Repository",
        summary: "Central repository for discovering, deploying, and publishing serverless applications built on AWS Lambda.",
        keywords: ["Serverless apps", "Lambda", "SAM templates", "Sharing", "Deployment", "Reusability"]
      },
      {
        service: "AWS Outposts",
        summary: "Brings native AWS services, infrastructure, and operating models to on-premises environments for hybrid workloads.",
        keywords: ["Hybrid cloud", "On-premises", "AWS infrastructure", "Low latency", "Consistent operations"]
      },
      {
        service: "AWS Wavelength",
        summary: "Brings AWS compute and storage services to the edge of telecom networks for ultra-low-latency 5G applications.",
        keywords: ["Edge computing", "5G", "Low latency", "Telecom", "Real-time apps", "Mobile edge"]
      },
      {
        service: "VMware Cloud on AWS",
        summary: "Hybrid service that allows running VMware workloads on AWS infrastructure with full integration between vSphere and AWS.",
        keywords: ["VMware", "Hybrid cloud", "vSphere", "NSX", "vSAN", "Migration", "Data center extension"]
      },
      {
        service: "AWS Managed Services (AMS)",
        summary: "Provides ongoing management of AWS infrastructure, automating operations such as monitoring, patching, backup, and incident response.",
        keywords: ["Managed operations", "Automation", "Monitoring", "Patching", "Backup", "Governance", "Compliance"]
      },
      {
        service: "AWS re:Post Private",
        summary: "Private, secure version of AWS re:Post that enables knowledge sharing and collaboration within an organization's AWS environment.",
        keywords: ["Knowledge sharing", "Private Q&A", "Collaboration", "Governance", "Internal community", "Documentation"]
      },
      {
        service: "Amazon Elastic Container Registry (ECR)",
        summary: "Fully managed container registry for storing, managing, and deploying Docker container images securely.",
        keywords: ["Docker registry", "Container storage", "ECR repositories", "Image scanning", "IAM permissions", "Versioning"]
      },
      {
        service: "Amazon Elastic Container Service (ECS)",
        summary: "Highly scalable container orchestration service that allows you to run and manage Docker containers on AWS.",
        keywords: ["Container orchestration", "ECS cluster", "Task definition", "Fargate", "EC2 launch type", "Service scheduler"]
      },
      {
        service: "Amazon Elastic Kubernetes Service (EKS)",
        summary: "Managed Kubernetes service that simplifies running Kubernetes clusters on AWS without needing to manage control planes.",
        keywords: ["Kubernetes", "Cluster management", "Pods", "Nodes", "Control plane", "EKS add-ons", "Scalability"]
      },
      {
        service: "AWS App2Container (A2C)",
        summary: "Command-line tool that helps containerize existing applications and deploy them to ECS, EKS, or Fargate.",
        keywords: ["Application modernization", "Containerization", "CLI tool", "ECS/EKS deployment", "Dockerfile generation"]
      },
      {
        service: "Red Hat OpenShift Service on AWS (ROSA)",
        summary: "Fully managed service that lets you run Red Hat OpenShift (Kubernetes platform) natively on AWS infrastructure.",
        keywords: ["OpenShift", "Kubernetes", "Hybrid cloud", "Container platform", "Managed service", "Integration", "Developers"]
      },
      {
        service: "AWS Infrastructure Composer",
        summary: "Low-code tool for designing and deploying cloud infrastructure using visual workflows, enabling faster cloud architecture creation.",
        keywords: ["Low-code", "Infrastructure as code", "Visual design", "Deployment", "Templates", "Automation"]
      },
      {
        service: "AWS Cloud9",
        summary: "Cloud-based IDE that allows writing, running, and debugging code with just a browser, integrated with AWS services.",
        keywords: ["IDE", "Cloud-based", "Code editor", "Debugging", "Terminal", "Collaboration", "AWS integration"]
      },
      {
        service: "AWS CloudShell",
        summary: "Browser-based shell for securely managing AWS resources without configuring local CLI or credentials.",
        keywords: ["Shell access", "AWS CLI", "Browser-based", "Management", "Secure", "Scripting"]
      },
      {
        service: "AWS CodeArtifact",
        summary: "Fully managed artifact repository for storing, publishing, and sharing software packages (Maven, npm, Python, NuGet).",
        keywords: ["Artifact repository", "Package management", "Maven", "npm", "PyPI", "NuGet", "Versioning", "CI/CD"]
      },
      {
        service: "AWS CodeBuild",
        summary: "Fully managed build service that compiles source code, runs tests, and produces deployable artifacts.",
        keywords: ["Continuous integration", "Build automation", "Compilation", "Testing", "Artifacts", "Serverless", "CI/CD"]
      },
      {
        service: "Amazon CodeCatalyst",
        summary: "Integrated DevOps service that accelerates software delivery with project management, CI/CD, and collaboration features.",
        keywords: ["DevOps", "CI/CD", "Project management", "Collaboration", "Source control", "Automation"]
      },
      {
        service: "AWS CodeCommit",
        summary: "Managed Git-based source control service for securely hosting private repositories.",
        keywords: ["Git", "Source control", "Private repository", "Versioning", "Security", "Collaboration"]
      },
      {
        service: "AWS CodeDeploy",
        summary: "Automates application deployments to EC2, Lambda, or on-premises servers for consistent release cycles.",
        keywords: ["Deployment automation", "EC2", "Lambda", "On-premises", "Blue/Green", "Rolling updates", "CI/CD"]
      },
      {
        service: "AWS CodePipeline",
        summary: "Continuous delivery service to automate the build, test, and deployment phases for applications.",
        keywords: ["CI/CD", "Pipeline", "Automation", "Integration", "Stages", "Deployment", "Continuous delivery"]
      },
      {
        service: "Amazon Corretto",
        summary: "Production-ready, long-term supported distribution of OpenJDK for running Java applications on AWS.",
        keywords: ["OpenJDK", "Java runtime", "Production-ready", "Cross-platform", "Long-term support", "Security updates"]
      },
      {
        service: "AWS Fault Injection Simulator",
        summary: "Fully managed service for chaos engineering to test application resilience by simulating failures.",
        keywords: ["Chaos engineering", "Fault injection", "Resilience testing", "Automation", "Simulation", "Observability"]
      },
      {
        service: "Amazon Q Developer",
        summary: "Provides development environment for quantum computing using AWS Braket.",
        keywords: ["Quantum computing", "Braket", "Simulation", "Algorithms", "SDK", "Development", "Research"]
      },
      {
        service: "AWS X-Ray",
        summary: "Distributed tracing service to analyze and debug applications, identify performance bottlenecks, and monitor microservices.",
        keywords: ["Tracing", "Observability", "Microservices", "Debugging", "Latency", "Bottleneck analysis", "End-to-end monitoring"]
      },
      {
        service: "Amazon AppStream 2.0",
        summary: "Fully managed application streaming service that lets you stream desktop apps to any device without rewriting them.",
        keywords: ["App streaming", "Virtual desktop", "Managed service", "Scalable", "Secure", "No installation", "Access from anywhere"]
      },
      {
        service: "Amazon WorkSpaces",
        summary: "Managed Desktop-as-a-Service (DaaS) that provides cloud-based Windows or Linux desktops for end users.",
        keywords: ["Virtual desktop", "DaaS", "Windows/Linux", "Secure", "Persistent storage", "Multi-device access"]
      },
      {
        service: "Amazon WorkSpaces Core",
        summary: "Enables organizations to use WorkSpaces desktops without a managed client, giving more flexibility for integration with existing tools.",
        keywords: ["Virtual desktop", "BYO client", "Cloud desktops", "Flexible access", "Security", "Management"]
      },
      {
        service: "Amazon WorkSpaces Thin Client",
        summary: "Lightweight device optimized to access Amazon WorkSpaces desktops, minimizing local compute needs.",
        keywords: ["Thin client", "Virtual desktop access", "Lightweight device", "Security", "Management", "Low maintenance"]
      },
      {
        service: "Amazon WorkSpaces Web",
        summary: "Browser-based desktop experience that provides secure access to internal web applications without installing software.",
        keywords: ["Web access", "Secure browsing", "Virtual desktops", "SaaS apps", "No local software", "Managed access"]
      },
      {
        service: "AWS Amplify",
        summary: "Full-stack development platform for building scalable mobile and web applications with frontend frameworks and backend services.",
        keywords: ["Frontend & backend", "Mobile apps", "Web apps", "Authentication", "API", "Hosting", "CI/CD"]
      },
      {
        service: "AWS AppSync",
        summary: "Managed GraphQL service to build scalable APIs for real-time data queries, sync, and offline functionality.",
        keywords: ["GraphQL", "API", "Real-time", "Offline sync", "Backend integration", "Data sources", "Security"]
      },
      {
        service: "AWS Device Farm",
        summary: "Fully managed service for testing web and mobile apps across real devices in the cloud.",
        keywords: ["Mobile testing", "Web testing", "Real devices", "Automation", "Cross-platform", "Debugging", "Remote devices"]
      },
      {
        service: "Amazon GameLift",
        summary: "Managed service for deploying, operating, and scaling dedicated game servers for multiplayer games.",
        keywords: ["Game servers", "Multiplayer", "Matchmaking", "Scaling", "Low latency", "Game session management"]
      },
      {
        service: "AWS IoT Analytics",
        summary: "Fully managed service to process, enrich, and analyze IoT device data at scale for insights.",
        keywords: ["IoT data", "Analytics", "Time-series", "Data processing", "ETL", "Insights", "Visualization"]
      },
      {
        service: "AWS IoT Button",
        summary: "Programmable, Wi-Fi-enabled button for triggering AWS Lambda functions to automate simple tasks.",
        keywords: ["IoT device", "Lambda trigger", "Wi-Fi", "Event-driven", "Automation", "Prototyping"]
      },
      {
        service: "AWS IoT Core",
        summary: "Managed cloud service that connects IoT devices securely to AWS, enabling data ingestion, messaging, and processing.",
        keywords: ["IoT connectivity", "MQTT", "Device shadow", "Security", "Messaging", "Event processing"]
      },
      {
        service: "AWS IoT Device Defender",
        summary: "Security service for monitoring and auditing IoT devices to detect anomalies and enforce policies.",
        keywords: ["IoT security", "Auditing", "Anomaly detection", "Policies", "Compliance", "Alerts"]
      },
      {
        service: "AWS IoT Device Management",
        summary: "Simplifies onboarding, organizing, monitoring, and remotely managing IoT devices at scale.",
        keywords: ["Device onboarding", "Management", "Organization", "Monitoring", "Remote operations", "Fleet management"]
      },
      {
        service: "AWS IoT Events",
        summary: "Detects and responds to changes in IoT device states or conditions for automated actions.",
        keywords: ["Event detection", "State monitoring", "Automation", "Sensors", "Triggers", "Actions"]
      },
      {
        service: "AWS IoT ExpressLink",
        summary: "Enables developers to integrate IoT connectivity into devices quickly using pre-certified modules.",
        keywords: ["IoT connectivity", "Modules", "Easy integration", "Secure", "Device enablement"]
      },
      {
        service: "AWS IoT FleetWise",
        summary: "Collects, transforms, and transfers vehicle data to the cloud for analysis and predictive maintenance.",
        keywords: ["Automotive IoT", "Vehicle data", "Real-time collection", "Analytics", "Transformation", "Cloud ingestion"]
      },
      {
        service: "AWS IoT Greengrass",
        summary: "Extends AWS to edge devices for local compute, messaging, data caching, and ML inference.",
        keywords: ["Edge computing", "Local processing", "Lambda functions", "Messaging", "ML inference", "IoT integration"]
      },
      {
        service: "AWS IoT SiteWise",
        summary: "Collects, organizes, and analyzes industrial equipment data for operational insights.",
        keywords: ["Industrial IoT", "Data modeling", "Metrics", "Visualization", "Monitoring", "Edge processing"]
      },
      {
        service: "AWS IoT TwinMaker",
        summary: "Simplifies creating digital twins of real-world systems for simulation, visualization, and analysis.",
        keywords: ["Digital twins", "Simulation", "Visualization", "IoT data", "Operational insights", "Modeling"]
      },
      {
        service: "AWS Partner Device Catalog",
        summary: "Catalog of pre-integrated IoT devices certified to work with AWS IoT services.",
        keywords: ["IoT devices", "Certification", "Partners", "Integration", "Compatibility", "Deployment"]
      },
      {
        service: "FreeRTOS",
        summary: "Open-source, real-time operating system for microcontrollers that simplifies building and deploying IoT applications.",
        keywords: ["RTOS", "Microcontrollers", "Embedded devices", "IoT applications", "Real-time", "AWS integration"]
      },
      {
        service: "Amazon Augmented AI (A2I)",
        summary: "Adds human review to ML predictions for workflows requiring human verification.",
        keywords: ["Human-in-the-loop", "ML review", "Accuracy", "Automation", "Validation", "Human oversight"]
      },
      {
        service: "Amazon Bedrock",
        summary: "Fully managed service for building and scaling generative AI applications without managing infrastructure.",
        keywords: ["Generative AI", "Foundation models", "Serverless", "APIs", "Text-to-image", "Integration"]
      },
      {
        service: "Amazon CodeGuru",
        summary: "ML-powered service for code review and application performance recommendations.",
        keywords: ["Code review", "ML insights", "Profiling", "Performance", "Recommendations", "Automation"]
      },
      {
        service: "Amazon Comprehend",
        summary: "NLP service that extracts insights such as entities, sentiment, and key phrases from text.",
        keywords: ["NLP", "Sentiment analysis", "Entity recognition", "Key phrases", "Text analytics", "Language detection"]
      },
      {
        service: "Amazon DevOps Guru",
        summary: "ML-powered service that detects operational anomalies and provides recommendations to improve application performance.",
        keywords: ["Operational insights", "Anomaly detection", "ML-driven", "Recommendations", "Monitoring", "Automation"]
      },
      {
        service: "Amazon Forecast",
        summary: "Fully managed service for generating accurate time-series forecasts using ML.",
        keywords: ["Time-series", "Forecasting", "ML", "Demand planning", "Predictive analytics", "Accuracy"]
      },
      {
        service: "Amazon Fraud Detector",
        summary: "ML-based service to detect online fraud for transactions, payments, and user activities.",
        keywords: ["Fraud detection", "ML models", "Real-time", "Transactions", "Risk scoring", "Security"]
      },
      {
        service: "Amazon Comprehend Medical",
        summary: "NLP service specialized for extracting medical information from unstructured clinical text.",
        keywords: ["Medical NLP", "Entities", "Diagnosis", "Medications", "Text analysis", "Healthcare"]
      },
      {
        service: "Amazon Kendra",
        summary: "Intelligent search service for enterprise data enabling natural language queries.",
        keywords: ["Enterprise search", "NLP", "Natural language queries", "Knowledge base", "Indexing", "Relevance"]
      },
      {
        service: "Amazon Lex",
        summary: "Service to build conversational interfaces using voice and text for chatbots and virtual assistants.",
        keywords: ["Chatbot", "Conversational AI", "Voice", "Text", "NLP", "Integration", "Lambda"]
      },
      {
        service: "Amazon Lookout for Equipment",
        summary: "Detects abnormal equipment behavior to prevent machine downtime using ML.",
        keywords: ["Predictive maintenance", "IoT", "Anomaly detection", "Sensors", "ML", "Operational monitoring"]
      },
      {
        service: "Amazon Lookout for Metrics",
        summary: "ML service to automatically detect anomalies in metrics and key business indicators.",
        keywords: ["Anomaly detection", "Metrics", "ML", "Business insights", "Real-time monitoring"]
      },
      {
        service: "Amazon Lookout for Vision",
        summary: "Uses ML to identify visual defects and anomalies in manufacturing or production environments.",
        keywords: ["Visual inspection", "ML", "Defect detection", "Industrial", "Quality control", "Computer vision"]
      },
      {
        service: "Amazon Monitron",
        summary: "End-to-end solution for monitoring industrial equipment for predictive maintenance.",
        keywords: ["Predictive maintenance", "Sensors", "ML", "Vibration monitoring", "IoT", "Industrial"]
      },
      {
        service: "Amazon PartyRock",
        summary: "(Likely a less common/preview service; could be event or personalization-related AI)",
        keywords: ["AI", "Personalization", "Event-driven", "ML insights", "Analytics"]
      },
      {
        service: "Amazon Personalize",
        summary: "ML service to build real-time personalization and recommendation systems.",
        keywords: ["Personalization", "Recommendations", "ML", "User behavior", "Real-time", "E-commerce"]
      },
      {
        service: "Amazon Polly",
        summary: "Converts text into lifelike speech for applications, IoT devices, or accessibility tools.",
        keywords: ["Text-to-speech", "Voice synthesis", "Realistic speech", "SSML", "Multi-language", "Accessibility"]
      },
      {
        service: "Amazon Q",
        summary: "Likely refers to AWS Quantum Computing tools or AWS Q-learning; development environment for quantum computing.",
        keywords: ["Quantum computing", "Simulation", "Algorithms", "Braket", "Research", "Development"]
      },
      {
        service: "Amazon Rekognition",
        summary: "Computer vision service for image and video analysis, including object, scene, facial recognition, and moderation.",
        keywords: ["Image recognition", "Video analysis", "Facial recognition", "Object detection", "Moderation", "ML"]
      },
      {
        service: "Amazon SageMaker AI",
        summary: "Fully managed ML platform to build, train, and deploy machine learning models at scale.",
        keywords: ["ML platform", "Training", "Deployment", "AutoML", "Jupyter notebooks", "Inference", "Managed"]
      },
      {
        service: "Amazon Textract",
        summary: "Extracts text, tables, and forms from scanned documents and PDFs using ML.",
        keywords: ["OCR", "Text extraction", "Forms", "Tables", "Document analysis", "ML"]
      },
      {
        service: "Amazon Transcribe",
        summary: "Automatic speech-to-text service for transcribing audio and video into text.",
        keywords: ["Speech recognition", "Transcription", "Audio-to-text", "Real-time", "Multi-language"]
      },
      {
        service: "Amazon Translate",
        summary: "Neural machine translation service for real-time and batch text translation.",
        keywords: ["Translation", "NLP", "Multi-language", "Neural machine translation", "Localization"]
      },
      {
        service: "AWS DeepComposer",
        summary: "Hands-on service for learning generative AI by creating music using ML models.",
        keywords: ["Generative AI", "Music creation", "ML", "Training models", "Learning", "Hands-on"]
      },
      {
        service: "AWS DeepRacer",
        summary: "Autonomous 1/18th scale race car to learn reinforcement learning in a hands-on environment.",
        keywords: ["Reinforcement learning", "ML", "Simulation", "Racing", "Hands-on learning"]
      },
      {
        service: "AWS HealthLake",
        summary: "HIPAA-eligible service to store, transform, and analyze health data in FHIR format.",
        keywords: ["Healthcare", "FHIR", "Data lake", "Analytics", "HIPAA", "EMR integration"]
      },
      {
        service: "AWS HealthScribe",
        summary: "Likely a medical transcription/AI service for converting clinician notes into structured health data.",
        keywords: ["Medical transcription", "NLP", "Healthcare", "FHIR", "Automation", "EMR"]
      },
      {
        service: "AWS Panorama",
        summary: "Edge computer vision service to analyze video feeds on-premises for operational insights.",
        keywords: ["Edge AI", "Computer vision", "Video analysis", "On-premises", "ML", "Industrial monitoring"]
      },
      {
        service: "AWS Auto Scaling",
        summary: "Automatically adjusts resources to maintain application performance and optimize costs.",
        keywords: ["Scaling", "EC2", "ECS", "Application", "Policy-based", "Cost optimization", "Performance"]
      },
      {
        service: "AWS CloudFormation",
        summary: "Infrastructure-as-Code service to model, provision, and manage AWS resources using templates.",
        keywords: ["IaC", "Templates", "Automation", "Stack management", "Resource provisioning", "Repeatable deployments"]
      },
      {
        service: "AWS CloudTrail",
        summary: "Monitors and logs account activity for governance, compliance, and operational auditing.",
        keywords: ["Logging", "Governance", "Auditing", "API calls", "Security", "Compliance", "Trails"]
      },
      {
        service: "Amazon CloudWatch",
        summary: "Monitoring and observability service for AWS resources and applications, providing metrics, logs, and alarms.",
        keywords: ["Monitoring", "Metrics", "Logs", "Alarms", "Dashboards", "Observability", "Automation"]
      },
      {
        service: "AWS Compute Optimizer",
        summary: "Uses ML to recommend optimal AWS resources for cost and performance efficiency.",
        keywords: ["Resource optimization", "Recommendations", "EC2", "Lambda", "Auto Scaling", "Cost efficiency"]
      },
      {
        service: "AWS Console Mobile Application",
        summary: "Mobile app to monitor AWS resources, view alerts, and manage services on the go.",
        keywords: ["Mobile monitoring", "Alerts", "Resource management", "Notifications", "AWS console"]
      },
      {
        service: "AWS Control Tower",
        summary: "Simplifies multi-account setup and governance with automated best-practices landing zones.",
        keywords: ["Multi-account", "Governance", "Landing zone", "Policies", "Compliance", "Automation"]
      },
      {
        service: "AWS Config",
        summary: "Tracks and evaluates AWS resource configurations for compliance and change management.",
        keywords: ["Configuration tracking", "Compliance", "Resource auditing", "Change management", "Rules", "Remediation"]
      },
      {
        service: "AWS Health",
        summary: "Provides personalized alerts and guidance about AWS service events and operational issues.",
        keywords: ["Service status", "Event notifications", "Operational guidance", "Personalized dashboard", "Incidents"]
      },
      {
        service: "AWS Launch Wizard",
        summary: "Simplifies planning and deployment of complex applications like SAP or Microsoft workloads.",
        keywords: ["Deployment automation", "Planning", "SAP", "Microsoft workloads", "Best practices", "Resource sizing"]
      },
      {
        service: "AWS License Manager",
        summary: "Helps manage software licenses across AWS and on-premises environments.",
        keywords: ["License tracking", "Compliance", "Optimization", "On-premises", "AWS integration", "Software management"]
      },
      {
        service: "Amazon Managed Grafana",
        summary: "Fully managed service to visualize and analyze operational data using Grafana dashboards.",
        keywords: ["Monitoring", "Visualization", "Grafana", "Metrics", "Dashboards", "Cloud integration", "Observability"]
      },
      {
        service: "Amazon Managed Service for Prometheus",
        summary: "Managed service for collecting, storing, and querying Prometheus metrics at scale.",
        keywords: ["Prometheus", "Monitoring", "Metrics", "Time-series", "Managed", "Observability", "Alerting"]
      },
      {
        service: "AWS Organizations",
        summary: "Centrally manages multiple AWS accounts with consolidated billing, policies, and governance.",
        keywords: ["Multi-account", "Consolidated billing", "Policies", "OU management", "Governance", "Centralized control"]
      },
      {
        service: "OpsWorks",
        summary: "Configuration management service using Chef or Puppet for deploying and managing applications.",
        keywords: ["Configuration management", "Chef", "Puppet", "Automation", "Deployment", "Orchestration"]
      },
      {
        service: "AWS Proton",
        summary: "Managed deployment service for container and serverless applications using templates and CI/CD pipelines.",
        keywords: ["Deployment automation", "Containers", "Serverless", "Templates", "CI/CD", "Orchestration"]
      },
      {
        service: "Amazon Q Developer in chat applications (formerly AWS Chatbot)",
        summary: "Integrates AWS services with chat platforms for notifications and automation commands.",
        keywords: ["Chat integration", "Notifications", "Automation", "Slack", "Teams", "Monitoring", "Collaboration"]
      },
      {
        service: "AWS Service Catalog",
        summary: "Helps organizations create, manage, and deploy approved IT services and applications.",
        keywords: ["Service portfolio", "Governance", "Approved templates", "Deployment", "Automation", "Compliance"]
      },
      {
        service: "AWS Systems Manager",
        summary: "Unified management service for operational insights, automation, patching, and configuration of AWS resources.",
        keywords: ["Operations", "Automation", "Patching", "Configuration", "Inventory", "Monitoring", "Management"]
      },
      {
        service: "AWS Trusted Advisor",
        summary: "Provides real-time recommendations for cost optimization, security, fault tolerance, and performance.",
        keywords: ["Best practices", "Cost optimization", "Security", "Performance", "Fault tolerance", "Recommendations"]
      },
      {
        service: "AWS User Notifications",
        summary: "Centralized service for sending operational alerts and notifications to users and teams.",
        keywords: ["Notifications", "Alerts", "Monitoring", "Event-driven", "Operational", "User management"]
      },
      {
        service: "AWS Well-Architected Tool",
        summary: "Evaluates workloads against AWS best practices across operational excellence, security, reliability, performance, and cost.",
        keywords: ["Best practices", "Workload review", "Operational excellence", "Security", "Cost optimization", "Reliability"]
      },
      {
        service: "Amazon Elastic Transcoder",
        summary: "Media transcoding service to convert media files into formats suitable for devices like smartphones, tablets, and PCs.",
        keywords: ["Video transcoding", "Format conversion", "Device compatibility", "On-demand", "Scalable", "Automation"]
      },
      {
        service: "Amazon Interactive Video Service (IVS)",
        summary: "Managed live streaming solution for low-latency, interactive video experiences.",
        keywords: ["Live streaming", "Low latency", "Interactive video", "Chat", "Gaming", "Real-time", "Scalable"]
      },
      {
        service: "Amazon Nimble Studio",
        summary: "Cloud-based virtual studio for creative teams to produce visual content collaboratively using AWS compute and storage.",
        keywords: ["Virtual studio", "Collaboration", "Rendering", "Media production", "Creative workflows", "Cloud"]
      },
      {
        service: "AWS Elemental Appliances and Software",
        summary: "On-premises or cloud software appliances for encoding, packaging, and streaming video content.",
        keywords: ["Video encoding", "On-premises", "Streaming", "Media packaging", "Delivery", "Broadcast"]
      },
      {
        service: "AWS Elemental MediaConnect",
        summary: "Reliable transport service to ingest, transmit, and distribute live video streams in real-time.",
        keywords: ["Video transport", "Live streaming", "Reliable delivery", "Contribution feeds", "Broadcast-quality"]
      },
      {
        service: "AWS Elemental MediaConvert",
        summary: "File-based video transcoding service for on-demand content, supporting multiple formats and resolutions.",
        keywords: ["Video transcoding", "On-demand", "Formats", "Multi-resolution", "Adaptive bitrate", "Automation"]
      },
      {
        service: "AWS Elemental MediaLive",
        summary: "Live video processing service to encode and package high-quality streams for broadcast and multiscreen delivery.",
        keywords: ["Live video", "Encoding", "Broadcast", "Packaging", "Adaptive bitrate", "Streaming", "Real-time"]
      },
      {
        service: "AWS Elemental MediaPackage",
        summary: "Prepares and protects live or on-demand video for delivery to any device with scalable packaging and DRM.",
        keywords: ["Video packaging", "DRM", "Streaming", "Multi-device", "HLS/DASH", "On-demand/live"]
      },
      {
        service: "AWS Elemental MediaStore",
        summary: "Storage service optimized for media, providing low-latency, high-performance content delivery.",
        keywords: ["Media storage", "Low latency", "Video delivery", "High performance", "Cloud storage", "Streaming"]
      },
      {
        service: "AWS Elemental MediaTailor",
        summary: "Personalizes and monetizes video streams with server-side ad insertion for broadcast and OTT content.",
        keywords: ["Ad insertion", "Video personalization", "Server-side", "OTT", "Monetization", "Streaming"]
      },
      {
        service: "AWS Application Discovery Service",
        summary: "Helps enterprises discover and collect information about on-premises applications for migration planning.",
        keywords: ["Discovery", "On-premises inventory", "Dependencies", "Migration planning", "Application mapping"]
      },
      {
        service: "AWS Application Migration Service (MGN)",
        summary: "Simplifies lift-and-shift migrations by replicating servers from on-premises to AWS with minimal downtime.",
        keywords: ["Lift-and-shift", "Replication", "Minimal downtime", "Migration automation", "Cloud migration"]
      },
      {
        service: "AWS Database Migration Service (DMS)",
        summary: "Migrates databases to AWS quickly and securely with minimal downtime, supporting homogeneous and heterogeneous engines.",
        keywords: ["Database migration", "Homogeneous/heterogeneous", "Continuous replication", "Minimal downtime", "Cloud adoption"]
      },
      {
        service: "AWS Mainframe Modernization Service",
        summary: "Provides tools and runtime environments to migrate, modernize, and run mainframe workloads on AWS.",
        keywords: ["Mainframe migration", "Modernization", "Legacy applications", "Cloud runtime", "Transformation"]
      },
      {
        service: "AWS Migration Hub",
        summary: "Central dashboard to track the progress of application migrations across multiple AWS and partner tools.",
        keywords: ["Migration tracking", "Centralized dashboard", "Progress monitoring", "Multi-tool integration", "Cloud adoption"]
      },
      {
        service: "AWS Snow Family",
        summary: "Physical devices and edge solutions for moving large amounts of data to and from AWS securely.",
        keywords: ["Data migration", "Edge computing", "Snowball", "Snowcone", "Snowmobile", "Secure transfer", "Large-scale"]
      },
      {
        service: "AWS DataSync",
        summary: "Automated service to move large datasets between on-premises storage and AWS quickly and securely.",
        keywords: ["Data transfer", "Automation", "On-premises to AWS", "Fast migration", "Security", "Large datasets"]
      },
      {
        service: "AWS Transfer Family",
        summary: "Fully managed service to transfer files into and out of AWS using SFTP, FTPS, and FTP protocols.",
        keywords: ["File transfer", "SFTP/FTPS/FTP", "Managed service", "Secure", "Integration", "Hybrid workflows"]
      },
      {
        service: "Amazon Location Service",
        summary: "Provides location data and services such as maps, tracking, and geofencing for applications with privacy and security controls.",
        keywords: ["Maps", "Tracking", "Geofencing", "GIS data", "Real-time location", "Routing", "Secure"]
      },
      {
        service: "Amazon API Gateway",
        summary: "Fully managed service to create, deploy, and manage APIs for REST, HTTP, and WebSocket.",
        keywords: ["API management", "REST/HTTP/WebSocket", "Serverless", "Scalability", "Security", "Throttling", "Monitoring"]
      },
      {
        service: "AWS App Mesh",
        summary: "Service mesh that provides application-level networking to connect and monitor microservices.",
        keywords: ["Service mesh", "Microservices", "Traffic routing", "Observability", "Security", "Resilience"]
      },
      {
        service: "Amazon CloudFront",
        summary: "Global content delivery network (CDN) to deliver data, videos, applications, and APIs with low latency.",
        keywords: ["CDN", "Caching", "Edge locations", "Low latency", "Security", "Distribution", "Acceleration"]
      },
      {
        service: "AWS Cloud Map",
        summary: "Service discovery tool that lets applications discover resources dynamically using custom names.",
        keywords: ["Service discovery", "Dynamic mapping", "Microservices", "Namespaces", "Integration", "Routing"]
      },
      {
        service: "AWS Direct Connect",
        summary: "Dedicated network connection from on-premises to AWS for high bandwidth, low latency connectivity.",
        keywords: ["Private connection", "Hybrid cloud", "Low latency", "High bandwidth", "Network security", "Dedicated link"]
      },
      {
        service: "Elastic Load Balancing (ELB)",
        summary: "Automatically distributes incoming application traffic across multiple targets for availability and scalability.",
        keywords: ["Load balancing", "High availability", "ALB/NLB/CLB", "Fault tolerance", "Auto Scaling", "Traffic distribution"]
      },
      {
        service: "AWS Global Accelerator",
        summary: "Provides static IP addresses to improve availability and performance of global applications.",
        keywords: ["Global traffic", "Static IP", "Performance optimization", "Low latency", "High availability", "Routing"]
      },
      {
        service: "Integrated Private Wireless on AWS",
        summary: "Managed private wireless networks for enterprise connectivity using AWS infrastructure.",
        keywords: ["Private wireless", "4G/5G", "Connectivity", "Low latency", "Enterprise networks", "Managed service"]
      },
      {
        service: "AWS PrivateLink",
        summary: "Provides private connectivity between VPCs and AWS services or partner services without exposing traffic to the internet.",
        keywords: ["Private connectivity", "VPC endpoints", "Security", "Service access", "Network isolation"]
      },
      {
        service: "AWS Private 5G",
        summary: "Fully managed private 5G network for enterprise use cases on AWS.",
        keywords: ["Private 5G", "Low latency", "Enterprise network", "Managed service", "IoT", "Edge connectivity"]
      },
      {
        service: "Amazon Route 53",
        summary: "Scalable DNS and domain registration service with health checks and routing policies.",
        keywords: ["DNS", "Domain registration", "Routing", "Latency-based routing", "Health checks", "High availability"]
      },
      {
        service: "AWS Transit Gateway",
        summary: "Central hub to connect multiple VPCs, VPNs, and on-premises networks for simplified network management.",
        keywords: ["Hub-and-spoke", "VPC connectivity", "VPN integration", "Scalability", "Routing", "Network centralization"]
      },
      {
        service: "AWS Verified Access",
        summary: "Enables secure, zero-trust access to applications without using VPNs.",
        keywords: ["Zero-trust", "Secure access", "Identity-based", "Application access", "Authentication", "Cloud security"]
      },
      {
        service: "Amazon VPC",
        summary: "Isolated virtual network for launching AWS resources with full control over subnets, routing, and security.",
        keywords: ["Virtual network", "Subnets", "Security groups", "Route tables", "Isolation", "Networking", "Private/public"]
      },
      {
        service: "Amazon VPC Lattice",
        summary: "Simplifies communication across VPCs, accounts, and regions securely without managing complex networking.",
        keywords: ["VPC connectivity", "Multi-account", "Multi-region", "Secure communication", "Service discovery"]
      },
      {
        service: "AWS VPN",
        summary: "Establishes encrypted connections from on-premises networks to AWS VPCs over the internet.",
        keywords: ["Encrypted connectivity", "Site-to-site VPN", "Remote access", "Secure communication", "Hybrid cloud"]
      },
      {
        service: "Amazon Braket",
        summary: "Fully managed service to explore and run quantum computing algorithms on different quantum hardware and simulators.",
        keywords: ["Quantum computing", "Simulation", "Algorithms", "Research", "AWS Braket", "Hybrid"]
      },
      {
        service: "AWS Ground Station",
        summary: "Fully managed service to control satellite communications, process data, and integrate with AWS applications.",
        keywords: ["Satellite communication", "Ground stations", "Data processing", "Low latency", "Cloud integration"]
      },
      {
        service: "Amazon Cognito",
        summary: "Provides authentication, authorization, and user management for web and mobile apps.",
        keywords: ["User authentication", "Authorization", "Identity management", "MFA", "OAuth", "Federation"]
      },
      {
        service: "Amazon Detective",
        summary: "Analyzes AWS logs and events to help identify the root cause of security issues and suspicious activities.",
        keywords: ["Security investigation", "Log analysis", "Root cause", "Threat detection", "AWS logs"]
      },
      {
        service: "Amazon GuardDuty",
        summary: "Continuous threat detection service that monitors for malicious activity and unauthorized behavior.",
        keywords: ["Threat detection", "Anomaly detection", "Security monitoring", "ML-based", "Continuous scanning"]
      },
      {
        service: "Amazon Inspector",
        summary: "Automated security assessment service for identifying vulnerabilities and deviations from best practices in AWS workloads.",
        keywords: ["Vulnerability scanning", "Compliance checks", "Security best practices", "Automated assessments"]
      },
      {
        service: "Amazon Macie",
        summary: "ML-powered service that discovers, classifies, and protects sensitive data in AWS (e.g., PII).",
        keywords: ["Data protection", "Sensitive data discovery", "PII", "Classification", "Security", "Compliance"]
      },
      {
        service: "Amazon Security Lake",
        summary: "Centralizes security data from multiple sources in a data lake for analytics and monitoring.",
        keywords: ["Security data", "Centralized logging", "Analytics", "Data lake", "SIEM integration", "Threat intelligence"]
      },
      {
        service: "Amazon Verified Permissions",
        summary: "Centralized authorization service for fine-grained access control across applications.",
        keywords: ["Fine-grained access", "Authorization", "Policy management", "Identity-based", "Secure"]
      },
      {
        service: "AWS Artifact",
        summary: "Provides on-demand access to AWS compliance reports and agreements.",
        keywords: ["Compliance", "Audit reports", "Certifications", "Documentation", "Security", "Governance"]
      },
      {
        service: "AWS Audit Manager",
        summary: "Automates evidence collection and auditing to help meet compliance requirements.",
        keywords: ["Compliance", "Auditing", "Evidence collection", "Frameworks", "Governance", "Automation"]
      },
      {
        service: "AWS Certificate Manager (ACM)",
        summary: "Manages SSL/TLS certificates for securing network communications and websites.",
        keywords: ["SSL/TLS", "Certificates", "Encryption", "Secure communication", "ACM", "Automation"]
      },
      {
        service: "AWS CloudHSM",
        summary: "Dedicated hardware security module (HSM) for cryptographic key management in the cloud.",
        keywords: ["HSM", "Key management", "Cryptography", "Security", "Compliance", "Encryption"]
      },
      {
        service: "AWS Directory Service",
        summary: "Provides managed Microsoft Active Directory or Simple AD in AWS for authentication and management.",
        keywords: ["Directory", "Active Directory", "Authentication", "LDAP", "Single sign-on", "Managed"]
      },
      {
        service: "AWS Firewall Manager",
        summary: "Centralized management for firewall rules across accounts and resources.",
        keywords: ["Firewall management", "Security policies", "Centralized", "WAF", "Shield", "Network protection"]
      },
      {
        service: "AWS Identity and Access Management (IAM)",
        summary: "Centralized service for managing user access, roles, and permissions to AWS resources.",
        keywords: ["Access control", "Users", "Roles", "Policies", "Permissions", "Security", "Authentication"]
      },
      {
        service: "AWS Key Management Service (KMS)",
        summary: "Managed service for creating, controlling, and auditing encryption keys.",
        keywords: ["Encryption", "Key management", "Security", "Compliance", "Data protection", "Cryptography"]
      },
      {
        service: "AWS Network Firewall",
        summary: "Managed firewall for VPCs to filter traffic and protect workloads at scale.",
        keywords: ["Network security", "Firewall", "VPC protection", "Traffic inspection", "Rules", "High availability"]
      },
      {
        service: "AWS Resource Access Manager (RAM)",
        summary: "Shares AWS resources securely across accounts and organizational units.",
        keywords: ["Resource sharing", "Cross-account access", "Security", "Governance", "Centralized management"]
      },
      {
        service: "AWS Secrets Manager",
        summary: "Securely stores and manages secrets like passwords, API keys, and database credentials.",
        keywords: ["Secrets management", "Credentials", "Encryption", "Rotation", "Secure access", "Applications"]
      },
      {
        service: "AWS Security Hub",
        summary: "Centralized security service that aggregates findings from multiple AWS services for visibility and compliance.",
        keywords: ["Security monitoring", "Centralized dashboard", "Compliance", "Threat detection", "Aggregation"]
      },
      {
        service: "AWS Shield",
        summary: "Managed DDoS protection for AWS applications with standard and advanced tiers.",
        keywords: ["DDoS protection", "Network security", "AWS resources", "Threat mitigation", "Monitoring"]
      },
      {
        service: "AWS IAM Identity Center (formerly AWS SSO)",
        summary: "Centralized identity management for single sign-on across AWS accounts and applications.",
        keywords: ["SSO", "Identity management", "Centralized access", "Federation", "Permissions", "Authentication"]
      },
      {
        service: "AWS WAF",
        summary: "Web application firewall to protect web applications from common exploits and attacks.",
        keywords: ["Web firewall", "Security", "Rules", "DDoS mitigation", "Application protection", "Filtering"]
      },
      {
        service: "AWS WAF Captcha",
        summary: "Adds CAPTCHA challenges to WAF rules to mitigate automated bot traffic.",
        keywords: ["CAPTCHA", "Bot mitigation", "WAF integration", "Security", "Automated traffic protection"]
      },
      {
        service: "AWS Backup",
        summary: "Centralized service to automate and manage backups across AWS services and on-premises environments.",
        keywords: ["Backup automation", "Centralized management", "Compliance", "Restore", "Recovery", "Protection"]
      },
      {
        service: "Amazon Elastic Block Store (EBS)",
        summary: "Provides block-level storage volumes for use with EC2 instances with high availability and performance.",
        keywords: ["Block storage", "EC2", "Persistent storage", "High performance", "SSD/HDD", "Snapshots"]
      },
      {
        service: "AWS Elastic Disaster Recovery (DRS)",
        summary: "Replicates and recovers on-premises or cloud workloads on AWS during disruptions.",
        keywords: ["Disaster recovery", "Replication", "Recovery", "Minimal downtime", "Business continuity", "Cloud"]
      },
      {
        service: "Amazon Elastic File System (EFS)",
        summary: "Fully managed, scalable, and elastic NFS file storage for use with AWS cloud services and on-premises resources.",
        keywords: ["NFS", "File storage", "Scalable", "Managed", "Shared storage", "Elastic", "Linux integration"]
      },
      {
        service: "Amazon File Cache",
        summary: "Fully managed caching service for high-performance storage access for on-premises or cloud workloads.",
        keywords: ["Caching", "High-performance storage", "Managed", "Data acceleration", "Low latency"]
      },
      {
        service: "Amazon FSx for Lustre",
        summary: "High-performance file system for compute-intensive workloads like HPC, ML, and analytics.",
        keywords: ["HPC", "High-performance", "Parallel file system", "ML workloads", "Analytics", "Lustre"]
      },
      {
        service: "Amazon FSx for NetApp ONTAP",
        summary: "Fully managed NetApp file system with enterprise features like snapshots, replication, and storage efficiency.",
        keywords: ["Enterprise file storage", "ONTAP", "Snapshots", "Replication", "Data efficiency", "Cloud storage"]
      },
      {
        service: "Amazon FSx for OpenZFS",
        summary: "Managed OpenZFS file system for advanced data management, snapshots, and replication.",
        keywords: ["OpenZFS", "File system", "Snapshots", "Replication", "Advanced storage", "Managed"]
      },
      {
        service: "Amazon FSx for Windows File Server",
        summary: "Fully managed Windows file system with SMB protocol, Active Directory integration, and enterprise features.",
        keywords: ["Windows file storage", "SMB", "AD integration", "Managed", "Enterprise", "Shared storage"]
      },
      {
        service: "Amazon Simple Storage Service (S3)",
        summary: "Object storage service for scalable, durable, and secure storage of any type of data.",
        keywords: ["Object storage", "Scalability", "Durability", "Versioning", "Lifecycle management", "Backup", "Cloud-native"]
      },
      {
        service: "AWS Storage Gateway",
        summary: "Hybrid cloud storage service that connects on-premises environments with AWS cloud storage.",
        keywords: ["Hybrid storage", "Cloud integration", "Caching", "Backup", "File/Volume/ Tape gateways", "Data transfer"]
      }
    ];
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.keywordsController = new KeywordsController();
});
