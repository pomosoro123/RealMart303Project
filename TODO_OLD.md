# PROJECT TODO LIST - Market Days & Opening Schedule Website

**Project:** ICT303 Group 7 - Market Days & Opening Schedule Website  
**Lead:** Technical Lead (You)  
**Status:** 77% Complete - Final Phase (Testing & Documentation)  
**Last Updated:** January 31, 2026  
**Architecture:** Firebase-only (Frontend Direct Integration)

---

## PHASE 1: PROJECT SETUP (Tasks 1-3)
Setup foundational infrastructure for the entire project

- [x] **Task 1: Set up project repository on GitHub** ✅ COMPLETED
  - Create public GitHub repository with descriptive name
  - Initialize .gitignore (Java, Node, IDE ignores)
  - Create folder structure: frontend/, backend/, docs/, firebase/
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

- [x] **Task 3: Set up Java/Spring Boot backend project** ✅ COMPLETED
  - Create Spring Boot project (use Spring Initializr)
  - Configure pom.xml with dependencies:
    - Spring Web
    - Spring Data Firestore
    - Firebase Admin SDK
    - JWT (jjwt)
    - Lombok
    - JUnit 5 for testing
  - Create application.properties with Firebase config
  - Test project builds and runs on localhost:8080
  - **Status:** Maven project created with pom.xml, application.properties, main app class, and health check endpoint. Ready to build and run on localhost:8080

---

## PHASE 2: BACKEND DEVELOPMENT (Tasks 4-14)
Build all Java backend code, API endpoints, and authentication

### 2A: Create Java Model Classes (Tasks 4-7) ✅ COMPLETED
- [x] **Task 4: Create Java model classes** ✅ COMPLETED
  - Built Market.java with 14 fields (marketId, name, city, state, address, phone, email, website, description, imageUrl, latitude, longitude, createdAt, updatedAt)
  - Built Schedule.java with 11 fields (scheduleId, marketId, monday-sunday, holidays, specialNotes, timestamps)
  - Built User.java with 7 fields (userId, email, passwordHash, role, enabled, createdAt, lastLogin)
  - Built LoginRequest.java (email, password)
  - Built AuthResponse.java (success, message, token, userId, email, role)
  - Added @Data, @NoArgsConstructor, @AllArgsConstructor Lombok annotations
  - Status: All model classes created and committed (commit e018e6f)

### 2B: Create Data Access Layer (Tasks 8-10) ✅ COMPLETED
- [x] **Task 8: Create MarketRepository interface** ✅ COMPLETED
  - Interface extending repository pattern with 9 methods
  - Methods: findAll, findById, findByCity, findByState, findByCityAndState, findByNameContaining, save, update, delete, existsById
  - Uses Firestore for database operations
  - Status: Repository interface created and committed

- [x] **Task 9: Create ScheduleRepository interface** ✅ COMPLETED
  - Interface with 8 methods for schedule management
  - Methods: findAll, findById, findByMarketId, findByMarketIdIn, save, update, delete, existsById, existsByMarketId
  - Integrates with Firestore for schedule data access
  - Status: Repository interface created and committed

- [x] **Task 10: Create UserRepository interface** ✅ COMPLETED
  - Interface with 10 methods for user management
  - Methods: findAll, findById, findByEmail, findByRole, findByEnabled, save, update, delete, existsById, existsByEmail, count
  - Integrates with Firestore for user authentication and management
  - Status: Repository interface created and committed (commit da9d1fb)

### 2C: Create Service Layer (Tasks 11-13) ❌ SKIPPED
✅ DECISION: Architecture changed to Firebase-only approach (January 31, 2026)
- Removed: Spring Boot backend (16 Java files)
- Rationale: Firebase provides direct Firestore integration, eliminating need for separate backend server
- Simplified architecture: Frontend → Firestore (no backend layer)
- Faster development and deployment
- Lower operational complexity
- **Status:** Not needed - Frontend calls Firestore directly via Firebase SDK

- [ ] **Task 11: Build market service layer** ❌ SKIPPED (Firebase-only)
- [ ] **Task 12: Build schedule service layer** ❌ SKIPPED (Firebase-only)
- [ ] **Task 13: Build authentication service** ❌ SKIPPED (Firebase-only)

