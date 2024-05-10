import React from 'react'
import {BrowserRouter , Routes, Route} from 'react-router-dom'

//pages and components

//import Navbar from './components/navbar'
import Reservation from './pages/reservation'
import RoomRes from './pages/reservationPages/roomRes'
import EventRes from './pages/reservationPages/eventRes'
import PackageRes from './pages/reservationPages/packageRes'
import ViewRes from './pages/reservationPages/viewRes'
import ReservedRooms from './pages/reservationPages/reservedRooms'
import ReservedEvents from './pages/reservationPages/reservedEvents'
import ReservedPackages from './pages/reservationPages/reservedPackages'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        
        <div className='pages'>
          <Routes>
            
            
            <Route index  element={<Reservation />}  />
            <Route path="/reservationPages/roomRes" element={<RoomRes />}  />
            <Route path="/reservationPages/eventRes" element={<EventRes />}  />
            <Route path="/reservationPages/packageRes" element={<PackageRes />}  />
            <Route path="/reservationPages/viewRes" element={<ViewRes />}  />
            <Route path="/reservationPages/viewRes/reservedRooms" element={<ReservedRooms />}  />
            <Route path="/reservationPages/viewRes/reservedEvents" element={<ReservedEvents />}  />
            <Route path="/reservationPages/viewRes/reservedPackages" element={<ReservedPackages />}  />
            
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
