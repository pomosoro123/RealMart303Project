// ========================================
// REALMART - Admin Dashboard Module
// ========================================

/**
 * Initialize admin dashboard
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('Admin dashboard loaded');
    
    // Initialize dashboard directly without any checks
    initAdminPanel();
    setupScheduleForm();
});

/**
 * Setup schedule form with day inputs
 */
function setupScheduleForm() {
    const scheduleForm = document.getElementById('scheduleForm');
    if (scheduleForm) {
        // This will be populated when modal is opened
        populateDayInputs();
    }
}

/**
 * Setup initial event listeners
 */
function setupDashboardListeners() {
    // Markets
    const addMarketBtn = document.getElementById('addMarketBtn');
    if (addMarketBtn) {
        addMarketBtn.addEventListener('click', openAddMarketModal);
    }
    
    // Schedules
    const addScheduleBtn = document.getElementById('addScheduleBtn');
    if (addScheduleBtn) {
        addScheduleBtn.addEventListener('click', openAddScheduleModal);
    }
}

// Setup listeners after page load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(setupDashboardListeners, 500);
});

console.log('Admin dashboard module loaded');
