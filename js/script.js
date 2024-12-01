console.log("Hi, welcome to my portfolio.");

const weatherButton = document.getElementById('getWeather');

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

getLocation = async () => {
  weatherButton.style.animationPlayState = "paused";
  weatherButton.innerHTML = 'Loading...';
  try {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
    });
  } catch (err) {
    weatherButton.innerHTML = 'Get weather';
    alert('There was a problem with location');
    console.log(err);
  }
}

getWeather =  async (latitude, longitude) => {
    const weatherAPI = 'https://weatherize-app.herokuapp.com/weather';
  // const weatherAPI = 'http://localhost:8080/weather'; //http-server...
  const params = new URLSearchParams({
    lat: latitude,
    lng: longitude
  }).toString();

  try {
    const response =  await fetch(`${weatherAPI}?${params}`);
    const data = await response.json();
    if (data) {
      displayWeather(data);
    } else {
      weatherButton.innerHTML = 'Get weather';
      alert('There was a problem with the weather data');
    }

  } catch (error) {
    weatherButton.innerHTML = 'Get weather';
    alert('There was a problem with loading the weather');
    console.log(error)
  }
}

displayWeather = (weather) => {
  const weatherCard = document.getElementById('weather-card');
  const city = document.getElementById('city');
  const country = document.getElementById('country');
  const temperature = document.getElementById('temperature');
  const sky = document.getElementById('sky');
  city.innerHTML = `${weather.name}, &nbsp;`;
  country.innerHTML = weather.sys.country;
  temperature.innerHTML = `${(weather.main.temp - 273.15).toFixed(1)} C°&nbsp;`;
  sky.innerHTML = weather.weather[0].main;

  weatherCard.style.display = 'flex';
  weatherButton.style.display = 'none';
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

const getWeatherButton = document.getElementById('getWeather');
getWeatherButton.addEventListener('click', getLocation)




