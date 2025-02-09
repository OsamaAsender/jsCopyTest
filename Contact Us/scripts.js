function goToProfile(){
  
    window.location.href='../profile/index.html'

}

document.getElementById("profilePic").src=`../assets/imgs/user.png`
const users = JSON.parse(localStorage.getItem('users'));
console.log(users);

let currentUser =users? users.find(user => user.flag === true):null;

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

document.addEventListener("DOMContentLoaded", function () {
  const inputs = document.querySelectorAll(".input");

  function focusFunc() {
    let parent = this.parentNode;
    parent.classList.add("focus");
  }

  function blurFunc() {
    let parent = this.parentNode;
    if (this.value == "") {
      parent.classList.remove("focus");
    }
  }

  inputs.forEach((input, index) => {
    input.addEventListener("focus", focusFunc);
    input.addEventListener("blur", blurFunc);

    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();

        const inputArray = Array.from(inputs);
        const currentIndex = inputArray.indexOf(event.target);
        const nextInput = inputArray[currentIndex + 1];

        if (nextInput) {
          nextInput.focus();
        }
      }
    });
  });

  const form = document.querySelector("#contactForm");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.querySelector("input[name='name']").value;
      const email = document.querySelector("input[name='email']").value;
      const phone = document.querySelector("input[name='phone']").value;
      const message = document.querySelector("textarea[name='message']").value;
      const users = JSON.parse(localStorage.getItem("users")) || [];
      console.log(users);
      
      const userExists = users.find(user => user.Email === email && user.Name === name);
      
      if (!userExists) {
        alert("Email or name does not match.");
        return;
      }
      console.log("curent user is ",userExists);
      
      const feedback = {
        id: Date.now(),
        name: userExists.Name,
        text: message,
        photo: `./assets/${userExists.img}`,
      };
      let formData = JSON.parse(localStorage.getItem("userFeedback")) || [];

      formData.push(feedback);

      localStorage.setItem("userFeedback", JSON.stringify(formData));

      form.reset();

      alert("Your feedback has been submitted successfully!");
    });
  }


  const users = JSON.parse(localStorage.getItem('users'));
  // console.log(users);

  const feedbacks = JSON.parse(localStorage.getItem('userFeedback'));
  console.log(feedbacks);
});
const menuIcon = document.querySelector('#menu-icon');    
const navbar = document.querySelector('.homeNavBar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}