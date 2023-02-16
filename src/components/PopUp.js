import React, { useEffect, useState } from 'react';
import { db as firebaseData, getLocations } from '../firebase';

import '../styles/popup.scss';

export default function PopUp(props) {

    // props:
    const { 
        hidePopUp,
        items,
        relayItemFind,
        visible, 
        x, 
        y } = props;


    // methods:
    function checkIfFound(itemName) {
        getLocations(firebaseData)
            .then((locations) => {
                // first get the actual location of the item the user clicked on:
                let actualLocation;
                for (const location in locations) {
                    if (location === itemName) {
                        actualLocation = locations[location];
                    }
                }
                // then if that item is located within the range of the pop-up window,
                // mark the item as 'found' and relay that info up to Game state:
                if (Math.abs((x / document.body.scrollWidth) - actualLocation[0]) <= 0.008 && 
                    Math.abs((y / document.body.scrollHeight) - actualLocation[1]) <= 0.008) {
                    relayItemFind(itemName);
                    hidePopUp();
                }
            });
    }

    // render conditions:
    if (visible) {
        return (
            <div 
                className='pop-up'
                style={{
                    cursor: 'default',
                    left: x,
                    top: y
                }}
            >
                <div className='choices'>
                    {items.map((item, index) => {
                        if (!item.found) {
                            return (
                                <div
                                    className='option'
                                    key={`choice-${index}`}
                                    onClick={() => checkIfFound(item.name)}
                                >
                                    <img
                                        alt={item.name}
                                        className='option-image'
                                        src={item.src}
                                    />
                                </div>
                            ) 
                        }
                    })}
                </div>
            </div>
        );
    } else return;
}