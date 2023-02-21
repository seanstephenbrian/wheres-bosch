import React from 'react';
import ReactDOM from 'react-dom/client';

import UAParser from 'ua-parser-js';

import Game from './components/Game';
import MobileWarning from './components/MobileWarning';

import './styles/index.scss';

let parser = new UAParser(); // you need to pass the user-agent for nodejs
let device = parser.getResult().device.type;

const root = ReactDOM.createRoot(document.getElementById('root'));

if (device === 'console' ||
    device === 'embedded' ||
    device === 'mobile'||
    device === 'smarttv' ||
    device === 'tablet' ||
    device === 'wearable') {
    root.render(
        <React.StrictMode>
            <MobileWarning />
        </React.StrictMode>
    )
} else {
    root.render(
        <React.StrictMode>
          <Game />
        </React.StrictMode>
      );
}