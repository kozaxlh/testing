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
   let jsonData = JSON.stringify(users);
   localStorage.setItem('myUsers', jsonData);
}

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


function checkRegisterForm() {
   let error = '';
   //check is null
   if (!email.value)
      error += 'Vui lòng nhập email\n'

   if (!password[0].value || !password[1].value)
      error += 'Vui lòng nhập mật khẩu\n'

   if (!phone.value)
      error += 'Vui lòng nhập SĐT\n'

   if (error != '')
      return error;

   //check email
   let regexEmail = /^[\w\d-]+@(?:yahoo|gmail|outlook).com$/gm;
   if (!regexEmail.test(email.value.trim().toLowerCase()))
      error += 'Email không hợp lệ'

   //check duplicate user
   for (let user of users) {
      if (email.value === user.email) {
         error += 'Email này đã được sử dụng\n'
      }
   }
   //check password
   if (password[0].value.length < 6)
      error += 'Nhập lại mật khẩu\n'
   else if (password[0].value !== password[1].value)
      error += 'Xác nhận mật khẩu trùng khớp\n'

   //checkPhone
   let regexPhone = /0[0-9]{9}$/gm;
   if (!regexPhone.test(phone.value))
      error += 'Số điện thoại không hợp lệ'

   return error;
}

function updateUsers() {
   users.push({
      email: $('input[type="email"]').value.toLowerCase(),
      password: password[0].value,
      phone: $('input[name="phone"]').value,
      typeUser: "member"
   });
   updateLocalStorage();
}

function resetInput() {
   for (let item of $$('input')) {
      item.value = ''
   }
}

// add user from input
if (form)
   form.addEventListener('click', () => {
      let error = checkRegisterForm();
      if (error !== '') {
         alert(error);
         resetInput();
      }
      else {
         alert("Đăng ký thành công")
         updateUsers();
         window.location = "./bt.html"
      }
   })

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
            alert("Đăng nhập thành công");
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
   else
      window.location = "./bt.html"
}

if (loginSubmit)
   loginSubmit.addEventListener('click', () => {
      let error = checkLoginForm();
      if (error) {
         alert(error);
         resetInput();
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

