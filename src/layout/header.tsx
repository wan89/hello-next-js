'use client'
// libs
import Link from "next/link";
import { usePathname } from "next/navigation";
import { styled } from "styled-components";
// data
import { AppRoutes } from "@/data";
import { IRoutesType } from "@/types/layoutTypes";
//component
import NaviItem from "@/components/main/NaviItem";

export default function Header() {
    const currentPathName = usePathname();
    const NaviContainer = styled.ul `
        display: flex;
        list-style: none;
        margin: 0; padding: 0;
        

        & > li { margin: 10px; }
    `;
    
    return (
        <header>
            <div className="contents-wrapper">
                <NaviContainer>
                    {
                        AppRoutes.map((route:IRoutesType, index)=>(
                            <NaviItem 
                                route={route}
                                isCurrent={currentPathName == route.path}
                                key={index} 
                                />
                        ))
                    }
                </NaviContainer>
            </div>
        </header>
    )
  }
  