import React, { useEffect, useState } from "react";
import "./CartPage.scss";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Table from "../../components/Tables/HistorriqueTable";
import UsersTable from "../../components/Tables/UsersTable.js/UsersTable";
import TransTable from "../../components/Tables/TransTable/TransTable";
import SoftwaresTable from "../../components/Tables/Softwares/SoftwaresTable";
import PaymentsIcon from "@mui/icons-material/Payments";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import UserModal from "../../components/modals/UserModal";
import Chart from "../../components/Charts/Chart";
import Cart from "../../utils/Cart";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchusers } from "../../store/userSlice";
import { addtransections, fetchtransections } from "../../store/transectionSlice";
import { fetchSoftwares } from "../../store/softwareSlice";
import { fetchorders } from "../../store/orderSlice";
import $ from "jquery";
import { auth}  from "../../store/authSlice";
import OrdersTable from "../../components/Tables/Orders/OrdersTable";


function CartPage(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className="box">
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CartPage.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
 
  const dispatch = useDispatch()
  const [value, setValue] = React.useState(1);
  const [ping, setPing] = useState(false)
  const [error, setError] = React.useState(false);
  const { data:users } =useSelector((state) => state.user);
  const { data:transections } =useSelector((state) => state.transection);
  const { data:softwares } =useSelector((state) => state.software);
  const { data:current } =useSelector((state) => state.auth);
  const { data:orders } =useSelector((state) => state.order);
  const  {orders:history}  =useSelector((state) => state.order) 
  const {backMessage} =useSelector((state) => state.transection);
 const p = history.map(e=>e.totalPrice)
 const b = history.map(e=>e.totalPrice- e.adminPrice)
 const d = transections.map(e=>e.ammount)
 const o = orders.map(e=>e.totalPrice)
  const totalPrice  = p.reduce( (a,b) => a+b ,0)
  const benefice  = b.reduce( (a,b) => a+b ,0)
 const  ammounts =d.reduce( (a,b) => a+b ,0)
 const expenses  = o.reduce( (a,b) => a+b ,0)
  useEffect(() => {
   dispatch(fetchusers({createdBy:current.userName}))
   dispatch(fetchtransections({providerUserName:current.userName}))
   dispatch(fetchSoftwares())
   dispatch(fetchorders({search:current?.userName}))

   
  }, [dispatch,ping,current])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [openTrans, setOpenTrans] = React.useState(false);
  const handleCloseTrans = () => {
    setOpenTrans(false);
    setError(false)
    setLoading(false)
  };
  const handleOpenTran = () => {
    setOpenTrans(true);
  };
  const [user, setUser] = React.useState();
  const [ammount, setAmmount] = React.useState(0);
  const [openUser, setOpenUser] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleConfirmTrans =()=>{
    setLoading(true)
    dispatch(addtransections({
      ammount:Number(ammount),
      providerUserName:current?.userName,
      reciverUserName:user?.userName? user?.userName :users[0]?.userName
    })).then(()=>{
      dispatch(auth())
      setOpenTrans(false);
      setError(false)
      setLoading(false)
    }).catch(()=>{
      setError(true)
      setLoading(false)
    })
  
  }
  const handleChangeUser = (event) => {
   let id = event.target.value
    setUser(users.filter(e=>e.id===id)[0]);
  };
  const handleAddUser = () => {
    setOpenUser(true);
  };


  $( "#test" ).load( "ajax/test.html" );
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="cart-page"
    >
      <UserModal open={openUser} setOpen={setOpenUser} ping ={ping} setPing ={setPing}  />
      <Dialog
        open={openTrans}
        onClose={handleCloseTrans}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          {"Ajouter  montant pour tout les produits"}
        </DialogTitle>
        <DialogContent> 
          <FormControl fullWidth sx={{ marginTop: "10px" }}>
            <InputLabel id="demo-simple-select-label">Utilisateur</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={user?.id||users[0]?.id}
              label="Utilisateur"
              onChange={handleChangeUser}
            >
              {users.map((user,key)=><MenuItem key={key} value={user?.id}>{user?.userName}</MenuItem>)}
              
            </Select>
            <TextField
              margin="dense"
              id="name"
              label="Montant"
              type="number"
              variant="standard"
              onChange={(e)=>setAmmount(e.target.value)}
              error={error?true: false}
            helperText={error?backMessage:""}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTrans}> Annuler</Button>
          {loading?<CircularProgress color="inherit" size={16} />
         : <Button onClick={handleConfirmTrans} autoFocus  >
            Confirmer
          </Button>
         }
          
        </DialogActions>
      </Dialog>
      <div className="container ">
        <div className="breadcrumb">
          <ul className="breadcrumb-items flex">
            <li className="breadcrumb-item">
              <i className="fas fa-home"></i>
              <span className="breadcrumb-separator">
                <i className="fas fa-chevron-right"></i>
              </span>
            </li>
            <li>Paramètre</li>
          </ul>
        </div>
      </div>
      <div className="container-responsive ">
        <Box sx={{ width: "100%" }} >
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              TabIndicatorProps={{ sx: { display: "none" } }}
              sx={{
                "& .MuiTabs-flexContainer": {
                  flexWrap: "wrap",
                },
              }}
            >
              <Tab label="Tableau de Bord" {...a11yProps(0)} disabled={current.role !=="provider"} />
              <Tab label="Mes Achats" {...a11yProps(1)} />
              <Tab label="Soldes" {...a11yProps(2)} disabled={current.role !=="provider"} />
              <Tab label="Utlilisateurs" {...a11yProps(3)} disabled={current.role !=="provider"}/>
              <Tab label="Logiciels" {...a11yProps(4)} />
              <Tab label="Checkers" {...a11yProps(5)} />
         
            </Tabs>
          </Box>
          <CartPage value={value} index={0}  >
            <h1 className="setting__title">Tableau de Bord</h1>
            <Stack spacing={3} >
              <h1 className="dashbord-subtitle">Statistique</h1>
              <Grid container spacing={3}>
                <Grid item xs={10} sm={6} md={3}>
                  <Cart
                    title="  Ventes totals "
                    total={totalPrice}
                    icon={"fa6-solid:money-bill-trend-up"}
                  />
                </Grid>
                <Grid item xs={10} sm={6} md={3}>
                  <Cart
                    title="Bénéfice totals"
                    total={benefice}
                    icon={"healthicons:money-bag"}
                    color="info"
                    bgColor="#D0F2FF"
                    fontColor="#4468A4"
                  />
                </Grid>
                <Grid item xs={10} sm={6} md={3}>
                  <Cart
                    title="Soldes totals"
                    total={ammounts}
                    icon={"vaadin:money-deposit"}
                    color="warning"
                    bgColor="#FFF7CD"
                    fontColor="#7A4F01"
                  />
                </Grid>
                <Grid item xs={10} sm={6} md={3}>
                  <Cart
                    title="Achats totals"
                    total={expenses}
                    icon={"arcticons:purchased-apps"}
                    color="error"
                    bgColor="#FFE7D9"
                    fontColor="#7A0C2E"
                  />
                </Grid>
              </Grid>
              <h1 className="dashbord-subtitle">Diagramme de Ventes</h1>
              <Chart history ={history} />
              <h1 className="dashbord-subtitle">Historique de commande</h1>
              <OrdersTable history={history}  />
            </Stack>
          </CartPage>
          <CartPage value={value} index={1}>
            <h1 className="setting__title">Mes achats</h1>
            <Table orders={orders} />
          </CartPage>
          <CartPage value={value} index={2}>
            <h1 className="setting__title"> Soldes </h1>
            <Button
              variant="outlined"
              sx={{
                marginBottom: "20px",
                color: "#103755",
                borderBlockColor:"#103755"
                
              }}
              onClick={handleOpenTran}
            >
              <PaymentsIcon sx={{ fontSize: 20, marginRight: "5px" }} />
              Ajouter Solde
            </Button>
            <TransTable transections={transections} ping ={ping} setPing ={setPing}  />
          </CartPage>
          <CartPage value={value} index={3}>
            <h1 className="setting__title"> Utlilisateurs </h1>
            <Button
              variant="outlined"
              sx={{
                marginBottom: "20px",
                color: "#103755",
               borderBlockColor:"#103755"
              }}
              onClick={handleAddUser}
            >
              <GroupAddIcon sx={{ fontSize: 20, marginRight: "5px" }} />
              Ajouter utilisateur
            </Button>
            <UsersTable users= {users} ping ={ping} setPing ={setPing}  />
          </CartPage>
          <CartPage value={value} index={4}>
            <h1 className="setting__title"> Logiciels </h1>
            <SoftwaresTable softwares ={softwares} />
          </CartPage>
          <CartPage value={value} index={5}>
            <h1 className="setting__title">Checkers </h1>
          
       <Stack >
       <Button onClick={()=>window.location.href="http://renewbox.net"}>
                Gshare
                </Button>
                <Button onClick={()=>window.location.href="http://tpoentrance.cc"}>
                Forever
                </Button>
                <Button onClick={()=>window.location.href="http://funcam.rv.ua"}>
                Funcam
                </Button>
             
       </Stack>
               
             
          
          </CartPage>
      
      
      
        </Box>
      </div>
    </motion.div>
  );
}
