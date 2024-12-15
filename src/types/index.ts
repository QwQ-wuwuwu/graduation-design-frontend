export interface MyRoute {
    path: string,
    element: any,
    meta?: string[],
    children?: MyRoute[]
}