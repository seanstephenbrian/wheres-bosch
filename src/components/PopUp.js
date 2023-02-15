import React, { useEffect, useState } from 'react';

import '../styles/popup.scss';

export default function PopUp(props) {

    // props:
    const { 
        options,
        visible, 
        x, 
        y } = props;

    if (visible) {
        return (
            <div 
                className='pop-up'
                style={{
                    left: x,
                    top: y
                }}
            >
                <div className='choices'>
                    {options.map(option => {
                        return (
                            <div className='option-text'>
                                {option}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    } else {
        return;
    }   
}