import { getListComments } from "./listComment.js";
import { renderComments } from "./render.js";
import { fetchGetApi, fetchPostApi } from "./api.js";

const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("list");
const nameinputElement = document.getElementById("name-input");
const  comminputElement = document.getElementById("comm-input");
const buttonSave = document.querySelectorAll('.save-button');
const  buttonEdit = document.querySelectorAll('.edit-button');
const startLoaderElement = document.getElementById("start-loader");
const commentLoaderElement = document.getElementById("comment-loader");
const inputFormElement = document.getElementById("add");

//Когда идет загрузка из API появляется текст: 
startLoaderElement.textContent = "Пожалуйста подождите, комментарий загружается..."; 

function fetchPromise() {
  //УДАЛИТЬ
 /* return fetch('https://webdev-hw-api.vercel.app/api/v1/natalia_kalinina/comments',{
   method:"GET",
  })
  .then((response) => {
    return response.json();
  })*/

  fetchGetApi()
  .then((responseData) => {
    const appComments = responseData.comments.map((comment) => {
      const time = {
        year: "2-digit",
        month: "numeric",
        day: "numeric",
        timezone: "UTC",
        hour: "numeric",
        minute: "2-digit",
      };
      return {
        name:comment.author.name,
        date: new Date(comment.date).toLocaleString("ru-RU", time),
        comment: comment.text, 
        likeCounter: comment.likes,
        likeButton: false,
        isEdit:false,
      };
    });
    comments = appComments;
   renderComments(comments, listElement, getListComments);
    startLoaderElement.style.display = "none"; 
    likeButton ();
  eventReplyButton();
  eventEditButtons () 
  editRedact();
  eventSaveButton();

  });
}
fetchPromise();
        // Добавляем редактирование комментария:
        function eventEditButtons () {
          const buttonEdit = document.querySelectorAll(".edit-button");
          for (const edBtn of buttonEdit) {
            const index = edBtn.dataset.index;
            edBtn.addEventListener("click", (event) =>{
              event.stopPropagation(); // убираем всплытие
              comments[index].isEdit = !comments[index].isEdit;
              renderComments(comments, listElement, getListComments);
            })
          }
        }
        // Oкно редактирoвания 
        function editRedact() { 
          const areaEditMessageElement = document.querySelectorAll(".textarea");
          for (const item of areaEditMessageElement) {
            item.addEventListener('click', (event) => {
              event.stopPropagation();
             fetchPromise ();
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
            })
          }
        }
            
let comments = [];


/*
// УДАЛИТЬ 
Рендер Комментариев:
const renderComments = () => {
  const commentsHtml = comments
  .map((comment, index) => {
    return  `<li class="comment" data-index ='${index}' >
      <div class="comment-header">
         <div>${comment.name}</div>
         <div>${comment.date}</div>
         </div>
         <div class="comment-body">
         ${comment.isEdit ? `<textarea id="input" class="comment-text textarea" type="texrarea">${comment.comment}</textarea>` : `<div class="comment-text">${comment.comment.replaceAll("»", "<div class='quote'>").replaceAll("©", "</div>")}</div>`}
         </div>
         <div class="comment-footer">
         	${comment.isEdit ? `<button data-index="${index}" class="save-button">Сохранить</button>` : `<button data-index="${index}" class="edit-button">Редактировать</button>`}
           <div class="likes">
           <span class="likes-counter">${comment.likeCounter}</span>
           <button data-index ='${index}'class="like-button ${comment.likeButton}"></button>
         
           </div>
      </div>
     </li>`
  })
  .join("");
  listElement.innerHTML = commentsHtml;
  likeButton ();
  eventReplyButton();
  editRedact();
  eventEditButtons () 
  eventSaveButton();
}; 
renderComments();
*/
 //Кнопка Enter активирует кнопку - Написать
 comminputElement.addEventListener("keyup", function(event) {
    if (event.key === 13) {
        event.preventDefault();
          document.getElementById("add-button").click();
  }
});
//У нас пока нет API лайков, поэтому сымитируем запрос в API с помощью функции delay.
function delay(interval = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
}
//Добавляем лайки у каждого комментария:
function likeButton () {
  const likeElements = document.querySelectorAll('.like-button');
  for (const likeElement of likeElements) {
    likeElement.addEventListener("click", (event) => {
      event.stopPropagation(); //останавливаем всплытие
      likeElement.classList.add("-loading-like");
      delay(2000).then(() => {
        if (likeElement.classList.contains("-active-like")) {
          comments[likeElement.dataset.index].likeButton = "";
          comments[likeElement.dataset.index].likeCounter --;
        } else {
          comments[likeElement.dataset.index].likeButton = "-active-like";
          comments[likeElement.dataset.index].likeCounter++;
        }
        likeElement.classList.remove("-loading-like");

        renderComments(comments, listElement, getListComments);
        likeButton ();
        eventReplyButton();
        eventEditButtons () 
        editRedact();
        eventSaveButton();
      });  
    });
  }
};

