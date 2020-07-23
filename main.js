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
//function to fetch data from realtime database

let updatedVals = {};
function gotData(data) {
  var users = document.querySelectorAll(".users");
  for (var i = 0; i < users.length; i++) {
    users[i].remove();
  }
  var user = data.val();
  console.log("user: ", user);
  var keys = Object.keys(user);
  var table = document.getElementById("userlist");
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    var name = user[k].name;
    var email = user[k].email;
    var phone = user[k].phone;
    updatedVals[k] = {
      name: name,
      email: email,
      phone: phone,
    };
    console.log(updatedVals);
    table.innerHTML += `<form id=${k} class="row updateForm users">
            <span class="col-sm">${i + 1}</span>
            <input type="text" id="${
              k + name
            }" data-id=${k} value="${name}" name="name" class="col-sm" onchange="onChange(this)" onclick="editUser(this)" readonly/>
            <input id=${email} data-id=${k} type="email" value=${email} name="email" class="col-sm" onchange="onChange(this)" onclick="editUser(this)" readonly/>
            <input id=${phone} data-id=${k} type="number" value=${phone} name="phone" class="col-sm" onchange="onChange(this)" onclick="editUser(this)" readonly/>
            <input type="submit" id=${k} value="Save" class="col-sm p-3 btn-success"/>
            <input id=${k} type="button" value="Delete" class="col-sm p-3 btn-danger" onclick="deleteUser(this)"/>
    </form>`;
  }
  const forms = document.getElementsByClassName("updateForm");
  for (i = 0; i < forms.length; i++) {
    forms[i].addEventListener("submit", updateForm);
  }
}
function onChange(e) {
  updatedVals[e.dataset.id] = {
    ...updatedVals[e.dataset.id],
    [e.name]: e.value,
  };
  // console.log(updatedVals);
}
function editUser(e) {
  let key = e.id;
  let edit = true;
  document.getElementById(key).readOnly = !edit;
}

function updateForm(e) {
  e.preventDefault();
  var k = e.target.id;
  var n = updatedVals[k].name;
  var e = updatedVals[k].email;
  var p = updatedVals[k].phone;
  updateUser(k, n, e, p);
}

function updateUser(key, name, email, phone) {
  let userRef = firebase.database().ref(key);
  userRef.update({
    name: name,
    email: email,
    phone: phone,
  });
}

function deleteUser(e) {
  let key = e.id;
  console.log(key);
  let userRef = firebase.database().ref(key);
  userRef.remove();
  console.log("User Removed");
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
  console.log("id: ", id);
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
