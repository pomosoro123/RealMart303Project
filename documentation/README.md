# FutaMart - Market Days & Opening Schedule Website

**ICT303 Group 7 - Web Application Development Project**

## Project Overview

**FutaMart** is a comprehensive web application that helps users find markets, their opening hours, and locations by state/city. The platform features a responsive design, powerful search and filtering capabilities, and Google Maps integration to display market locations.

**GitHub Repository:** https://github.com/pomosoro123/FutaMart303Project

## Key Features

- ✅ **Market Directory** - Browse all markets by state and city
- ✅ **Opening Hours** - View detailed opening hours for each market
- ✅ **Search Functionality** - Search markets by name, city, or state
- ✅ **Advanced Filtering** - Filter markets by location
- ✅ **Google Maps Integration** - See exact market locations on interactive maps
- ✅ **Printable Schedules** - Print market opening schedules
- ✅ **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- ✅ **Admin Panel** - Add new markets (admin only)

## Tech Stack

### Frontend
- HTML5 (Semantic markup)
- CSS3 (Responsive design)
- JavaScript (Vanilla JS - no frameworks)
- Google Maps API

### Backend
- Java 11+
- Spring Boot 2.x
- Spring Web
- Firebase Admin SDK

### Database
- Firebase Firestore (NoSQL)

### Version Control
- Git & GitHub

## Project Structure

```
market-website/
├── frontend/                 # Frontend files
│   ├── index.html           # Home page
│   ├── markets.html         # Markets list page
│   ├── market-details.html  # Market details page
│   ├── search.html          # Search results page
│   ├── css/                 # Stylesheets
│   ├── js/                  # JavaScript files
│   └── assets/              # Images and icons
│
├── backend/                 # Java backend
│   ├── src/
│   ├── pom.xml
│   └── README.md
│
├── docs/                    # Documentation
│   ├── API_DOCUMENTATION.md
│   ├── DEVELOPMENT_GUIDE.md
│   ├── DEPLOYMENT_GUIDE.md
│   └── DATABASE_SCHEMA.md
│
├── firebase/                # Firebase configuration
│   ├── firestore-rules.txt
│   └── firebase-config.json
│
├── .gitignore
├── README.md
└── TODO.md                  # Project task list
```

## Getting Started

### Prerequisites
- Git
- Java 11 or higher
- Maven
- Node.js (optional, for frontend tools)
- Firebase account

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/market-website.git
   cd market-website
   ```

2. **Set up Firebase:**
   - Create Firebase project
   - Set up Firestore database
   - Download Firebase credentials
   - Place serviceAccountKey.json in backend folder

3. **Run Backend:**
   ```bash
   cd backend
   mvn spring-boot:run
   ```
   Backend will run on `http://localhost:8080`

4. **Run Frontend:**
   - Open `frontend/index.html` in web browser
   - Or use a local server: `python -m http.server 8000`

## Pages

### 1. **Home Page** (`index.html`)
- Welcome message
- Search bar
- Featured markets
- Navigation menu

### 2. **Markets List** (`markets.html`)
- All markets displayed in grid/list
- Filter by city/state
- Sort options
- Pagination

### 3. **Market Details** (`market-details.html`)
- Complete market information
- Opening hours table
- Google Map showing location
- Contact information
- Print schedule button

### 4. **Search Results** (`search.html`)
- Search results displayed
- Results count
- Clickable market cards

## API Endpoints

### Public Endpoints
- `GET /api/markets` - Get all markets
- `GET /api/markets/{id}` - Get specific market
- `GET /api/markets/search?q=query` - Search markets
- `GET /api/markets/filter?city=&state=` - Filter markets
- `GET /api/markets/{id}/schedules` - Get market schedule

### Admin Endpoints (Authentication Required)
- `POST /api/markets` - Create new market
- `PUT /api/markets/{id}` - Update market
- `DELETE /api/markets/{id}` - Delete market
- `POST /api/auth/login` - Admin login

## Team Contributions

- **Section 1** - Market data collection (20-30 markets)
- **Section 2** - Opening hours and schedules
- **Section 3** - Design, mockups, images, and icons
- **Section 4** - Testing and Quality Assurance
- **Technical Lead** - Backend, frontend, integration, documentation

## Development Timeline

- **Week 1** - Project setup, GitHub, Firebase
- **Week 2** - Backend API development
- **Week 3** - Frontend development
- **Week 4** - Google Maps integration, data import
- **Week 5** - Testing and bug fixes
- **Week 6** - Documentation
- **Week 7** - Final submission

## Documentation

Detailed documentation available in `docs/` folder:
- [API Documentation](docs/API_DOCUMENTATION.md)
- [Development Guide](docs/DEVELOPMENT_GUIDE.md)
- [Deployment Guide](docs/DEPLOYMENT_GUIDE.md)
- [Database Schema](docs/DATABASE_SCHEMA.md)

## Troubleshooting

**Backend not starting?**
- Check Java installation: `java -version`
- Check Maven installation: `mvn -version`
- Verify Firebase credentials are set up

**Frontend not loading?**
- Clear browser cache (Ctrl+Shift+Delete)
- Check console for errors (F12)
- Ensure backend is running

**Maps not showing?**
- Verify Google Maps API key is valid
- Check API key has Maps API enabled
- Ensure domain is authorized

## License

This project is created for educational purposes as part of ICT303 course.

## Contact

For questions or issues, contact the technical lead.

---

**Status:** In Development (Phase 1 - Setup)  
**Last Updated:** January 30, 2026
