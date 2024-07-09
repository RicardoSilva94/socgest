import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppHeader from './components/header/header';
import SociosLandingPage from './components/socios/socioslandingpage';
import Footer from './components/footer/footer';
import About from './components/about/about';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';





function App() {
  return (
    <Router>
    <div className="App">
      <header id="header">
      <AppHeader/>
      </header>
      <main>
      < SociosLandingPage />
      < About />
      </main>
      <footer> <Footer /> </footer>
    </div>
    </Router>
  );
}

export default App;
