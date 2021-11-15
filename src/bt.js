let users = JSON.parse(localStorage.getItem('myUsers'));
let products = JSON.parse(localStorage.getItem('product'));

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const modal = $('.modal');
const close = $('.header i');
const open = $('.btn-open');
const password = $$('input[type="password"]');
const email = $('input[name="email"]');
const phone = $('input[name="phone"]')
const form = $('.btn-submit.register-submit');

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
   ],
   onSubmit: function (data) {
      console.log(data)
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
const loginUsername = $('.login-input[name="email"]');
const loginPassword = $('.login-input[name="password"]');
const loginSubmit = $('.btn-submit.login-submit');

function checkLoginForm() {
   let inputEmail = loginUsername.value.trim().toLowerCase();
   let inputPassword = loginPassword.value;

   //check isNull input
   if (!inputEmail && !inputPassword)
      return 'Vui lòng nhập tên tài khoản và mật khẩu'
   if (!inputEmail)
      return 'Vui lòng nhập tên tài khoản'
   if (!inputPassword)
      return 'Vui lòng nhập mật khẩu'

   //check email and password without request DB
   let regex = /^[\w\d-]+@(?:yahoo|gmail|outlook).com$/gm;
   if (!regex.test(inputEmail))
      return 'Tên tài khoản không trùng khớp'

   if (inputPassword.length < 6)
      return 'Mật khẩu không nhỏ hơn 6 kí tự'

   //find user in DB
   for (let user of users) {
      if (inputEmail === user.email) {
         if (inputPassword === user.password) {
            isFound = true;
            checkUserType(user);
            return;
         }
      }
   }
   return 'Tên tài khoản hoặc mật khẩu sai'

}

function checkUserType(user) {
   if (user.typeUser === 'admin')
      window.location = "./admin.html"
   else {
      window.location = "./index.html"
      $(".logo .nav-login").innerHTML = `<p>Xin chào ${user.email}</p>`
   }
}

function runLogin() {
   let error = checkLoginForm();
   if (error) {
      alert(error);
   }
   loginUsername.value = ''
   loginPassword.value = ''
}

if (loginSubmit)
   loginSubmit.addEventListener('click', runLogin)


$("body").addEventListener('keydown', (e) => {
   if (e.keyCode === 13) {
      if (window.location.pathname === '/public/dangnhap.html')
         runLogin();
      else if (window.location.pathname === '/public/bt3.html')
         runRegister();
   }
})

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

