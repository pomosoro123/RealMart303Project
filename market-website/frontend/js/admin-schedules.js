// ========================================
// REALMART - Admin Schedules Module
// ========================================

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
let editingScheduleId = null;

/**
 * Load and display schedules in table
 */
async function loadSchedulesTable() {
    try {
        showLoadingSpinner('loadingSchedules');
        
        const schedules = await getAllSchedules();
        const markets = await getAllMarkets();
        const tbody = document.getElementById('schedulesTableBody');
        const noSchedulesMsg = document.getElementById('noSchedules');
        
        if (!tbody) return;
        
        if (schedules.length === 0) {
            tbody.innerHTML = '';
            noSchedulesMsg.classList.remove('hidden');
            hideLoadingSpinner('loadingSchedules');
            return;
        }
        
        noSchedulesMsg.classList.add('hidden');
        
        // Create market name map for quick lookup
        const marketMap = {};
        markets.forEach(m => {
            marketMap[m.id] = m.name;
        });
        
        tbody.innerHTML = schedules.map(schedule => `
            <tr data-schedule-id="${schedule.id}">
                <td data-label="Market">${marketMap[schedule.marketId] || 'Unknown'}</td>
                <td data-label="Day">${schedule.day || 'N/A'}</td>
                <td data-label="Hours">${schedule.hours || 'Closed'}</td>
                <td data-label="Actions">
                    <button class="btn-small btn-primary" onclick="editSchedule('${schedule.id}')">Edit</button>
                    <button class="btn-small btn-danger" onclick="deleteScheduleConfirm('${schedule.id}')">Delete</button>
                </td>
            </tr>
        `).join('');
        
        hideLoadingSpinner('loadingSchedules');
    } catch (error) {
        console.error('Error loading schedules:', error);
        showAdminStatus('Error loading schedules', 'error');
        hideLoadingSpinner('loadingSchedules');
    }
}

/**
 * Open add schedule modal
 */
async function openAddScheduleModal() {
    try {
        editingScheduleId = null;
        document.getElementById('scheduleModalTitle').textContent = 'Add Schedule';
        
        // Populate market dropdown
        const markets = await getAllMarkets();
        const marketSelect = document.getElementById('scheduleMarket');
        
        marketSelect.innerHTML = '<option value="">Select a market</option>';
        markets.forEach(market => {
            const option = document.createElement('option');
            option.value = market.id;
            option.textContent = market.name;
            marketSelect.appendChild(option);
        });
        
        // Create day inputs
        populateDayInputs();
        
        document.getElementById('scheduleForm').reset();
        openModal('scheduleModal');
    } catch (error) {
        console.error('Error opening schedule modal:', error);
        showNotification('Error opening schedule modal', 'error');
    }
}

/**
 * Populate day input fields
 */
function populateDayInputs() {
    const daysContainer = document.querySelector('.schedule-days');
    if (!daysContainer) return;
    
    daysContainer.innerHTML = DAYS.map((day, index) => `
        <div class="form-group schedule-day">
            <label for="day${index}">${day}</label>
            <div class="day-input-group">
                <input type="time" id="openTime${index}" class="time-input" placeholder="Open time">
                <span>to</span>
                <input type="time" id="closeTime${index}" class="time-input" placeholder="Close time">
                <label class="checkbox">
                    <input type="checkbox" class="closed-checkbox" id="closed${index}">
                    Closed
                </label>
            </div>
        </div>
    `).join('');
    
    // Add closed checkbox handlers
    document.querySelectorAll('.closed-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const index = e.target.id.replace('closed', '');
            const openTime = document.getElementById(`openTime${index}`);
            const closeTime = document.getElementById(`closeTime${index}`);
            
            if (e.target.checked) {
                openTime.disabled = true;
                closeTime.disabled = true;
            } else {
                openTime.disabled = false;
                closeTime.disabled = false;
            }
        });
    });
}

/**
 * Edit schedule
 * @param {string} scheduleId - Schedule ID
 */
async function editSchedule(scheduleId) {
    try {
        const schedule = await getScheduleById(scheduleId);
        if (!schedule) return;
        
        editingScheduleId = scheduleId;
        document.getElementById('scheduleModalTitle').textContent = 'Edit Schedule';
        
        // Populate form with schedule data
        const marketSelect = document.getElementById('scheduleMarket');
        marketSelect.value = schedule.marketId || '';
        
        // Note: This is a simplified version. Full edit would require restructuring
        // the schedule data model and UI
        
        openModal('scheduleModal');
    } catch (error) {
        console.error('Error loading schedule:', error);
        showAdminStatus('Error loading schedule', 'error');
    }
}

/**
 * Delete schedule with confirmation
 * @param {string} scheduleId - Schedule ID
 */
function deleteScheduleConfirm(scheduleId) {
    confirmDelete(`Schedule ${scheduleId}`, () => deleteScheduleRecord(scheduleId));
}

/**
 * Delete schedule from database
 * @param {string} scheduleId - Schedule ID
 */
async function deleteScheduleRecord(scheduleId) {
    try {
        await deleteSchedule(scheduleId);
        showAdminStatus('Schedule deleted successfully', 'success');
        loadSchedulesTable();
    } catch (error) {
        console.error('Error deleting schedule:', error);
        showAdminStatus('Error deleting schedule', 'error');
    }
}

/**
 * Save schedule (create or update)
 */
document.addEventListener('DOMContentLoaded', () => {
    const scheduleForm = document.getElementById('scheduleForm');
    if (scheduleForm) {
        scheduleForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const marketId = document.getElementById('scheduleMarket').value;
            
            if (!marketId) {
                showNotification('Please select a market', 'error');
                return;
            }
            
            try {
                setButtonLoading(event.target.querySelector('.submit-btn'), 'Saving...');
                
                // Build schedule data for all days
                const scheduleData = {};
                for (let i = 0; i < DAYS.length; i++) {
                    const isClosed = document.getElementById(`closed${i}`).checked;
                    const openTime = document.getElementById(`openTime${i}`).value;
                    const closeTime = document.getElementById(`closeTime${i}`).value;
                    
                    const day = DAYS[i].toLowerCase();
                    
                    // If checkbox is marked as closed OR both times are empty, set as Closed
                    if (isClosed || (!openTime && !closeTime)) {
                        scheduleData[day] = 'Closed';
                    } else if (openTime && closeTime) {
                        // Both times are provided
                        scheduleData[day] = `${openTime}-${closeTime}`;
                    } else {
                        // One time is missing, treat as error for that day
                        scheduleData[day] = 'Closed';
                    }
                }
                
                // Create schedule once with all days
                await createSchedule(marketId, scheduleData);
                
                showAdminStatus('Schedule saved successfully', 'success');
                closeModal('scheduleModal');
                loadSchedulesTable();
            } catch (error) {
                console.error('Error saving schedule:', error);
                showNotification('Error saving schedule', 'error');
            } finally {
                resetButtonLoading(event.target.querySelector('.submit-btn'));
            }
        });
    }
});

console.log('Admin schedules module loaded');
