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
  weatherButton.innerHTML = 'Locating...';
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        weatherButton.innerHTML = 'Get weather';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert('User denied the request for Geolocation.');
            break;
          case error.POSITION_UNAVAILABLE:
            alert('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            alert('The request to get user location timed out.');
            break;
          default:
            alert('An unknown error occurred.');
            break;
        }
      });
  }

getWeather =  async (latitude, longitude) => {
    weatherButton.innerHTML = 'Loading...';
    const weatherAPI = 'https://portfolio-ai-99cb0016d38f.herokuapp.com/weather'; //http-server (...) -p 3000;
    // const weatherAPI = 'http://localhost:8080/weather'; //http-server (...) -p 3000;
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
  city.innerHTML = `${weather.city}, &nbsp;`;
  country.innerHTML = weather.country;
  temperature.innerHTML = `${weather.temperature} C°&nbsp;`;
  sky.innerHTML = weather.sky;

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

// const getWeatherButton = document.getElementById('getWeather');
weatherButton.addEventListener('click', getLocation);


// openAi implementation
const input = document.getElementById('ai-question');
input.addEventListener('keydown', (event) =>  {
  if (event.key === 'Enter') {
    sendQuery();
  }
})
sendQuery = async () => {
  const url = 'https://portfolio-ai-99cb0016d38f.herokuapp.com/query';
  // const url = 'http://localhost:8080/query';
  const query = await document.getElementById('ai-question').value;
  const headers = {"Content-Type": "application/json"};
  const button = document.getElementById('open-ai-button');
  const errorMessage = "Sorry, there was a problem with connection to OpenAI."
    
  if (query.trim()) {
    button.innerHTML = '...';
    addQuery(true, query);
    try {
      const response =  await fetch(url, {
          method: 'POST', body: JSON.stringify({ query }),
          headers
        });
        const text = response.ok? await response.text(): errorMessage;
        if (text.trim()) {
          addQuery(false, text);
        }
        button.innerHTML = 'Send';
      } catch (error) {
        console.log(error)
      }
    }
}

addQuery = (isQuery, content) => {
  const chat = document.getElementById('chat');
  const text = document.createElement('p');
  const classToAdd = isQuery? 'query': 'ai-answer';

  text.innerHTML = content;
  text.classList.add(classToAdd);
  chat.appendChild(text);
  chat.scrollTo(0, chat.scrollHeight)
  input.value = '';
}

const initNews = async () => {
  try {
    const response =  await fetch('https://portfolio-ai-99cb0016d38f.herokuapp.com/news');
    // const response =  await fetch('http://localhost:8080/news');
  } catch (error) {
  }
}

initNews();




