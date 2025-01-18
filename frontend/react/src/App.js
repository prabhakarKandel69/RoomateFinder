import React from 'react';
import AppRouter from './Router/Router'; // Import the router
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
       <ToastContainer />
      <AppRouter /> {/* Use the router */}
    </div>
  );
}

export default App;
