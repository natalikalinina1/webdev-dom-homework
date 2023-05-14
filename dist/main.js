/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./api.js":
/*!****************!*\
  !*** ./api.js ***!
  \****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"fetchPostApi\": () => (/* binding */ fetchPostApi),\n/* harmony export */   \"getCommentsList\": () => (/* binding */ getCommentsList),\n/* harmony export */   \"loginUser\": () => (/* binding */ loginUser),\n/* harmony export */   \"registerUser\": () => (/* binding */ registerUser)\n/* harmony export */ });\n\r\nconst host = \"https://webdev-hw-api.vercel.app/api/v2/natalia_kalinina/comments\";\r\n\r\n\r\n\r\nfunction getCommentsList({ token }) {\r\n  return fetch(host, {\r\n    method: \"GET\",\r\n    headers: {\r\n      Authorization: token,\r\n    },\r\n  }).then((response) => {\r\n    if (response.status === 201 || response.status === 200) {\r\n      return response.json();\r\n    } else {\r\n      return Promise.reject(\"Сервер упал\");\r\n    }\r\n  });\r\n}\r\n\r\nfunction fetchPostApi({ name, text, date, forceError, token }) {\r\n  return fetch(host, {\r\n    method: \"POST\",\r\n    body: JSON.stringify({\r\n      name,\r\n      text,\r\n      date,\r\n      forceError,\r\n    }),\r\n    headers: {\r\n      Authorization: token,\r\n    },\r\n  }).then((response) => {\r\n    if (response.status === 201) { \r\n      return response.json();  \r\n    }\r\n    else if (response.status === 400) {\r\n      throw new Error (\"Имя и комментарий должны быть не короче 3 символов\");\r\n    }\r\n    else if (response.status === 401) {\r\n      throw new Error(\"Нет авторизации\");\r\n    }\r\n    else if (response.status === 500) { \r\n      throw new Error (\"Сервер упал\");\r\n    } \r\n    else {\r\n      throw new Error (\"Что-то с интернетом\");\r\n    }\r\n  });\r\n}\r\nfunction registerUser({ login, password, name }) {\r\n\r\n  return fetch('https://webdev-hw-api.vercel.app/api/user', {\r\n    method: \"POST\",\r\n    body: JSON.stringify({\r\n      login,\r\n      password,\r\n      name\r\n    }),\r\n  }).then((response) => {\r\n      if (response.status === 400){\r\n        throw new Error (\"Такой пользователь уже существует\")\r\n      }\r\n      return response.json()\r\n  });\r\n}\r\n\r\nfunction loginUser({ login, password }) {\r\n\r\n  return fetch('https://webdev-hw-api.vercel.app/api/user/login', {\r\n    method: \"POST\",\r\n    body: JSON.stringify({\r\n      login,\r\n      password, \r\n    }),\r\n  })\r\n  .then((response) => {\r\n      if (response.status === 400){\r\n        throw new Error (\"Неверный логин или пароль\")\r\n      }\r\n      return response.json()      \r\n  });\r\n}\r\n\r\n\r\n\r\n\r\n\r\n  \r\n\n\n//# sourceURL=webpack://comment/./api.js?");

/***/ }),

