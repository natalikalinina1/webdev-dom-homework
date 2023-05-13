
import { getDate } from "./time-data-delay.js";
import {loginUser, registerUser} from './api.js';

export function renderLoginComponent({
  appEl,
  comments,
  setToken,
  renderComments,
  setName,
}) {

   let isLoginMode = true;
  const renderForm = () => {

    const commentsHtml =
    comments.map((user, index) => {
      return `<li class="comment" data-index ='${index}'>
      <div class="comment-header">
        <div>${user.author.name}</div>
        <div>${getDate(user.date)}</div>
      </div>
      <div class="comment-body" >
      <div class="comment-text">${user.text.replaceAll("»", "<div class='quote'>").replaceAll("©", "</div>")}</div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${user.likes}</span>
          <button data-index="${index}" class="like-button ${user.isLiked}"></button>
        </div>
        
      </div>  
    </li>
    `
    }).join("");
    const appHtml = `
            <div class="container">
              <ul id="list" class="comments">
                ${commentsHtml}
                <div class="tips-wrap">
        <div > Чтобы добавить комментарий, <buttun class ="tips-auth" id= "avtoriz"> авторизуйтесь:</button> </div>
      </div>
              </ul> 

            <div class="add-form" >
              <h2 class="class_form"> Форма ${isLoginMode ? 'Bхода' : 'Регистрации'}</h2>
              ${isLoginMode ? '': `<input type="text" id="name-input" class="add-form-name" placeholder="Введите имя" /> <br/>`}
              <input type="text" id="login-input" class="add-form-name" placeholder="Введите логин"/> <br/>
              <input type="password" id="password-input" class="add-form-name" placeholder="Введите пароль"/>
              <div class="form-row"> 
              <button id="login-button" class="add-form-button"> ${isLoginMode ? 'Войти' : 'Зарегестрироваться'}</button>
              <button id="toggle-button"class="add-form-button">
                Перейти ${isLoginMode ? 'к регистрации' : 'ко входу'}
              </button>
            </div>
          </div>
        </div>`; 

    appEl.innerHTML = appHtml;

    document.querySelector('.add-form').style.display = 'none';
    document.getElementById("avtoriz").addEventListener("click", () => {
      renderForm();
      document.querySelector('.add-form').style.display = 'flex';
   
     });
    
    document.getElementById("login-button").addEventListener("click", () => {

      if (isLoginMode) {
        const login = document.getElementById('login-input').value
        const password = document.getElementById('password-input').value
        if(!login) {
          alert('Введите логин');
          return;
        }
        if(!password) {
          alert('Введите пароль');
          return;
        }
        loginUser({
          login: login,
          password: password,
        })
        .then ((user) => { 
          setName(user.user.name);    
          setToken(`Bearer ${user.user.token}`);    
          renderComments();
        })
        .catch(error =>{
          alert(error.message);
        })
        } else {
        const name = document.getElementById('name-input').value;
        const login = document.getElementById('login-input').value;
        const password = document.getElementById('password-input').value;

        if(!name) {
          alert('Введите имя');
          return;
        }
        if(!login) {
          alert('Введите логин');
          return;
        }
        if(!password) {
          alert('Введите пароль');
          return;
        }
        registerUser({
          login: login,
          password: password,
          name : name,
        })
        .then ((user) => { 
          setToken(`Bearer ${user.user.token}`);
          renderComments();
        })
        .catch(error =>{
          alert(error.message);
        });
      }
    });
    document.getElementById("toggle-button").addEventListener("click", () => {
      isLoginMode = !isLoginMode; 
      renderForm();
    });
  }
renderForm();
}


