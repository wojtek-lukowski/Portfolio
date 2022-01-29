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
  const img = e.target.getElementsByTagName('img')[0];
  img.style.mixBlendMode = 'normal';
  // const strong = e.target.getElementsByTagName('strong')[0];
  // strong.classList.add('strong');
}

hideImage = (e) => {
  const img = e.target.getElementsByTagName('img')[0];
  img.style.mixBlendMode = 'overlay';
  // const strong = e.target.getElementsByTagName('strong')[0];
  // strong.classList.remove('strong');

}

const projectCards = document.getElementsByClassName("dev-project");
for (let i = 0; i < projectCards.length; i++) {
  projectCards[i].addEventListener('mouseenter', showImage );
  projectCards[i].addEventListener('mouseleave', hideImage );
}
