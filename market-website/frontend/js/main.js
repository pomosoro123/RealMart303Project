// ========================================
// REALMART - Home Page (index.html) Main Script
// ========================================

/**
 * Initialize home page when DOM is ready
 */
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Home page initializing...');
    
    try {
        // Initialize mobile menu toggle
        initMobileMenu();
        
        // Setup authentication UI (waits for Firebase)
        setupAuthUI();
        
        // Load and display featured markets
        await loadFeaturedMarkets();
        
        // Update market stats
        await updateMarketStats();
        
        // Setup search functionality
        setupSearchBar();
        
        // Setup navigation links
        setupNavigation();
        
        console.log('Home page initialized successfully');
    } catch (error) {
        console.error('Error initializing home page:', error);
        showNotification('Error loading page content', 'error');
    }
});

// ========================================
// MOBILE MENU TOGGLE
// ========================================

/**
 * Initialize mobile navigation toggle
 */
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!navToggle || !navMenu) return;
    
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when link is clicked
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ========================================
// FEATURED MARKETS SECTION
// ========================================

/**
 * Load and display featured markets (first 6 markets)
 */
async function loadFeaturedMarkets() {
    const container = document.getElementById('featuredMarkets');
    const loadingSpinner = document.getElementById('loadingFeatured');
    
    if (!container) return;
    
    try {
        showLoadingSpinner('loadingFeatured');
        
        // Get all markets sorted by name
        const markets = await getMarketsSortedByName();
        
        // Get featured markets (first 6)
        const featuredMarkets = markets.slice(0, 6);
        
        // Check if markets are open now
        for (const market of featuredMarkets) {
            market.isOpen = await isMarketOpen(market.id);
        }
        
        // Clear container
        container.innerHTML = '';
        
        if (featuredMarkets.length === 0) {
            container.innerHTML = '<p class="text-center text-muted">No markets available yet.</p>';
        } else {
            // Render each market card
            featuredMarkets.forEach(market => {
                const card = document.createElement('div');
                card.innerHTML = formatMarketCard(market);
                container.appendChild(card.firstElementChild);
            });
        }
        
        hideLoadingSpinner('loadingFeatured');
    } catch (error) {
        console.error('Error loading featured markets:', error);
        hideLoadingSpinner('loadingFeatured');
        container.innerHTML = '<p class="text-center text-error">Error loading markets. Please refresh the page.</p>';
    }
}

// ========================================
// MARKET STATISTICS
// ========================================

/**
 * Update market statistics counters
 */
async function updateMarketStats() {
    try {
        const marketCount = await getMarketCount();
        const statMarkets = document.getElementById('statMarkets');
        
        if (statMarkets) {
            // Animate counter from 0 to final number
            animateCounter(statMarkets, 0, marketCount, 1500);
        }
    } catch (error) {
        console.error('Error updating stats:', error);
    }
}

/**
 * Animate counter from start to end value
 * @param {HTMLElement} element - Element to update
 * @param {number} start - Start value
 * @param {number} end - End value
 * @param {number} duration - Animation duration in ms
 */
function animateCounter(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 50);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= end) {
            element.textContent = end;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 50);
}

// ========================================
// SEARCH FUNCTIONALITY
// ========================================

/**
 * Setup search bar with autocomplete suggestions
 */
function setupSearchBar() {
    const searchInput = document.getElementById('searchInput');
    const searchSuggestions = document.getElementById('searchSuggestions');
    const searchForm = document.getElementById('searchForm');
    
    if (!searchInput || !searchForm) return;
    
    // Search input with debounce
    searchInput.addEventListener('input', debounce(async (e) => {
        const query = e.target.value.trim();
        
        if (query.length < 2) {
            searchSuggestions.classList.add('hidden');
            return;
        }
        
        try {
            const results = await searchMarketsByName(query);
            
            if (results.length === 0) {
                searchSuggestions.classList.add('hidden');
                return;
            }
            
            // Display top 5 suggestions
            const suggestions = results.slice(0, 5);
            searchSuggestions.innerHTML = suggestions
                .map(market => `
                    <li>
                        <a href="market-details.html?id=${market.id}">
                            <strong>${market.name}</strong>
                            <span class="text-muted">${market.city}, ${market.state}</span>
                        </a>
                    </li>
                `)
                .join('');
            
            searchSuggestions.classList.remove('hidden');
        } catch (error) {
            console.error('Search error:', error);
            searchSuggestions.classList.add('hidden');
        }
    }, 300));
    
    // Hide suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
            searchSuggestions.classList.add('hidden');
        }
    });
    
    // Handle search form submission
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        
        if (query.length > 0) {
            // Redirect to markets page with search parameter
            window.location.href = `markets.html?search=${encodeURIComponent(query)}`;
        }
    });
    
    // Handle suggestion click
    if (searchSuggestions) {
        searchSuggestions.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link) {
                window.location.href = link.href;
            }
        });
    }
}

// ========================================
// NAVIGATION
// ========================================

/**
 * Setup navigation and set active link
 */
function setupNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ========================================
// USER AUTHENTICATION STATE
// ========================================

/**
 * Update UI based on user authentication state
 * This waits for Firebase to be initialized
 */
function setupAuthUI() {
    if (!auth) {
        // Try again in 100ms if auth not ready
        setTimeout(setupAuthUI, 100);
        return;
    }
    
    auth.onAuthStateChanged((user) => {
        updateAuthUI(user);
    });
}

/**
 * Update authentication UI elements
 * @param {Object} user - Firebase user object
 */
function updateAuthUI(user) {
    const adminLoginLink = document.querySelector('.nav-link[href="admin-login.html"]');
    
    if (!adminLoginLink) return;
    
    if (user && currentUserData && currentUserData.role === 'admin') {
        // User is admin - show admin dashboard link
        adminLoginLink.textContent = 'Admin Panel';
        adminLoginLink.href = 'admin-dashboard.html';
    } else {
        // User is not admin or not logged in
        adminLoginLink.textContent = 'Admin Login';
        adminLoginLink.href = 'admin-login.html';
    }
}

// ========================================
// PAGE ANIMATIONS
// ========================================

/**
 * Add scroll animations for elements
 */
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    document.querySelectorAll('.card, .stat-card, .section-header').forEach(el => {
        observer.observe(el);
    });
}

// ========================================
// REAL-TIME UPDATES
// ========================================

/**
 * Set up real-time listener for markets collection
 * Updates featured markets when data changes
 */
let marketsUnsubscribe = null;

function setupRealtimeUpdates() {
    marketsUnsubscribe = onMarketsChange(() => {
        loadFeaturedMarkets();
        updateMarketStats();
    });
}

/**
 * Cleanup real-time listeners
 */
function cleanupRealtimeUpdates() {
    if (marketsUnsubscribe) {
        marketsUnsubscribe();
    }
}

// Setup real-time updates when page loads
setupRealtimeUpdates();

// Cleanup when page unloads
window.addEventListener('beforeunload', cleanupRealtimeUpdates);

// ========================================
// PAGE LOAD COMPLETION
// ========================================

/**
 * Handle page visibility changes
 * Refresh data when tab becomes visible
 */
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        console.log('Page became visible - refreshing data');
        loadFeaturedMarkets();
        updateMarketStats();
    }
});

console.log('Home page script loaded');
