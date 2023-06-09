import React from 'react';
import ReactDOM from 'react-dom/client';
import { Switch, Route, BrowserRouter, Redirect} from "react-router-dom";
import './index.css';
import Map from './pages/webgis'
import Geoportal from './pages/geoportal';
import { Login } from './pages/login/login';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter basename='/'>
      <Switch>
        <Route exact path="/">
          <Redirect to="/geoportal"/>
        </Route>
        <Route path="/geoportal">
          <Geoportal/>
        </Route>
        <Route path="/map">
          <Map />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
