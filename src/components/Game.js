import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { collection, getDocs } from "firebase/firestore/lite";
import { db as firebaseData } from '../firebase';

import Garden from '../components/Garden';
import Legend from '../components/Legend';
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
            name: 'stabbed hand',
            found: false,
            src: StabbedHand
        }
    ]);

    // this object will live on the DB:
    const [itemLocations, setItemLocations] = useState([
        {
            name: 'ballhead',
            location: [0.461, 0.447]
        },
        {
            name: 'bosch himself',
            location: [0.907, 0.373]
        },
        {
            name: 'drummer',
            location: [0.886, 0.696] // add a little extra to acceptable x & y
        },
        {
            name: 'reading creature',
            location: [0.215, 0.922]
        },
        {
            name: 'stabbed hand',
            location: [0.850, 0.871]
        }
    ]);

    const [startTime, setStartTime] = useState();

    // hooks:
    useEffect(() => {
        getLocations(firebaseData);
    }, []);

    // methods:
    async function getLocations(db) {
        const data = collection(db, 'data');
        const snapshot = await getDocs(data);
        const locations = snapshot.docs.map(doc => doc.data());
        return locations;
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

    return (
        <>
            <TimeDisplay
                startTime={startTime} 
            />
            <Garden
                alertLoaded={startTimer}
                items={items}
                relayItemFind={updateFoundStatus}
            />
            <Legend 
                items={items}
            />
        </>
    )
}