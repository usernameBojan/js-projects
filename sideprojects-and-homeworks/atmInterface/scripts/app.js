import { html } from "../../atmInterface/scripts/domElems.js";
import { chooseLanguage, errorMsgText, returnAnswerBalance, returnAnswerDeposit, returnAnswerWithdrawSucces, returnAnswerWithdrawFail, clearAnswers } from "../../atmInterface/scripts/languageService.js";

let clientData = "https://raw.githubusercontent.com/usernameBojan/json/main/clientData.json";
let counter = 4;
let clientsArr = [];

function fetchClients(clientsApi){
    let promise = fetch(clientsApi);
    promise.then(function (response) {
        return response.json()
    })
    .then(function (result){
        clientsArr.push(result);
    })
    .catch(function (error){
        console.log(error)
    });
};

window.addEventListener("load", () => {fetchClients(clientData)});

function getClientData(passCode){
    let client = {};
    for (let i = 0; i < clientsArr[0].clients.length; i++) {
        if (passCode === clientsArr[0].clients[i].sixDigitCode) {
            client = clientsArr[0].clients[i];
            break;
        };
    };
    return client;
};

function Client(name, balance){
    this.name = name,
    this.balance = balance,

        this.makeDeposit = function (deposit){
            let parsedDeposit = parseInt(deposit);
            this.balance += parsedDeposit;
            return {parsedDeposit};
        },

        this.makeWithdrawal = function (withdraw){
            let parsedWithdrawal = parseInt(withdraw);
            if (parsedWithdrawal <= this.balance) {
                returnAnswerWithdrawSucces(html.engWithdraw, html.mkWithdraw, html.espWithdraw, parsedWithdrawal);
                this.balance -= parsedWithdrawal;
            } else if (parsedWithdrawal > this.balance) {
                returnAnswerWithdrawFail(html.engWithdraw, html.mkWithdraw, html.espWithdraw)
            };
        };
};

function createClient(name, balance){
    let createClient = new Client(name, balance);
    return createClient;
};

html.engBtn.addEventListener("click", () => {
    chooseLanguage("eng");
});
html.mkBtn.addEventListener("click", () => {
    chooseLanguage("mk");
});
html.espBtn.addEventListener("click", () => {
    chooseLanguage("esp");
});

function sdcSuccess(name){
    html.sdcDiv.style.display = "none";
    html.clientName.style.display = "block";
    html.clientName.innerText += name;
    html.selectDiv.style.display = "block";
};

function authenticatePasscode(passcode, errorValue, clientName, clientBalance){
    if(html.sixDigitCode.value === passcode){
        sdcSuccess(clientName);
        returnAnswerBalance(html.balanceAnswEng, html.balanceAnswMk, html.balanceAnswEsp, clientBalance)
    } else if(html.sixDigitCode!=passcode){
        errorMsgText(html.errorEng, html.errorMk, html.errorEsp, errorValue)
    };
}; 

function depositWithdrawFunc(client){
    withdrawBtn.addEventListener("click", () => {
        client.makeWithdrawal(withdrawAmount.value);
    });

    depositBtn.addEventListener("click", () => {
        returnAnswerDeposit(html.engDeposit, html.mkDeposit, html.espDeposit, client);
    });

    html.makeWithdrawal.addEventListener("click", () => {
        html.selectDiv.style.display = "none";
        html.withdrawalDiv.style.display = "block";
        html.backToOpts.style.display = "block";
    });   

    html.makeDeposit.addEventListener("click", () => {
        html.selectDiv.style.display = "none";
        html.depositDiv.style.display = "block";
        html.backToOpts.style.display = "block";
    });

    html.checkBalance.addEventListener("click", () => {
        html.selectDiv.style.display = "none";
        html.balanceDiv.style.display = "block";
        html.backToOpts.style.display = "block";
        returnAnswerBalance(html.balanceAnswEng, html.balanceAnswMk, html.balanceAnswEsp, client.balance)
    });
};

sdcBtn.addEventListener("click", () => {
    --counter; 
    let thisData = getClientData(html.sixDigitCode.value);
    let thisClient = createClient(thisData.name, thisData.balance);
    authenticatePasscode(thisData.sixDigitCode, counter, thisClient.name, thisClient.balance);
    depositWithdrawFunc(thisClient);
});

backToOpts.addEventListener("click", () => {
    html.selectDiv.style.display = "block";
    html.balanceDiv.style.display = "none";
    html.backToOpts.style.display = "none";
    html.depositDiv.style.display = "none";
    html.withdrawalDiv.style.display = "none";
    clearAnswers(html.engDeposit, html.mkDeposit, html.espDeposit, html.depositAmount);
    clearAnswers(html.engWithdraw, html.mkWithdraw, html.espWithdraw, html.withdrawAmount);
});

html.exit.addEventListener("click", () => location.reload());