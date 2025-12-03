class QuizPageController {
  constructor() {
    // Get difficulty from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    this.difficulty = urlParams.get('difficulty') || 'beginner';

    this.currentQuestionIndex = 0;
    this.quizScore = 0;
    this.userAnswers = [];
    this.questions = this.getQuestionsForDifficulty(this.difficulty);
    this.totalQuestions = this.questions.length;
    this.timer = null;
    this.timeLeft = this.getTimeForDifficulty(this.difficulty);
    this.selectedOptions = [];
    this.multiple = false;
    this.initEventListeners();
    this.startQuiz();
  }

  getQuestionsForDifficulty(difficulty) {
    const questionSets = {
      beginner: [
        {
          question: "You are building an online cloud storage platform. You are unsure about the storage capacity requirements. Which AWS storage service would you use?",
          options: ["AWS Elastic Container Service", "Simple Storage Service", "Elastic Block Store", "AWS Storage Gateway"],
          correctAnswer: 1,
          category: "Storage",
          explanation: "Amazon S3 (Simple Storage Service) is ideal for cloud storage platforms as it provides scalable, durable object storage without predefined capacity limits."
        },
        {
          question: "Which of the following provides software solutions that are either hosted on or integrated with the AWS platform which may include Independent Software Vendors (ISVs), SaaS, PaaS, developer tools, management, and security vendors?",
          options: ["Concierge Support", "AWS Partner Network Technology Partners", "AWS Partner Network Consulting Partners", "Technical Account Management"],
          correctAnswer: 1,
          category: "AWS Services",
          explanation: "AWS Partner Network Technology Partners provide software solutions hosted on or integrated with AWS, including ISVs, SaaS, PaaS, and more."
        },
        {
          question: "A company needs a user authentication system that triggers a two-step verification for logins from varying regions, IPs, or devices. The system should also easily handle millions of users. What solution best fits these needs?",
          options: ["Use Amazon Cognito user pools for authentication, enabling risk-based adaptive authentication with multi-factor verification.", "Utilize Amazon Cognito identity pools with two-step verification enabled.", "Employ AWS Identity and Access Management (IAM) for authentication, with policies allowing multifactor management.", "Set up AWS IAM Identity Center (AWS SSO) with required multifactor authentication in permission settings."],
          correctAnswer: 1,
          category: "Security",
          explanation: "Amazon Cognito identity pools can be configured with user pools to provide authentication with adaptive MFA, scaling to millions of users."
        },
        {
          question: "Which AWS support plan includes a Concierge Support Team which will assist you with your billing and account inquiries, and work with you to implement billing and account best practices?",
          options: ["Enterprise support plan", "Business support plan", "Basic support plan", "Developer support plan"],
          correctAnswer: 1,
          category: "Support",
          explanation: "The Business support plan includes a Concierge Support Team to assist with billing and account inquiries and implement best practices."
        },
        {
          question: "Which of the following services can be used to monitor the HTTP and HTTPS requests that are forwarded to Amazon CloudFront distributions or Amazon API Gateway APIs?",
          options: ["AWS CloudTrail", "AWS WAF", "Amazon CloudWatch", "AWS Cloud9"],
          correctAnswer: 2,
          category: "Monitoring",
          explanation: "Amazon CloudWatch can monitor metrics and logs for HTTP and HTTPS requests to CloudFront and API Gateway."
        },
        {
          question: "Which of the following is a benefit of using Amazon EFS over Amazon S3 for file storage?",
          options: ["EFS provides better integration with other AWS services", "EFS provides higher throughput and lower latency for accessing files", "EFS is better suited for storing large, infrequently accessed files", "EFS provides lower storage costs"],
          correctAnswer: 2,
          category: "Storage",
          explanation: "Amazon EFS provides higher throughput and lower latency for file access compared to S3, making it suitable for shared file systems."
        },
        {
          question: "A team of developers needs to run hundreds of thousands of fully managed batch computing jobs on AWS. Which of the following service should they choose?",
          options: ["AWS Fargate", "AWS Elastic Beanstalk", "AWS Lambda", "AWS Batch"],
          correctAnswer: 3,
          category: "Compute",
          explanation: "AWS Batch is designed for running batch computing jobs at any scale, providing fully managed job scheduling and execution."
        },
        {
          question: "What are the default security credentials that are required to access the AWS management console for an IAM user account?",
          options: ["Security tokens", "MFA", "Access keys", "A user name and password"],
          correctAnswer: 3,
          category: "Security",
          explanation: "IAM users access the AWS Management Console using a username and password by default."
        },
        {
          question: "What is the possible discount for reserved instances compared to the on-demand price?",
          options: ["Up to 90%", "Up to 70%", "Up to 72%", "Up to 54%"],
          correctAnswer: 2,
          category: "Pricing",
          explanation: "Reserved Instances can provide up to 72% discount compared to On-Demand pricing."
        },
        {
          question: "Your company wants to migrate an application to AWS Cloud from an on-premises data center and needs to move large volumes of data with limited bandwidth. Which service helps you transfer data with high security?",
          options: ["AWS VPN", "AWS Snowball", "AWS Transfer Family", "AWS DataSync"],
          correctAnswer: 1,
          category: "Migration",
          explanation: "AWS Snowball is a secure, physical device for transferring large amounts of data to AWS with high security."
        }
      ],
      intermediate: [
        {
          question: "A streaming company stores films on Amazon S3. Each film is kept as a single video file between 1 GB and 10 GB in size. The company needs to deliver the film for streaming within 5 minutes from when a customer buys it. There's a greater demand for films less than 20 years old compared to those older than 20 years. The goal is to reduce hosting costs based on demand. What strategy should the company use?",
          options: ["Save all video content in Amazon S3. Use S3 Lifecycle rules to transition data to the Infrequent Access tier as movie demand falls.", "Store new film files in S3 Standard. Use S3 Standard-infrequent Access for older films. Retrieve older films using standard retrieval upon customer purchase.", "Save newer films in S3 Intelligent-Tiering. Store older films in S3 Glacier Flexible Retrieval. Use expedited retrieval for older films upon user purchase.", "Keep newer films in S3 Standard and older films in S3 Glacier Flexible Retrieval. Use bulk retrieval for older films upon purchase."],
          correctAnswer: 3,
          category: "Storage",
          explanation: "Answer C is correct because it balances both cost and performance. S3 Intelligent-Tiering automatically moves files between two access tiers, optimizing costs for newer films without affecting availability, which are likely to be frequently accessed. Older films stored in S3 Glacier Flexible Retrieval cost less to store, and using expedited retrieval allows accessing these files in minutes, meeting the 5-minute streaming requirement."
        },
        {
          question: "A tech firm has developed a non-operational software that encompasses several microservices tailored for each departmental unit within the organization. A unified development team oversees all these microservices. The existing setup includes a static web user interface and a backend developed in Java for application logic. Additionally, a MySQL database is hosted on an Amazon EC2 instance. The firm needs to guarantee the software's security and global accessibility. What is the best solution to meet these needs while minimizing operational complexities?",
          options: ["Implement Amazon CloudFront and Amazon S3 for hosting the static web interface. Redesign microservices to operate with AWS Lambda, accessed via Amazon API Gateway. Transition the MySQL database to Amazon RDS for MySQL.", "Utilize Amazon CloudFront and AWS Amplify to manage the static web interface. Redesign the microservices to function on AWS Lambda, accessible through Amazon API Gateway. Shift the MySQL database to a reserved Amazon EC2 instance.", "Use Amazon CloudFront and Amazon S3 for the static web interface. Restructure microservices to function using AWS Lambda within a target group behind a Network Load Balancer. Move the MySQL database to Amazon RDS for MySQL.", "Host the static web interface on Amazon S3. Modify the microservices to run on AWS Lambda within a target group behind an Application Load Balancer. Relocate the MySQL database to a reserved Amazon EC2 instance."],
          correctAnswer: 1,
          category: "Compute",
          explanation: "Answer A is correct because it leverages AWS CloudFront and S3 to handle the static content, which provides global distribution and caching for better accessibility and performance, while using Amazon S3 reduces operational complexity with its scalability and simplicity. AWS Lambda for microservices ensures a cost-effective and scalable serverless architecture, and Amazon API Gateway provides a secure and managed interface for accessing these microservices globally. Moving the MySQL database to Amazon RDS for MySQL offers a managed database service that reduces operational overhead and enhances security and availability."
        },
        {
          question: "A company is using Amazon Aurora as the database for an online retail application. Data analysts run reports every fortnight that take a long time to process and cause performance degradation for the database. A Solutions Architect has reviewed performance metrics in Amazon CloudWatch and noticed that the ReadIOPS and CPUUtilization metrics are spiking when the reports run.What is the MOST cost-effective solution to resolve the performance issues?",
          options: ["Migrate the fortnightly reporting to Amazon EMR.", " Migrate the Aurora database to a larger instance class.", " Increase the Provisioned IOPS on the Aurora instance.", "Migrate the fortnightly reporting to an Aurora Replica."],
          correctAnswer: 4,
          category: "Database",
          explanation: "You can issue queries to the Aurora Replicas to scale the read operations for your application. You typically do so by connecting to the reader endpoint of the cluster. That way, Aurora can spread the load for read-only connections across as many Aurora Replicas as you have in the cluster.This solution is the most cost-effective method of scaling the database for reads for the regular reporting job. The reporting job will be run against the read endpoint and will not cause performance issues for the main database."
        },
        {
          question: "An AWS Organization has an OU with multiple member accounts in it. The company needs to restrict the ability to launch only specific Amazon EC2 instance types. How can this policy be applied across the accounts with the least effort?",
          options: ["Create an IAM policy to deny launching all but the specific instance types", "Use AWS Resource Access Manager to control which launch types can be used", "Create an SCP with a deny rule that denies all but the specific instance types", "Create an SCP with an allow rule that allows launching the specific instance types"],
          correctAnswer: 3,
          category: "Security and Governance",
          explanation: "Because an SCP applies to all accounts in the OU, a deny rule in it can centrally block all EC2 types except the allowed ones, enforcing the restriction across accounts with minimal effort."
        },
        {
          question: "An application runs on Amazon EC2 instances across multiple Availability Zones. The instances run in an Amazon EC2 Auto Scaling group behind an Application Load Balancer. The application performs best when the CPU utilization of the EC2 instances is at or near 40%. What should a solutions architect do to maintain the desired performance across all instances in the group?",
          options: ["Use a target tracking policy to dynamically scale the Auto Scaling group", "Use an AWS Lambda function to update the desired Auto Scaling group capacity", "Use scheduled scaling actions to scale up and scale down the Auto Scaling group", "Use a simple scaling policy to dynamically scale the Auto Scaling group"],
          correctAnswer: 1,
          category: "Compute",
          explanation: "A target tracking scaling policy automatically adjusts the number of EC2 instances in the Auto Scaling group to maintain the target CPU utilization at 40%, ensuring optimal performance."
        },
        {
          question: "A company wants to improve its ability to clone large amounts of production data into a test environment in the same AWS Region. The data is stored in Amazon EC2 instances on Amazon Elastic Block Store (Amazon EBS) volumes. Modifications to the cloned data must not affect the production environment. The software that accesses this data requires consistently high I/O performance. A solutions architect needs to minimize the time that is required to clone the production data into the test environment. Which solution will meet these requirements?",
          options: ["Take EBS snapshots of the production EBS volumes. Create and initialize new EBS volumes. Attach the new EBS volumes to EC2 instances in the test environment before restoring the volumes from the production EBS snapshots.", "Take EBS snapshots of the production EBS volumes. Turn on the EBS fast snapshot restore feature on the EBS snapshots. Restore the snapshots into new EBS volumes. Attach the new EBS volumes to EC2 instances in the test environment.", "Take EBS snapshots of the production EBS volumes. Restore the snapshots onto EC2 instance store volumes in the test environment.", "Configure the production EBS volumes to use the EBS Multi-Attach feature. Take EBS snapshots of the production EBS volumes. Attach the production EBS volumes to the EC2 instances in the test environment."],
          correctAnswer: 2,
          category: "Storage",
          explanation: "EBS fast snapshot restore enables you to create volumes that deliver their maximum performance immediately, minimizing the time required to clone data while ensuring high I/O performance for the test environment."
        },
        {
          question: "While consolidating logs for the weekly reporting, a development team at an e-commerce company noticed that an unusually large number of illegal AWS API queries were made sometime during the week. Due to the off-season, there was no visible impact on the systems. However, this event led the management team to seek an automated solution that can trigger near-real-time warnings in case such an event recurs. Which of the following represents the best solution for the given scenario?",
          options: ["Trusted Advisor publishes metrics about check results to CloudWatch. Create an alarm to track status changes for checks in the Service Limits category for the APIs. The alarm will then notify when the service quota is reached or exceeded", "Configure AWS CloudTrail to stream event data to Amazon Kinesis. Use Kinesis stream-level metrics in the CloudWatch to trigger an AWS Lambda function that will trigger an error workflow", "Create an Amazon CloudWatch metric filter that processes CloudTrail logs having API call details and looks at any errors by factoring in all the error codes that need to be tracked. Create an alarm based on this metric's rate to send an SNS notification to the required team", "Run Amazon Athena SQL queries against CloudTrail log files stored in Amazon S3 buckets. Use Amazon QuickSight to generate reports for managerial dashboards"],
          correctAnswer: 3,
          category: "Security and Monitoring",
          explanation: "A CloudWatch metric filter on CloudTrail logs can monitor for specific error codes in API calls and trigger alarms in near real-time, providing automated warnings for unusual API activity."
        },
        {
          question: "A company copies 250 TB of data from a recent land survey onto multiple AWS Snowball Edge Storage Optimized devices. The company has a high-performance computing (HPC) cluster that is hosted within AWS to look for items of archaeological interest. A solutions architect must provide the cluster with consistent low latency and high-throughput access to the data which is hosted on the Snowball Edge Storage Optimized devices. The company is sending the devices back to AWS. Which solution will meet these requirements?",
          options: ["Create an Amazon FSx for Lustre file system and import the data directly into the FSx for Lustre file system and access the FSx for Lustre file system from the HPC cluster instances.", "Set up an Amazon Elastic File System (Amazon EFS) file system and an Amazon S3 bucket. Upload the data to the S3 bucket. Using the EFS file system, copy the data from the S3 bucket and access the EFS file system from the HPC cluster instances.", "Create a bucket in Amazon S3 and import the data into the S3 bucket. Set up an AWS Storage Gateway file gateway to use the S3 bucket and access the file gateway from the HPC cluster instances.", "Set up an Amazon S3 bucket. Configure an Amazon FSx for Lustre file system and integrate it with the S3 bucket after importing the data then access the FSx for Lustre file system from the HPC cluster instances"],
          correctAnswer: 4,
          category: "Storage",
          explanation: "Amazon FSx for Lustre integrated with S3 provides high-performance, low-latency file access optimized for HPC workloads, meeting the requirements for consistent low latency and high-throughput access to large datasets."
        },
        {
          question: "A tech firm has developed a non-operational software that encompasses several microservices tailored for each departmental unit within the organization. A unified development team oversees all these microservices. The existing setup includes a static web user interface and a backend developed in Java for application logic. Additionally, a MySQL database is hosted on an Amazon EC2 instance. The firm needs to guarantee the software's security and global accessibility. What is the best solution to meet these needs while minimizing operational complexities?",
          options: ["Utilize Amazon CloudFront and AWS Amplify to manage the static web interface. Redesign the microservices to function on AWS Lambda, accessible through Amazon API Gateway. Shift the MySQL database to a reserved Amazon EC2 instance.", "Implement Amazon CloudFront and Amazon S3 for hosting the static web interface. Redesign microservices to operate with AWS Lambda, accessed via Amazon API Gateway. Transition the MySQL database to Amazon RDS for MySQL.", "Use Amazon CloudFront and Amazon S3 for the static web interface. Restructure microservices to function using AWS Lambda within a target group behind a Network Load Balancer. Move the MySQL database to Amazon RDS for MySQL.", "Host the static web interface on Amazon S3. Modify the microservices to run on AWS Lambda within a target group behind an Application Load Balancer. Relocate the MySQL database to a reserved Amazon EC2 instance."],
          correctAnswer: 2,
          category: "Compute",
          explanation: "Answer B is correct because it leverages AWS CloudFront and S3 to handle the static content, which provides global distribution and caching for better accessibility and performance, while using Amazon S3 reduces operational complexity with its scalability and simplicity. AWS Lambda for microservices ensures a cost-effective and scalable serverless architecture, and Amazon API Gateway provides a secure and managed interface for accessing these microservices globally. Moving the MySQL database to Amazon RDS for MySQL offers a managed database service that reduces operational overhead and enhances security and availability."
        },
        {
          question: "A business aims to transfer its data to an Amazon S3 storage system where the data must be secured in its stored state and the encryption keys should automatically refresh on an annual basis. Which option achieves these goals with the smallest operational effort?",
          options: ["Transfer the data to the S3 bucket with server-side encryption using Amazon's S3 managed keys (SSE-S3) and rely on the automatic key rotation feature of SSE-S3.", "Utilize a customer managed key within AWS Key Management Service (AWS KMS). Automatically enable key rotation and set the S3 bucket to use this KMS key for default encryption. Move the data to the S3 bucket.", "Use a customer managed AWS Key Management Service (AWS KMS) key, configuring the S3 bucket to default to this key for encryption. Transfer data to the bucket and handle manual key rotation each year.", "Encrypt the data with customer-supplied key material. Move it to the S3 bucket and generate an AWS KMS key without internal key material. Import the customer key and set automatic key rotation."],
          correctAnswer: 1,
          category: "Security and Encryption",
          explanation: "SSE-S3 provides automatic key rotation annually with minimal operational effort, ensuring data is encrypted at rest while AWS manages the keys and their rotation."
        }
      ],
      advanced: [
        {
          question: "You’re developing an AWS Lambda function that is interacting with a DynamoDB table. The function was working well, but now is giving the results with a time delay. You need to debug the code to understand where the bottleneck is which is causing the performance issue. Which of the following is the ideal way to debug the code?",
          options: ["Use Log statements in the code to detect the delay", "Use Cloudwatch logs to detect where the delay could be", "Look at the throttling errors in Cloudwatch metrics", "Use AWS X-Ray to see where the downstream delay could be"],
          correctAnswer: 3,
          category: "Debugging",
          explanation: "AWS X-Ray provides detailed tracing of requests through your application, allowing you to identify bottlenecks and performance issues in distributed systems like Lambda with DynamoDB.",
          multiple: false
        },
        {
          question: "A business created a set of APIs that are provided through the Amazon API Gateway. The API requests must be authenticated using a supplier of OpenID-based identification, such as Amazon or Facebook. Access to the APIs should be based on a specific authorisation mechanism.Which approach is the most straightforward and secure to employ when developing an authentication and authorisation strategy for APIs?",
          options: ["A. Use Amazon Cognito user pools and a custom authorizer to authenticate and authorize users based on JSON Web Tokens.", "B. Build a OpenID token broker with Amazon and Facebook. Users will authenticate with these identify providers and pass the JSON Web Token to the API to authenticate each API call.", "C. Store user credentials in Amazon DynamoDB and have the application retrieve temporary credentials from AWS STS. Make API calls by passing user credentials to the APIs for authentication and authorization.", "D. Use Amazon RDS to store user credentials and pass them to the APIs for authentications and authorization"],
          correctAnswer: 0,
          category: "Security",
          explanation: "Amazon Cognito user pools provide a straightforward and secure way to authenticate users with OpenID providers and authorize API access using custom authorizers in API Gateway.",
          multiple: false
        },
        {
          question: "You have a popular web application that accesses data stored in an Amazon Simple Storage Service (S3) bucket. Developers use the SDK to maintain the application and add new features. Security compliance requests that all new objects uploaded to S3 be encrypted using SSE-S3 at the time of upload. Which of the following headers must the developers add to their request?",
          options: ["‘x-amz-server-side-encryption‘: ‘SSE-KMS‘", "‘x-amz-server-side-encryption‘: ‘aws:kms‘", "x-amz-server-side-encryption‘: ‘AES256‘", "‘x-amz-server-side-encryption‘: ‘SSE-S3‘"],
          correctAnswer: 2,
          category: "Security",
          explanation: "To enable SSE-S3 encryption, developers must include the 'x-amz-server-side-encryption' header with the value 'AES256' in their S3 upload requests.",
          multiple: false
        },
        {
          question: "A web application runs on a fleet of Amazon EC2 instances in an Auto Scaling group behind an Application Load Balancer (ALB). A developer needs a store for session data so it can be reliably served across multiple requests. Where is the best place to store the session data?",
          options: ["Write the data to the local instance store volumes.", "Write the data to the root of the filesystem.", "Write the data to an Amazon ElastiCache cluster.", "Write the data to a shared Amazon EBS volume."],
          correctAnswer: 2,
          category: "Storage",
          explanation: "Amazon ElastiCache provides a fast, scalable, and reliable in-memory data store for session data that can be shared across multiple EC2 instances in an Auto Scaling group.",
          multiple: false
        },
        {
          question: "You have deployed a Java application to an EC2 instance where it uses the X-Ray SDK. When testing from your personal computer, the application sends data to X-Ray but when the application runs from within EC2, the application fails to send data to X-Ray. Which of the following does NOT help with debugging the issue?",
          options: ["EC2 Instance Role", "X-Ray sampling", "CloudTrail", "EC2 X-Ray Daemon"],
          correctAnswer: 1,
          category: "Debugging",
          explanation: "X-Ray sampling controls the rate of requests traced, but it does not help debug why data is not being sent from EC2. The other options (IAM role, CloudTrail, X-Ray daemon) are relevant for troubleshooting X-Ray connectivity issues.",
          multiple: false
        },
        {
          question: "A company needs to improve its online sales order application hosted on AWS. The system should reliably process each transaction precisely one time without impacting user experience during unpredictable spikes in activity. Which approach should be adopted to achieve this?",
          options: ["Utilize an Amazon Simple Queue Service (Amazon SQS) FIFO queue for storing transactions. Set up an AWS Lambda function to handle order processing from the queue.", "Implement an Amazon Simple Notification Service (Amazon SNS) standard topic for distributing all transactions. Direct the application to act as a notification endpoint.", "Design a process flow with Amazon AppFlow to route transactions to it. Use AWS Lambda to process transactions from this flow.", "Enable AWS X-Ray for the application to log transaction requests. Set the application to retrieve orders from Amazon CloudWatch for processing."],
          correctAnswer: 1,
          category: "Application Integration",
          explanation: "Amazon SQS FIFO queue ensures messages are processed exactly once, and Lambda can handle spikes without impacting user experience.",
          multiple: false
        },
        {
          question: "An e-commerce company has a fleet of EC2 based web servers running into very high CPU utilization issues. The development team has determined that serving secure traffic via HTTPS is a major contributor to the high CPU load. Which of the following steps can take the high CPU load off the web servers? (Select two)",
          options: ["Create an HTTP listener on the Application Load Balancer with SSL pass-through", "Configure an SSL/TLS certificate on an Application Load Balancer via AWS Certificate Manager (ACM)", "Create an HTTPS listener on the Application Load Balancer with SSL termination", "Create an HTTPS listener on the Application Load Balancer with SSL pass-through", "Create an HTTP listener on the Application Load Balancer with SSL termination"],
          correctAnswer: [2,3],
          category: "Compute",
          explanation: "SSL termination at the ALB offloads encryption/decryption from the web servers, reducing CPU load.",
          multiple: true
        },
        {
          question: "A developer in your company was just promoted to Team Lead and will be in charge of code deployment on EC2 instances via AWS CodeCommit and AWS CodeDeploy. Per the new requirements, the deployment process should be able to change permissions for deployed files as well as verify the deployment success. Which of the following actions should the new Developer take?",
          options: ["Define an appspec.yml file in the codebuild/ directory", "Define a buildspec.yml file in the root directory", "Define a buildspec.yml file in the codebuild/ directory", "Define an appspec.yml file in the root directory"],
          correctAnswer: 4,
          category: "Developer Tools",
          explanation: "The appspec.yml file in the root directory defines deployment specifications for CodeDeploy, including file permissions and validation.",
          multiple: false
        },
        {
          question: "An e-commerce company has a bespoke application that is currently running on AWS Elastic Beanstalk.What solutions will update the Elastic Beanstalk environment with the new application version after the Developer completes the changes? (Select two.)",
          options: ["A. Package the application code into a .zip file, and upload, then deploy the packaged application from the AWS Management Console", "B. Package the application code into a .tar file, create a new application version from the AWS Management Console, then update the environment by using AWS CLI", "C. Package the application code into a .tar file, and upload and deploy the packaged application from the AWS Management Console", "D. Package the application code into a .zip file, create a new application version from the packaged application by using AWS CLI, then update the environment by using AWS CLI", "E. Package the application code into a .zip file, create a new application version from the AWS Management Console, then rebuild the environment by using AWS CLI"],
          correctAnswer: [1,4],
          category: "Compute",
          explanation: "Elastic Beanstalk supports deploying .zip files via console or CLI, allowing environment updates with new versions.",
          multiple: true
        },
        {
          question: "A developer is updating a bespoke application that is currently running on AWS Elastic Beanstalk.What solutions will update the Elastic Beanstalk environment with the new application version after the Developer completes the changes? (Select two.)",
          options: ["A. Package the application code into a .zip file, and upload, then deploy the packaged application from the AWS Management Console", "B. Package the application code into a .tar file, create a new application version from the AWS Management Console, then update the environment by using AWS CLI", "C. Package the application code into a .tar file, and upload and deploy the packaged application from the AWS Management Console", "D. Package the application code into a .zip file, create a new application version from the packaged application by using AWS CLI, then update the environment by using AWS CLI", "E. Package the application code into a .zip file, create a new application version from the AWS Management Console, then rebuild the environment by using AWS CLI"],
          correctAnswer: [1,4],
          category: "Compute",
          explanation: "Elastic Beanstalk supports deploying .zip files via console or CLI, allowing environment updates with new versions.",
          multiple: true
        }
      ]
    };
    return questionSets[difficulty] || questionSets.beginner;
  }

  getTimeForDifficulty(difficulty) {
    const times = {
      beginner: 1800, // 30 minutes
      intermediate: 1800, // 30 minutes
      advanced: 600 // 10 minutes
    };
    return times[difficulty] || 300;
  }

  initEventListeners() {
    // Quiz action buttons
    const submitBtn = document.getElementById('submitAnswerBtn');
    const nextBtn = document.getElementById('nextQuestionBtn');
    const retakeBtn = document.getElementById('retakeQuizBtn');
    const dashboardBtn = document.getElementById('viewDashboardBtn');
    const shareBtn = document.getElementById('shareResultsBtn');

    if (submitBtn) submitBtn.addEventListener('click', () => this.submitAnswer());
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextQuestion());
    if (retakeBtn) retakeBtn.addEventListener('click', () => this.retakeQuiz());
    if (dashboardBtn) dashboardBtn.addEventListener('click', () => this.viewDashboard());
    // Removed share results button listener since the button was removed
  }

  startQuiz() {
    this.hideAllScreens();
    document.getElementById('quizScreen').classList.add('active');
    this.currentQuestionIndex = 0;
    this.quizScore = 0;
    this.userAnswers = [];
    this.startTimer();
    this.loadQuestion();
  }

  startTimer() {
    this.updateTimerDisplay();
    this.timer = setInterval(() => {
      this.timeLeft--;
      this.updateTimerDisplay();
      if (this.timeLeft <= 0) {
        this.timeUp();
      }
    }, 1000);
  }

  updateTimerDisplay() {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    const timerEl = document.getElementById('timerText');
    if (timerEl) {
      timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  }

  timeUp() {
    clearInterval(this.timer);
    this.showResults();
  }

  loadQuestion() {
    const q = this.questions[this.currentQuestionIndex];

    // Update progress
    document.getElementById('currentQuestionNum').textContent = this.currentQuestionIndex + 1;
    document.getElementById('totalQuestionNum').textContent = this.totalQuestions;
    const progressPercent = ((this.currentQuestionIndex + 1) / this.totalQuestions) * 100;
    document.getElementById('progressFill').style.width = `${progressPercent}%`;

    // Update question details
    document.getElementById('questionText').textContent = q.question;
    document.getElementById('questionCategory').textContent = '';
    document.getElementById('questionDifficulty').textContent = this.difficulty.charAt(0).toUpperCase() + this.difficulty.slice(1);
    this.multiple = q.multiple || false;

    // Load options
    const optionsGrid = document.getElementById('optionsGrid');
    optionsGrid.innerHTML = '';
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn-modern';
      btn.innerHTML = `<span class="option-letter">${String.fromCharCode(65 + idx)})</span> ${opt}`;
      btn.addEventListener('click', () => this.selectOption(idx));
      optionsGrid.appendChild(btn);
    });

    // Reset UI state
    document.getElementById('submitAnswerBtn').disabled = true;
    document.getElementById('nextQuestionBtn').classList.add('hidden');
  }

  selectOption(idx) {
    if (!this.multiple) {
      this.selectedOptions = [idx];
    } else {
      if (this.selectedOptions.includes(idx)) {
        this.selectedOptions = this.selectedOptions.filter(i => i !== idx);
      } else {
        this.selectedOptions.push(idx);
      }
    }
    document.querySelectorAll('.option-btn-modern').forEach((b, i) => {
      if (this.selectedOptions.includes(i)) {
        b.classList.add('selected');
      } else {
        b.classList.remove('selected');
      }
    });
    document.getElementById('submitAnswerBtn').disabled = this.selectedOptions.length === 0;
  }

  submitAnswer() {
    const q = this.questions[this.currentQuestionIndex];
    const correctIndices = Array.isArray(q.correctAnswer) ? q.correctAnswer : [q.correctAnswer];
    const arraysEqual = (a, b) => a.length === b.length && a.every((val, index) => val === b[index]);
    const correct = this.multiple ? arraysEqual(this.selectedOptions.sort(), correctIndices.sort()) : (this.selectedOptions.length === 1 && this.selectedOptions[0] === q.correctAnswer);
    if (correct) this.quizScore++;
    this.userAnswers.push({
      selected: [...this.selectedOptions],
      correct: q.correctAnswer,
      isCorrect: correct,
      explanation: q.explanation
    });

    // Show feedback
    this.showAnswerFeedback(correct, q.correctAnswer);

    document.getElementById('nextQuestionBtn').classList.remove('hidden');
    document.getElementById('submitAnswerBtn').disabled = true;
  }

  showAnswerFeedback(isCorrect, correctAnswer) {
    const options = document.querySelectorAll('.option-btn-modern');
    const correctIndices = Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer];
    options.forEach((btn, idx) => {
      if (correctIndices.includes(idx)) {
        btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
        btn.style.color = 'white';
      } else if (this.selectedOptions.includes(idx)) {
        btn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        btn.style.color = 'white';
      }
      btn.disabled = true;
    });
  }

  nextQuestion() {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.totalQuestions) {
      this.loadQuestion();
    } else {
      this.showResults();
    }
  }

  showResults() {
    clearInterval(this.timer);
    this.hideAllScreens();
    document.getElementById('resultsScreen').classList.add('active');

    const percentage = Math.round((this.quizScore / this.totalQuestions) * 100);

    // Update score display
    document.getElementById('finalScore').textContent = this.quizScore;
    document.getElementById('correctAnswers').textContent = this.quizScore;
    document.getElementById('totalQuestionsResult').textContent = this.totalQuestions;
    document.getElementById('accuracyPercent').textContent = `${percentage}%`;

    // Create pie chart
    this.createScoreChart(percentage);

    // Update celebration based on score
    this.updateCelebration(percentage);

    // Generate insights
    this.generateInsights(percentage);
  }

  createScoreChart(percentage) {
    const ctx = document.getElementById('scoreChart').getContext('2d');
    const correct = this.quizScore;
    const incorrect = this.totalQuestions - this.quizScore;

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [correct, incorrect],
          backgroundColor: [
            'rgba(16, 185, 129, 0.8)', // green for correct
            'rgba(239, 68, 68, 0.8)'   // red for incorrect
          ],
          borderColor: [
            'rgba(16, 185, 129, 1)',
            'rgba(239, 68, 68, 1)'
          ],
          borderWidth: 2,
          cutout: '70%'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.dataIndex === 0 ? 'Correct' : 'Incorrect';
                const value = context.parsed;
                return `${label}: ${value}`;
              }
            }
          }
        }
      }
    });
  }

  updateCelebration(percentage) {
    const iconEl = document.getElementById('celebrationIcon');
    const titleEl = document.getElementById('resultsTitle');
    const messageEl = document.getElementById('resultsMessage');

    if (percentage === 100) {
      iconEl.textContent = '🏆';
      titleEl.textContent = 'Perfect Score!';
      messageEl.textContent = 'Outstanding! You\'re an AWS master. Your knowledge is exceptional!';
    } else if (percentage >= 80) {
      iconEl.textContent = '🎉';
      titleEl.textContent = 'Excellent Work!';
      messageEl.textContent = 'Great job! You have strong AWS knowledge. Keep up the excellent work!';
    } else if (percentage >= 60) {
      iconEl.textContent = '👏';
      titleEl.textContent = 'Good Job!';
      messageEl.textContent = 'Well done! You\'re on the right track. A bit more practice will take you far!';
    } else {
      iconEl.textContent = '📚';
      titleEl.textContent = 'Keep Learning!';
      messageEl.textContent = 'Every expert was once a beginner. Keep studying and you\'ll master AWS!';
    }
  }

  generateInsights(percentage) {
    const insights = [];
    const totalQuestions = this.totalQuestions;

    // Time management insight
    const timeUsed = this.getTimeForDifficulty(this.difficulty) - this.timeLeft;
    const avgTimePerQuestion = timeUsed / totalQuestions;
    if (avgTimePerQuestion < 30) {
      insights.push({
        icon: '⚡',
        title: 'Quick Thinker',
        desc: 'You answered questions quickly, showing good familiarity with the concepts.'
      });
    } else if (avgTimePerQuestion > 90) {
      insights.push({
        icon: '🧠',
        title: 'Deep Thinker',
        desc: 'You took time to consider each answer carefully, which is great for learning.'
      });
    }

    // Performance trend
    if (percentage >= 80) {
      insights.push({
        icon: '📈',
        title: 'Strong Performance',
        desc: 'You demonstrated excellent understanding of AWS services and concepts.'
      });
    } else if (percentage >= 60) {
      insights.push({
        icon: '🎯',
        title: 'Good Progress',
        desc: 'You\'re building a solid foundation. Focus on weak areas to improve further.'
      });
    } else {
      insights.push({
        icon: '🌱',
        title: 'Learning Journey',
        desc: 'You\'re at the beginning of your AWS learning journey. Keep practicing!'
      });
    }

    // Difficulty insight
    if (this.difficulty === 'advanced' && percentage >= 60) {
      insights.push({
        icon: '👑',
        title: 'Advanced Level',
        desc: 'You handled advanced questions well. You\'re ready for complex AWS scenarios.'
      });
    } else if (this.difficulty === 'beginner' && percentage >= 80) {
      insights.push({
        icon: '🚀',
        title: 'Ready for More',
        desc: 'You mastered the basics! Try intermediate or advanced difficulty next.'
      });
    }

    // Display insights
    const insightsGrid = document.getElementById('insightsGrid');
    insightsGrid.innerHTML = '';
    insights.forEach(insight => {
      const card = document.createElement('div');
      card.className = 'insight-card';
      card.innerHTML = `
        <div class="insight-icon">${insight.icon}</div>
        <div class="insight-title">${insight.title}</div>
        <div class="insight-desc">${insight.desc}</div>
      `;
      insightsGrid.appendChild(card);
    });
  }

  retakeQuiz() {
    // Redirect back to quizzes.html with the same difficulty
    window.location.href = `quizzes.html?difficulty=${this.difficulty}`;
  }

  viewDashboard() {
    window.location.href = 'index.html';
  }



  hideAllScreens() {
    document.querySelectorAll('.screen').forEach(screen => {
      screen.classList.remove('active');
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.controller = new QuizPageController();
});
