// ========================================
// REALMART - Market Details Page (market-details.html) Main Script
// ========================================

/**
 * Current market data
 */
let currentMarket = null;
let currentSchedule = null;

/**
 * Initialize market details page when DOM is ready
 */
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Market details page initializing...');
    
    try {
        // Initialize mobile menu toggle
        initMobileMenu();
        
        // Get market ID from URL parameters
        const marketId = getMarketIdFromUrl();
        
        if (!marketId) {
            showNotFound();
            return;
        }
        
        // Load market data
        await loadMarketData(marketId);
        
        if (!currentMarket) {
            showNotFound();
            return;
        }
        
        // Display market details
        displayMarketDetails();
        
        // Load and display schedule
        await loadSchedule(marketId);
        
        // Initialize map
        initializeMap();
        
        // Load related markets
        await loadRelatedMarkets();
        
        // Setup share functionality
        setupShare();
        
        // Setup bookmark functionality
        setupBookmark();
        
        // Setup modal close button
        setupModalClose();
        
        // Setup real-time updates
        setupRealtimeUpdates(marketId);
        
        // Show details section
        document.getElementById('marketDetails').classList.remove('hidden');
        
        console.log('Market details page initialized successfully');
    } catch (error) {
        console.error('Error initializing market details page:', error);
        showNotFound();
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
// URL PARAMETER HANDLING
// ========================================

/**
 * Get market ID from URL query parameter
 * @returns {string|null} Market ID or null if not found
 */
function getMarketIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// ========================================
// LOAD MARKET DATA
// ========================================

/**
 * Load market data from Firestore
 * @param {string} marketId - Market ID to load
 */
async function loadMarketData(marketId) {
    try {
        showLoadingSpinner('loadingDetails');
        
        currentMarket = await getMarketById(marketId);
        
        if (currentMarket) {
            // Check if market is currently open
            currentMarket.isOpen = await isMarketOpen(marketId);
        }
        
        hideLoadingSpinner('loadingDetails');
    } catch (error) {
        console.error('Error loading market data:', error);
        hideLoadingSpinner('loadingDetails');
        throw error;
    }
}

// ========================================
// DISPLAY MARKET DETAILS
// ========================================

/**
 * Display all market information on page
 */
function displayMarketDetails() {
    if (!currentMarket) return;
    
    // Update page title
    document.title = `${currentMarket.name} - RealMart`;
    
    // Breadcrumb
    const breadcrumbMarket = document.getElementById('breadcrumbMarket');
    if (breadcrumbMarket) breadcrumbMarket.textContent = currentMarket.name;
    
    // Header section
    const marketName = document.getElementById('marketName');
    if (marketName) marketName.textContent = currentMarket.name;
    
    const marketImage = document.getElementById('marketImage');
    if (marketImage) {
        marketImage.src = currentMarket.imageUrl || 'https://via.placeholder.com/600x300?text=Market';
        marketImage.alt = currentMarket.name;
    }
    
    // Status badge
    const openStatus = document.getElementById('openStatus');
    if (openStatus) {
        if (currentMarket.isOpen) {
            openStatus.textContent = '🟢 Open Now';
            openStatus.className = 'status-badge open';
        } else {
            openStatus.textContent = '🔴 Closed';
            openStatus.className = 'status-badge closed';
        }
    }
    
    // Information section
    const marketAddress = document.getElementById('marketAddress');
    if (marketAddress) {
        marketAddress.textContent = `${currentMarket.address}, ${currentMarket.city}, ${currentMarket.state}`;
    }
    
    const marketPhone = document.getElementById('marketPhone');
    if (marketPhone) {
        marketPhone.href = `tel:${currentMarket.phone}`;
        marketPhone.textContent = currentMarket.phone;
    }
    
    const marketEmail = document.getElementById('marketEmail');
    if (marketEmail) {
        marketEmail.href = `mailto:${currentMarket.email}`;
        marketEmail.textContent = currentMarket.email;
    }
    
    const marketWebsite = document.getElementById('marketWebsite');
    if (marketWebsite && currentMarket.website) {
        // Ensure URL has protocol
        let url = currentMarket.website;
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        marketWebsite.href = url;
        marketWebsite.textContent = currentMarket.website;
    }
    
    const marketDescription = document.getElementById('marketDescription');
    if (marketDescription) {
        marketDescription.textContent = currentMarket.description || 'No description available';
    }
}

// ========================================
// SCHEDULE LOADING AND DISPLAY
// ========================================

/**
 * Load schedule for the market
 * @param {string} marketId - Market ID
 */
async function loadSchedule(marketId) {
    try {
        currentSchedule = await getScheduleForMarket(marketId);
        
        if (currentSchedule) {
            await displaySchedule();
        }
    } catch (error) {
        console.error('Error loading schedule:', error);
    }
}

/**
 * Display schedule in table format
 */
async function displaySchedule() {
    if (!currentSchedule) return;
    
    const scheduleTable = document.getElementById('scheduleTable');
    if (!scheduleTable) return;
    
    try {
        const formattedSchedule = await getFormattedSchedule(currentMarket.id);
        
        if (!formattedSchedule || !Array.isArray(formattedSchedule)) {
            scheduleTable.innerHTML = '<p>Schedule information not available</p>';
            return;
        }
        
        let tableHTML = '<table class="schedule-table"><thead><tr><th>Day</th><th>Hours</th></tr></thead><tbody>';
        
        formattedSchedule.forEach(item => {
            const isOpen = item.hours !== 'Closed';
            const statusClass = isOpen ? 'hours open' : 'hours closed';
            const hours = isOpen ? `🟢 ${item.hours}` : '🔴 Closed';
            tableHTML += `<tr><td class="day-name">${item.day}</td><td class="${statusClass}">${hours}</td></tr>`;
        });
        
        tableHTML += '</tbody></table>';
        scheduleTable.innerHTML = tableHTML;
    } catch (error) {
        console.error('Error displaying schedule:', error);
        scheduleTable.innerHTML = '<p>Schedule information not available</p>';
    }
}

// ========================================
// MAP INITIALIZATION
// ========================================

/**
 * Initialize Google Map for market location
 */
function initializeMap() {
    const mapContainer = document.getElementById('marketMap');
    if (!mapContainer || !currentMarket.lat || !currentMarket.long) return;
    
    try {
        const location = {
            lat: parseFloat(currentMarket.lat),
            lng: parseFloat(currentMarket.long)
        };
        
        // Check if Google Maps API is loaded
        if (typeof google === 'undefined' || !google.maps) {
            console.warn('Google Maps API not loaded - showing placeholder');
            mapContainer.innerHTML = '<p style="padding: 20px; text-align: center;">Map not available</p>';
            return;
        }
        
        const map = new google.maps.Map(mapContainer, {
            zoom: 15,
            center: location,
            mapTypeControl: true,
            fullscreenControl: true
        });
        
        // Add market marker
        new google.maps.Marker({
            position: location,
            map: map,
            title: currentMarket.name,
            icon: 'https://maps.google.com/mapfiles/ms/mcons/red-dot.png'
        });
    } catch (error) {
        console.error('Error initializing map:', error);
        mapContainer.innerHTML = '<p style="padding: 20px; text-align: center;">Error loading map</p>';
    }
}

// ========================================
// RELATED MARKETS
// ========================================

/**
 * Load and display markets in the same city
 */
async function loadRelatedMarkets() {
    try {
        if (!currentMarket) return;
        
        const relatedMarkets = await getMarketsByCity(currentMarket.city);
        
        // Filter out current market and limit to 4
        const filtered = relatedMarkets
            .filter(m => m.id !== currentMarket.id)
            .slice(0, 4);
        
        if (filtered.length === 0) {
            document.getElementById('relatedMarketsGrid').parentElement.classList.add('hidden');
            return;
        }
        
        // Update city name in heading
        const relatedCity = document.getElementById('relatedCity');
        if (relatedCity) relatedCity.textContent = currentMarket.city;
        
        // Add open status to each market
        for (const market of filtered) {
            market.isOpen = await isMarketOpen(market.id);
        }
        
        // Display related markets
        const grid = document.getElementById('relatedMarketsGrid');
        if (grid) {
            grid.innerHTML = filtered
                .map(market => formatMarketCard(market))
                .join('');
            
            // Add click handlers
            grid.querySelectorAll('.card').forEach(card => {
                card.addEventListener('click', () => {
                    const marketId = card.getAttribute('data-market-id');
                    if (marketId) {
                        window.location.href = `market-details.html?id=${marketId}`;
                    }
                });
                card.style.cursor = 'pointer';
            });
        }
    } catch (error) {
        console.error('Error loading related markets:', error);
    }
}

// ========================================
// SHARE FUNCTIONALITY
// ========================================

/**
 * Setup share button and modal
 */
function setupShare() {
    const shareBtn = document.getElementById('shareBtn');
    const shareModal = document.getElementById('shareModal');
    const shareFacebook = document.getElementById('shareFacebook');
    const shareTwitter = document.getElementById('shareTwitter');
    const shareCopy = document.getElementById('shareCopy');
    
    if (!shareBtn || !shareModal) return;
    
    // Open share modal
    shareBtn.addEventListener('click', () => {
        shareModal.classList.remove('hidden');
    });
    
    // Facebook share
    if (shareFacebook) {
        shareFacebook.addEventListener('click', () => {
            const url = encodeURIComponent(window.location.href);
            const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            window.open(facebookUrl, 'facebook-share', 'width=600,height=400');
        });
    }
    
    // Twitter share
    if (shareTwitter) {
        shareTwitter.addEventListener('click', () => {
            const text = encodeURIComponent(`Check out ${currentMarket.name} on RealMart!`);
            const url = encodeURIComponent(window.location.href);
            const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
            window.open(twitterUrl, 'twitter-share', 'width=600,height=400');
        });
    }
    
    // Copy link
    if (shareCopy) {
        shareCopy.addEventListener('click', async () => {
            try {
                await copyToClipboard(window.location.href);
                showNotification('Link copied to clipboard!', 'success');
                shareModal.classList.add('hidden');
            } catch (error) {
                showNotification('Failed to copy link', 'error');
            }
        });
    }
}

// ========================================
// BOOKMARK FUNCTIONALITY
// ========================================

/**
 * Setup bookmark button
 */
function setupBookmark() {
    const bookmarkBtn = document.getElementById('bookmarkBtn');
    if (!bookmarkBtn || !currentMarket) return;
    
    // Check if already bookmarked
    const bookmarks = JSON.parse(localStorage.getItem('futamart_bookmarks') || '[]');
    const isBookmarked = bookmarks.includes(currentMarket.id);
    
    updateBookmarkButton(bookmarkBtn, isBookmarked);
    
    bookmarkBtn.addEventListener('click', () => {
        const bookmarks = JSON.parse(localStorage.getItem('realmart_bookmarks') || '[]');
        const index = bookmarks.indexOf(currentMarket.id);
        
        if (index > -1) {
            // Remove bookmark
            bookmarks.splice(index, 1);
            updateBookmarkButton(bookmarkBtn, false);
            showNotification('Removed from bookmarks', 'success');
        } else {
            // Add bookmark
            bookmarks.push(currentMarket.id);
            updateBookmarkButton(bookmarkBtn, true);
            showNotification('Added to bookmarks', 'success');
        }
        
        localStorage.setItem('realmart_bookmarks', JSON.stringify(bookmarks));
    });
}

/**
 * Update bookmark button appearance
 * @param {HTMLElement} btn - Bookmark button element
 * @param {boolean} isBookmarked - Whether market is bookmarked
 */
function updateBookmarkButton(btn, isBookmarked) {
    if (isBookmarked) {
        btn.textContent = '⭐ Bookmarked';
        btn.classList.add('bookmarked');
    } else {
        btn.textContent = '☆ Bookmark';
        btn.classList.remove('bookmarked');
    }
}

// ========================================
// MODAL MANAGEMENT
// ========================================

/**
 * Setup modal close button
 */
function setupModalClose() {
    const shareModal = document.getElementById('shareModal');
    if (!shareModal) return;
    
    const closeBtn = shareModal.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            shareModal.classList.add('hidden');
        });
    }
    
    // Close modal when clicking outside
    shareModal.addEventListener('click', (e) => {
        if (e.target === shareModal) {
            shareModal.classList.add('hidden');
        }
    });
}

