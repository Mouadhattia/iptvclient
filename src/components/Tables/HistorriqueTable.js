import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { styled } from "@mui/material/styles";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Button } from "@mui/material";
import Noti from "../../utils/Noti";
import useClipboard from "react-use-clipboard";
import { useDispatch, useSelector } from "react-redux";
import { formateDate } from "../../utils/helpers";
import { updateorder } from "../../store/orderSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#103755",
    color: theme.palette.common.white,
    fontSize: 14,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [notification, setNotification] = React.useState(false);
  const [copyCode, setCopyCode] = React.useState("watef");
const dispatch =useDispatch()
  const [isCopied, setCopied] = useClipboard(copyCode, {
    successDuration: 2000,
  });

  const handleCopy = (e) => {
 
    setCopyCode(e);
   
      setCopied();
    
  };
  const handleRefund =(order)=>{
    dispatch(updateorder({
      id:order.id,
      purchaseDate:order.purchaseDate,
      totalPrice:order.totalPrice,
      qt:order.qt,
      userName:order.userName,
      productName:order.product.name,
      refund:"pending"

    }))
  }

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <StyledTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {row?.id}
        </StyledTableCell>
        <StyledTableCell>{row?.product?.name}</StyledTableCell>
        <StyledTableCell>{row?.qt}</StyledTableCell>
        <StyledTableCell>{row?.totalPrice}</StyledTableCell>
        <StyledTableCell>{ formateDate(row?.purchaseDate) }</StyledTableCell>
        <StyledTableCell>
          {
          row.refund === "refund"?<Button onClick={()=>handleRefund(row)} >Rembourser</Button>:
          row.refund === "pending"?<Button color="warning">En cours</Button>:
          row.refund === "accepted"?<Button color="success">Accepter</Button>:
          row.refund === "rejected"?<Button color="error">Rejecter</Button>:
          ""
          }
        </StyledTableCell>
      </TableRow>
      <TableRow>
        <StyledTableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="span" gutterBottom component="span">
                Codes
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Code</StyledTableCell>

                    <StyledTableCell align="right">Copier</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.codes?.map((historyRow, key) => (
                    <TableRow key={key}>
                      <StyledTableCell id={key}>
                        {historyRow?.code}
                      </StyledTableCell>

                      <StyledTableCell align="right">
                        <Button onClick={() => handleCopy(historyRow?.code)}>
                          <ContentCopyIcon />
                          {isCopied ? "✔️" :""}
                        </Button>
                      </StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </StyledTableCell>
      </TableRow>
      <Noti
        severity="success"
        notification={notification}
        setNotification={setNotification}
        message="Votre code a été copier avec succès"
        time={1500}
      />
    </React.Fragment>
  );
}





export default function CollapsibleTable() {
  const { data:orders } =useSelector((state) => state.order);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <StyledTableCell />
            <StyledTableCell>ID du Ticket</StyledTableCell>
            <StyledTableCell>Prouduit </StyledTableCell>
            <StyledTableCell>Quantité</StyledTableCell>
            <StyledTableCell>Prix Total</StyledTableCell>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>remboursement</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
