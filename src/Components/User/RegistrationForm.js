import {
  Box,
  Button,
  createTheme,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { blueGrey, red } from "@mui/material/colors";
import "./RegistrationForm.css";
import React from "react";
import { useForm } from 'react-hook-form';
import {db} from "../../firebase/config";
import { collection, getDocs, addDoc} from "firebase/firestore"
import firebase from "../../firebase/config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Navigate } from "react-router-dom";

function RegistrationForm() {

const newapplicantlist= collection(db,"newapplicantlist")
const { register, handleSubmit, formState: { errors } } = useForm();
const auth = getAuth();

const onSubmit=async (data) => {   


console.log(data.email,data.password);


await createUserWithEmailAndPassword(auth, data.email, data.password)
 await addDoc(newapplicantlist, {name:data.name,email:data.email,password:data.password,phone:data.phone,company:data.company})
    .then(() => {
     Navigate("/login") } ) 



   }

  let theme = createTheme({
    palette: {
      white: blueGrey[50],
    },
  });
  return (
    <>
      <Box
        display="flex"
        flexDirection={"row"}
        maxWidth={800}
        alignItems="center"
        justifyContent={"center"}
        margin="auto"
        marginTop={21}
        padding={3}
        borderRadius={5}
        boxShadow={"5px 5px 10px #ccc"}
        sx={{
          backgroundColor: "#007371",
          boxShadow: "5px 5px 10px #00ADAB",
          ":hover": {
            boxShadow: "5px 5px 20px #00ADAB",
            backgroundColor: "#008F8C",
          },
        }}
      >
        <Grid container>
       
          <form className="regform" onSubmit={handleSubmit(onSubmit)}>
           
            <Typography
              variant="h2"
              padding={3}
              textAlign="center"
              sx={{ color: "silver", marginLeft: 20 }}
            >
              Register Now !
            </Typography>
            <Grid item xs={12} md={12}>
              <TextField
                variant="outlined"
                margin="normal"
                placeholder="Name"
                style={{ width: 700, textColor: "white" }}
                // value={name}
                // onChange={(e) => {
                //   setName(e.target.value);
                // }}

                {...register("name", { required: true, minLength: 1 })}
              />
              {errors.name && <p style={{color:"#E8D73F", marginTop:3, marginBottom:2}}>Please check the Name</p>}

            </Grid>

            <TextField
              variant="outlined"
              margin="normal"
              placeholder="Address"
              style={{ width: 700 }}
              {...register("address", { required: true, minLength: 2 })}
              //value={email}
              // onChange={(e) => {
              //   setEmail(e.target.value);
              // }}
            />
          
          {errors.address && <p style={{color:"#E8D73F", marginTop:3, marginBottom:2}}>Please check the Address</p>}
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date Of Birth"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} color="secondary" />
                )}
              />
            </LocalizationProvider> */}
<Grid container sx={{display:'flex', flexDirection:'row'}} spacing={2}>
  
<Grid item xs={6} md={6} >

