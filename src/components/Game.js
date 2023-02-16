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
            found: false,
            src: Ballhead
        },
        {
            name: 'bosch himself',
            found: false,
            src: Bosch
        },
        {
            name: 'drummer',
            found: false,
            src: Drummer
        },
        {
            name: 'reading creature',
            found: false,
            src: Reader
        },
        {
            name: 'stabbed hand',
            found: false,
            src: StabbedHand
        }
    ]);

    const [startTime, setStartTime] = useState();

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
}