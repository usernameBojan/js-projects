const btnPeople = document.getElementById("btnPeople");
const btnShips = document.getElementById("btnShips");
const resultPpl = document.getElementById("resultPpl");
const resultShips = document.getElementById("resultShips");
const btnNext = document.getElementById("btnNext");
const btnPrev = document.getElementById("btnPrev");
const loader = document.getElementById("loader");

const urlPeople = "https://swapi.dev/api/people/?page=1";
const urlShips = "https://swapi.dev/api/starships/?page=1";

let dataArr = [];

function getData(url){

    $.ajax({
        url: url,
        success: function(data){
            dataArr.push(data.results)
        },
        error: function(error){
            console.log(error);
        }
    })
};

window.addEventListener("load", function(){
    getData(urlPeople);
    getData(urlShips);
});

function displayPeople(allPeople){
    if(allPeople != null){
        loader.style.display = "block";
        setTimeout(timeOutPeople, 1050);
        resultPpl.innerHTML = "";
        resultPpl.innerHTML = `
        <div class="row different">
            <div class="col-md-3">Name</div>
            <div class="col-md-2">Height</div>
            <div class="col-md-2">Mass</div>
            <div class="col-md-2">Gender</div>
            <div class="col-md-2">Birth Year</div>
            <div class="col-md-1">Films</div>
        </div>`;

        for(let person of allPeople){
            resultPpl.innerHTML +=`
            <div class="row">
                <div class="col-md-3">${person.name}</div>
                <div class="col-md-2">${person.height}</div>
                <div class="col-md-2">${person.mass}</div>
                <div class="col-md-2">${person.gender}</div>
                <div class="col-md-2">${person.birth_year}</div>
                <div class="col-md-1">${person.films.length}</div>
            </div>`;
        }
        btnPrev.style.display = "none";
    } else {
        resultPpl.innerHTML = `<h2 id="notification">Please Wait unitl data is loaded!</h2>`
    }
};

function displayShips(allShips){
    loader.style.display = "block";
    setTimeout(timeOutShips, 1050);
    if(allShips != null){
        resultShips.innerHTML = "";
        resultShips.innerHTML = `
        <div class="row different">
            <div class="col-md-3">Name</div>
            <div class="col-md-2">Model</div>
            <div class="col-md-2">Manufacturer</div>
            <div class="col-md-2">Cost</div>
            <div class="col-md-2">People Capacity</div>
            <div class="col-md-1">Class</div>
        </div>`;

        for(let ship of allShips){
            resultShips.innerHTML +=`
            <div class="row">
                <div class="col-md-3">${ship.name}</div>
                <div class="col-md-2">${ship.model}</div>
                <div class="col-md-2">${ship.manufacturer}</div>
                <div class="col-md-2">${ship.cost_in_credits}</div>
                <div class="col-md-2">${ship.passengers}</div>
                <div class="col-md-1">${ship.starship_class}</div>
            </div>`;
        }
        btnNext.style.display = "none";
    } else {
        resultShips.innerHTML = `<h2 id="notification">Please Wait unitl data is loaded!</h2>`
    }
};

function timeOutPeople(){
    loader.style.display = "none";
    resultPpl.style.display = "block";
    btnNext.style.display = "block";
};

function timeOutShips(){
    loader.style.display = "none";
    resultShips.style.display = "block";
    btnPrev.style.display = "block";
};

function timeOutHelper(){
    resultPpl.style.display = "none";
    resultShips.style.display = "none";
};

btnShips.addEventListener("click", function(){
    displayShips(dataArr[0]);
    setTimeout(timeOutHelper, 10);
    resultPpl.style.display = "none";
});

btnPeople.addEventListener("click", function(){
    displayPeople(dataArr[1]);
    setTimeout(timeOutHelper, 10);
    resultShips.style.display = "none";
});

btnNext.addEventListener("click", function(){
    displayShips(dataArr[0])
    setTimeout(timeOutHelper, 10);
    resultPpl.style.display = "none";
});

btnPrev.addEventListener("click", function(){
    displayPeople(dataArr[1]);
    setTimeout(timeOutHelper, 10);
    resultShips.style.display = "none";
});