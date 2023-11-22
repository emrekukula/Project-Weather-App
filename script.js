function render(city) {
  const data = fetchData(`${city}`);

  data.then( (data) => {
    console.log(data);
    const obj = getInfo(data);
    renderInfo(obj);
  })
}
render('samsun');

async function fetchData(city) {
  const apiUrl = 'http://api.weatherapi.com/v1';
  const currentData = 'current.json';
  const apiKey = '25468889e088400cb00161048232011';
  const currentDataUrl = apiUrl + '/' + currentData + '?' + 'key=' + apiKey + '&' + 'q=' + city; 

  try {
    const result = await fetch(currentDataUrl, { mode: "cors" });
    const json = await result.json();
    console.log(json);
    return json;

  } catch (error) {
    console.log(error);
  }
}

function getInfo(data) {
  let obj = {};

  obj.location = data.location.name;
  obj.humidity = data.current.humidity;
  obj.temp = data.current.temp_c;
  obj.wind = data.current.wind_kph;
  obj.icon = data.current.condition.icon;
  obj.conditionText = data.current.condition.text;

  return {
    obj,
  }
}

function renderInfo(obj) {
  const humidity = document.getElementById('humidity');
  const temp = document.getElementById('temp');
  const wind = document.getElementById('wind');
  const img = document.getElementById('currentImg');
  const condition = document.getElementById('condition');
  const location = document.getElementById('location');

  location.textContent = 'Current Location: ' + obj.obj.location;
  humidity.textContent = 'Humidity: ' + obj.obj.humidity + '%';
  temp.textContent = 'Temperature: ' + obj.obj.temp + ' C';
  wind.textContent = 'Wind: ' + obj.obj.wind + ' km/h';
  img.src = 'https:' + obj.obj.icon;
  condition.textContent = 'Condition: ' + obj.obj.conditionText;
}

function getWeatherBtn() {
  const button = document.getElementById('weatherBtn');

  button.addEventListener('click', (e) => {
    e.preventDefault();
    
    const search = document.getElementById('search').value;
    render(search);
  })
}
getWeatherBtn();