import React, { useEffect, useState } from "react";
import Layout from "../elements/core/container/Layout/Layout";
import { ContentContainer } from "../global.styles";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useAuthDispatch } from "../context/auth";
import Link from "next/link";

function Login() {

    const{logout, isAuthenticated}=useAuthDispatch();

    useEffect(()=>{
        logout();
    },[]);

    return(
        <Layout title="Logout">
        <ContentContainer>
            <h1>Du wurdest erfolgreich abgemeldet!</h1>
            <Link href="/">Zur Startseite</Link><br/>
            <Link href="/login">Wieder einloggen</Link>
        </ContentContainer>
        </Layout> 
    );
}

export default Login;
