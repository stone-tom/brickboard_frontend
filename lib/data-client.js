const backendUrl="https://brickboard.herokuapp.com";


export default async function handler(url) {

    try{
    let answer = await fetch(`https://brickboard.herokuapp.com${url}`, {
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

  export const getMessageboardGroups=async(url)=>{
    let fetchURL="";
    try{
      if(url){
        fetchURL=url;
      }else{
        fetchURL=`${backendUrl}/messageboard-groups`;
      }
        let answer=await fetch(fetchURL, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        });
        return answer.json();
        }catch(e){
            return e;
        }

  }