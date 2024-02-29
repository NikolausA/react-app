import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Game } from './components/game/Game';
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Game store={store} />
	</React.StrictMode>,
);
