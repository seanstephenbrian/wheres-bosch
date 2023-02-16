import React from 'react';

import '../styles/win-screen.scss';

import BoschPortrait from '../img/bosch-portrait.png';

export default function WinScreen() {
    return (
        <div className='win-screen'>
            <div className='win-bg'></div>
            you won!
            <img
                alt='portrait of Hieronymus Bosch'
                className='bosch-portrait'
                src={BoschPortrait}
            />
        </div>
    )
}