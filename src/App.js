import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Map } from "./Map";
import { InfoPage } from "./InfoPage";

import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Map}/>
            <Route exact path="/InfoPage" component={InfoPage}/>
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
