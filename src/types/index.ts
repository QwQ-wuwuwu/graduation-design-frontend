export interface MyRoute {
    path: string,
    element: any,
    meta?: string[],
    children?: MyRoute[]
}
export interface User {
    name: string,
    role: number
}