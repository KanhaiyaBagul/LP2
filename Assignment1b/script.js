document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const course = document.getElementById('course').value;
    
    const userData = {
        id: Date.now(),
        fullName: fullName,
        email: email,
        course: course,
        registrationDate: new Date().toLocaleDateString()
    };
    
    const statusMsg = document.getElementById('statusMessage');
    const submitBtn = document.getElementById('submitBtn');
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...';
    statusMsg.innerHTML = '';
    
    // Simulating AJAX POST using Promises
    // In a real scenario, you'd use fetch() to send this to a backend server.
    const mockAjaxPost = new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulated success response
            resolve({ status: 200, message: "Registration successful via mock AJAX POST" });
        }, 1000); // 1 second delay to mock network request
    });
    
    mockAjaxPost.then(response => {
        if(response.status === 200) {
            // Retrieve existing users from Local Storage
            let users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
            
            // Push new user to array
            users.push(userData);
            
            // Save updated array to Local Storage
            localStorage.setItem('registeredUsers', JSON.stringify(users));
            
            // Show success message
            statusMsg.innerHTML = `<div class="alert alert-success">${response.message}</div>`;
            
            // Reset form
            document.getElementById('registrationForm').reset();
        }
    }).catch(error => {
        statusMsg.innerHTML = `<div class="alert alert-danger">Registration failed. Please try again.</div>`;
    }).finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Register';
    });
});
