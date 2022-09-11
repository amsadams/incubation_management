import {React,useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Box,TextField,Typography,Button} from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import 'react-toastify/dist/ReactToastify.css';

// import {DatePicker} from '@mui/x-date-pickers/DatePicker';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// // import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import Stack from '@mui/material/Stack';
import {db} from "../../firebase/config";
import { collection, getDocs, addDoc} from "firebase/firestore"
import firebase from "../../firebase/config";
import { NoBackpackSharp } from '@mui/icons-material';


function SignUp() {

 const userCollection= collection(db,"users")
 const [value, setValue] = useState("");
 const [number,setNumber]= useState("");
 const [name,setName]=useState("")
 const [password,setPassword]=useState("")
 const [email,setEmail]=useState("")
 const navigate=useNavigate();
//  const date=value.toLocaleString()

const { register, handleSubmit, formState: { errors } } = useForm();


const onSubmit = async (data)=>
{ 
 
  console.log(data)

     
    //  toast.error('Fields Cannot be blank', {
    //    position: "top-center",
    //    autoClose: 5000,
    //    hideProgressBar: false,
    //    closeOnClick: true,
    //    pauseOnHover: true,
    //    draggable: true,
    //    progress: undefined,
       
    //    });  




//   await  firebase
//  .auth()
//  .createUserWithEmailAndPassword(data.email, data.password)
//   await addDoc(userCollection, {name:data.name,email:data.email,number:data.number,password:data.password})
//      .then(() => {
//       alert("Uploaded Successfully") }
      
//       ) 
 
 }

 return (
<div>
   <form onSubmit={handleSubmit(onSubmit)}>

   <Box display="flex"
    flexDirection={"column"}
     maxWidth={400}
     alignItems="center"
     justifyContent={'center'}
     margin="auto"
     marginTop={21}
     padding={3}
     borderRadius={5}
     boxShadow={"5px 5px 10px #ccc"}
     sx={{":hover":{boxShadow:"10px 10px 20px #ccc"}}}
    >
       <Typography variant='h2' padding={3} textAlign='center'>
     SignUp
       </Typography>
       <TextField variant='outlined' margin='normal' placeholder='Name' color="secondary" style={{width:260}}  
        {...register("name", { required: true, minLength: 1 })}
       />
         {errors.name && <p style={{color:"red", marginTop:3, marginBottom:2}}>Please check the Name</p>}


       {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
     <DatePicker 
     label="Date Of Birth"
       value={value}
       onChange={(newValue) => {
         setValue(newValue);
        
       }}
       renderInput={(params) => <TextField   {...params} color="secondary" />}
     />
   </LocalizationProvider>
     */}

<TextField
         id="standard-number"
         placeholder='Phone Number'
         type="tel"
         color="secondary"style={{width:260}} 
         InputLabelProps={{
           shrink: true,
         }}
         variant="outlined"
         {...register("phone", {
          required: true,
          minLength: 10,
          maxLength: 10,
        })}
       />
{errors.phone && <p style={{color:"red", marginTop:3, marginBottom:2}}>Please check the Phone</p>}
     
<TextField type = "string" variant='outlined' name ="email" margin='normal' placeholder='Email' color="secondary" style={{width:260}} 
        {...register("email", {
          required: true,
          pattern:
            /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        })}
        />

       { console.log(errors)}
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

<p style={{color:"red", marginTop:3, marginBottom:2}}>Please check the Email</p>

}

       <TextField type={'password'} margin='normal' placeholder='Password' color="secondary"style={{width:260}}  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 10,
                  })}  />
                   {errors.password && <p style={{color:"red",}}>Please check the Password</p>}
       <Button type ="submit" variant='contained' sx={{marginTop: 3, marginBottom: 2 }} padding={4}  loadingIndicator="Loading…" > SignUp </Button>

       
       <Typography variant='h6' padding={3} textAlign='center'>
       <Link to="/login" style={{fontSize:15, textDecoration:"none",
 cursor: "pointer"}}> Already have an account? Login. </Link>
       </Typography>

 
 </Box>
</form>
<ToastContainer/>
 </div>
   )
}

export default SignUp