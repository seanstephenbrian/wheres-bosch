import React from 'react';
import ReactDOM from 'react-dom/client';
import Garden from './components/Garden';

import './styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Garden />
  </React.StrictMode>
);