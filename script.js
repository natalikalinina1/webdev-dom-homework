/* НЕ предусмотрено сервером
        // Добавляем редактирование комментария:
        function eventEditButtons () {
          const buttonEdit = document.querySelectorAll(".edit-button");
          for (const edBtn of buttonEdit) {
            const index = edBtn.dataset.index;
            edBtn.addEventListener("click", (event) =>{
              event.stopPropagation(); // убираем всплытие
              comments[index].isEdit = !comments[index].isEdit;
              renderComments(comments, listElement, getListComments);
              eventSaveButton();
            })
          }
        }
        // Oкно редактирoвания 
        function editRedact() { 
          const areaEditMessageElement = document.querySelectorAll(".textarea");
          for (const item of areaEditMessageElement) {
            item.addEventListener('click', (event) => {
              event.stopPropagation();
            })
          }
        }
        
        // Сохранение отредактированного коментария:
        function eventSaveButton () {
          const buttonSave = document.querySelectorAll(".save-button");
          for (const saveBtn of buttonSave) {
            const inputMessage = document.getElementById("input");
            const index = saveBtn.dataset.index;
            saveBtn.addEventListener("click", (event) => {
              event.stopPropagation();  
              comments[index].isEdit = false; 
              comments[index].comment = inputMessage.value;
              comments[index].text = inputMessage.value;
              renderComments(comments, listElement, getListComments);
              
           
            });
          }
          
        }

*/

import { getCommentsList, fetchPostApi } from "./api.js";
import {getDate, safety, delay, back} from "./time-data-delay.js"
import { renderLoginComponent} from "./login-component.js";


 let token = null;
 let comments = [];
 let name;

const fetchRender = () => {
  return getCommentsList({token})
    .then((responseData) => {
      comments = responseData.comments;
      renderComments();
    })
};
//Рендер комментария
export const renderComments = () => {
 const appEl = document.getElementById("app");

if (!token) {
      renderLoginComponent({
        comments,
        appEl,
        setToken: (newToken) => {
          token = newToken;
        },
        setName: (newName) => {
          name = newName; 
        },
        renderComments,
      });
      return;
    }
  const commentsHtml =
  comments.map((user, index) => {
    return `<li class="comment" data-index ='${index}'>
    <div class="comment-header">
     <div>${user.author.name}</div>
     <div>${getDate(user.date)}</div>
   </div>
   <div class="comment-body" data-comments="${index}" >
     <div class ="comment-text">  <div class="comment-text">${user.text.replaceAll("»", "<div class='quote'>").replaceAll("©", "</div>")}
   </div>
   <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter">${user.likes}</span>
        <button  data-index="${index}" class="like-button ${user.isLiked}"></button>
      </div>
   </div>
   </li>`
  }).join("");
const appHtml = `
            <div class="container">
    <p id="start-loader"></p>
    <ul id="list" class="comments">
      ${commentsHtml}
    </ul>
    <div>
   <p id="comment-loader"></p>
    </div>
    <div id="add" class="add-form">
      <input value = "${name}" id="name-input" type="text" class="add-form-name" placeholder="Введите ваше имя" />
      <textarea id="comm-input" type="textarea" class="add-form-text" placeholder="Введите ваш коментарий"
        rows="4"></textarea>
      <div class="add-form-row">
        <button id="add-button" class="add-form-button">Написать</button>
      </div>
    </div>
  </div>`
  
  
  ;

appEl.innerHTML = appHtml;


const buttonElement = document.getElementById("add-button");
const nameinputElement = document.getElementById("name-input");
const  comminputElement = document.getElementById("comm-input");
//не предусмотрено сервером  const  buttonSave = document.querySelectorAll('.save-button');
//не предусмотрено сервером  const  buttonEdit = document.querySelectorAll('.edit-button');
//const startLoaderElement = document.getElementById("start-loader");
const commentLoaderElement = document.getElementById("comment-loader");
const inputFormElement = document.getElementById("add")


//Когда нажимаем "Написать" исчезает поле ввода и появляется строчка:"Комментарий добавляется..." 
  buttonElement.addEventListener("click", () => {
  commentLoaderElement.style.display = "flex";
  commentLoaderElement.textContent = "Комментарий добавляется...";
  inputFormElement.style.display = "none";
  nameinputElement.classList.remove("error");
  comminputElement.classList.remove("error");

fetchPostApi({
      name: safety(nameinputElement.value),
      text: safety(comminputElement.value),
      date: new Date(),
      forceError: true,
      token,
    })
      .then(() => {
        return fetchRender();
      })
      .then(() => {
        nameinputElement.value = ""; //очищаем формы 
        comminputElement.value = "";   
      })
      .catch((error) => {
        if (error.message === "Имя и комментарий должны быть не короче 3-x символов") {
          alert(error.message);
        }
        else if (error.message === "Нет авторизации") {
          alert(error.message);
        }
        else if (error.message === "Сервер упал") {
          buttonElement.click(); // клик на ввод
        } 
        else {
          alert("Что-то с интернетом, попробуйте позже");
        }
        
        console.warn(error);
        commentLoaderElement.style.display = "none";
        inputFormElement.style.display = "flex"; 
      });

renderComments();
  });
    // Поле имени или текста становится красным , если не заполнить
  buttonElement.addEventListener("click", () => {
    nameinputElement.classList.remove("error");
    comminputElement.classList.remove("error");
    if (nameinputElement.value === '') {
      nameinputElement.classList.add("error");
    return;
    }
     if (comminputElement.value === '') {
      comminputElement.classList.add("error");
      return;
    }
})
// Добавление элемента в список по нажатию Enter 
document.addEventListener("keyup",(event) => {
  if (event.code === "Enter") {
    document.getElementById("add-button").click();
    buttonElement.click();
  }
});

////Добавляем лайки у каждого комментария:
  function likeButton() {
  
    const likeElements = document.querySelectorAll('.like-button');
    for (const likeElement of likeElements) {
      likeElement.addEventListener('click', ( event) => {
        event.stopPropagation(); //останавливаем всплытие 
        likeElement.classList.add('-loading-like')
        delay(2000).then(()=> {
          if (!comments[likeElement.dataset.index].isLiked) {
            comments[likeElement.dataset.index].isLiked = "";
            comments[likeElement.dataset.index].likes ++;
          } else {
            comments[likeElement.dataset.index].isLiked = "-loading-like";
            comments[likeElement.dataset.index].likes --;
          }
            likeElement.classList.remove("-loading-like");

            renderComments();
        })
      });
    }
  }

/*Удаление не предусмотрено
//Удаление последнего комментария с помощью кнопки Удалить посл.комм.
const deleteButtonElement = document.getElementById('delete-button');
    function deleteLastComment() {
// Находим последний элемент списка комментариев
const lastCommentIndex = listElement.innerHTML.lastIndexOf('<li class="comment">');
     if (lastCommentIndex !== -1) {
// Удаляем последний элемент
const lastCommentElement = listElement.children[listElement.children.length - 1];
     listElement.removeChild(lastCommentElement);
}
}
// Добавляем обработчик события click на кнопку
deleteButtonElement.addEventListener('click', deleteLastComment);  
*/

// Цитируем комментарии:
function eventReplyButton() {
  const commentElements = document.querySelectorAll('.comment');
  for (const commentElement of commentElements) {
    commentElement.addEventListener("click", () => {
     comminputElement.value = `» ${back(comments[commentElement.dataset.index].author.name)} - ${back(comments[commentElement.dataset.index].text)}© \n\n `;
    
    }); 
  }
 };
 eventReplyButton();
 likeButton();



};

renderComments();
fetchRender();
