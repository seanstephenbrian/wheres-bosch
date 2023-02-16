import React from 'react';

import '../styles/legend.scss';

export default function Legend(props) {
    // props:
    const { items } = props;

    return (
        <div className='legend'>
            <div className='legend-title'>
                REMAINING ITEMS:
            </div>
            <div className='legend-images'>
                {items.map((item, index) => {
                    if (item.found) {
                        return;
                    } else if (!item.found) {
                        return (
                            <div className='legend-image' key={index}>
                                <img
                                    alt={item.name}
                                    src={item.src} 
                                />
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    )
}