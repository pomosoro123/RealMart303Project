# RealMart Application - Detailed Development Report
## Complete Step-by-Step Development Guide

**Project Name:** RealMart (Market Management Platform)  
**Course:** ICT 303  
**Date:** February 2026  
**Version:** 1.0  
**Status:** Complete and Functional

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Initial Setup](#initial-setup)
4. [Project Structure](#project-structure)
5. [Phase 1: Frontend Setup](#phase-1-frontend-setup)
6. [Phase 2: Firebase Integration](#phase-2-firebase-integration)
7. [Phase 3: Core Features Implementation](#phase-3-core-features-implementation)
8. [Phase 4: Admin Panel Development](#phase-4-admin-panel-development)
9. [Phase 5: Responsive Design](#phase-5-responsive-design)
10. [Phase 6: Advanced Features](#phase-6-advanced-features)
11. [Phase 7: Testing & Debugging](#phase-7-testing--debugging)
12. [Deployment Guide](#deployment-guide)
13. [Troubleshooting](#troubleshooting)

---

## Project Overview

RealMart is a web-based market management platform that allows:
- Customers to browse and view market information
- Administrators to manage marketplace listings, schedules, and users
- Bulk upload of markets via Excel files
- Real-time data synchronization with Firebase

**Key Technologies:**
- Frontend: HTML5, CSS3, JavaScript ES6+
- Backend: Firebase (Firestore, Authentication)
- Libraries: SheetJS (Excel parsing), Font Awesome (Icons)
- Version Control: Git/GitHub

---

## Prerequisites

### Required Software
1. **Git** - For version control
   - Download: https://git-scm.com/download/win
   - Verify: `git --version`

2. **Node.js** (Optional, for running HTTP server)
   - Download: https://nodejs.org/
   - Verify: `node --version`

3. **Code Editor** - VS Code recommended
   - Download: https://code.visualstudio.com/

4. **Browser** - Chrome, Firefox, Safari, or Edge (latest version)

5. **GitHub Account** - For hosting repository
   - Create at: https://github.com/signup

### Required Accounts
1. **Firebase Project**
   - Go to: https://console.firebase.google.com/
   - Create new project
   - Set up Firestore Database and Authentication

2. **GitHub Repository**
   - Create new repository for project backup

---

## Initial Setup

### Step 1: Create Project Directory

```bash
# Create main project folder
mkdir c:\Projects\303Project
cd c:\Projects\303Project

# Create frontend folder
mkdir market-website\frontend
cd market-website\frontend
```

### Step 2: Initialize Git Repository

```bash
# Navigate to project root
cd c:\Projects\303Project

# Initialize git
git init

# Configure git with your credentials
git config user.name "pomosoro123"
git config user.email "pomosoro@gmail.com"

# Create .gitignore file
# Add these lines:
# node_modules/
# .DS_Store
# *.log
```

### Step 3: Create Firebase Configuration

Get your Firebase credentials from Firebase Console:
1. Go to Project Settings
2. Copy config object
3. Create file: `firebase/config.js`

```javascript
// firebase/config.js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

---

## Project Structure

```
303Project/
├── market-website/
│   ├── frontend/
│   │   ├── index.html                 (Homepage)
│   │   ├── markets.html               (Market listings)
│   │   ├── market-details.html        (Single market detail)
│   │   ├── admin-login.html           (Admin login)
│   │   ├── admin-dashboard.html       (Admin panel)
│   │   ├── css/
│   │   │   ├── styles.css             (Base styles)
│   │   │   ├── components.css         (Component styles)
│   │   │   ├── responsive.css         (Media queries)
│   │   │   ├── utils.css              (Utilities)
│   │   │   └── admin-styles.css       (Admin styles)
│   │   └── js/
│   │       ├── firebase.js            (Firebase setup)
│   │       ├── ui.js                  (UI utilities)
│   │       ├── markets.js             (Market API)
│   │       ├── schedule.js            (Schedule API)
│   │       ├── admin.js               (Admin core)
│   │       ├── main.js                (Homepage script)
│   │       ├── main-markets.js        (Markets page script)
│   │       ├── main-details.js        (Details page script)
│   │       ├── admin-login.js         (Login script)
│   │       ├── admin-dashboard.js     (Dashboard script)
│   │       ├── admin-markets.js       (Markets management)
│   │       ├── admin-schedules.js     (Schedules management)
│   │       ├── admin-users.js         (Users management)
│   │       └── admin-bulk-upload.js   (Bulk upload)
│   └── firebase/
│       └── config.js                  (Firebase config)
├── REALMART_PROJECT_DOCUMENTATION.md
├── DEVELOPMENT_REPORT.md              (This file)
└── .gitignore
```

---

## Phase 1: Frontend Setup

### Step 1: Create Base HTML Files

#### 1.1 Create index.html (Homepage)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RealMart - Market Days & Opening Schedule</title>
    
    <!-- Stylesheets -->
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/components.css">
    <link rel="stylesheet" href="css/responsive.css">
    <link rel="stylesheet" href="css/utils.css">
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- Header Navigation -->
    <header class="header">
        <nav class="navbar">
            <div class="navbar-brand">
                <a href="index.html" class="logo">
                    <span class="logo-icon">🏪</span>
                    <span class="logo-text">RealMart</span>
                </a>
            </div>
            <ul class="navbar-menu" id="navbarMenu">
                <li><a href="index.html" class="nav-link">Home</a></li>
                <li><a href="markets.html" class="nav-link">Markets</a></li>
                <li><a href="admin-login.html" class="nav-link">Admin</a></li>
            </ul>
            <button class="navbar-toggle" id="navbarToggle">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </nav>
    </header>

    <!-- Main Content -->
    <main>
        <!-- Hero Section -->
        <section class="hero">
            <h1>Welcome to RealMart</h1>
            <p>Your marketplace hub</p>
        </section>

        <!-- Markets Grid -->
        <section class="section">
            <div class="container">
                <h2>Featured Markets</h2>
                <div class="markets-grid" id="featuredMarkets"></div>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>RealMart</h3>
                    <p>Your trusted marketplace hub</p>
                </div>
                <div class="footer-section">
                    <h4>Contact</h4>
                    <p>Email: info@realmart.com</p>
                </div>
                <div class="footer-section">
                    <h4>Follow Us</h4>
                    <div class="social-links">
                        <a href="#" class="social-link" title="Facebook"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="social-link" title="Twitter"><i class="fab fa-twitter"></i></a>
                        <a href="#" class="social-link" title="Instagram"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 RealMart. All rights reserved. | ICT303 Group 7 Project</p>
            </div>
        </div>
    </footer>

    <!-- Scripts -->
    <script src="https://www.gstatic.com/firebasejs/10.5.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.5.0/firebase-auth-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore-compat.js"></script>
    <script src="js/firebase.js"></script>
    <script src="js/ui.js"></script>
    <script src="js/markets.js"></script>
    <script src="js/main.js"></script>
</body>
</html>
```

**Repeat for:** markets.html, market-details.html, admin-login.html, admin-dashboard.html

#### 1.2 Create CSS Files

Create `css/styles.css` with:
- CSS Variables (colors, spacing, typography)
- Reset styles
- Typography rules
- Form styling
- Container styles
- Utility classes

Example structure:
```css
:root {
    --primary-color: #2ecc71;
    --secondary-color: #3498db;
    --dark-color: #2c3e50;
    --light-color: #ecf0f1;
    /* ... more variables */
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Poppins', sans-serif;
    color: var(--gray-700);
    background-color: var(--white);
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    color: var(--dark-color);
}

/* Forms */
input, textarea, select {
    border: 1px solid var(--gray-300);
    border-radius: 8px;
    padding: 8px 16px;
}

/* Container */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 8px;
}

/* Utilities */
.hidden { display: none !important; }
.text-center { text-align: center; }
.mt-2 { margin-top: 16px; }
/* ... more utilities */
```

Create `css/components.css` with:
- Header/Navbar styles
- Button styles
- Card styles
- Modal styles
- Form components
- Footer styles

Create `css/responsive.css` with media queries for:
- Mobile (320-480px)
- Tablet (481-768px)
- Desktop (769-1200px)
- Large (1200px+)

Create `css/utils.css` with:
- Loading spinner animations
- Scrollbar styling
- Print styles
- Accessibility features

### Step 2: Create Base JavaScript Files

#### 2.1 Create firebase.js

```javascript
// REALMART - Firebase Configuration & Setup
const firebaseConfig = {
    apiKey: "AIzaSyBUhBRsicJXWSQPlIBW2_ywx8TaJSroR4g",
    authDomain: "dailycontribution-4bca6.firebaseapp.com",
    projectId: "dailycontribution-4bca6",
    storageBucket: "dailycontribution-4bca6.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123def456"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get references to services
const auth = firebase.auth();
const db = firebase.firestore();

console.log('Firebase initialized successfully');

// Setup auth listener
firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
        console.log('User logged in:', user.email);
        // Load user data if needed
    } else {
        console.log('No user logged in');
    }
});

// Utility function: Add document to Firestore
async function addDocument(collection, data) {
    try {
        const docRef = await db.collection(collection).add({
            ...data,
            createdAt: firebase.firestore.Timestamp.now(),
            updatedAt: firebase.firestore.Timestamp.now()
        });
        return docRef;
    } catch (error) {
        console.error('Error adding document:', error);
        throw error;
    }
}

// Utility function: Update document
async function updateDocument(collection, docId, data) {
    try {
        await db.collection(collection).doc(docId).update({
            ...data,
            updatedAt: firebase.firestore.Timestamp.now()
        });
    } catch (error) {
        console.error('Error updating document:', error);
        throw error;
    }
}

// Utility function: Delete document
async function deleteDocument(collection, docId) {
    try {
        await db.collection(collection).doc(docId).delete();
    } catch (error) {
        console.error('Error deleting document:', error);
        throw error;
    }
}

// Utility function: Get single document
async function getDocument(collection, docId) {
    try {
        const doc = await db.collection(collection).doc(docId).get();
        if (doc.exists) {
            return { id: doc.id, ...doc.data() };
        }
        return null;
    } catch (error) {
        console.error('Error getting document:', error);
        throw error;
    }
}

// Utility function: Get all documents in collection
async function getAllDocuments(collection) {
    try {
        const snapshot = await db.collection(collection).get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error getting documents:', error);
        throw error;
    }
}
```

#### 2.2 Create ui.js

```javascript
// REALMART - UI Utilities Module

/**
 * Show element by removing hidden class
 */
function showElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.remove('hidden');
    }
}

/**
 * Hide element by adding hidden class
 */
function hideElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.add('hidden');
    }
}

/**
 * Toggle element visibility
 */
function toggleElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.toggle('hidden');
    }
}

/**
 * Show status message
 */
function showStatus(message, type = 'info') {
    const statusDiv = document.getElementById('statusMessage');
    if (!statusDiv) return;
    
    statusDiv.textContent = message;
    statusDiv.className = `status ${type}`;
    statusDiv.classList.remove('hidden');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        statusDiv.classList.add('hidden');
    }, 5000);
}

/**
 * Show modal dialog
 */
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
    }
}

/**
 * Hide modal dialog
 */
function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
    }
}

/**
 * Create loading spinner
 */
function createLoadingSpinner() {
    return '<div class="loading-spinner"></div>';
}

console.log('UI Utilities module loaded');
```

#### 2.3 Create markets.js

```javascript
// REALMART - Markets API Module

/**
 * Create new market
 */
async function createMarket(marketData) {
    try {
        const docRef = await addDocument('markets', {
            name: marketData.name,
            city: marketData.city,
            state: marketData.state,
            address: marketData.address || '',
            phone: marketData.phone || '',
            email: marketData.email || '',
            website: marketData.website || '',
            description: marketData.description || '',
            imageUrl: marketData.imageUrl || '',
            latitude: parseFloat(marketData.latitude) || 0,
            longitude: parseFloat(marketData.longitude) || 0
        });
        return docRef;
    } catch (error) {
        console.error('Error creating market:', error);
        throw error;
    }
}

/**
 * Get all markets
 */
async function getAllMarkets() {
    try {
        const markets = await getAllDocuments('markets');
        return markets.sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
        console.error('Error getting markets:', error);
        throw error;
    }
}

/**
 * Get single market by ID
 */
async function getMarket(marketId) {
    try {
        return await getDocument('markets', marketId);
    } catch (error) {
        console.error('Error getting market:', error);
        throw error;
    }
}

/**
 * Update market
 */
async function updateMarket(marketId, marketData) {
    try {
        await updateDocument('markets', marketId, marketData);
    } catch (error) {
        console.error('Error updating market:', error);
        throw error;
    }
}

/**
 * Delete market
 */
async function deleteMarket(marketId) {
    try {
        await deleteDocument('markets', marketId);
    } catch (error) {
        console.error('Error deleting market:', error);
        throw error;
    }
}

console.log('Markets API module loaded');
```

#### 2.4 Create schedule.js

```javascript
// REALMART - Schedule API Module

/**
 * Create schedule for market
 */
async function createSchedule(marketId, scheduleData) {
    try {
        // Check if schedule exists first
        const existing = await getScheduleForMarket(marketId);
        if (existing) {
            throw new Error('Schedule already exists for this market');
        }
        
        const docRef = await addDocument('schedules', {
            marketId: marketId,
            monday: scheduleData.monday || 'Closed',
            tuesday: scheduleData.tuesday || 'Closed',
            wednesday: scheduleData.wednesday || 'Closed',
            thursday: scheduleData.thursday || 'Closed',
            friday: scheduleData.friday || 'Closed',
            saturday: scheduleData.saturday || 'Closed',
            sunday: scheduleData.sunday || 'Closed',
            holidays: scheduleData.holidays || [],
            specialNotes: scheduleData.specialNotes || ''
        });
        return docRef;
    } catch (error) {
        console.error('Error creating schedule:', error);
        throw error;
    }
}

/**
 * Get schedule for market
 */
async function getScheduleForMarket(marketId) {
    try {
        const snapshot = await db.collection('schedules')
            .where('marketId', '==', marketId)
            .get();
        
        if (snapshot.empty) return null;
        const doc = snapshot.docs[0];
        return { id: doc.id, ...doc.data() };
    } catch (error) {
        console.error('Error getting schedule:', error);
        return null;
    }
}

/**
 * Update schedule
 */
async function updateSchedule(scheduleId, scheduleData) {
    try {
        await updateDocument('schedules', scheduleId, scheduleData);
    } catch (error) {
        console.error('Error updating schedule:', error);
        throw error;
    }
}

/**
 * Delete schedule
 */
async function deleteSchedule(scheduleId) {
    try {
        await deleteDocument('schedules', scheduleId);
    } catch (error) {
        console.error('Error deleting schedule:', error);
        throw error;
    }
}

console.log('Schedule API module loaded');
```

---

## Phase 2: Firebase Integration

### Step 1: Set Up Firebase Project

1. Go to https://console.firebase.google.com/
2. Create new project named "RealMart"
3. Enable Google Analytics (optional)
4. Create web app
5. Copy config and paste into firebase.js

### Step 2: Create Firestore Database

1. Go to Firestore Database section
2. Click "Create Database"
3. Choose "Start in test mode"
4. Select location (choose closest to you)
5. Click "Create"

### Step 3: Create Collections

**Markets Collection:**
```
/markets (Collection)
├── marketId1 (Document)
│   ├── name: "Mile 12 Market"
│   ├── city: "Lagos"
│   ├── state: "Lagos"
│   ├── address: "Mile 12, Kosofe"
│   ├── phone: "+234-800-xxx-xxxx"
│   ├── email: "mile12@market.com"
│   ├── website: "www.mile12market.com"
│   ├── description: "Major market hub"
│   ├── imageUrl: "base64_image_data"
│   ├── latitude: 6.5789
│   ├── longitude: 3.3456
│   ├── createdAt: Timestamp
│   └── updatedAt: Timestamp
```

**Schedules Collection:**
```
/schedules (Collection)
├── scheduleId1 (Document)
│   ├── marketId: "marketId1"
│   ├── monday: "7:00AM - 7:00PM"
│   ├── tuesday: "7:00AM - 7:00PM"
│   ├── wednesday: "Closed"
│   ├── thursday: "7:00AM - 7:00PM"
│   ├── friday: "7:00AM - 7:00PM"
│   ├── saturday: "7:00AM - 7:00PM"
│   ├── sunday: "Closed"
│   ├── holidays: []
│   ├── specialNotes: ""
│   ├── createdAt: Timestamp
│   └── updatedAt: Timestamp
```

**Users Collection:**
```
/users (Collection)
├── userId1 (Document - same as auth UID)
│   ├── email: "user@example.com"
│   ├── role: "admin" | "user"
│   ├── createdAt: Timestamp
│   ├── displayName: "User Name"
│   └── photoURL: "profile_image_url"
```

### Step 4: Set Up Authentication

1. Go to Authentication section
2. Click "Get Started"
3. Enable Email/Password provider
4. Keep in test mode for development

### Step 5: Create Test Users

1. Go to Users tab
2. Create user with admin role:
   - Email: admin@realmart.com
   - Password: Admin123!

---

## Phase 3: Core Features Implementation

### Step 1: Implement Market Display (Homepage & Market Listings)

Create `js/main.js`:
```javascript
// REALMART - Home Page Main Script

async function loadFeaturedMarkets() {
    try {
        const loadingSpinner = document.getElementById('loadingFeatured');
        if (loadingSpinner) loadingSpinner.classList.remove('hidden');
        
        const markets = await getAllMarkets();
        const container = document.getElementById('featuredMarkets');
        
        if (!container) return;
        
        // Show first 6 markets
        const featured = markets.slice(0, 6);
        
        if (featured.length === 0) {
            container.innerHTML = '<p>No markets available yet.</p>';
            return;
        }
        
        container.innerHTML = featured.map(market => `
            <div class="card">
                ${market.imageUrl ? `<img src="${market.imageUrl}" alt="${market.name}" class="card-image">` : ''}
                <h3>${market.name}</h3>
                <p class="text-muted">${market.city}, ${market.state}</p>
                <p>${market.description || 'No description available'}</p>
                <div class="card-footer">
                    <span class="text-small">${market.phone || 'No phone'}</span>
                    <a href="market-details.html?id=${market.id}" class="btn-secondary btn-small">View Details</a>
                </div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error loading markets:', error);
        showStatus('Failed to load markets', 'error');
    } finally {
        const loadingSpinner = document.getElementById('loadingFeatured');
        if (loadingSpinner) loadingSpinner.classList.add('hidden');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedMarkets();
});

console.log('Home page main script loaded');
```

Create `js/main-markets.js` for markets listing page with similar structure.

### Step 2: Implement Market Details Page

Create `js/main-details.js`:
```javascript
// REALMART - Market Details Page Main Script

async function loadMarketDetails() {
    try {
        // Get market ID from URL query parameter
        const urlParams = new URLSearchParams(window.location.search);
        const marketId = urlParams.get('id');
        
        if (!marketId) {
            showStatus('Market not found', 'error');
            return;
        }
        
        // Load market data
        const market = await getMarket(marketId);
        if (!market) {
            showStatus('Market not found', 'error');
            return;
        }
        
        // Load schedule
        const schedule = await getScheduleForMarket(marketId);
        
        // Update page title
        document.title = `${market.name} - RealMart`;
        
        // Display market details
        displayMarketInfo(market, schedule);
        
    } catch (error) {
        console.error('Error loading market details:', error);
        showStatus('Failed to load market details', 'error');
    }
}

function displayMarketInfo(market, schedule) {
    const container = document.getElementById('marketContent');
    if (!container) return;
    
    let scheduleHtml = '';
    if (schedule) {
        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        scheduleHtml = '<h3>Operating Hours</h3><table class="schedule-table">';
        days.forEach(day => {
            const hours = schedule[day] || 'Closed';
            scheduleHtml += `<tr><td>${day.charAt(0).toUpperCase() + day.slice(1)}</td><td>${hours}</td></tr>`;
        });
        scheduleHtml += '</table>';
    }
    
    container.innerHTML = `
        <div class="market-content">
            <div class="market-main">
                ${market.imageUrl ? `<img src="${market.imageUrl}" alt="${market.name}" class="market-image">` : ''}
                <h1>${market.name}</h1>
                <p class="text-muted">${market.city}, ${market.state}</p>
                
                <div class="market-info">
                    <p><strong>Address:</strong> ${market.address}</p>
                    <p><strong>Phone:</strong> <a href="tel:${market.phone}">${market.phone}</a></p>
                    <p><strong>Email:</strong> <a href="mailto:${market.email}">${market.email}</a></p>
                    ${market.website ? `<p><strong>Website:</strong> <a href="${market.website}" target="_blank">${market.website}</a></p>` : ''}
                </div>
                
                <h3>Description</h3>
                <p>${market.description}</p>
                
                ${scheduleHtml}
            </div>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', loadMarketDetails);
```

---

## Phase 4: Admin Panel Development

### Step 1: Create Admin Authentication

Create `js/admin-login.js`:
```javascript
// REALMART - Admin Login Module

async function handleAdminLogin(email, password) {
    try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        // Check if user is admin
        const userDoc = await getDocument('users', user.uid);
        
        if (!userDoc || userDoc.role !== 'admin') {
            await firebase.auth().signOut();
            throw new Error('Unauthorized: Admin access required');
        }
        
        // Redirect to admin dashboard
        window.location.href = 'admin-dashboard.html';
        
    } catch (error) {
        console.error('Login error:', error);
        showStatus('Login failed: ' + error.message, 'error');
    }
}

// Attach to form
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('adminLoginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('adminEmail').value;
            const password = document.getElementById('adminPassword').value;
            handleAdminLogin(email, password);
        });
    }
});
```

### Step 2: Create Admin Dashboard

Create `js/admin.js`:
```javascript
// REALMART - Admin Core Module

let currentUserData = null;

/**
 * Check if current user is admin
 */
function isUserAdmin() {
    return currentUserData && currentUserData.role === 'admin';
}

/**
 * Initialize admin panel
 */
async function initializeAdminPanel() {
    try {
        // Check user authentication
        const user = firebase.auth().currentUser;
        if (!user) {
            window.location.href = 'admin-login.html';
            return;
        }
        
        // Load user data
        currentUserData = await getDocument('users', user.uid);
        
        // Verify admin role
        if (!isUserAdmin()) {
            console.error('User is not admin');
            window.location.href = 'admin-login.html';
            return;
        }
        
        // Update welcome message
        const welcomeElement = document.getElementById('adminWelcome');
        if (welcomeElement) {
            welcomeElement.textContent = `Welcome, ${user.email}`;
        }
        
        console.log('Admin panel initialized');
        
    } catch (error) {
        console.error('Error initializing admin panel:', error);
        window.location.href = 'admin-login.html';
    }
}

/**
 * Logout function
 */
async function logoutAdmin() {
    try {
        await firebase.auth().signOut();
        window.location.href = 'admin-login.html';
    } catch (error) {
        console.error('Logout error:', error);
        showStatus('Logout failed', 'error');
    }
}

// Initialize on page load
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        initializeAdminPanel();
    }
});
```

### Step 3: Create Markets Management

Create `js/admin-markets.js`:
```javascript
// REALMART - Admin Markets Module

// Load all markets into table
async function loadMarketsTable() {
    try {
        const markets = await getAllMarkets();
        const tablebody = document.getElementById('marketsTableBody');
        
        if (!tablebody) return;
        
        if (markets.length === 0) {
            tablebody.innerHTML = '<tr><td colspan="5">No markets yet</td></tr>';
            return;
        }
        
        tablebody.innerHTML = markets.map(market => `
            <tr>
                <td data-label="Name">${market.name}</td>
                <td data-label="City">${market.city}</td>
                <td data-label="State">${market.state}</td>
                <td data-label="Phone">${market.phone || 'N/A'}</td>
                <td data-label="Actions">
                    <button class="btn-small btn-secondary" onclick="editMarket('${market.id}')">Edit</button>
                    <button class="btn-small btn-danger" onclick="deleteMarketConfirm('${market.id}', '${market.name}')">Delete</button>
                </td>
            </tr>
        `).join('');
        
    } catch (error) {
        console.error('Error loading markets:', error);
        showStatus('Failed to load markets', 'error');
    }
}

// Create market
async function submitMarketForm(formData) {
    try {
        await createMarket({
            name: formData.get('marketName'),
            city: formData.get('marketCity'),
            state: formData.get('marketState'),
            address: formData.get('marketAddress'),
            phone: formData.get('marketPhone'),
            email: formData.get('marketEmail'),
            website: formData.get('marketWebsite'),
            description: formData.get('marketDescription')
        });
        
        showStatus('Market created successfully', 'success');
        hideModal('addMarketModal');
        loadMarketsTable();
        
    } catch (error) {
        console.error('Error creating market:', error);
        showStatus('Failed to create market', 'error');
    }
}

// Delete market with confirmation
function deleteMarketConfirm(marketId, marketName) {
    if (confirm(`Are you sure you want to delete "${marketName}"?`)) {
        deleteMarketHandler(marketId);
    }
}

async function deleteMarketHandler(marketId) {
    try {
        await deleteMarket(marketId);
        showStatus('Market deleted successfully', 'success');
        loadMarketsTable();
    } catch (error) {
        console.error('Error deleting market:', error);
        showStatus('Failed to delete market', 'error');
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', loadMarketsTable);
```

### Step 4: Create Schedules Management

Create `js/admin-schedules.js` with similar CRUD operations for schedules.

### Step 5: Create Users Management

Create `js/admin-users.js` for managing user accounts and roles.

---

## Phase 5: Responsive Design

### Step 1: Create Responsive CSS

Add media queries to `css/responsive.css`:

```css
/* Mobile: 320px - 480px */
@media (max-width: 480px) {
    .container {
        padding: 0 16px;
    }

    .navbar-menu {
        position: fixed;
        top: 60px;
        left: 0;
        right: 0;
        flex-direction: column;
        background-color: white;
        display: none;
        padding: 24px 0;
    }

    .navbar-menu.active {
        display: flex;
    }

    .markets-grid {
        grid-template-columns: 1fr;
        gap: 16px;
    }

    /* Tables to cards */
    .data-table {
        border: none;
    }

    .data-table tr {
        border: 1px solid var(--gray-300);
        border-radius: 8px;
        display: block;
        margin-bottom: 16px;
        padding: 16px;
    }

    .data-table td {
        display: block;
        padding: 8px 0;
    }

    .data-table td::before {
        content: attr(data-label);
        font-weight: 600;
        margin-right: 8px;
    }
}

/* Tablet: 481px - 768px */
@media (min-width: 481px) and (max-width: 768px) {
    .markets-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 24px;
    }
}

/* Desktop: 769px - 1200px */
@media (min-width: 769px) {
    .markets-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
    }
}

/* Large: 1200px+ */
@media (min-width: 1200px) {
    .container {
        max-width: 1200px;
    }
}
```

### Step 2: Add Mobile Navigation

Add to `js/main.js`:
```javascript
// Mobile menu toggle
document.getElementById('navbarToggle')?.addEventListener('click', () => {
    document.getElementById('navbarMenu').classList.toggle('active');
});

// Close menu when link clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navbarMenu').classList.remove('active');
    });
});
```

---

## Phase 6: Advanced Features

### Step 1: Implement Bulk Upload

Create `js/admin-bulk-upload.js` (450+ lines):

Key features:
- SheetJS library integration
- Excel file parsing
- Data validation
- Auto-schedule generation
- Batch Firestore operations
- Error reporting

```javascript
// Add SheetJS to HTML first:
// <script src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"></script>

async function parseExcelFile(file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        // Parse with SheetJS
        const workbook = XLSX.read(e.target.result, { type: 'binary' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        // Display preview
        displayPreview(file.name, jsonData);
    };
    
    reader.readAsBinaryString(file);
}

async function uploadMarketsToDatabase(markets) {
    const results = {
        successful: [],
        failed: []
    };
    
    for (let i = 0; i < markets.length; i++) {
        try {
            const marketData = normalizeMarketData(markets[i]);
            
            // Create market
            const docRef = await createMarketRecord(marketData);
            
            // Create schedule if opening hours provided
            if (marketData.openingDays && marketData.openingHours) {
                await createScheduleFromOpeningInfo(
                    docRef.id,
                    marketData.openingDays,
                    marketData.openingHours
                );
            }
            
            results.successful.push({
                row: i + 2,
                name: marketData.name,
                id: docRef.id
            });
            
        } catch (error) {
            results.failed.push({
                row: i + 2,
                name: markets[i]['Market Name'] || 'Unknown',
                error: error.message
            });
        }
    }
    
    return results;
}

// Parse "7:00AM-7:00PM" format and "Mondays-Saturday" format
async function createScheduleFromOpeningInfo(marketId, openingDays, openingHours) {
    // Parse time: "7:00AM-7:00PM"
    const timeMatch = openingHours.match(/(\d{1,2}):(\d{2})(AM|PM)\s*-\s*(\d{1,2}):(\d{2})(AM|PM)/i);
    const openTime = timeMatch[1] + ':' + timeMatch[2] + timeMatch[3];
    const closeTime = timeMatch[4] + ':' + timeMatch[5] + timeMatch[6];
    const hours = `${openTime} - ${closeTime}`;
    
    // Parse days: "Mondays-Saturday"
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let activeDays = [];
    
    if (openingDays.toLowerCase().includes('mondays-saturday')) {
        activeDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    } else if (openingDays.toLowerCase().includes('monday-fridays') || openingDays.toLowerCase().includes('mondays-fridays')) {
        activeDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    } else if (openingDays.toLowerCase().includes('sunday')) {
        activeDays = ['Sunday'];
    }
    
    // Build schedule
    const scheduleData = {};
    daysOfWeek.forEach(day => {
        scheduleData[day.toLowerCase()] = activeDays.includes(day) ? hours : 'Closed';
    });
    
    // Create schedule
    await createSchedule(marketId, scheduleData);
}
```

### Step 2: Implement Image Upload

Add to market forms:
```html
<div class="form-group">
    <label for="marketImage">Market Image</label>
    <input type="file" id="marketImage" accept="image/*">
    <img id="imagePreview" style="max-width: 200px; display:none;">
</div>
```

JavaScript to handle image upload:
```javascript
const fileInput = document.getElementById('marketImage');
fileInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const base64 = event.target.result;
            document.getElementById('imagePreview').src = base64;
            document.getElementById('imagePreview').style.display = 'block';
            // Store base64 in form data
        };
        reader.readAsDataURL(file);
    }
});
```

---

## Phase 7: Testing & Debugging

### Step 1: Test On Different Devices

```bash
# Test on mobile size
# Use Chrome DevTools: Ctrl+Shift+I → Click mobile icon

# Test responsive breakpoints:
# 320px (Mobile Small)
# 375px (Mobile Standard)
# 481px (Tablet)
# 768px (Tablet Large)
# 1024px (Desktop)
# 1440px (Desktop Large)
```

### Step 2: Browser Console Testing

Check console (F12 → Console) for:
- Firebase initialization messages
- Module loading messages
- API response logs
- Error messages

Example test:
```javascript
// Test Firebase connection
firebase.auth().currentUser ? console.log('Auth OK') : console.log('Not authenticated');

// Test Firestore
db.collection('markets').get().then(snap => console.log(`Found ${snap.size} markets`));

// Test DOM elements
document.getElementById('featuredMarkets') ? console.log('Markets container found') : console.log('Container not found');
```

### Step 3: Unit Testing Checklist

- [ ] Create market with all fields
- [ ] Edit market information
- [ ] Delete market with confirmation
- [ ] Create schedule for market
- [ ] Edit schedule hours
- [ ] Login as admin
- [ ] Logout from admin
- [ ] Bulk upload Excel file
- [ ] View markets listing
- [ ] View market details
- [ ] Check responsive on mobile (375px)
- [ ] Check responsive on tablet (768px)
- [ ] Check responsive on desktop (1024px)
- [ ] Social icons display correctly
- [ ] Images load properly
- [ ] Forms validate
- [ ] Error messages show
- [ ] Loading spinners appear

---

## Deployment Guide

### Option 1: Firebase Hosting (Recommended)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in project
firebase init hosting

# Select project and configure public directory as "frontend"

# Deploy
firebase deploy --only hosting
```

### Option 2: Traditional Hosting (Apache/Nginx)

```bash
# Copy frontend folder contents to web server
# Configure server to serve index.html for routes

# For Apache, add to .htaccess:
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Option 3: Vercel/Netlify

```bash
# Push to GitHub
git push origin main

# Vercel:
# 1. Go to https://vercel.com/import
# 2. Select GitHub repository
# 3. Deploy

# Netlify:
# 1. Go to https://app.netlify.com
# 2. Connect GitHub repository
# 3. Set build settings
# 4. Deploy
```

---

## Troubleshooting

### Common Issues

#### 1. SheetJS Not Loaded
**Problem:** "SheetJS library not loaded" error when uploading Excel
**Solution:**
```html
<!-- Make sure this is in HEAD, before admin-bulk-upload.js -->
<script src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"></script>
```

#### 2. Firebase Not Initialized
**Problem:** "Firebase is not defined"
**Solution:**
- Check Firebase SDK scripts are loaded in correct order
- Include firebase.js after Firebase SDK scripts
- Check config has correct credentials

#### 3. Images Not Showing
**Problem:** Images display as broken
**Solution:**
- Check imageUrl is proper base64 or valid URL
- Ensure image is stored with createMarket function
- Check Firebase console for stored data

#### 4. Responsive Design Issues
**Problem:** Layout breaks at certain breakpoints
**Solution:**
- Use DevTools responsive mode
- Check media query breakpoints in responsive.css
- Test on real devices

#### 5. Admin Login Fails
**Problem:** "Unauthorized: Admin access required"
**Solution:**
- Verify user exists in users collection
- Check user role is set to "admin"
- Ensure user is logged in to auth

#### 6. Schedule Not Saving
**Problem:** Schedule created but not visible
**Solution:**
- Check schedule actually exists in Firestore
- Verify marketId matches
- Ensure schedule data format is correct

### Debugging Tips

1. **Use Chrome DevTools:**
   - F12 → Console for logs
   - F12 → Network to check API calls
   - F12 → Application to check localStorage/session

2. **Check Firebase Console:**
   - View Firestore data
   - Check Authentication users
   - Monitor database usage

3. **Add Console Logs:**
```javascript
console.log('Data loaded:', data);
console.log('Current user:', firebase.auth().currentUser);
console.log('Markets count:', markets.length);
```

4. **Test API Functions Manually:**
```javascript
// In browser console:
getAllMarkets().then(m => console.log(m));
getMarket('marketId').then(m => console.log(m));
```

---

## Reproduction Steps

To recreate this project from scratch:

1. **Follow Phase 1:** Create all HTML and CSS files
2. **Follow Phase 2:** Set up Firebase project and collections
3. **Follow Phase 3:** Create core JavaScript modules
4. **Follow Phase 4:** Build admin panel
5. **Follow Phase 5:** Add responsive CSS
6. **Follow Phase 6:** Implement advanced features (bulk upload, images)
7. **Follow Phase 7:** Test thoroughly
8. **Deploy:** Choose hosting option and deploy

**Total Time Estimate:** 40-60 hours

---

## Summary

This report provides a complete step-by-step guide to building the RealMart marketplace platform. By following these phases, you can:

- Understand the complete architecture
- Recreate the project from scratch
- Add new features
- Debug issues
- Deploy to production

For questions or additional details, refer to the REALMART_PROJECT_DOCUMENTATION.md file.

---

**Document Version:** 1.0  
**Last Updated:** February 16, 2026  
**Status:** Complete