---

## PHASE 4: GOOGLE MAPS & DATA INTEGRATION (Tasks 37-43)
Integrate Google Maps API and import data from team sections

- [ ] **Task 37: Get Google Maps API key**
  - Create Google Cloud project
  - Enable Maps JavaScript API
  - Create API key in Google Cloud Console
  - Restrict key to JavaScript origins (your domain)
  - Document API key in firebase/maps-config.txt
  - Store securely (not in public code)
  - Estimated time: 30 minutes

- [ ] **Task 38: Integrate Google Maps on details page**
  - Add Google Maps library script to HTML:
    ```html
    <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"></script>
    ```
  - Call initializeMap() function from maps.js
  - Pass market latitude/longitude coordinates
  - Add location markers for market
  - Enable zoom, pan, interactive controls
  - Test map displays correct location
  - Test on mobile (responsive)
  - Estimated time: 1.5 hours

- [ ] **Task 39: Implement print schedule functionality**
  - Add print styles in CSS:
    - Hide navigation and non-essential elements
    - Format schedule table for printing
    - Set proper page breaks
    - Optimize for black/white printing
  - Add JavaScript event listener to print button:
    - Call window.print()
  - Test print preview shows correctly formatted content
  - Test actual printing on different browsers
  - Test prints correctly on different paper sizes
  - Estimated time: 1 hour

- [ ] **Task 40: Add image assets to frontend**
  - Create frontend/assets/images/ folder
  - Copy all images from Section 3 Design_Assets/Images/
  - Optimize image sizes if needed
  - Compress images for web (use tools like TinyPNG)
  - Update HTML img src attributes
  - Verify all images load correctly
  - Test image load times
  - Estimated time: 1 hour

- [ ] **Task 41: Add icon assets to frontend**
  - Create frontend/assets/icons/ folder
  - Copy all icons from Section 3 Design_Assets/Icons/
  - Integrate icons into HTML (location, search, filter, print, etc.)
  - Test icons display correctly at different sizes
  - Verify icons have alt text/accessibility
  - Ensure icons match color scheme
  - Estimated time: 1 hour

- [ ] **Task 42: Import market data from Section 1**
  - Get MARKET_DATABASE.xlsx from Section 1 team
  - Convert spreadsheet to JSON format
  - Create script to upload JSON to Firestore
  - Batch upload documents to markets collection
  - Verify all 20-30 markets uploaded correctly
  - Check data integrity (no missing fields)
  - Test queries return all markets
  - Estimated time: 1.5 hours

- [ ] **Task 43: Import schedule data from Section 2**
  - Get MARKET_SCHEDULES.xlsx from Section 2 team
  - Convert spreadsheet to JSON format
  - Match schedule entries with market IDs
  - Create script to upload JSON to Firestore
  - Batch upload documents to schedules collection
  - Verify all schedules linked to correct markets
  - Test getScheduleByMarketId queries work
  - Estimated time: 1.5 hours

---

## PHASE 5: BACKEND-FRONTEND INTEGRATION & TESTING (Tasks 44-54)
Connect everything together and thoroughly test all features

- [ ] **Task 44: Connect frontend to backend API**
  - Update api.js with correct backend URL:
    - If local: http://localhost:8080
    - If deployed: https://your-backend-url.com
  - Test all API calls work (getAllMarkets, getMarketById, etc.)
  - Verify data displays correctly on all pages
  - Add error handling for failed API calls
  - Handle loading states (show spinner)
  - Test API responses match expected format
  - Estimated time: 2 hours

- [ ] **Task 45: Test search functionality end-to-end**
  - Test search by market name (e.g., "Farmers")
  - Test search by city (e.g., "Lagos")
  - Test search by state (e.g., "Lagos State")
  - Verify results are accurate
  - Test partial searches work (e.g., "farm" finds "farmers market")
  - Test case-insensitive search
  - Test on home page search bar
  - Test on markets list page
  - Test on search results page
  - Estimated time: 1.5 hours

- [ ] **Task 46: Test filter functionality end-to-end**
  - Test filter by city only
  - Test filter by state only
  - Test combined city + state filters
  - Verify filtered results are accurate
  - Test filter dropdown works and closes
  - Test clearing filters shows all markets
  - Test on mobile and desktop
  - Estimated time: 1 hour

