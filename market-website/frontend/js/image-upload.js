/**
 * Image Upload Utilities
 * Handles image file selection, validation, and conversion to base64
 */

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

/**
 * Handle image file selection
 */
function handleImageSelect(event) {
    const files = event.target.files;
    if (files.length === 0) return;
    
    const file = files[0];
    validateAndLoadImage(file);
}

/**
 * Validate and load image file
 */
function validateAndLoadImage(file) {
    console.log('Image selected:', file.name, 'Size:', file.size, 'Type:', file.type);
    
    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
        showNotification('Invalid image type. Please upload JPG, PNG, GIF, or WebP', 'error');
        document.getElementById('marketImageFile').value = '';
        return;
    }
    
    // Validate file size
    if (file.size > MAX_IMAGE_SIZE) {
        showNotification(`Image is too large. Maximum size is 5MB (current: ${(file.size / 1024 / 1024).toFixed(2)}MB)`, 'error');
        document.getElementById('marketImageFile').value = '';
        return;
    }
    
    // Read file as base64
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const base64String = e.target.result;
            console.log('Image loaded successfully, size:', base64String.length);
            currentImageBase64 = base64String;
            
            // Display preview
            document.getElementById('imagePreview').src = base64String;
            document.getElementById('imagePreviewContainer').classList.remove('hidden');
            document.getElementById('imageInputContainer').classList.add('hidden');
            
            showNotification('Image loaded successfully', 'success');
        } catch (error) {
            console.error('Error loading image:', error);
            showNotification('Error loading image', 'error');
            document.getElementById('marketImageFile').value = '';
        }
    };
    
    reader.onerror = function() {
        console.error('FileReader error');
        showNotification('Error reading image file', 'error');
        document.getElementById('marketImageFile').value = '';
    };
    
    reader.readAsDataURL(file);
}

/**
 * Clear image upload
 */
function clearImageUpload() {
    console.log('Clearing image upload');
    currentImageBase64 = null;
    document.getElementById('marketImageFile').value = '';
    document.getElementById('imagePreview').src = '';
    document.getElementById('imagePreviewContainer').classList.add('hidden');
    document.getElementById('imageInputContainer').classList.remove('hidden');
}

/**
 * Initialize image upload listeners
 */
function initImageUpload() {
    const imageFileInput = document.getElementById('marketImageFile');
    if (imageFileInput) {
        imageFileInput.addEventListener('change', handleImageSelect);
        console.log('Image upload initialized');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initImageUpload, 100);
});

console.log('Image upload module loaded');
