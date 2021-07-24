import './App.scss';

import React, {useState} from 'react'
import {Main} from "./pages/Main/Main";
import { Sidebar } from "./components/Sidebar";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const App = () => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(
    window.innerWidth > 1100 ? true : false
  );
  return (
    <>
      <BrowserRouter>
          <div className="body">
              <Sidebar sidebarIsOpen={sidebarIsOpen} toggleOpen={setSidebarIsOpen} />
              <Switch>
                  <Route path={'/'} exact component={Main}/>
              </Switch>
          </div>
      </BrowserRouter>
    </>   
  )
}

export default App;