// Добавление элемента в список по нажатию Enter 
document.addEventListener("keyup",(event) => {
  if (event.code === "Enter") {
    document.getElementById("add-button").click();
    buttonElement.click();
  }
});
buttonElement.addEventListener("click", () => {
  //Когда нажимаем "Написать" исчезает поле ввода и появляется строчка:"Комментарий добавляется..." 
  commentLoaderElement.style.display = "flex";
  commentLoaderElement.textContent = "Комментарий добавляется...";
  inputFormElement.style.display = "none";

})
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
  //создаем актуальное время :
   const time = {
    year: "2-digit",
    month: "numeric",
    day: "numeric",
    timezone: "UTC",
    hour: "numeric",
    minute: "2-digit",

  };
  const currentDate = new Date().toLocaleString("ru-RU", time);

comments.push ({
  name: nameinputElement.value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;"),
  date: currentDate,
  comment: comminputElement.value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;"),
  likeCounter: 0,
  likeButton: false,
  isEdit:false,

});


  /*
    УДАЛИТЬfetch('https://webdev-hw-api.vercel.app/api/v1/natalia_kalinina/comments',{
      method:"POST",
      body: JSON.stringify ({
        text: comminputElement.value.replaceAll("<","&lt;").replaceAll(">","&gt;"),
        name: nameinputElement.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;")
        .replaceAll('[QUOTE_BEGIN]', "<div class='quote'>")
        .replaceAll('[QUOTE_END]','</div>'),
        date: currentDate,
        likeCounter: 0,
        likeButton: "",
        forceError: true, //добавим, чтобы иногда вылезала ошибка 500
    }),
    })
    */
    fetchPostApi(comminputElement.value, nameinputElement.value)

    .then((response) =>{
      if (response.status === 201) { 
        return response.json();  
      }
      else if (response.status === 400) {
        throw new Error ("Имя и комментарий должны быть не короче 3 символов");
      }
      else if (response.status === 500) { 
        throw new Error ("Сервер упал");
      } 
      else {
        throw new Error ("Что-то с интернетом");
      }
    })
    .then(() => {
      
      return fetchPromise();
    })
    .then(() => {
  
      commentLoaderElement.style.display = "none";
      inputFormElement.style.display = "flex";
  
      nameinputElement.value = ""; //очищаем формы
      comminputElement.value = "";  
      
    })
    .catch((error) => {
      if (error.message === "Имя и комментарий должны быть не короче 3 символов") {
        alert(error.message);
      }
      else if (error.message === 'Сервер упал') {
        buttonElement.click(); 
      } 
      else {
        alert("Что-то с интернетом, попробуйте позже");
      }
      console.warn(error);
      commentLoaderElement.style.display = "none";
      inputFormElement.style.display = "flex";
    })
  });
  
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

// Цитируем комментарии:
function eventReplyButton() {
 const commentElements = document.querySelectorAll('.comment');
 for (const commentElement of commentElements) {
   commentElement.addEventListener("click", () => {
    comminputElement.value = ` » ${comments[commentElement.dataset.index].name}- ${comments[commentElement.dataset.index].comment} \n\n  ©`;
   }); 
 }
};
eventReplyButton();



