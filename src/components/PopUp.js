import React, { useEffect, useState } from 'react';

import '../styles/popup.scss';

export default function PopUp(props) {

    // props:
    const { 
        hidePopUp,
        items,
        itemLocations,
        relayItemFind,
        visible, 
        x, 
        y } = props;


    // methods:
    function checkIfFound(itemName) {
        const actualLocation = itemLocations.filter(itemLocation => itemLocation.name === itemName)[0];
        if (Math.abs(actualLocation.location[0] - x) < 100 && Math.abs(actualLocation.location[1] - y) < 100) {
            relayItemFind(itemName);
            hidePopUp();
        }
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
    } else {
        return;
    }   
}