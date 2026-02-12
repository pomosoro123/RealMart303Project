# SECTION 4: TESTING & QUALITY ASSURANCE

**Team Members:** 2-3 Members  
**Deadline:** Week 5 (1 week before final submission)  
**Project:** Market Days & Opening Schedule Website (ICT303 Group 7)

---

## WHAT YOU'RE DOING

You are testing the website to make sure everything works correctly, catching bugs and issues before we submit. Think of yourself as quality control - you're making sure the product is perfect before delivery.

---

## YOUR THREE MAIN DELIVERABLES

### Deliverable 1: Completed Testing Checklists
### Deliverable 2: Bug Log (Spreadsheet)
### Deliverable 3: Test Report (Document)

---

# PART 1: TESTING CHECKLISTS

## HOW TO TEST

### Step 1: Get the Website
- The technical lead will give you access to test the website
- It will be either:
  - A link to a website (if deployed online)
  - Instructions to run it locally on your computer
  - A folder with all files to open in your browser

### Step 2: Open in Multiple Browsers
Test on at least:
- Google Chrome
- Mozilla Firefox
- Safari (if using Mac)

### Step 3: Test on Multiple Devices
- Desktop computer
- Tablet (if available)
- Mobile phone

### Step 4: Use Developer Tools
- Press F12 to open Developer Tools
- Go to "Console" tab
- Look for red error messages
- Report any errors you see

### Step 5: Test Each Feature
Go through checklists below systematically

---

## CHECKLIST 1: HOME PAGE TESTING

Test these features on the home page and check each one:

```
HOME PAGE - GENERAL APPEARANCE
☐ Page loads without any errors
☐ Page loads in reasonable time (within 3 seconds)
☐ All text is readable (not too small, good color contrast)
☐ No text is cut off or overlapping
☐ Website looks clean and professional
☐ Page scrolls smoothly without jumping or freezing

HOME PAGE - CONTENT & IMAGES
☐ All images display correctly (no broken image icons)
☐ All images are properly sized (not stretched or tiny)
☐ Welcome message is clear and inviting
☐ Featured markets section displays properly
☐ Featured market images load correctly
☐ All text content is spelled correctly (no typos)
☐ All text content is grammatically correct

HOME PAGE - FUNCTIONALITY
☐ Search bar is visible and easy to find
☐ Search bar is clickable (you can type in it)
☐ Navigation menu is present
☐ All navigation menu links work and go to correct pages
☐ Buttons have hover effects (change color when mouse hovers)
☐ Links to other pages work correctly
☐ "View All Markets" or similar button works

HOME PAGE - MOBILE APPEARANCE
☐ Page looks good on phone screen (not too narrow)
☐ Text is readable on small screen
☐ Images scale properly on mobile
☐ Navigation menu works on mobile (may be hamburger menu)
☐ Search bar is accessible on mobile
☐ No horizontal scrolling needed (page fits on screen)

HOME PAGE - ACCESSIBILITY
☐ Page is usable with keyboard only (Tab through links)
☐ Buttons and links are large enough to click
☐ Images have alternative text descriptions
☐ Color contrast is good (dark text on light background)
```

---

## CHECKLIST 2: MARKETS LIST PAGE TESTING

Test the page that shows all markets:

