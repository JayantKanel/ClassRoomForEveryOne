import React from "react";
import Choice from "./Componennt/choice/choice";
import StudentSignup from "./Componennt/student/studentsignup";
import TeacherSignup from "./Componennt/teacher/teachersignup";
import StudentLogin from "./Componennt/student/studentlogin";
import TeacherLogin from "./Componennt/teacher/teacherlogin";
import Teacher from './Componennt/teacher/teacher';
import Student from './Componennt/student/student';
import Dashboard from "./Componennt/Classs/classdetail";
import CreateClass from "./Componennt/Classs/createclass";
import StudentClassDetail from "./Componennt/student/studentclassdetail";
import Assignme from "./assign/assignment";
import AssignmentDetails from "./assign/assignmentdetails";
import StudentAssignmentDetails from "./Componennt/student/studentassignment";
import { BrowserRouter as Router, Route,Redirect } from 'react-router-dom';
export default function App() {
  return (
    <>
    <Router basename={process.env.PUBLIC_URL}>
    <Route exact path='/'>
         <Redirect to='/home'/>
       </Route>
        <Route path="/home"  component={Choice}/>
        <Route path="/studentsignup" exact = {true} component={StudentSignup}/> 
        <Route path="/dashboard" exact = {true} component={Dashboard}/>
        <Route path="/teachersignup" exact = {true} component={TeacherSignup}/> 
        <Route path='/studentlogin' exact={true} component={StudentLogin}/>
        <Route path='/teacherlogin' exact={true} component={TeacherLogin}/>
        <Route path='/teacherdashboard' exact = {true} component={Teacher}/>
        <Route path='/studentdashboard' exact = {true} component={Student}/>
        <Route path='/studentdashboard/:id' component={StudentClassDetail}/>
        <Route path='/teacherdashboard/:id' component={Dashboard}/>
        <Route path='/class/createassignment/:id'exact = {true} component={Assignme}/>
        <Route path='/class/assignment/:id'exact = {true} component={AssignmentDetails}/>
        <Route path='/student/assigndetail/:id' exact={true} component={StudentAssignmentDetails} />
        <Route path='/createclass' component={CreateClass}/>
      </Router>
    </>
  );
}
