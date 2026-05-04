document.addEventListener('DOMContentLoaded', function() {
    loadUsers();
});

function loadUsers() {
    const tableBody = document.getElementById('usersTableBody');
    const noDataMessage = document.getElementById('noDataMessage');
    
    // Retrieve users from Local Storage
    const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    
    if (users.length === 0) {
        noDataMessage.style.display = 'block';
        return;
    }
    
    noDataMessage.style.display = 'none';
    
    // Populate the table
    users.forEach((user, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.fullName}</td>
            <td>${user.email}</td>
            <td><span class="badge bg-info text-dark">${user.course}</span></td>
            <td>${user.registrationDate}</td>
        `;
        
        tableBody.appendChild(row);
    });
}
