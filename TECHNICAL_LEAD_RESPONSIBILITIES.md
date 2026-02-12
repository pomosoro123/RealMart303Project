# TECHNICAL LEAD RESPONSIBILITIES

**Role:** Project Lead & Technical Lead  
**Members:** 1 (You)  
**Duration:** Weeks 1-7  
**Project:** Market Days & Opening Schedule Website (ICT303 Group 7)

---

## OVERVIEW

As the technical lead, you are responsible for the architecture, development, and integration of the entire project. This document outlines all your responsibilities and provides guidance for each area.

---

## YOUR MAIN RESPONSIBILITIES

1. **Backend Development** (Java)
2. **Firebase Database Setup**
3. **Frontend Development** (HTML/CSS/JavaScript)
4. **Google Maps Integration**
5. **Project Structure & Setup**
6. **Documentation**
7. **GitHub Repository Management**
8. **Integration & Testing**
9. **Team Coordination**
10. **Final Compilation & Submission**

---

# 1. BACKEND DEVELOPMENT (Java)

## Overview
Build REST API endpoints that the frontend will use to fetch market data, handle searches, and manage admin functions.

## Required API Endpoints

### Public Endpoints (No authentication needed)

#### 1.1 Get All Markets
```
Endpoint: GET /api/markets
Description: Retrieve all markets from database
Response: JSON array of market objects
Example Response:
[
  {
    "id": "1",
    "name": "Central Farmers Market",
    "city": "Lagos",
    "state": "Lagos State",
    "address": "123 Market Street, Lagos 101234",
    "phone": "+234-701-234-5678",
    "email": "info@centralmarket.com",
    "website": "www.centralmarket.com",
    "description": "Fresh produce market..."
  },
  ...
]
```

#### 1.2 Get Market by ID
```
Endpoint: GET /api/markets/{id}
Description: Get details for one specific market
Parameters: id = market ID
Response: Single market object with all details including schedules
Example: GET /api/markets/1
```

#### 1.3 Search Markets
```
Endpoint: GET /api/markets/search?q=searchTerm
Description: Search markets by name, city, or state
Parameters: q = search query
Response: JSON array of matching markets
Example: GET /api/markets/search?q=farmers
```

#### 1.4 Filter Markets
```
Endpoint: GET /api/markets/filter?city=Lagos&state=Lagos%20State
Description: Filter markets by location
Parameters: city, state (optional)
Response: Filtered list of markets
```

#### 1.5 Get Market Schedules
```
Endpoint: GET /api/markets/{id}/schedules
Description: Get opening hours for specific market
Parameters: id = market ID
Response: Schedule object with hours for each day
Example Response:
{
  "marketId": "1",
  "monday": "7:00 AM - 2:00 PM",
  "tuesday": "7:00 AM - 2:00 PM",
  "wednesday": "7:00 AM - 2:00 PM",
  "thursday": "7:00 AM - 2:00 PM",
  "friday": "7:00 AM - 4:00 PM",
  "saturday": "6:00 AM - 5:00 PM",
  "sunday": "CLOSED",
  "holidays": ["Dec 25", "Jan 1"],
  "notes": "Extended hours during holidays"
}
```

### Admin Endpoints (Require authentication)

#### 1.6 Add New Market (Admin Only)
```
Endpoint: POST /api/markets
Description: Create new market entry
Authentication: Required (admin JWT token)
Request Body:
{
  "name": "New Market",
  "city": "Ibadan",
  "state": "Oyo State",
  "address": "456 Market Avenue",
  "phone": "+234-801-234-5678",
  "email": "info@newmarket.com",
  "website": "www.newmarket.com",
  "description": "Market description..."
}
Response: Created market object with ID
```

#### 1.7 Update Market (Admin Only)
```
Endpoint: PUT /api/markets/{id}
Description: Update market information
Authentication: Required
Parameters: id = market ID
Request Body: Updated market fields
Response: Updated market object
```

#### 1.8 Delete Market (Admin Only)
```
Endpoint: DELETE /api/markets/{id}
Description: Remove market from database
Authentication: Required
Parameters: id = market ID
Response: Confirmation message
```

#### 1.9 Update Market Schedule (Admin Only)
```
Endpoint: PUT /api/markets/{id}/schedules
Description: Update opening hours
Authentication: Required
Request Body: Updated schedule object
Response: Updated schedule
```