```
MARKETS LIST - DISPLAY
☐ Page loads without errors
☐ All markets from database are displayed
☐ Each market shows: name, city, opening status
☐ Market information displays correctly
☐ No duplicate markets shown
☐ Markets are organized in clear format (grid or list)
☐ Page scrolls smoothly
☐ All images in list display correctly

MARKETS LIST - SEARCH & FILTER
☐ Filter by city/state works correctly
☐ Filter options are clearly labeled
☐ Dropdown filters open and close properly
☐ Selecting filter updates the list
☐ Search box searches by market name
☐ Partial searches work (e.g., "farm" finds "farmers market")
☐ Search is case-insensitive (doesn't matter if uppercase)
☐ Search results are accurate
☐ Clearing search shows all markets again

MARKETS LIST - SORTING
☐ Can sort by market name A-Z
☐ Can sort by market name Z-A
☐ Can sort by city
☐ Sorting works correctly
☐ Sorted results display properly

MARKETS LIST - INTERACTION
☐ "View Details" button visible for each market
☐ "View Details" button is clickable
☐ Clicking "View Details" goes to market details page
☐ Each market has correct details link

MARKETS LIST - PERFORMANCE
☐ Page loads all 20-30 markets quickly (under 3 seconds)
☐ Filtering doesn't cause lag
☐ Searching doesn't cause lag
☐ Sorting doesn't cause lag
☐ No freezing or unresponsiveness

MARKETS LIST - MOBILE
☐ Markets display properly on mobile
☐ Filter dropdown works on mobile
☐ Search works on mobile
☐ "View Details" buttons are large enough on mobile
☐ Can scroll through list on mobile
☐ No horizontal scrolling needed

MARKETS LIST - QUALITY
☐ No broken images or icons
☐ Text formatting is consistent
☐ No spelling errors
☐ No grammar errors
☐ Font sizes are consistent
```

---

## CHECKLIST 3: MARKET DETAILS PAGE TESTING

Test the page that shows full information about one market:

```
MARKET DETAILS - CONTENT DISPLAY
☐ Page loads without errors
☐ Market name displays clearly and prominently
☐ Complete address shows correctly
☐ Phone number displays
☐ Email displays (if available)
☐ Website link shows (if available)
☐ Market description displays
☐ No information is cut off or missing

MARKET DETAILS - OPENING HOURS
☐ Hours table displays correctly
☐ All 7 days of the week are shown
☐ Hours format is consistent and clear
☐ Holiday closures are listed
☐ Special notes display properly
☐ No empty cells in hours
☐ Current day is highlighted or marked
☐ Table is easy to read on desktop and mobile

MARKET DETAILS - GOOGLE MAP
☐ Google Map displays on the page
☐ Map shows correct location (correct city/area)
☐ Market location is marked with pin/marker
☐ Map is interactive (can zoom in/out)
☐ Map is interactive (can pan/drag)
☐ Map info window shows when you click the pin
☐ Map doesn't have error messages
☐ Map loads quickly
☐ Map displays on mobile (may be smaller)

MARKET DETAILS - CONTACT FUNCTIONALITY
☐ Phone number is clickable on mobile (tel: link)
☐ Email is clickable (opens email composer)
☐ Website link is clickable and works
☐ Links are clearly marked/underlined

MARKET DETAILS - BUTTONS
☐ "Print Schedule" button is visible
☐ "Print Schedule" button is clickable
☐ "Print Schedule" opens print dialog
☐ Print preview shows formatted schedule
☐ "Back" button is present
☐ "Back" button takes you back to previous page
☐ Buttons have hover effects

MARKET DETAILS - NAVIGATION
☐ Navigation menu is present and works
☐ Can navigate to other pages from here
☐ Breadcrumb navigation shows (if applicable)
☐ No broken links

MARKET DETAILS - MOBILE
☐ Page displays well on mobile phone
☐ Text is readable on small screen
☐ Map displays on mobile (not broken)
☐ Hours table displays on mobile
☐ All buttons work on mobile
☐ Can scroll vertically to see all content
☐ No horizontal scrolling needed

MARKET DETAILS - QUALITY
☐ No spelling errors in market information
☐ No grammar errors
☐ Information matches Section 1 & 2 data
☐ All information is accurate and current
☐ Professional appearance
```

---

## CHECKLIST 4: SEARCH FUNCTIONALITY TESTING

Test the search feature across all pages:

```
SEARCH FUNCTIONALITY
☐ Search box appears on home page
☐ Search box accepts text input
☐ Can search by market name
☐ Can search by city name
☐ Can search by state name
☐ Search results are accurate
☐ Search is case-insensitive
☐ Partial searches work correctly
☐ Search with no results shows "No results found"
☐ Empty search shows all markets
☐ Search results page displays properly
☐ Can click on search result to view details
☐ Searching works from multiple pages
☐ Search history is cleared appropriately
☐ Typos don't break search

SEARCH RESULTS PAGE
☐ Page shows search term that was used
☐ Page shows number of results found
☐ Results are formatted like markets list
☐ Each result is clickable
☐ Results are accurate
☐ Can filter results on results page
☐ Can do new search from results page
```

