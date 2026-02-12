# QUICK SECTION BREAKDOWN - SHORT NOTES

**Project:** Market Days & Opening Schedule Website (ICT303 Group 7)  
**Total Team Members:** 11 (1 Technical Lead + 10 for 4 sections)

---

## SECTION 1: MARKET DATA COLLECTION (2-3 Members)
**Deadline:** Week 2

### What to Do:
Research actual markets from different states/cities

### What to Deliver:
**File:** `MARKET_DATABASE.xlsx` (Excel spreadsheet)

| Column | What to Fill |
|--------|--------------|
| Market Name | Official market name |
| City | City location |
| State | State/Region |
| Address | Full physical address |
| Phone | Contact number |
| Email | Contact email |
| Website | Official website |
| Description | What type of market (2-3 sentences) |

### Requirements:
- ✅ Minimum 20-30 markets
- ✅ From at least 5 different states/cities
- ✅ Information from reliable sources
- ✅ No duplicates, no empty fields

### Tips:
- Google Search for markets
- Call markets to verify information
- Check official websites, Google Business listings
- Use consistent formatting

---

## SECTION 2: OPENING HOURS & SCHEDULES (2-3 Members)
**Deadline:** Week 2 (same time as Section 1)

### What to Do:
Document opening/closing hours for each market from Section 1

### What to Deliver:
**File:** `MARKET_SCHEDULES.xlsx` (Excel spreadsheet)

| Column | What to Fill | Example |
|--------|--------------|---------|
| Market Name | MUST match Section 1 exactly | Central Farmers Market |
| Monday Hours | Opening - Closing time | 7:00 AM - 2:00 PM |
| Tuesday Hours | Opening - Closing time | 7:00 AM - 2:00 PM |
| Wednesday Hours | Opening - Closing time | 7:00 AM - 2:00 PM |
| Thursday Hours | Opening - Closing time | 7:00 AM - 2:00 PM |
| Friday Hours | Opening - Closing time | 7:00 AM - 4:00 PM |
| Saturday Hours | Opening - Closing time | 6:00 AM - 5:00 PM |
| Sunday Hours | Opening - Closing time or CLOSED | CLOSED |
| Holidays Closed | When market is closed | Dec 25, Jan 1 |
| Special Notes | Any extra info | Extended hours during holidays |

### Requirements:
- ✅ All 7 days filled for each market
- ✅ Market names match Section 1 EXACTLY
- ✅ Consistent time format (AM/PM)
- ✅ Holiday information included
- ✅ No empty cells

### Tips:
- Call markets directly to verify hours
- Use consistent time format
- Note seasonal changes
- Wait for Section 1 to complete first

---

## SECTION 3: DESIGN & VISUAL ASSETS (2-3 Members)
**Deadline:** Week 3

### What to Do:
Create design mockups, color scheme, and collect images/icons

### What to Deliver:
**Folder:** `Design_Assets/` containing:

#### 1. Mockups (Simple wireframes)
```
Mockups/
├── Home_Page_Wireframe
├── Markets_List_Page_Wireframe
├── Market_Details_Page_Wireframe
└── Search_Results_Page_Wireframe
```
- Show layout for 4 pages
- Show where content, buttons, images go
- Simple sketches okay (use Figma, Canva, or hand-drawn)

#### 2. Color Scheme
**File:** `Color_Guide.txt`
```
Primary Color: #2E7D32 (for buttons, headers)
Secondary Color: #FFA500 (for accents)
Text Color: #333333 (dark gray)
Background: #FFFFFF (white)
Fonts: Roboto Bold (headings), Roboto Regular (body)
```

#### 3. Images & Icons
```
Images/
├── 3-5 high-quality market/shopping photos (1200px+ wide)
├── Hero images for home page
└── Featured market images

Icons/
├── 5 category icons (produce, goods, crafts, etc.)
├── 8 functional icons (search, location, print, etc.)
└── All from consistent source (Flaticon, FontAwesome)
```

#### 4. Attribution
**File:** `Attribution.txt`
- List source URL for every image/icon
- Include license information

### Requirements:
- ✅ 4 complete page mockups
- ✅ Color palette with hex codes
- ✅ 3-5 high-quality hero images
- ✅ 5+ category icons + 8+ functional icons
- ✅ Professional and consistent style
- ✅ All sources documented

### Tools (All FREE):
- Figma.com (design mockups)
- Canva.com (design tool)
- Unsplash.com (free images)
- Pexels.com (free images)
- Flaticon.com (free icons)
- FontAwesome.com (free icons)

---

## SECTION 4: TESTING & QUALITY ASSURANCE (2-3 Members)
**Deadline:** Week 5

### What to Do:
Test the website thoroughly to find bugs and ensure quality

### What to Deliver:

