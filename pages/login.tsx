import React, { useState } from 'react';
import Layout from '../elements/core/container/Layout/Layout';
import { signIn, signOut, useSession } from 'next-auth/client';

function Login() {

    const [ session, loading ] = useSession();
    const [email,SetEmail]=useState("");
    const [password,setPassword]=useState("");

  return (
    <Layout title="Login">
        <form>
             <input type="text" name="email" placeholder="Email" onChange={(e)=>SetEmail(e.target.value)}/>
             <input type="password" name="password" onChange={(e)=>setPassword(e.target.value)} />
             <button onClick={()=>signIn('credentials', { username: email, password: password })}>Einloggen</button>
        </form>
    </Layout>
  )
}

export default Login;