---

## CHECKLIST 5: GENERAL / CROSS-PAGE TESTING

Test features that span the whole website:

```
NAVIGATION & LINKING
☐ Home page link works from all pages
☐ "Markets List" link works from all pages
☐ All navigation links work correctly
☐ No broken links anywhere on site
☐ Links open correct pages
☐ Back button works (browser back button)

BROWSER COMPATIBILITY
☐ Works in Chrome
☐ Works in Firefox
☐ Works in Safari
☐ Works in Edge (if available)
☐ All features work in all browsers
☐ No console errors in any browser

RESPONSIVE DESIGN
☐ Works on 1920px wide screen (desktop)
☐ Works on 1024px wide screen (tablet)
☐ Works on 768px wide screen (tablet)
☐ Works on 375px wide screen (mobile)
☐ Layout changes appropriately for different sizes
☐ Text remains readable at all sizes
☐ Images scale properly at all sizes
☐ Navigation works on all screen sizes

PERFORMANCE
☐ Pages load quickly (under 3 seconds)
☐ No lag when clicking buttons
☐ No lag when scrolling
☐ No lag when searching/filtering
☐ Website is responsive (doesn't freeze)

VISUAL CONSISTENCY
☐ Colors are consistent across all pages
☐ Fonts are consistent across all pages
☐ Button styles are consistent
☐ Layout style is consistent
☐ Spacing/margins are consistent
☐ Icons are consistent style
☐ Professional appearance throughout

CONTENT & SPELLING
☐ No typos on any page
☐ No grammar errors
☐ All text is readable
☐ Font sizes are appropriate
☐ Text contrast is good
☐ No broken text formatting

DATABASE & DATA
☐ Market data matches what was provided
☐ Schedule data matches what was provided
☐ All 20-30 markets are in database
☐ No missing information
☐ Data loads correctly from database
☐ Data persists (doesn't disappear on refresh)

ACCESSIBILITY
☐ Can navigate using Tab key only
☐ All clickable elements are accessible
☐ Images have alt text
☐ Color isn't the only way to convey info
☐ Links are underlined or marked
☐ Buttons are clearly visible
☐ Forms are labeled correctly

SECURITY
☐ No sensitive data exposed in console
☐ No API keys visible in code
☐ No passwords displayed
☐ Database rules prevent unauthorized access
```

---

# PART 2: BUG REPORTING

## What Is a Bug?

A bug is anything that doesn't work as expected:
- Feature doesn't work (button doesn't click)
- Feature works wrong (search returns wrong results)
- Information is missing
- Spelling/grammar errors
- Visual glitches (image broken, text overlapping)
- Performance problems (very slow)

---

## HOW TO REPORT BUGS

### Step 1: Identify the Bug
Use the checklists above - if something fails a check, it's a bug!

### Step 2: Gather Information
Note down:
- What page were you on?
- What were you trying to do?
- What happened instead?
- Did you get an error message?
- Can you reproduce it (make it happen again)?

### Step 3: Document the Bug
Fill out a bug report with:
- **Bug Number:** BUG #1, BUG #2, etc.
- **Title:** Short description of problem
- **Severity:** How serious is it?
- **Description:** Detailed explanation
- **Where Found:** Which page?
- **Steps to Reproduce:** How to make it happen again
- **Expected Result:** What should happen
- **Actual Result:** What actually happened

---

## BUG REPORT TEMPLATE

Use this template for each bug you find:

