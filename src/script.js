var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const configuration = window.bridge.information.getConfig()

function pickTz() {
    if (configuration.decor["12hr"] == true) {
        return new Date().toLocaleTimeString("en-US").replace(/(.*)\D\d+/, '$1');
    } if (configuration.decor["12hr"] !== true) {
        return new Date().toLocaleTimeString("en-GB").replace(/(.*)\D\d+/, '$1');
    }
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getTime() {
    var d = pickTz();
    document.getElementById("timeJS").innerHTML = d;
}

function getGreeting() {
    const name = configuration.decor.name
    const hoursOfDay = {
        "morning": [5, 6, 7, 8, 9, 10, 11],
        "noon": [12],
        "afternoon": [13, 14, 15, 16, 17],
        "evening": [18, 19, 20, 21],
        "night": [22, 23, 0, 1, 2, 3, 4]
    };

    const greetings = {
        "morning": [`Good morning, ${name}!`, `Rise and shine, ${name}!`, `How's your morning ${name}?`, `Did you have a nice sleep ${name}?`, `When's breakfast, ${name}?`],
        "noon": [`Howdy, ${name}, how's your lunch been?`, `Lunch-time, ${name}!`, `How was the food, ${name}?`],
        "afternoon": [`Good afternoon, ${name}!`, `Have a good rest of your day, ${name}!`, `Good afternoon ${name}, when's dinner?`, `Quite hungry, ${name}, what about you?`],
        "evening": [`Evenin', ${name}. How's your night been?`, `${name}, dinner time!`, `${name}, good evening!`],
        "night": [`Good night, ${name}. Sleep well!`, `Good night ${name}.`, `Don't let the bed bugs bite, ${name}.`]
    }

    if (hoursOfDay.morning.includes(new Date().getHours())) {
        document.getElementById("greeting").innerText = greetings.morning[Math.floor(Math.random() * greetings.morning.length)];
    } if (hoursOfDay.noon.includes(new Date().getHours())) {
        document.getElementById("greeting").innerText = greetings.noon[Math.floor(Math.random() * greetings.noon.length)];
    } if (hoursOfDay.afternoon.includes(new Date().getHours())) {
        document.getElementById("greeting").innerText = greetings.afternoon[Math.floor(Math.random() * greetings.afternoon.length)];
    } if (hoursOfDay.evening.includes(new Date().getHours())) {
        document.getElementById("greeting").innerText = greetings.evening[Math.floor(Math.random() * greetings.evening.length)];
    } if (hoursOfDay.night.includes(new Date().getHours())) {
        document.getElementById("greeting").innerText = greetings.night[Math.floor(Math.random() * greetings.night.length)];
    }
}

function getDDMMYY() {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const birthday = configuration.decor.birthday.toLowerCase().split(" ");
    const dateObj = new Date();
    const month = monthNames[dateObj.getMonth()];
    let day = String(dateObj.getDate());
    const year = dateObj.getFullYear();
    const dayforweek = days[dateObj.getDay()];
    output = `${dayforweek}, ${day} ${month} ${year}`;
    if (birthday[0] == day && birthday[1] == month.toLowerCase()) confetti.start(5000)
    document.getElementById("daynamemid").innerHTML = output;
}

function weather() {
    let units = {}
    if (configuration.units == 0 || configuration.units == undefined) {
        units.fc = "C"
        units.unit = "metric"
    }
    if (configuration.units == 1) { 
        units.fc = "F"
        units.unit = "imperial"
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?id=${configuration.placeid}&appid=${configuration.key}&units=${units.unit}`)  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
        document.getElementById("place").innerText = `${data.name}, ${data.sys.country}`
        var temperature = Math.round(parseFloat(data.main.temp));
        var conditions = capitalizeFirstLetter(data.weather[0].description);
        document.getElementById('temp').innerHTML = temperature + `&deg;${units.fc}`;
        document.getElementById('weatherdesc').innerHTML = conditions;
    })
    .catch(e => console.log(e));
}

window.onload = function() {
    weather();   
    getTime();
    getDDMMYY();
    getGreeting();
}

setInterval(getTime, 1000);
setInterval(getGreeting, 600000);
setInterval(getDDMMYY, 10000);
setInterval(weather, 120000);
document.body.style.background = `url(${configuration.decor.background}) no-repeat center center`;