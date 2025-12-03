// AWS Study Hub - Enhanced Dashboard Controller
class StudyDashboard {
    constructor() {
        this.socket = io();
        this.charts = {};
        this.userData = {};
        this.currentQuiz = null;
        this.currentCard = 0;
        this.totalCards = 50;
        this.studyTimer = null;
        this.quizScore = 0;
        this.totalQuestions = 0;
        this.animations = [];
        
        this.initializeSocket();
        this.initializeCharts();
        this.initializeEventListeners();
        this.loadQuizData();
        this.loadKeywordsData();
        this.loadDiagramsData();
        this.startAnimations();
        this.initializeProgressTracking();
    }

    initializeSocket() {
        this.socket.on('connect', () => {
            console.log('🚀 Connected to AWS Study Hub server');
            this.updateConnectionStatus(true);
            this.showNotification('Connected to server', 'success');
        });

        this.socket.on('initialData', (data) => {
            this.userData = data;
            this.updateDashboard(data);
            this.updateCharts(data);
            this.animateCounters();
        });

        this.socket.on('dataUpdate', (data) => {
            this.updateDashboard(data);
            this.updateCharts(data);
            this.updateActivityFeed(data.recentActivity);
            this.triggerProgressAnimation();
        });

        this.socket.on('activeUsersUpdate', (count) => {
            this.animateCounter('activeUsers', count);
        });

        this.socket.on('disconnect', () => {
            console.log('❌ Disconnected from server');
            this.updateConnectionStatus(false);
            this.showNotification('Connection lost', 'error');
        });
    }

    updateConnectionStatus(connected) {
        const dot = document.querySelector('.pulse-dot');
        if (dot) {
            dot.style.background = connected ? '#10b981' : '#ef4444';
        }
    }

