import React, { useEffect, useState } from 'react';

import GridSquare from './GridSquare';

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
        if ((mousePosition.x / window.innerWidth) > 0.85) {
            window.scrollBy(scrollAmount, 0);
            setCursorClass('right-arrow');
        // scroll down:
        } else if ((mousePosition.y / window.innerHeight) > 0.85) {
            window.scrollBy(0, scrollAmount);
            setCursorClass('down-arrow');
        // scroll left:
        } else if ((mousePosition.x / window.innerWidth) < 0.15) {
            window.scrollBy(-1*scrollAmount, 0);
            setCursorClass('left-arrow');
        // scroll up:
        } else if ((mousePosition.y / window.innerHeight) < 0.15) {
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

    function showPopUp(e) {
        const clickedSquare = e.target;
        clickedSquare.classList.add('clicked-square');
    }

    // the click grid will contain 5000 squares (50 squares in the y direction, 100 in the x)
    let gridSquares = [];
    for (let i = 0; i < 5000; i++) {
        gridSquares.push(
            <GridSquare 
                handleSquareClick={(e) => showPopUp(e)}
                id={`square-${i}`}
                key={i}
            />
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