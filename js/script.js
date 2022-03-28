console.log("Hi, welcome to my portfolio.");

function underConstruction() {
  alert("Sorry, this case study is still under construction.");
}

function menuToggle() {
  var x = document.getElementById('myNavtoggle');
  if (x.className === 'navtoggle' && screen.width < 640) {
    x.className += ' responsive';
  } else {
    x.className = 'navtoggle';
  }
}

/*
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-83px";
  }
  prevScrollpos = currentScrollPos;
}
*/

var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos || currentScrollPos < 50) {
    document.getElementById("navbar").style.top = "0";
  }  else {
    document.getElementById("navbar").style.top = "-83px";
  }
  prevScrollpos = currentScrollPos;
}

//current year in the footer
const date = new Date();
const currentYear = date.getFullYear(); 
document.getElementById("year").innerHTML = currentYear;

//color img on card hover
showImage = (e) => {
  const menuProjectImg = document.getElementById('menu-project-img');
  const menuProjectGif = document.getElementById('menu-project-gif');
  const img = e.target.getElementsByTagName('img')[0];
  //img => gif for the menu project
  if (img === menuProjectImg) {
    menuProjectImg.style.display = 'none';
    menuProjectGif.style.display = 'block';
    menuProjectGif.style.mixBlendMode = 'normal';
    menuProjectGif.style.filter = 'grayscale(0)';
  }
  img.style.mixBlendMode = 'normal';
  img.style.filter = 'grayscale(0)';
}

hideImage = (e) => {
  const menuProjectImg = document.getElementById('menu-project-img');
  const menuProjectGif = document.getElementById('menu-project-gif');
  const img = e.target.getElementsByTagName('img')[0];
  img.style.mixBlendMode = 'overlay';
  img.style.filter = 'grayscale(100%)';
  menuProjectImg.style.display = 'block';
  menuProjectGif.style.display = 'none';
  menuProjectGif.style.mixBlendMode = 'overlay';
  menuProjectGif.style.filter = 'grayscale(100%)';
}

covidRotate = () => {
  const covidImg= document.getElementById('covid-img');
  covidImg.style.animationPlayState = "running";
}

covidStopRotate = () => {
  const covidImg= document.getElementById('covid-img');
  covidImg.style.animationPlayState = "paused";
}

//project imgs
const projectCards = document.getElementsByClassName("dev-project");
for (let i = 0; i < projectCards.length; i++) {
  projectCards[i].addEventListener('mouseenter', showImage );
  projectCards[i].addEventListener('mouseleave', hideImage );
}

//profile img
const profileSection = document.getElementById('profile');
profileSection.addEventListener('mouseenter', showImage);
profileSection.addEventListener('mouseleave', hideImage);

//covid-img
const covidProject = document.getElementById('covid-info');
covidProject.addEventListener('mouseenter', covidRotate);
covidProject.addEventListener('mouseleave', covidStopRotate);

