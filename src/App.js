
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//components
import Navbar from './components/navbar';
import Home from './pages/home'
import About from './pages/about'
import Article from './pages/article'
import ArticleList from './pages/article/list'
import NotFound from './pages/other/404'

function App() {
  return (
  <Router>
  <Navbar />
   <div className="max-w-screen-md mx-auto pt-20">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/articles" component={Article} />
        <Route exact path="/articles-list" component={ArticleList} />
        <Route component={NotFound} />
      </Switch>
      
   </div>
  </Router> 
  );
}

export default App;