/***/ "./login-component.js":
/*!****************************!*\
  !*** ./login-component.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"renderLoginComponent\": () => (/* binding */ renderLoginComponent)\n/* harmony export */ });\n/* harmony import */ var _time_data_delay_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./time-data-delay.js */ \"./time-data-delay.js\");\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n\r\n\r\n\r\n\r\nfunction renderLoginComponent({\r\n  appEl,\r\n  comments,\r\n  setToken,\r\n  renderComments,\r\n  setName,\r\n}) {\r\n\r\n   let isLoginMode = true;\r\n  const renderForm = () => {\r\n\r\n    const commentsHtml =\r\n    comments.map((user, index) => {\r\n      return `<li class=\"comment\" data-index ='${index}'>\r\n      <div class=\"comment-header\">\r\n        <div>${user.author.name}</div>\r\n        <div>${(0,_time_data_delay_js__WEBPACK_IMPORTED_MODULE_0__.getDate)(user.date)}</div>\r\n      </div>\r\n      <div class=\"comment-body\" >\r\n      <div class=\"comment-text\">${user.text.replaceAll(\"»\", \"<div class='quote'>\").replaceAll(\"©\", \"</div>\")}</div>\r\n      </div>\r\n      <div class=\"comment-footer\">\r\n        <div class=\"likes\">\r\n          <span class=\"likes-counter\">${user.likes}</span>\r\n          <button data-index=\"${index}\" class=\"like-button ${user.isLiked}\"></button>\r\n        </div>\r\n        \r\n      </div>  \r\n    </li>\r\n    `\r\n    }).join(\"\");\r\n    const appHtml = `\r\n            <div class=\"container\">\r\n              <ul id=\"list\" class=\"comments\">\r\n                ${commentsHtml}\r\n                <div class=\"tips-wrap\">\r\n        <div > Чтобы добавить комментарий, <buttun class =\"tips-auth\" id= \"avtoriz\"> авторизуйтесь:</button> </div>\r\n      </div>\r\n              </ul> \r\n\r\n            <div class=\"add-form\" >\r\n              <h2 class=\"class_form\"> Форма ${isLoginMode ? 'Bхода' : 'Регистрации'}</h2>\r\n              ${isLoginMode ? '': `<input type=\"text\" id=\"name-input\" class=\"add-form-name\" placeholder=\"Введите имя\" /> <br/>`}\r\n              <input type=\"text\" id=\"login-input\" class=\"add-form-name\" placeholder=\"Введите логин\"/> <br/>\r\n              <input type=\"password\" id=\"password-input\" class=\"add-form-name\" placeholder=\"Введите пароль\"/>\r\n              <div class=\"form-row\"> \r\n              <button id=\"login-button\" class=\"add-form-button\"> ${isLoginMode ? 'Войти' : 'Зарегестрироваться'}</button>\r\n              <button id=\"toggle-button\"class=\"add-form-button\">\r\n                Перейти ${isLoginMode ? 'к регистрации' : 'ко входу'}\r\n              </button>\r\n            </div>\r\n          </div>\r\n        </div>`; \r\n\r\n    appEl.innerHTML = appHtml;\r\n\r\n    document.querySelector('.add-form').style.display = 'none';\r\n    document.getElementById(\"avtoriz\").addEventListener(\"click\", () => {\r\n      renderForm();\r\n      document.querySelector('.add-form').style.display = 'flex';\r\n   \r\n     });\r\n    \r\n    document.getElementById(\"login-button\").addEventListener(\"click\", () => {\r\n\r\n      if (isLoginMode) {\r\n        const login = document.getElementById('login-input').value\r\n        const password = document.getElementById('password-input').value\r\n        if(!login) {\r\n          alert('Введите логин');\r\n          return;\r\n        }\r\n        if(!password) {\r\n          alert('Введите пароль');\r\n          return;\r\n        }\r\n        (0,_api_js__WEBPACK_IMPORTED_MODULE_1__.loginUser)({\r\n          login: login,\r\n          password: password,\r\n        })\r\n        .then ((user) => { \r\n          setName(user.user.name);    \r\n          setToken(`Bearer ${user.user.token}`);    \r\n          renderComments();\r\n        })\r\n        .catch(error =>{\r\n          alert(error.message);\r\n        })\r\n        } else {\r\n        const name = document.getElementById('name-input').value;\r\n        const login = document.getElementById('login-input').value;\r\n        const password = document.getElementById('password-input').value;\r\n\r\n        if(!name) {\r\n          alert('Введите имя');\r\n          return;\r\n        }\r\n        if(!login) {\r\n          alert('Введите логин');\r\n          return;\r\n        }\r\n        if(!password) {\r\n          alert('Введите пароль');\r\n          return;\r\n        }\r\n        (0,_api_js__WEBPACK_IMPORTED_MODULE_1__.registerUser)({\r\n          login: login,\r\n          password: password,\r\n          name : name,\r\n        })\r\n        .then ((user) => { \r\n          setToken(`Bearer ${user.user.token}`);\r\n          renderComments();\r\n        })\r\n        .catch(error =>{\r\n          alert(error.message);\r\n        });\r\n      }\r\n    });\r\n    document.getElementById(\"toggle-button\").addEventListener(\"click\", () => {\r\n      isLoginMode = !isLoginMode; \r\n      renderForm();\r\n    });\r\n  }\r\nrenderForm();\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://comment/./login-component.js?");

