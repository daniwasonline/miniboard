(async function () {
    const api = window.bridge
    const time =  document.getElementsByClassName("time")
    const date = document.getElementsByClassName("date")

    date[0].innerHTML = api.information.getDateObject();

})()