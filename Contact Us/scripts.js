document.addEventListener("DOMContentLoaded", function () {
  // إعداد المداخل
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
      const userExists = users.some(user => user.Email === email && user.Name === name);

      if (!userExists) {
        alert("Email or name does not match.");
        return;
      }
      const feedback = {
        id: Date.now(),
        name: name,
        text: message,
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6',
      };

      let formData = JSON.parse(localStorage.getItem("userFeedback")) || [];

      formData.push(feedback);

      localStorage.setItem("userFeedback", JSON.stringify(formData));

      form.reset();

      alert("Your feedback has been submitted successfully!");
    });
  }

  const usersArray = [
    { Id: 1, Name: "basil", Email: "basil@gmail.com", Password: "pass1", Phonenumber: "01203103", Address: "address1", flag: false, img: '', wishlist: [{ category: "menClothing", description: "Item number1", id: 1, image: "img1", price: 0, rating: { count: 0, rate: 0 } }] },
    { Id: 2, Name: "ahmad", Email: "ahmad@gmail.com", Password: "pass2", Phonenumber: "01203103", Address: "address2", flag: true, img: '', wishlist: [{ category: "menClothing", description: "Item number2", id: 1, image: "img2", price: 0, rating: { count: 0, rate: 0 } }] },
    { Id: 3, Name: "basil", Email: "basil@gmail.com", Password: "pass3", Phonenumber: "01203103", Address: "address3", flag: false, img: '', wishlist: [{ category: "menClothing", description: "Item number3", id: 1, image: "img3", price: 0, rating: { count: 0, rate: 0 } }] },
  ];
  localStorage.setItem('users', JSON.stringify(usersArray));

  // // بيانات ملاحظات المستخدمين
  // let userFeedback = [
  //   {id: 1, name: "name1", email:"name1@gmail.com", text: "the best website ever", photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6'},
  //   {id: 2, name: "name2", email:"name2@gmail.com", text: "amazing user experience", photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6'},
  //   {id: 3, name: "name3", email:"name3@gmail.com", text: "loved the interface!", photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6'}
  // ];
  // localStorage.setItem("userFeedback", JSON.stringify(userFeedback));

  const users = JSON.parse(localStorage.getItem('users'));
  console.log(users);

  const feedbacks = JSON.parse(localStorage.getItem('userFeedback'));
  console.log(feedbacks);
});
