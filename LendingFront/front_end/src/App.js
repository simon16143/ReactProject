import React from 'react'; //Import React library
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom' //Browser settings
import {About} from './components/About' //About location
import {Users} from './components/Users' //Users location
import {Navbar} from './components/Navbar' //Navbar location
import {Home} from './components/Home' //Home location


//Main function(render application)
function App() {
  //RoutesComponents
  return (
    <Router>
      <Navbar  />
      <div className="container p-4">
      
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />  
            <Route path="/users" component={Users} />  
       
        
      </div>
    </Router>
  );
}

export default App;
