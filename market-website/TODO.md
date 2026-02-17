# PROJECT TODO LIST - Market Days & Opening Schedule Website

**Project:** ICT303 Group 7 - Market Days & Opening Schedule Website  
**Architecture:** Firebase-Only (Firestore + Firebase Auth + Firebase Hosting)  
**Lead:** Technical Lead (You)  
**Status:** Frontend Development  
**Last Updated:** January 31, 2026  
**Architecture Change:** Switched from Spring Boot + Firebase to Firebase-Only approach for simplicity and faster deployment

---

## PHASE 1: PROJECT SETUP (Tasks 1-3)
Setup foundational infrastructure for the entire project

- [x] **Task 1: Set up project repository on GitHub** ✅ COMPLETED
  - Create public GitHub repository with descriptive name
  - Initialize .gitignore (Node, IDE ignores)
  - Create folder structure: frontend/, firebase/, docs/
  - Create initial README.md
  - Make first commit
  - **Status:** Repository created at https://github.com/pomosoro123/FutaMart303Project

- [x] **Task 2: Configure Firebase project** ✅ COMPLETED
  - Create Firebase project in Firebase Console
  - Set up Firestore database
  - Create Firestore collections: markets, schedules, users
  - Write and deploy Firestore security rules
  - Get Firebase config JSON
  - Get API keys and credentials
  - Document configuration in firebase/ folder
  - **Status:** Firebase credentials saved in firebase/config.js

- [x] **Task 3: Set up frontend development environment** ✅ COMPLETED
  - Initialize frontend/ folder with HTML/CSS/JS structure
  - Create package.json for dependencies (if using npm)
  - Set up Firebase configuration file for web
  - Create basic project structure
  - **Status:** Firebase config ready, frontend folder structure prepared

---

## PHASE 2: FRONTEND DEVELOPMENT (Tasks 4-23)
Build all HTML pages, CSS styling, and JavaScript with direct Firestore integration

### 2A: HTML Pages & Structure (Tasks 4-6) ✅ COMPLETED
- [x] **Task 4: Create index.html (home page)** ✅ COMPLETED
  - ✅ Header with navigation (Home, Browse Markets, Search, Admin Login)
  - ✅ Hero section with call-to-action
  - ✅ Featured markets section
  - ✅ Search bar for quick market lookup
  - ✅ Quick stats section
  - ✅ Footer with links and info
  - ✅ Full responsive design (mobile, tablet, desktop)
  - Commit: 4730f4d
  - Time: 1.5 hours

- [x] **Task 5: Create markets.html (browse all markets)** ✅ COMPLETED
  - ✅ Display all markets in grid view
  - ✅ Market cards showing name, city, state, hours
  - ✅ Search filter by market name
  - ✅ City and state filter dropdowns
  - ✅ Sort options (by name, city, newest)
  - ✅ Pagination controls
  - ✅ Click to view details
  - ✅ Active filters display
  - Commit: 4730f4d
  - Time: 2 hours

- [x] **Task 6: Create market-details.html (single market page)** ✅ COMPLETED
  - ✅ Full market information (name, address, contact, website)
  - ✅ Operating hours for each day of week
  - ✅ Special hours and holidays section
  - ✅ Google Maps integration placeholder
  - ✅ "Is it open now?" status indicator
  - ✅ Share/bookmark buttons
  - ✅ Related markets section
  - ✅ Breadcrumb navigation
  - Commit: 4730f4d
  - Time: 2 hours

### 2B: CSS Styling (Tasks 7-11) ✅ COMPLETED
- [x] **Task 7: Create base styles (styles.css)** ✅ COMPLETED
  - ✅ CSS variables (colors, fonts, spacing, shadows, transitions)
  - ✅ Reset styles and normalize
  - ✅ Typography (headings, body text, links)
  - ✅ Global styles (layout, containers, forms)
  - ✅ Images, scrollbar styling, print styles
  - 180+ lines of CSS variables and base styling
  - Commit: 4730f4d
  - Time: 1.5 hours

