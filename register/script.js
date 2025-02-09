

let numberOfUsers = localStorage.getItem('users')? JSON.parse(localStorage.getItem('users')) : [];
const registerForm = document.getElementById("registerForm");

// Event listener for form submission
registerForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // Retrieve form values
    let name = document.getElementById("customerName").value;
    let email = document.getElementById("customerEmail").value;
    let phonenumber = document.getElementById("customerNumber").value;
    let password = document.getElementById("Pass").value;
    let confirm = document.getElementById("Confirm").value;
    let address = document.getElementById("address").value;

 // Email validation check
    if (!validateEmail(email)) {
        alert("Invalid email format!");
        return;
    }

    // Password confirmation check
    if (password !== confirm) {
        alert("Your Password Doesn't match!");
        return;
    }
    if (!validatePassword(password)) {
        alert("Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.");
        return;
    }
     // Email existence check
     if (emailExists(email)) {
        alert("Email already exists!");
        return;
    }

   

    // Create new user object
    const newUser = {
        Id : numberOfUsers.length+1,
        Name: name,
        Email: email,
        Password: password,
        Phonenumber: phonenumber,
        Address: address,
        flag : true,
        img: "imgs/user.png",
        wishlist: []
    };

    // Add the new user to local storage
    addNewUser(newUser);
});

// Function to add new user to local storage
function addNewUser(user) {
    // Retrieve existing users from localStorage or initialize an empty array
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Add the new user to the array
    // users.push(user);
    users=[...users,user];
    // Store the updated array in localStorage
    localStorage.setItem("users", JSON.stringify(users));
    window.location.href="../index.html";
    // localStorage.setItem("loggedUser", JSON.stringify(user));
}

function validatePassword(password){
    const regulerExpression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regulerExpression.test(password);

}

function validateEmail(email) {
    const regulerExpression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regulerExpression.test(String(email).toLowerCase());
}

function emailExists(email) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users.some(user => user.Email === email);
}
