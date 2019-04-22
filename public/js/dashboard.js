console.log("hello world");
const eventLink = document.getElementsByClassName("navlink")[0];
const userLink = document.getElementsByClassName("navlink")[1];
const adminLink = document.getElementsByClassName("navlink")[2];
const homeLink = document.getElementById("homeLink");
const eventDiv = document.getElementById("events");
const userDiv = document.getElementById("users");
const adminDiv = document.getElementById("admins");
const landingDiv = document.getElementById("landing");
const contArr = [userDiv, eventDiv, adminDiv, landingDiv];

eventLink.addEventListener("click", () => {
  contArr[0].style.display = "none";
  contArr[1].style.display = "grid";
  contArr[2].style.display = "none";
  contArr[3].style.display = "none";
});
userLink.addEventListener("click", () => {
  contArr[0].style.display = "block";
  contArr[1].style.display = "none";
  contArr[2].style.display = "none";
  contArr[3].style.display = "none";
});
adminLink.addEventListener("click", () => {
  contArr[0].style.display = "none";
  contArr[1].style.display = "none";
  contArr[2].style.display = "block";
  contArr[3].style.display = "none";
});
homeLink.addEventListener("click", () => {
  contArr[0].style.display = "none";
  contArr[1].style.display = "none";
  contArr[2].style.display = "none";
  contArr[3].style.display = "block";
});

const newEvent = event => {
  event.preventDefault();
  console.log();
};

function AJAXform(formID, buttonID, resultID, formMethod = "post") {
  var selectForm = document.getElementById("newEventForm"); // Select the form by ID.
  var selectButton = document.getElementById(buttonID); // Select the button by ID.
  var selectResult = document.getElementById(resultID); // Select result element by ID.
  var formAction = document.getElementById(formID).getAttribute("action"); // Get the form action.
  var formInputs = document.getElementById(formID).querySelectorAll("input"); // Get the form inputs.

  function XMLhttp() {
    var httpRequest = new XMLHttpRequest();
    var formData = new FormData();

    for (var i = 0; i < formInputs.length; i++) {
      formData.append(formInputs[i].name, formInputs[i].value); // Add all inputs inside formData().
    }

    httpRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        selectResult.innerHTML = this.responseText; // Display the result inside result element.
      }
    };

    httpRequest.open(formMethod, formAction);
    httpRequest.send(formData);
  }

  selectButton.onclick = function() {
    // If clicked on the button.
    XMLhttp();
  };

  selectForm.onsubmit = function() {
    // Prevent page refresh
    return false;
  };
}
