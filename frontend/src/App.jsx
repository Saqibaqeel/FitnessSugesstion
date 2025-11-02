import React from 'react'
import FitnessPlanForm from './pages/FitnessPlanForm'
import { Toaster } from "react-hot-toast";
import Header from './Components/Header';


function App() {
  return (
    <div>
    <Header/>
      <FitnessPlanForm/>
    </div>
  )
}

export default App