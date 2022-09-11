import * as React from 'react';
import { useState } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/system';
import './BookSlots.css';
import Header from '../Layouts/Header';
import AdminHeader from '../AdminHeader';
import { Button } from '@mui/material';
import SlotModal from '../SlotModal';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { IdContext } from '../../store/Context';
import DropDown from '../DropDown';


import Tooltip from '@mui/material/Tooltip';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));






export default function BookSlots() {

  let value=false;
  let res;
  let i;



    const slots = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
      // const [details,setDetails]=React.useState([]);

      const {SlotId}=React.useContext(IdContext)
      const {setSlotId}=React.useContext(IdContext)
      
      
      
      
        const [openModal,setOpenModal] = useState(false);
        const [Id,setId]=useState();
        const [details,setDetails]=React.useState([]);
        const [slot,setSlot] = useState(); 
      
        const getAllUsers = async () => {
            const querrying = query(collection(db, "approvedlist"));
            const querySnapshot = await getDocs(querrying);
            const data = querySnapshot.docs.map((doc) => ({
              // doc.data() is never undefined for query doc snapshots
              ...doc.data(),
              id: doc.id,
            }));
        
            setDetails(data);
            console.log("consoled....................",data)
      
      
      
          };




          const getemail=async (id)=>{



            const docRef = collection(db, "approvedlist");
            
            
            const q = query(docRef, where("reserved", "==", id ))
            
              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data().reserved);
                setSlot(doc.data().email)
              });
            
            }
      
      
      // const reserve=()=>{
      
      
      // }
      // const modal=()=>{
      
      // }
      
      React.useEffect(() => {
        
        getAllUsers();
      
      }, [])
      





      

   
   
  return (
      <>
    <AdminHeader />
    
    
                                                        
    <Box sx={{ flexGrow: 1,paddingLeft: 10,paddingTop:30}} >


      <Grid container >
        
       { slots.map((id)=>  (
        
        




         
          <Grid item xs={3}   sx={{paddingRight:10, paddingTop:10, paddingBottom:10 }} >

            {value=false}

            { details.map((obj)=>{ (obj.reserved === id) ? value=true : console.log("hii");  }) }
          
           {console.log(value,id)}
    
           { value ? 

            <Tooltip title={slot} arrow>
    
             <Container  onMouseOver={(e)=>{ getemail(id)}} onClick={(e)=>{setOpenModal(true); setSlotId(id); }} sx={{backgroundColor:"yellow", color:'black', cursor:'pointer',height:50, border : 'solid #007371', display: 'flex', justifyContent :'center', textAlign:'center',height:100,alignItems:"center",borderRadius:5}}>
             Slot {id}
      
             
              </Container>
              </Tooltip>
    
              :
             
     
    
               <Container   onClick={(e)=>{setOpenModal(true); setSlotId(id) }} sx={{backgroundColor:"#1f1f1f", color:'yellow', cursor:'pointer',height:50, border : 'solid #007371', display: 'flex', justifyContent :'center', textAlign:'center',height:100,alignItems:"center",borderRadius:5}}>
              
              
              Slot {id}
              
          
    
    
              </Container> 
              
   }
    
    
    
              { openModal &&  <SlotModal modal={openModal} Id={Id} closeModal={setOpenModal} getAllUsers={getAllUsers} /> }   
          </Grid>
       







       
       

        )) }
           
      </Grid>  
    
  
    </Box>
     </>
  );
}

