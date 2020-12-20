
export default async function handler(url) {

    try{
    let answer=await fetch(`https://brickboard.herokuapp.com${url}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }}).then((response) => {
     
          return response.json();
       
      });
    }catch(e){
        return e;
    }
   
  }

  export const getMessageboards=async()=>{
    
    try{
        let answer=await fetch(`https://${process.env.BACKEND_URL}/messageboards`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }}).then((response) => {
         
              return response.json();
           
          });
        }catch(e){
            return e;
        }

  }