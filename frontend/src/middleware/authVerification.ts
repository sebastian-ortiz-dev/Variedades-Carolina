import { redirect } from "react-router";

export function authMiddleware(){
    const token = localStorage.getItem("token")
    if(!token){
        return redirect("/login")
    }
    return;
}