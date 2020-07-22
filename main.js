// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBsmZsXL0WsZWrccIw9WmgTKOaKkcZ6jZw",
  authDomain: "contactform-4e849.firebaseapp.com",
  databaseURL: "https://contactform-4e849.firebaseio.com",
  projectId: "contactform-4e849",
  storageBucket: "contactform-4e849.appspot.com",
  messagingSenderId: "1033180230517",
  appId: "1:1033180230517:web:fb50cfea7a72cd0573193c",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
var messagesRef = firebase.database().ref();

//var ref = database.ref("contactform-4e849");
messagesRef.on("value", gotData, errData);

function gotData(data) {
  // console.log(data.val());
  var user = data.val();
  var keys = Object.keys(user);
  var table = document.getElementById("userlist");
  // console.log(keys);
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    var name = user[k].name;
    var email = user[k].email;
    var phone = user[k].phone;
    table.insertAdjacentHTML(
      "afterend",
      `<tr><th scope="row">${
        i + 1
      }</th><td>${name}</td><td>${email}</td><td>${phone}</td></tr>`
    );
  }
}

function errData(err) {
  console.log("Error");
  console.log(err);
}

// listen
document.getElementById("contactForm").addEventListener("submit", submitForm);

// submit form
function submitForm(e) {
  e.preventDefault();
  var name = getInputVal("name");
  var email = getInputVal("email");
  var phone = getInputVal("phone");

  // save message
  saveMessage(name, email, phone);

  // show alert
  document.querySelector(".alert").style.display = "block";

  //hide alert after 3 sec
  setTimeout(function () {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  //clear form
  document.getElementById("contactForm").reset();
}

//function to get form values
function getInputVal(id) {
  return document.getElementById(id).value;
}

//save msg to firebase
function saveMessage(name, email, phone) {
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    email: email,
    phone: phone,
  });
}
