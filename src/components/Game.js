import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { db as firebaseData, getTimes, recordTime } from '../firebase';

import FoundMarkers from '../components/FoundMarkers';
import Garden from '../components/Garden';
import Legend from '../components/Legend';
import TimeDisplay from './TimeDisplay';
import WelcomeScreen from './WelcomeScreen';
import WinScreen from './WinScreen';

// item images:
import Ballhead from '../img/items/ballhead.png';
import Bosch from '../img/items/bosch.png';
import Drummer from '../img/items/drummer.png';
import Reader from '../img/items/reader.png';
import StabbedHand from '../img/items/hand.png';
import UsernameScreen from './UsernameScreen';

export default function Game() {

    // state:
    const [endTime, setEndTime] = useState();

    const [gameWon, setGameWon] = useState(false);

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

    const [onWelcomeScreen, setOnWelcomeScreen] = useState(true);

    const [onUsernameScreen, setOnUsernameScreen] = useState(false);

    const [startTime, setStartTime] = useState();

    const [username, setUsername] = useState();
    
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
    function getUsername() {
        setOnWelcomeScreen(false);
        setOnUsernameScreen(true);
    }

    function startGame() {
        setOnUsernameScreen(false);
    }

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

    // render conditions
    if (onWelcomeScreen) {
        return (
            <WelcomeScreen
                getUsername={getUsername}
            />
        )
    } else if (onUsernameScreen) {
        return (
            <UsernameScreen
                startGame={startGame}
                updateUsername={(e) => {
                    setUsername(e.target.value);
                }}
                username={username}
            />
        )
    } else if (!onWelcomeScreen && !onUsernameScreen && !endTime) {
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
    } else if (!onWelcomeScreen && !onUsernameScreen && endTime) {
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