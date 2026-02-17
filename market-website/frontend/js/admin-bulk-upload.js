/**
 * Bulk Upload Markets from Excel
 * Handles file upload, parsing, and database insertion
 */

let uploadedData = [];

/**
 * Wait for SheetJS library to load
 */
function waitForSheetJS(maxWait = 10000) {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();
        const checkInterval = setInterval(() => {
            console.log('Checking for SheetJS...', window.XLSX ? 'FOUND' : 'not found yet');
            if (window.XLSX) {
                clearInterval(checkInterval);
                console.log('SheetJS library loaded successfully!');
                resolve(true);
            } else if (Date.now() - startTime > maxWait) {
                clearInterval(checkInterval);
                console.error('Timeout waiting for SheetJS library');
                reject(new Error('SheetJS library failed to load'));
            }
        }, 100);
    });
}

/**
 * Initialize bulk upload event listeners
 */
function initBulkUpload() {
    console.log('Initializing bulk upload...');
    const fileInput = document.getElementById('excelFileInput');
    const uploadArea = document.getElementById('uploadArea');
    
    console.log('File input:', fileInput ? 'found' : 'NOT FOUND');
    console.log('Upload area:', uploadArea ? 'found' : 'NOT FOUND');
    console.log('SheetJS available:', window.XLSX ? 'YES' : 'NO');
    
    if (!fileInput || !uploadArea) {
        console.error('Critical elements not found - bulk upload disabled');
        return;
    }
    
    // File input change
    fileInput.addEventListener('change', handleFileSelect);
    console.log('File input change listener attached');
    
    // Drag and drop
    if (uploadArea) {
        uploadArea.addEventListener('dragover', handleDragOver);
        uploadArea.addEventListener('dragleave', handleDragLeave);
        uploadArea.addEventListener('drop', handleFileDrop);
        uploadArea.addEventListener('click', () => {
            console.log('Upload area clicked - opening file picker');
            fileInput.click();
        });
        console.log('Upload area listeners attached');
    }
}

/**
 * Handle file selection
 */
function handleFileSelect(event) {
    console.log('File selected event fired');
    const files = event.target.files;
    console.log('Files count:', files.length);
    console.log('File details:', files.length > 0 ? `${files[0].name} (${files[0].size} bytes)` : 'none');
    
    if (files.length > 0) {
        console.log('Parsing file:', files[0].name);
        parseExcelFile(files[0]);
    } else {
        console.warn('No files selected');
    }
}

/**
 * Handle drag over
 */
function handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.classList.add('dragover');
}

/**
 * Handle drag leave
 */
function handleDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.classList.remove('dragover');
}

/**
 * Handle file drop
 */
function handleFileDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.classList.remove('dragover');
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        parseExcelFile(files[0]);
    }
}

/**
 * Parse Excel file using SheetJS
 */
function parseExcelFile(file) {
    console.log('parseExcelFile called with file:', file.name);
    
    if (!window.XLSX) {
        console.error('SheetJS library not loaded!');
        showAdminStatus('SheetJS library not loaded', 'error');
        return;
    }
    
    console.log('SheetJS available, creating file reader...');
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            console.log('File loaded, parsing...');
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            console.log('Sheet names:', workbook.SheetNames);
            console.log('Using sheet:', sheetName);
            
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            
            console.log('Parsed rows count:', jsonData.length);
            if (jsonData.length > 0) {
                console.log('First row keys:', Object.keys(jsonData[0]));
                console.log('First row data:', jsonData[0]);
            }
            
            if (jsonData.length === 0) {
                console.warn('Excel file is empty');
                showAdminStatus('Excel file is empty', 'error');
                return;
            }
            
            uploadedData = jsonData;
            console.log('Data stored, displaying preview...');
            displayPreview(file.name, jsonData);
            
        } catch (error) {
            console.error('Error parsing Excel file:', error);
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
            showAdminStatus('Error parsing Excel file: ' + error.message, 'error');
        }
    };
    
    reader.onerror = function(error) {
        console.error('FileReader error:', error);
        showAdminStatus('Error reading file: ' + error, 'error');
    };
    
    console.log('Starting file read...');
    reader.readAsBinaryString(file);
}

