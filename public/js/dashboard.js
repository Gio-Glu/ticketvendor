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
