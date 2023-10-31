import { LoginFormInt } from "@/type/Login";
import service from ".";

export function login(data: LoginFormInt) {
    return service({
        url: "/login/loginUser",
        method: "post",
        data,
    });
}
