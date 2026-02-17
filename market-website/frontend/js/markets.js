// ========================================
// REALMART - Markets API Module
// ========================================

/**
 * Get all markets from Firestore
 * @returns {Promise} Array of market objects
 */
async function getAllMarkets() {
    try {
        return await getAllDocuments('markets');
    } catch (error) {
        console.error('Error fetching all markets:', error);
        throw error;
    }
}

/**
 * Get single market by ID
 * @param {string} marketId - Market ID
 * @returns {Promise} Market object or null
 */
async function getMarketById(marketId) {
    try {
        return await getDocumentById('markets', marketId);
    } catch (error) {
        console.error('Error fetching market:', error);
        throw error;
    }
}

/**
 * Search markets by name
 * @param {string} query - Search query string
 * @returns {Promise} Array of matching markets
 */
async function searchMarketsByName(query) {
    try {
        const allMarkets = await getAllMarkets();
        
        // Client-side filtering for text search
        return allMarkets.filter(market =>
            market.name.toLowerCase().includes(query.toLowerCase())
        );
    } catch (error) {
        console.error('Error searching markets:', error);
        throw error;
    }
}

/**
 * Get markets by city
 * @param {string} city - City name
 * @returns {Promise} Array of markets in city
 */
async function getMarketsByCity(city) {
    try {
        return await queryDocuments('markets', 'city', '==', city);
    } catch (error) {
        console.error('Error fetching markets by city:', error);
        throw error;
    }
}

/**
 * Get markets by state
 * @param {string} state - State name/abbreviation
 * @returns {Promise} Array of markets in state
 */
async function getMarketsByState(state) {
    try {
        return await queryDocuments('markets', 'state', '==', state);
    } catch (error) {
        console.error('Error fetching markets by state:', error);
        throw error;
    }
}

/**
 * Get markets by city and state
 * @param {string} city - City name
 * @param {string} state - State name/abbreviation
 * @returns {Promise} Array of markets in city/state
 */
async function getMarketsByCityAndState(city, state) {
    try {
        const markets = await getAllMarkets();
        
        return markets.filter(market =>
            market.city.toLowerCase() === city.toLowerCase() &&
            market.state.toLowerCase() === state.toLowerCase()
        );
    } catch (error) {
        console.error('Error fetching markets by city and state:', error);
        throw error;
    }
}

/**
 * Get all unique cities from markets
 * @returns {Promise} Array of city names
 */
async function getAllCities() {
    try {
        const markets = await getAllMarkets();
        const cities = [...new Set(markets.map(m => m.city))];
        return cities.sort();
    } catch (error) {
        console.error('Error fetching cities:', error);
        throw error;
    }
}

/**
 * Get all unique states from markets
 * @returns {Promise} Array of state names
 */
async function getAllStates() {
    try {
        const markets = await getAllMarkets();
        const states = [...new Set(markets.map(m => m.state))];
        return states.sort();
    } catch (error) {
        console.error('Error fetching states:', error);
        throw error;
    }
}

/**
 * Create new market (admin only)
 * @param {object} marketData - Market information
 * @returns {Promise} Document reference
 */
async function createMarket(marketData) {
    try {
        if (!isUserAdmin()) {
            throw new Error('Unauthorized: Admin access required');
        }
        
        // Validate required fields
        if (!marketData.name || !marketData.city || !marketData.state) {
            throw new Error('Missing required fields: name, city, state');
        }
        
        const docRef = await addDocument('markets', {
            name: marketData.name,
            city: marketData.city,
            state: marketData.state,
            address: marketData.address || '',
            phone: marketData.phone || '',
            email: marketData.email || '',
            website: marketData.website || '',
            description: marketData.description || '',
            imageUrl: marketData.imageUrl || '',
            latitude: marketData.latitude || 0,
            longitude: marketData.longitude || 0
        });
        
        console.log('Market created:', docRef.id);
        return docRef;
    } catch (error) {
        console.error('Error creating market:', error);
        throw error;
    }
}

/**
 * Update market (admin only)
 * @param {string} marketId - Market ID
 * @param {object} marketData - Updated market data
 * @returns {Promise}
 */
async function updateMarket(marketId, marketData) {
    try {
        if (!isUserAdmin()) {
            throw new Error('Unauthorized: Admin access required');
        }
        
        await updateDocument('markets', marketId, marketData);
        console.log('Market updated:', marketId);
    } catch (error) {
        console.error('Error updating market:', error);
        throw error;
    }
}

/**
 * Delete market (admin only)
 * @param {string} marketId - Market ID
 * @returns {Promise}
 */
