import React, { useEffect, useState } from 'react';

import { DateTime } from 'luxon';

import '../styles/time-display.scss';

export default function TimeDisplay(props) {
    // props:
    const { startTime } = props;

    // state:
    const [currentTime, setCurrentTime] = useState(DateTime.now());

    // hooks:
    // on initial render, begin increment currentTime every second:
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(DateTime.now());
        }, 1000);
        return () => {
            clearInterval(timer);
        }
    }, []);

    // render conditions:
    let timeText;

    if ((currentTime - startTime) >= 60000) {
        timeText = 
            <span className='time-text'>
                {Math.floor((currentTime - startTime) / 60000)} minutes, {Math.trunc(((currentTime - startTime) % 60000) / 1000)} seconds
            </span>;
    } else if ((currentTime - startTime) < 60000) {
        timeText = 
            <span className='time-text'>
                {Math.trunc((currentTime - startTime) / 1000)} seconds
            </span>
    } else {
        timeText = <></>;
    }
    
    // render:
    return (
        <div className='time-display'>
            {timeText}
        </div>
    )
}