#### 1. **File:** `TESTING_CHECKLISTS.xlsx`
Test each page and mark Pass/Fail:

**Home Page Checklist:**
- [ ] Page loads without errors
- [ ] All images display correctly
- [ ] Search box works
- [ ] Navigation menu works
- [ ] Links to other pages work
- [ ] Mobile view looks good

**Markets List Page Checklist:**
- [ ] All markets display
- [ ] Filter by city/state works
- [ ] Sort functionality works
- [ ] Search works
- [ ] Mobile view works
- [ ] Page loads quickly

**Market Details Page Checklist:**
- [ ] Market name displays
- [ ] Hours table shows correctly
- [ ] Google Map displays location
- [ ] Map is interactive
- [ ] Print button works
- [ ] Mobile view works

**Search Functionality Checklist:**
- [ ] Can search by market name
- [ ] Can search by city
- [ ] Results accurate
- [ ] Can click results

**General/Cross-Page Checklist:**
- [ ] Works in Chrome, Firefox, Safari
- [ ] Works on desktop and mobile
- [ ] No broken links
- [ ] No spelling errors
- [ ] No console errors (F12 check)

#### 2. **File:** `BUG_LOG.xlsx`
List every bug found:

```
Bug # | Title | Severity | Page | Description | Status
────────────────────────────────────────────────────────
1 | Search broken | HIGH | Markets List | Search returns no results | REPORTED
2 | Typo | LOW | Home | Says "Openng" instead of "Opening" | REPORTED
3 | Map won't zoom | HIGH | Details | Map zoom not working | REPORTED
```

#### 3. **File:** `TEST_REPORT.docx` or `.pdf`
Professional document with:
- Date tested, who tested
- Browsers tested (Chrome, Firefox, Safari)
- Devices tested (desktop, mobile, tablet)
- Results summary (Pass/Fail for each page)
- List of all bugs found
- Overall recommendation (Ready/Not Ready for submission)

### Bug Severity Levels:

**CRITICAL:** Website crashes, major features broken  
**HIGH:** Important features don't work (search, filter, maps)  
**MEDIUM:** Features work but incorrectly  
**LOW:** Typos, minor visual issues  

### Requirements:
- ✅ Test all 4 pages thoroughly
- ✅ Test on multiple browsers (Chrome, Firefox, Safari)
- ✅ Test on desktop and mobile
- ✅ Document ALL bugs found with details
- ✅ Provide clear Pass/Fail results
- ✅ Professional test report

### Testing Tools (All FREE):
- Browser DevTools (F12 in any browser)
- Google Chrome, Firefox, Safari
- Screenshot tools (built-in)
- Excel/Google Sheets for logging

---

## QUICK TIMELINE

| Week | Section 1 | Section 2 | Section 3 | Section 4 | Tech Lead |
|------|-----------|-----------|-----------|-----------|-----------|
| 1 | Planning | Planning | Planning | Planning | Setup repo |
| 2 | ✅ Deliver data | ✅ Deliver schedules | Start design | - | Code backend |
| 3 | - | - | ✅ Deliver designs | - | Code frontend |
| 4 | - | - | - | - | Integrate all |
| 5 | - | - | - | ✅ Test & report | Fix bugs |
| 6 | - | - | - | - | Final docs |
| 7 | - | - | - | - | ✅ Submit |

---

## KEY POINTS FOR EACH SECTION

### Section 1 (Data Collection)
- Get real market information
- Verify it's accurate
- Fill spreadsheet properly
- Deliver on time

### Section 2 (Schedules)
- Use Section 1's market list
- Match market names EXACTLY
- Get accurate opening hours
- Complete all 7 days per market

### Section 3 (Design)
- Create visual mockups for 4 pages
- Choose professional colors
- Collect high-quality images
- Document all sources

### Section 4 (Testing)
- Test every feature systematically
- Use checklists provided
- Document bugs clearly
- Help identify issues early

### Tech Lead (You)
- Build backend API
- Build frontend pages
- Connect everything together
- Manage GitHub
- Write documentation
- Coordinate team

---

## SUCCESS CRITERIA

✅ **Section 1:** 20-30 markets with complete accurate data  
✅ **Section 2:** Opening hours for all markets from Section 1  
✅ **Section 3:** Professional mockups, colors, images, icons  
✅ **Section 4:** Thorough testing with detailed bug reports  
✅ **Tech Lead:** Fully functional website on GitHub  

---

## IMPORTANT REMINDERS

🚨 **Section 1 & 2:** Market names MUST match exactly!  
🚨 **Section 3:** All images must be properly licensed & attributed  
🚨 **Section 4:** Test thoroughly - find bugs early!  
🚨 **Tech Lead:** Integrate data from Sections 1 & 2 into database  

---

**Each section is independent but all work together. Start on time, communicate progress, and ask for help when needed!**
