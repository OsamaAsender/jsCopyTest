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
    window.location.reload()
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