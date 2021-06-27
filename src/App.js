import Navbar from './Navbar';
import Home from './Home';
import History from './History';
import Create from './Create';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MailDetails from './MailDetails';
import HistoryDetails from './HistoryDetails';
import NotFound from './NotFound';
function App() {
  // fetch("/mails").then(res=>res.json()).then(d=> console.log(d));
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route exact path="/history">
              <History/>
            </Route>
            <Route path="/create">
              <Create/>
            </Route>
            <Route exact path="/history/:id">
              <HistoryDetails/>
            </Route>
            <Route path="/mails/:id">
              <MailDetails/>
            </Route>
            <Route path="*">
              <NotFound/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