### Authentication Endpoints

#### 1.10 Admin Login
```
Endpoint: POST /api/auth/login
Description: Authenticate admin user
Request Body:
{
  "email": "admin@example.com",
  "password": "securePassword"
}
Response: JWT authentication token
```

#### 1.11 Verify Token
```
Endpoint: GET /api/auth/verify
Description: Check if token is valid
Headers: Authorization: Bearer {token}
Response: Verification status
```

---

## Technical Stack for Backend

### Framework & Tools:
- **Spring Boot** (Java framework for REST APIs)
- **Maven** (dependency management)
- **Firebase Admin SDK** (for database connection)
- **JWT** (for authentication tokens)
- **Lombok** (reduce boilerplate code)

### Project Structure:
```
backend/
├── src/main/java/com/marketapp/
│   ├── controller/
│   │   ├── MarketController.java
│   │   ├── ScheduleController.java
│   │   └── AuthController.java
│   ├── service/
│   │   ├── MarketService.java
│   │   ├── ScheduleService.java
│   │   └── AuthService.java
│   ├── model/
│   │   ├── Market.java
│   │   ├── Schedule.java
│   │   └── User.java
│   ├── repository/
│   │   ├── MarketRepository.java
│   │   └── ScheduleRepository.java
│   ├── security/
│   │   ├── JwtTokenProvider.java
│   │   └── SecurityConfig.java
│   ├── exception/
│   │   ├── ResourceNotFoundException.java
│   │   └── GlobalExceptionHandler.java
│   └── MarketApiApplication.java
├── src/main/resources/
│   └── application.properties
├── pom.xml
└── README.md
```

### Key Java Classes:

#### Market.java (Model)
```java
@Data
@NoArgsConstructor
public class Market {
    private String id;
    private String name;
    private String city;
    private String state;
    private String address;
    private String phone;
    private String email;
    private String website;
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
```

#### MarketService.java
```java
@Service
public class MarketService {
    
    @Autowired
    private MarketRepository marketRepository;
    
    public List<Market> getAllMarkets() {
        // Query database and return all markets
    }
    
    public Market getMarketById(String id) {
        // Get specific market by ID
    }
    
    public List<Market> searchMarkets(String query) {
        // Search by name, city, or state
    }
    
    public List<Market> filterMarkets(String city, String state) {
        // Filter by location
    }
    
    public Market createMarket(Market market) {
        // Create new market (admin only)
    }
    
    public Market updateMarket(String id, Market market) {
        // Update existing market
    }
    
    public void deleteMarket(String id) {
        // Delete market
    }
}
```

#### MarketController.java
```java
@RestController
@RequestMapping("/api/markets")
public class MarketController {
    
    @Autowired
    private MarketService marketService;
    
    @GetMapping
    public List<Market> getAllMarkets() {
        return marketService.getAllMarkets();
    }
    
    @GetMapping("/{id}")
    public Market getMarket(@PathVariable String id) {
        return marketService.getMarketById(id);
    }
    
    @GetMapping("/search")
    public List<Market> searchMarkets(@RequestParam String q) {
        return marketService.searchMarkets(q);
    }
    
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Market createMarket(@RequestBody Market market) {
        return marketService.createMarket(market);
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Market updateMarket(@PathVariable String id, @RequestBody Market market) {
        return marketService.updateMarket(id, market);
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteMarket(@PathVariable String id) {
        marketService.deleteMarket(id);
    }
}
```

---

# 2. FIREBASE DATABASE SETUP

## Firestore Collections Structure

### 2.1 Markets Collection
```javascript
Collection: markets
Documents structure:
{
  name: String,
  city: String,
  state: String,
  address: String,
  phone: String,
  email: String,
  website: String,
  description: String,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### 2.2 Schedules Collection
```javascript
Collection: schedules
Reference: marketId (links to markets collection)
Documents structure:
{
  marketId: String (reference to market),
  monday: String,
  tuesday: String,
  wednesday: String,
  thursday: String,
  friday: String,
  saturday: String,
  sunday: String,
  holidays: Array<String>,
  specialNotes: String,
  updatedAt: Timestamp
}
```

### 2.3 Users Collection (for admin)
```javascript
Collection: users
Documents structure:
{
  email: String,
  passwordHash: String,
  role: String (admin, user),
  createdAt: Timestamp,
  lastLogin: Timestamp,
  active: Boolean
}
```

## Security Rules

Create Firestore security rules (`firestore.rules`):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Public read access to markets
    match /markets/{document=**} {
      allow read: if true;
      allow write: if request.auth.token.admin == true;
    }
    
    // Public read access to schedules
    match /schedules/{document=**} {
      allow read: if true;
      allow write: if request.auth.token.admin == true;
    }
    
    // Only admin can access/modify users
    match /users/{document=**} {
      allow read, write: if request.auth.token.admin == true;
    }
  }
}
```

