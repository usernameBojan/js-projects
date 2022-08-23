const commentsDiv = document.getElementById('comments');
const commentsBox = document.getElementById('comments-container');

function addComents(inputs, errMsg){
   const inptsVals = [];

   inputs.forEach((el) => {
      inptsVals.push(el.value);
   });

   let validateEmailInput = (email) => {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
   };

   let validateEmptyString = (inpts, value) => {
      return inpts.some((el) => value === el);
   };

   if (validateEmptyString(inptsVals, '') || !validateEmailInput(inputs[2].value)) {
      errMsg.innerText = 'Please provide valid inputs for all fields';
   } else {
      errMsg.innerText = '';
      commentsDiv.style.display = 'block';
      commentsBox.innerHTML += ` 
            <div class="user-comment"> 
                <p>
                    <b>${inputs[0].value} ${inputs[1].value}</b> 
                    on date : <i>${new Date().toLocaleDateString('en-GB')}</i>
                </p>
                <p>${inputs[3].value}</p>
            </div>`;
      inputs.forEach((el) => {
         el.value = '';
      });
   }
}

export { addComents };
