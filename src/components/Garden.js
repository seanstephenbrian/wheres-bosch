import React, { useEffect, useState } from 'react';

import ThePainting from '../img/garden.jpg';

import '../styles/garden.scss';

function Garden() {

    // state:
    const [cursorClass, setCursorClass] = useState('');
    const [mousePosition, setMousePosition] = useState({
        x: 0,
        y: 0
    });

    // hooks:
    useEffect(() => {
        const scrollAmount = 100;
        // scroll right conditions:
        if ((mousePosition.x / window.innerWidth) > 0.875) {
            window.scrollBy(scrollAmount, 0);
            setCursorClass('right-arrow');
        // scroll down:
        } else if ((mousePosition.y / window.innerHeight) > 0.875) {
            window.scrollBy(0, scrollAmount);
            setCursorClass('down-arrow');
        // scroll left:
        } else if ((mousePosition.x / window.innerWidth) < 0.125) {
            window.scrollBy(-1*scrollAmount, 0);
            setCursorClass('left-arrow');
        // scroll up:
        } else if ((mousePosition.y / window.innerHeight) < 0.125) {
            window.scrollBy(0, -1*scrollAmount);
            setCursorClass('up-arrow');
        // not scrolling:
        } else {
            setCursorClass('');
        }
    }, [mousePosition]);

    function handleMouseMove(e) {
        setMousePosition({
            x: e.clientX,
            y: e.clientY
        });
    }

    // the click grid will contain 5000 squares (50 squares in the y direction, 100 in the x)
    let gridSquares = [];
    for (let i = 0; i < 5000; i++) {
        gridSquares.push(
            <div 
                className={`grid-square`}
                data-id={i} 
                key={i}>    
            </div>
        );
    }

    return (
        <div 
            className={`garden ${cursorClass}`}
            onMouseMove={(e) => handleMouseMove(e)}
        >
            <div className='grid'>
                {gridSquares}
            </div>
            <div className='painting-container'>
                <img 
                    alt='The Garden of Earthly Delights by Hieronymus Bosch'
                    className='painting-itself'
                    src={ThePainting} 
                />
            </div>
        </div>
    );
}

export default Garden;