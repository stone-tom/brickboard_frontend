import React, { ReactNode } from "react";
import { BBButton, BBButtonIcon, RightButtonWrapper } from "./BBButton.styles";

interface ButtonProps{
    children: ReactNode;
    add?: boolean;
    alignRight?:boolean;
    href?:string;
    ref:any;
}

const BBButtonComponent=React.forwardRef(({add,alignRight, children, href}:ButtonProps,ref:any)=>{
    if(alignRight){
        return(
            <RightButtonWrapper><BBButton href={href} ref={ref} role="button">{add && <BBButtonIcon>+</BBButtonIcon> } {children}</BBButton></RightButtonWrapper>
        );
    }
    return(
        <BBButton href={href} ref={ref} role="button">{add && <BBButtonIcon>+</BBButtonIcon> } {children}</BBButton>
    );
});


export default BBButtonComponent;