---

# 3. FRONTEND DEVELOPMENT (HTML/CSS/JavaScript)

## Page Structure

### 3.1 Home Page (index.html)
**Purpose:** Welcome users and feature main search functionality

**Content:**
- Navigation header
- Hero section with welcome message
- Search bar (center, prominent)
- Featured markets section (3-5 markets)
- Call-to-action buttons
- Footer with links

**Key Features:**
- Responsive design
- Works on all screen sizes
- Search box is front and center
- Images load quickly
- Navigation to other pages

### 3.2 Markets List Page (markets.html)
**Purpose:** Display all markets with filtering and search options

**Content:**
- Navigation header
- Filter options (by city, state)
- Sort options (by name, opening hours)
- Grid/list of markets
- Pagination (if needed)
- Footer

**Key Features:**
- Filter by location works
- Sort functionality
- Search integration
- "View Details" buttons for each market
- Mobile-responsive grid

### 3.3 Market Details Page (market-details.html)
**Purpose:** Show complete information about one market

**Content:**
- Navigation header with back button
- Market name (prominent)
- Opening hours table
- Address and contact information
- Google Map showing location
- "Print Schedule" button
- Related/nearby markets (optional)
- Footer

**Key Features:**
- Interactive Google Map
- Printable schedule
- Complete market information
- Responsive layout
- Contact info clickable

### 3.4 Search Results Page (search.html)
**Purpose:** Display search results

**Content:**
- Navigation header
- Search term display
- Number of results
- Results list (same format as markets list)
- New search option
- Footer

**Key Features:**
- Show what was searched
- Clickable results
- Option to search again
- Responsive design

---

## HTML/CSS/JavaScript Architecture

### Project Structure:
```
frontend/
├── index.html (Home)
├── markets.html (Markets List)
├── market-details.html (Market Details)
├── search.html (Search Results)
├── css/
│   ├── style.css (main styles)
│   ├── responsive.css (mobile styles)
│   ├── components.css (reusable components)
│   └── variables.css (colors, fonts)
├── js/
│   ├── main.js (initialization)
│   ├── api.js (API calls)
│   ├── search.js (search functionality)
│   ├── maps.js (Google Maps)
│   ├── utils.js (helper functions)
│   └── navigation.js (page navigation)
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
└── lib/ (third-party libraries)
    ├── bootstrap.min.css
    └── jquery.min.js
```

### Key JavaScript Files:

#### api.js (API Communication)
```javascript
// Fetch all markets
async function getAllMarkets() {
  try {
    const response = await fetch('/api/markets');
    const markets = await response.json();
    return markets;
  } catch (error) {
    console.error('Error fetching markets:', error);
  }
}

// Search markets
async function searchMarkets(query) {
  try {
    const response = await fetch(`/api/markets/search?q=${query}`);
    const results = await response.json();
    return results;
  } catch (error) {
    console.error('Error searching:', error);
  }
}

// Get single market
async function getMarketById(id) {
  try {
    const response = await fetch(`/api/markets/${id}`);
    const market = await response.json();
    return market;
  } catch (error) {
    console.error('Error fetching market:', error);
  }
}

// Get market schedule
async function getMarketSchedule(id) {
  try {
    const response = await fetch(`/api/markets/${id}/schedules`);
    const schedule = await response.json();
    return schedule;
  } catch (error) {
    console.error('Error fetching schedule:', error);
  }
}
```

