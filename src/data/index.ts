import { IRoutesType } from "@/types/layoutTypes";

// layout navigation list
export const AppRoutes : Array<IRoutesType> = [
    {path: "/", name_kr:"Home"},
    {path: "/list", name_kr:"세부라우트", 
        childs:[
            {path:"/list/a", name_kr: "a"},
            {path:"/list/b", name_kr: "b"},
        ]
    },
    {path: "/test", name_kr:"Error(없는주소)"},
];

