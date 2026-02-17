// ========================================
// REALMART - Markets Browse Page (markets.html) Main Script
// ========================================

/**
 * State management for markets page
 */
let marketsState = {
    allMarkets: [],
    filteredMarkets: [],
    currentPage: 1,
    pageSize: 12,
    filters: {
        search: '',
        city: '',
        state: '',
        sort: 'name'
    }
};

/**
 * Initialize markets page when DOM is ready
 */
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Markets page initializing...');
    
    try {
        // Initialize mobile menu toggle
        initMobileMenu();
        
        // Load URL parameters
        loadUrlParameters();
        
        // Load all markets
        await loadAllMarkets();
        
        // Populate filter dropdowns
        await populateFilterDropdowns();
        
        // Setup filter event listeners
        setupFilterListeners();
        
        // Setup reset filters button
        setupResetButton();
        
        // Setup real-time updates
        setupRealtimeUpdates();
        
        // Display markets
        displayMarkets();
        
        console.log('Markets page initialized successfully');
    } catch (error) {
        console.error('Error initializing markets page:', error);
        showNotification('Error loading markets page', 'error');
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
    
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ========================================
// URL PARAMETERS HANDLING
// ========================================

/**
 * Load filters from URL parameters
 */
function loadUrlParameters() {
    const params = new URLSearchParams(window.location.search);
    
    if (params.has('search')) {
        marketsState.filters.search = params.get('search');
        const searchInput = document.getElementById('marketSearch');
        if (searchInput) searchInput.value = marketsState.filters.search;
    }
    
    if (params.has('city')) {
        marketsState.filters.city = params.get('city');
        const citySelect = document.getElementById('cityFilter');
        if (citySelect) citySelect.value = marketsState.filters.city;
    }
    
    if (params.has('state')) {
        marketsState.filters.state = params.get('state');
        const stateSelect = document.getElementById('stateFilter');
        if (stateSelect) stateSelect.value = marketsState.filters.state;
    }
}

/**
 * Update URL with current filters
 */
function updateUrlParameters() {
    const params = new URLSearchParams();
    
    if (marketsState.filters.search) {
        params.set('search', marketsState.filters.search);
    }
    if (marketsState.filters.city) {
        params.set('city', marketsState.filters.city);
    }
    if (marketsState.filters.state) {
        params.set('state', marketsState.filters.state);
    }
    
    const newUrl = params.toString() 
        ? `${window.location.pathname}?${params.toString()}`
        : window.location.pathname;
    
    window.history.replaceState({}, '', newUrl);
}

// ========================================
// LOAD MARKETS DATA
// ========================================

/**
 * Load all markets from Firestore
 */
async function loadAllMarkets() {
    try {
        showLoadingSpinner('loadingMarkets');
        
        marketsState.allMarkets = await getAllMarkets();
        
        // Add open/closed status
        for (const market of marketsState.allMarkets) {
            market.isOpen = await isMarketOpen(market.id);
        }
        
        // Apply filters
        applyFilters();
        
        hideLoadingSpinner('loadingMarkets');
    } catch (error) {
        console.error('Error loading markets:', error);
        showNotification('Error loading markets', 'error');
        hideLoadingSpinner('loadingMarkets');
    }
}

// ========================================
// FILTER DROPDOWNS POPULATION
// ========================================

/**
 * Populate city and state filter dropdowns
 */
async function populateFilterDropdowns() {
    try {
        const [cities, states] = await Promise.all([
            getAllCities(),
            getAllStates()
        ]);
        
        // Populate city dropdown
        const citySelect = document.getElementById('cityFilter');
        if (citySelect) {
            const currentCity = citySelect.value;
            citySelect.innerHTML = '<option value="">All Cities</option>';
            cities.sort().forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = city;
                citySelect.appendChild(option);
            });
            if (currentCity) citySelect.value = currentCity;
        }
        
        // Populate state dropdown
        const stateSelect = document.getElementById('stateFilter');
        if (stateSelect) {
            const currentState = stateSelect.value;
            stateSelect.innerHTML = '<option value="">All States</option>';
            states.sort().forEach(state => {
                const option = document.createElement('option');
                option.value = state;
                option.textContent = state;
                stateSelect.appendChild(option);
            });
            if (currentState) stateSelect.value = currentState;
        }
    } catch (error) {
        console.error('Error populating filter dropdowns:', error);
    }
}