#### search.js (Search Functionality)
```javascript
// Handle search form submission
function handleSearch(event) {
  event.preventDefault();
  
  const searchTerm = document.getElementById('searchInput').value;
  
  if (searchTerm.trim() === '') {
    // Show all markets
    displayAllMarkets();
  } else {
    // Search for markets
    searchMarkets(searchTerm).then(results => {
      displaySearchResults(results, searchTerm);
    });
  }
}

// Display search results
function displaySearchResults(results, searchTerm) {
  const resultsContainer = document.getElementById('searchResults');
  
  if (results.length === 0) {
    resultsContainer.innerHTML = `<p>No markets found for "${searchTerm}"</p>`;
    return;
  }
  
  let html = `<p>Found ${results.length} market(s)</p>`;
  
  results.forEach(market => {
    html += `
      <div class="market-card">
        <h3>${market.name}</h3>
        <p>${market.city}, ${market.state}</p>
        <button onclick="goToMarketDetails('${market.id}')">View Details</button>
      </div>
    `;
  });
  
  resultsContainer.innerHTML = html;
}
```

#### maps.js (Google Maps Integration)
```javascript
// Initialize and display map for market location
function initializeMap(marketId, latitude, longitude) {
  const mapElement = document.getElementById('map');
  
  const map = new google.maps.Map(mapElement, {
    zoom: 15,
    center: { lat: latitude, lng: longitude }
  });
  
  const marker = new google.maps.Marker({
    position: { lat: latitude, lng: longitude },
    map: map
  });
  
  // Info window
  const infoWindow = new google.maps.InfoWindow({
    content: `<div><strong>${marketName}</strong><br>${marketAddress}</div>`
  });
  
  marker.addListener('click', () => {
    infoWindow.open(map, marker);
  });
}
```

#### main.js (Initialization)
```javascript
// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  // Set up navigation
  initializeNavigation();
  
  // Load and display markets based on current page
  const currentPage = getCurrentPage();
  
  if (currentPage === 'home') {
    initializeHome();
  } else if (currentPage === 'markets') {
    initializeMarketsList();
  } else if (currentPage === 'details') {
    initializeMarketDetails();
  }
});

// Initialize home page
function initializeHome() {
  getAllMarkets().then(markets => {
    displayFeaturedMarkets(markets.slice(0, 5));
  });
}

// Initialize markets list page
function initializeMarketsList() {
  getAllMarkets().then(markets => {
    displayMarketsList(markets);
    initializeFilters();
    initializeSorting();
  });
}

// Initialize market details page
function initializeMarketDetails() {
  const marketId = getMarketIdFromURL();
  
  getMarketById(marketId).then(market => {
    displayMarketDetails(market);
  });
  
  getMarketSchedule(marketId).then(schedule => {
    displayScheduleTable(schedule);
  });
  
  // Initialize map
  initializeMap(marketId, market.latitude, market.longitude);
}
```

---

## CSS Key Styles

### style.css (Main Styles)
```css
/* Color Variables */
:root {
  --primary-color: #2E7D32;
  --secondary-color: #FFA500;
  --text-color: #333333;
  --background-color: #FFFFFF;
  --light-bg: #F5F5F5;
}

/* Global Styles */
body {
  font-family: 'Roboto', sans-serif;
  color: var(--text-color);
  line-height: 1.6;
}

h1, h2, h3 {
  font-family: 'Roboto Bold', sans-serif;
  margin-bottom: 1rem;
}

/* Navigation */
nav {
  background-color: var(--primary-color);
  padding: 1rem 2rem;
  color: white;
}

nav a {
  color: white;
  text-decoration: none;
  margin: 0 1rem;
}

/* Search Bar */
.search-container {
  padding: 2rem;
  text-align: center;
}

.search-bar {
  width: 100%;
  max-width: 600px;
  padding: 1rem;
  font-size: 1rem;
  border: 2px solid var(--primary-color);
  border-radius: 5px;
}

.search-button {
  background-color: var(--primary-color);
  color: white;
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 0.5rem;
}

.search-button:hover {
  background-color: #1B5E20;
}

/* Market Cards */
.market-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1rem;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.market-card:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.market-card h3 {
  color: var(--primary-color);
}

/* Buttons */
.btn-primary {
  background-color: var(--primary-color);
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #1B5E20;
}

.btn-secondary {
  background-color: var(--secondary-color);
  color: #333;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-secondary:hover {
  background-color: #E69500;
}

/* Tables */
table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

table th {
  background-color: var(--primary-color);
  color: white;
  padding: 1rem;
  text-align: left;
}

table td {
  border: 1px solid #ddd;
  padding: 0.8rem;
}

table tr:nth-child(even) {
  background-color: var(--light-bg);
}

/* Footer */
footer {
  background-color: #333;
  color: white;
  padding: 2rem;
  text-align: center;
  margin-top: 3rem;
}
```

