const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files
app.use(express.static(__dirname));

// Real-time dashboard data
let dashboardData = {
    activeUsers: 0,
    totalStudySessions: 0,
    globalAccuracy: 85,
    categoryProgress: {
        'Compute': Math.floor(Math.random() * 100),
        'Storage': Math.floor(Math.random() * 100),
        'Database': Math.floor(Math.random() * 100),
        'Networking': Math.floor(Math.random() * 100),
        'Security': Math.floor(Math.random() * 100)
    },
    dailyActivity: Array(7).fill(0).map(() => Math.floor(Math.random() * 20)),
    accuracyHistory: [65, 72, 78, 85, 87, 89, 91],
    recentActivity: []
};

// Generate random user names
const names = ['Alex', 'Sarah', 'Mike', 'Emma', 'David', 'Lisa', 'John', 'Anna', 'Chris', 'Maya'];
const getRandomName = () => names[Math.floor(Math.random() * names.length)];

// Socket connection handling
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    dashboardData.activeUsers++;
    
    // Send initial data to new user
    const userName = getRandomName();
    socket.emit('initialData', {
        ...dashboardData,
        userName: userName,
        userId: socket.id.substring(0, 8)
    });
    
    // Broadcast active users count
    io.emit('activeUsersUpdate', dashboardData.activeUsers);

    // Handle study session
    socket.on('studySession', (data) => {
        dashboardData.totalStudySessions++;
        
        // Update category progress
        if (dashboardData.categoryProgress[data.category] !== undefined) {
            dashboardData.categoryProgress[data.category] += 1;
        }
        
        // Update daily activity
        const today = new Date().getDay();
        dashboardData.dailyActivity[today]++;
        
        // Update global accuracy
        if (data.isCorrect) {
            dashboardData.globalAccuracy = Math.min(100, dashboardData.globalAccuracy + 0.1);
        } else {
            dashboardData.globalAccuracy = Math.max(0, dashboardData.globalAccuracy - 0.05);
        }
        
        // Add to recent activity
        dashboardData.recentActivity.unshift({
            user: data.userName,
            category: data.category,
            timestamp: new Date().toLocaleTimeString(),
            isCorrect: data.isCorrect
        });
        
        // Keep only last 10 activities
        if (dashboardData.recentActivity.length > 10) {
            dashboardData.recentActivity.pop();
        }
        
        // Broadcast updates to all users
        io.emit('dataUpdate', dashboardData);
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        dashboardData.activeUsers = Math.max(0, dashboardData.activeUsers - 1);
        io.emit('activeUsersUpdate', dashboardData.activeUsers);
    });
});

// Simulate real-time activity
setInterval(() => {
    if (dashboardData.activeUsers > 0) {
        // Simulate random study activity
        const categories = Object.keys(dashboardData.categoryProgress);
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        const isCorrect = Math.random() > 0.3;
        
        // Update data
        dashboardData.totalStudySessions++;
        dashboardData.categoryProgress[randomCategory]++;
        
        const today = new Date().getDay();
        dashboardData.dailyActivity[today]++;
        
        if (isCorrect) {
            dashboardData.globalAccuracy = Math.min(100, dashboardData.globalAccuracy + 0.1);
        }
        
        // Add to recent activity
        dashboardData.recentActivity.unshift({
            user: getRandomName(),
            category: randomCategory,
            timestamp: new Date().toLocaleTimeString(),
            isCorrect: isCorrect
        });
        
        if (dashboardData.recentActivity.length > 10) {
            dashboardData.recentActivity.pop();
        }
        
        // Broadcast to all connected users
        io.emit('dataUpdate', dashboardData);
    }
}, 5000); // Every 5 seconds

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Open http://localhost:${PORT} to view the app`);
});
