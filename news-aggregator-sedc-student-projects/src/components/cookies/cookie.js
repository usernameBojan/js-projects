let cookieName = "Newstopia";
let cookieValue = "Newstopia Cookies";
let cookieExpire = 30;
const cookiePopup = document.getElementById("cookiePopup");
let acceptCookie = document.getElementById("acceptCookie");

//When user click on the accept button, create the cookie
acceptCookie.onclick = function () {
    createCookie(cookieName, cookieValue, cookieExpire);
}

// Function to set the cookie in web browser
let createCookie = function (cookieName, cookieValue, cookieExpire) {
    let currentDate = new Date();
    currentDate.setTime(currentDate.getTime() + (cookieExpire * 24 * 60 * 60 * 1000));
    let expires = "expires=" + currentDate.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
    if (document.cookie) {
        cookiePopup.style.display = "none";
    }
}

// Get the cookie from the web browser
let getCookie = function (cookieName) {
    let name = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Check if cookie is set or not
let checkCookie = function () {
    let check = getCookie(cookieName);
    if (check == "") {
        cookiePopup.style.display = "block";
    } else {
        cookiePopup.style.display = "none";
    }
}
checkCookie();