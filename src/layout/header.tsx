'use client'
// libs
import Link from "next/link";
import { usePathname } from "next/navigation";
import { styled } from "styled-components";
// data
import { Routes } from "@/data";
import { IRoutesType } from "@/types/layoutTypes";
//component
import NaviItem from "@/components/main/NaviItem";

export default function Header() {
    const currentPathName = usePathname();
    const NaviContainer = styled.ul `
        display: flex;
        list-style: none;
        & > li { margin: 10px; }
        & a { text-decoration:none; color: black; }
    `;
    
    return (
        <header>
            <div className="contents-wrapper">
                <NaviContainer>
                    {
                        Routes.map((route:IRoutesType,index)=>(
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
  