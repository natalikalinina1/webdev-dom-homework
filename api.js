
export function fetchGetApi() {
    return fetch('https://webdev-hw-api.vercel.app/api/v1/natalia_kalinina/comments',{
      method:"GET",
    })
    .then((response) => {
      return response.json();
    });
  }
  
  
  export function fetchPostApi(textValue, nameValue) {
    return fetch('https://webdev-hw-api.vercel.app/api/v1/natalia_kalinina/comments',{
      method:"POST",
      body: JSON.stringify ({
        text:textValue, 
        name:nameValue, 
      
    }),
    })
  }