import React from 'react';

export default function GridSquare(props) {
    // props:
    const { 
        handleSquareClick,
        id
    } = props;

    return (
        <div 
            className='grid-square'
            id={id}
            onClick={handleSquareClick}
        >    
        </div>
    )
}