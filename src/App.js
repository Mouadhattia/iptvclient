import "./App.scss";
import { BrowserRouter } from "react-router-dom";
// pages

// components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Provider} from "react-redux";
import AnimatedRoutes from "./routes/AnimatedRoutes";
import { setAuthToken } from "./store/authSlice";
import { persistor, store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';

function App() {


  const user =localStorage.getItem("token");
  let role=localStorage.getItem("role")
  setAuthToken(user)
  return (
    <div className="App">
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          {user&&role&& <Navbar />}
          <AnimatedRoutes   />
          {user&&role && <Footer />}
        </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
