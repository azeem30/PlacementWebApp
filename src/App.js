import './App.css'; 
import Navbar from './Components/Navbar';
import Sthome from './Components/studentComponents/Sthome';
import Stlogin from './Components/studentComponents/Stlogin';
import Tclogin from './Components/teacherComponents/Tclogin';
import TcHome from './Components/teacherComponents/TcHome';

function App() {
  //Aptify is a temporary title
  return (
    <>
      <Navbar title='Aptify'/>
      <Sthome/>
    </>
  );
}

export default App;
