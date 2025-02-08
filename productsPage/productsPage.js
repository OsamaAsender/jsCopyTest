  const API_URL = "https://fakestoreapi.com/products";
  let myProducts= []
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
    window.location.reload()
}

  function getLoggedInUser() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users.find(user => user.flag === true) || null; 
  }
  const users = JSON.parse(localStorage.getItem('users'));
  
    
  
  let currentUser =users? users.find(user => user.flag === true):null;

if (currentUser) {
  // console.log(getLoggedInUser());
  const btnContainer = document.querySelector(".btnContainer");
  btnContainer.style.display ="none"
  const logOutBtn =document.getElementById("logoutBtn") 
  // console.log(logOutBtn);

  logOutBtn.addEventListener("click",handleLogOut)
  
}else
{
  document.getElementById("LogOutPhone").style.display="none"

  const LoginContainer = document.querySelector(".LoginContainer");
  LoginContainer.style.display ="none"
  document.getElementById("ProfileLink").style.display="none"

  // console.log("no user");
  
}


  function updateWishlist(product, action) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let loggedInUser = users.find(user => user.flag === true);
  
    if (!loggedInUser) return;
  
    if (action === "add") {
      // Avoid duplicates
      if (!loggedInUser.wishlist.some(item => item.id === product.id)) {
        loggedInUser.wishlist.push(product);
      }
    } else if (action === "remove") {
      loggedInUser.wishlist = loggedInUser.wishlist.filter(item => item.id !== product.id);
    }
  
    // Update localStorage
    localStorage.setItem("users", JSON.stringify(users));
  }

  // Function to create and display product cards
  function createProductCard(product) {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.classList.add("loveMe");
    card.dataset.data = `${product.id}`
    
    const loggedInUser = getLoggedInUser();
    let isInWishlist = loggedInUser?.wishlist.some(item => item.id === product.id);

  if (loggedInUser) {
    // Wishlist Heart Icon
    const heartContainer = document.createElement("div");
    heartContainer.classList.add("wishlist-container");

    const heart = document.createElement("i");
    heart.classList.add("fas", "fa-heart", "wishlist-heart");
    isInWishlist && heart.classList.add("liked")


    heartContainer.appendChild(heart);
    card.appendChild(heartContainer); // Append heart only if user has flag: true

    heart.addEventListener("click", () => {
      heart.classList.toggle("liked"); // Toggle heart color

      if (heart.classList.contains("liked")) {
        updateWishlist(product, "add");
      } else {
        updateWishlist(product, "remove");
      }


    });
  }

    // Product Image
    const img = document.createElement("img");
    img.classList.add("product-img");
    img.src = product.image;
    img.alt = product.title;

    // Product Details Container
    const details = document.createElement("div");
    details.classList.add("product-details");

    // Product Title
    const title = document.createElement("div");
    title.classList.add("product-title");
    title.innerText = product.title;

    // Product Price
    const price = document.createElement("div");
    price.classList.add("product-price");
    price.innerText = `$${product.price}`;

    // Product Description
    const description = document.createElement("div");
    description.classList.add("product-description");
    description.innerText = product.description.slice(0, 100) + "..."; // Limit description

    // Product Category
    const category = document.createElement("div");
    category.classList.add("product-category");
    category.innerText = product.category;

    // Rating (Stars)
    const ratingContainer = document.createElement("div");
    ratingContainer.classList.add("rating");

    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("span");
      star.classList.add("star");
      star.innerText = i <= Math.round(product.rating.rate) ? "★" : "☆"; 
      ratingContainer.appendChild(star);
    }

    // Rating Count
    const ratingCount = document.createElement("div");
    ratingCount.classList.add("rating-count");
    ratingCount.innerText = `(${product.rating.count} reviews)`;

    // Append elements to details container
    details.appendChild(title);
    details.appendChild(price);
    details.appendChild(description);
    details.appendChild(category);
    details.appendChild(ratingContainer);
    details.appendChild(ratingCount);

    // Append image and details to the card
    card.appendChild(img);
    card.appendChild(details);

    return card;
  }

  // Function to fetch and display clothing products sorted by rating
  async function fetchAndDisplayClothingProducts() {
    try {
      const response = await fetch(API_URL);
      const products = await response.json(); 

      // Filter products to show only clothing items
      const clothingProducts = products
        .filter(product => product.category.toLowerCase().includes("clothing"))
        .sort((a, b) => b.rating.rate - a.rating.rate);
        // Sort by rating (highest first)☝
        myProducts=[...clothingProducts];
        // console.log(myProducts);
        
      
      const productsContainer = document.querySelector(".products-container");

      // Clear existing content
      productsContainer.innerHTML = "";

      if (clothingProducts.length === 0) {
        productsContainer.innerHTML = "<p class='no-products'>No clothing products available.</p>";
        return;
      }

      // Loop through sorted products and display each one
      clothingProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
      });


      const loggedInUser = getLoggedInUser();
      if (loggedInUser)
      attachDoubleClickListeners();

    } catch (error) {
      let productsContainer= document.querySelector("main")
      let noProduct = document.createElement('h2');
      
      noProduct.innerText="No Product At The Current Time"
      noProduct.id="noProductMessage"
        productsContainer.append(noProduct);
    }

  }


  function attachDoubleClickListeners() {
    const loveMeElements = document.querySelectorAll(".loveMe");
    let clickTime = 0;

    loveMeElements.forEach((loveMe) => {
      loveMe.addEventListener("click", (e) => {
        if (clickTime === 0) {
          clickTime = new Date().getTime();
        } else {
          if (new Date().getTime() - clickTime < 800) {
            createHeart(e, loveMe);
            clickTime = 0;
          } else {
            clickTime = new Date().getTime();
          }
        }
      });
    });
  }

  const createHeart = (e, loveMe) => {
    const heart = document.createElement("i");
    heart.classList.add("fas", "fa-heart", "fa-h2");
  
    // Get the bounding rectangle of the .loveMe element
    const rect = loveMe.getBoundingClientRect();
  
    // Calculate the position of the click relative to the .loveMe element
    const xInside = e.clientX - rect.left;
    const yInside = e.clientY - rect.top;
  
    heart.style.top = `${yInside}px`;
    heart.style.left = `${xInside}px`;
    heart.style.position = "absolute";
  
    loveMe.appendChild(heart);
  
    const heartContainer = loveMe.querySelector(".wishlist-heart");
    if (heartContainer) {
      heartContainer.classList.toggle("liked"); // Toggle heart color
    //  console.log(heartContainer.parentElement.parentElement);
     

     let id =heartContainer.parentElement.parentElement.dataset.data;
      // console.log(id);
     if (heartContainer.classList.contains ("liked")) {
      updateWishlist( myProducts.find((item)=>item.id===Number (id)), "add");
      // console.log(myProducts.find((item)=>item.id===Number (id)));
     }else {
      // console.log(heartContainer.parentElement.parentElement);
         
         updateWishlist( myProducts.find((item)=>item.id===Number (id)), "remove");
       }

      } 
    
  
    setTimeout(() => heart.remove(), 1000);
  };

  // Call the function to fetch and display clothing products when the page loads
  fetchAndDisplayClothingProducts();


  const menuIcon = document.querySelector('#menu-icon');    
  const navbar = document.querySelector('.homeNavBar');
  
  menuIcon.onclick = () => {
      menuIcon.classList.toggle('bx-x');
      navbar.classList.toggle('active');
  }