- [x] **Task 8: Create component styles (components.css)** ✅ COMPLETED
  - ✅ Header/navigation styles with sticky positioning
  - ✅ Logo with gradient text effect
  - ✅ Button styles (primary, secondary, outline, danger)
  - ✅ Card component styles with hover effects
  - ✅ Grid layouts (markets, stats)
  - ✅ Form input styles with focus states
  - ✅ Badges, modals, pagination, alerts
  - ✅ Footer styles with social links
  - 550+ lines of component CSS
  - Commit: 4730f4d
  - Time: 2 hours

- [x] **Task 9: Create responsive design (responsive.css)** ✅ COMPLETED
  - ✅ Mobile breakpoints (320px-480px)
  - ✅ Tablet breakpoints (481px-768px)
  - ✅ Desktop breakpoints (769px-1440px+)
  - ✅ Mobile-first responsive approach
  - ✅ Navigation responsiveness (hamburger menu)
  - ✅ Image and grid responsiveness
  - ✅ Touch device optimizations
  - ✅ Landscape mode, print media, retina display support
  - 400+ lines of responsive CSS
  - Commit: 4730f4d
  - Time: 2 hours

- [x] **Task 10: Create utilities and animations (utils.css)** ✅ COMPLETED
  - ✅ 10+ keyframe animations (fade, slide, scale, pulse, bounce, shimmer)
  - ✅ Animation utility classes
  - ✅ Display, visibility, positioning utilities
  - ✅ Width, height, overflow utilities
  - ✅ Text utilities (bold, italic, uppercase, truncate, line-clamp)
  - ✅ Border, shadow, background color utilities
  - ✅ Gradient backgrounds
  - ✅ Transform, spacing, flex utilities
  - ✅ Cursor, skeleton, loading utilities
  - 450+ lines of utility classes
  - Commit: 4730f4d
  - Time: 1 hour

### 2C: JavaScript Core Modules (Tasks 11-17) ✅ COMPLETED
- [x] **Task 11: Create Firebase integration module (firebase.js)** ✅ COMPLETED
  - ✅ Firebase config initialization
  - ✅ Firestore database reference setup
  - ✅ Firebase Auth configuration
  - ✅ Real-time listener helpers
  - ✅ Error handling and user-friendly messages
  - ✅ Current user state management
  - ✅ Login, register, logout, password reset functions
  - ✅ User profile update and password change
  - ✅ Batch operations (update, delete)
  - ✅ Query helpers (get, add, update, delete documents)
  - ✅ Admin role checking
  - 300+ lines of Firebase integration code
  - Commit: 8686811
  - Time: 1.5 hours

- [x] **Task 12: Create Market API module (markets.js)** ✅ COMPLETED
  - ✅ getAllMarkets() - fetch all markets from Firestore
  - ✅ getMarketById(id) - get single market
  - ✅ searchMarketsByName(query) - search by name
  - ✅ getMarketsByCity(city) - filter by city
  - ✅ getMarketsByState(state) - filter by state
  - ✅ getMarketsByCityAndState() - combined filter
  - ✅ getAllCities() - get unique city list
  - ✅ getAllStates() - get unique state list
  - ✅ createMarket() - admin only creation
  - ✅ updateMarket() - admin only updates
  - ✅ deleteMarket() - admin only deletion
  - ✅ filterMarkets() - complex filtering with sorting
  - ✅ getMarketsWithPagination() - pagination support
  - ✅ Real-time listeners for live updates
  - 350+ lines of Markets API code
  - Commit: 8686811
  - Time: 2 hours

- [x] **Task 13: Create Schedule module (schedule.js)** ✅ COMPLETED
  - ✅ getScheduleForMarket(marketId) - get market hours
  - ✅ isMarketOpen(marketId) - check if open now
  - ✅ getDayOpeningHours() - get hours for specific day
  - ✅ getFormattedSchedule() - format schedule for display
  - ✅ getNextOpeningTime() - find next opening
  - ✅ createSchedule() - admin only creation
  - ✅ updateSchedule() - admin only updates
  - ✅ deleteSchedule() - admin only deletion
  - ✅ Format schedule data for display
  - ✅ Calculate current open/closed status
  - ✅ Format time ranges (09:00 AM - 6:00 PM style)
  - ✅ Holiday management
  - ✅ Real-time listeners
  - 400+ lines of Schedule module code
  - Commit: 8686811
  - Time: 1.5 hours