// ========================================
// ERROR STATES
// ========================================

/**
 * Show not found message
 */
function showNotFound() {
    hideLoadingSpinner('loadingDetails');
    document.getElementById('notFound').classList.remove('hidden');
    document.getElementById('marketDetails').classList.add('hidden');
}

// ========================================
// REAL-TIME UPDATES
// ========================================

/**
 * Setup real-time listener for market data
 * @param {string} marketId - Market ID to listen to
 */
let marketUnsubscribe = null;
let scheduleUnsubscribe = null;

function setupRealtimeUpdates(marketId) {
    // Listen for market changes
    marketUnsubscribe = onMarketChange(marketId, async (market) => {
        console.log('Market data changed - updating');
        currentMarket = market;
        currentMarket.isOpen = await isMarketOpen(marketId);
        displayMarketDetails();
    });
    
    // Listen for schedule changes
    scheduleUnsubscribe = onScheduleChange(marketId, () => {
        console.log('Schedule data changed - updating');
        loadSchedule(marketId);
    });
}

/**
 * Cleanup real-time listeners
 */
function cleanupRealtimeUpdates() {
    if (marketUnsubscribe) marketUnsubscribe();
    if (scheduleUnsubscribe) scheduleUnsubscribe();
}

// Cleanup on page unload
window.addEventListener('beforeunload', cleanupRealtimeUpdates);

// ========================================
// PAGE VISIBILITY
// ========================================

/**
 * Handle page visibility changes
 */
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        console.log('Details page became visible - refreshing data');
        if (currentMarket) {
            loadMarketData(currentMarket.id);
        }
    }
});

console.log('Market details page script loaded');
