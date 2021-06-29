auth.onAuthStateChanged((user) => {
  if (user) {
    db.collection("carparts").onSnapshot(
      (data) => {
        setupParts(data.docs);
      },
      (err) => {
        console.log(err);
      }
    );
    showLinks(user);
    console.log("user logged in ", user);
  } else {
    setupParts([]);
    showLinks();
    console.log("user logged out");
  }
});
const createForm = document.querySelector("#create-form");
createForm.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("carparts")
    .add({
      part: createForm["title"].value,
      description: createForm["content"].value,
    })
    .then(() => {
      const modal = document.querySelector("#modal-create");
      M.Modal.getInstance(modal).close();
      createForm.reset();
    });
});
const signUpForm = document.querySelector("#signup-form");
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = signUpForm["signup-email"].value;
  const password = signUpForm["signup-password"].value;
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userData) => {
      return db.collection("users").doc(userData.user.uid).set({
        bio: signUpForm["signup-bio"].value,
      });
    })
    .then(() => {
      const modal = document.querySelector("#modal-signup");
      M.Modal.getInstance(modal).close();
      signUpForm.reset();
    });
});
const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut();
});
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;
  auth.signInWithEmailAndPassword(email, password).then((userData) => {});
  const modal = document.querySelector("#modal-login");
  M.Modal.getInstance(modal).close();
  loginForm.reset();
});