```
BUG #1
────────────────────────────────────────
Title: 
Markets list not showing all markets

Severity: 
HIGH (major feature broken)

Where Found: 
Markets List page

Description:
When I go to the Markets List page, only 10 markets 
display instead of all 30. The rest are missing.

Steps to Reproduce:
1. Go to Home page
2. Click "View All Markets" button
3. Go to Markets List page
4. Scroll down
5. Only 10 markets visible, not 30

Expected Result:
Should display all 30 markets from database

Actual Result:
Only 10 markets display, need to scroll or paginate to see more

Additional Notes:
This happens on both desktop and mobile views


BUG #2
────────────────────────────────────────
Title: 
Typo on home page

Severity: 
LOW (spelling only)

Where Found: 
Home page - Featured markets section

Description:
The heading says "Openng hours" instead of "Opening hours"

Steps to Reproduce:
1. Go to Home page
2. Look at featured markets section
3. See typo in heading

Expected Result:
Should say "Opening hours"

Actual Result:
Says "Openng hours"

Additional Notes:
Minor spelling error, not critical but should be fixed
```

---

## BUG SEVERITY LEVELS

### CRITICAL (Report immediately!)
- Website crashes or doesn't load
- Major features completely broken
- Data loss or corruption
- Security vulnerabilities
- Blocks other testing

### HIGH (Important, fix soon)
- Core features don't work
- Search doesn't work
- Filtering doesn't work
- Maps don't display
- Database not loading
- Responsive design broken

### MEDIUM (Should fix)
- Feature works but incorrectly
- Performance problems
- Buttons have styling issues
- Information displays wrong
- Navigation has problems

### LOW (Nice to fix)
- Spelling/grammar errors
- Minor visual issues
- Color slightly off
- Font size slightly wrong
- Not urgent but should clean up

---

# PART 3: TEST REPORT DOCUMENT

## What to Create

Create a Word document (.docx) or PDF with:

1. **Cover Page**
   - Project name
   - Testing date
   - Team members who tested
   - Version tested

2. **Executive Summary**
   - Total checklists completed
   - Total bugs found
   - Overall status (Pass/Fail)
   - Recommendation (Ready for submission / Not ready)

3. **Testing Details**
   - Browsers tested
   - Devices tested
   - Test environment
   - Testing methodology

4. **Results Summary**
   - Checklist completion: Home Page (Pass/Fail)
   - Checklist completion: Markets List (Pass/Fail)
   - Checklist completion: Market Details (Pass/Fail)
   - Checklist completion: Search (Pass/Fail)
   - Checklist completion: General (Pass/Fail)

5. **Bugs Found**
   - Total bugs found: [number]
   - Critical bugs: [number]
   - High bugs: [number]
   - Medium bugs: [number]
   - Low bugs: [number]
   - Details of each bug (use BUG template above)

6. **Testing Conclusion**
   - Overall assessment
   - Ready for submission? Yes/No
   - Major issues blocking submission?
   - Recommendations

7. **Appendix**
   - Complete bug list
   - Detailed test results
   - Screenshots of issues (if applicable)

---

# DELIVERABLES

## What to Submit in Week 5

### Deliverable 1: `TESTING_CHECKLISTS.xlsx`
- Excel spreadsheet with all checklists
- One sheet per page (Home, Markets List, Market Details, Search, General)
- Each sheet has checklist items with Pass/Fail marked
- Show which items passed and which failed
- Include date tested and who tested

**Example format:**
```
Feature | Status | Notes
─────────────────────────────────────
Page loads without errors | PASS | 
All images display correctly | PASS |
Search box works | FAIL | Search returns no results
```

### Deliverable 2: `BUG_LOG.xlsx`
- Excel spreadsheet listing all bugs found
- Columns: Bug #, Title, Severity, Page, Description, Status

**Example:**
```
Bug # | Title | Severity | Page | Description | Status
─────────────────────────────────────────────────────────
1 | Markets not displaying | HIGH | Markets List | Only shows 10 of 30 | REPORTED
2 | Typo in heading | LOW | Home | Says "Openng" | REPORTED
```

### Deliverable 3: `TEST_REPORT.docx` or `TEST_REPORT.pdf`
- Professional document with all testing information
- Include summary of results
- Include recommendations
- Include all bugs found with details
- Include conclusion about readiness

---

## QUALITY CHECKLIST FOR TESTING

