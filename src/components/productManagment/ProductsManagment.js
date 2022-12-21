import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { formatPrice } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import "./manegment.css";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { fetchUserProducts, updateProducts } from "../../store/productSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProductsManagments({ open, setOpen,user }) {
  const { userData: products } = useSelector((state) => state.product);
  const {backMessage} =useSelector((state) => state.product);
  const [error, setError] = React.useState(false);
  const [openPrice, setOpenPrice] = React.useState(false);
  const [price, setPrice] = React.useState({});


const dispatch =useDispatch()

React.useEffect(()=>{
if(user){
  dispatch(fetchUserProducts({userName:user.userName}))
}
},[user,dispatch,openPrice])

  const handleClickOpen = (product) => {
    setOpenPrice(true);
    setPrice({
      id:product.id,
      newPrice:product.newPrice,
      productName:product.productName,
      userName:product.userName,
      revenderName:product.revenderName,
      visibilty:product.visibilty
    })

  };


  const handleClose = () => {
    setOpen(false);
    setError(false)
  };
  const handleClosePrice = () => {
    setOpenPrice(false);
    setError(false)
  };
  const handleUpdatePrice = () => {

   dispatch(updateProducts(price)).then(()=>{
    setOpenPrice(false);
    setError(false);
   }).catch(()=>setError(true))
    
   
  };


  return (
    <div>
      <Dialog
        open={openPrice}
        onClose={handleClosePrice}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          {"modifier le prix et la visibilité de produit"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="price"
            label="Prix"
            type="number"
            variant="standard"
            fullWidth
            defaultValue={price?.newPrice}
            onChange ={(e)=>setPrice({...price,newPrice:Number(e.target.value)})}
            error={error?true: false}
            helperText={error?backMessage:""}
          />
          <FormLabel id="demo-row-radio-buttons-group-label">
            Visibilité
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            defaultValue={price?.visibilty}
            onChange ={(e)=>setPrice({...price,visibilty:e.target.value==="true"?true:false})}
          >
            <FormControlLabel
              value={true}
              control={<Radio />}
              label="Visible"
            />
            <FormControlLabel
              value={false}
              control={<Radio />}
              label="Invisible"
            />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePrice}>Annuler</Button>
          <Button onClick={handleUpdatePrice} autoFocus>
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="span" component="div">
              Gestionnaire de produit
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Enregistrer
            </Button>
          </Toolbar>
        </AppBar>
        <div className="search-container">
          <form className="navbar-search flex">
            <input type="text" placeholder="Search here ..." />
            <button type="submit" className="navbar-search-btn">
              <i className="fas fa-search"></i>
            </button>
          </form>
      
        </div>
        <div className="product-items grid">
          {products?.map((product) => (
            <div className="product-item bg-white" key={product.id}>
              <div className="product-item-img">
                <img src={product.img} alt="" />
                <div className="product-item-cat text-white fs-13 text-uppercase bg-gold fw-6">
                  {product?.categoryName}
                </div>
              </div>
              <div className="product-item-body">
                <h6 className="product-item-title text-pine-green fw-4 fs-15">
                  {product.productName}
                </h6>
                <div className="product-item-price text-regal-blue fw-7 fs-18">
                  {formatPrice(product.newPrice)}
                </div>
                <div
                  style={{ color: "green", position: "relative" }}
                  className="product-item-price  fw-7 fs-18"
                >
                 { product.visibilty?<span>Visible</span>:<span style ={{color:"red"}}>Invisible</span> }
                  <EditIcon
                    style={{
                      position: "absolute",
                      right: 20,
                      fontSize: "25px",
                    }}
                    onClick={() => handleClickOpen(product)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Dialog>
    </div>
  );
}
