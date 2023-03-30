import React from 'react';
import ReactDOM from 'react-dom/client';
import { Switch, Route, BrowserRouter} from "react-router-dom";
import './index.css';
import Map from './modules/map'
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter basename='/map'>
      <Switch>
        <Route path="/">
          <Map />
        </Route>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