### responsive.css (Mobile Styles)
```css
/* Mobile devices (under 768px) */
@media (max-width: 768px) {
  
  .search-bar {
    width: 90%;
  }
  
  .market-card {
    margin: 0.5rem;
    padding: 1rem;
  }
  
  nav a {
    margin: 0 0.5rem;
    font-size: 0.9rem;
  }
  
  .market-grid {
    grid-template-columns: 1fr;
  }
  
  table {
    font-size: 0.9rem;
  }
  
  .search-button {
    margin-top: 0.5rem;
    margin-left: 0;
    width: 100%;
  }
}

/* Tablets (768px - 1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
  .market-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop (over 1024px) */
@media (min-width: 1024px) {
  .market-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

# 4. GOOGLE MAPS API INTEGRATION

## Setup Steps

### 4.1 Get Google Maps API Key
1. Go to Google Cloud Console
2. Create new project
3. Enable Maps JavaScript API
4. Create API key
5. Restrict key to JavaScript origins
6. Add your domain

### 4.2 Add Coordinates to Database
Each market needs latitude and longitude:

```javascript
// Add to markets collection in Firestore
{
  ...
  latitude: 6.5244,  // e.g., Lagos coordinates
  longitude: 3.3792,
  ...
}
```

### 4.3 Initialize Map on Market Details Page
```html
<div id="map" style="height: 400px; width: 100%;"></div>

<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"></script>
<script>
function initializeMap(latitude, longitude, marketName, marketAddress) {
  const mapElement = document.getElementById('map');
  
  const map = new google.maps.Map(mapElement, {
    zoom: 15,
    center: { lat: latitude, lng: longitude }
  });
  
  const marker = new google.maps.Marker({
    position: { lat: latitude, lng: longitude },
    map: map,
    title: marketName
  });
  
  const infoWindow = new google.maps.InfoWindow({
    content: `
      <div style="padding: 1rem;">
        <h4>${marketName}</h4>
        <p>${marketAddress}</p>
      </div>
    `
  });
  
  marker.addListener('click', () => {
    infoWindow.open(map, marker);
  });
}
</script>
```

---

# 5. PROJECT STRUCTURE & SETUP

## Complete Project Structure
```
market-website/
│
├── README.md
├── .gitignore
├── .env (Firebase config - NOT in git)
├── package.json (if using Node.js tools)
│
├── frontend/
│   ├── index.html
│   ├── markets.html
│   ├── market-details.html
│   ├── search.html
│   │
│   ├── css/
│   │   ├── style.css
│   │   ├── responsive.css
│   │   ├── components.css
│   │   └── variables.css
│   │
│   ├── js/
│   │   ├── main.js
│   │   ├── api.js
│   │   ├── search.js
│   │   ├── maps.js
│   │   ├── utils.js
│   │   └── navigation.js
│   │
│   └── assets/
│       ├── images/
│       ├── icons/
│       └── fonts/
│
├── backend/
│   ├── pom.xml
│   ├── README.md
│   │
│   ├── src/main/java/com/marketapp/
│   │   ├── controller/
│   │   │   ├── MarketController.java
│   │   │   ├── ScheduleController.java
│   │   │   └── AuthController.java
│   │   │
│   │   ├── service/
│   │   │   ├── MarketService.java
│   │   │   ├── ScheduleService.java
│   │   │   └── AuthService.java
│   │   │
│   │   ├── model/
│   │   │   ├── Market.java
│   │   │   ├── Schedule.java
│   │   │   └── User.java
│   │   │
│   │   ├── repository/
│   │   │   ├── MarketRepository.java
│   │   │   └── ScheduleRepository.java
│   │   │
│   │   ├── security/
│   │   │   ├── JwtTokenProvider.java
│   │   │   └── SecurityConfig.java
│   │   │
│   │   ├── exception/
│   │   │   ├── ResourceNotFoundException.java
│   │   │   └── GlobalExceptionHandler.java
│   │   │
│   │   └── MarketApiApplication.java
│   │
│   ├── src/main/resources/
│   │   └── application.properties
│   │
│   └── src/test/
│       └── java/... (unit tests)
│
├── firebase/
│   ├── firestore-rules.txt
│   ├── firebase-config.json
│   └── deployment-guide.md
│
└── docs/
    ├── API_DOCUMENTATION.md
    ├── DEVELOPMENT_GUIDE.md
    ├── DEPLOYMENT_GUIDE.md
    └── DATABASE_SCHEMA.md
