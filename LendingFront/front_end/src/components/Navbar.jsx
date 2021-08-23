import React from 'react'
import {Link} from 'react-router-dom'

export const Navbar = () => (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">LendigFront</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link active" aria-current="page" to="">Home</Link>
              <Link className="nav-link" to="/Users">Loans</Link>
              <Link className="nav-link" to="/About">About Us</Link>
             
            </div>
          </div>
        </div>
      </nav>
)