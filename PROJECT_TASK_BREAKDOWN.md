# Market Days & Opening Schedule Website - Project Task Breakdown
**ICT303 Group 7 - 11 Members Total**

---

## PROJECT OVERVIEW
We're building a web application that helps people find markets, their opening hours, and locations in their state/city. The site will have 4 main pages and use Google Maps to show where markets are located.

**Tech Stack:** HTML, CSS, JavaScript, Java Backend, Firebase Database

---

## TEAM STRUCTURE & ROLES

| Role | Members | Responsibility |
|------|---------|-----------------|
| **Project Lead & Technical Lead** | 1 (You) | Heavy lifting - Backend, Database, API Integration |
| **Section 1 Lead** | 2-3 | Content & Design (Markets Information) |
| **Section 2 Lead** | 2-3 | Content & Design (Schedule Details) |
| **Section 3 Lead** | 2-3 | Content & Design (Visual Assets) |
| **Section 4 Lead** | 2-3 | Testing & Quality Assurance |

---

# NON-TECHNICAL WORK (For Team Members)

## SECTION 1: MARKET DATA COLLECTION & CONTENT CREATION
**Assigned to:** 2-3 Members  
**Deadline:** [Set appropriate date - at least 2 weeks before final deadline]

### What You're Doing:
Researching and collecting information about actual markets in different states/cities that will be displayed on our website.

### Deliverables:

#### 1.1 Market Database (Create a spreadsheet with this information)
- **Market Name** - Official name of the market
- **City** - City where market is located
- **State** - State/Region
- **Address** - Complete physical address
- **Phone Number** - Contact number
- **Email** - Contact email
- **Website** - Official website (if available)
- **Description** - What type of market is it? (e.g., "Farmers market selling fresh produce", "General goods market")

**Minimum requirement:** Collect at least 20-30 markets from at least 5 different states/cities

**Format:** Create a spreadsheet (Excel or Google Sheets) with all this information organized in columns

#### 1.2 Content Quality Checklist
Before submitting your data, verify:
- [ ] All required fields are filled
- [ ] Phone numbers are in correct format
- [ ] Addresses are complete and accurate
- [ ] Descriptions are clear (2-3 sentences each)
- [ ] No duplicate entries
- [ ] Information is from reliable sources (official websites, verified business listings)

#### 1.3 Deliverable Format
Save your completed spreadsheet as: `MARKET_DATABASE.xlsx`

**Why this matters:** This data becomes the core content of our website. Accurate, well-organized information is essential.

---

## SECTION 2: MARKET OPENING HOURS & SCHEDULE INFORMATION
**Assigned to:** 2-3 Members  
**Deadline:** [Set appropriate date - concurrent with Section 1]

### What You're Doing:
Researching and documenting the opening/closing hours and special schedules for each market.

### Deliverables:

#### 2.1 Schedule Information (Spreadsheet)
For each market from Section 1, create a spreadsheet with:

| Field | Example | Notes |
|-------|---------|-------|
| Market Name | Central Farmers Market | Must match Section 1 names exactly |
| Monday Hours | 7:00 AM - 2:00 PM | Use 24-hour format or AM/PM clearly |
| Tuesday Hours | 7:00 AM - 2:00 PM | Fill all days of the week |
| Wednesday Hours | CLOSED | Write "CLOSED" if market doesn't operate that day |
| Thursday Hours | 7:00 AM - 2:00 PM | |
| Friday Hours | 7:00 AM - 4:00 PM | Different hours okay |
| Saturday Hours | 6:00 AM - 5:00 PM | |
| Sunday Hours | CLOSED | |
| Holidays Closed | Dec 25, Jan 1, Jul 4 | When market is closed for holidays |
| Special Notes | "Extended hours during holiday season" | Any important information |

**Minimum requirement:** Complete schedules for at least 20-30 markets

#### 2.2 Schedule Verification
- [ ] All markets have complete weekly schedules
- [ ] Times are consistent and realistic
- [ ] Holiday information is included
- [ ] No missing data fields
- [ ] Format is consistent across all entries

#### 2.3 Deliverable Format
Save as: `MARKET_SCHEDULES.xlsx`

**Why this matters:** This is a core feature of the website - people need to know when markets are open!

---

## SECTION 3: DESIGN & VISUAL ASSETS
**Assigned to:** 2-3 Members  
**Deadline:** [Set appropriate date - 2 weeks before development starts]

### What You're Doing:
Creating the visual design, branding, and image assets for the website.

### Deliverables:

