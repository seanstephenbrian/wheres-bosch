import React, { useEffect, useState } from 'react';

import '../styles/popup.scss';

export default function PopUp(props) {

    // props:
    const { 
        items,
        visible, 
        x, 
        y } = props;

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
                            if (item.src) {
                                return (
                                    <img
                                        alt={item.name}
                                        className='option option-image'
                                        key={`choice-${index}`}
                                        src={item.src}
                                    />
                                )
                            } else {
                                return (
                                    <div className='option option-text' key={`choice-${index}`}>
                                        {item.name}
                                    </div>
                                );
                            }
                            
                        }
                    })}
                </div>
            </div>
        );
    } else {
        return;
    }   
}