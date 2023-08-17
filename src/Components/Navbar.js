import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class Navbar extends Component {
  render() {
    return (
      <div style={{
        display:"flex",
        background:"white",
        justifyContent:"center",
        alignItems:"center",
        padding:"0.2rem",
        color:"blueviolet",
      }}>
        <Link to="/" style={{textDecoration:"none"}}>
        <h1>MoviesApp</h1>
        </Link>
        <Link to="/fav" style={{textDecoration:"none"}}>
        <h2 style={{marginLeft:"2rem"}}>Favorites</h2>
        </Link>
      </div>
    )
  }
}
