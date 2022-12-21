import * as React from "react";
import { Button} from "@mui/material";
import { deletetransections, updateTransection } from "../../../store/transectionSlice";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid} from "@mui/x-data-grid";





export default function TransTable({transections ,ping,setPing}) {
  const dispatch = useDispatch()
  const  handleDelete=(e)=> {
    dispatch(deletetransections({id:e.id}))
    setPing(!ping)
   }
   const  handleEdit =(e)=> {
    dispatch(updateTransection({...e,status:true}))
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
   const renderStatus = (params) => {
    return (
      <strong>
       { params.row.status?
       <Button sx={{color:"green"}} >Payer</Button>:
        <Button
        sx={{color:"red"}}
        onClick={()=>handleEdit(params.row)}
        >Impayer</Button>
        }
      </strong>
    );
  };
   const columns = [
     { field: "id", headerName: "ID", width: 70 },
     { field: "providerUserName", headerName: "Fournisseur", width: 130 },
     { field: "reciverUserName", headerName: "Recipient", width: 130 },
     { field: "ammount", headerName: "montant", width: 130 },
     { field: "transectionDate", headerName: "Date", width: 160},
     { field: "status", headerName: "Paiments", width: 130 ,renderCell:renderStatus},
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
        rows={transections}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>   
  );
}