```

---

# 6. DOCUMENTATION TASKS

## 6.1 API Documentation

Create `docs/API_DOCUMENTATION.md` with:

```markdown
# Market Website API Documentation

## Base URL
```
http://localhost:8080/api
```

## Authentication
Include JWT token in Authorization header:
```
Authorization: Bearer {token}
```

## Endpoints

### Public Endpoints

#### GET /markets
Retrieve all markets

Response:
```json
[
  {
    "id": "1",
    "name": "Central Market",
    "city": "Lagos",
    ...
  }
]
```

#### GET /markets/{id}
Get market by ID

#### GET /markets/search?q=query
Search markets

#### GET /markets/filter?city=Lagos
Filter markets by location

### Admin Endpoints (Require Auth)

#### POST /markets
Create new market

#### PUT /markets/{id}
Update market

#### DELETE /markets/{id}
Delete market
```

## 6.2 Development Guide

Create `docs/DEVELOPMENT_GUIDE.md` explaining:
- How to set up development environment
- How to run backend and frontend
- How to connect Firebase
- How to use API endpoints
- Key components and their purpose
- How data flows through the application

## 6.3 Deployment Guide

Create `docs/DEPLOYMENT_GUIDE.md` with:
- How to deploy backend (Heroku, AWS, etc.)
- How to deploy frontend (Netlify, Vercel, etc.)
- Firebase configuration
- Environment variables needed
- How to run locally from GitHub

## 6.4 Database Schema

Create `docs/DATABASE_SCHEMA.md` documenting:
- Firestore collections
- Document structures
- Field types
- Relationships between collections
- Indexes needed

---

# 7. GITHUB REPOSITORY MANAGEMENT

## Initial Setup

### 7.1 Create Repository
1. Create new repository on GitHub
2. Name it appropriately: `market-website` or `ict303-market-app`
3. Make it PUBLIC (required for project)
4. Add README

### 7.2 Create .gitignore
```
# Environment variables
.env
.env.local

# Firebase
serviceAccountKey.json
firebase-config.json

# Java
target/
.classpath
.project
.settings/
*.jar

# Node modules
node_modules/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Build
dist/
build/

# Logs
*.log
npm-debug.log*
```

### 7.3 Initial Commit
```bash
git init
git add .
git commit -m "Initial project setup"
git remote add origin https://github.com/yourname/market-website.git
git push -u origin main
```

## Commit Strategy

### Good Commit Messages
```
Feature: Add market search functionality
- Implement search API endpoint
- Add search UI component
- Add unit tests for search

Fix: Search results pagination not working
- Fixed offset calculation in query
- Added proper page size validation

Docs: Update API documentation
- Added search endpoint documentation
- Added example requests and responses

Refactor: Reorganize API controllers
- Move common logic to base class
- Improve code reusability
```

### Commit Frequency
- Commit after completing each feature
- Commit after fixing each bug
- Don't wait until project is done
- Minimum 10-15 commits before final submission

### Example Commit History
```
Week 1:
- Initial project setup
- Create Firebase configuration
- Set up backend project structure

Week 2:
- Implement market API endpoints
- Create market controller and service
- Add market search functionality

Week 3:
- Build frontend HTML pages
- Create CSS styling
- Implement navigation

Week 4:
- Add Google Maps integration
- Implement search UI
- Connect frontend to backend API

Week 5:
- Add filtering and sorting
- Implement schedule display
- Add print functionality

