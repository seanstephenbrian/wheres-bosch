import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { db as firebaseData, getTimes, recordTime } from '../firebase';

import FoundMarkers from '../components/FoundMarkers';
import Garden from '../components/Garden';
import Legend from '../components/Legend';
import TimeDisplay from './TimeDisplay';
import WinScreen from './WinScreen';

// item images:
import Ballhead from '../img/items/ballhead.png';
import Bosch from '../img/items/bosch.png';
import Drummer from '../img/items/drummer.png';
import Reader from '../img/items/reader.png';
import StabbedHand from '../img/items/hand.png';

export default function Game() {

    // state:
    const [endTime, setEndTime] = useState();

    const [gameWon, setGameWon] = useState(false);

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

    const [username, setUsername] = useState('sean');
    
    // hooks:
    // check for winning conditions:
    useEffect(() => {
        let foundCount = 0;
        items.forEach(item => {
            if (item.found) foundCount++;
        });
        if (foundCount === 5) {
            const now = DateTime.now();
            setEndTime(now);
            setGameWon(true);
        }
    }, [items]);

    // if an endTime is set, record user's time in firebase db:
    useEffect(() => {
        const userTime = endTime - startTime;
        if (!isNaN(userTime)) recordTime(firebaseData, userTime, username);
    }, [endTime, startTime, username]);

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
                    endTime={false}
                    gameWon={gameWon}
                    startTime={startTime}
                />
                <Garden
                    alertLoaded={startTimer}
                    items={items}
                    relayItemFind={updateFoundStatus}
                />
                <FoundMarkers
                    gameState={items}
                />
                <Legend 
                    items={items}
                />
            </>
        )
    } else if (endTime) {
        return (
            <>
                <TimeDisplay
                    endTime={endTime}
                    gameWon={gameWon}
                    startTime={startTime}
                />
                <WinScreen />
            </>
        )
    }
}