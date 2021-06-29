// display links for logged in/ logged out users
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
const accountDetails = document.querySelector(".account-details");
const showLinks = (user) => {
  if (user) {
    //   display bio from database into the account of user
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((document) => {
        // info about user
        const html = `<div> You are logged in with : ${user.email} </div>
        <div>Description: ${document.data().bio}</div>`;
        accountDetails.innerHTML = html;
        // display links if the user is logged in or not
      });
    loggedInLinks.forEach((link) => {
      link.style.display = "block";
    });
    loggedOutLinks.forEach((link) => {
      link.style.display = "none";
    });
  } else {
    //   if user not logged in hide info
    accountDetails.innerHTML = "";
    // if user not logged in hide some links
    loggedInLinks.forEach((link) => {
      link.style.display = "none";
    });
    loggedOutLinks.forEach((link) => {
      link.style.display = "block";
    });
  }
};
// display elements from firebase into the DOM
const partsList = document.querySelector(".parts");
const setupParts = (data) => {
  // here the data are the data.docs from auth.js ,where we get them from firestore
  if (data.length) {
    let html = "";
    data.forEach((item) => {
      const part = item.data(); //data() is a firestore method where we can get the name of items in database
      const li = `
          <li>
             <div class="collapsible-header  teal accent-2">${part.part}</div>
             <div class="collapsible-body white">${part.description}</div>
          </li>
        `;
      html += li;
    });
    partsList.innerHTML = html;
  } else {
    partsList.innerHTML = ` <div class="container1 ">
    <h1 class="welcome" >Online Repair LogBook</h1>
    <h3 class="description">Here you can check the parts changed on your car and their prices</h3>
    <h4 class="login-text">Please login with your username and password , or create an account!</h4>
</div>`;
  }
};
// setup materialize components
document.addEventListener("DOMContentLoaded", function () {
  const modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);
  const items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});
