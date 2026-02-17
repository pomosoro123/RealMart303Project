// ========================================
// REALMART - Admin Login Module
// ========================================

/**
 * Initialize admin login page
 */
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleAdminLogin);
    }
    
    // Check if user is already logged in as admin with polling for currentUserData
    let pollCount = 0;
    const pollInterval = setInterval(() => {
        pollCount++;
        
        // If user is logged in, wait for currentUserData to load
        if (auth && auth.currentUser) {
            if (currentUserData && currentUserData.role === 'admin') {
                clearInterval(pollInterval);
                window.location.href = 'admin-dashboard.html';
                return;
            }
        }
        
        // Timeout after 5 seconds, allow login page to show
        if (pollCount > 50) {
            clearInterval(pollInterval);
        }
    }, 100);
});

/**
 * Handle admin login form submission
 * @param {Event} event - Form submit event
 */
async function handleAdminLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const loginBtn = document.getElementById('loginBtn');
    const messageDiv = document.getElementById('loginMessage');
    
    try {
        setButtonLoading(loginBtn, 'Logging in...');
        
        // Login with email and password
        await loginWithEmail(email, password);
        
        // Show success message and redirect
        showLoginMessage('Login successful! Redirecting...', 'success');
        setTimeout(() => {
            window.location.href = 'admin-dashboard.html';
        }, 1500);
        
    } catch (error) {
        const errorMessage = getErrorMessage(error.code);
        showLoginMessage(errorMessage, 'error');
        console.error('Login error:', error);
        resetButtonLoading(loginBtn);
    }
}

/**
 * Show login message
 * @param {string} message - Message to show
 * @param {string} type - Message type (success, error)
 */
function showLoginMessage(message, type) {
    const messageDiv = document.getElementById('loginMessage');
    if (messageDiv) {
        messageDiv.textContent = message;
        messageDiv.className = `login-message ${type} show`;
        messageDiv.classList.remove('hidden');
        
        if (type === 'error') {
            messageDiv.style.color = '#e74c3c';
        } else if (type === 'success') {
            messageDiv.style.color = '#27ae60';
        }
    }
}

/**
 * Handle forgot password
 * @param {Event} event - Click event
 */
async function handleForgotPassword(event) {
    event.preventDefault();
    
    const email = prompt('Enter your email address:');
    if (!email) return;
    
    try {
        await sendPasswordResetEmail(email);
        showLoginMessage('Password reset email sent! Check your inbox.', 'success');
    } catch (error) {
        const errorMessage = getErrorMessage(error.code);
        showLoginMessage(errorMessage, 'error');
    }
}

console.log('Admin login module loaded');