/***/ }),

/***/ "./script.js":
/*!*******************!*\
  !*** ./script.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"renderComments\": () => (/* binding */ renderComments)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n/* harmony import */ var _time_data_delay_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./time-data-delay.js */ \"./time-data-delay.js\");\n/* harmony import */ var _login_component_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login-component.js */ \"./login-component.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n let token = null;\r\n let comments = [];\r\n let name;\r\n\r\nconst fetchRender = () => {\r\n  return (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.getCommentsList)({token})\r\n    .then((responseData) => {\r\n      comments = responseData.comments;\r\n      renderComments();\r\n    })\r\n};\r\n//Рендер комментария\r\nconst renderComments = () => {\r\n const appEl = document.getElementById(\"app\");\r\n\r\nif (!token) {\r\n      (0,_login_component_js__WEBPACK_IMPORTED_MODULE_2__.renderLoginComponent)({\r\n        comments,\r\n        appEl,\r\n        setToken: (newToken) => {\r\n          token = newToken;\r\n        },\r\n        setName: (newName) => {\r\n          name = newName; \r\n        },\r\n        renderComments,\r\n      });\r\n      return;\r\n    }\r\n  const commentsHtml =\r\n  comments.map((user, index) => {\r\n    return `<li class=\"comment\" data-index ='${index}'>\r\n    <div class=\"comment-header\">\r\n     <div>${user.author.name}</div>\r\n     <div>${(0,_time_data_delay_js__WEBPACK_IMPORTED_MODULE_1__.getDate)(user.date)}</div>\r\n   </div>\r\n   <div class=\"comment-body\" data-comments=\"${index}\" >\r\n     <div class =\"comment-text\">  <div class=\"comment-text\">${user.text.replaceAll(\"»\", \"<div class='quote'>\").replaceAll(\"©\", \"</div>\")}\r\n   </div>\r\n   <div class=\"comment-footer\">\r\n      <div class=\"likes\">\r\n        <span class=\"likes-counter\">${user.likes}</span>\r\n        <button  data-index=\"${index}\" class=\"like-button ${user.isLiked}\"></button>\r\n      </div>\r\n   </div>\r\n   </li>`\r\n  }).join(\"\");\r\nconst appHtml = `\r\n            <div class=\"container\">\r\n    <p id=\"start-loader\"></p>\r\n    <ul id=\"list\" class=\"comments\">\r\n      ${commentsHtml}\r\n    </ul>\r\n    <div>\r\n   <p id=\"comment-loader\"></p>\r\n    </div>\r\n    <div id=\"add\" class=\"add-form\">\r\n      <input value = \"${name}\" id=\"name-input\" type=\"text\" class=\"add-form-name\" placeholder=\"Введите ваше имя\" />\r\n      <textarea id=\"comm-input\" type=\"textarea\" class=\"add-form-text\" placeholder=\"Введите ваш коментарий\"\r\n        rows=\"4\"></textarea>\r\n      <div class=\"add-form-row\">\r\n        <button id=\"add-button\" class=\"add-form-button\">Написать</button>\r\n      </div>\r\n    </div>\r\n  </div>`\r\n  \r\n  \r\n  ;\r\n\r\nappEl.innerHTML = appHtml;\r\n\r\n\r\nconst buttonElement = document.getElementById(\"add-button\");\r\nconst nameinputElement = document.getElementById(\"name-input\");\r\nconst  comminputElement = document.getElementById(\"comm-input\");\r\n//не предусмотрено сервером  const  buttonSave = document.querySelectorAll('.save-button');\r\n//не предусмотрено сервером  const  buttonEdit = document.querySelectorAll('.edit-button');\r\n//const startLoaderElement = document.getElementById(\"start-loader\");\r\nconst commentLoaderElement = document.getElementById(\"comment-loader\");\r\nconst inputFormElement = document.getElementById(\"add\")\r\n\r\n\r\n//Когда нажимаем \"Написать\" исчезает поле ввода и появляется строчка:\"Комментарий добавляется...\" \r\n  buttonElement.addEventListener(\"click\", () => {\r\n  commentLoaderElement.style.display = \"flex\";\r\n  commentLoaderElement.textContent = \"Комментарий добавляется...\";\r\n  inputFormElement.style.display = \"none\";\r\n  nameinputElement.classList.remove(\"error\");\r\n  comminputElement.classList.remove(\"error\");\r\n\r\n(0,_api_js__WEBPACK_IMPORTED_MODULE_0__.fetchPostApi)({\r\n      name: (0,_time_data_delay_js__WEBPACK_IMPORTED_MODULE_1__.safety)(nameinputElement.value),\r\n      text: (0,_time_data_delay_js__WEBPACK_IMPORTED_MODULE_1__.safety)(comminputElement.value),\r\n      date: new Date(),\r\n      forceError: true,\r\n      token,\r\n    })\r\n      .then(() => {\r\n        return fetchRender();\r\n      })\r\n      .then(() => {\r\n        nameinputElement.value = \"\"; //очищаем формы \r\n        comminputElement.value = \"\";   \r\n      })\r\n      .catch((error) => {\r\n        if (error.message === \"Имя и комментарий должны быть не короче 3-x символов\") {\r\n          alert(error.message);\r\n        }\r\n        else if (error.message === \"Нет авторизации\") {\r\n          alert(error.message);\r\n        }\r\n        else if (error.message === \"Сервер упал\") {\r\n          buttonElement.click(); // клик на ввод\r\n        } \r\n        else {\r\n          alert(\"Что-то с интернетом, попробуйте позже\");\r\n        }\r\n        \r\n        console.warn(error);\r\n        commentLoaderElement.style.display = \"none\";\r\n        inputFormElement.style.display = \"flex\"; \r\n      });\r\n\r\nrenderComments();\r\n  });\r\n    // Поле имени или текста становится красным , если не заполнить\r\n  buttonElement.addEventListener(\"click\", () => {\r\n    nameinputElement.classList.remove(\"error\");\r\n    comminputElement.classList.remove(\"error\");\r\n    if (nameinputElement.value === '') {\r\n      nameinputElement.classList.add(\"error\");\r\n    return;\r\n    }\r\n     if (comminputElement.value === '') {\r\n      comminputElement.classList.add(\"error\");\r\n      return;\r\n    }\r\n})\r\n// Добавление элемента в список по нажатию Enter \r\ndocument.addEventListener(\"keyup\",(event) => {\r\n  if (event.code === \"Enter\") {\r\n    document.getElementById(\"add-button\").click();\r\n    buttonElement.click();\r\n  }\r\n});\r\n\r\n////Добавляем лайки у каждого комментария:\r\n  function likeButton() {\r\n  \r\n    const likeElements = document.querySelectorAll('.like-button');\r\n    for (const likeElement of likeElements) {\r\n      likeElement.addEventListener('click', ( event) => {\r\n        event.stopPropagation(); //останавливаем всплытие \r\n        likeElement.classList.add('-loading-like')\r\n        ;(0,_time_data_delay_js__WEBPACK_IMPORTED_MODULE_1__.delay)(2000).then(()=> {\r\n          if (!comments[likeElement.dataset.index].isLiked) {\r\n            comments[likeElement.dataset.index].isLiked = \"\";\r\n            comments[likeElement.dataset.index].likes ++;\r\n          } else {\r\n            comments[likeElement.dataset.index].isLiked = \"-loading-like\";\r\n            comments[likeElement.dataset.index].likes --;\r\n          }\r\n            likeElement.classList.remove(\"-loading-like\");\r\n\r\n            renderComments();\r\n        })\r\n      });\r\n    }\r\n  }\r\n\r\n/*Удаление не предусмотрено\r\n//Удаление последнего комментария с помощью кнопки Удалить посл.комм.\r\nconst deleteButtonElement = document.getElementById('delete-button');\r\n    function deleteLastComment() {\r\n// Находим последний элемент списка комментариев\r\nconst lastCommentIndex = listElement.innerHTML.lastIndexOf('<li class=\"comment\">');\r\n     if (lastCommentIndex !== -1) {\r\n// Удаляем последний элемент\r\nconst lastCommentElement = listElement.children[listElement.children.length - 1];\r\n     listElement.removeChild(lastCommentElement);\r\n}\r\n}\r\n// Добавляем обработчик события click на кнопку\r\ndeleteButtonElement.addEventListener('click', deleteLastComment);  \r\n*/\r\n\r\n// Цитируем комментарии:\r\nfunction eventReplyButton() {\r\n  const commentElements = document.querySelectorAll('.comment');\r\n  for (const commentElement of commentElements) {\r\n    commentElement.addEventListener(\"click\", () => {\r\n     comminputElement.value = `» ${(0,_time_data_delay_js__WEBPACK_IMPORTED_MODULE_1__.back)(comments[commentElement.dataset.index].author.name)} - ${(0,_time_data_delay_js__WEBPACK_IMPORTED_MODULE_1__.back)(comments[commentElement.dataset.index].text)}© \\n\\n `;\r\n    \r\n    }); \r\n  }\r\n };\r\n eventReplyButton();\r\n likeButton();\r\n\r\n};\r\n\r\nrenderComments();\r\nfetchRender();\r\n\n\n//# sourceURL=webpack://comment/./script.js?");

