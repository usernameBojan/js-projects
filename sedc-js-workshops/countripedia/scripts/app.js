const searchBar = document.querySelector('#searchBar');
const searchBtn = document.querySelector('#searchBtn');
const errorMsg = document.querySelector('.alert');
const imgDiv = document.querySelector('#imgDiv');
const countryCard = document.querySelector('#countryCard');
const modalTitle = document.querySelector('.modal-title');
const modalBody = document.querySelector('.modal-body');
const continentBtns = document.querySelectorAll('.continent');
const langBtns = document.querySelectorAll('.langbtn');
const currencyBtns = document.querySelectorAll('.currency-btn')
const orgBtns = document.querySelectorAll('.org');
const descriptionDivs = document.querySelectorAll('.description');

async function getData(searchValue, path) {
    let countriesUrl = `https://restcountries.com/v2/${path}/${searchValue}`
    try {
        let response = await fetch(countriesUrl);
        let result = await response.json();
        createCardDiv(result);
        if (document.querySelectorAll('#card').length != 0) {
            resizeGlobe();
            errorMsg.style.display = 'none';
        };
    } catch (error) {
        errorMsg.style.display = 'block';
    };
};

let searchFunc = () => {
    errorMsg.style.display = 'none';
    getData(searchBar.value, 'name');
    countryCard.innerHTML = '';
    searchBar.value = '';
    descriptionDivs.forEach(el => el.style.display = 'none');
};

let resizeGlobe = () => {
    imgDiv.style.width = '45px';
    imgDiv.style.height = '45px';
}

let createWikiLink = (name) => {
    return name.split(' ').join('_');
};

let getCountryData = (data) => {
    index = 0;
    let getData = data.map((el) => {
        return {
            name: el.name,
            nativeName: el.nativeName,
            population: el.population,
            capital: el.capital,
            area: el.area,
            flag: el.flag,
            lang: el.languages,
            currencies: el.currencies,
            continent: el.region,
            subregion: el.subregion,
            regionalbloc: el.regionalBlocs,
            independent: el.independent,
            timezones: el.timezones,
            topLevelDomain: el.topLevelDomain,
            callingCodes: el.callingCodes,
            index: index++
        };
    });
    return getData;
};

let createCardDiv = (data) => {
    let countryData = getCountryData(data);

    countryData.forEach((el) => {

        countryCard.innerHTML += `
    <div id="card" data-bs-toggle="modal" data-bs-target="#modalBox" title="Click on the card for more info">
        <img class="card-img-top" src="${el.flag}" alt="Flag of ${el.name}" id="flag">
        <div class="card-body">
            <ul class="list-group list-group-flush">
                <li id="countryName" class="list-group-item">${el.name}</li>
                <li class="list-group-item">Capital city: ${el.capital}</li>
                <li class="list-group-item">Area: ${el.area} km2</li>
                <li class="list-group-item"">Population: ${el.population}</li>
            </ul>
        </div>
    </div>`
    });

    for (let i = 0; i < document.querySelectorAll('#card').length; i++) {
        if (document.querySelectorAll('#card')[i].childNodes[3].childNodes[1].childNodes[1].innerText === countryData[i].name) {
            document.querySelectorAll('#card')[i].addEventListener('click', () => {
                createModalBox(countryData[i].name, countryData[i].nativeName, countryData[i].population, countryData[i].capital, countryData[i].flag,
                    countryData[i].area, countryData[i].lang, countryData[i].currencies, countryData[i].continent, countryData[i].subregion,
                    countryData[i].independent, countryData[i].timezones, countryData[i].topLevelDomain, countryData[i].callingCodes);
            });
        };
    };
};

let createModalBox = (countryName, nativeName, population, capital, flag, area, lang, currencies, continent, subregion, independent, timezones, topLevelDomain, callingCodes) => {
    let independenceStatus = '';
    (independent) ? independenceStatus = 'an independent country' : independenceStatus = 'an autonomus or partially recognized territory';

    modalTitle.innerText = '';
    modalBody.innerHTML = '';
    modalTitle.innerText += countryName;
    modalTitle.innerHTML += `<img src="${flag}" alt="Flag of ${countryName}" style="width: 100px; height: 50px;">`
    modalBody.innerHTML += `
    <p>${countryName}, or ${nativeName} in it's native form is ${independenceStatus} located in ${subregion} in the continent of ${continent}.</p>
    <p>It has a population of ${population} people and comprises an area of ${area} km2. It's capital city is ${capital}.</p>
    <p>Calling code of the country is ${callingCodes}, and its top level domain is ${topLevelDomain}.</p>
    <p>Open on <a href="https://en.wikipedia.org/wiki/${createWikiLink(countryName)}" target="_blank">Wikipedia</a></p>
    <p>Languages:</p>`
    lang.forEach((el) => modalBody.innerHTML += `<li class="list-group-item">${el.name}</li>`);
    modalBody.innerHTML += `<br><p>Currencies:</p>`
    currencies.forEach((el) => modalBody.innerHTML += `<li class="list-group-item">${el.name}</li>`);
    modalBody.innerHTML += `<br><p>Timezones:</p>`
    timezones.forEach((el) => modalBody.innerHTML += `<li class="list-group-item"> ${el}</li>`);
};

searchBtn.addEventListener('click', searchFunc);

searchBar.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        searchFunc();
    };
});

langBtns.forEach((btn) => {

    btn.addEventListener('click', () => {
        descriptionDivs.forEach((el) => el.style.display = 'none');
        countryCard.innerHTML = '';
        getData(btn.id.substring(0, 3), 'lang');
        document.getElementById(`${btn.innerText.substring(5, 8)}descrDiv`).style.display = 'block';
    });
});

currencyBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        countryCard.innerHTML = '';
        descriptionDivs.forEach(el => el.style.display = 'none');
        getData(btn.id.substring(0, 3), 'currency');
        document.getElementById(`${btn.id.substring(0, 3)}descrDiv`).style.display = 'block';
    });
});

orgBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        descriptionDivs.forEach(el => el.style.display = 'none');
        countryCard.innerHTML = '';
        getData(btn.innerText, 'regionalbloc');
        document.getElementById(`${btn.innerText}descrDiv`).style.display = 'block';
    });
});

continentBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        countryCard.innerHTML = '';
        descriptionDivs.forEach(el => el.style.display = 'none');
        getData(btn.innerText, 'region');
        document.getElementById(`${btn.innerText}descrDiv`).style.display = 'block';
    });
});