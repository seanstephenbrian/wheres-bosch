import React, { useEffect, useState } from 'react';
import { db as firebaseData, getTimes } from '../firebase';

import '../styles/win-screen.scss';

import BoschPortrait from '../img/bosch-portrait.png';

export default function WinScreen() {

    const [allTimes, setAllTimes] = useState([]);

    // retrieve all times from firestore when component mounts:
    useEffect(() => {
        // wait 3 sec before requesting data to give firebase time to update:
        setTimeout(() => {
            getTimes(firebaseData)
            .then((retrievedTimes) => {
                // sort the retrieved times in increasing order:
                retrievedTimes.sort((a, b) => {
                    if (a.time < b.time) {
                        return -1;
                    }
                    if (a.time > b.time) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                // only show the top 10:
                retrievedTimes.splice(10);
                setAllTimes(retrievedTimes);
            });
        }, 3000);
    }, []);

    // methods:
    function formatTime(timeInMs) {
        if (timeInMs >= 60000) {
            const min = Math.trunc(timeInMs / 60000);
            const minRemainder = timeInMs % 60000;
            const sec = Math.trunc(minRemainder / 1000).toString().padStart(2, '0');
            return `${min}:${sec}`;
        }
        if (timeInMs < 60000) {
            const sec = Math.trunc(timeInMs / 1000).toString().padStart(2, '0');
            return `00:${sec}`;
        }
    }

    let allTimesContent;
    let introText;
    if (allTimes.length !== 0) {
        introText =
            <>
                You found everything!<br />
                See how your time ranks:
            </>;
        allTimesContent = 
            <div className='all-times'>
                <div className='time-entry'>
                    <div className='rank-label'>
                        RANK
                    </div>
                    <div className='name-label'>
                        NAME
                    </div>
                    <div className='time-label'>
                        TIME
                    </div>
                </div>
                {allTimes.map((entry, index) => {
                    return (
                        <div className='time-entry'>
                            <div className='rank'>
                                {index + 1}
                            </div>
                            <div className='name'>
                                {entry.name}
                            </div>
                            <div className='time'>
                                {formatTime(entry.time)}
                            </div>
                        </div>
                    ) 
                })}
            </div>;
    } else if (allTimes.length === 0) {
        introText = <> Loading... </>;
        allTimesContent = <></>;
    }

    return (
        <div className='win-screen'>
            <div className='win-bg'></div>
            <div className='win-details'>
                {introText}
            </div>
                {allTimesContent}
            <img
                alt='portrait of Hieronymus Bosch'
                className='bosch-portrait'
                src={BoschPortrait}
            />
        </div>
    )
}