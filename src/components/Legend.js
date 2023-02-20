import React, { useEffect, useState } from 'react';

import '../styles/legend.scss';

export default function Legend(props) {

    // props:
    const { items } = props;

    // state:
    const [allFound, setAllFound] = useState(false);

    // check if all are found whenever items array changes:
    useEffect(() => {
        let foundCount = 0;
        items.forEach(item => {
            if (item.found) foundCount++;
        });
        if (foundCount === items.length) {
            setAllFound(true);
        }
    }, [items]);

    if (allFound) {
        return;
    } else if (!allFound) {
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
}