import * as React from "react";
import { Button, ButtonGroup } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import UserModal from "../../modals/UserModal";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { deleteUsers } from "../../../store/userSlice";

export default function UsersTable({ users, ping, setPing }) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState({});
  const handleEdit = (e) => {
    setUser(e);
    setOpen(true);
  };

  const handleDelete = (e) => {
    dispatch(deleteUsers({ id: e.id }));
    setPing(!ping);
  };
  const rows = users.map(user=>
   
  ( {...user,role:user.role==="user"?"Technicien":"Revendeur"})
  
  )
  const renderDetailsButton = (params) => {
    return (
      <strong>
        <ButtonGroup>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{
              backgroundColor: "transparent",
              border: "none",
              boxShadow: "none",
            }}
            onClick={() => {
              handleEdit(params.row);
            }}
          >
            <EditIcon sx={{ color: "#103755" }} />
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{
              marginLeft: 16,
              backgroundColor: "transparent",
              border: "none",
              boxShadow: "none",
            }}
            onClick={() => {
              handleDelete(params.row);
            }}
          >
            <DeleteIcon sx={{ color: "#103755" }} />
          </Button>
        </ButtonGroup>
      </strong>
    );
  };
 
  const columns = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Nom d'utillisateur" },
    { field: "userName", headerName: "Pseudo" },
    { field: "phone", headerName: "Numéro Tel" },
    { field: "role", headerName: "Role" },
    { field: "createdAt", headerName: "Date d'ajout" },
    { field: "balance", headerName: "Solde" },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: renderDetailsButton,
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <UserModal
        open={open}
        setOpen={setOpen}
        user={user}
        ping={ping}
        setPing={setPing}
      />
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