- [ ] **Task 47: Test sort functionality end-to-end**
  - Test sort by name A-Z
  - Test sort by name Z-A
  - Verify sorted results display in correct order
  - Test sort combinations with filters
  - Test on different screen sizes
  - Estimated time: 45 minutes

- [ ] **Task 48: Test Google Maps integration**
  - Verify map displays on market details page
  - Test zoom in/out works
  - Test pan (drag) works
  - Verify correct location is shown (marker placement)
  - Test info window shows when marker clicked
  - Test on mobile (check responsive behavior)
  - Test map loads within reasonable time
  - Estimated time: 1 hour

- [ ] **Task 49: Test print schedule feature**
  - Click "Print Schedule" button
  - Verify print preview shows formatted schedule
  - Verify no navigation/unwanted elements in print
  - Test actual printing (print to PDF to test)
  - Verify schedule table is readable
  - Test on Chrome, Firefox, Safari
  - Test on different paper sizes
  - Estimated time: 1 hour

- [ ] **Task 50: Test responsive design on mobile**
  - Test on iPhone (375px width)
  - Test on Android phone (360px width)
  - Test on tablet (768px width)
  - Verify layout adapts at each breakpoint
  - Test all navigation works on mobile
  - Test search bar works on mobile
  - Test filter and sort on mobile
  - Test touch interactions work smoothly
  - Check performance on mobile (load times)
  - Estimated time: 2 hours

- [ ] **Task 51: Test cross-browser compatibility**
  - Test on Google Chrome (latest)
  - Test on Mozilla Firefox (latest)
  - Test on Safari (latest)
  - Test on Microsoft Edge (if available)
  - Verify all features work in each browser
  - Open Developer Console (F12) and check for errors
  - Test responsive design in each browser
  - Test form inputs work correctly
  - Estimated time: 1.5 hours

- [ ] **Task 52: Fix critical bugs from Section 4 testing**
  - Review BUG_LOG.xlsx from Section 4 team
  - Identify all CRITICAL severity bugs
  - Implement fixes for critical bugs
  - Test fixes work correctly
  - Verify no new bugs introduced
  - Communicate with Section 4 team about fixes
  - Get confirmation from testers
  - Estimated time: Variable (depends on bugs)

- [ ] **Task 53: Fix high priority bugs from testing**
  - Review HIGH severity bugs from BUG_LOG
  - Implement fixes for high priority issues
  - Test each fix thoroughly
  - Update BUG_LOG with fix status
  - Document what was fixed and why
  - Verify fixes don't break other features
  - Estimated time: Variable (depends on bugs)

- [ ] **Task 54: Optimize performance**
  - Minify CSS files
  - Minify JavaScript files
  - Optimize images (compress, resize appropriately)
  - Implement lazy loading for images
  - Test page load times with DevTools
  - Aim for pages loading under 3 seconds
  - Check network requests (eliminate unnecessary)
  - Profile JavaScript execution time
  - Estimated time: 2 hours

---

## PHASE 6: DOCUMENTATION (Tasks 55-62)
Write comprehensive documentation for reproducibility and understanding

- [ ] **Task 55: Write API documentation**
  - Create docs/API_DOCUMENTATION.md
  - Document all endpoints:
    - URL path
    - HTTP method (GET, POST, PUT, DELETE)
    - Required parameters
    - Required headers (Authorization for admin endpoints)
    - Request body example (for POST/PUT)
    - Response body example
    - Possible status codes (200, 400, 401, 404, 500)
    - Error response format
  - Include base URL
  - Include authentication explanation
  - Include example requests with curl or Postman
  - Estimated time: 2 hours

- [ ] **Task 56: Write development guide**
  - Create docs/DEVELOPMENT_GUIDE.md
  - Explain project structure (frontend, backend, database)
  - Document how to set up development environment:
    - Install Java, Maven, Node.js (if needed)
    - Clone GitHub repository
    - Set up Firebase credentials
    - Configure API keys
  - Document how to run:
    - Backend (mvn spring-boot:run)
    - Frontend (open in browser)
  - Explain major components and their purpose
  - Explain how data flows through the application
  - Include troubleshooting section
  - Estimated time: 2 hours