Week 6:
- Bug fixes from testing
- Performance optimization
- Documentation updates
```

---

# 8. INTEGRATION & TESTING

## 8.1 Integrate Data from Sections

### From Section 1 & 2:
1. Take `MARKET_DATABASE.xlsx` from Section 1
2. Take `MARKET_SCHEDULES.xlsx` from Section 2
3. Convert to JSON format
4. Upload to Firestore database
5. Test that data displays correctly

### From Section 3:
1. Take images and icons from Section 3
2. Optimize images (compress, resize)
3. Add to frontend assets folder
4. Update HTML to use images
5. Apply color scheme from branding guide

### From Section 4:
1. Receive TEST_REPORT.docx
2. Review bugs reported
3. Fix critical bugs
4. Fix high priority bugs
5. Verify fixes with testing team

## 8.2 Unit Testing

Create tests for critical functions:

```java
// Test market search
@Test
public void testSearchMarkets() {
  String query = "farmers";
  List<Market> results = marketService.searchMarkets(query);
  assertTrue(results.size() > 0);
  assertTrue(results.get(0).getName().contains("farmers"));
}

// Test filtering
@Test
public void testFilterMarkets() {
  List<Market> results = marketService.filterMarkets("Lagos", "Lagos State");
  assertTrue(results.stream().allMatch(m -> m.getCity().equals("Lagos")));
}
```

## 8.3 Integration Testing

Test complete workflows:
- User searches for market
- User views market details
- User prints schedule
- User navigates between pages
- Map displays correctly

---

# 9. TEAM COORDINATION

## Weekly Meetings

### Week 1: Kickoff
- Explain project to team
- Assign sections
- Provide documentation
- Answer questions

### Weeks 2-5: Progress Check-ins
- Ask Section 1/2: Data collection progress?
- Ask Section 3: Design progress?
- Share your development progress
- Address blocking issues
- Celebrate wins

### Week 6: Integration
- Integrate all team deliverables
- Run through testing checklist
- Coordinate with Section 4 for testing
- Fix bugs as found

### Week 7: Final Review
- Final testing
- Final documentation
- Prepare presentation
- Submit project

## Communication Channels
- Weekly meetings (in-person or video)
- Chat group for quick questions
- Shared folder for deliverables
- GitHub for code updates

---

# 10. FINAL COMPILATION & SUBMISSION

## What to Deliver

### 10.1 Project Report (40% of grade)
- Introduction and project overview
- Step-by-step development explanation
- Architecture and design decisions
- Screenshots of all pages
- Data flow explanation
- Challenges and solutions
- Team contributions

### 10.2 Implementation Guide (Part of Report)
- Environment setup instructions
- Tools and versions used
- Folder structure explanation
- How to run the application
- How to use API endpoints
- Database configuration
- Firebase setup

### 10.3 Source Code (GitHub)
- All HTML, CSS, JavaScript
- Java backend code
- Firebase configuration
- Clear commit history
- Proper folder organization
- No copied code without attribution

### 10.4 Code Documentation
- README.md with setup and run instructions
- Inline comments explaining logic
- Function/method documentation
- Screenshots in documentation

### 10.5 Deployment Guide
- How to clone from GitHub
- How to set up Firebase
- How to run locally
- How to deploy to production
- Environment variables needed

## Presentation Tips

- Explain the problem you solved
- Demo all features working
- Explain your team structure
- Show GitHub commits
- Discuss challenges overcome
- Highlight your technical contributions

---

# TIMELINE & MILESTONES

| Week | Your Tasks | Deliverables |
|------|-----------|--------------|
| 1 | Plan project, set up repo, coordinate team | GitHub repo created, team briefing done |
| 2 | Build backend API endpoints | Functional API endpoints |
| 3 | Build frontend pages, integrate design | 4 working pages |
| 4 | Add Google Maps, integrate data from Sections 1&2 | Live data, working maps |
| 5 | Bug fixes from Section 4, final optimization | Clean working website |
| 6 | Final documentation, prepare presentation | README, guides, screenshots |
| 7 | Submit everything | GitHub link, report, presentation |

---

# SUCCESS CRITERIA

Your project succeeds when:

✅ All 4 pages load and work correctly  
✅ Users can search, filter, and find markets  
✅ Market details display with schedule and map  
✅ Website responsive on mobile and desktop  
✅ Data from team sections properly integrated  
✅ All code on GitHub with good commit history  
✅ Complete documentation provided  
✅ Team coordination successful  
✅ No critical bugs remaining  
✅ Professional presentation delivered  

---

**Good luck! Your technical leadership will make this project excellent! 🚀**