- [x] **Task 14-17: Create UI utilities and additional modules** ✅ COMPLETED
  - ✅ UI utilities module (ui.js) with 450+ lines
  - ✅ showLoadingSpinner() / hideLoadingSpinner()
  - ✅ showNotification() with toast notifications
  - ✅ showModal() / hideModal() dialog system
  - ✅ showConfirm() confirmation dialogs
  - ✅ formatMarketCard() - render market card HTML
  - ✅ formatScheduleTable() - render schedule table
  - ✅ Button loading states and form utilities
  - ✅ Form validation (email, password strength)
  - ✅ formatCurrency() - currency formatting
  - ✅ formatDateDisplay() - date formatting
  - ✅ copyToClipboard() - clipboard operations
  - ✅ smoothScrollTo() - smooth scrolling
  - ✅ debounce() / throttle() - performance utilities
  - ✅ Element toggle and CSS animation helpers
  - Commit: 8686811
  - Time: 2 hours

### 2D: Page Functionality (Tasks 18-20)
- [ ] **Task 18: Implement home page functionality (main.js)**
  - Load featured markets from Firestore
  - Display market stats counter
  - Initialize search bar with autocomplete
  - Setup navigation toggle for mobile
  - Load footer dynamically
  - Test all interactions
  - Estimated time: 2 hours

- [ ] **Task 19: Implement markets browse functionality (main-markets.js)**
  - Load all markets from Firestore
  - Display in responsive grid
  - Implement sorting (by name, city, newest)
  - Implement filtering (city, state, search)
  - Setup pagination with prev/next buttons
  - Make cards clickable to details page
  - Display "no results" message
  - Estimated time: 2.5 hours

- [ ] **Task 20: Implement market details page (main-details.js)**
  - Get market ID from URL parameters
  - Load market data from Firestore
  - Display all information
  - Show schedule formatted for each day
  - Calculate and show "is it open now" status
  - Integrate Google Maps for location
  - Setup share buttons (Facebook, Twitter, Copy link)
  - Load related markets in same city
  - Estimated time: 2.5 hours
  - Show related markets
  - Estimated time: 3 hours

### 2E: Admin Panel (Tasks 21-23)
- [ ] **Task 21: Create admin login page**
  - Email/password login form
  - Connect to Firebase Auth
  - Check admin role in Firestore
  - Redirect on successful login
  - Remember user session
  - Estimated time: 1.5 hours

- [ ] **Task 22: Create admin dashboard (view/manage markets)**
  - Display all markets in table
  - Edit market details
  - Delete markets
  - Add new market form
  - Confirm delete action
  - Show success/error messages
  - Estimated time: 3 hours

### 2E: Admin Panel (Tasks 21-23)
- [ ] **Task 21: Create admin login page**
  - Email/password login form
  - Connect to Firebase Auth
  - Check admin role in Firestore
  - Redirect on successful login
  - Remember user session
  - Estimated time: 1.5 hours

- [ ] **Task 22: Create admin dashboard (view/manage markets)**
  - Display all markets in table
  - Edit market details
  - Delete markets
  - Add new market form
  - Confirm delete action
  - Show success/error messages
  - Estimated time: 3 hours

- [ ] **Task 23: Create admin schedule manager**
  - Display markets with schedules
  - Edit opening hours per day
  - Set special hours and holidays
  - Save changes to Firestore
  - Validation for schedule times
  - Bulk edit option
  - Estimated time: 2.5 hours

---

## PHASE 3: TESTING & DEPLOYMENT (Tasks 24-27)
Test functionality and deploy to Firebase Hosting

- [ ] **Task 24: Test frontend functionality**
  - Test all pages load correctly
  - Test search and filter functionality
  - Test market details display
  - Test schedule displays correct hours
  - Test "is it open now" calculation
  - Test responsive design on mobile/tablet/desktop
  - Test navigation and links
  - Estimated time: 2 hours