async function deleteMarket(marketId) {
    try {
        if (!isUserAdmin()) {
            throw new Error('Unauthorized: Admin access required');
        }
        
        // Also delete associated schedule
        const schedules = await queryDocuments('schedules', 'marketId', '==', marketId);
        for (const schedule of schedules) {
            await deleteDocument('schedules', schedule.id);
        }
        
        await deleteDocument('markets', marketId);
        console.log('Market deleted:', marketId);
    } catch (error) {
        console.error('Error deleting market:', error);
        throw error;
    }
}

/**
 * Check if market exists
 * @param {string} marketId - Market ID
 * @returns {Promise} Boolean
 */
async function marketExists(marketId) {
    try {
        const market = await getMarketById(marketId);
        return market !== null;
    } catch (error) {
        console.error('Error checking market existence:', error);
        return false;
    }
}

/**
 * Get markets sorted by name
 * @returns {Promise} Array of markets sorted alphabetically
 */
async function getMarketsSortedByName() {
    try {
        const markets = await getAllMarkets();
        return markets.sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
        console.error('Error fetching sorted markets:', error);
        throw error;
    }
}

/**
 * Get markets sorted by city
 * @returns {Promise} Array of markets sorted by city
 */
async function getMarketsSortedByCity() {
    try {
        const markets = await getAllMarkets();
        return markets.sort((a, b) => {
            const cityCompare = a.city.localeCompare(b.city);
            if (cityCompare !== 0) return cityCompare;
            return a.name.localeCompare(b.name);
        });
    } catch (error) {
        console.error('Error fetching markets sorted by city:', error);
        throw error;
    }
}

/**
 * Get total market count
 * @returns {Promise} Number of markets
 */
async function getMarketCount() {
    try {
        const markets = await getAllMarkets();
        return markets.length;
    } catch (error) {
        console.error('Error getting market count:', error);
        throw error;
    }
}

/**
 * Filter markets by multiple criteria
 * @param {object} filters - Filter criteria {city, state, name}
 * @returns {Promise} Array of filtered markets
 */
async function filterMarkets(filters = {}) {
    try {
        let markets = await getAllMarkets();
        
        // Filter by city
        if (filters.city) {
            markets = markets.filter(m =>
                m.city.toLowerCase() === filters.city.toLowerCase()
            );
        }
        
        // Filter by state
        if (filters.state) {
            markets = markets.filter(m =>
                m.state.toLowerCase() === filters.state.toLowerCase()
            );
        }
        
        // Filter by name/search query
        if (filters.name) {
            markets = markets.filter(m =>
                m.name.toLowerCase().includes(filters.name.toLowerCase())
            );
        }
        
        // Sort by specified field
        if (filters.sortBy) {
            switch (filters.sortBy) {
                case 'name':
                    markets.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'city':
                    markets.sort((a, b) => a.city.localeCompare(b.city));
                    break;
                case 'newest':
                    markets.sort((a, b) => {
                        const dateA = new Date(a.createdAt);
                        const dateB = new Date(b.createdAt);
                        return dateB - dateA;
                    });
                    break;
            }
        }
        
        return markets;
    } catch (error) {
        console.error('Error filtering markets:', error);
        throw error;
    }
}

/**
 * Get markets with pagination
 * @param {number} pageSize - Number of items per page
 * @param {number} pageNumber - Page number (1-based)
 * @returns {Promise} Paginated markets and metadata
 */
async function getMarketsWithPagination(pageSize = 12, pageNumber = 1) {
    try {
        const markets = await getAllMarkets();
        const totalItems = markets.length;
        const totalPages = Math.ceil(totalItems / pageSize);
        
        // Validate page number
        const page = Math.max(1, Math.min(pageNumber, totalPages));
        
        // Get items for current page
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const items = markets.slice(startIndex, endIndex);
        
        return {
            items,
            pageNumber: page,
            pageSize,
            totalItems,
            totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1
        };
    } catch (error) {
        console.error('Error getting paginated markets:', error);
        throw error;
    }
}

/**
 * Set up real-time listener for markets collection
 * @param {function} callback - Callback with markets array
 * @returns {function} Unsubscribe function
 */
function onMarketsChange(callback) {
    return onCollectionChange('markets', callback);
}

/**
 * Set up real-time listener for single market
 * @param {string} marketId - Market ID
 * @param {function} callback - Callback with market object
 * @returns {function} Unsubscribe function
 */
function onMarketChange(marketId, callback) {
    return onDocumentChange('markets', marketId, callback);
}

console.log('Markets API module loaded');
