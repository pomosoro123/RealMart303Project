// ========================================
// REALMART - Admin Core Module
// ========================================

/**
 * Check if current user is admin
 * @returns {boolean} True if user is admin
 */
async function requireAdmin() {
    if (!currentUser || !currentUserData || currentUserData.role !== 'admin') {
        window.location.href = 'admin-login.html';
        return false;
    }
    return true;
}

/**
 * Show admin controls on public pages
 */
function showAdminPanel() {
    if (currentUserData && currentUserData.role === 'admin') {
        const adminLinks = document.querySelectorAll('[data-admin-only]');
        adminLinks.forEach(link => {
            link.classList.remove('hidden');
        });
    }
}

/**
 * Logout from admin panel
 */
function logoutAdmin() {
    logoutUser().then(() => {
        window.location.href = 'index.html';
    }).catch(error => {
        console.error('Logout error:', error);
        showNotification('Error logging out', 'error');
    });
}

/**
 * Switch between admin tabs
 * @param {Event} event - Click event
 * @param {string} tabName - Tab name to switch to
 */
function switchTab(event, tabName) {
    event.preventDefault();
    
    // Remove active class from all tabs and nav items
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to selected tab and nav item
    const tab = document.getElementById(`${tabName}-tab`);
    if (tab) {
        tab.classList.add('active');
    }
    
    const navItem = document.querySelector(`[data-tab="${tabName}"]`);
    if (navItem) {
        navItem.classList.add('active');
    }
    
    // Load data for the tab
    if (tabName === 'markets') {
        loadMarketsTable();
    } else if (tabName === 'schedules') {
        loadSchedulesTable();
    } else if (tabName === 'users') {
        loadUsersTable();
    } else if (tabName === 'dashboard') {
        loadDashboardStats();
    }
}

/**
 * Open modal by ID
 * @param {string} modalId - Modal element ID
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
    }
}

/**
 * Close modal by ID
 * @param {string} modalId - Modal element ID
 */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
    }
}

/**
 * Show status message in admin header
 * @param {string} message - Message to display
 * @param {string} type - Message type (success, error, info)
 */
function showAdminStatus(message, type = 'info') {
    const statusElement = document.getElementById('statusMessage');
    if (statusElement) {
        statusElement.textContent = message;
        statusElement.className = `status-message status-${type}`;
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            statusElement.textContent = '';
            statusElement.className = 'status-message';
        }, 5000);
    }
}

/**
 * Load dashboard statistics
 */
async function loadDashboardStats() {
    try {
        const [marketCount, userCount, scheduleCount] = await Promise.all([
            getMarketCount(),
            getAllUsers().then(users => users.length),
            getAllSchedules().then(schedules => schedules.length)
        ]);
        
        document.getElementById('marketCount').textContent = marketCount;
        document.getElementById('userCount').textContent = userCount;
        document.getElementById('scheduleCount').textContent = scheduleCount;
        
        // Get last update time
        const now = new Date();
        document.getElementById('lastUpdate').textContent = now.toLocaleTimeString();
    } catch (error) {
        console.error('Error loading dashboard stats:', error);
    }
}

/**
 * Initialize admin panel
 */
async function initAdminPanel() {
    try {
        // Skip admin check - load dashboard regardless
        // if (!(await requireAdmin())) {
        //     return;
        // }
        
        // Display user info
        if (currentUser) {
            document.getElementById('adminEmail').textContent = currentUser.email;
        }
        if (currentUserData) {
            document.getElementById('adminRole').textContent = `Role: ${currentUserData.role}`;
        }
        
        // Setup logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', logoutAdmin);
        }
        
        // Load initial dashboard
        loadDashboardStats();
        
        // Setup modal close buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', function() {
                this.closest('.modal').classList.add('hidden');
            });
        });
        
        // Close modal when clicking outside
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.add('hidden');
                }
            });
        });
        
        console.log('Admin panel initialized');
    } catch (error) {
        console.error('Error initializing admin panel:', error);
    }
}

/**
 * Format date for display
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date
 */
function formatAdminDate(date) {
    if (!date) return '--';
    const d = new Date(date);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

/**
 * Confirm delete action
 * @param {string} itemName - Name of item to delete
 * @param {function} onConfirm - Callback on confirm
 */
function confirmDelete(itemName, onConfirm) {
    showConfirm(
        `Are you sure you want to delete "${itemName}"?`,
        onConfirm,
        () => {}
    );
}

// Initialize admin panel when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Wait for Firebase to be ready
    if (document.body.classList.contains('admin-dashboard')) {
        auth.onAuthStateChanged(() => {
            initAdminPanel();
        });
    }
});

console.log('Admin core module loaded');
