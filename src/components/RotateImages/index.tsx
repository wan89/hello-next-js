import React, { useEffect,useState } from 'react';
import { useMouseEvent } from '../../hooks/useDrag'
import { useRecoilValue} from 'recoil';
// import { mouseValue } from '@store';

const AnimateImg = () => {
    const [value,setValue] = useState(1);
    // const vals = useRecoilValue(mouseValue);
    let imgUrl = `https://fastly-production.24c.in/webin/360/output_${value}.jpeg`;
    
    const tempStyle = {
        width:"500px",
        paddingBottom:'1px',
        PointerEvent: ("none" as React.CSSProperties["pointerEvents"])
    }
    const tempStyle1 = {
        width:"500px"
    }

    // useEffect(()=>{
    //     console.log("!! "+vals.x);     
    //     setValue(Math.abs(Math.ceil((value/400 + vals.x))%76)+1);
    // },[vals]);
    
    
    return (
        <div {...useMouseEvent(75)} style={tempStyle1} >
            <img src={imgUrl} alt='이건 필요한거' style={tempStyle}/>
        </div>
    );
}



export default AnimateImg