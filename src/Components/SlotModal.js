import * as React from "react";
import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";
import DropDown from "./DropDown";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#1f1f1f",
  border: "2px solid #008F8C",
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
  color:'silver'
};

export default function SlotModal({
  closeModal,
  modal,
  Id,
  getAllUsers,
}) {








    




const [email,setEmail]= useState();
const [name,setName]= useState();
const [company,setCompany]= useState();
const [number,setNumber]= useState();
// const [address,setAddress]


    const getUsers = async () => {
    const docRef = doc(db, "newapplicantlist", Id);
    const docSnap = await getDoc(docRef);
    console.log("function=>", docSnap.data());
    console.log( docSnap.data().name )
    setName(docSnap.data().name)
    setEmail(docSnap.data().email)
    setCompany(docSnap.data().company)
    setNumber(docSnap.data().phone)
  };

  console.log("modal function");
//   console.log(Id);

  React.useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modal}
        onClose={() =>{closeModal(false); getAllUsers();}}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modal}>
          <Box sx={style}>
            <form>
              <Typography variant="h6" paddingBottom={3} textAlign="center">
                User Details 
              </Typography>

              <DropDown/>



              <Button
                variant="contained"
                onClick={() => {
                  closeModal(false);
                  getAllUsers();
                }}
                style={{ marginLeft: 170 }}
                loadingIndicator="Loading…"
              >
             
                OK

              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
