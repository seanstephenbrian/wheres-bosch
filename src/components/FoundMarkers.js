import React, { useEffect, useState } from 'react';
import { db as firebaseData, getLocations } from '../firebase';

import '../styles/found-markers.scss';

export default function FoundMarkers(props) {
    // props:
    const { gameState } = props;

    // state:
    const [itemLocations, setItemLocations] = useState([]);

    // hooks:

    // on initial component mount:
    useEffect(() => {
        // retrieve item locations from firebase:
        getLocations(firebaseData)
            // then save item objects with name, location, and found status fields
            // to the itemLocations array:
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
                setItemLocations(locationData);
            });
    }, []);

    // whenever gameState changes:
    useEffect(() => {
        const updatedItemLocations = itemLocations.map((itemLocation) => {
            // only update not-found items:
            if (!itemLocation.found) {
                let updatedItem;
                gameState.forEach(gameItem => {
                    if (itemLocation.name === gameItem.name) {
                        updatedItem = {
                            name: itemLocation.name,
                            location: itemLocation.location,
                            found: gameItem.found // <-- use current found status from Game state 
                        }
                    }
                });
                return updatedItem;
            // if item is already marked as found, keep it as is:
            } else if (itemLocation.found) {
                return itemLocation;
            }
        });
        setItemLocations(updatedItemLocations);
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
            {itemLocations.map((itemLocation) => {
                return (
                    <div>
                        {itemLocation.name}, {itemLocation.found ? 'true' : 'false'}
                    </div>
                )
            })}
        </div>
    )
}