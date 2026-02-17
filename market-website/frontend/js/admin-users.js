// ========================================
// REALMART - Admin Users Module
// ========================================

/**
 * Fetch all users from Firestore
 * @returns {Array} Array of user objects
 */
async function getAllUsers() {
    try {
        return await getAllDocuments('users');
    } catch (error) {
        console.error('Error fetching all users:', error);
        throw error;
    }
}

/**
 * Load and display users in table
 */
async function loadUsersTable() {
    try {
        showLoadingSpinner('loadingUsers');
        
        const users = await getAllUsers();
        const tbody = document.getElementById('usersTableBody');
        const noUsersMsg = document.getElementById('noUsers');
        
        if (!tbody) return;
        
        if (users.length === 0) {
            tbody.innerHTML = '';
            noUsersMsg.classList.remove('hidden');
            hideLoadingSpinner('loadingUsers');
            return;
        }
        
        noUsersMsg.classList.add('hidden');
        
        tbody.innerHTML = users.map(user => `
            <tr data-user-id="${user.id}">
                <td data-label="Email">${user.email}</td>
                <td data-label="Role">
                    <select class="role-select" onchange="updateUserRole('${user.id}', this.value)">
                        <option value="user" ${user.role === 'user' ? 'selected' : ''}>User</option>
                        <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
                    </select>
                </td>
                <td data-label="Created">${formatAdminDate(user.createdAt)}</td>
                <td data-label="Actions">
                    <button class="btn-small btn-danger" onclick="deleteUserConfirm('${user.id}', '${user.email}')">Delete</button>
                </td>
            </tr>
        `).join('');
        
        hideLoadingSpinner('loadingUsers');
    } catch (error) {
        console.error('Error loading users:', error);
        showAdminStatus('Error loading users', 'error');
        hideLoadingSpinner('loadingUsers');
    }
}

/**
 * Update user role
 * @param {string} userId - User ID
 * @param {string} newRole - New role (user or admin)
 */
async function updateUserRole(userId, newRole) {
    try {
        await updateDocument('users', userId, { role: newRole });
        showAdminStatus(`User role updated to ${newRole}`, 'success');
    } catch (error) {
        console.error('Error updating user role:', error);
        showAdminStatus('Error updating user role', 'error');
        loadUsersTable(); // Reload to reset the select
    }
}

/**
 * Delete user with confirmation
 * @param {string} userId - User ID
 * @param {string} userEmail - User email
 */
function deleteUserConfirm(userId, userEmail) {
    confirmDelete(userEmail, () => deleteUserRecord(userId));
}

/**
 * Delete user from database
 * @param {string} userId - User ID
 */
async function deleteUserRecord(userId) {
    try {
        await deleteDocument('users', userId);
        showAdminStatus('User deleted successfully', 'success');
        loadUsersTable();
    } catch (error) {
        console.error('Error deleting user:', error);
        showAdminStatus('Error deleting user', 'error');
    }
}

console.log('Admin users module loaded');