// ========================================
// FILTER LISTENERS
// ========================================

/**
 * Setup event listeners for all filters
 */
function setupFilterListeners() {
    // Search input with debounce
    const searchInput = document.getElementById('marketSearch');
    if (searchInput) {
        searchInput.addEventListener('input', debounce((e) => {
            marketsState.filters.search = e.target.value.trim();
            marketsState.currentPage = 1;
            applyFilters();
            updateUrlParameters();
            displayMarkets();
        }, 300));
    }
    
    // City filter
    const citySelect = document.getElementById('cityFilter');
    if (citySelect) {
        citySelect.addEventListener('change', (e) => {
            marketsState.filters.city = e.target.value;
            marketsState.currentPage = 1;
            applyFilters();
            updateUrlParameters();
            displayMarkets();
        });
    }
    
    // State filter
    const stateSelect = document.getElementById('stateFilter');
    if (stateSelect) {
        stateSelect.addEventListener('change', (e) => {
            marketsState.filters.state = e.target.value;
            marketsState.currentPage = 1;
            applyFilters();
            updateUrlParameters();
            displayMarkets();
        });
    }
    
    // Sort dropdown
    const sortSelect = document.getElementById('sortFilter');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            marketsState.filters.sort = e.target.value;
            marketsState.currentPage = 1;
            applyFilters();
            displayMarkets();
        });
    }
}

/**
 * Setup reset filters button
 */
function setupResetButton() {
    const resetBtn = document.getElementById('resetFilters');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetFilters);
    }
}

// ========================================
// FILTERING AND SORTING
// ========================================

/**
 * Apply filters to markets
 */
function applyFilters() {
    let filtered = [...marketsState.allMarkets];
    
    // Search filter
    if (marketsState.filters.search) {
        const query = marketsState.filters.search.toLowerCase();
        filtered = filtered.filter(market =>
            market.name.toLowerCase().includes(query) ||
            market.city.toLowerCase().includes(query) ||
            market.state.toLowerCase().includes(query)
        );
    }
    
    // City filter
    if (marketsState.filters.city) {
        filtered = filtered.filter(market => market.city === marketsState.filters.city);
    }
    
    // State filter
    if (marketsState.filters.state) {
        filtered = filtered.filter(market => market.state === marketsState.filters.state);
    }
    
    // Apply sorting
    applySort(filtered);
    
    marketsState.filteredMarkets = filtered;
    marketsState.currentPage = 1;
}

/**
 * Apply sorting to filtered markets
 */
function applySort(markets) {
    const sortBy = marketsState.filters.sort;
    
    switch (sortBy) {
        case 'name':
            markets.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'city':
            markets.sort((a, b) => {
                const cityCompare = a.city.localeCompare(b.city);
                return cityCompare !== 0 ? cityCompare : a.name.localeCompare(b.name);
            });
            break;
        case 'newest':
            markets.sort((a, b) => {
                const dateA = new Date(a.createdAt || 0);
                const dateB = new Date(b.createdAt || 0);
                return dateB - dateA;
            });
            break;
    }
}

// ========================================
// DISPLAY MARKETS
// ========================================

/**
 * Display markets grid with pagination
 */