/**
 * Display preview of uploaded data
 */
function displayPreview(fileName, data) {
    console.log('displayPreview called with', data.length, 'rows');
    
    const uploadArea = document.getElementById('uploadArea');
    const uploadPreview = document.getElementById('uploadPreview');
    const fileInfo = document.getElementById('fileInfo');
    const previewTableHead = document.getElementById('previewTableHead');
    const previewTableBody = document.getElementById('previewTableBody');
    
    console.log('DOM elements check:', {
        uploadArea: uploadArea ? 'found' : 'NOT FOUND',
        uploadPreview: uploadPreview ? 'found' : 'NOT FOUND',
        fileInfo: fileInfo ? 'found' : 'NOT FOUND',
        previewTableHead: previewTableHead ? 'found' : 'NOT FOUND',
        previewTableBody: previewTableBody ? 'found' : 'NOT FOUND'
    });
    
    if (!uploadArea || !uploadPreview) {
        console.error('Required DOM elements not found');
        return;
    }
    
    uploadArea.classList.add('hidden');
    uploadPreview.classList.remove('hidden');
    
    // File info
    fileInfo.textContent = `${fileName} • ${data.length} rows`;
    
    // Clear previous content
    previewTableHead.innerHTML = '';
    previewTableBody.innerHTML = '';
    
    // Get headers (column names)
    const headers = Object.keys(data[0] || {});
    console.log('Table headers:', headers);
    
    // Create header row
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    previewTableHead.appendChild(headerRow);
    
    // Create data rows (show first 5 rows)
    const rowsToShow = Math.min(data.length, 5);
    for (let i = 0; i < rowsToShow; i++) {
        const row = document.createElement('tr');
        headers.forEach(header => {
            const td = document.createElement('td');
            const value = data[i][header] || '';
            td.textContent = String(value).substring(0, 50);
            row.appendChild(td);
        });
        previewTableBody.appendChild(row);
    }
    
    // If there are more rows, show indicator
    if (data.length > 5) {
        const row = document.createElement('tr');
        const td = document.createElement('td');
        td.colSpan = headers.length;
        td.textContent = `... and ${data.length - 5} more rows`;
        td.style.textAlign = 'center';
        td.style.color = '#7f8c8d';
        td.style.fontStyle = 'italic';
        row.appendChild(td);
        previewTableBody.appendChild(row);
    }
    
    console.log('Preview displayed successfully');
}

/**
 * Reset upload
 */
function resetUpload() {
    uploadedData = [];
    const fileInput = document.getElementById('excelFileInput');
    const uploadArea = document.getElementById('uploadArea');
    const uploadPreview = document.getElementById('uploadPreview');
    const uploadStatus = document.getElementById('uploadStatus');
    
    fileInput.value = '';
    uploadArea.classList.remove('hidden');
    uploadPreview.classList.add('hidden');
    uploadStatus.classList.add('hidden');
}

/**
 * Confirm bulk upload to database
 */
