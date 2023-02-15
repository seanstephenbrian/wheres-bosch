import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

import Garden from '../components/Garden';
import TimeDisplay from './TimeDisplay';

export default function Game() {

    // state:
    const [items, setItems] = useState([
        {
            name: 'item 1',
            found: false
        },
        {
            name: 'item 2',
            found: false
        },
        {
            name: 'item 3',
            found: false
        },
        {
            name: 'item 4',
            found: false
        },
        {
            name: 'item 5',
            found: false
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