import logo from './logo.svg';
import './App.css';
import Artist from './components/Artist';

import { Navbar, Container, Nav } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      {/* <h1 className='text-center fw-bold'>Spotify App</h1> */}
      <Navbar className='mb-2'>
        <Container>
          <Navbar.Brand className='fw-bold fs-2'>Spotifapp</Navbar.Brand>
          {/* <a href="#">Artists</a>
          <a href="#">Albums</a> */}
        </Container>
      </Navbar>
      <Artist />
    </div>
  );
}

export default App;