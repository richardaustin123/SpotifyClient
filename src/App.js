import logo from './logo.svg';
import './App.css';
import Artist from './components/Artist';
import Home from './components/Home';

import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';

import { Navbar, Container, Nav } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Container className=''>
        <Router>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand as={Link} to="/" className='fw-bold fs-2'>Spotifapp</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/artists">Artists</Nav.Link>
              <Nav.Link as={Link} to="/songs">Songs</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artists" element={<Artist />} />
          {/* <Route path="/songs" element={<Songs />} /> */}
        </Routes>
      </Router>
      </Container>
    </div>
  );
}

export default App;