- [ ] **Task 25: Test Firebase integration**
  - Test Firestore reads work correctly
  - Test Firebase Auth login/logout
  - Test admin role verification
  - Test real-time updates from Firestore
  - Test error handling for network issues
  - Test security rules enforcement
  - Estimated time: 2 hours

- [ ] **Task 26: Test admin functionality**
  - Test adding new markets
  - Test editing market data
  - Test editing schedules
  - Test deleting markets
  - Test form validation
  - Test admin access control
  - Estimated time: 2 hours

- [ ] **Task 27: Deploy to Firebase Hosting**
  - Build/optimize frontend for production
  - Deploy to Firebase Hosting
  - Get live URL
  - Test deployed site
  - Setup custom domain (optional)
  - Create deployment documentation
  - Estimated time: 1 hour

---

## PHASE 4: DOCUMENTATION & SUBMISSION (Tasks 28-30)
Create documentation and prepare for project submission

- [ ] **Task 28: Create README.md**
  - Project overview and purpose
  - Features list
  - Technology stack (Firebase, HTML/CSS/JS)
  - Installation instructions (clone repo, setup Firebase)
  - How to run locally (just open HTML files or use Firebase Emulator)
  - How to add markets (admin panel instructions)
  - Deployment instructions
  - Troubleshooting guide
  - Team member contributions
  - Estimated time: 2 hours

- [ ] **Task 29: Create user documentation**
  - How to browse markets
  - How to search/filter markets
  - How to view market details and hours
  - Admin guide (login, add/edit markets and schedules)
  - FAQs
  - Screenshots of main pages
  - Estimated time: 2 hours

- [ ] **Task 30: Final review and submission**
  - Code review and cleanup
  - Test all features one final time
  - Verify all links work
  - Check for console errors
  - Verify Firebase security rules are correct
  - Final commit with "Release v1.0"
  - Create GitHub release
  - Submit project
  - Estimated time: 2 hours

---

## SUMMARY BY PHASE

| Phase | Task Range | Description | Status | Estimated Hours | Actual Hours |
|-------|-----------|-------------|--------|-----------------|--------------|
| Phase 1 | Tasks 1-3 | Project Setup | ✅ Complete | 8 | 3 |
| Phase 2 | Tasks 4-20 | Frontend Development (HTML/CSS/JS) | ⏳ In Progress (57% - 12/21) | 32 | 14 |
| Phase 3 | Tasks 21-27 | Admin Panel & Testing | ⏳ Not Started | 12 | 0 |
| Phase 4 | Tasks 28-30 | Deployment & Documentation | ⏳ Not Started | 6 | 0 |
| **Total** | **30 Tasks** | **Complete Platform** | **40% Complete (12/30)** | **58 hours** | **17 hours** |

---

## KEY TECHNOLOGY STACK

**Frontend:**
- HTML5 for structure
- CSS3 for styling and responsive design
- Vanilla JavaScript (ES6+) for functionality
- Google Maps API for location display

**Backend/Database:**
- Firebase Firestore for data storage
- Firebase Authentication for user login
- Firebase Hosting for deployment
- Firebase Security Rules for data access control

**Collections in Firestore:**
- `markets`: Contains market info (name, city, state, address, phone, email, website, description, imageUrl, latitude, longitude)
- `schedules`: Contains market opening hours (marketId, monday-sunday, holidays, specialNotes)
- `users`: Contains user data (email, role: 'admin'/'user', createdAt)

---

## NOTES ON ARCHITECTURE CHANGE

**Why Firebase-Only?**
- ✅ Eliminates need for backend server (no Spring Boot/Java)
- ✅ Faster to develop and deploy
- ✅ Automatic scaling with Firebase
- ✅ Built-in authentication and hosting
- ✅ Real-time data updates via Firestore listeners
- ✅ Lower cost for small to medium traffic
- ✅ Easier for team members unfamiliar with backend development

**What was removed:**
- ❌ Spring Boot backend (all Java code in backend/ folder)
- ❌ Maven build process
- ❌ REST API endpoints
- ❌ JWT token management (Firebase Auth handles this)
- ❌ Backend service layer

**Frontend communicates directly with:**
- ✅ Firestore for all data operations
- ✅ Firebase Auth for user login/registration
- ✅ Firebase Hosting for serving pages
