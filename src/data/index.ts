import { IRoutesType } from "@/types/layoutTypes";

export const Routes : Array<IRoutesType> = [
    {path: "/", name_kr:"Home"},
    {path: "/list", name_kr:"세부라우트", 
        child:[
            {path:"/list/a", name_kr: "a"},
            {path:"/list/b", name_kr: "b"},
        ]
    },
    {path: "/test", name_kr:"Error(없는주소)"},
];

