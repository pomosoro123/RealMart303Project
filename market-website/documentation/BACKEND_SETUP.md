# Spring Boot Backend Setup - Task 3

**Status:** ✅ Project Structure Created  
**Date:** January 30, 2026

## What's Been Created

### 1. Maven Configuration (pom.xml)
- Spring Boot 2.7.14 starter
- Firebase Admin SDK integration
- JWT (jjwt) for authentication
- Spring Security
- BCrypt for password hashing
- Lombok for boilerplate reduction

### 2. Application Configuration (application.properties)
- Server running on port 8080
- Firebase configuration placeholders
- JWT secret (to be changed in production)
- CORS settings for frontend
- Logging configuration

### 3. Main Application Class
- FutaMartApplication.java - Spring Boot entry point
- CORS configuration bean

### 4. Health Check Controller
- GET /api/health - Returns API status
- GET /api/ - Returns API info

### 5. Project Structure
Created Java package structure:
```
src/main/java/com/futamart/
├── FutaMartApplication.java
├── controller/
│   └── HealthController.java
├── service/
├── repository/
├── model/
├── security/
└── util/
```

## Next Steps

### Option 1: Use Maven (Recommended)
1. Install Maven from: https://maven.apache.org/download.cgi
2. Add Maven to system PATH
3. Run:
   ```bash
   cd backend
   mvn clean install
   mvn spring-boot:run
   ```

### Option 2: Use IDE (Easier)
If you have IntelliJ IDEA or Eclipse:
1. Open the `backend` folder as a Maven project
2. Let IDE download dependencies
3. Right-click FutaMartApplication.java → Run

### Option 3: Use Spring Boot CLI
1. Install Spring Boot CLI
2. Run: `spring boot run`

## Project Details

**Base Package:** com.futamart  
**Server Port:** 8080  
**Java Version:** 11  
**Spring Boot Version:** 2.7.14

## Test the API

Once running, test with:
```bash
# Health check
curl http://localhost:8080/api/health

# API info
curl http://localhost:8080/api/
```

## Next Tasks

- [ ] Task 4: Create Market model class
- [ ] Task 5: Create Schedule model class
- [ ] Task 6: Create User model class
- [ ] Task 7: Create utility classes
- [ ] Task 8: Create repository interfaces
- [ ] Task 9: Create service classes
- [ ] Task 10: Create REST controllers
- [ ] Task 11: Implement JWT security

## Notes

⚠️ **Important:**
- Change `jwt.secret` in application.properties before production
- Add Firebase credentials file before running
- Frontend CORS origins may need adjustment based on your setup
