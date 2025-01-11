import { createContext } from "react";

const user = {
    name: '',
    role: 2 // 0: 管理员 2: 普通用户
}
export const UserContext = createContext(user)