# Setting Up GitHub Repository - Step-by-Step Guide

**Status:** Ready to create GitHub repo  
**Time to Complete:** 10-15 minutes

---

## STEP 1: Create GitHub Account (if needed)

If you don't have a GitHub account:
1. Go to https://github.com
2. Click "Sign up"
3. Follow the registration steps
4. Verify your email

---

## STEP 2: Create New Repository on GitHub

1. Log in to GitHub: https://github.com
2. Click the **+** icon in top right corner
3. Select **"New repository"**
4. Fill in repository details:

   **Repository name:** `market-website` (or similar)
   
   **Description:** "Market Days and Opening Schedule Website - ICT303 Group 7"
   
   **Visibility:** PUBLIC (required for this project!)
   
   **Initialize this repository with:**
   - ✅ Add a README file
   - ✅ Add .gitignore (choose Java)
   - (You already have .gitignore locally, so optional)
   
5. Click **"Create repository"**

---

## STEP 3: Connect Local Repository to GitHub

Open terminal/command prompt in your project folder:

```powershell
cd c:\Projects\303Project\market-website
```

### Configure Git (First Time Only)
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Initialize Local Git Repository
```bash
git init
git add .
git commit -m "Initial project setup - directory structure and .gitignore"
```

### Connect to GitHub (Replace with your repo URL)
```bash
git remote add origin https://github.com/YOUR_USERNAME/market-website.git
git branch -M main
git push -u origin main
```

**Note:** Copy the actual repository URL from GitHub. It will look like:
```
https://github.com/yourname/market-website.git
```

---

## STEP 4: Verify Setup

1. Go back to your GitHub repository page
2. You should see:
   - Your files (README.md, .gitignore)
   - One commit showing "Initial project setup"

---

## STEP 5: Make Repository Public & Shareable

1. Go to repository **Settings** (gear icon)
2. Scroll to **Danger Zone**
3. Verify it shows "Public" (if not, change it)
4. Copy your repository URL: `https://github.com/YOUR_USERNAME/market-website`

---

## STEP 6: Add GitHub Link to Documentation

Update these files with your GitHub link:
- `market-website/README.md` - Replace placeholder with actual link
- Later: Add to presentation slides
- Later: Add to final project report

---

## Git Commands You'll Use Frequently

```bash
# Check status
git status

# Add changes
git add .

# Commit changes
git commit -m "Description of what you changed"

# Push to GitHub
git push

# Pull latest changes
git pull

# View commit history
git log

# Create a tag
git tag -a v0.1 -m "Version 0.1 - Backend complete"
git push origin v0.1
```

---

## Commit Strategy

Make commits after each major task:
1. Initial setup (✅ Already done)
2. Task 2 - Firebase setup
3. Task 3 - Backend project setup
4. Task 4 - Model classes
5. Task 5 - Repositories
6. Task 6 - Services
7. Task 7 - Controllers
8. Task 8 - Auth service
9. ... and so on

**Rule:** At least 15 commits by end of project!

---

## Repository Structure on GitHub

After completing Task 1, your repo should show:

```
market-website/
├── .gitignore
├── README.md
├── frontend/
├── backend/
├── docs/
└── firebase/
```

---

## Your GitHub Link

Once created, your link will be:

```
https://github.com/YOUR_USERNAME/market-website
```

**Save this URL** - you'll need it for:
- Final presentation
- Project report
- Team coordination

---

## Troubleshooting

**Error: "Permission denied" when pushing?**
- Make sure you're using HTTPS URL (not SSH)
- Or set up SSH keys

**Error: "fatal: not a git repository"?**
- Make sure you're in the right directory
- Run `git init` first

**Files not showing on GitHub?**
- Check files are actually in the directory
- Run `git status` to see what needs committing
- Run `git push` to upload changes

---

## What's Next?

After Task 1 is complete:
- ✅ GitHub repository created and linked
- ✅ Local project structure ready
- ✅ .gitignore configured
- ✅ Initial commit pushed

**Next Task:** Task 2 - Configure Firebase Project

---

**CHECKLIST:**

- [ ] GitHub account created
- [ ] Repository created on GitHub
- [ ] Local repository initialized (`git init`)
- [ ] Files committed locally (`git commit`)
- [ ] Repository pushed to GitHub (`git push`)
- [ ] Repository is PUBLIC
- [ ] GitHub link saved
- [ ] README.md updated with GitHub link
- [ ] Ready to move to Task 2

---

**You're ready to start coding! Good luck! 🚀**
