import './App.css'; 
import Navbar from './Components/Navbar';
import Sthome from './Components/studentComponents/Sthome';
import Schtest from './Components/teacherComponents/Schtest';
import Stlogin from './Components/studentComponents/Stlogin';
import Tclogin from './Components/teacherComponents/Tclogin';
import TcHome from './Components/teacherComponents/TcHome';
import Stsign from './Components/studentComponents/Stsign';

function App() {
  //Aptify is a temporary title
  return (
    <>
      <Navbar title='Aptify'/>
      <Stsign/>
    </>
  );
}

export default App;
