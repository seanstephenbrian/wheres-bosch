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
            found: true,
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

    const [onWelcomeScreen, setOnWelcomeScreen] = useState(true);

    const [onUsernameScreen, setOnUsernameScreen] = useState(false);

    const [startButtonStatus, setStartButtonStatus] = useState('initializing');

    const [startTime, setStartTime] = useState();

    const [username, setUsername] = useState('');
    
    // hooks:
    // check for winning conditions:
    useEffect(() => {
        let foundCount = 0;
        items.forEach(item => {
            if (item.found) foundCount++;
        });
        if (foundCount === 5) {
            const endTime = DateTime.now();
            setGameWon(true);

            const garden = document.querySelector('.garden');
            garden.classList.add('faster-fade-out');
            const foundMarkers = document.querySelector('.found-markers');
            foundMarkers.classList.add('faster-fade-out');

            setTimeout(() => {
                setEndTime(endTime);
            }, 3000);
        }
    }, [items]);

    // if an endTime is set, record user's time in firebase db:
    useEffect(() => {
        const userTime = endTime - startTime;
        if (!isNaN(userTime)) recordTime(firebaseData, userTime, username);
    }, [endTime, startTime, username]);

    // disable scrolling if start button is shown:
    useEffect(() => {
        const body = document.querySelector('body');
        const html = document.querySelector('html');

        if (startButtonStatus === 'active') {
            body.style.overflow = 'hidden';
            html.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'initial';
            html.style.overflow = 'initial';
        }
    }, [startButtonStatus]);

    // methods:
    function getUsername() {
        setOnWelcomeScreen(false);
        setOnUsernameScreen(true);
    }

    function startGame() {
        const usernameScreen = document.querySelector('.username-screen');
        usernameScreen.classList.add('faster-fade-out');
        setTimeout(() => {
            setOnUsernameScreen(false);
        }, 3000);
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
    // render conditions for active game:
    } else if (!endTime) {
        return (
            <>
                {/* show the Garden image and the Legend no matter what: */}
                <Garden
                    setStartButton={(status) => setStartButtonStatus(status)}
                    items={items}
                    relayItemFind={updateFoundStatus}
                />
                <Legend 
                    items={items}
                />

                {/* show the Start Timer button if it is active: */}
                {startButtonStatus === 'active' ?
                    <div className='start-button-container'>
                        <div 
                            className='start-button' 
                            onClick={() => {
                                startTimer();
                                setStartButtonStatus('inactive');
                            }}
                        >
                            Click to Start the Timer
                        </div>
                    </div>
                : ''}

                {/* only display TimeDisplay and FoundMarkers after Start Timer button has been clicked: */}
                {startButtonStatus === 'inactive' ? <>

                    <TimeDisplay
                        endTime={false}
                        gameWon={gameWon}
                        startTime={startTime}
                    />
                    <FoundMarkers
                        gameState={items}
                    />

                </> : ''} 
            </>
        )
    // render condition for finished game:
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