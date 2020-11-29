import React, { useState } from 'react';
import Layout from '../elements/core/container/Layout/Layout';
import { signIn, signOut, useSession } from 'next-auth/client';


const tryLogin=async(email,password)=>{
  console.log("GETS TRIGGERED");

      let data={
        user:{
            email,
            password
        }
    }; 
    const result = await fetch(
    "https://brickboard.herokuapp.com/login",
    {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  ).then((response) => {
    console.log("THE RESPONSE")
    // console.log(response);
    console.log(response.headers);
    // console.log("THE JWT")
    // console.log("WE GOT OUR ORIGINAL JWT");
    // console.log(response.headers.get("authorization"));
    // publicJWT=response.headers.get("authorization");
    // console.log("------------------------------------");
    return response.json() ;
  });
}

function Login() {

    const [ session, loading ] = useSession();
    const [email,SetEmail]=useState("");
    const [password,setPassword]=useState("");

  return (
    <Layout title="Login">
        <form>
             <input type="text" name="email" placeholder="Email" onChange={(e)=>SetEmail(e.target.value)}/>
             <input type="password" name="password" onChange={(e)=>setPassword(e.target.value)} />
             <button onClick={()=>tryLogin(email,password)}>Einloggen</button>
        </form>
    </Layout>
  )
}

export default Login;