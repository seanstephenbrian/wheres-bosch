import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

import Garden from '../components/Garden';
import TimeDisplay from './TimeDisplay';

export default function Game() {

    // state:
    const [remainingItems, setRemainingItems] = useState([
        'ITEM 1',
        'ITEM 2',
        'ITEM 3',
        'ITEM 4',
        'ITEM 5'
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
                remainingItems={remainingItems}
            />
            <TimeDisplay
                startTime={startTime} 
            />
        </>
    )
}