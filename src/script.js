const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const content = $('#content');
const btn = $('#btn');
const deleteAll = $('#delete-button');

let data = JSON.parse(localStorage.getItem('myData'))

if (!localStorage.getItem('myData'))
   data = [];

function updateLocalStorage() {
   let jsonData = JSON.stringify(data);
   localStorage.setItem('myData', jsonData);
}

btn.addEventListener('click', () => {
   add();
})

deleteAll.addEventListener('click', () => {
   if (confirm("Bạn có muốn xóa tất cả không ?")) {
      deleteData(0, data.length);
      updateLocalStorage();
      render();
   }
})


let title = 0;
let number = 1;
function add() {
   if (title === 9)
      title = 0;
   else
      title++;
   data.push(
      {
         id: number++,
         header: `${title}`,
         number: title,
      });
   updateLocalStorage()
   render();
}

function deleteData(index, quantity = 1) {
   data.splice(index, quantity);
}

function render() {
   let result = 0;
   data.forEach((item => {
      result += item.number;
   }))

   const html = data.map(item => `
        <div class= 'item'>
            <h1>Hello ${item.header}</h1>    
            <button class= 'delete'>Click</button>
        </div>
    `);
   content.innerHTML = html.join(" ");

   const deleteBtns = $$('.delete');
   for (let i = 0; i < deleteBtns.length; i++) {
      deleteBtns[i].addEventListener('click', () => {
         if (confirm("Bạn có muốn xóa không ?")) {
            deleteData(i);
            updateLocalStorage();
            render();
         }
      })
   }
   $('.number').innerHTML = result;
}

render()