/***/ }),

/***/ "./time-data-delay.js":
/*!****************************!*\
  !*** ./time-data-delay.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"back\": () => (/* binding */ back),\n/* harmony export */   \"delay\": () => (/* binding */ delay),\n/* harmony export */   \"getDate\": () => (/* binding */ getDate),\n/* harmony export */   \"safety\": () => (/* binding */ safety)\n/* harmony export */ });\n\r\n//создаем актуальную дату и время :\r\nfunction getDate(date) {\r\n    const time = {\r\n        year: '2-digit',\r\n        month: 'numeric',\r\n        day: 'numeric',\r\n        hour: '2-digit',\r\n        minute: '2-digit',\r\n    }\r\n    const newDate = new Date(date);\r\n    return newDate.toLocaleString('ru-RU', time).replace(',', ''); //  \r\n  }\r\n  //Задержка лайка имитация запроса в API \r\n  function delay(interval = 300) {\r\n    return new Promise((resolve) => {\r\n      setTimeout(() => {\r\n        resolve();\r\n      }, interval);\r\n    });\r\n  }\r\n  \r\n  // Обработка работка ввода комментария\r\n  function safety(str) {\r\n      return str.replaceAll(\"&\", \"&amp;\")\r\n          .replaceAll(\"<\", \"&lt;\")\r\n          .replaceAll(\">\", \"&gt;\")\r\n          .replaceAll('\"', \"&quot;\")\r\n          .replaceAll('[QUOTE_BEGIN]', \"<div class='quote'>\")\r\n          .replaceAll('[QUOTE_END]','</div>')\r\n  }\r\n  // Обратная обработка из комментария\r\n  function back(str) {\r\n    return str.replaceAll(\"&amp;\", \"&\")\r\n        .replaceAll(\"&lt;\", \"<\")\r\n        .replaceAll(\"&gt;\", \">\")\r\n        .replaceAll(\"&quot;\", '\"')\r\n        .replaceAll('[QUOTE_BEGIN]', \"<div class='quote'>\")\r\n        .replaceAll('[QUOTE_END]','</div>')\r\n  }\r\n  \n\n//# sourceURL=webpack://comment/./time-data-delay.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./script.js");
/******/ 	
/******/ })()
;