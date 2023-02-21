import React from 'react';

import '../styles/mobile-warning.scss';

export default function MobileWarning() {
    return (
        <div className='mobile-warning'>
            <div className='warning-text'>
                <div className='text-section sorry'>
                    WE'RE SORRY
                </div>
                <div className='text-section'>
                    'Where's Bosch?' is only available on desktop browsers.
                </div>
                <div className='text-section'>
                    Please try again on your laptop or PC.
                </div>
                <div className='text-section'>
                    Thank you!
                </div>
            </div>
        </div>
    )
}