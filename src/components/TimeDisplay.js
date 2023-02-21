import React, { useEffect, useRef, useState } from 'react';

import { DateTime } from 'luxon';

import '../styles/time-display.scss';

export default function TimeDisplay(props) {
    // props:
    const { endTime, gameWon, startTime } = props;

    // state:
    const [currentTime, setCurrentTime] = useState(DateTime.now());

    // hooks:
    // on initial render, begin to increment currentTime every second:
    const timerRef = useRef();
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(DateTime.now());
        }, 1000);
        timerRef.current = timer;
        return () => {
            clearInterval(timer);
        }
    }, []);

    // methods:
    function formatTime(timeInMs) {
        if (timeInMs < 1000) {
            return '0 SECONDS';
        } else if (timeInMs >= 1000 && timeInMs < 2000) {
            return '1 SECOND';
        } else if (timeInMs < 60000) {
            const sec = Math.trunc(timeInMs / 1000);
            return `${sec} SECONDS`;
        } else if (timeInMs >= 60000) {
            const min = Math.trunc(timeInMs / 60000);
            const minRemainder = timeInMs % 60000;
            const sec = Math.trunc(minRemainder / 1000);
            return `${min} MINUTES, ${sec} SECONDS`;
        }
    }      

    // render conditions:
    let timeText;

    // render conditions for active games:
    if (!gameWon) {
        timeText = formatTime(currentTime - startTime);
    }
    
    // render conditions for won games:
    if (gameWon) {
        // when the game is over, clear the interval:
        const timer = timerRef.current;
        clearInterval(timer);
        timeText = formatTime(endTime - startTime);
    }
    
    // render:
    if (startTime) {
        // don't show the timer at all if game is over but game screen is still fading out:
        if (gameWon && !endTime) {
            return;
        } else {
            return (
                <div className='time-display'>
                    <span className='time-text'>
                        {timeText}
                    </span>
                </div>
            )
        }
    }
}