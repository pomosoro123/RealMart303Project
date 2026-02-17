// ========================================
// REALMART - Schedule API Module
// ========================================

// Days of week mapping
const DAYS_OF_WEEK = {
    0: 'sunday',
    1: 'monday',
    2: 'tuesday',
    3: 'wednesday',
    4: 'thursday',
    5: 'friday',
    6: 'saturday'
};

const DAY_LABELS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * Get schedule for a specific market
 * @param {string} marketId - Market ID
 * @returns {Promise} Schedule object or null
 */
async function getScheduleForMarket(marketId) {
    try {
        const schedules = await queryDocuments('schedules', 'marketId', '==', marketId);
        return schedules.length > 0 ? schedules[0] : null;
    } catch (error) {
        console.error('Error fetching schedule:', error);
        throw error;
    }
}

/**
 * Get all schedules
 * @returns {Promise} Array of schedule objects
 */
async function getAllSchedules() {
    try {
        return await getAllDocuments('schedules');
    } catch (error) {
        console.error('Error fetching all schedules:', error);
        throw error;
    }
}

/**
 * Get schedule by ID
 * @param {string} scheduleId - Schedule ID
 * @returns {Promise} Schedule object or null
 */
async function getScheduleById(scheduleId) {
    try {
        return await getDocumentById('schedules', scheduleId);
    } catch (error) {
        console.error('Error fetching schedule by ID:', error);
        throw error;
    }
}

/**
 * Create schedule for a market (admin only)
 * @param {string} marketId - Market ID
 * @param {object} scheduleData - Schedule information
 * @returns {Promise} Document reference
 */
async function createSchedule(marketId, scheduleData) {
    try {
        if (!isUserAdmin()) {
            throw new Error('Unauthorized: Admin access required');
        }
        
        // Validate market exists
        if (!await marketExists(marketId)) {
            throw new Error('Market not found');
        }
        
        // Check if schedule already exists for this market BEFORE creating
        const existing = await getScheduleForMarket(marketId);
        if (existing) {
            throw new Error('Schedule already exists for this market');
        }
        
        // Now create the schedule
        const docRef = await addDocument('schedules', {
            marketId: marketId,
            monday: scheduleData.monday || 'Closed',
            tuesday: scheduleData.tuesday || 'Closed',
            wednesday: scheduleData.wednesday || 'Closed',
            thursday: scheduleData.thursday || 'Closed',
            friday: scheduleData.friday || 'Closed',
            saturday: scheduleData.saturday || 'Closed',
            sunday: scheduleData.sunday || 'Closed',
            holidays: scheduleData.holidays || [],
            specialNotes: scheduleData.specialNotes || ''
        });
        
        console.log('Schedule created successfully:', docRef.id);
        return docRef;
    } catch (error) {
        console.error('Error creating schedule:', error);
        throw error;
    }
}

/**
 * Update schedule (admin only)
 * @param {string} scheduleId - Schedule ID
 * @param {object} scheduleData - Updated schedule data
 * @returns {Promise}
 */
async function updateSchedule(scheduleId, scheduleData) {
    try {
        if (!isUserAdmin()) {
            throw new Error('Unauthorized: Admin access required');
        }
        
        await updateDocument('schedules', scheduleId, scheduleData);
        console.log('Schedule updated:', scheduleId);
    } catch (error) {
        console.error('Error updating schedule:', error);
        throw error;
    }
}

/**
 * Delete schedule (admin only)
 * @param {string} scheduleId - Schedule ID
 * @returns {Promise}
 */
async function deleteSchedule(scheduleId) {
    try {
        if (!isUserAdmin()) {
            throw new Error('Unauthorized: Admin access required');
        }
        
        await deleteDocument('schedules', scheduleId);
        console.log('Schedule deleted:', scheduleId);
    } catch (error) {
        console.error('Error deleting schedule:', error);
        throw error;
    }
}

/**
 * Check if market is open now
 * @param {string} marketId - Market ID
 * @returns {Promise} Boolean indicating if market is open
 */
async function isMarketOpen(marketId) {
    try {
        const schedule = await getScheduleForMarket(marketId);
        if (!schedule) {
            return false;
        }
        
        const now = new Date();
        const dayOfWeek = now.getDay();
        const dayName = DAYS_OF_WEEK[dayOfWeek];
        const daySchedule = schedule[dayName];
        
        // Check if market is closed on this day
        if (!daySchedule || daySchedule.toLowerCase() === 'closed') {
            return false;
        }
        
        // Check if today is a holiday
        const today = formatDate(now);
        if (schedule.holidays && schedule.holidays.includes(today)) {
            return false;
        }
        
        // Check if current time is within operating hours
        return isTimeInRange(now, daySchedule);
    } catch (error) {
        console.error('Error checking market open status:', error);
        return false;
    }
}

/**
 * Get opening hours for a specific day
 * @param {string} marketId - Market ID
 * @param {number} dayOfWeek - Day number (0-6, where 0 is Sunday)
 * @returns {Promise} Hours string or null
 */
