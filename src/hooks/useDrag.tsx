import { useState } from 'react';
import { useRecoilState} from 'recoil';
import { mouseValue } from '../store';


export const useMouseEvent = (picValue:number) => {
    const [ mouseIsDownMode, setMouseIsDownMode ] = useState(false);
    const [ mousePoint, setMousePoint ] = useState({x:0,y:0});
    const [ mouseValues, setMouseValue ] = useRecoilState(mouseValue);

    const onMouseDown = (e:any) => {
        if (e.type === 'touchstart') e.stopPropagation()
        
        setMouseIsDownMode(true);
        try{
            if(e.touches){
                setMousePoint({x: e.touches[0].clientX, y: e.touches[0].clientY});
            }else{
                setMousePoint({x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY});
            }
        } catch(err){
            console.log(err);
        }
    }

    const onMouseMove = (e:any) => {
        if(!mouseIsDownMode) return;
        let poX;
        poX = mouseValues.x + ((e.touches)? e.movementX : e.movementX);
        console.log("!/ "+e.movementX, ((e.touches)? e.movementX : e.movementX), poX );
        setMouseValue({x:poX, y:0});
        if(mouseValues.x < 0) setMouseValue({x:(picValue*100), y:0});
        
        //console.log(poX, mousePoint.x,((e.touches)? e.touches[0].clientX : e.nativeEvent.clientX));
    }

    const onMouseUp = (e:any) => {
        if (e.type === 'touchend') e.stopPropagation()
        setMouseIsDownMode(false);
    }
    const onMouseEnter = () => {}
    const onMouseOut = () => {
        setMouseIsDownMode(false);
    }

    return {
        onMouseDown,
        onMouseMove,
        onMouseUp,
        onMouseEnter,
        onMouseOut,
        onTouchStart: onMouseDown,
        onTouchMove: onMouseMove,
        onTouchEnd: onMouseUp,
    }
}
