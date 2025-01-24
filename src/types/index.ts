export interface MyRoute {
    path: string,
    element: any,
    meta?: string[],
    children?: MyRoute[]
}
export interface User {
    id: number,
    name: string,
    role: number,
    menu?: string[],
    password?: string,
    role_name?: string,
    insert_time?: string,
    update_time?: string
}