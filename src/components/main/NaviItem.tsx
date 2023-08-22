'use client'

import Link from "next/link"
import styled from "styled-components";

import { IRoutesType } from "@/types/layoutTypes";
import { useMouseEvent } from "@/hooks/useNaviEvents";
import { useState } from "react";

interface INaviItemProps {
    route: IRoutesType,
    isCurrent: boolean
}

function NaviItem(props: INaviItemProps) {
    const [isOver, setIsOver] = useState(false);
    const Navi = styled.li<{ $isCurrent:boolean }>`
        padding: 10px 10px; z-index: 10; border-radius: 5px;
        display: block; position: relative;
        ${props =>
            (props.$isCurrent) ? `
            background-color: #BF4F74;
        `:null};

        & > a { 
            text-decoration:none;
            ${props =>
                (props.$isCurrent) ? `
                color:white;
            `:`color:black;`};
        }
        & > a:hover { color:#888;}
    `;

    const SubNaviContainer = styled.ul<{$isOver:boolean}>`
        padding: 10px; background-color: white; border: 1px solid #eee;
        position: absolute; display: none; width: 300px; z-index: 10;
        ${props =>
            (props.$isOver) ? `
            display: block;
        `:null};

        & > li {
            display: inline-block;  padding: 0 10px; cursor: pointer;
            background-color: #eee; margin: 0 3px;
        }
        & > li:hover { 
            color:green;
        }

        & > li > a { color:black; display: table; width:100%; }
    `;

    const mouseOver = () => {   setIsOver(true);    }

    const mouseOut = () => {    setIsOver(false);   }


    
    return (
        <Navi $isCurrent={props.isCurrent} onMouseOver={mouseOver} onMouseOut={mouseOut}>
            <Link href={props.route.path} >{props.route.name_kr}</Link>
            {
                props.route.childs?.length && props.route.childs?.length > 0?
                <SubNaviContainer $isOver={isOver}>
                    {
                        props.route.childs.map((subNavRoute:IRoutesType,index )=>(
                            <li key={index}>
                                <Link href={subNavRoute.path}>{subNavRoute.name_kr}</Link>
                            </li>
                        ))
                    }
                </SubNaviContainer> : null
            }
        </Navi>
    )
}

export default NaviItem