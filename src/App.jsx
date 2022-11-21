import { useState } from 'react'
import Nav from './Components/Nav/Nav'
import './App.css'
import Bio from './Components/Bio/Bio'
import Gallery from './Components/Gallery/Gallery'


function App() {
  return (
    <>
      <Nav/>

      <div className="container">

        <Bio />

        <Gallery />
      </div>
   
    </>
  )
}

export default App
