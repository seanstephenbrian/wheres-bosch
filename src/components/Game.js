import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

import Garden from '../components/Garden';
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
            name: 'stabbed-hand',
            found: false,
            src: StabbedHand
        }
    ]);

    // this object will live on the DB:
    const [itemLocations, setItemLocations] = useState([
        {
            name: 'ballhead',
            location: [4890, 2645]
        },
        {
            name: 'bosch himself',
            location: [9624, 2211]
        },
        {
            name: 'drummer',
            location: [9393, 4115] // add a little extra to acceptable x & y
        },
        {
            name: 'reading creature',
            location: [2263, 5457]
        },
        {
            name: 'stabbed-hand',
            location: [9024, 5132]
        }
    ]);

    const [startTime, setStartTime] = useState();

    // methods:
    function startTimer() {
        const now = DateTime.now();
        setStartTime(now);
    }

    return (
        <>
            <Garden
                alertLoaded={startTimer}
                items={items}
            />
            <TimeDisplay
                startTime={startTime} 
            />
        </>
    )
}