'use client'

import Link from "next/link"
import styled from "styled-components";

import { IRoutesType } from "@/types/layoutTypes";

type INaviItemPropsType = {
    route: IRoutesType,
    isCurrent: boolean
}

function NaviItem(props: INaviItemPropsType) {
    const Navi = styled.li<{ $isCurrent:boolean }>`
        margin: 0 10px;
        display: block;
        ${props =>
            (props.$isCurrent) ? `
            background-color: #BF4F74;
        `:``};
    `;

    console.log(props.isCurrent);
    
    return (
        <Navi $isCurrent={props.isCurrent}>
            <Link href={props.route.path}>{props.route.name_kr}</Link>
        </Navi>
    )
}

export default NaviItem