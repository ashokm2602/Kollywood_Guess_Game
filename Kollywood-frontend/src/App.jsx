import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { FetchMovies,FetchMatches } from './Slices/MovieSlice'
import { useDispatch } from "react-redux";
import { useEffect } from 'react'
import MainPage from './Component/MainPage'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchMovies(52));
    dispatch(FetchMatches("aaa")); // any valid id
  }, [dispatch]);

  return null;
}

export default App
