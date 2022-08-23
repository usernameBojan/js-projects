/*"https://swapi.py4e.com/api/films/"; USE THIS LINK IF swapi.dev IS DOWN! 
ALSO, IF swapi.dev IS DOWN, DELETE OR COMMENT The Force Awakens IN sequelTrilogy Array BECASE swapi.py4e HAS IT! */
const swUrl = "https://swapi.dev/api/films"; 
const tables = document.querySelectorAll("table");
const navContents = document.querySelectorAll("span");
const allBtns = document.querySelectorAll("button");
const allMoviesDiv = document.getElementById("allMoviesDiv");
const trilogiesDiv = document.getElementById("trilogiesDiv");
const sortedByDate = document.getElementById("sortedByDate");
const sortedByOrder = document.getElementById("sortedByOrder");
const originalTrilogyDiv = document.getElementById("originalTrilogyDiv");
const prequelTrilogyDiv = document.getElementById("prequelTrilogyDiv");
const sequelTrilogyDiv = document.getElementById("sequelTrilogyDiv");

const sequelTrilogy = [
    {
    title: "The Force Awakens",
    release_date: "2015-18-12",
    director: "J.J. Abrams",
    producer: "Kathleen Kennedy, J.J. Abrams, Bryan Burk",
    episode_id: 7
    },
    {
    title: "The Last Jedi",
    release_date: "2017-09-12",
    director: "Rian Johnson",
    producer: "Kathleen Kennedy, Ram Bergman",
    episode_id: 8
    },
    {
    title: "The Rise Of Skywalker",
    release_date: "2019-16-12",
    director: "J.J. Abrams",
    producer: "Kathleen Kennedy, J.J. Abrams, Michelle Rejwan",
    episode_id: 9
    }
]; 

async function getData(apiUrl){
    try {
    let response = await fetch(apiUrl);
    let result = await response.json();
    let fullResult = oneWithTheForce(getApiData(result), sequelTrilogy);
    populateTables(fullResult)
    } catch(error){
        console.log(error);
    }
};

window.addEventListener("load", () => {
    getData(swUrl);
});

let populateTableHead = ((el) => {
    for(head of el){
        head.innerHTML += `<thead>
        <th>Title</th>
        <th>Director</th>
        <th>Producer</th>
        <th>Release date</th>
        </thead>`
    }
})(tables);

let getApiData = (text) => {
    let getData = text.results.map((el)=>{
        return {
            title: el.title,
            director: el.director,
            producer: el.producer,
            release_date: el.release_date,
            episode_id: el.episode_id
        };
    });
    return getData;
};

let oneWithTheForce = (apiData, newerData) => {return allSwMovies = apiData.concat(newerData)};

let populateTableBody = (el, title, director, producer, release) => {
    el.innerHTML += `
    <tbody>
        <tr>
            <td>${title}</td>
            <td>${director}</td>
            <td>${producer}</td>
            <td>${release}</td>
        </tr>
    </tbody>`
};

let sortByDate = (movieData) => {
        for (let i=0; i<movieData.length; i++){
            movieData.sort((movieFirst, movieNext) => {
                return movieFirst.release_date.substring(0,4) - movieNext.release_date.substring(0,4);
            });
        };
        movieData.forEach((el)=>{
            populateTableBody(tables[0], el.title, el.director, el.producer, el.release_date)
        });
};

let sortByOrder = (movieData) => {
    movieData.sort((movieFirst, movieNext) => movieFirst.episode_id - movieNext.episode_id)
    .forEach((el) => {populateTableBody(tables[1], el.title, el.director, el.producer, el.release_date)})
};

let populateOriginalTrilogy = (movieData) => {
    let filterOriginal = movieData.filter((id) => {
        if(id.episode_id>=4 && id.episode_id<=6){
            return id;
        }})
        .forEach((el)=> {populateTableBody(tables[2], el.title, el.director, el.producer, el.release_date)});
};

