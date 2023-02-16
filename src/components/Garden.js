import React, { useEffect, useState } from 'react';

import ThePainting from '../img/garden.jpg';

import '../styles/garden.scss';
import PopUp from './PopUp';

function Garden(props) {

    // props:
    const {
        alertLoaded, 
        items,
        itemLocations,
        relayItemFind
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

    function handleClick(e) {
        // first determine if the user clicked on the pop-up circle or one of the choices:
        if (e.target.classList.contains('pop-up') || e.target.classList.contains('option') || e.target.classList.contains('option-image')) {
            return;
        }

        // then if they clicked on the painting, determine click validity...
        let clickValidity = false;
        itemLocations.forEach((itemLocation) => {

            // check x & y location of click against each item's saved location:
            if (Math.abs((e.pageX / document.body.scrollWidth) - itemLocation.location[0]) <= 0.008 && 
                Math.abs((e.pageY / document.body.scrollHeight) - itemLocation.location[1]) <= 0.008) {
                // set clickValidity to 'true' if click was within 100px of an item in both x & y directions:
                clickValidity = true;
            }
            return;
        });

        // if it was a good click, show the pop-up:
        if (clickValidity === true) {
            setPopUpProps({
                visible: true,
                x: e.pageX,
                y: e.pageY
            });
        } else {
            // otherwise hide the pop-up:
            setPopUpProps({ visible: false });
        }
    }

    // records mouse position to state:
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
                itemLocations={itemLocations}
                hidePopUp={() => setPopUpProps({visible: false})}
                relayItemFind={relayItemFind}
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