function displayMarkets() {
    const marketsGrid = document.getElementById('marketsGrid');
    const noResultsMsg = document.getElementById('noResults');
    const pagination = document.getElementById('pagination');
    
    if (!marketsGrid) return;
    
    // Show/hide no results message
    if (marketsState.filteredMarkets.length === 0) {
        marketsGrid.innerHTML = '';
        if (noResultsMsg) noResultsMsg.classList.remove('hidden');
        if (pagination) pagination.classList.add('hidden');
        return;
    }
    
    if (noResultsMsg) noResultsMsg.classList.add('hidden');
    
    // Calculate pagination
    const totalPages = Math.ceil(marketsState.filteredMarkets.length / marketsState.pageSize);
    const startIdx = (marketsState.currentPage - 1) * marketsState.pageSize;
    const endIdx = startIdx + marketsState.pageSize;
    const paginatedMarkets = marketsState.filteredMarkets.slice(startIdx, endIdx);
    
    // Render market cards
    marketsGrid.innerHTML = paginatedMarkets
        .map(market => formatMarketCard(market))
        .join('');
    
    // Setup market card click handlers
    marketsGrid.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            const marketId = card.getAttribute('data-market-id');
            if (marketId) {
                window.location.href = `market-details.html?id=${marketId}`;
            }
        });
        card.style.cursor = 'pointer';
    });
    
    // Display pagination
    displayPagination(totalPages);
}

/**
 * Display pagination controls
 */
function displayPagination(totalPages) {
    const pagination = document.getElementById('pagination');
    
    if (!pagination || totalPages <= 1) {
        if (pagination) pagination.classList.add('hidden');
        return;
    }
    
    pagination.classList.remove('hidden');
    
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    const pageInfo = document.getElementById('pageInfo');
    
    if (pageInfo) {
        pageInfo.textContent = `Page ${marketsState.currentPage} of ${totalPages}`;
    }
    
    if (prevBtn) {
        if (marketsState.currentPage > 1) {
            prevBtn.disabled = false;
            prevBtn.onclick = previousPage;
        } else {
            prevBtn.disabled = true;
        }
    }
    
    if (nextBtn) {
        if (marketsState.currentPage < totalPages) {
            nextBtn.disabled = false;
            nextBtn.onclick = nextPage;
        } else {
            nextBtn.disabled = true;
        }
    }
}

/**
 * Go to previous page
 */
function previousPage() {
    if (marketsState.currentPage > 1) {
        marketsState.currentPage--;
        displayMarkets();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

/**
 * Go to next page
 */
function nextPage() {
    const totalPages = Math.ceil(marketsState.filteredMarkets.length / marketsState.pageSize);
    if (marketsState.currentPage < totalPages) {
        marketsState.currentPage++;
        displayMarkets();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// ========================================
// REAL-TIME UPDATES
// ========================================

/**
 * Set up real-time listener for markets collection
 */
let marketsUnsubscribe = null;

function setupRealtimeUpdates() {
    marketsUnsubscribe = onMarketsChange(async () => {
        console.log('Markets data changed - reloading');
        await loadAllMarkets();
        displayMarkets();
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

// Cleanup on page unload
window.addEventListener('beforeunload', cleanupRealtimeUpdates);

// ========================================
// RESET FILTERS
// ========================================

/**
 * Reset all filters to default
 */
function resetFilters() {
    marketsState.filters = {
        search: '',
        city: '',
        state: '',
        sort: 'name'
    };
    marketsState.currentPage = 1;
    
    // Update UI
    const searchInput = document.getElementById('marketSearch');
    if (searchInput) searchInput.value = '';
    
    const citySelect = document.getElementById('cityFilter');
    if (citySelect) citySelect.value = '';
    
    const stateSelect = document.getElementById('stateFilter');
    if (stateSelect) stateSelect.value = '';
    
    const sortSelect = document.getElementById('sortFilter');
    if (sortSelect) sortSelect.value = 'name';
    
    // Reapply filters and display
    applyFilters();
    displayMarkets();
    updateUrlParameters();
    
    showNotification('Filters reset', 'success');
}

// ========================================
// PAGE VISIBILITY
// ========================================

/**
 * Handle page visibility changes
 */
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        console.log('Markets page became visible - refreshing data');
        loadAllMarkets();
    }
});

console.log('Markets browse page script loaded');