async function confirmBulkUpload() {
    if (uploadedData.length === 0) {
        showAdminStatus('No data to upload', 'error');
        return;
    }
    
    const uploadPreview = document.getElementById('uploadPreview');
    const uploadStatus = document.getElementById('uploadStatus');
    const statusContent = document.getElementById('statusContent');
    
    uploadPreview.classList.add('hidden');
    uploadStatus.classList.remove('hidden');
    statusContent.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; gap: 1rem;">
            <div class="loading-spinner"></div>
            <p>Uploading ${uploadedData.length} markets...</p>
        </div>
    `;
    
    try {
        const results = await uploadMarketsToDatabase(uploadedData);
        displayUploadResults(results);
    } catch (error) {
        console.error('Error uploading markets:', error);
        uploadStatus.classList.add('error');
        statusContent.innerHTML = `
            <h4>Upload Failed</h4>
            <p>${error.message}</p>
            <button class="btn-secondary" onclick="resetUpload()">Try Again</button>
        `;
    }
}

/**
 * Upload markets to Firebase database
 */
async function uploadMarketsToDatabase(markets) {
    const results = {
        successful: [],
        failed: []
    };
    
    for (let i = 0; i < markets.length; i++) {
        try {
            const marketData = normalizeMarketData(markets[i]);
            
            // Validate required fields
            if (!marketData.name || !marketData.city || !marketData.state) {
                results.failed.push({
                    row: i + 2,
                    name: marketData.name || 'Unknown',
                    error: 'Missing required fields (Market Name, City, State)'
                });
                continue;
            }
            
            // Add market to database
            const docRef = await createMarketRecord({
                name: marketData.name,
                city: marketData.city,
                state: marketData.state,
                address: marketData.address,
                phone: marketData.phone,
                email: marketData.email,
                website: marketData.website,
                description: marketData.description,
                imageUrl: marketData.imageUrl,
                latitude: marketData.latitude,
                longitude: marketData.longitude
            });
            
            const marketId = docRef.id;
            
            // Parse and create schedule from opening days/hours
            if (marketData.openingDays && marketData.openingHours) {
                try {
                    await createScheduleFromOpeningInfo(marketId, marketData.openingDays, marketData.openingHours);
                } catch (scheduleError) {
                    console.warn(`Schedule creation failed for ${marketData.name}:`, scheduleError);
                    // Don't fail the whole market if schedule fails
                }
            }
            
            results.successful.push({
                row: i + 2,
                name: marketData.name,
                id: marketId
            });
            
        } catch (error) {
            results.failed.push({
                row: i + 2,
                name: markets[i]['Market Name'] || markets[i].name || 'Unknown',
                error: error.message
            });
        }
    }
    
    return results;
}

/**
 * Parse opening days and hours to create schedule
 * Example: "Mondays-Saturday" and "7:00AM-7:00PM"
 */
async function createScheduleFromOpeningInfo(marketId, openingDays, openingHours) {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const scheduleData = {};
    
    // Parse opening hours (e.g., "7:00AM-7:00PM")
    const timeMatch = openingHours.match(/(\d{1,2}):(\d{2})(AM|PM)\s*-\s*(\d{1,2}):(\d{2})(AM|PM)/i);
    if (!timeMatch) {
        throw new Error(`Invalid opening hours format: ${openingHours}`);
    }
    
    const openTime = timeMatch[1] + ':' + timeMatch[2] + timeMatch[3];
    const closeTime = timeMatch[4] + ':' + timeMatch[5] + timeMatch[6];
    const hours = `${openTime} - ${closeTime}`;
    
    // Parse opening days (e.g., "Mondays-Saturday" or "Sunday-Sunday" or "Monday-Fridays")
    const dayRange = openingDays.trim();
    let activeDays = [];
    
    if (dayRange.toLowerCase() === 'sundays-sundays' || dayRange.toLowerCase() === 'sunday-sunday') {
        activeDays = ['Sunday'];
    } else if (dayRange.toLowerCase() === 'mondays-saturday' || dayRange.toLowerCase() === 'monday-saturday') {
        activeDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    } else if (dayRange.toLowerCase() === 'monday-fridays' || dayRange.toLowerCase() === 'mondays-fridays') {
        activeDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    } else {
        // Try to parse as "Day1-Day2" format
        const parts = dayRange.split('-').map(d => d.trim());
        if (parts.length === 2) {
            const startDay = parts[0].replace(/s$/, ''); // Remove trailing 's' from plural
            const endDay = parts[1].replace(/s$/, '');
            
            const startIdx = daysOfWeek.findIndex(d => d.toLowerCase() === startDay.toLowerCase());
            const endIdx = daysOfWeek.findIndex(d => d.toLowerCase() === endDay.toLowerCase());
            
            if (startIdx !== -1 && endIdx !== -1) {
                if (startIdx <= endIdx) {
                    activeDays = daysOfWeek.slice(startIdx, endIdx + 1);
                } else {
                    // Wrap around week
                    activeDays = [...daysOfWeek.slice(startIdx), ...daysOfWeek.slice(0, endIdx + 1)];
                }
            }
        }
    }
    
    // Build schedule object for active days
    if (activeDays.length === 0) {
        throw new Error(`Could not parse opening days: ${openingDays}`);
    }
    
    for (const day of daysOfWeek) {
        const dayKey = day.toLowerCase();
        if (activeDays.includes(day)) {
            scheduleData[dayKey] = hours;
        } else {
            scheduleData[dayKey] = 'Closed';
        }
    }
    
    // Create the schedule
    await createSchedule(marketId, scheduleData);
}

/**
 * Normalize market data from Excel columns
 */
function normalizeMarketData(excelRow) {
    // Handle exact column names from Excel file
    return {
        name: excelRow['Market Name'] || excelRow['market name'] || '',
        city: excelRow['City'] || excelRow['city'] || '',
        state: excelRow['State'] || excelRow['state'] || '',
        address: excelRow['Address'] || excelRow['address'] || '',
        phone: excelRow['Phone Number'] || excelRow['phone number'] || excelRow['phone'] || '',
        email: excelRow['Email'] || excelRow['email'] || '',
        website: excelRow['Website'] || excelRow['website'] || '',
        description: excelRow['Desription'] || excelRow['Description'] || excelRow['description'] || '',
        imageUrl: excelRow['Image URL'] || excelRow['imageUrl'] || '',
        latitude: parseFloat(excelRow['Latitude']) || null,
        longitude: parseFloat(excelRow['Longitude']) || null,
        // Store raw opening info for schedule parsing
        openingDays: excelRow['Opening Days'] || excelRow['opening days'] || '',
        openingHours: excelRow['Opening Hours'] || excelRow['opening hours'] || ''
    };
}

/**
 * Display upload results
 */
function displayUploadResults(results) {
    const uploadStatus = document.getElementById('uploadStatus');
    const statusContent = document.getElementById('statusContent');
    
    let htmlContent = '';
    
    if (results.successful.length > 0) {
        uploadStatus.classList.add('success');
        htmlContent += `
            <h4>✓ Upload Successful</h4>
            <p>${results.successful.length} market(s) added successfully</p>
        `;
    }
    
    if (results.failed.length > 0) {
        uploadStatus.classList.add('error');
        htmlContent += `
            <h4>${results.failed.length} Market(s) Failed</h4>
            <ul class="status-list">
        `;
        results.failed.forEach(item => {
            htmlContent += `<li class="error">${item.name} (Row ${item.row}): ${item.error}</li>`;
        });
        htmlContent += `</ul>`;
    }
    
    if (results.successful.length > 0 && results.failed.length === 0) {
        htmlContent += `<button class="btn-primary" onclick="resetUpload(); loadMarketsData();">Done</button>`;
    } else {
        htmlContent += `<button class="btn-secondary" onclick="resetUpload()">Close</button>`;
    }
    
    statusContent.innerHTML = htmlContent;
    uploadStatus.classList.remove('hidden');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded fired, checking for SheetJS...');
    
    // Wait for SheetJS to load
    waitForSheetJS(10000)
        .then(() => {
            console.log('SheetJS ready, initializing bulk upload...');
            initBulkUpload();
        })
        .catch(error => {
            console.error('Failed to initialize bulk upload:', error);
            // Try initializing anyway in case SheetJS loads later
            setTimeout(initBulkUpload, 2000);
        });
});

// Also try immediate init in case DOMContentLoaded already fired
console.log('admin-bulk-upload.js loaded, document ready state:', document.readyState);
if (document.readyState === 'loading') {
    console.log('Document still loading, waiting for DOMContentLoaded');
} else {
    console.log('Document already loaded, waiting for SheetJS...');
    waitForSheetJS(10000)
        .then(() => {
            console.log('SheetJS ready, initializing bulk upload');
            initBulkUpload();
        })
        .catch(error => {
            console.error('Failed to load SheetJS:', error);
            setTimeout(initBulkUpload, 2000);
        });
}
