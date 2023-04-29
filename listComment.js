export const getListComments = (comment, index) => { 
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
}