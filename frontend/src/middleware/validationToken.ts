import { redirect } from "react-router";

export function tokenValidation(){
    const tokenDate = localStorage.getItem("expireIn");
    const dateNow = Date.now();
    const tokenExpire = new Date(tokenDate);
    const date = new Date(dateNow);
    if(date.getTime() >= tokenExpire.getTime()){
        return redirect("/login")
    }
    return;
}