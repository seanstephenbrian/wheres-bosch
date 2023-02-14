import React, { useState } from 'react';

export default function GridSquare(props) {
    // props:
    const { 
        handleSquareClick,
        id
    } = props;

    // state:
    const [clicked, setClicked] = useState(false);

    return (
        <div 
            className='grid-square'
            id={id}
            onClick={(e) => {
                handleSquareClick(e);
                setClicked(true);
            }}
        >    
        </div>
    )
}