import jwt from "next-auth/jwt";

const secret=process.env.JWT_SECRET;

export default async function handler(req, res) {

    const token = await jwt.getToken({ req, secret });
    console.log("IS THIS WHAT WE WANT???",token);

    let topics=await fetch("https://brickboard.herokuapp.com/1/topics", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": token.jwt,
    }}).then((response) => {
     
          return response.json();
       
      });
    res.send(JSON.stringify(topics))
  }