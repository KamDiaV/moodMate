import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';


function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
      </main>
      <Footer />
    </div>
  );
}

export default App;
