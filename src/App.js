import { BrowserRouter, Route, Switch } from "react-router-dom";

import { newpage } from "./newpage";
import { Map } from "./Map";
import { LandingPage } from "./LandingPage";

import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
          <Switch>
            <Route exact path="/newpage" component={newpage}/>
            <Route exact path="/" component={Map}/>
            <Route exact path="/LandingPage" component={LandingPage}/>
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;