async function getDayOpeningHours(marketId, dayOfWeek) {
    try {
        const schedule = await getScheduleForMarket(marketId);
        if (!schedule) {
            return null;
        }
        
        const dayName = DAYS_OF_WEEK[dayOfWeek];
        return schedule[dayName] || 'Closed';
    } catch (error) {
        console.error('Error fetching opening hours:', error);
        throw error;
    }
}

/**
 * Get formatted schedule for display
 * @param {string} marketId - Market ID
 * @returns {Promise} Array of {day, hours} objects
 */
async function getFormattedSchedule(marketId) {
    try {
        const schedule = await getScheduleForMarket(marketId);
        if (!schedule) {
            return null;
        }
        
        const formatted = [];
        for (let i = 0; i < 7; i++) {
            const dayName = DAYS_OF_WEEK[i];
            formatted.push({
                day: DAY_LABELS[i],
                hours: schedule[dayName] || 'Closed',
                dayOfWeek: i
            });
        }
        
        return formatted;
    } catch (error) {
        console.error('Error formatting schedule:', error);
        throw error;
    }
}

/**
 * Check if schedule exists for market
 * @param {string} marketId - Market ID
 * @returns {Promise} Boolean
 */
async function scheduleExistsForMarket(marketId) {
    try {
        const schedule = await getScheduleForMarket(marketId);
        return schedule !== null;
    } catch (error) {
        console.error('Error checking schedule existence:', error);
        return false;
    }
}

/**
 * Get next opening time for a market
 * @param {string} marketId - Market ID
 * @returns {Promise} {day, time} object or null
 */
async function getNextOpeningTime(marketId) {
    try {
        const schedule = await getScheduleForMarket(marketId);
        if (!schedule) {
            return null;
        }
        
        const now = new Date();
        
        // Check each day starting from tomorrow
        for (let i = 1; i <= 7; i++) {
            const checkDate = new Date(now);
            checkDate.setDate(checkDate.getDate() + i);
            
            const dayOfWeek = checkDate.getDay();
            const dayName = DAYS_OF_WEEK[dayOfWeek];
            const daySchedule = schedule[dayName];
            
            if (daySchedule && daySchedule.toLowerCase() !== 'closed') {
                const dateStr = formatDate(checkDate);
                
                // Check if date is not a holiday
                if (!schedule.holidays || !schedule.holidays.includes(dateStr)) {
                    return {
                        date: checkDate,
                        day: DAY_LABELS[dayOfWeek],
                        hours: daySchedule
                    };
                }
            }
        }
        
        return null;
    } catch (error) {
        console.error('Error getting next opening time:', error);
        throw error;
    }
}

/**
 * Set up real-time listener for schedules
 * @param {function} callback - Callback with schedules array
 * @returns {function} Unsubscribe function
 */
function onSchedulesChange(callback) {
    return onCollectionChange('schedules', callback);
}

/**
 * Set up real-time listener for specific market schedule
 * @param {string} marketId - Market ID
 * @param {function} callback - Callback with schedule object
 * @returns {function} Unsubscribe function
 */
function onScheduleChange(marketId, callback) {
    // Since we can't directly listen to query results, we'll listen to all schedules
    // and filter in the callback
    return onSchedulesChange((schedules) => {
        const schedule = schedules.find(s => s.marketId === marketId);
        callback(schedule || null);
    });
}

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Check if current time is within time range
 * @param {Date} now - Current time
 * @param {string} timeRange - Time range string (e.g., "09:00-18:00")
 * @returns {boolean}
 */
function isTimeInRange(now, timeRange) {
    if (!timeRange || timeRange.toLowerCase() === 'closed') {
        return false;
    }
    
    try {
        const [openStr, closeStr] = timeRange.split('-');
        const [openHour, openMin] = openStr.trim().split(':').map(Number);
        const [closeHour, closeMin] = closeStr.trim().split(':').map(Number);
        
        const currentHour = now.getHours();
        const currentMin = now.getMinutes();
        const currentTime = currentHour * 60 + currentMin;
        
        const openTime = openHour * 60 + openMin;
        const closeTime = closeHour * 60 + closeMin;
        
        return currentTime >= openTime && currentTime <= closeTime;
    } catch (error) {
        console.error('Error parsing time range:', error);
        return false;
    }
}

/**
 * Format date as YYYY-MM-DD
 * @param {Date} date - Date object
 * @returns {string} Formatted date
 */
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Format time for display (e.g., "09:00 AM")
 * @param {string} timeStr - Time string (e.g., "09:00")
 * @returns {string} Formatted time
 */
function formatTime(timeStr) {
    if (!timeStr) return '';
    
    try {
        const [hour, min] = timeStr.split(':').map(Number);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${String(min).padStart(2, '0')} ${ampm}`;
    } catch (error) {
        return timeStr;
    }
}

/**
 * Format time range for display (e.g., "9:00 AM - 6:00 PM")
 * @param {string} timeRange - Time range string
 * @returns {string} Formatted range
 */
function formatTimeRange(timeRange) {
    if (!timeRange || timeRange.toLowerCase() === 'closed') {
        return 'Closed';
    }
    
    try {
        const [openStr, closeStr] = timeRange.split('-');
        return `${formatTime(openStr.trim())} - ${formatTime(closeStr.trim())}`;
    } catch (error) {
        return timeRange;
    }
}

console.log('Schedule API module loaded');
