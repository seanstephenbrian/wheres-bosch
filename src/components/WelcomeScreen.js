import React from 'react';

import '../styles/welcome-screen.scss';

import LeftPanel from '../img/left-panel.jpg';
import RightPanel from '../img/right-panel.jpg';

export default function WelcomeScreen() {
    
    // methods:
    function startGame() {

    }

    return (
        <div className='welcome-screen'>
            <div className='panels'>
                <div className='panel left-panel open'>
                    <img
                        alt='left exterior panel of the Garden of Earthly Delights'
                        src={LeftPanel}
                    />
                </div>
                <div className='panel right-panel'>
                    <img
                        alt='right exterior panel of the Garden of Earthly Delights'
                        src={RightPanel}
                    />
                </div>
            </div>
            <div className='messages'>
                <div className='message message-1'>
                    There's much to discover in the Garden of Earthly Delights...
                </div>
                <div className='message message-2'>
                    We have prepared a set of 5 unique characters and items.
                </div>
                <div className='message message-3'>
                   Your goal is to find them as quickly as possible.
                </div>
                <div className='message message-4'>
                   Good luck!
                </div>
                <div 
                    className='message click-to-begin'
                    onClick={startGame}
                >
                   Click here to begin.
                </div>
            </div>
        </div>
    )
}