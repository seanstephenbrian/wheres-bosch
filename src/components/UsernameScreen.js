import React from 'react';

import '../styles/username-screen.scss';

export default function UsernameScreen(props) {
    const { 
        startGame,
        updateUsername,
        username 
    } = props;

    return (
        <div className='username-screen'>
            <div className='instructions'>
                Please enter your name to begin:
            </div>
            <input
                onChange={updateUsername} 
                placeholder='Enter your name here.'
                type='text'
                value={username}
            >
            </input>
            <div 
                className='start-game-button'
                onClick={startGame}
            >
                Start Game
            </div>
        </div>
    )
}