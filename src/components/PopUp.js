import React, { useEffect, useState } from 'react';

import '../styles/popup.scss';

export default function PopUp(props) {
    // props:
    const { visible, x, y } = props;

    if (visible) {
        return (
            <div 
                className='pop-up'
                style={{
                    left: x,
                    top: y
                }}
            >
                pop-up
            </div>
        );
    } else {
        return;
    }   
}