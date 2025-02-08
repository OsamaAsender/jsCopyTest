document.addEventListener('DOMContentLoaded', function() {
    // Add event listener for login form submission
    document.getElementById('loginForm').addEventListener('submit', function(event){
        event.preventDefault();
        const email = document.getElementById("Email").value;
        const password = document.getElementById("pass").value;

        const users = JSON.parse(localStorage.getItem("users")) || []; // Retrieve users from localStorage
        const user = users.find(user => user.Email === email && user.Password === password);
        
        if (user) {
            // Use map to update the flag property
            const updatedUsers = users.map(u => {
                if (u.Email === email && u.Password === password) {
                    u.flag = true; // Set flag to true on sign-in
                }
                return u;
            });

            // Save updated users array back to localStorage
            localStorage.setItem("users", JSON.stringify(updatedUsers));
            // localStorage.setItem("loggedUser", JSON.stringify(user));

            alert("Signed In");
            window.location.href = "index.html";
        } else if (emailExists(email)) {
            alert('Incorrect Password!');
        } else {
            alert("User Not Found!");
        }
    });
});

function emailExists(email) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(user => user.Email === email);
}
