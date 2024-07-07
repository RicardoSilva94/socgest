import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppHeader from './components/header/header';
import SociosLandingPage from './components/socios/socioslandingpage';
import Footer from './components/footer/footer';
import About from './components/about/about';




function App() {
  return (
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
  );
}

export default App;