let populatePrequelTrilogy = (movieData) => {
    let filterPrequel = movieData.filter((id) => {
        if(id.episode_id>=1 && id.episode_id<=3){
            return id;
        }})
        .forEach((el)=> {populateTableBody(tables[3], el.title, el.director, el.producer, el.release_date)});
};

let populateSequelTrilogy = (movieData) => {
    let filterSequel = movieData.filter((id) => {
        if(id.episode_id>=7 && id.episode_id<=9){
            return id;
        }})
        .forEach((el)=> {populateTableBody(tables[4], el.title, el.director, el.producer, el.release_date)});
};

let populateTables = (data) => { 
    sortByDate(data);
    sortByOrder(data);
    populateOriginalTrilogy(data);
    populatePrequelTrilogy(data);
    populateSequelTrilogy(data);
};

let manipulateBtns = (displayValue1, displayValue2, displayValue3, displayValue4, displayValue5, displayValue6, displayValue7, displayValue8) => {
    allBtns[0].style.display = displayValue1;
    allBtns[1].style.display = displayValue2;
    allBtns[2].style.display = displayValue3;
    allBtns[3].style.display = displayValue4;
    allBtns[4].style.display = displayValue5;
    allBtns[5].style.display = displayValue6;
    allBtns[6].style.display = displayValue7;
    allBtns[7].style.display = displayValue8;
};

let manipulateMovieDivs = (divDisplayValue1, divDisplayValue2) => {
    sortedByDate.style.display = divDisplayValue1; 
    sortedByOrder.style.display = divDisplayValue2;
};

let manipulateTrilogyDivs = (displayValueTrilogy1, displayValueTrilogy2, displayValueTrilogy3) => {
    originalTrilogyDiv.style.display = displayValueTrilogy1;
    prequelTrilogyDiv.style.display = displayValueTrilogy2;
    sequelTrilogyDiv.style.display = displayValueTrilogy3;    
};

navContents[0].addEventListener("click", () => {
    manipulateMovieDivs("none", "none");
    allMoviesDiv.style.display = "block";
    trilogiesDiv.style.display = "none";
    manipulateBtns("block", "block", "none", "none", "none", "none", "none", "none");
});

navContents[1].addEventListener("click", () => {
    manipulateMovieDivs("none", "none");
    trilogiesDiv.style.display = "block";
    manipulateBtns("none", "none", "none", "block", "block", "block", "block", "none");
    manipulateTrilogyDivs("none", "none", "none");
});

allBtns[0].addEventListener("click", () => {
    manipulateMovieDivs("block", "none");
    manipulateBtns("none", "none", "block", "none", "none", "none", "none", "none");
});

allBtns[1].addEventListener("click", () => {
    manipulateMovieDivs("none", "block");
    manipulateBtns("none", "none", "block", "none", "none", "none", "none", "none");
});

allBtns[2].addEventListener("click", () => {
    manipulateMovieDivs("none", "none");
    manipulateBtns("block", "block", "none", "none", "none", "none", "none", "none");
});

allBtns[3].addEventListener("click", () => {
    manipulateTrilogyDivs("block", "none", "none");
    manipulateBtns("none", "none", "none", "none", "none", "none", "none", "block");
});

allBtns[4].addEventListener("click", () => {
    manipulateTrilogyDivs("none", "block", "none");
    manipulateBtns("none", "none", "none", "none", "none", "none", "none", "block");
});

allBtns[5].addEventListener("click", () => {
    manipulateTrilogyDivs("none", "none","block");
    manipulateBtns("none", "none", "none", "none", "none", "none", "none", "block");
});

allBtns[6].addEventListener("click", () => {
    manipulateTrilogyDivs("block", "block","block");
    manipulateBtns("none", "none", "none", "none", "none", "none", "none", "block")
});

allBtns[7].addEventListener("click", () => {
    allMoviesDiv.style.display = "none";
    manipulateBtns("none", "none", "none", "block", "block", "block", "block", "none");
    manipulateTrilogyDivs("none", "none", "none");
});