    updateDashboard(data) {
        // Update user info
        if (document.getElementById('userName')) {
            document.getElementById('userName').textContent = data.userName || 'Student';
        }

        // Update all metric displays
        const updates = {
            'studiedCards': data.totalStudySessions || 30,
            'totalCards': 124,
            'accuracyDisplay': Math.round(data.globalAccuracy || 87) + '%',
            'totalCardsDisplay': 124,
            'studiedCardsDisplay': data.totalStudySessions || 30,
            'totalCardsCount': 124,
            'studiedCount': data.totalStudySessions || 30,
            'accuracyPercent': Math.round(data.globalAccuracy || 87) + '%',
            'streakDays': Math.floor((data.totalStudySessions || 30) / 10)
        };

        Object.entries(updates).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        });
    }

    updateCharts(data) {
        if (this.charts.category) {
            const categoryData = data.categoryProgress ? Object.values(data.categoryProgress) : [15, 12, 8, 10, 5];
            this.charts.category.data.datasets[0].data = categoryData;
            this.charts.category.update('none');
        }
    }

    updateActivityFeed(activities) {
        const activityList = document.getElementById('activityList');
        if (!activityList) return;

        if (!activities || activities.length === 0) {
            activityList.innerHTML = '<div class="activity-item"><span class="activity-text">No recent activity</span></div>';
            return;
        }

        activityList.innerHTML = '';
        activities.forEach(activity => {
            const item = document.createElement('div');
            item.className = 'activity-item';
            item.innerHTML = `
                <span class="activity-text">${activity.user} studied ${activity.category} ${activity.isCorrect ? '✅' : '❌'}</span>
            `;
            activityList.appendChild(item);
        });
    }

    initializeCharts() {
        Chart.defaults.color = '#a0a0a0';
        Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';

        const categoryCtx = document.getElementById('categoryChart');
        if (categoryCtx) {
            this.charts.category = new Chart(categoryCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Compute', 'Storage', 'Database', 'Networking', 'Security'],
                    datasets: [{
                        data: [15, 12, 8, 10, 5],
                        backgroundColor: ['#6366f1', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: { 
                                padding: 15, 
                                usePointStyle: true,
                                color: '#a0a0a0'
                            }
                        }
                    }
                }
            });
        }
    }

    initializeEventListeners() {
        // Service Cards pillar - ensure proper redirect
        const serviceCardsBtn = document.querySelector('#serviceCardsCard .pillar-btn');
        if (serviceCardsBtn) {
            serviceCardsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = 'categories.html';
            });
        }

        // Main pillar buttons
        document.getElementById('startQuizBtn')?.addEventListener('click', () => this.showQuizModal());
        document.getElementById('browseKeywordsBtn')?.addEventListener('click', () => this.showKeywordsModal());
        document.getElementById('viewDiagramsBtn')?.addEventListener('click', () => this.showDiagramsModal());

        // Facts buttons
        document.querySelectorAll('.fact-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const factType = e.target.closest('.fact-card').dataset.fact;
                this.showFactsModal(factType);
            });
        });

        // Quick action buttons
        document.getElementById('randomQuizBtn')?.addEventListener('click', () => this.startRandomQuiz());
        document.getElementById('flashcardModeBtn')?.addEventListener('click', () => this.startFlashcardMode());
        document.getElementById('keywordDrillBtn')?.addEventListener('click', () => this.startKeywordDrill());
        document.getElementById('architectureStudyBtn')?.addEventListener('click', () => this.startArchitectureStudy());

        // Modal close buttons
        document.getElementById('closeQuizBtn')?.addEventListener('click', () => this.hideModal('quizModal'));
        document.getElementById('closeKeywordsBtn')?.addEventListener('click', () => this.hideModal('keywordsModal'));
        document.getElementById('closeDiagramsBtn')?.addEventListener('click', () => this.hideModal('diagramsModal'));
        document.getElementById('closeFactsBtn')?.addEventListener('click', () => this.hideModal('factsModal'));
        document.getElementById('closeCertificationsBtn')?.addEventListener('click', () => this.hideModal('certificationsModal'));


        // Facts navigation
        document.getElementById('prevFactBtn')?.addEventListener('click', () => this.navigateFact(-1));
        document.getElementById('nextFactBtn')?.addEventListener('click', () => this.navigateFact(1));

        // Certifications navigation
        document.getElementById('prevCertificationBtn')?.addEventListener('click', () => this.navigateCertification(-1));
        document.getElementById('nextCertificationBtn')?.addEventListener('click', () => this.navigateCertification(1));

        // Certifications buttons
        document.querySelectorAll('.cert-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const certType = e.target.closest('.pillar-card').dataset.cert;
                this.showCertificationsModal(certType);
            });
        });

        // Tips buttons
        document.querySelectorAll('.tip-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tipType = e.target.closest('.tip-card').dataset.tip;
                this.loadTipsData();
                const tip = this.tips.find(t => t.id === tipType);
                if (tip) {
                    window.open(tip.actionPrimaryUrl, '_blank');
                }
            });
        });



        // Study view controls
        document.getElementById('backToDashboard')?.addEventListener('click', () => this.hideStudyView());
        document.getElementById('flipBtn')?.addEventListener('click', () => this.flipCard());
        document.getElementById('prevBtn')?.addEventListener('click', () => this.previousCard());
        document.getElementById('nextBtn')?.addEventListener('click', () => this.nextCard());

        // Quiz functionality
        document.getElementById('nextQuestionBtn')?.addEventListener('click', () => this.nextQuestion());

        // Difficulty rating
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const difficulty = e.target.classList.contains('easy') ? 'easy' : 
                                 e.target.classList.contains('medium') ? 'medium' : 'hard';
                this.rateDifficulty(difficulty);
            });
        });

        // Keyword search
        document.getElementById('keywordSearch')?.addEventListener('input', (e) => {
            this.filterKeywords(e.target.value);
        });

        // Diagram tabs
        document.querySelectorAll('.diagram-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchDiagramCategory(e.target.dataset.category);
            });
        });
    }

    // Enhanced Quiz functionality with comprehensive features
    loadQuizData() {
        this.quizQuestions = [
            {
                question: "Which AWS service is used for object storage?",
                options: ["Amazon EC2", "Amazon S3", "Amazon RDS", "AWS Lambda"],
                correct: 1,
                explanation: "Amazon S3 (Simple Storage Service) is AWS's object storage service that offers industry-leading scalability, data availability, security, and performance.",
                category: "Storage",
                difficulty: "easy"
            },
            {
                question: "What does EC2 stand for in AWS?",
                options: ["Elastic Container Cloud", "Elastic Compute Cloud", "Easy Cloud Computing", "Enterprise Cloud Computing"],
                correct: 1,
                explanation: "EC2 stands for Elastic Compute Cloud, which provides secure, resizable compute capacity in the cloud.",
                category: "Compute",
                difficulty: "easy"
            },
            {
                question: "Which service is used for managed relational databases?",
                options: ["Amazon DynamoDB", "Amazon S3", "Amazon RDS", "Amazon Redshift"],
                correct: 2,
                explanation: "Amazon RDS (Relational Database Service) makes it easy to set up, operate, and scale a relational database in the cloud.",
                category: "Database",
                difficulty: "medium"
            },
            {
                question: "What is the maximum size of an S3 object?",
                options: ["5 GB", "5 TB", "100 GB", "1 TB"],
                correct: 1,
                explanation: "The maximum size of an S3 object is 5 TB. For objects larger than 100 MB, multipart upload is recommended.",
                category: "Storage",
                difficulty: "medium"
            },
            {
                question: "Which AWS service provides a virtual network dedicated to your AWS account?",
                options: ["Amazon CloudFront", "Amazon VPC", "AWS Direct Connect", "Amazon Route 53"],
                correct: 1,
                explanation: "Amazon VPC (Virtual Private Cloud) lets you provision a logically isolated section of the AWS Cloud.",
                category: "Networking",
                difficulty: "medium"
            },
            {
                question: "What is the default limit for EC2 instances per region?",
                options: ["10", "20", "50", "100"],
                correct: 1,
                explanation: "The default limit is 20 EC2 instances per region, but this can be increased by requesting a limit increase.",
                category: "Compute",
                difficulty: "hard"
            }
        ];
        this.currentQuestionIndex = 0;
        this.quizScore = 0;
        this.totalQuestions = 0;
    }

    loadNextQuestion() {
        if (this.currentQuestionIndex >= this.quizQuestions.length) {
            this.currentQuestionIndex = 0;
        }

        const question = this.quizQuestions[this.currentQuestionIndex];
        document.getElementById('questionText').textContent = question.question;
        
        const optionsContainer = document.getElementById('quizOptions');
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = `${String.fromCharCode(65 + index)}) ${option}`;
            btn.addEventListener('click', () => this.selectAnswer(index));
            optionsContainer.appendChild(btn);
        });

        document.querySelector('.quiz-question').classList.remove('hidden');
        document.getElementById('quizResult').classList.add('hidden');
    }

    selectAnswer(selectedIndex) {
        const question = this.quizQuestions[this.currentQuestionIndex];
        const isCorrect = selectedIndex === question.correct;
        
        document.getElementById('resultText').innerHTML = `
            ${isCorrect ? '✅ Correct!' : '❌ Incorrect'}<br>
            <strong>Explanation:</strong> ${question.explanation}
        `;
        
        document.querySelector('.quiz-question').classList.add('hidden');
        document.getElementById('quizResult').classList.remove('hidden');

        // Send quiz result to server
        this.socket.emit('studySession', {
            category: 'Quiz',
            isCorrect: isCorrect,
            userName: this.userData.userName || 'Student'
        });
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        this.loadNextQuestion();
    }

    // Keywords functionality
    showKeywordsModal() {
        this.showModal('keywordsModal');
    }

    // Enhanced Keywords with comprehensive AWS terminology
    loadKeywordsData() {
        this.keywords = [
            { term: "EC2", definition: "Elastic Compute Cloud - Virtual servers in the cloud that provide scalable computing capacity", category: "Compute" },
            { term: "S3", definition: "Simple Storage Service - Object storage service with 99.999999999% (11 9's) durability", category: "Storage" },
            { term: "VPC", definition: "Virtual Private Cloud - Isolated cloud resources within your own virtual network", category: "Networking" },
            { term: "IAM", definition: "Identity and Access Management - Securely manage access to AWS services and resources", category: "Security" },
            { term: "RDS", definition: "Relational Database Service - Managed relational database service supporting multiple engines", category: "Database" },
            { term: "Lambda", definition: "Serverless compute service - Run code without provisioning or managing servers", category: "Compute" },
            { term: "CloudFront", definition: "Content Delivery Network (CDN) - Delivers content with low latency and high transfer speeds", category: "Networking" },
            { term: "DynamoDB", definition: "NoSQL Database Service - Fast and flexible NoSQL database for any scale", category: "Database" },
            { term: "EBS", definition: "Elastic Block Store - High-performance block storage for EC2 instances", category: "Storage" },
            { term: "Route 53", definition: "DNS Web Service - Highly available and scalable cloud DNS service", category: "Networking" },
            { term: "CloudWatch", definition: "Monitoring Service - Observability service for AWS cloud resources and applications", category: "Management" },
            { term: "SNS", definition: "Simple Notification Service - Fully managed messaging service for application-to-application communication", category: "Application Integration" },
            { term: "SQS", definition: "Simple Queue Service - Fully managed message queuing service", category: "Application Integration" },
            { term: "API Gateway", definition: "Managed service for creating, publishing, and securing APIs at any scale", category: "Networking" },
            { term: "CloudFormation", definition: "Infrastructure as Code - Model and provision AWS resources using templates", category: "Management" },
            { term: "Auto Scaling", definition: "Automatically adjust capacity to maintain steady, predictable performance", category: "Compute" },
            { term: "ELB", definition: "Elastic Load Balancing - Distribute incoming traffic across multiple targets", category: "Networking" },
            { term: "KMS", definition: "Key Management Service - Create and manage cryptographic keys", category: "Security" },
            { term: "Cognito", definition: "User identity and data synchronization service for mobile and web applications", category: "Security" },
            { term: "Redshift", definition: "Data Warehouse Service - Fast, simple, cost-effective data warehousing", category: "Analytics" }
        ];
        this.filteredKeywords = [...this.keywords];
    }

    filterKeywords(searchTerm) {
        const keywordsList = document.getElementById('keywordsList');
        const filtered = this.keywords.filter(keyword => 
            keyword.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
            keyword.definition.toLowerCase().includes(searchTerm.toLowerCase())
        );

        keywordsList.innerHTML = '';
        filtered.forEach(keyword => {
            const item = document.createElement('div');
            item.className = 'keyword-item';
            item.innerHTML = `<strong>${keyword.term}:</strong> ${keyword.definition}`;
            keywordsList.appendChild(item);
        });
    }

    // Diagrams functionality
    showDiagramsModal() {
        this.showModal('diagramsModal');
        this.switchDiagramCategory('web');
    }

    switchDiagramCategory(category) {
        document.querySelectorAll('.diagram-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`).classList.add('active');

        const viewer = document.getElementById('diagramViewer');
        viewer.innerHTML = `
            <div class="diagram-placeholder">
                <p>📐 ${category.charAt(0).toUpperCase() + category.slice(1)} Architecture Diagrams</p>
                <p>Diagram content would be displayed here</p>
            </div>
        `;
    }

    // Flashcard functionality
    startFlashcardMode() {
        this.showStudyView();
        this.currentCard = 1;
        this.updateCardDisplay();
    }

    showStudyView() {
        document.getElementById('studyView').classList.remove('hidden');
    }

    hideStudyView() {
        document.getElementById('studyView').classList.add('hidden');
    }

    flipCard() {
        document.getElementById('flashcard').classList.toggle('flipped');
    }

    previousCard() {
        if (this.currentCard > 1) {
            this.currentCard--;
            this.updateCardDisplay();
            document.getElementById('flashcard').classList.remove('flipped');
        }
    }

    nextCard() {
        if (this.currentCard < this.totalCards) {
            this.currentCard++;
            this.updateCardDisplay();
            document.getElementById('flashcard').classList.remove('flipped');
        }
    }

    updateCardDisplay() {
        document.getElementById('currentCardNum').textContent = this.currentCard;
        document.getElementById('totalStudyCards').textContent = this.totalCards;
    }

    rateDifficulty(difficulty) {
        console.log(`Card rated as: ${difficulty}`);
        // Send difficulty rating to server
        this.socket.emit('studySession', {
            category: 'Flashcard',
            isCorrect: difficulty === 'easy',
            userName: this.userData.userName || 'Student'
        });
    }

    // Quick actions
    startRandomQuiz() {
        this.showQuizModal();
    }

    startKeywordDrill() {
        this.showKeywordsModal();
    }

    startArchitectureStudy() {
        this.showDiagramsModal();
    }

    // Certifications Modal Functionality
    loadCertificationsData() {
        this.certifications = [
            {
                id: 'ccp',
                level: 'Foundational',
                levelIcon: '🟣',
                badge: 'images/ccp.png',
                title: 'AWS Certified Cloud Practitioner',
                shortDesc: 'No prior experience needed. Knowledge-based certification for foundational understanding of AWS Cloud.',
                examCode: 'CLF-C02',
                cost: '$100 USD',
                duration: '90 minutes',
                format: '65 questions (multiple choice, multiple response)',
                passingScore: '700/1000',
                skills: [
                    'Cloud concepts (26%)',
                    'Security and compliance (25%)',
                    'Technology (33%)',
                    'Billing and pricing (16%)'
                ],
                benefits: 'This certification demonstrates your understanding of AWS Cloud concepts, services, and terminology. It\'s perfect for individuals in non-technical roles who need AWS knowledge, such as sales, marketing, project management, or business analysis.',
                examUrl: 'https://aws.amazon.com/certification/certified-cloud-practitioner/',
                learningUrl: 'https://aws.amazon.com/training/learn-about/cloud-practitioner/'
            },
            {
                id: 'ai',
                level: 'Foundational',
                levelIcon: '🟣',
                badge: 'images/ai.png',
                title: 'AWS Certified AI Practitioner',
                shortDesc: 'No prior experience needed. Knowledge-based certification for foundational understanding of AWS AI/ML services.',
                examCode: 'AIF-C01',
                cost: '$100 USD',
                duration: '90 minutes',
                format: '50 questions (multiple choice, multiple response)',
                passingScore: '700/1000',
                skills: [
                    'AI/ML fundamentals (40%)',
                    'AI/ML on AWS (30%)',
                    'Security, compliance, and governance (15%)',
                    'AI/ML implementation and operations (15%)'
                ],
                benefits: 'This certification validates your understanding of AI/ML concepts and AWS AI/ML services. It\'s ideal for individuals who want to demonstrate foundational knowledge of AI/ML on AWS.',
                examUrl: 'https://aws.amazon.com/certification/certified-ai-practitioner/',
                learningUrl: 'https://aws.amazon.com/training/learn-about/ai-practitioner/'
            },
            {
                id: 'saa',
                level: 'Associate',
                levelIcon: '🔵',
                badge: 'images/saa.png',
                title: 'AWS Certified Solutions Architect – Associate',
                shortDesc: 'Prior cloud and/or strong on-premises IT experience recommended. Role-based certification for designing secure, optimized applications.',
                examCode: 'SAA-C03',
                cost: '$150 USD',
                duration: '130 minutes',
                format: '65 questions (multiple choice, multiple response)',
                passingScore: '720/1000',
                skills: [
                    'Design secure architectures (30%)',
                    'Design resilient architectures (26%)',
                    'Design high-performing architectures (24%)',
                    'Design cost-optimized architectures (20%)'
                ],
                benefits: 'This is AWS\'s most popular certification. It validates your ability to design and deploy scalable, highly available, and fault-tolerant systems on AWS. Essential for cloud architects and engineers.',
                examUrl: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/',
                learningUrl: 'https://aws.amazon.com/training/learn-about/solutions-architect/'
            },
            {
                id: 'dva',
                level: 'Associate',
                levelIcon: '🔵',
                badge: 'images/dva.png',
                title: 'AWS Certified Developer – Associate',
                shortDesc: 'Prior cloud and/or strong on-premises IT experience recommended. Role-based certification for developing applications on AWS.',
                examCode: 'DVA-C02',
                cost: '$150 USD',
                duration: '130 minutes',
                format: '65 questions (multiple choice, multiple response)',
                passingScore: '720/1000',
                skills: [
                    'Development with AWS services (32%)',
                    'Security (26%)',
                    'Deployment (24%)',
                    'Troubleshooting and optimization (18%)'
                ],
                benefits: 'This certification validates your ability to develop, deploy, and debug cloud-based applications using AWS. Perfect for developers working with AWS services.',
                examUrl: 'https://aws.amazon.com/certification/certified-developer-associate/',
                learningUrl: 'https://aws.amazon.com/training/learn-about/developer/'
            },
            {
                id: 'cloudops',
                level: 'Associate',
                levelIcon: '🔵',
                badge: 'images/cloudops.png',
                title: 'AWS Certified CloudOps Engineer – Associate',
                shortDesc: 'Prior cloud and/or strong on-premises IT experience recommended. Role-based certification for cloud operations.',
                examCode: 'CLF-C02',
                cost: '$150 USD',
                duration: '130 minutes',
                format: '65 questions (multiple choice, multiple response)',
                passingScore: '720/1000',
                skills: [
                    'Monitoring and logging (20%)',
                    'Resilience and performance (26%)',
                    'Security and compliance (16%)',
                    'Automation and optimization (20%)',
                    'Networking and content delivery (18%)'
                ],
                benefits: 'This certification validates your ability to support, maintain, and operate AWS workloads. Ideal for system administrators and DevOps engineers.',
                examUrl: 'https://aws.amazon.com/certification/certified-sysops-administrator-associate/',
                learningUrl: 'https://aws.amazon.com/training/learn-about/sysops-administrator/'
            },
            {
                id: 'dea',
                level: 'Associate',
                levelIcon: '🔵',
                badge: 'images/dea.png',
                title: 'AWS Certified Data Engineer – Associate',
                shortDesc: 'Prior cloud and/or strong on-premises IT experience recommended. Role-based certification for data engineering on AWS.',
                examCode: 'DEA-C01',
                cost: '$150 USD',
                duration: '130 minutes',
                format: '65 questions (multiple choice, multiple response)',
                passingScore: '720/1000',
                skills: [
                    'Data ingestion and transformation (34%)',
                    'Data storage (26%)',
                    'Data management (18%)',
                    'Data security and governance (12%)',
                    'Data operations and support (10%)'
                ],
                benefits: 'This certification validates your ability to build and manage data pipelines, transform data, and implement data security. Essential for data engineers working with AWS.',
                examUrl: 'https://aws.amazon.com/certification/certified-data-engineer-associate/',
                learningUrl: 'https://aws.amazon.com/training/learn-about/data-engineer/'
            },
            {
                id: 'mla',
                level: 'Associate',
                levelIcon: '🔵',
                badge: 'images/mla.png',
                title: 'AWS Certified Machine Learning Engineer – Associate',
                shortDesc: 'Prior cloud and/or strong on-premises IT experience recommended. Role-based certification for ML engineering on AWS.',
                examCode: 'MLA-C01',
                cost: '$150 USD',
                duration: '130 minutes',
                format: '65 questions (multiple choice, multiple response)',
                passingScore: '720/1000',
                skills: [
                    'Data engineering (20%)',
                    'Exploratory data analysis (24%)',
                    'Modeling (36%)',
                    'ML implementation and operations (20%)'
                ],
                benefits: 'This certification validates your ability to build, train, and deploy ML models using AWS services. Perfect for ML engineers and data scientists.',
                examUrl: 'https://aws.amazon.com/certification/certified-machine-learning-engineer-associate/',
                learningUrl: 'https://aws.amazon.com/training/learn-about/machine-learning-engineer/'
            },
            {
                id: 'sap',
                level: 'Professional',
                levelIcon: '🟢',
                badge: 'images/sap.png',
                title: 'AWS Certified Solutions Architect – Professional',
                shortDesc: '2 years of prior AWS Cloud experience recommended. Advanced certification for designing secure, optimized applications.',
                examCode: 'SAP-C02',
                cost: '$300 USD',
                duration: '180 minutes',
                format: '75 questions (multiple choice, multiple response)',
                passingScore: '750/1000',
                skills: [
                    'Design solutions for organizational complexity (26%)',
                    'Design for new solutions (29%)',
                    'Migration planning (20%)',
                    'Cost control (13%)',
                    'Continuous improvement (12%)'
                ],
                benefits: 'This advanced certification validates your ability to design complex, enterprise-level solutions on AWS. Requires deep understanding of AWS services and architecture patterns.',
                examUrl: 'https://aws.amazon.com/certification/certified-solutions-architect-professional/',
                learningUrl: 'https://aws.amazon.com/training/learn-about/solutions-architect-professional/'
            },
            {
                id: 'dop',
                level: 'Professional',
                levelIcon: '🟢',
                badge: 'images/dop.png',
                title: 'AWS Certified DevOps Engineer – Professional',
                shortDesc: '2 years of prior AWS Cloud experience recommended. Advanced certification for DevOps practices on AWS.',
                examCode: 'DOP-C02',
                cost: '$300 USD',
                duration: '180 minutes',
                format: '75 questions (multiple choice, multiple response)',
                passingScore: '750/1000',
                skills: [
                    'SDLC automation (22%)',
                    'Configuration management and IaC (16%)',
                    'Resilient cloud solutions (20%)',
                    'Monitoring and logging (15%)',
                    'Incident and event response (11%)',
                    'Security and compliance (16%)'
                ],
                benefits: 'This certification validates your ability to implement DevOps practices, automate processes, and manage complex AWS deployments. Essential for senior DevOps engineers.',
                examUrl: 'https://aws.amazon.com/certification/certified-devops-engineer-professional/',
                learningUrl: 'https://aws.amazon.com/training/learn-about/devops-engineer-professional/'
            },
            {
                id: 'scs',
                level: 'Specialty',
                levelIcon: '🟣',
                badge: 'images/scs.png',
                title: 'AWS Certified Security – Specialty',
                shortDesc: 'Refer to exam guides for recommended experience. Specialty certification for security expertise on AWS.',
                examCode: 'SCS-C02',
                cost: '$300 USD',
                duration: '170 minutes',
                format: '65 questions (multiple choice, multiple response)',
                passingScore: '750/1000',
                skills: [
                    'Security logging and monitoring (20%)',
                    'Security and compliance (26%)',
                    'Security risks and mitigation (28%)',
                    'Security of the data plane (26%)'
                ],
                benefits: 'This specialty certification validates your ability to secure AWS workloads, implement security controls, and meet compliance requirements. Essential for security professionals.',
                examUrl: 'https://aws.amazon.com/certification/certified-security-specialty/',
                learningUrl: 'https://aws.amazon.com/training/learn-about/security-specialty/'
            },
            {
                id: 'ans',
                level: 'Specialty',
                levelIcon: '🟣',
                badge: 'images/ans.png',
                title: 'AWS Certified Advanced Networking – Specialty',
                shortDesc: 'Refer to exam guides for recommended experience. Specialty certification for advanced networking on AWS.',
                examCode: 'ANS-C01',
                cost: '$300 USD',
                duration: '170 minutes',
                format: '65 questions (multiple choice, multiple response)',
                passingScore: '750/1000',
                skills: [
                    'Network design (30%)',
                    'Network implementation (26%)',
                    'Network management and operation (20%)',
                    'Network security (24%)'
                ],
                benefits: 'This specialty certification validates your ability to design and implement advanced networking solutions on AWS. Perfect for network engineers and architects.',
                examUrl: 'https://aws.amazon.com/certification/certified-advanced-networking-specialty/',
                learningUrl: 'https://aws.amazon.com/training/learn-about/advanced-networking-specialty/'
            },
            {
                id: 'mls',
                level: 'Specialty',
                levelIcon: '🟣',
                badge: 'images/mls.png',
                title: 'AWS Certified Machine Learning – Specialty',
                shortDesc: 'Refer to exam guides for recommended experience. Specialty certification for machine learning expertise on AWS.',
                examCode: 'MLS-C01',
                cost: '$300 USD',
                duration: '180 minutes',
                format: '65 questions (multiple choice, multiple response)',
                passingScore: '750/1000',
                skills: [
                    'Data engineering (20%)',
                    'Exploratory data analysis (24%)',
                    'Modeling (36%)',
                    'ML implementation and operations (20%)'
                ],
                benefits: 'This specialty certification validates your ability to build, train, tune, and deploy ML models using AWS services. Essential for ML specialists and data scientists.',
                examUrl: 'https://aws.amazon.com/certification/certified-machine-learning-specialty/',
                learningUrl: 'https://aws.amazon.com/training/learn-about/machine-learning-specialty/'
            }
        ];
        this.currentCertificationIndex = 0;
    }

    showCertificationsModal(certType) {
        this.loadCertificationsData();
        const certIndex = this.certifications.findIndex(cert => cert.id === certType);
        this.currentCertificationIndex = certIndex >= 0 ? certIndex : 0;
        this.displayCurrentCertification();
        this.showModal('certificationsModal');
    }

    displayCurrentCertification() {
        const cert = this.certifications[this.currentCertificationIndex];
        document.getElementById('certificationDetailLevel').innerHTML = `${cert.levelIcon} ${cert.level}`;
        document.getElementById('certificationDetailBadge').src = cert.badge;
        document.getElementById('certificationDetailBadge').alt = cert.title;
        document.getElementById('certificationDetailTitle').textContent = cert.title;
        document.getElementById('certificationDetailDescription').textContent = cert.shortDesc;
        document.getElementById('certificationExpandedContent').innerHTML = `
            <h4>Exam Details:</h4>
            <ul>
                <li><strong>Exam Code:</strong> ${cert.examCode}</li>
                <li><strong>Cost:</strong> ${cert.cost}</li>
                <li><strong>Duration:</strong> ${cert.duration}</li>
                <li><strong>Format:</strong> ${cert.format}</li>
                <li><strong>Passing Score:</strong> ${cert.passingScore}</li>
            </ul>
            <h4>Skills Measured:</h4>
            <ul>
                ${cert.skills.map(skill => `<li>${skill}</li>`).join('')}
            </ul>
            <h4>Career Benefits:</h4>
            <p>${cert.benefits}</p>
            <div class="certification-actions">
                <button class="cert-btn primary" onclick="window.open('${cert.examUrl}', '_blank')">Official Exam Page</button>
                <button class="cert-btn secondary" onclick="window.open('${cert.learningUrl}', '_blank')">Free Learning Path</button>
            </div>
        `;
        document.getElementById('certificationCounter').textContent = `${this.currentCertificationIndex + 1} of ${this.certifications.length}`;

        // Update navigation buttons
        document.getElementById('prevCertificationBtn').disabled = this.currentCertificationIndex === 0;
        document.getElementById('nextCertificationBtn').disabled = this.currentCertificationIndex === this.certifications.length - 1;
    }

    // Modal utilities
    showModal(modalId) {
        document.getElementById(modalId).classList.remove('hidden');
    }

    hideModal(modalId) {
        document.getElementById(modalId).classList.add('hidden');
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        new StudyDashboard();
    }, 100);
});

