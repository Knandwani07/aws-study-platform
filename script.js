// Animated Particles Background
function createParticles() {
    const particles = document.querySelector('.particles');
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            animation: float ${Math.random() * 20 + 15}s infinite linear;
            animation-delay: ${Math.random() * 20}s;
        `;
        particles.appendChild(particle);
    }
}

// View Management
function showView(viewName) {
    console.log('Showing view:', viewName);
    
    // Hide all views
    const views = ['homeView', 'studyView', 'categoriesView'];
    views.forEach(view => {
        const element = document.getElementById(view);
        if (element) {
            element.classList.add('hidden');
            console.log('Hiding view:', view);
        }
    });
    
    // Show target view
    const targetView = document.getElementById(viewName);
    if (targetView) {
        targetView.classList.remove('hidden');
        console.log('Showing view:', viewName);
    } else {
        console.error('View not found:', viewName);
    }
}

// Bookmark functionality
let bookmarkedCards = JSON.parse(localStorage.getItem('bookmarkedCards')) || [];

function saveBookmarks() {
    localStorage.setItem('bookmarkedCards', JSON.stringify(bookmarkedCards));
}

function isBookmarked(index) {
    return bookmarkedCards.includes(index);
}

function toggleBookmark(index) {
    if (isBookmarked(index)) {
        bookmarkedCards = bookmarkedCards.filter(i => i !== index);
    } else {
        bookmarkedCards.push(index);
    }
    saveBookmarks();
}

// AWS Services Flashcards Data
const flashcards = [
    // Analytics
    {
        service: "Amazon Athena",
        category: "analytics",
        question: "What is Amazon Athena and how does it work?",
        answer: "Serverless interactive query service to analyze data in S3 using standard SQL. Pay per query, no infrastructure to manage. Integrates with AWS Glue Data Catalog."
    },
    {
        service: "Amazon CloudSearch",
        category: "analytics",
        question: "What is Amazon CloudSearch used for?",
        answer: "Managed search service for websites and applications. Supports 34 languages, highlighting, faceting, and geospatial search. Automatically scales based on data and traffic."
    },
    {
        service: "Amazon DataZone",
        category: "analytics",
        question: "What is Amazon DataZone?",
        answer: "Data management service to catalog, discover, share, and govern data across organizations. Provides business-friendly interface for data discovery and collaboration."
    },
    {
        service: "Amazon EMR",
        category: "analytics",
        question: "What is Amazon EMR and its use cases?",
        answer: "Managed cluster platform for big data frameworks like Apache Spark, Hadoop, HBase. Used for data processing, machine learning, web indexing, and data transformations."
    },
    {
        service: "Amazon FinSpace",
        category: "analytics",
        question: "What is Amazon FinSpace designed for?",
        answer: "Data management and analytics service for financial services industry. Helps prepare and analyze financial data with built-in connectors and compliance features."
    },
    {
        service: "Amazon Kinesis",
        category: "analytics",
        question: "What are the Amazon Kinesis services?",
        answer: "Real-time data streaming platform: Data Streams (collect/process), Data Firehose (load data), Data Analytics (analyze streams), Video Streams (video processing)."
    },
    {
        service: "Amazon Data Firehose",
        category: "analytics",
        question: "What is Amazon Data Firehose?",
        answer: "Fully managed service to reliably load streaming data into data lakes, data stores, and analytics services. Automatically scales and transforms data before delivery."
    },
    {
        service: "Amazon Managed Service for Apache Flink",
        category: "analytics",
        question: "What is Amazon Managed Service for Apache Flink?",
        answer: "Fully managed service for Apache Flink applications. Process streaming data in real-time with automatic scaling, monitoring, and high availability."
    },
    {
        service: "Amazon Kinesis Data Streams",
        category: "analytics",
        question: "What is Amazon Kinesis Data Streams?",
        answer: "Scalable real-time data streaming service. Collect and process large streams of data records in real time. Supports multiple consumers and replay capability."
    },
    {
        service: "Amazon Kinesis Video Streams",
        category: "analytics",
        question: "What is Amazon Kinesis Video Streams used for?",
        answer: "Securely stream video from connected devices to AWS for analytics, ML, and processing. Supports live and on-demand video streaming with automatic scaling."
    },
    {
        service: "Amazon OpenSearch Service",
        category: "analytics",
        question: "What is Amazon OpenSearch Service?",
        answer: "Managed search and analytics engine. Deploy, operate, and scale OpenSearch clusters. Used for log analytics, real-time monitoring, and full-text search."
    },
    {
        service: "Amazon OpenSearch Serverless",
        category: "analytics",
        question: "What is Amazon OpenSearch Serverless?",
        answer: "Serverless option for OpenSearch. Automatically provisions and scales compute capacity. Pay only for resources consumed, no cluster management required."
    },
    {
        service: "Amazon Redshift",
        category: "analytics",
        question: "What is Amazon Redshift and its key features?",
        answer: "Data warehouse service for analytics. Columnar storage, massively parallel processing, automatic backups, encryption, VPC support, and integration with BI tools."
    },
    {
        service: "Amazon Redshift Serverless",
        category: "analytics",
        question: "What is Amazon Redshift Serverless?",
        answer: "Serverless option for Redshift. Automatically provisions and scales data warehouse capacity. Pay only for resources used, no cluster management needed."
    },
    {
        service: "Amazon QuickSight",
        category: "analytics",
        question: "What is Amazon QuickSight?",
        answer: "Business intelligence service for creating interactive dashboards and visualizations. Serverless, pay-per-session pricing, ML-powered insights, and mobile access."
    },
    {
        service: "AWS Clean Rooms",
        category: "analytics",
        question: "What is AWS Clean Rooms?",
        answer: "Privacy-enhanced analytics service. Collaborate and analyze collective datasets without sharing raw data. Built-in privacy protections and query controls."
    },
    {
        service: "AWS Data Exchange",
        category: "analytics",
        question: "What is AWS Data Exchange?",
        answer: "Service to find, subscribe to, and use third-party data in the cloud. Marketplace for data products with automatic delivery and billing integration."
    },
    {
        service: "AWS Data Pipeline",
        category: "analytics",
        question: "What is AWS Data Pipeline used for?",
        answer: "Web service for processing and moving data between AWS compute and storage services. Define data-driven workflows with fault tolerance and retry logic."
    },
    {
        service: "AWS Entity Resolution",
        category: "analytics",
        question: "What is AWS Entity Resolution?",
        answer: "Service to match and link related records across multiple datasets. Uses ML to identify duplicate or related entities without moving data outside your account."
    },
    {
        service: "AWS Glue",
        category: "analytics",
        question: "What is AWS Glue and its components?",
        answer: "Serverless data integration service. Components: Data Catalog (metadata repository), ETL jobs, Crawlers (discover data), and DataBrew (visual data preparation)."
    },
    {
        service: "AWS Lake Formation",
        category: "analytics",
        question: "What is AWS Lake Formation?",
        answer: "Service to build, secure, and manage data lakes. Simplifies data ingestion, cataloging, transformation, and access control. Integrates with analytics services."
    },
    {
        service: "Amazon MSK",
        category: "analytics",
        question: "What is Amazon Managed Streaming for Apache Kafka (MSK)?",
        answer: "Fully managed Apache Kafka service. Build and run applications that use Kafka for streaming data. Handles infrastructure, monitoring, and security."
    },
    
    // Application Integration
    {
        service: "SNS",
        category: "integration",
        question: "What is SNS and what are its delivery protocols?",
        answer: "Simple Notification Service - pub/sub messaging. Protocols: HTTP/HTTPS, Email, SMS, SQS, Lambda, mobile push notifications. Supports message filtering and delivery retry policies."
    },
    {
        service: "SQS",
        category: "integration",
        question: "What are the differences between SQS Standard and FIFO queues?",
        answer: "Standard: Nearly unlimited throughput, at-least-once delivery, best-effort ordering. FIFO: Up to 300 TPS, exactly-once processing, strict ordering, requires .fifo suffix."
    },
    {
        service: "API Gateway",
        category: "integration",
        question: "What is Amazon API Gateway and its key features?",
        answer: "Fully managed API service. Features: RESTful and WebSocket APIs, authentication, throttling, caching, monitoring, CORS support, and integration with Lambda and other AWS services."
    },
    
    // Blockchain
    {
        service: "Managed Blockchain",
        category: "blockchain",
        question: "What is Amazon Managed Blockchain?",
        answer: "Fully managed service for creating and managing blockchain networks using Hyperledger Fabric and Ethereum. Eliminates overhead of creating the network and automatically scales."
    },
    
    // Business Applications
    {
        service: "WorkMail",
        category: "business",
        question: "What is Amazon WorkMail?",
        answer: "Secure, managed business email and calendar service. Features: Integration with existing corporate directories, mobile device management, and compliance with various standards."
    },
    {
        service: "Chime",
        category: "business",
        question: "What is Amazon Chime used for?",
        answer: "Communications service for online meetings, video conferencing, calls, and chat. Features: Screen sharing, meeting recording, and integration with calendar applications."
    },
    
    // Cloud Financial Management
    {
        service: "Cost Explorer",
        category: "financial",
        question: "What is AWS Cost Explorer and its capabilities?",
        answer: "Cost management tool that provides: Cost and usage reports, forecasting, Reserved Instance recommendations, and custom cost allocation tags for detailed spending analysis."
    },
    {
        service: "Budgets",
        category: "financial",
        question: "What can you do with AWS Budgets?",
        answer: "Set custom cost and usage budgets, receive alerts when thresholds are exceeded, track Reserved Instance utilization, and create budget actions for automated responses."
    }];

class FlashcardApp {
    constructor() {
        this.cards = [...flashcards];
        this.currentIndex = 0;
        this.isFlipped = false;
        this.filteredCards = [...this.cards];
    }
    
    init() {
        this.initializeElements();
        this.bindEvents();
        this.displayCard();
        this.updateProgress();
    }
    
    initializeElements() {
        this.flashcard = document.getElementById('flashcard');
        this.serviceName = document.getElementById('serviceName');
        this.serviceNameBack = document.getElementById('serviceNameBack');
        this.question = document.getElementById('question');
        this.answer = document.getElementById('answer');
        this.cardCounter = document.getElementById('cardCounter');
        this.progressFill = document.getElementById('progressFill');
        this.serviceFilter = document.getElementById('serviceFilter');
        
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.flipBtn = document.getElementById('flipBtn');
        this.bookmarkBtn = document.getElementById('bookmarkBtn');
        this.shuffleBtn = document.getElementById('shuffleBtn');
        this.resetBtn = document.getElementById('resetBtn');
    }
        this.categoryItems = document.querySelectorAll('.category-item');
        this.sliderContainer = document.getElementById('sliderContainer');
        this.sliderLeft = document.getElementById('sliderLeft');
        this.sliderRight = document.getElementById('sliderRight');
        
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.flipBtn = document.getElementById('flipBtn');
        this.bookmarkBtn = document.getElementById('bookmarkBtn');
        this.shuffleBtn = document.getElementById('shuffleBtn');
        this.resetBtn = document.getElementById('resetBtn');
    }
    
    bindEvents() {
        if (this.flashcard) this.flashcard.addEventListener('click', () => this.flipCard());
        if (this.flipBtn) this.flipBtn.addEventListener('click', () => this.flipCard());
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.previousCard());
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextCard());
        if (this.bookmarkBtn) this.bookmarkBtn.addEventListener('click', () => this.toggleBookmark());
        if (this.shuffleBtn) this.shuffleBtn.addEventListener('click', () => this.shuffleCards());
        if (this.resetBtn) this.resetBtn.addEventListener('click', () => this.resetProgress());
        if (this.serviceFilter) this.serviceFilter.addEventListener('change', (e) => this.filterCards(e.target.value));
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (document.getElementById('studyView').classList.contains('hidden')) return;
            
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.previousCard();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.nextCard();
                    break;
                case ' ':
                case 'Enter':
                    e.preventDefault();
                    this.flipCard();
                    break;
            }
        });
    }
    
    flipCard() {
        if (!this.flashcard) return;
        this.isFlipped = !this.isFlipped;
        this.flashcard.classList.toggle('flipped');
    }
    
    displayCard() {
        if (this.filteredCards.length === 0) return;
        
        const card = this.filteredCards[this.currentIndex];
        const originalIndex = this.cards.indexOf(card);
        
        if (this.serviceName) this.serviceName.textContent = card.service;
        if (this.serviceNameBack) this.serviceNameBack.textContent = card.service;
        if (this.question) this.question.textContent = card.question;
        if (this.answer) this.answer.textContent = card.answer;
        
        // Update bookmark button
        if (this.bookmarkBtn) {
            if (isBookmarked(originalIndex)) {
                this.bookmarkBtn.classList.add('bookmarked');
            } else {
                this.bookmarkBtn.classList.remove('bookmarked');
            }
        }
        
        // Add category-specific styling
        if (this.flashcard) {
            this.flashcard.className = 'flashcard fade-in';
            this.flashcard.classList.add(`card-${card.category}`);
            
            // Reset flip state
            this.isFlipped = false;
            this.flashcard.classList.remove('flipped');
        }
    }
    
    nextCard() {
        if (this.filteredCards.length === 0) return;
        this.currentIndex = (this.currentIndex + 1) % this.filteredCards.length;
        this.displayCard();
        this.updateProgress();
    }
    
    previousCard() {
        if (this.filteredCards.length === 0) return;
        this.currentIndex = this.currentIndex === 0 ? this.filteredCards.length - 1 : this.currentIndex - 1;
        this.displayCard();
        this.updateProgress();
    }
    
    shuffleCards() {
        for (let i = this.filteredCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.filteredCards[i], this.filteredCards[j]] = [this.filteredCards[j], this.filteredCards[i]];
        }
        this.currentIndex = 0;
        this.displayCard();
        this.updateProgress();
        
        // Show feedback
        this.showNotification('Cards shuffled!');
    }
    
    filterCards(category) {
        if (category === 'all') {
            this.filteredCards = [...this.cards];
        } else if (category === 'bookmarked') {
            this.filteredCards = this.cards.filter((card, index) => isBookmarked(index));
        } else {
            this.filteredCards = this.cards.filter(card => card.category === category);
        }
        this.currentIndex = 0;
        this.displayCard();
        this.updateProgress();
        
        // Show feedback
        const categoryName = category === 'all' ? 'All Services' : 
                           category === 'bookmarked' ? 'Bookmarked' : 
                           category.charAt(0).toUpperCase() + category.slice(1);
        this.showNotification(`Filtered to: ${categoryName} (${this.filteredCards.length} cards)`);
    }

    toggleBookmark() {
        if (this.filteredCards.length === 0) return;
        
        const card = this.filteredCards[this.currentIndex];
        const originalIndex = this.cards.indexOf(card);
        
        toggleBookmark(originalIndex);
        this.displayCard();
        
        // Show feedback
        const isNowBookmarked = isBookmarked(originalIndex);
        this.showNotification(isNowBookmarked ? 'Card bookmarked!' : 'Bookmark removed!');
    }
    
    updateActiveCategory(category) {
        // This method is no longer needed as we removed the category slider
    }
    
    resetProgress() {
        this.currentIndex = 0;
        this.serviceFilter.value = 'all';
        this.filteredCards = [...this.cards];
        this.displayCard();
        this.updateProgress();
        
        // Show feedback
        this.showNotification('Progress reset! Back to card 1.');
    }
    
    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 1000;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    updateProgress() {
        if (this.filteredCards.length === 0) {
            if (this.cardCounter) this.cardCounter.textContent = '0 / 0';
            if (this.progressFill) this.progressFill.style.width = '0%';
            return;
        }
        
        if (this.cardCounter) this.cardCounter.textContent = `${this.currentIndex + 1} / ${this.filteredCards.length}`;
        if (this.progressFill) {
            const progress = ((this.currentIndex + 1) / this.filteredCards.length) * 100;
            this.progressFill.style.width = `${progress}%`;
        }
        
        // Update bookmark count on home page
        const bookmarkCountEl = document.getElementById('bookmarkCount');
        if (bookmarkCountEl) {
            bookmarkCountEl.textContent = bookmarkedCards.length;
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing app...');
    createParticles();
    
    // Check for category parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    
    // Create flashcard app instance
    window.flashcardApp = new FlashcardApp();
    
    // Simple view switching function
    function switchToStudy(category = 'all') {
        console.log('Switching to study view with category:', category);
        showView('studyView');
        setTimeout(() => {
            window.flashcardApp.init();
            if (category !== 'all') {
                window.flashcardApp.filterCards(category);
            }
        }, 50);
    }
    
    // Home to Categories navigation
    function goHome() {
        console.log('Going to home view');
        showView('homeView');
    }
    
    function goToCategories() {
        console.log('Going to categories page');
        window.location.href = 'categories.html';
    }
    
    // If category parameter exists, go directly to study mode
    if (categoryParam) {
        switchToStudy(categoryParam);
    }
    
    // View switching buttons - Home view
    const studyBtn = document.getElementById('studyModeBtn');
    console.log('Study button found:', studyBtn);
    if (studyBtn) {
        studyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Study button clicked');
            switchToStudy();
        });
    }
    
    const reviewBtn = document.getElementById('reviewModeBtn');
    console.log('Review button found:', reviewBtn);
    if (reviewBtn) {
        reviewBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Review button clicked');
            if (bookmarkedCards.length === 0) {
                alert('No bookmarked cards yet! Bookmark some cards first by clicking the star icon.');
                return;
            }
            switchToStudy('bookmarked');
        });
    }
    
    const categoriesBtn = document.getElementById('categoriesBtn');
    console.log('Categories button found:', categoriesBtn);
    if (categoriesBtn) {
        categoriesBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Categories button clicked');
            goToCategories();
        });
    }
    
    const startBtn = document.getElementById('startStudyBtn');
    console.log('Start study button found:', startBtn);
    if (startBtn) {
        startBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Start study button clicked');
            switchToStudy();
        });
    }
    
    const continueBtn = document.getElementById('continueBtn');
    console.log('Continue button found:', continueBtn);
    if (continueBtn) {
        continueBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Continue button clicked');
            switchToStudy();
        });
    }
    
    // Category cards (for the embedded categories view)
    console.log('Setting up category card listeners...');
    const categoryCards = document.querySelectorAll('.category-card');
    console.log('Found category cards:', categoryCards.length);
    
    document.querySelectorAll('.category-card').forEach(card => {
        const category = card.dataset.category;
        console.log('Adding listener to card:', category);
        
        card.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Category card clicked:', category);
            
            // Handle categories with dedicated pages
            if (category === 'analytics') {
                window.location.href = 'analytics.html';
                return;
            }
            if (category === 'compute') {
                window.location.href = 'compute.html';
                return;
            }
            if (category === 'developer') {
                window.location.href = 'developer-tools.html';
                return;
            }
            if (category === 'enduser') {
                window.location.href = 'end-user-computing.html';
                return;
            }
            if (category === 'frontend') {
                window.location.href = 'frontend-web-mobile.html';
                return;
            }
            
            console.log('Card element:', card);
            switchToStudy(category);
        });
    });
    
    // Add back to home functionality (ESC key)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            goHome();
        }
    });
    
    // Update bookmark count
    const updateBookmarkCount = () => {
        const bookmarkCountEl = document.getElementById('bookmarkCount');
        if (bookmarkCountEl) {
            bookmarkCountEl.textContent = bookmarkedCards.length;
        }
    };
    
    updateBookmarkCount();
    
    // Update bookmark count periodically
    setInterval(updateBookmarkCount, 1000);
    
    console.log('App initialization complete');
});
// Dynamic Dashboard Data Management
class DashboardData {
    constructor() {
        this.data = this.loadData();
        this.charts = {};
        this.initializeTracking();
    }

    loadData() {
        const defaultData = {
            name: this.generateRandomName(),
            totalCards: 124,
            studiedCards: 0,
            accuracy: 0,
            streak: 0,
            lastStudyDate: null,
            categoryProgress: {
                'Compute': 0,
                'Storage': 0,
                'Database': 0,
                'Networking': 0,
                'Security': 0
            },
            dailyActivity: [0, 0, 0, 0, 0, 0, 0],
            accuracyHistory: [0],
            correctAnswers: 0,
            totalAnswers: 0
        };

        const saved = localStorage.getItem('dashboardData');
        return saved ? { ...defaultData, ...JSON.parse(saved) } : defaultData;
    }

    saveData() {
        localStorage.setItem('dashboardData', JSON.stringify(this.data));
    }

    generateRandomName() {
        const names = ['Alex', 'Sarah', 'Mike', 'Emma', 'David', 'Lisa', 'John', 'Anna'];
        return names[Math.floor(Math.random() * names.length)];
    }

    updateStudyProgress(category, isCorrect) {
        this.data.studiedCards++;
        this.data.totalAnswers++;
        if (isCorrect) this.data.correctAnswers++;
        
        // Update category progress
        if (this.data.categoryProgress[category] !== undefined) {
            this.data.categoryProgress[category]++;
        }

        // Update accuracy
        this.data.accuracy = Math.round((this.data.correctAnswers / this.data.totalAnswers) * 100);

        // Update daily activity
        const today = new Date().getDay();
        this.data.dailyActivity[today]++;

        // Update streak
        this.updateStreak();

        // Update accuracy history
        if (this.data.totalAnswers % 5 === 0) {
            this.data.accuracyHistory.push(this.data.accuracy);
            if (this.data.accuracyHistory.length > 10) {
                this.data.accuracyHistory.shift();
            }
        }

        this.saveData();
        this.updateDashboard();
        this.updateCharts();
    }

    updateStreak() {
        const today = new Date().toDateString();
        const lastStudy = this.data.lastStudyDate;
        
        if (!lastStudy) {
            this.data.streak = 1;
        } else {
            const lastDate = new Date(lastStudy);
            const todayDate = new Date();
            const diffTime = todayDate - lastDate;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) {
                this.data.streak++;
            } else if (diffDays > 1) {
                this.data.streak = 1;
            }
        }
        
        this.data.lastStudyDate = today;
    }

    updateDashboard() {
        const elements = {
            userName: document.getElementById('userName'),
            studiedCards: document.getElementById('studiedCards'),
            totalCards: document.getElementById('totalCards'),
            totalCardsDisplay: document.getElementById('totalCardsDisplay'),
            studiedCardsDisplay: document.getElementById('studiedCardsDisplay'),
            accuracyDisplay: document.getElementById('accuracyDisplay'),
            streakDisplay: document.getElementById('streakDisplay')
        };

        if (elements.userName) elements.userName.textContent = this.data.name;
        if (elements.studiedCards) elements.studiedCards.textContent = this.data.studiedCards;
        if (elements.totalCards) elements.totalCards.textContent = this.data.totalCards;
        if (elements.totalCardsDisplay) elements.totalCardsDisplay.textContent = this.data.totalCards;
        if (elements.studiedCardsDisplay) elements.studiedCardsDisplay.textContent = this.data.studiedCards;
        if (elements.accuracyDisplay) elements.accuracyDisplay.textContent = this.data.accuracy + '%';
        if (elements.streakDisplay) elements.streakDisplay.textContent = this.data.streak + ' days';
    }

    updateCharts() {
        // Update category chart
        if (this.charts.category) {
            const categoryData = Object.values(this.data.categoryProgress);
            this.charts.category.data.datasets[0].data = categoryData;
            this.charts.category.update('none');
        }

        // Update streak chart
        if (this.charts.streak) {
            this.charts.streak.data.datasets[0].data = this.data.dailyActivity;
            this.charts.streak.update('none');
        }

        // Update accuracy chart
        if (this.charts.accuracy) {
            const labels = this.data.accuracyHistory.map((_, i) => `Session ${i + 1}`);
            this.charts.accuracy.data.labels = labels;
            this.charts.accuracy.data.datasets[0].data = this.data.accuracyHistory;
            this.charts.accuracy.update('none');
        }
    }

    initializeTracking() {
        // Track flashcard interactions
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('flashcard') || e.target.closest('.flashcard')) {
                this.simulateStudyActivity();
            }
        });

        // Track study button clicks
        document.addEventListener('click', (e) => {
            if (e.target.id === 'startStudyBtn' || e.target.id === 'continueBtn') {
                this.simulateStudyActivity();
            }
        });
    }

    simulateStudyActivity() {
        const categories = Object.keys(this.data.categoryProgress);
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        const isCorrect = Math.random() > 0.3; // 70% accuracy simulation
        
        this.updateStudyProgress(randomCategory, isCorrect);
    }

    resetData() {
        localStorage.removeItem('dashboardData');
        this.data = this.loadData();
        this.updateDashboard();
        this.updateCharts();
    }
}

// Initialize dashboard data manager
let dashboardManager;

// Dashboard Charts Initialization
function initializeDashboard() {
    dashboardManager = new DashboardData();
    
    // Chart.js configuration
    Chart.defaults.color = '#e5e7eb';
    Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';

    // Progress by Category Chart
    const categoryCtx = document.getElementById('categoryChart');
    if (categoryCtx) {
        dashboardManager.charts.category = new Chart(categoryCtx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(dashboardManager.data.categoryProgress),
                datasets: [{
                    data: Object.values(dashboardManager.data.categoryProgress),
                    backgroundColor: ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
                    borderWidth: 0,
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { padding: 15, usePointStyle: true, font: { size: 12 } }
                    }
                }
            }
        });
    }

    // Daily Study Streak Chart
    const streakCtx = document.getElementById('streakChart');
    if (streakCtx) {
        dashboardManager.charts.streak = new Chart(streakCtx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Cards Studied',
                    data: dashboardManager.data.dailyActivity,
                    backgroundColor: 'rgba(139, 92, 246, 0.8)',
                    borderColor: '#8b5cf6',
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { font: { size: 11 } } },
                    x: { grid: { display: false }, ticks: { font: { size: 11 } } }
                }
            }
        });
    }

    // Accuracy Over Time Chart
    const accuracyCtx = document.getElementById('accuracyChart');
    if (accuracyCtx) {
        const labels = dashboardManager.data.accuracyHistory.map((_, i) => `Session ${i + 1}`);
        dashboardManager.charts.accuracy = new Chart(accuracyCtx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Accuracy %',
                    data: dashboardManager.data.accuracyHistory,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#10b981',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, max: 100, grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { font: { size: 11 } } },
                    x: { grid: { display: false }, ticks: { font: { size: 11 } } }
                }
            }
        });
    }

    // Initial dashboard update
    dashboardManager.updateDashboard();

    // Add event listeners for dashboard controls
    const simulateBtn = document.getElementById('simulateStudyBtn');
    const resetBtn = document.getElementById('resetDashboardBtn');

    if (simulateBtn) {
        simulateBtn.addEventListener('click', () => {
            // Simulate multiple study sessions
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    dashboardManager.simulateStudyActivity();
                }, i * 200);
            }
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to reset all progress?')) {
                dashboardManager.resetData();
            }
        });
    }

    // Auto-update simulation every 30 seconds
    setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance every 30 seconds
            dashboardManager.simulateStudyActivity();
        }
    }, 30000);
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add a small delay to ensure Chart.js is fully loaded
    setTimeout(initializeDashboard, 100);
});
