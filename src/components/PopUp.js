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
                            return (
                                <div className='option-text' key={`choice-${index}`}>
                                    {item.name}
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
        );
    } else {
        return;
    }   
}