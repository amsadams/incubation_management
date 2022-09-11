import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { collection, getDocs, query,doc, updateDoc} from 'firebase/firestore';
import { db } from '../firebase/config';
import { IdContext } from '../store/Context';

export default function DropDown() {
  const [reserve, setReserve] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const {SlotId}=React.useContext(IdContext)
const {setSlotId}=React.useContext(IdContext)

  const [details,setDetails]=React.useState([]);
  const [Id,setId]=React.useState()

  const getAllUsers = async () => {
      const querrying = query(collection(db, "approvedlist"));
      const querySnapshot = await getDocs(querrying);
      const data = querySnapshot.docs.map((doc) => ({
        // doc.data() is never undefined for query doc snapshots
        ...doc.data(),
        id: doc.id,
      }));
  
      setDetails(data);
      console.log(data)



    };
  
    const val=SlotId;
    console.log("global Id",val)


  const handleChange = async (event) => {
    

     if(event.target.value===null)
     {
   return
     }
    const docRef = doc(db, "approvedlist", Id);
    console.log(docRef)
    await updateDoc(docRef, {
        "reserved": val
    }).then(alert("updated!"));

    setReserve(event.target.value);
    // await db.collection("approvedlist").doc(Id).set({"reserve":true}, {merge: true});
  
    


  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  React.useEffect(() => {
    
  getAllUsers();
    
  }, [])
  

  return (
    
    <div>
      <Button sx={{ display: 'block', mt: 2, color: "yellow" }} onClick={handleOpen}>
       Reserve this Slot for: 
      </Button>
     
      <FormControl sx={{ m: 1, minWidth: 400, paddingDown: 5,backgroundColor:"#1f1f1f", color:"white" }}>
        <InputLabel id="demo-controlled-open-select-label" sx={{backgroundColor:"#1f1f1f", color:"white"}}>Click to Reserve</InputLabel>
       
        { details.map((obj,i)=>( 
                 
           <React.Fragment key={i}>

        <Select style={{backgroundColor:"#1f1f1f",color:"white"}}
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={reserve}
          label="Assign"
          onChange={(e)=>{ setId(obj.id); handleChange(e)}}
        >  
            
            <MenuItem value={null} sx={{backgroundColor:"#007371", color:"white",":hover":{color:"black"}}}>-none-</MenuItem> 
         
           <MenuItem value={30}sx={{backgroundColor:"#007371", color:"white",":hover":{color:"black"}}}>{obj.email}</MenuItem> 

          </Select>
         
          </React.Fragment>
          
           ))}
           
            
       
        
     
        
      </FormControl>
   
    </div>
    
  );
}
