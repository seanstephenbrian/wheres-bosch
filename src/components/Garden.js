import React, { useEffect, useState } from 'react';

import ThePainting from '../img/garden.jpg';

import '../styles/garden.scss';
import PopUp from './PopUp';

function Garden(props) {

    // props:
    const {
        alertLoaded, 
        items
    } = props;

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
    
    // hooks:
    // on initial render:
    useEffect(() => {

        // only start timer after image is fully loaded:
        const painting = document.querySelector('.painting-itself');
        
        async function loadImage(src, image) {
            return new Promise((resolve, reject) => {
                image.onload = () => resolve(image);
                image.onerror = reject;
                image.src = src;
            });
        }

        loadImage(ThePainting, painting).then(() => {
            alertLoaded();
        });

    }, []);

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

        // determine if the user clicked on the pop-up circle or one of the choices:
        if (e.target.classList.contains('pop-up') || e.target.classList.contains('option-text')) {
            return;
        }

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
                items={items}
                visible={popUpProps.visible}
                x={popUpProps.x}
                y={popUpProps.y}
            />
            <div className='painting-container'>
                <img 
                    alt='The Garden of Earthly Delights by Hieronymus Bosch'
                    className='painting-itself'
                />
            </div>
        </div>
    );
}

export default Garden;