#### 3.1 Website Mockups/Wireframes
Create simple visual layouts for each of the 4 pages. You can use:
- **Tools:** Figma (free), Canva, Adobe XD (free trial), or even hand-drawn sketches photographed
- **What to show:** Where buttons go, where text appears, where images appear

**Pages to design:**
1. **Home Page** - Welcome, search bar, featured markets
2. **Markets List Page** - Table/grid of all markets with filters
3. **Market Details Page** - Full information about one market, including map
4. **Search Results Page** - Results after searching by location or name

**Requirements for each:**
- Show where the main content goes
- Show where navigation menu is
- Show where search box appears
- Show where buttons go
- Keep it simple and clean

#### 3.2 Color Scheme & Branding Guide
Create a simple document with:
- **Primary Color** - Main color for buttons and headers (hex code like #2E7D32)
- **Secondary Color** - Accent color (hex code)
- **Text Color** - Main text color (usually dark - #333333 or black)
- **Background Colors** - What colors should backgrounds be
- **Font Suggestions** - Font names for headings and body text (Google Fonts)

Example:
```
Primary Color: #2E7D32 (Green - for nature/markets)
Secondary Color: #FFA500 (Orange - for vibrant feel)
Text Color: #333333 (Dark Gray)
Background: #FFFFFF (White) with #F5F5F5 (Light gray) for sections
Fonts: Heading: Roboto Bold, Body: Roboto Regular
```

#### 3.3 Image & Icon Assets
Collect or create (using free tools):

**Images needed:**
- 3-5 high-quality market/shopping images for home page
- Market category icons (produce, crafts, general goods, etc.) - at least 5 different icons
- Location pin icon for maps
- Search icon
- Filter icon
- Print icon

**Where to get free images/icons:**
- Unsplash.com (free high-quality images)
- Pexels.com (free images)
- Pixabay.com (free images)
- Flaticon.com (free icons)
- FontAwesome.com (free icons)

**Requirements:**
- All images must be in high resolution (at least 1200px width)
- Icons should be consistent style (all from same source if possible)
- Create a folder with all assets organized
- Document where each image/icon came from (source URL)

#### 3.4 Deliverables
Submit:
1. **Folder:** `Design_Assets/` containing:
   - `Mockups/` (wireframes of each page)
   - `Images/` (all images for the website)
   - `Icons/` (all icon files)
   - `Color_Guide.txt` (the branding guide)
   - `Attribution.txt` (source links for all images/icons)

**Why this matters:** Good design makes the website professional and easy to use. This gives the technical team a clear blueprint to follow.

---

## SECTION 4: TESTING & QUALITY ASSURANCE
**Assigned to:** 2-3 Members  
**Deadline:** [Set appropriate date - 1 week before final submission]

### What You're Doing:
Testing the website to make sure everything works correctly, catching bugs and issues before submission.

### Deliverables:

#### 4.1 Testing Checklist - Home Page
Test and verify each of these works:
- [ ] Page loads without errors
- [ ] All images display correctly
- [ ] Search box is visible and clickable
- [ ] Navigation menu works
- [ ] Featured markets section displays properly
- [ ] All text is readable
- [ ] Links to other pages work
- [ ] Mobile view (on phone) looks good
- [ ] Page scrolls smoothly
- [ ] All buttons have hover effects (change color when mouse over)

#### 4.2 Testing Checklist - Markets List Page
- [ ] Markets list displays all markets
- [ ] Can filter by state/city
- [ ] Can sort by market name
- [ ] Can sort by opening hours
- [ ] Each market row has correct information
- [ ] "View Details" buttons work for each market
- [ ] Search functionality works
- [ ] No broken images or icons
- [ ] Mobile view is usable
- [ ] Page loads in reasonable time (under 3 seconds)

#### 4.3 Testing Checklist - Market Details Page
- [ ] Market name displays correctly
- [ ] All information shows (address, phone, hours, etc.)
- [ ] Google Map displays and shows correct location
- [ ] Map is interactive (can zoom, pan)
- [ ] Opening hours table is clear and readable
- [ ] "Print Schedule" button works and formats correctly
- [ ] Back button returns to previous page
- [ ] Contact information is clickable
- [ ] Mobile view is usable
- [ ] No missing information

#### 4.4 Testing Checklist - Search Functionality
- [ ] Can search by market name
- [ ] Can search by city/state
- [ ] Search results are accurate
- [ ] Search is case-insensitive (doesn't matter if uppercase or lowercase)
- [ ] Empty search shows all markets
- [ ] Partial searches work (e.g., searching "farm" finds "farmers market")
- [ ] Search results page displays properly
- [ ] Can click on results to see details

#### 4.5 Testing Checklist - General/Cross-Page
- [ ] Navigation between all pages works
- [ ] No broken links
- [ ] No console errors (open Developer Tools - F12 - and check Console tab)
- [ ] All forms (if any) work correctly
- [ ] Contact information is correct
- [ ] Website works on Chrome, Firefox, Safari browsers
- [ ] Website works on different screen sizes (desktop, tablet, phone)
- [ ] No typos or grammatical errors
- [ ] Print function works for schedules
- [ ] Google Maps API key is valid and working

#### 4.6 Bug Report Template
When you find issues, document them like this:

```
BUG #1
Title: Markets list not showing all markets
Description: Only 10 markets display instead of all 30
Where Found: Markets List page
Severity: HIGH (major feature broken)
Steps to Reproduce:
1. Go to Markets List page
2. Scroll down
3. Only 10 markets are visible

BUG #2
Title: Typo on home page
Description: "Openng hours" instead of "Opening hours"
Where Found: Home page - featured markets section
Severity: LOW (spelling only)
```

#### 4.7 Test Report Document
Create a document with:
1. **Date Tested:** When you did the testing
2. **Tested By:** Your name(s)
3. **Browsers Tested:** Which browsers you used
4. **Devices Tested:** Desktop, tablet, phone
5. **Checklists Completed:** Mark all sections above with Pass/Fail
6. **Bugs Found:** List all bugs using template above
7. **Overall Status:** Does website meet requirements?

#### 4.8 Deliverable Format
Submit:
- `TEST_REPORT.docx` or `.pdf` (the test results document)
- `BUG_LOG.xlsx` (spreadsheet listing all bugs found with details)
- `TESTING_CHECKLISTS.xlsx` (filled-out checklists)

**Why this matters:** We need to ensure the website works perfectly before submitting. Finding and documenting bugs helps the technical team fix them quickly.

---

# TECHNICAL WORK (For Project Lead - Me)

## Core Technical Responsibilities

### 1. Backend Development (Java)
- **REST API endpoints** for:
  - Getting all markets
  - Getting market by ID
  - Searching markets by name/location
  - Getting schedules for specific market
  - Admin endpoint to add new markets
- **Authentication system** for admin functionality
- **Error handling and validation**
- **API documentation**

### 2. Firebase Database Setup
- **Firestore collections:**
  - `markets` - all market information
  - `schedules` - opening hours for each market
  - `users` - admin user accounts
- **Database rules** for security
- **Backup strategy**

### 3. Frontend Development (HTML/CSS/JavaScript)
- **4 complete pages** with responsive design
- **Google Maps integration**
- **Search and filter functionality**
- **Print schedule feature**
- **Mobile-responsive design**

### 4. Google Maps API Integration
- **Map display** on market details page
- **Location markers** for markets
- **Map interactions** (zoom, pan, info windows)
- **API key management**

### 5. Project Structure & Setup
```
market-website/
├── README.md
├── .gitignore
├── frontend/
│   ├── index.html (Home)
│   ├── markets.html (Markets List)
│   ├── market-details.html (Market Details)
│   ├── search.html (Search Results)
│   ├── css/
│   │   ├── style.css
│   │   ├── responsive.css
│   │   └── components.css
│   ├── js/
│   │   ├── main.js
│   │   ├── api.js
│   │   ├── search.js
│   │   ├── maps.js
│   │   └── utils.js
│   └── assets/
│       ├── images/
│       ├── icons/
│       └── fonts/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/marketapp/
│   │   │   │   ├── controller/
│   │   │   │   ├── service/
│   │   │   │   ├── model/
│   │   │   │   └── repository/
│   │   │   └── resources/
│   │   └── test/
│   └── pom.xml
├── firebase/
│   ├── firestore-rules.txt
│   ├── functions/ (if needed)
│   └── config.json
└── docs/
    ├── API_DOCUMENTATION.md
    ├── DEVELOPMENT_GUIDE.md
    ├── DEPLOYMENT_GUIDE.md
    └── DATABASE_SCHEMA.md
```

### 6. Documentation Tasks
- **API Documentation** - How to use all endpoints
- **Development Guide** - Step-by-step how we built it
- **Deployment Guide** - How to deploy and run the application
- **Database Schema** - Detailed explanation of data structure
- **README.md** - Project overview and setup instructions

### 7. GitHub Repository Management
- **Initial repository setup** with proper .gitignore
- **Regular commits** with clear messages
- **Branch management** if team members contribute code
- **Release/version tags**
- **README and documentation** in repository

### 8. Integration & Testing
- **Integration of all sections:**
  - Data from Section 1 & 2 into database
  - Design from Section 3 into HTML/CSS
  - Testing results from Section 4 for bug fixes
- **Unit testing** for critical functions
- **Performance optimization**

---

# DELIVERABLES ASSIGNMENT

## What Each Section Delivers (Due Dates)

| Section | Main Deliverable | Due Date | Format |
|---------|------------------|----------|--------|
| **Section 1** | Market Database | Week 2 | MARKET_DATABASE.xlsx |
| **Section 2** | Schedule Information | Week 2 | MARKET_SCHEDULES.xlsx |
| **Section 3** | Design & Visual Assets | Week 3 | Folder: Design_Assets/ |
| **Section 4** | Testing & QA Report | Week 4 | TEST_REPORT.docx, BUG_LOG.xlsx |
| **Technical Lead** | Complete Website + Docs | Week 5 | GitHub Repository |

---

# FINAL PROJECT DELIVERABLES (Organized for Submission)

The technical lead will compile everything into:

1. **Project Report** (40% of grade)
   - Introduction & objectives
   - Step-by-step development explanation
   - Screenshots of all working features
   - How data flows from database to website
   - Challenges and solutions

2. **Implementation Guide** (part of Project Report)
   - Environment setup instructions
   - Tools and versions used
   - Folder/project structure explanation
   - Module explanations
   - Key components documentation
   - Page implementation details

3. **Source Code** (GitHub Repository)
   - All HTML, CSS, JavaScript files
   - Java backend code
   - Firebase configuration
   - Clear commit history (not just 1 commit!)
   - Proper folder organization

4. **Code Documentation**
   - README.md with setup and run instructions
   - Inline code comments
   - Function/method documentation
   - Screenshots of working features

5. **Deployment Guide**
   - How to clone from GitHub
   - How to set up Firebase
   - How to run the application locally
   - How to deploy to production

6. **GitHub Repository Link**
   - Public repository
   - Included in presentation and report

---

# IMPORTANT NOTES FOR ALL TEAM MEMBERS

### How Non-Technical Members Contribute to Code Quality:
- Your data quality directly impacts the code we write
- Your design guides how our code is structured
- Your testing catches bugs before submission
- Your documentation helps explain what you discovered

### Quality Standards:
- **Data:** Must be accurate, complete, and properly formatted
- **Design:** Must be professional and consistent
- **Testing:** Must be thorough and detailed
- **All work:** No plagiarism, cite sources for any borrowed content

### Communication:
- Meet regularly (weekly recommended)
- Share progress updates
- Report issues immediately
- Ask questions - there are no stupid questions!

### Timeline:
- Week 1: Planning and task assignment
- Week 2: Sections 1 & 2 deliver data
- Week 3: Section 3 delivers designs
- Week 4: Technical lead integrates everything
- Week 5: Section 4 conducts testing
- Week 6: Bug fixes and final touches
- Week 7: Final submission

---

# TOOLS & RESOURCES NEEDED

### For Non-Technical Members:
- **Spreadsheet software:** Excel, Google Sheets, LibreOffice (FREE)
- **Design tools:** Figma (FREE), Canva (FREE), Penpot (FREE)
- **Image sources:** Unsplash.com, Pexels.com, Pixabay.com (all FREE)
- **Icon sources:** Flaticon.com, FontAwesome.com (FREE)
- **Document creation:** Google Docs, Microsoft Word, LibreOffice (FREE)

### For Technical Lead:
- **Code Editor:** Visual Studio Code (FREE)
- **Java IDE:** IntelliJ IDEA Community (FREE) or Spring Tool Suite (FREE)
- **Database:** Firebase (FREE tier available)
- **Version Control:** Git and GitHub (FREE)
- **Testing tools:** Browser DevTools (built-in, FREE)
- **API testing:** Postman (FREE)

---

# SUCCESS CRITERIA

✅ **Your project succeeds when:**
1. All 4 pages load without errors
2. Users can search and find markets
3. Market details and schedules display correctly
4. Google Maps show correct locations
5. Website works on mobile devices
6. All code is on GitHub with good commit history
7. Documentation is complete and clear
8. Team tested thoroughly and found/fixed bugs
9. Presentation explains everything clearly
10. Code is readable with good variable names and comments

---

**Questions? Contact the technical lead. Let's build something great!**
