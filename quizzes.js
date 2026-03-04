class QuizzesController {
  constructor() {
    this.currentQuestionIndex = 0;
    this.quizScore = 0;
    this.userAnswers = [];
    this.difficulty = 'beginner';
    this.questions = this.getQuestionsForDifficulty(this.difficulty);
    this.totalQuestions = this.questions.length;
    this.timer = null;
    this.timeLeft = 300; // 5 minutes default
    this.initEventListeners();
    this.updateQuizStats();
    this.showWelcomeScreen();
  }

  getQuestionsForDifficulty(difficulty) {
    const questionSets = {
      beginner: [
        {
          question: "Which AWS service is used for object storage?",
          options: ["EC2", "S3", "RDS", "VPC"],
          correctAnswer: 1,
          category: "Storage",
          explanation: "Amazon S3 (Simple Storage Service) is AWS's object storage service designed for durability, availability, and scalability."
        },
        {
          question: "What does EC2 stand for?",
          options: ["Elastic Cloud Compute", "Elastic Compute Cloud", "Enterprise Cloud", "Elastic Container Cloud"],
          correctAnswer: 1,
          category: "Compute",
          explanation: "EC2 stands for Elastic Compute Cloud, providing resizable compute capacity in the cloud."
        },
        {
          question: "Which AWS service is a relational database?",
          options: ["S3", "EC2", "RDS", "Lambda"],
          correctAnswer: 2,
          category: "Database",
          explanation: "Amazon RDS (Relational Database Service) makes it easy to set up, operate, and scale relational databases."
        }
      ],
      intermediate: [
        {
          question: "A streaming company stores films on Amazon S3. Each film is kept as a single video file between 1 GB and 10 GB in size. The company needs to deliver the film for streaming within 5 minutes from when a customer buys it. There‘s a greater demand for films less than 20 years old compared to those older than 20 years. The goal is to reduce hosting costs based on demand. What strategy should the company use?",
          options: ["Save all video content in Amazon S3. Use S3 Lifecycle rules to transition data to the Infrequent Access tier as movie demand falls.", "Store new film files in S3 Standard. Use S3 Standard-infrequent Access for older films. Retrieve older films using standard retrieval upon customer purchase.", "Save newer films in S3 Intelligent-Tiering. Store older films in S3 Glacier Flexible Retrieval. Use expedited retrieval for older films upon user purchase.", "Keep newer films in S3 Standard and older films in S3 Glacier Flexible Retrieval. Use bulk retrieval for older films upon purchase."],
          correctAnswer: 3,
          category: "Storage",
          explanation: "Answer C is correct because it balances both cost and performance. S3 Intelligent-Tiering automatically moves files between two access tiers, optimizing costs for newer films without affecting availability, which are likely to be frequently accessed. Older films stored in S3 Glacier Flexible Retrieval cost less to store, and using expedited retrieval allows accessing these files in minutes, meeting the 5-minute streaming requirement."
        },
        {
          question: "A tech firm has developed a non-operational software that encompasses several microservices tailored for each departmental unit within the organization. A unified development team oversees all these microservices. The existing setup includes a static web user interface and a backend developed in Java for application logic. Additionally, a MySQL database is hosted on an Amazon EC2 instance. The firm needs to guarantee the software‘s security and global accessibility. What is the best solution to meet these needs while minimizing operational complexities?",
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
        }
      ],
      advanced: [
        {
          question: "Which AWS service is used for object storage?",
          options: ["EC2", "S3", "RDS", "VPC"],
          correctAnswer: 1,
          category: "Storage",
          explanation: "Amazon S3 (Simple Storage Service) is AWS's object storage service designed for durability, availability, and scalability."
        },
        {
          question: "What does EC2 stand for?",
          options: ["Elastic Cloud Compute", "Elastic Compute Cloud", "Enterprise Cloud", "Elastic Container Cloud"],
          correctAnswer: 1,
          category: "Compute",
          explanation: "EC2 stands for Elastic Compute Cloud, providing resizable compute capacity in the cloud."
        },
        {
          question: "Which AWS service is a relational database?",
          options: ["S3", "EC2", "RDS", "Lambda"],
          correctAnswer: 2,
          category: "Database",
          explanation: "Amazon RDS (Relational Database Service) makes it easy to set up, operate, and scale relational databases."
        },
        {
          question: "What is the maximum size of an S3 object?",
          options: ["1 GB", "5 GB", "5 TB", "Unlimited"],
          correctAnswer: 2,
          category: "Storage",
          explanation: "Individual Amazon S3 objects can range in size from a minimum of 0 bytes to a maximum of 5 terabytes."
        },
        {
          question: "Which service provides serverless computing in AWS?",
          options: ["EC2", "Lambda", "S3", "RDS"],
          correctAnswer: 1,
          category: "Compute",
          explanation: "AWS Lambda lets you run code without provisioning or managing servers, making it a serverless compute service."
        }
      ]
    };
    return questionSets[difficulty] || questionSets.beginner;
  }

  updateQuizStats() {
    const stats = {
      beginner: { questions: 3, time: '~5 min' },
      intermediate: { questions: 4, time: '~7 min' },
      advanced: { questions: 5, time: '~10 min' }
    };
    const currentStats = stats[this.difficulty];
    // Update stats if elements exist
    const questionsEl = document.getElementById('questionsCount');
    const timeEl = document.getElementById('estimatedTime');
    if (questionsEl) questionsEl.textContent = currentStats.questions;
    if (timeEl) timeEl.textContent = currentStats.time;
  }

  initEventListeners() {
    // Difficulty selection buttons
    document.querySelectorAll('.select-difficulty-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const difficulty = e.target.getAttribute('data-difficulty');
        this.selectDifficulty(difficulty);
      });
    });

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
    if (shareBtn) shareBtn.addEventListener('click', () => this.shareResults());
  }

  showWelcomeScreen() {
    this.hideAllScreens();
    document.getElementById('welcomeScreen').classList.add('active');
  }

  selectDifficulty(difficulty) {
    this.difficulty = difficulty;
    // Redirect to the dedicated quiz page with difficulty parameter
    window.location.href = `quiz-page.html?difficulty=${difficulty}`;
  }

  getTimeForDifficulty(difficulty) {
    const times = {
      beginner: 300, // 5 minutes
      intermediate: 420, // 7 minutes
      advanced: 600 // 10 minutes
    };
    return times[difficulty] || 300;
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
    document.getElementById('questionCategory').textContent = q.category;
    document.getElementById('questionDifficulty').textContent = this.difficulty.charAt(0).toUpperCase() + this.difficulty.slice(1);

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
    this.selectedOption = idx;
    document.querySelectorAll('.option-btn-modern').forEach(b => b.classList.remove('selected'));
    document.querySelectorAll('.option-btn-modern')[idx].classList.add('selected');
    document.getElementById('submitAnswerBtn').disabled = false;
  }

  submitAnswer() {
    const q = this.questions[this.currentQuestionIndex];
    const correct = this.selectedOption === q.correctAnswer;
    if (correct) this.quizScore++;
    this.userAnswers.push({
      selected: this.selectedOption,
      correct: q.correctAnswer,
      isCorrect: correct,
      explanation: q.explanation
    });

    // Show feedback
    this.showAnswerFeedback(correct, q.correctAnswer);

    document.getElementById('nextQuestionBtn').classList.remove('hidden');
    document.getElementById('submitAnswerBtn').disabled = true;
  }

  showAnswerFeedback(isCorrect, correctIndex) {
    const options = document.querySelectorAll('.option-btn-modern');
    options.forEach((btn, idx) => {
      if (idx === correctIndex) {
        btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
        btn.style.color = 'white';
      } else if (idx === this.selectedOption && !isCorrect) {
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

    // Update celebration based on score
    this.updateCelebration(percentage);

    // Generate insights
    this.generateInsights(percentage);
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
    this.showWelcomeScreen();
  }

  viewDashboard() {
    window.location.href = 'index.html';
  }

  shareResults() {
    const score = this.quizScore;
    const total = this.totalQuestions;
    const percentage = Math.round((score / total) * 100);
    const text = `I just scored ${score}/${total} (${percentage}%) on the ${this.difficulty} AWS quiz! 🧠 #AWS #CloudComputing`;

    if (navigator.share) {
      navigator.share({
        title: 'AWS Quiz Results',
        text: text,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(text).then(() => {
        alert('Results copied to clipboard!');
      });
    }
  }

  hideAllScreens() {
    document.querySelectorAll('.screen').forEach(screen => {
      screen.classList.remove('active');
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.controller = new QuizzesController();
});
