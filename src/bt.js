let users = JSON.parse(localStorage.getItem('myUsers'));
let products = JSON.parse(localStorage.getItem('product'));

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const modal = $('.modal');
const close = $('.header i');
const open = $('.btn-open');

if (!localStorage.getItem('myUsers'))
   users = [{
      email: "congty@gmail.com",
      password: "12345678",
      phone: "0142125671",
      typeUser: "admin",
   }]

if (!localStorage.getItem('product'))
   products = [{
      name: "Thịt bò Kobe",
      type: "Thịt",
      price: 18000,
      quantity: 200,
      image: ""
   }]

function updateLocalStorage() {
   let usersData = JSON.stringify(users);
   let productsData = JSON.stringify(products)
   localStorage.setItem('myUsers', usersData);
   localStorage.setItem('product', productsData)
}

updateLocalStorage()

function openBlock(myBlock) {
   myBlock.classList.add("open");
}

function closeBlock(myBlock) {
   myBlock.classList.remove("open");
}


// Close modal
close.addEventListener('click', () => closeBlock(modal));

// Open modal
open.addEventListener('click', () => openBlock(modal));

//Register
Validator({
   form: ".form-content",
   formGroupSelector: ".form-group",
   errorSelector: '.message-error',
   rules: [
      Validator.isRequired(
         'input[name="email"]',
         "Vui lòng nhập email"
      ),
      Validator.isEmail('input[name="email"]'),
      Validator.haveDataInDB(
         'input[name="email"]',
         () => {
            let comfirmValues = []
            for (let user of users) {
               comfirmValues.push(user.email);
            }
            return comfirmValues;
         },
         'Email này đã được sử dụng'
      ),
      Validator.isRequired(
         'input[name="password"]',
         "Vui lòng nhập mật khẩu"
      ),
      Validator.minLength('input[name="password"]', 6),
      Validator.isRequired('input[name="comfirmpwd"]'),
      Validator.isDuplicated(
         'input[name="comfirmpwd"]',
         () => {
            return document.querySelector('input[name="password"]')
               .value;
         },
         "Mật khẩu không trùng khớp"
      ),
      Validator.isRequired(
         'input[name="phone"]',
         "Vui lòng nhập số điện thoại"
      ),
      Validator.isCorrectPhone('input[name="phone"]'),
      Validator.isRequired(
         'input[name="check"]',
         'Vui lòng chọn vào mục này'
      ),
      Validator.isRequired(
         'select[name="provice"]',
         'Vui lòng chọn tỉnh Thành'
      ),
   ],
   onSubmit: function (data) {
      updateUsers(data)
      window.location = "./index.html"
   },
});


function updateUsers(data) {
   users.push({
      email: data.email,
      password: data.password,
      phone: data.phone,
      typeUser: "member"
   });
   updateLocalStorage();
}

//=======Login===========
Validator({
   form: '.login-content',
   formGroupSelector: '.form-group',
   errorSelector: '.message-error',
   rules: [
      Validator.isRequired(
         'input[name="email"]',
         "Vui lòng nhập email"
      ),
      Validator.isEmail('input[name="email"]'),
      Validator.isRequired(
         'input[name="password"]',
         "Vui lòng nhập mật khẩu"
      ),
      Validator.minLength('input[name="password"]', 6),
   ],
   onSubmit: function (data) {
      hasUserInDB(data);
   }
});

function hasUserInDB (data) {
   let isFound = false;
   for (let user of users) {
      if (data.email === user.email) {
         if(data.password == user.password) {
            isFound = true;
            checkUserType(user)
            break;
         }
      }
   }
   if(!isFound) {
      let warning = $('.warning');
      warning.innerHTML = `<div class="block-warning">
         <i class="fas fa-exclamation-circle"></i> Tài khoản hoặc mật khẩu của bạn đã sai
      </div>`
      resetInput()
   }
}

function resetInput () {
   let inputs = $$('input')
   for (let input of inputs) {
      input.value = '';
   }
}

function checkUserType(user) {
   if (user.typeUser === 'admin')
      window.location = "./admin.html"
   else {
      window.location = "./index.html"
      $(".logo .nav-login").innerHTML = `<p>Xin chào ${user.email}</p>`
   }
}

// function runLogin() {
//    let error = checkLoginForm();
//    if (error) {
//       alert(error);
//    }
//    loginUsername.value = ''
//    loginPassword.value = ''
// }

// if (loginSubmit)
//    loginSubmit.addEventListener('click', runLogin)



//=================================================
// let checkSport = $$('.sport-input')
// let checkQuiz = $$('.quiz-input')
// let sportContent = $('.js-sport')

// for (let btn of checkSport) {
//    btn.addEventListener('click', () => {
//       if (btn.value === 'swim') {
//          sportContent.innerHTML = `
//             <input type="checkbox" name ="${btn.value}">Sải</input>
//             <input type="checkbox" name ="${btn.value}">Bướm</input>
//          `
//       }
//       if (btn.value === 'MA') {
//          sportContent.innerHTML = `
//             <input type ="checkbox" name ="${btn.value}">Judo</input>
//             <input type ="checkbox" name ="${btn.value}">Karate</input>
//          `
//       }
//    })
// }

// for (let btn of checkQuiz) {
//    btn.addEventListener('click', () => {
//       if (btn.value === 'select') {
//          $('input[name = "inputquiz"]').readOnly = true;
//          $('select').disabled = false;
//          btn.focus();
//       }
//       if (btn.value === 'input') {
//          $('input[name = "inputquiz"]').readOnly = false;
//          $('select').disabled = true;
//          btn.focus();
//          btn.select();
//       }
//    })
// }

