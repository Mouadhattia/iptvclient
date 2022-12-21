import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import ProductsManagments from "../productManagment/ProductsManagment";
import { useDispatch, useSelector } from "react-redux";
import { addusers, updateUsers, uploadImg } from "../../store/userSlice";
import { imgsPath } from "../../utils/apiURL";
import avatar   from "../../assets/images/avatar.png"
import Noti from "../../utils/Noti";

export default function UserModal({ open, setOpen, ping, setPing, user }) {
  const [notification, setNotification] = React.useState(false)
  const [message, setMessage] = React.useState("")
  const { data:current } =useSelector((state) => state.auth);
  const {backMessage} =useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [products, setProducts] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const checkPhone = new RegExp("^[0-9]{8}$") 
  const [invalidPhone, setInvalidPhone] = React.useState(false)
  const [userForEdit, setUserForEdit] = React.useState({
    name: "",
    userName: "",
    avatar:  "",
    phone: "",
    password: "",
    role: user?.role ? "" : "user",
  });
  const handleClose = () => {
    setOpen(false);
    setError(false)
  };

  const handleEdit = () => {


    if(userForEdit.password===''||userForEdit.userName===''||userForEdit.phone===''){
      setMessage("Pseudo,numéro de téléphone et mot de passe obligatoire")
    }
    else{
      if(checkPhone.test(userForEdit?.phone)){
        if (userForEdit.password === password) {
       
    
          if (user?.id!==undefined) {
            let newUser = {
              avatar: userForEdit.avatar || user.avatar,
              id: user.id,
              balance: user.balance,
              name: userForEdit.name || user.name,
              userName: userForEdit.userName || user.userName,
              img: userForEdit.img || user.img,
              phone: userForEdit.phone || user.phone,
              password: userForEdit.password || user.password,
              role: userForEdit.role || user.role,
              createdBy: user?.createdBy
            };
          
              dispatch(updateUsers(newUser)).then(()=>{
                setPing(!ping)
                setError(false)
                setOpen(false)
              }).catch(()=> {setError(true)});
            
          
           
            
          
           
          }else{
           
              dispatch(addusers({...userForEdit,createdBy: current?.userName})).then(()=>{
                setPing(!ping)
                setError(false)
                setOpen(false)
              }).catch(()=> {setError(true)})
               }
        }else{
          setMessage("le mot de passe ne correspondent pas ")
        }
      }else{
        setInvalidPhone(true)
      }
    
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
  if(user){
    setUserForEdit({
      name: user.name,
      userName: user.userName,
      avatar:  user.avatar,
      phone: user.phone,
      password: user.password,
      role: user?.role ? user.role : "user",
    })
    setPassword(user.password)
  }else{
    setUserForEdit({
      name: "",
      userName: "",
      avatar:  avatar,
      phone: "",
      password: "",
      role: user?.role ? "" : "user",
    })
  }
},[user,ping])

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
        time={2000}
      />
      <ProductsManagments open={products} setOpen={setProducts} user={user} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>Modfier votre profile.</DialogContentText>
          <input
            type="file"
            accept="image/*"
            onChange={(e)=>handleImageUpload(e)}
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
            <img alt="" src={userForEdit.avatar} className="img-preview" />
          </div>
          <h5 className="photo-title">Photo de profile </h5>
          <TextField
            margin="dense"
            id="name"
            label="Nom et Prénom"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={user?.name}
            
            onChange= {e=>setUserForEdit({...userForEdit,name:e.target.value})}
          />
          <TextField
            margin="dense"
            id="username"
            label="Pseudo"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={user?.userName}
            onFocus={() => setError(false)}
            onChange= {e=>setUserForEdit({...userForEdit,userName:e.target.value})}
         
            error={error?true: false}
            helperText={error?backMessage:""}
          />

          <TextField
            margin="dense"
            id="phone"
            label="Numéro de téléphone"
            type="phone"
            fullWidth
            variant="standard"
            defaultValue={user?.phone}
            onFocus={()=>setInvalidPhone(false)}
            onChange= {e=>setUserForEdit({...userForEdit,phone:Number(e.target.value)})}
            error={invalidPhone?true: false}
            helperText={invalidPhone?"Numéro de téléphone invalide.":""}
          />
          <TextField
            margin="dense"
            id="password"
            label="Mot de passe"
            type="password"
            fullWidth
            variant="standard"
            defaultValue={user?.password}
            onChange= {e=>setUserForEdit({...userForEdit,password:e.target.value})}
          />
          <TextField
            margin="dense"
            id="confirm-password"
            label="Confirmer mot de passe"
            type="password"
            fullWidth
            variant="standard"
            defaultValue={user?.password}
            onChange= {e=>setPassword(e.target.value)}
          />
          <FormLabel id="demo-radio-buttons-group-label">Role</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={user?.role?user?.role:"user"}
            name="radio-buttons-group"
            onChange= {e=>setUserForEdit({...userForEdit,role:e.target.value})}
          >
            <FormControlLabel
              value="user"
              control={<Radio />}
              label="Technicien"
            />
            <FormControlLabel
              value="revender"
              control={<Radio />}
              label="Revendeur"
            />
          </RadioGroup>

         { user&&<Button
            variant="contained"
            color="primary"
            size="small"
            style={{ width: "100%", marginTop: "16px" }}
            onClick={() => setProducts(true)}
          >
            gestionnaire de produit
          </Button>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleEdit}>Enregistrer</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
