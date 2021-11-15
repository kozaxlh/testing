function Validator(options) {

   let selectorRules = {};

   function valiadate(inputElement, rule) {
      let errorElement = inputElement.nextElementSibling;
      let errorMessage;
      let rulesInput = selectorRules[rule.selector];

      for (let ruleInput of rulesInput) {
         errorMessage = ruleInput(inputElement.value)
         if (errorMessage) break;
      }

      if (errorMessage) {
         errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i>${errorMessage}`;
         inputElement.classList.add("invalid");
      }
      else {
         errorElement.innerHTML = '';
         inputElement.classList.remove("invalid");
      }

      return !errorMessage;
   }


   //Get form element
   let formElement = document.querySelector(options.form);

   if (formElement) {
      //Submit form
      formElement.onsubmit = (e) => {
         e.preventDefault();

         let isFormValid = true;

         options.rules.forEach(rule => {
            let inputElement = formElement.querySelector(rule.selector)
            let isValid = valiadate(inputElement, rule)
            if (!isValid) {
               isFormValid = false;
            }
         })

         if (isFormValid) {
            //JS Submit
            if (typeof options.onSubmit === 'function') {
               let enableInputs = formElement.querySelectorAll('[name]:not([disabled])')
               let formValues = Array.from(enableInputs).reduce((values, input) => {
                  values[input.name] = input.value;
                  return values;
               }, {});
               options.onSubmit(formValues)
            }
            //Default Submit
            else {
               formElement.submit();
            }
         }
      }

      //Get rule for handle
      options.rules.forEach(rule => {
         //Save rules to input
         if (Array.isArray(selectorRules[rule.selector])) {
            selectorRules[rule.selector].push(rule.test);
         }
         else {
            selectorRules[rule.selector] = [rule.test];
         }


         let inputElement = formElement.querySelector(rule.selector)
         if (inputElement) {
            // Handle Blur
            inputElement.onblur = () => {
               valiadate(inputElement, rule);
            };

            //Handle Input
            inputElement.oninput = () => {
               let errorElement = inputElement.nextElementSibling;
               errorElement.innerHTML = '';
               inputElement.classList.remove("invalid");
            };
         }
      });
   }
}

Validator.isRequired = (myNode, message) => {
   return {
      selector: myNode,
      test: function (value) {
         return value.trim() ? undefined : message || 'Vui lòng nhập trường này'
      }
   };
}

Validator.isEmail = (myNode, message) => {
   return {
      selector: myNode,
      test: function (value) {
         let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

         return regex.test(value) ? undefined : message || 'Vui lòng nhập lại email';
      }
   };
}

Validator.minLength = (myNode, min, message) => {
   return {
      selector: myNode,
      test: function (value) {
         return value.length < min ? message || `Vui lòng nhập tối thiểu ${min} kí tự` : undefined;
      }
   };
}

Validator.isDuplicated = (myNode, getConfirmValue, message) => {
   return {
      selector: myNode,
      test: function (value) {
         return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác'
      }
   };
}

Validator.isCorrectPhone = (myNode, message) => {
   return {
      selector: myNode,
      test: function (value) {
         let regex = /0\d{9}$/gm;
         return regex.test(value) ? undefined : message || 'Số điện thoại không hợp lệ'
      }
   };
}