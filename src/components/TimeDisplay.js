import React, { useEffect, useRef, useState } from 'react';

import { DateTime } from 'luxon';

import '../styles/time-display.scss';

export default function TimeDisplay(props) {
    // props:
    const { endTime, gameWon, startTime } = props;

    // state:
    const [currentTime, setCurrentTime] = useState(DateTime.now());

    // hooks:
    // on initial render, begin increment currentTime every second:
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

    // render conditions:
    let timeText;

    // render conditions for active games:
    if (!gameWon && (currentTime - startTime) >= 60000) {
        timeText = 
            <>{Math.floor((currentTime - startTime) / 60000)} minutes, {Math.trunc(((currentTime - startTime) % 60000) / 1000)} seconds </>;
    } else if (!gameWon && (currentTime - startTime) < 60000) {
        timeText = 
            <>{Math.trunc((currentTime - startTime) / 1000)} seconds</>
    }
    
    // if the game is over, clear the interval:
    if (gameWon) {
        const timer = timerRef.current;
        clearInterval(timer);
    }

    // render conditions for won games:
    if (gameWon && (endTime - startTime) >= 60000) {
        timeText = 
            <>{Math.floor((endTime - startTime) / 60000)} minutes, {Math.trunc(((endTime - startTime) % 60000) / 1000)} seconds </>;
    } else if (gameWon && (endTime - startTime) < 60000) {
        timeText = 
            <>{Math.trunc((endTime - startTime) / 1000)} seconds</>
    }
    
    // render:
    return (
        <div className='time-display'>
            <span className='time-text'>
                {timeText}
            </span>
        </div>
    )
}