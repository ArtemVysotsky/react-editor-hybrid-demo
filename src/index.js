import React from 'react';
import ReactDOM from 'react-dom/client';
import Post from './pages/Post/Editor.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
    document.getElementById('root')
);

root.render(
    <React.StrictMode><Post /></React.StrictMode>
);
