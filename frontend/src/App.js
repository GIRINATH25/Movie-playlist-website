import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./routes/Router";
import React, { useEffect } from 'react';
import axios from "axios";

function App() {
  useEffect(() => {
    axios.defaults.baseURL = process.env.REACT_APP_BASEURL;
    axios.defaults.withCredentials = true;
  }, []);

  return (
    <Router>
      <AppRouter />
    </Router>
  );
}

export default App;
