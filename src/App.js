import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Navigation } from './components';
import { Home, Properties, Agents, News, NewsDetail, Sign } from './routes';
import Auth from "./hoc/auth";

function App() {
  
  return (
    <BrowserRouter>
      <Navigation />
    
      <Switch>
        <Route exact path="/" component={Auth(Home, null)} />
        <Route path="/properties" component={Auth(Properties, null)} />
        <Route path="/agents" component={Auth(Agents, null)} />
        <Route exact path="/news" component={Auth(News, null)} />
        <Route path="/news/:title" component={Auth(NewsDetail, null)} />
        <Route path="/signin" component={Auth(Sign, false)} />
        <Route path="/register" component={Auth(Sign, false)} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
