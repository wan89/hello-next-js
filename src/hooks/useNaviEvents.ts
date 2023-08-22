import { useState } from 'react';


export const useNaviEvents = () => {
    const [ mouseIsDownMode, setMouseIsDownMode ] = useState(false);

    const onMouseOver = (e:React.MouseEvent) => {
        
    }
    const onMouseOut = (e:React.MouseEvent) => {
    }

    return {
        onMouseOver,
        onMouseOut,
    }
}