<TextField
              variant="outlined"
              margin="normal"
              placeholder="Email Id"
              style={{ width: 320}}
              
              //value={email}
              // onChange={(e) => {
              //   setEmail(e.target.value);
              // }}
              type = "string" name ="email"  
              {...register("email", {
                required: true,
                pattern:
                  /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
           
      
           />



{ errors.email && 


//  toast.error('Fields Cannot be blank', {
//   position: "top-center",
//   autoClose: 5000,
//   hideProgressBar: false,
//   closeOnClick: true,
//   pauseOnHover: true,
//   draggable: true,
//   progress: undefined,
  
// }) 
<>
<p style={{color:"#E8D73F", marginTop:3, marginBottom:2}}>Please check the Email</p> <br/>
</>
}



</Grid>



<Grid item xs={6} md={6} >

<TextField
              variant="outlined"
              margin="normal"
              placeholder="Password"
              style={{ width: 340 }}
              
              //value={email}
              // onChange={(e) => {
              //   setEmail(e.target.value);
              // }}
              type = "password" name ="email"  
              {...register("password", {
                required: true,
            minLength:8
              })}
           
      
           />



{ errors.password && 


//  toast.error('Fields Cannot be blank', {
//   position: "top-center",
//   autoClose: 5000,
//   hideProgressBar: false,
//   closeOnClick: true,
//   pauseOnHover: true,
//   draggable: true,
//   progress: undefined,
  
// }) 
<>
<p style={{color:"#E8D73F", marginTop:3, marginBottom:2}}>Please check the Password</p> <br/>
</>
}

</Grid>


</Grid>
            <Grid item xs={12} md={12}>
              <TextField
                id="standard-number"
                placeholder="Phone Number"
                type="number"
                style={{ width: 700 }}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                // value={number}
                //           onChange={(e)=>setNumber(e.target.value)}


                {...register("phone", {
                  required: true,
                  minLength: 10,
                  maxLength: 10,
                })}

              />
              {errors.phone && <p style={{color:"#E8D73F", marginTop:3, marginBottom:2}}>Please check the Phone</p>}

            </Grid>
            <Grid container sx={{display:'flex', flexDirection:'row'}} spacing={5}>
            <Grid item xs={6} md={6}>
              <TextField
                margin="normal"
                placeholder="City"
                style={{ width: 330, color: "#007371" }}
                // value={password}
                // onChange={(e) => {
                //   setPassword(e.target.value);
                // }}
                {...register("city", { required: true, minLength: 1 })}
              />
              {errors.city && <p style={{color:"#E8D73F", marginTop:3, marginBottom:2}}>Please check the City</p>}
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                margin="normal"
                placeholder="State"
                style={{ width: 330, color: "#007371" }}
                // value={password}
                // onChange={(e) => {
                //   setPassword(e.target.value);
                // }}
                {...register("state", { required: true, minLength: 1 })}
              />
                            {errors.state && <p style={{color:"#E8D73F", marginTop:3, marginBottom:2}}>Please check the State</p>}

                </Grid>
            </Grid>

            <Grid container sx={{display:'flex', flexDirection:'row'}} spacing={5}>
            <Grid item xs={6} md={6}>
              <TextField
                margin="normal"
                placeholder="Company Name"
                style={{ width: 330, color: "#007371" }}
                // value={password}
                // onChange={(e) => {
                //   setPassword(e.target.value);
                // }}
                {...register("companyname", { required: true, minLength: 1 })}
              />
                            {errors.companyname && <p style={{color:"#E8D73F", marginTop:3, marginBottom:2}}>Please check the Company Name</p>}

                </Grid>


            <Grid item xs={6} md={6}>
              <TextField
                margin="normal"
                placeholder="Company Logo"
                style={{ width: 330, color: "#007371" }}
                // value={password}
                // onChange={(e) => {
                //   setPassword(e.target.value);
                // }}
                {...register("logo", { required: true, minLength: 1 })}
              />
                                          {errors.logo && <p style={{color:"#E8D73F", marginTop:3, marginBottom:2}}>Please check the Company Name</p>}

                </Grid>






</Grid>



<Grid item >
              <TextField
                margin="normal"
                placeholder="Describe About Your Company"
                style={{ width: 700, color: "#007371" }}
                // value={password}
                // onChange={(e) => {
                //   setPassword(e.target.value);
                // }}
                {...register("description", { required: true, minLength: 1 })}
              />
               {errors.description && <p style={{color:"#E8D73F", marginTop:3, marginBottom:2}}>Please check the Company Name</p>}
                </Grid>
            <Button
            type="submit"
              variant="contained"
              sx={{ marginTop: 3, marginBottom: 2 }}
              padding={4}
              loadingIndicator="Loading…"
              //  onClick={()=>{createUser()} }
            >
              {" "}
              SignUp{" "}
            </Button>
           
          </form>
          </Grid>
      
      </Box>
    </>
  );
}

export default RegistrationForm;
