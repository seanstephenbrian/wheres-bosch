import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

import Garden from '../components/Garden';
import Legend from '../components/Legend';
import TimeDisplay from './TimeDisplay';

// item images:
import Ballhead from '../img/items/ballhead.png';
import Bosch from '../img/items/bosch.png';
import Drummer from '../img/items/drummer.png';
import Reader from '../img/items/reader.png';
import StabbedHand from '../img/items/hand.png';

export default function Game() {

    // state:
    const [items, setItems] = useState([
        {
            name: 'ballhead',
            found: true,
            src: Ballhead
        },
        {
            name: 'bosch himself',
            found: false,
            src: Bosch
        },
        {
            name: 'drummer',
            found: true,
            src: Drummer
        },
        {
            name: 'reading creature',
            found: true,
            src: Reader
        },
        {
            name: 'stabbed hand',
            found: true,
            src: StabbedHand
        }
    ]);

    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();

    // hooks:
    useEffect(() => {
        let foundCount = 0;
        items.forEach(item => {
            if (item.found) foundCount++;
        });
        if (foundCount === 5) {
            const now = DateTime.now();
            setEndTime(now);
        }
    }, [items]);

    // methods:
    function startTimer() {
        const now = DateTime.now();
        setStartTime(now);
    }

    function updateFoundStatus(itemName) {
        const updatedItems = items.map(item => {
            if (item.name === itemName) {
                return {
                    ...item,
                    found: true
                }
            } else {
                return item;
            }
        });
        setItems(updatedItems);
    }

    if (!endTime) {
        return (
            <>
                <TimeDisplay
                    startTime={startTime} 
                />
                <Garden
                    alertLoaded={startTimer}
                    items={items}
                    relayItemFind={updateFoundStatus}
                />
                <Legend 
                    items={items}
                />
            </>
        )
    } else if (endTime) {
        return (
            <div>
                {/* victory screen goes here */}
            </div>
        )
    }
    
}