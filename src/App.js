import './App.css'; 
import Navbar from './Components/commonComponents/Navbar';
import Sthome from './Components/studentComponents/Sthome';
import Schtest from './Components/teacherComponents/Schtest';
import Stlogin from './Components/studentComponents/Stlogin';
import Tclogin from './Components/teacherComponents/Tclogin';
import TcHome from './Components/teacherComponents/TcHome';
import Stsign from './Components/studentComponents/Stsign';
import Tcsign from './Components/teacherComponents/Tcsign';
import Tests from './Components/studentComponents/Tests';
import Choice from './Components/commonComponents/Choice';
import Teacher_results from './Components/teacherComponents/teacher_result';
import { Routes, Route } from 'react-router-dom';
import Questions from './Components/studentComponents/Questions';
import CheckStudentResults from './Components/studentComponents/CheckStudentResults';

function App() {
  //Aptify is a temporary title
  return (
    <>  
    <Navbar title="Aptify"/>
    <Routes>
      <Route exact path="/" Component={Choice}/> 
      <Route exact path="/student_signup" Component={Stsign}/>
      <Route exact path="/teacher_signup" Component={Tcsign}/>
      <Route exact path="/student_login" Component={Stlogin}/>
      <Route exact path="/teacher_login" Component={Tclogin}/>
      <Route exact path="/student_home" Component={Sthome}/>
      <Route exact path="/teacher_home" Component={TcHome}/>
      <Route exact path='/schedule_test' Component={Schtest}/>
      <Route exact path='/pending_tests' Component={Tests}/>
      <Route exact path='/question_and_answer' Component={Questions}/>
      <Route exact path='/student_results' Component={CheckStudentResults}/>
      <Route exact path='/teacher_results' Component={Teacher_results}/>
    </Routes>
    </>
  );
}

export default App;
