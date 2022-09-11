import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import firebase from "../firebase/config";
import './AdminHeader.css'
import { useNavigate } from 'react-router-dom';



export function TemporaryDrawer() {
  const navigate = useNavigate();
  const [state, setState] = React.useState({

    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = () => (
    <Box 
    className="boxx"
      // sx={{ background:'#1f1f1f', width: 250 , backgroundColor:'#1f1f1f',color:'#1f1f1f'}}
      role="presentation"
      onClick={toggleDrawer('left', false)}
      onKeyDown={toggleDrawer('left', false)}
      style={{background:'#1f1f1f', backgroundColor:'#1F1F1F',color:'#1f1f1f',width:270,height:1000}}
      
    >









      <List sx={{backgroundColor:'#1f1f1f',color:'black'}}>



      <ListItem key='newapplicants' sx={{backgroundColor:'#1f1f1f',color:'white'}} disablePadding>
            <ListItemButton onClick={()=>{navigate('/admin')}}>
              <ListItemIcon sx={{color:'white'}}>
           <InboxIcon /> 
              </ListItemIcon>
              <ListItemText primary='New Applicant List' />
            </ListItemButton>
          </ListItem>
        
       
          <ListItem key='pending' sx={{backgroundColor:'#1f1f1f',color:'white'}} disablePadding>
            <ListItemButton onClick={()=>{navigate('/pending')}}>
              <ListItemIcon sx={{color:'white'}}>
           <InboxIcon /> 
              </ListItemIcon>
              <ListItemText primary='Pending' />
            </ListItemButton>
          </ListItem>


          <ListItem key='approved' sx={{backgroundColor:'#1f1f1f',color:'white'}} disablePadding>
            <ListItemButton onClick={()=>{navigate('/approved')}}>
              <ListItemIcon sx={{color:'white'}}>
           <InboxIcon /> 
              </ListItemIcon>
              <ListItemText primary='Approved' />
            </ListItemButton>
          </ListItem>




          <ListItem key='bookingslots' sx={{backgroundColor:'#1f1f1f',color:'white'}} disablePadding>
            <ListItemButton onClick={()=>{navigate('/slots')}}>
              <ListItemIcon sx={{color:'white'}}>
           <InboxIcon /> 
              </ListItemIcon>
              <ListItemText primary='Booking Slots' />
            </ListItemButton>
          </ListItem>



          <ListItem key='logout' sx={{backgroundColor:'#1f1f1f',color:'white'}} disablePadding>
            <ListItemButton onClick={()=>{navigate('/slots')}}>
              <ListItemIcon sx={{color:'white'}}>
           <InboxIcon /> 
              </ListItemIcon>
              <ListItemText primary='Logout' />
            </ListItemButton>
          </ListItem>
          
      

      </List>


{/* 
      <Divider sx={{backgroundColor:'white',color:'#1f1f1f'}}/>
      <List style={{backgroundColor:'#1f1f1f', color:'#1f1f1f'}}>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} sx={{backgroundColor:'#1f1f1f',color:'white'}} disablePadding>
            <ListItemButton >
              <ListItemIcon sx={{color:'white'}}>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  React.useEffect(() => {
    const token = localStorage.getItem('admintoken');
 

    if (!token) {
        navigate('/adminlogin')
    }
},[])
  
  return (
    <div>
      
        <React.Fragment key={'left'} >
          <Button onClick={toggleDrawer('left', true)} color="inherit"> <MenuIcon /> </Button>
        
 

          <Drawer sx={{backgroundColor:'#1f1f1f'}} className="MuiDrawer-paper"
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
          >
            {list('left')}
          </Drawer>
       
        </React.Fragment>

    </div>
  );
}





export default function AdminHeader() {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 ,backgroundColor: '#1f1f1f'}} >
      <AppBar position="static" sx={{backgroundColor:'#007371'}}>
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          > */}

          <TemporaryDrawer/>
           
          {/* </IconButton> */}

          <Typography variant="h6" component="div" sx={{ flexGrow: 1,paddingLeft:2 }}>
            Dashboard
          </Typography>
          <Button color="inherit" onClick={()=>{firebase.auth().signOut(); 
              localStorage.removeItem('admintoken'); navigate('/adminlogin')}}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}