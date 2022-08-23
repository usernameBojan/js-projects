import { html } from "../../atmInterface/scripts/domElems.js";

let timeNow = () => html.dateNow.innerText = new Date();

function chooseLanguage(selectedLanguage) {
    html.sdcBtn.style.display = "inline";
    html.langDiv.style.display = "none";
    html.sdcDiv.style.display = "block";
    html.clientName.style.display = "none";
    if (selectedLanguage === "eng") {
        html.welcomeMsg.innerText = "Welcome to pseudobank ATM services"
        html.clientName.innerText = "Client: ";
        setInterval(timeNow, 1000);
        html.header.style.display = "block";
        html.requestCode.innerText = "Enter your six-digit code";
        html.errorEng.style.display = "block";
        html.chooseOptionMsg.innerText = "Choose an option";
        html.checkBalance.innerText = "Check balance";
        html.balanceAnswEng.style.display = "block";
        html.makeDeposit.innerText = "Make a deposit";
        html.makeWithdrawal.innerText = "Make a withdrawal";
        html.exit.innerText = "Exit";
        html.backToOpts.innerText = "<< Back to Options";
        html.depositLabel.innerText = "Enter the sum you wish to deposit:";
        html.withdrawLabel.innerText = "Enter the sum you wish to withdraw:";
        html.engDeposit.style.display = "block";
        html.engWithdraw.style.display = "block";
    } else if (selectedLanguage === "mk") {
        html.welcomeMsg.innerText = "Добредојдовте во системот за банкоматски услуги на псевдобанка";
        html.clientName.innerText = "Клиент: ";
        setInterval(timeNow, 1000);
        html.header.style.display = "block";
        html.requestCode.innerText = "Внесете го вашиот шестцифрен код за автентикација";
        html.errorMk.style.display = "block";
        html.chooseOptionMsg.innerText = "Изберете опција";
        html.checkBalance.innerText = "Проверка на состојба";
        html.balanceAnswMk.style.display = "block";
        html.makeDeposit.innerText = "Уплата на сметка";
        html.makeWithdrawal.innerText = "Подигнување на готовина";
        html.exit.innerText = "Излез";
        html.backToOpts.innerText = "<< Назад во Опции";
        html.depositLabel.innerText = "Внесете ја сумата која сакате да ја уплатите:";
        html.withdrawLabel.innerText = "Внесете ја сумата која сакате да ја подигнете:";
        html.mkDeposit.style.display = "block";
        html.mkWithdraw.style.display = "block";
    } else if (selectedLanguage === "esp") {
        html.welcomeMsg.innerText = "Bienvenido a la cajero automático servicios de la seudobanco";
        html.clientName.innerText = "Cliente: ";
        setInterval(timeNow, 1000);
        html.header.style.display = "block";
        html.requestCode.innerText = "Escribir sus código de autenticacion";
        html.errorEsp.style.display = "block";
        html.chooseOptionMsg.innerText = "Escoge una opción";
        html.checkBalance.innerText = "Ver saldo";
        html.balanceAnswEsp.style.display = "block";
        html.makeDeposit.innerText = "Hacer un depósito";
        html.makeWithdrawal.innerText = "Hacer un retracción";
        html.exit.innerText = "Salir";
        html.backToOpts.innerText = "<< Volver a las opciones";
        html.depositLabel.innerText = "Entrar la suma usted quieres depositar";
        html.withdrawLabel.innerText = "Entrar la suma usted quieres retirar:";
        html.espDeposit.style.display = "block";
        html.espWithdraw.style.display = "block";
    };
};

function errorMsgText(elEng, elMk, elEsp, value){
    if(value>=1){
        elEng.innerText = `Wrong six-digit code. Try again. You have ${value} attempts remaining.`;
        elMk.innerText = `Погрешен код за автентикација. Обидете се повторно. Ви преостануваат уште ${value} обиди.`;
        elEsp.innerText = `Incorrecto código de autenticacion. Intentar otra vez. Te quedan ${value} intentos.`;
        html.sixDigitCode.value = "";
    } else {
        elEng.innerHTML = `<b>Your card has been retained by the ATM due to privacy concerns. <br> 
        Please visit our nearest office to confirm your identity so you can have it back.</b>`;
        elMk.innerHTML = `<b>Вашата картичка е задржана од банкоматот поради можни нарушувања на приватноста. <br> 
        Ве молиме посетете ја нашата најблиска филјала за да го потврдите вашиот идентитет и да ја добиете назад.</b>`;
        elEsp.innerHTML = `<b>Su tarjeta ha sido retenida por el cajero automático debido a problemas de privacidad. <br> 
        Por favor visite nuestra oficina más cercana para confirmar su identidad y poder recuperarla.</b>`;
        html.requestCode.style.display = "none";
        html.sixDigitCode.style.display = "none";
        html.sdcBtn.style.display = "none";
        html.selectDiv.style.display = "block";
        html.chooseOptionMsg.style.display = "none";
        for (html.all of html.options){html.all.style.display = "none"};
        html.exit.style.display = "block";
    };
};

function returnAnswerBalance(elEng, elMk, elEsp, balance) {
    let balanced = parseInt(balance);
    elEng.innerText = `Your current balance is ${balanced}`;
    elMk.innerText = `Вашата моментална состојба изнесува ${balanced}`;
    elEsp.innerText = `Sus saldo actual es ${balanced}`;
};

function returnAnswerDeposit(elEng, elMk, elEsp, client) {
    let deposit = client.makeDeposit(depositAmount.value).parsedDeposit;
    elEng.innerText = `You have successfully deposited ${deposit}`;
    elMk.innerText = `Трансакцијата е успешна. На вашата сметка се уплатени ${deposit}`;
    elEsp.innerText = `La transacción resultó con éxito. Usted has depositado ${deposit}`;
};

function returnAnswerWithdrawSucces(elEng, elMk, elEsp, withdraw) {
    elEng.innerText = `You have successfully withdrew ${withdraw}`;
    elMk.innerText = `Трансакцијата е успешна. Вие подигнавте ${withdraw}`;
    elEsp.innerText = `La transacción resultó con éxito. Usted retraerse ${withdraw}`;
};

function returnAnswerWithdrawFail(elEng, elMk, elEsp) {
    elEng.innerText = "You don't have enough funds to make this transaction.";
    elMk.innerText = "Немате доволно средства да ја извриште оваа трансакција.";
    elEsp.innerText = "No tienes fondos suficientes para realizar esta transacción.";
};

function clearAnswers(elEng, elMk, elEsp, amountInput) {
    elEng.innerHTML = "";
    elMk.innerHTML = "";
    elEsp.innerHTML = "";
    amountInput.value = "";
};

export {chooseLanguage, errorMsgText, returnAnswerBalance, returnAnswerDeposit, returnAnswerWithdrawSucces, returnAnswerWithdrawFail, clearAnswers};