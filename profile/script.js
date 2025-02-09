if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify([userdata])); 
  }
  
  function loadUserData() { 
    const users = JSON.parse(localStorage.getItem("users")) || []; 
    const loggedInUser = users.find(user => user.flag === true); 
  
    if (!loggedInUser) { 
        alert("No logged-in user found!"); 
        return; 
    } 
  
    document.getElementById("userName").innerText = loggedInUser.Name; 
    document.getElementById("userEmail").innerText = `📧 ${loggedInUser.Email}`; 
    document.getElementById("userPhone").innerText = `📞 ${loggedInUser.Phonenumber}`; 
    document.getElementById("userAddress").innerText = `📍 ${loggedInUser.Address}`; 
  
    if (loggedInUser.img) { 
        document.getElementById("profileImg").src = loggedInUser.img; 
        document.getElementById("profileImg").style.display = "block"; 
    } else {
        document.getElementById("profileImg").style.display = "none"; 
    }
  
    // Load wishlist
    loadWishlist(loggedInUser);
  } 
  
  // Display wishlist items 
  function loadWishlist(user) {
    const productsContainer = document.getElementById("productsContainer");
    productsContainer.innerHTML = "";
    let total = 0;
  let str ="aaa";
  
    user.wishlist.forEach((item, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
  
        card.innerHTML = `
            <img src="${item.image}" alt="Product Image">
            <div class="card-content">
                <h3>${item.category}</h3>
                <p>${item.description.slice(0,100)}...</p>
                <p class="price">$${item.price.toFixed(2)}</p>
                <div class="quantity-controls">
                    <button class="decrease" data-index="${index}">➖</button>
                    <span class="quantity">${item.quantity || 1}</span>
                    <button class="increase" data-index="${index}">➕</button>
                </div>
                <button class="remove" data-index="${index}">🗑️ Remove</button>
            </div>
        `;
  
        productsContainer.appendChild(card);
        total += item.price * (item.quantity || 1);
    });
  
    document.getElementById("totalPrice").innerText = `Total: $${total.toFixed(2)}`;
    attachEventListeners(user);
  }
  
  // Attach event listeners to buttons
  function attachEventListeners(user) {
    document.querySelectorAll(".increase").forEach(button => {
        button.addEventListener("click", function () {
            const index = this.getAttribute("data-index");
            user.wishlist[index].quantity = (user.wishlist[index].quantity || 1) + 1;
            saveAndReload(user);
        });
    });
  
    document.querySelectorAll(".decrease").forEach(button => {
        button.addEventListener("click", function () {
            const index = this.getAttribute("data-index");
            if (user.wishlist[index].quantity > 1) {
                user.wishlist[index].quantity--;
                saveAndReload(user);
            }
        });
    });
  
    document.querySelectorAll(".remove").forEach(button => {
        button.addEventListener("click", function () {
            const index = this.getAttribute("data-index");
            user.wishlist.splice(index, 1);
            saveAndReload(user);
        });
    });
  }
  
  // Save updated wishlist and reload UI
  function saveAndReload(user) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex(u => u.Id === user.Id);
    if (userIndex !== -1) {
        users[userIndex] = user;
        localStorage.setItem("users", JSON.stringify(users));
    }
    loadWishlist(user);
  }
  
  // Profile Image Upload 
  document.getElementById("uploadImgBtn").addEventListener("click", function () { 
    document.getElementById("profileImageInput").click(); 
  }); 
  
  document.getElementById("profileImageInput").addEventListener("change", function () { 
    const file = this.files[0]; 
    if (!file) return; 
  
    const reader = new FileReader(); 
    reader.onload = function (event) { 
        let users = JSON.parse(localStorage.getItem("users")) || []; 
        let loggedInUser = users.find(user => user.flag === true); 
        
        if (loggedInUser) {
            loggedInUser.img = event.target.result; 
            localStorage.setItem("users", JSON.stringify(users)); 
  
            document.getElementById("profileImg").src = event.target.result; 
            document.getElementById("profileImg").style.display = "block"; 
        } 
    }; 
    reader.readAsDataURL(file); 
  }); 
  
  // Buy Now 
  document.getElementById("buyBtn").addEventListener("click", function () { 
    alert("🎉 Order placed successfully!"); 
  }); 
  
  // Load user data on page load 
  document.addEventListener("DOMContentLoaded", loadUserData);









//////////////////
// basil is here 
const menuIcon = document.querySelector('#menu-icon');    
const navbar = document.querySelector('.homeNavBar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

const users = JSON.parse(localStorage.getItem('users'));
// console.log("users are ", users);
let currentUser =users? users.find(user => user.flag === true):null;
if (!currentUser) {
    document.getElementById("contactUs").href="../login/index.html"

}

function handleLogOut(){
    // console.log(users);
    
let updatedUsers =   users.map((user)=>{
      if (user.Id === currentUser.Id)
      { user.flag = false;
        return user
      }else
      return user
    });
    // console.log(updatedUsers);
    localStorage.setItem("users",JSON.stringify(updatedUsers));
    window.location.href="../index.html"
}
// console.log(currentUser);

// Handle case where no user is flagged
if (!currentUser) {
    document.getElementById("LogOutPhone").style.display="none"
    let LoginContainer= document.querySelector(".LoginContainer")
    LoginContainer.style.display="none"

    let btnContainer= document.querySelector(".btnContainer")
    btnContainer.style.display="block"

    document.getElementById("ProfileLink").style.display="none"

} else {
    // console.log(`The Current user is: ${currentUser.Name}`);
    let btnContainer= document.querySelector(".btnContainer")
    btnContainer.style.display="none"
    
    let LoginContainer= document.querySelector(".LoginContainer")

    let logOut= document.getElementById("logoutBtn")
    
    logOut.addEventListener("click",handleLogOut)
    
    LoginContainer.innerHTML = "";
    const profileImg = document.createElement("img");

    profileImg.id = "profilePic";
    profileImg.className = "profilePic";
    profileImg.src = "../assets/imgs/user.png";
    profileImg.alt = "profile";
    profileImg.title = "profile";  

    LoginContainer.append(profileImg,logOut)
}