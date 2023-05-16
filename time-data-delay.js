import { format } from "date-fns";

//создаем актуальную дату и время :
export function getDate(date) {
    return format(new Date(date), 'yyyy-MM-dd hh.mm.ss')
  }
  //Задержка лайка имитация запроса в API 
  export function delay(interval = 300) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, interval);
    });
  }
  
  // Обработка работка ввода комментария
  export function safety(str) {
      return str.replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;")
          .replaceAll('[QUOTE_BEGIN]', "<div class='quote'>")
          .replaceAll('[QUOTE_END]','</div>')
  }
  // Обратная обработка из комментария
  export function back(str) {
    return str.replaceAll("&amp;", "&")
        .replaceAll("&lt;", "<")
        .replaceAll("&gt;", ">")
        .replaceAll("&quot;", '"')
        .replaceAll('[QUOTE_BEGIN]', "<div class='quote'>")
        .replaceAll('[QUOTE_END]','</div>')
  }
  