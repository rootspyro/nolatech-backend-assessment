import './App.css'
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"

function App() {

  const navigate = useNavigate()

  useEffect(() => {

    if (!localStorage.getItem("token")) {
      navigate("/login")
    } 
  }, [])


  return (
    <>
    <h1 className='text-5xl'>hello</h1>
    </>
  )
}

export default App
