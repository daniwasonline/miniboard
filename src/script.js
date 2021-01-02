var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const configuration = window.bridge.information.getConfig()
function getTime() {
    var d = new Date().toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
    document.getElementById("timeJS").innerHTML = d;
}

function getDayOfWeek() {
    var now = new Date();
    var day = days[now.getDay()];
    console.log(day);
    document.getElementById("dayname").innerHTML = day;
}

function getDDMMYY() {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dateObj = new Date();
    const month = monthNames[dateObj.getMonth()];
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();
    const output = day + '\n' + month + ' ' + year;
    document.getElementById("ddmmyy").innerHTML = output;
    document.getElementById("daynamemid").innerHTML = output;
}

function middleDate() {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dateObj = new Date();
    const month = monthNames[dateObj.getMonth()];
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();
    const dayforweek = days[dateObj.getDay()];
    const output = dayforweek + ", " + day + '\n' + month + ' ' + year;
    document.getElementById("daynamemid").innerHTML = output;
}

function weather() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?id=${configuration.placeid}&appid=${configuration.key}`)  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
        document.getElementById("place").innerText = `${data.name}, ${data.sys.country}`
        var celcius = Math.round(parseFloat(data.main.temp)-273.15);
        var conditions = data.weather[0].description
        document.getElementById('temp').innerHTML = celcius + '&deg;C';
        document.getElementById('weatherdesc').innerHTML = conditions;
    })
    .catch(e => console.log(e));
}

function reloadCSS() {
    var links = document.getElementsByTagName("link");

    for (var x in links) {
        var link = links[x];
    
        if (link.getAttribute("type").indexOf("css") > -1) {
            link.href = link.href + "?id=" + new Date().getMilliseconds();
        }
    }
}


window.onload = function() {
    weather();   
    getDayOfWeek();
    getTime();
    getDDMMYY();
    middleDate();
}

setInterval(getTime, 1000);
setInterval(getDDMMYY(), 10000)
setInterval(getDayOfWeek(), 1000)
setInterval(reloadCSS, 120000);
setInterval(weather, 120000);
document.body.style.background = `url(${configuration.decor.background}) no-repeat center center`;