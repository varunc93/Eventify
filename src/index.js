import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import App from './app/layout/App';
import registerServiceWorker from './registerServiceWorker';


const root = document.querySelector('#root');

let render = () => {
    ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    root);
}

if(module.hot){
    module.hot.accept('./app/layout/App',() => {
        setTimeout(render);
    })
}
render();

registerServiceWorker();