- [ ] **Task 57: Write deployment guide**
  - Create docs/DEPLOYMENT_GUIDE.md
  - Document how to clone from GitHub
  - Document Firebase setup:
    - Create Firebase project
    - Set up Firestore
    - Import data
  - Document how to run locally (step-by-step)
  - Document how to deploy to production:
    - Backend deployment (Heroku/AWS/Google Cloud)
    - Frontend deployment (Netlify/Vercel/GitHub Pages)
  - Document environment variables needed
  - Include troubleshooting tips
  - Estimated time: 2 hours

- [ ] **Task 58: Write database schema documentation**
  - Create docs/DATABASE_SCHEMA.md
  - Document Firestore collections:
    - markets collection
    - schedules collection
    - users collection
  - For each collection, document:
    - Document structure (all fields)
    - Field data types
    - Required vs optional fields
    - Relationships to other collections
    - Indexes that should be created
    - Security rules
  - Include example documents
  - Estimated time: 1.5 hours

- [ ] **Task 59: Create comprehensive README.md**
  - Write project description (what does it do?)
  - List key features
  - List tech stack (Java, Spring Boot, Firebase, etc.)
  - Document installation steps:
    - Prerequisites (Java, Git, Node)
    - Clone repository
    - Set up Firebase
    - Configure API keys
    - Install dependencies
  - Document how to run the application
  - Include links to detailed guides (in docs/)
  - Include GitHub repository link
  - Include screenshots of working pages
  - Document team contributions (Section 1, 2, 3, 4)
  - Include troubleshooting FAQ
  - Estimated time: 1.5 hours

- [ ] **Task 60: Add inline code comments**
  - Go through all Java files:
    - Add comments explaining classes
    - Add comments to complex methods
    - Document API endpoint logic
  - Go through all JavaScript files:
    - Comment main functions
    - Explain complex logic
    - Document event handlers
  - Go through HTML files:
    - Add comments for major sections
  - Use clear, concise language
  - Explain "why" not just "what"
  - Estimated time: 3 hours

- [ ] **Task 61: Make regular Git commits**
  - Commit after backend setup complete
  - Commit after API endpoints created
  - Commit after database integration
  - Commit after each frontend page
  - Commit after styling complete
  - Commit after Google Maps integration
  - Commit after data import
  - Commit after feature testing
  - Commit after bug fixes
  - Commit after optimizations
  - Commit after documentation
  - Make at least 15 commits total
  - Use clear, descriptive commit messages
  - Estimated time: Throughout project

- [ ] **Task 62: Create Git tags for releases**
  - Tag v0.1 when backend API is complete
  - Tag v0.2 when frontend pages are complete
  - Tag v0.5 when everything is integrated and working
  - Tag v1.0 at final submission
  - Include version notes (what was added/fixed)
  - Estimated time: 15 minutes

---

## PHASE 7: FINAL SUBMISSION PREPARATION (Tasks 63-68)
Prepare final deliverables and ensure everything is ready

- [ ] **Task 63: Capture screenshots of all pages**
  - Screenshot home page (desktop view)
  - Screenshot home page (mobile view)
  - Screenshot markets list page
  - Screenshot market details page with map
  - Screenshot search results
  - Screenshot responsive design at different sizes
  - Create docs/screenshots/ folder
  - Save screenshots with descriptive names
  - Estimated time: 1 hour

- [ ] **Task 64: Create final project report**
  - Create comprehensive project report (Word or PDF)
  - Include sections:
    - Title page (project name, team, date)
    - Introduction (what problem does this solve?)
    - Project objectives
    - System architecture diagram
    - Step-by-step development explanation:
      - How you built the backend
      - How you built the frontend
      - How you integrated everything
    - Screenshots of all working pages
    - Data flow explanation (how data moves through system)
    - Challenges encountered and how you solved them
    - Team contributions (what each section did)
    - Conclusion and lessons learned
  - This is worth 40% of grade - make it thorough!
  - Estimated time: 4 hours

