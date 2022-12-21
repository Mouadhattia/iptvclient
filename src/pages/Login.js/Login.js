import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./Login.css";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { logIn } from "../../store/authSlice";
import { useState } from "react";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="">
        Z-9 Dev
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const [backMessage,setBackMessage]=useState(null)
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  
    dispatch(
      logIn({
        userName: data.get("userName"),
        password: data.get("password"),
      })
    ).then(()=>setBackMessage(null)).catch((e)=>setBackMessage(e))
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      
    >
      <ThemeProvider theme={theme} className="login">
        <div className="login-logo">
          <span className="text-regal-blue">YOUR</span>
          <span className="text-gold"> LOGO</span>
        </div>
        <Container component="main" maxWidth="xs" className="login-container" >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#EEB808" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="span" variant="h5">
              Connexion
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="userName"
                label="Email Address"
                name="userName"
                autoComplete="userName"
                autoFocus
                error={backMessage?true: false}
            helperText={backMessage?backMessage:""}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={backMessage?true: false}
            helperText={backMessage?backMessage:""}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Me connecter automatiquement"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="login-btn"
                sx={{ mt: 3, mb: 2 }}
              >
                Se connecter
              </Button>
              <Typography >
                     <Link href="https://admin.multipanel.tn" >
                     Connecter en tant qu'administrateur ?
                </Link>
                </Typography>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </motion.div>
  );
}