Before submitting your testing work:

- [ ] Tested on at least 2 different browsers
- [ ] Tested on desktop and mobile
- [ ] All 5 checklists completed
- [ ] All checklist items marked as Pass or Fail
- [ ] All bugs documented with full details
- [ ] Bug log properly formatted and complete
- [ ] Test report is professional and clear
- [ ] Test report includes recommendations
- [ ] All deliverables submitted on time
- [ ] Work is thorough and complete

---

## TESTING TIMELINE

- **Week 1-4:** Technical lead builds website
- **Week 4:** Website ready for testing (provided to you)
- **Week 5 Early:** You receive website and begin testing
- **Week 5 Mid:** Complete all checklists
- **Week 5 Mid:** Report all bugs found
- **Week 5 Late:** Technical lead fixes critical bugs
- **Week 5 End:** Submit final test report

---

## IMPORTANT NOTES

### Be Thorough
- Don't rush through testing
- Test every feature mentioned in checklist
- Test on multiple devices and browsers
- Try to break things - that's your job!

### Be Professional
- Document everything clearly
- Use proper bug report format
- Be objective (don't say "this sucks", say "feature X doesn't work")
- Be constructive (help the developer fix it)

### Be Helpful
- Detailed bug reports help developers fix problems faster
- Clear notes help identify patterns
- Specific steps help reproduce issues
- Your work ensures quality

### Communicate Issues Early
- If you find critical bugs, tell the team immediately
- Don't wait until deadline
- Help problem-solve together
- Work as a team

---

## WHAT MAKES GOOD TESTING

✅ **Good Testing:**
- Systematic (follows checklists)
- Thorough (tests everything)
- Detailed (documents findings clearly)
- Professional (properly formatted)
- Helpful (aids in fixing issues)
- Timely (reports issues early)

❌ **Bad Testing:**
- Haphazard (no system, random clicking)
- Incomplete (misses features)
- Vague (no clear notes about problems)
- Unprofessional (poor documentation)
- Unhelpful (criticizes without details)
- Late (finds issues at deadline)

---

## TOOLS YOU NEED

### Browser Developer Tools (FREE, built-in)
- Press F12 to open
- Check "Console" tab for errors
- Check "Network" tab for loading issues
- Use "Device Emulation" for mobile testing

### Screenshots
- Windows: Press PrtScn to capture screen
- Mac: Cmd+Shift+3 to capture
- Use built-in snipping tools
- Annotate with issues you find

### Spreadsheet Software
- Microsoft Excel
- Google Sheets (free)
- LibreOffice Calc (free)

### Document Creation
- Microsoft Word
- Google Docs (free)
- LibreOffice Writer (free)

---

## FREQUENTLY ASKED QUESTIONS

**Q: What if I'm not technical enough to test?**  
A: You don't need to be! Just use the checklists - they tell you exactly what to test.

**Q: What if I find something that seems like a bug but I'm not sure?**  
A: Report it! Let the developers decide. Better to report and be wrong than miss a real bug.

**Q: Can I test just on my phone?**  
A: Desktop and mobile are both important. Test on both if possible.

**Q: What if the website isn't ready by week 5?**  
A: Talk to the technical lead. You may start testing partial features.

**Q: Can I help fix bugs?**  
A: Your job is to find and report them. The technical lead will fix them.

**Q: What if everything passes testing?**  
A: Great! Report that everything works. The website is ready to submit!

---

## SUCCESS CRITERIA

Your testing is successful when:

✅ All pages are tested thoroughly  
✅ All features are tested on multiple devices/browsers  
✅ All bugs are documented clearly  
✅ Test report is professional and complete  
✅ Recommendations are provided  
✅ Technical lead can use your reports to fix issues  
✅ Work is submitted on time  

---

## CONTACT & SUPPORT

- Ask team lead if unclear about anything
- Coordinate with developer about critical bugs
- Share testing progress regularly
- Don't test alone - work as a team
- Ask questions anytime!

---

**Ready to test? Download the checklists and begin! Your thorough testing makes our project excellent! 🧪**
