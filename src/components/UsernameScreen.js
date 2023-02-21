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
            <div className='container'>
                <div className='instructions'>
                    Please enter your name:
                </div>
                <input
                    className='name-input'
                    onChange={updateUsername} 
                    placeholder='Enter your name here'
                    type='text'
                    value={username}
                >
                </input>
                <div 
                    className='save-name-button'
                    onClick={startGame}
                >
                    START
                </div>
            </div>
        </div>
    )
}