import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AdminHeader from './AdminHeader';
import { addDoc, collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useState, useEffect } from "react";
import { Button } from '@mui/material';
import TransitionsModal from './ViewModal';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function NewapplicantList() {
const [details,setDetails]=useState([]);
const [openModal,setOpenModal] = useState(false);
const [Id,setId]=useState();
const pendinglist= collection(db,"pendinglist")



        const getAllUsers = async () => {
        const querrying = query(collection(db, "newapplicantlist"));
        const querySnapshot = await getDocs(querrying);
        const data = querySnapshot.docs.map((doc) => ({
          // doc.data() is never undefined for query doc snapshots
          ...doc.data(),
          id: doc.id,
        }));
    
        setDetails(data);
        console.log(data)
      };




      const handleprocess=async(data)=>{

        await addDoc(pendinglist, {name:data.name,email:data.email,password:data.password,phone:data.phone})
    // .then(() => {
    //  alert("Uploaded Successfully") } ) 


      }

      const handleDelete = async (id) => {
        await deleteDoc(doc(db, "newapplicantlist", id));
        getAllUsers();
      };
    

React.useEffect(() => {
  
    getAllUsers();
  
}, [])




  return (
<>
    <AdminHeader/>
    <h2 style={{color:'white',marginLeft:100,paddingTop:30}}>New Applicants Lists</h2>
    <TableContainer component={Paper} sx={{paddingTop:5,backgroundColor:'#1f1f1f',paddingRight:10}}>
      <Table sx={{ backgroundColor:'gray'}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Company</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>

          
          </TableRow>
        </TableHead>
        <TableBody>
          {details.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name} {console.log(row)}
              </StyledTableCell>
              <StyledTableCell align="right">{row.email}</StyledTableCell>
              <StyledTableCell align="right">{row.company}</StyledTableCell>
              <StyledTableCell align="right"><Button variant="contained" color="success" onClick={ (e)=> {handleprocess(row); handleDelete(row.id)}}>Process</Button></StyledTableCell>
             
              <StyledTableCell align="right"><Button variant="contained" color="error" onClick={()=>{handleDelete(row.id)}}>Deny</Button></StyledTableCell>
             
              <StyledTableCell align="right"> <Button variant="contained" color="warning"  onClick={(e)=>{setOpenModal(true)
                      setId(row.id) 
                      }}>View</Button></StyledTableCell>


             
             
            </StyledTableRow>
          ))}

          
        </TableBody>
      </Table>

     
      { openModal &&  <TransitionsModal modal={openModal} Id={Id} closeModal={setOpenModal} /> }
    </TableContainer>
    </>
  );
}
