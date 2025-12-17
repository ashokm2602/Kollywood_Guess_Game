import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { FetchMovie,FetchMatches } from './Slices/MovieSlice'
import { useDispatch } from "react-redux";
import { useEffect } from 'react'
import MainPage from './Component/MainPage'

function App() {
   
  return <MainPage/>;
}

export default App
