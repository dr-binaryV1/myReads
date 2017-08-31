import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom';
import './index.css'

ReactDOM.render(
  <BrowserRouter>
    <App bookShelf={['currentlyReading', 'wantToRead', 'read']} />
  </BrowserRouter>
, document.getElementById('root'))
