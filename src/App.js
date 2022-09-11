
import './App.css';
import { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SignUp from './Components/User/Signup';
import  Login  from './Components/User/Login';
import BookSlot from './Components/BookSlots/BookSlots';
import Admin from './Components/Admin/Admin';
import AdminHeader from './Components/AdminHeader';
import PendingList from './Components/PendingList';
import RegistrationForm from './Components/User/RegistrationForm';
import ApprovedList from './Components/ApprovedList';
import Dashboard from './Components/User/Dashboard';
import NewapplicantList from './Components/NewapplicantList';
import UserHome from './Components/User/UserHome';
import AdminLogin from './Components/Admin/AdminLogin';
import firebase from './firebase/config'
import {AuthContext} from './store/UserContext';


function App() {


  const {setUser}= useContext(AuthContext);
  // const {firebase} = useContext(FirebaseContext)
  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user)=>{
      setUser(user)
      console.log("authentication",user)
    })

  })
 



  return (
    <Router>
    <Routes>

    
      
    <Route exact path="/" element={<RegistrationForm/>}>
       
       </Route>
    
       
        <Route exact path="/login" element={<Login/>}>
       
        </Route>
        
        {/* <Route exact path="/userhome" element={<UserHome />}>
       
        </Route> */}
    
    
     
        <Route exact path="/signup" element={<SignUp />}>
       
        </Route>
    
    
{/*         
        <Route exact path="/admin" element={<Admin/>}>
       
        </Route> */}
        
        <Route exact path="/adminh" element={<AdminHeader/>}>
       
       </Route>
    
    
        <Route exact path="/slots" element={<BookSlot/>}>
       
        </Route>

        <Route exact path="/admin" element={<NewapplicantList/>}>
       
        </Route>




        <Route exact path="/pending" element={<PendingList/>}>
       
       </Route>

       <Route exact path="/form" element={<RegistrationForm/>}>
       
       </Route>
   
       <Route exact path="/approved" element={<ApprovedList/>}>
       
       </Route>


       <Route exact path="/userhome" element={<UserHome/>}>
       
       </Route>

       <Route exact path="/user" element={<Dashboard/>}>
       
       </Route>
    
        <Route exact path="/adminlogin" element={<AdminLogin/>}> 
    
       
        </Route> 
    
    
    
    
        </Routes>
    </Router>
    
  );
}

export default App;