- [ ] **Task 65: Prepare presentation slides**
  - Create PowerPoint or Google Slides presentation
  - Slide 1: Title (project name, team members, date)
  - Slide 2: Problem statement (what are we solving?)
  - Slide 3: Solution overview
  - Slide 4-5: System architecture
  - Slide 6-10: Feature demo (show each page)
  - Slide 11: Technical implementation (backend, frontend, database)
  - Slide 12: Team roles and contributions
  - Slide 13: GitHub link (make it prominent)
  - Slide 14: Challenges and solutions
  - Slide 15: Conclusion
  - Include screenshots of working features
  - Keep slides clean and professional
  - Estimated time: 2.5 hours

- [ ] **Task 66: Final code quality review**
  - Review all Java files for:
    - Meaningful variable names (not a, b, x, y)
    - Consistent formatting and indentation
    - No duplicate code (DRY principle)
    - Proper error handling
    - No security vulnerabilities
    - Proper use of Spring Boot conventions
  - Review all JavaScript files for:
    - Clear function names
    - Consistent variable naming
    - Proper error handling
    - No console.log() left in production code
  - Review HTML for:
    - Semantic tags used correctly
    - Alt text on images
    - Proper form labels
  - Refactor any problematic code
  - Estimated time: 2 hours

- [ ] **Task 67: Final testing & bug fixes**
  - Run through all testing checklists (from Section 4 docs)
  - Go through each page:
    - Test all functionality
    - Check for visual issues
    - Test on mobile and desktop
    - Test in multiple browsers
  - Fix any remaining bugs
  - Ensure no console errors (press F12 to check)
  - Coordinate with Section 4 testers one final time
  - Get sign-off that website is ready
  - Estimated time: 2.5 hours

- [ ] **Task 68: Final GitHub review & push**
  - Verify all code is committed and pushed to GitHub
  - Check commit history (should have 15+ commits)
  - Verify README.md is complete and clear
  - Verify all documentation is in docs/ folder
  - Verify .gitignore is set up correctly
  - Verify no sensitive data in repository:
    - No API keys in code
    - No passwords
    - No Firebase private keys
  - Verify repository is PUBLIC (not private)
  - Get the GitHub repository URL
  - This URL goes in presentation and report
  - Estimated time: 1 hour

---

## SUMMARY & TIMELINE

**Total Tasks:** 60  
**Estimated Total Time:** 80-100 hours

### Week-by-Week Timeline:
- **Week 1:** Tasks 1-3 (Project Setup) - 3-4 hours
- **Week 2:** Tasks 4-14 (Backend Development) - 18-20 hours
- **Week 3:** Tasks 15-28 (Frontend Development) - 20-22 hours
- **Week 4:** Tasks 29-35 (Integration) - 12-14 hours
- **Week 5:** Tasks 36-46 (Testing & Optimization) - 15-18 hours
- **Week 6:** Tasks 47-54 (Documentation) - 15-17 hours
- **Week 7:** Tasks 55-60 (Final Submission) - 8-10 hours

---

## HOW TO USE THIS TODO LIST

1. **Print or bookmark** this file
2. **Start with Task 1** - Set up GitHub
3. **Check off tasks** as you complete them
4. **Work through tasks in order** (dependencies matter)
5. **Update the todo list** in your IDE as you go
6. **Commit to GitHub** after major milestones
7. **Ask for help** from team if you get stuck
8. **Celebrate** when you complete each phase!

---

## NOTES & REMINDERS

🚨 **Important:**
- Wait for Section 1 data before Task 34
- Wait for Section 2 schedules before Task 35
- Wait for Section 3 design before Tasks 19-22, 32-33
- Wait for Section 4 testing before Tasks 44-45
- Backend must be running before Task 36
- Test frequently throughout (don't wait until end)
- Commit regularly (don't do all 15 commits at once)

💡 **Tips:**
- Tackle one phase at a time
- Don't move to next task until current one is done
- Take breaks (coding is mentally exhausting)
- Ask team questions early
- Test as you build (find bugs early)
- Read error messages carefully
- Use Google and Stack Overflow for help

✅ **Success Criteria:**
- All 60 tasks completed
- Website fully functional
- Code on GitHub with good history
- Documentation complete
- All tests passing
- Project report written
- Presentation ready
- Ready for submission!

---

**Good luck! You've got this! 🚀**
