import * as React from "react";
import { Button} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid} from "@mui/x-data-grid";
import { deleteorder, getHistory } from "../../../store/orderSlice";
import { formateDate, formatPrice } from "../../../utils/helpers";





export default function OrdersTable({history}) {
    const { data:current } =useSelector((state) => state.auth);
   
    
    const [ping,setPing]= React.useState(false)
  const dispatch = useDispatch()

   const data = history.map(order=> (
    { ...order,adminPrice: order.totalPrice- order.adminPrice}
   )
   
   )

  React.useEffect(()=>{
    if(current){
        dispatch(getHistory({userName:current.userName}))
    }
   
  },[ping,current,dispatch])
  const  handleDelete=(e)=> {
    dispatch(deleteorder({id:e.id}))
    setPing(!ping)
   }
 
   
   const renderDetailsButton = (params) => {
     return (
       <strong>
      
      
           <Button
          
             variant="contained"
             color="primary"
             size="small"
             style={{ marginLeft: 16 , backgroundColor:"transparent",border:"none",boxShadow:"none"}}
             onClick={() => {
               handleDelete(params.row)
             }}
           >
             <DeleteIcon sx={{color:"#103755"}}  />
           </Button>
          
        
       </strong>
     );
   };

   const columns = [
     { field: "id", headerName: "ID", width: 70 },
     { field: "productName", headerName: "Produit", width: 130 },
     { field: "userName", headerName: "Utilisateur", width: 130 },
     { field: "qt", headerName: "Quantité", width: 130 },
     { field: "totalPrice", headerName: "Prix Total", width: 130 ,
     valueFormatter: ({ value }) => {
        if (!value) {
          return value;
        }
        return formatPrice(value);
     
    },
    },
     { field: "adminPrice", headerName: "Bénéfice", width: 160,
     valueFormatter: ({ value }) => {
        if (!value) {
          return value;
        }
        return formatPrice(value);
     
    },
    },
     { field: "purchaseDate", headerName: "date", width: 130,
     valueFormatter: ({ value }) => {
        if (!value) {
          return value;
        }
        return formateDate(value);
      },
    },
     {
       field: "actions",
       headerName: "Actions",
       width: 80,
       renderCell: renderDetailsButton,
     },
   ];
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>   
  );
}
