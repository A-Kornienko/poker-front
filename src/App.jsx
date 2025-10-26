import { useState } from 'react'
import './App.css'
import { BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import TopBar from './components/TopBar'

function App() {

  return (
    <BrowserRouter>
      <TopBar/>
      <AppRouter/>
    </BrowserRouter>

  )
}

export default App
