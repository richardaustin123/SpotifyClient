import logo from './logo.svg';
import './App.css';
import Artist from './components/Artist';

function App() {
  return (
    <div className="App">
      <h1 className='text-center fw-bold'>Spotify App</h1>
      <Artist />
    </div>
  );
}

export default App;