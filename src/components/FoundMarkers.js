import React, { useEffect, useState } from 'react';
import { db as firebaseData, getLocations } from '../firebase';

import '../styles/found-markers.scss';

export default function FoundMarkers(props) {
    // props:
    const { gameState } = props;

    // state:
    const [items, setItems] = useState([]);

    // hooks:

    // on initial component mount:
    useEffect(() => {
        // retrieve item locations from firebase:
        getLocations(firebaseData)
            // then save item objects with name, location, and found status fields
            // to the items array:
            .then((locations) => {
                let locationData = [];
                for (const location in locations) {
                    const itemName = location;
                    const coords = locations[location];
                    const foundStatus = getFoundStatus(itemName);
                    locationData.push({
                        name: itemName,
                        location: coords,
                        found: foundStatus
                    });
                }
                setItems(locationData);
            });
    }, []);

    // whenever gameState changes:
    useEffect(() => {
        const updatedItems = items.map((item) => {
            // only update not-found items:
            if (!item.found) {
                let updatedItem;
                gameState.forEach(gameItem => {
                    if (item.name === gameItem.name) {
                        updatedItem = {
                            name: item.name,
                            location: item.location,
                            found: gameItem.found // <-- use current found status from Game state 
                        }
                    }
                });
                return updatedItem;
            // if item is already marked as found, keep it as is:
            } else if (item.found) {
                return item;
            }
        });
        setItems(updatedItems);
    }, [gameState]);

    // methods:
    function getFoundStatus(itemName) {
        let foundStatus;
        gameState.forEach(gameItem => {
            if (gameItem.name === itemName) {
                foundStatus = gameItem.found;
            }
        });
        return foundStatus;
    }

    return (
        <div className='found-markers'>
            {items.map((item, index) => {
                if (item.found) {
                    const xShift = item.location[0] * document.body.scrollWidth;
                    const yShift = item.location[1] * document.body.scrollHeight;
                    return (
                        <div 
                            className='found-marker'
                            key={index}
                            style={{
                                left: xShift,
                                top: yShift
                            }}
                        >
                        </div>
                    )
                }
            })}
        </div>
    )
}