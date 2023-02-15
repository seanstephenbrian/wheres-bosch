import React, { useEffect, useState } from 'react';

import ThePainting from '../img/garden.jpg';

import '../styles/garden.scss';
import PopUp from './PopUp';

function Garden() {

    // state:
    const [cursorClass, setCursorClass] = useState('');
    const [mousePosition, setMousePosition] = useState({
        x: 0,
        y: 0
    });
    const [popUpProps, setPopUpProps] = useState({
        visible: false,
        x: 0,
        y: 0
    });
    const [remainingItems, setRemainingItems] = useState([
        'ITEM 1',
        'ITEM 2',
        'ITEM 3',
        'ITEM 4',
        'ITEM 5'
    ]);

    // hooks:
    // auto-scrolling effect:
    useEffect(() => {
        const scrollAmount = 20;
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

    // records mouse position to state:
    function handleClick(e) {
        // IF INVALID...
        
        // use e.target to determine if the user clicked on one of the choices! 
        console.log(e.target);
        // IF VALID...
        setPopUpProps({
            visible: true,
            x: e.pageX,
            y: e.pageY
        });
    }

    function handleMouseMove(e) {
        setMousePosition({
            x: e.clientX,
            y: e.clientY
        });
    }

    return (
        <div 
            className={`garden ${cursorClass}`}
            onClick={(e) => handleClick(e)}
            onMouseMove={(e) => handleMouseMove(e)}
        >
            <PopUp
                options={remainingItems}
                visible={popUpProps.visible}
                x={popUpProps.x}
                y={popUpProps.y}
            />
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