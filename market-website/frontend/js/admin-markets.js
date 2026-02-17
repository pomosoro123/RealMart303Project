// ========================================
// REALMART - Admin Markets Module
// ========================================

let editingMarketId = null;
let currentImageBase64 = null;

/**
 * Load and display markets in table
 */
async function loadMarketsTable() {
    try {
        showLoadingSpinner('loadingMarkets');
        
        const markets = await getAllMarkets();
        const tbody = document.getElementById('marketsTableBody');
        const noMarketsMsg = document.getElementById('noMarkets');
        
        if (!tbody) return;
        
        if (markets.length === 0) {
            tbody.innerHTML = '';
            noMarketsMsg.classList.remove('hidden');
            hideLoadingSpinner('loadingMarkets');
            return;
        }
        
        noMarketsMsg.classList.add('hidden');
        
        tbody.innerHTML = markets.map(market => `
            <tr data-market-id="${market.id}">
                <td data-label="Name"><strong>${market.name}</strong></td>
                <td data-label="City">${market.city}</td>
                <td data-label="State">${market.state}</td>
                <td data-label="Phone">${market.phone}</td>
                <td data-label="Actions">
                    <button class="btn-small btn-primary" onclick="editMarket('${market.id}')">Edit</button>
                    <button class="btn-small btn-danger" onclick="deleteMarketConfirm('${market.id}', '${market.name}')">Delete</button>
                </td>
            </tr>
        `).join('');
        
        hideLoadingSpinner('loadingMarkets');
    } catch (error) {
        console.error('Error loading markets:', error);
        showAdminStatus('Error loading markets', 'error');
        hideLoadingSpinner('loadingMarkets');
    }
}

/**
 * Open add market modal
 */
function openAddMarketModal() {
    editingMarketId = null;
    currentImageBase64 = null;
    document.getElementById('marketModalTitle').textContent = 'Add Market';
    document.getElementById('marketForm').reset();
    clearImageUpload();
    openModal('marketModal');
}

/**
 * Edit existing market
 * @param {string} marketId - Market ID
 */
async function editMarket(marketId) {
    try {
        const market = await getMarketById(marketId);
        if (!market) return;
        
        editingMarketId = marketId;
        document.getElementById('marketModalTitle').textContent = 'Edit Market';
        document.getElementById('marketName').value = market.name || '';
        document.getElementById('marketCity').value = market.city || '';
        document.getElementById('marketState').value = market.state || '';
        document.getElementById('marketAddress').value = market.address || '';
        document.getElementById('marketPhone').value = market.phone || '';
        document.getElementById('marketEmail').value = market.email || '';
        document.getElementById('marketWebsite').value = market.website || '';
        document.getElementById('marketDescription').value = market.description || '';
        document.getElementById('marketLat').value = market.lat || '';
        document.getElementById('marketLong').value = market.long || '';
        
        // Handle image preview
        currentImageBase64 = market.imageUrl || null;
        if (currentImageBase64 && currentImageBase64.startsWith('data:image')) {
            document.getElementById('imagePreview').src = currentImageBase64;
            document.getElementById('imagePreviewContainer').classList.remove('hidden');
            document.getElementById('imageInputContainer').classList.add('hidden');
        } else {
            clearImageUpload();
        }
        
        openModal('marketModal');
    } catch (error) {
        console.error('Error loading market:', error);
        showAdminStatus('Error loading market', 'error');
    }
}

/**
 * Delete market with confirmation
 * @param {string} marketId - Market ID
 * @param {string} marketName - Market name
 */
function deleteMarketConfirm(marketId, marketName) {
    confirmDelete(marketName, () => deleteMarket(marketId));
}

/**
 * Delete market from database
 * @param {string} marketId - Market ID
 */
async function deleteMarket(marketId) {
    try {
        await deleteMarketRecord(marketId);
        showAdminStatus('Market deleted successfully', 'success');
        loadMarketsTable();
    } catch (error) {
        console.error('Error deleting market:', error);
        showAdminStatus('Error deleting market', 'error');
    }
}

/**
 * Save market (create or update)
 * @param {Event} event - Form submit event
 */
document.addEventListener('DOMContentLoaded', () => {
    const marketForm = document.getElementById('marketForm');
    if (marketForm) {
        marketForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const marketData = {
                name: document.getElementById('marketName').value.trim(),
                city: document.getElementById('marketCity').value.trim(),
                state: document.getElementById('marketState').value.trim(),
                address: document.getElementById('marketAddress').value.trim(),
                phone: document.getElementById('marketPhone').value.trim(),
                email: document.getElementById('marketEmail').value.trim(),
                website: document.getElementById('marketWebsite').value.trim(),
                description: document.getElementById('marketDescription').value.trim(),
                lat: document.getElementById('marketLat').value || null,
                long: document.getElementById('marketLong').value || null,
                imageUrl: currentImageBase64 || ''
            };
            
            // Validate required fields
            if (!marketData.name || !marketData.city || !marketData.state || !marketData.phone) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            try {
                setButtonLoading(event.target.querySelector('.submit-btn'), 'Saving...');
                
                if (editingMarketId) {
                    // Update existing market
                    await updateMarketRecord(editingMarketId, marketData);
                    showAdminStatus('Market updated successfully', 'success');
                } else {
                    // Create new market
                    await createMarketRecord(marketData);
                    showAdminStatus('Market created successfully', 'success');
                }
                
                closeModal('marketModal');
                loadMarketsTable();
            } catch (error) {
                console.error('Error saving market:', error);
                showNotification('Error saving market', 'error');
            } finally {
                resetButtonLoading(event.target.querySelector('.submit-btn'));
            }
        });
    }
});

/**
 * Wrapper for createMarket with admin check
 */
async function createMarketRecord(data) {
    return await createMarket(data);
}

/**
 * Wrapper for updateMarket with admin check
 */
async function updateMarketRecord(id, data) {
    return await updateMarket(id, data);
}

/**
 * Wrapper for deleteMarket with admin check
 */
async function deleteMarketRecord(id) {
    return await deleteMarket(id);
}

console.log('Admin markets module loaded');
