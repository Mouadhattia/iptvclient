import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./Modals.css";
import { useDispatch } from "react-redux";
import {  updateProfile } from "../../store/authSlice";
import avatar   from "../../assets/images/avatar.png"
import { imgsPath } from "../../utils/apiURL";
import { uploadImg } from "../../store/userSlice";
import Noti from "../../utils/Noti";
export default function Editprofile({ open, setOpen,current}) {
  const dispatch = useDispatch();
  const [password, setPassword] = React.useState("")
  const [notification, setNotification] = React.useState(false)
  const [message, setMessage] = React.useState("")
  const [invalidPhone, setInvalidPhone] = React.useState(false)
  const [userForEdit, setUserForEdit] = React.useState({
    name: "",
    userName: "",
    avatar: "",
    phone: "",
    password: ""
  });
 const checkPhone = new RegExp("^[0-9]{8}$") 
  const handleClose = () => {
    setOpen(false);
    setInvalidPhone(false)
  };

  const handleEdit = () => {
    if (userForEdit.password === password) {
     
    
    
        let newUser = {
          id: current.id,
          avatar:userForEdit.avatar,
          balance: current.balance,
          name: userForEdit.name || current.name,
          userName: userForEdit.userName || current.userName,
          img: userForEdit.img || current.img,
          phone: Number(userForEdit.phone || current.phone),
          password: userForEdit.password || current.password,
          role:  current.role,
        };
   if(checkPhone.test(newUser?.phone)) {  
    setInvalidPhone(false)
    setOpen(false)
    dispatch(updateProfile(newUser))
   }else{
    setInvalidPhone(true)
   }
     
      
      
        
     
       
    
    }else{
      setMessage("le mot de passe ne correspondent pas ")
    }
    
  };
  React.useEffect(()=>{
    if(message){
      setNotification(true)
    }   
  },[message])
  React.useEffect(()=>{
    if(!notification){
      setMessage("")
     
    }
  },[notification])
  React.useEffect(()=>{
    if(current?.avatar){
      setUserForEdit({
        name: "",
        userName: "",
        avatar:  current?.avatar,
        phone: "",
        password: "",
      
      })
    }else{
      setUserForEdit({
        name: "",
        userName: "",
        avatar:  avatar,
        phone: "",
        password: "",
       
      })
    }
  },[current])

  const imageUploader = React.useRef(null);
  const handleImageUpload = async (e) => {
  const [file] = e.target.files;
  const formData = new FormData()
      formData.append('image', file)
      setTimeout(()=>{
        setUserForEdit({...userForEdit,avatar:imgsPath+file.name})  
      },1000)
      dispatch(uploadImg(formData))
    };
  return (
    <div>
       <Noti
        severity="error"
        notification={notification}
        setNotification={setNotification}
        message={message}
        time={1500}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>Modfier votre profile.</DialogContentText>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={imageUploader}
            style={{
              display: "none",
            }}
          />
          <div
            style={{
              position: "relative",
              width: "13rem",
              height: "13rem",
              borderRadius: "50%",
              margin: "auto",
              padding: "5px",
            }}
            onClick={() => imageUploader.current.click()}
          >
          
            <img alt="" src ={userForEdit.avatar} className="img-preview" />
          </div>
          <h5 className="photo-title">Photo de profile </h5>
          <TextField
            margin="dense"
            id="name"
            label="Nom et Prénom"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={current?.name}
            onChange= {e=>setUserForEdit({...userForEdit,name:e.target.value})}
          />
          <TextField
            margin="dense"
            id="username"
            label="Pseudo"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={current?.userName}
            onChange= {e=>setUserForEdit({...userForEdit,userName:e.target.value})}
          />
          <TextField
            margin="dense"
            id="phone"
            label="Numéro de téléphone"
            type="phone"
            fullWidth
            variant="standard"
            defaultValue={current?.phone}
            onChange= {e=>setUserForEdit({...userForEdit,phone:e.target.value})}
            error={invalidPhone?true: false}
            helperText={invalidPhone?"Numéro de téléphone invalide.":""}
            onFocus={()=>setInvalidPhone(false)}
           
          />
          <TextField
            margin="dense"
            id="password"
            label="Mot de passe"
            type="password"
            fullWidth
            variant="standard"
            defaultValue={current?.password}
            onChange= {e=>setUserForEdit({...userForEdit,password:e.target.value})}
          />
          <TextField
            margin="dense"
            id="confirm-password"
            label="Confirmer mot de passe"
            type="password"
            fullWidth
            variant="standard"
            defaultValue={current?.password}
            onChange= {e=>setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleEdit}>Enregistrer</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
