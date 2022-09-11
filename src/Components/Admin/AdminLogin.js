import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, TextField, Typography, Button } from "@mui/material"
import { db } from "../../firebase/config";
import { collection, getDocs, query } from "firebase/firestore"
import firebase from "../../firebase/config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form'

function AdminLogin() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [Details, setDetails] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  let log = false;

  const getUsers = async () => {

    const notify = () => toast("Invalid Login");
    const querrying = query(collection(db, "newapplicantlist"));
    const querySnapshot = await getDocs(querrying);
    const data = querySnapshot.docs.map((doc) => ({
      // doc.data() is never undefined for query doc snapshots
      ...doc.data(),
      id: doc.id,
    }))

    setDetails(data);
    console.log(data)

    // // Details.map((doc)=> {

    //   if (doc.email===email && doc.password === password)

    //   {
    //     log = true;
    //   }

    // }

    // if (log===true)
    // {

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        localStorage.setItem('admintoken', userCredential.user._delegate.accessToken)
        history('/admin')
        console.log(userCredential);
      })
      .catch(e=>{
         toast.error('Invalid Credentials', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            
            });})   

      


  };

  //   db.get(userCollection).then((res) => { console.log(res);
  //     res.forEach((doc) => {
  //       console.log(doc.data);
  //       setValue(doc.data());
  //     });
  //   });



  useEffect(() => {
    const token = localStorage.getItem('admintoken');


    if (token) {
      history('/admin')
    }
  }, [])


  return (
    <div>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <form>
     
        <Box display="flex"
          flexDirection={"column"}
          maxWidth={400}
          alignItems="center"
          justifyContent={'center'}
          margin="auto"
          marginTop={25}
          padding={3}
          borderRadius={5}
          boxShadow={"5px 5px 10px #007371"}
          sx={{ backgroundColor:"#007371",":hover": { boxShadow: "10px 10px 20px #008F8C",backgroundColor:" #008F8C " } }}
        >
          <Typography variant='h2' padding={3} textAlign='center' style={{color:"silver"}} >
            Admin Login
          </Typography>

          <TextField required


          type={email} value={email} onChange={(e) => setEmail(e.target.value)} variant='outlined' margin='normal' placeholder='Email/Phone' style={{color:'white'}}/>
          <TextField value={password} onChange={(e) => setPassword(e.target.value)} type={'password'} margin='normal' placeholder='Password' style={{color:'white',textDecorationColor:'white', outline:'none',":focus":{outline:'none'}}}/>
          <Button variant='contained' sx={{ marginTop: 3, marginBottom: 2 }} padding={4} loadingIndicator="Loading…" onClick={getUsers}> Login </Button>

{/* 
          <Typography variant='h6' padding={3} textAlign='center'>
            <Link to="/form"  style={{
              fontSize: 15, textDecoration: "none",color:"silver",
              cursor: "pointer"
            }}> Not Registered yet? Register Now! </Link>
          </Typography> */}


        </Box>
      </form>
    </div>
  )
}

export default AdminLogin