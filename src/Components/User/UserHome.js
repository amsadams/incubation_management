import { Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../Layouts/Header'
import { AuthContext } from '../../store/UserContext'
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../firebase/config'

 function UserHome() {

  const {user}= useContext(AuthContext);

const [slotnum,setSlotnum] = useState(); 

    const navigate =useNavigate();




const getemail=async ()=>{



const docRef = collection(db, "approvedlist");


const q = query(docRef, where("email", "==", user?.email ))

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data().reserved);
    setSlotnum(doc.data().reserved)
  });

}


    useEffect(() => {
        const token = localStorage.getItem('usertoken');
       
     
        // console.log("user email.........", user.email);

        if (!token) {
            navigate('/login')
        }

        getemail();

    },[])
  return (
<>
    <Header/>
    <Typography
              variant="6"
              padding={30}
              textAlign="center"
              sx={{ color: "silver", marginTop: 100 , marginLeft:80 }}
            >
            
            Id:  <span style={{ color: "orange", marginLeft: 20 , }}> 
             {user?.email} 
            </span>

</Typography>



    <Typography
              variant="h2"
              padding={30}
              textAlign="center"
              sx={{ color: "silver", marginLeft: 20 }}
            >
            
    Status :{ (slotnum!=0) ? <span style={{ color: "orange", marginLeft: 20 }}> Approved!! 
    
    Slot: {slotnum}  </span>  : <span> Pending!!! </span> }

</Typography>

</>
  )
}

export default UserHome