import React,{useState} from "react";

import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

const Header = () => {

    const [show , setShow] = useState(false);

  return<div>
    <MDBNavbar expand="lg" light style={{ backgroundColor: "#FF7F3F" }}>
      <MDBContainer fluid>
        <MDBNavbarBrand href="#">
            <img src="/images/logo.JPG" alt="logo"  style={{height : "30px"}}/>
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          data-target="#navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShow(!show)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse show={show} navbar>
          <MDBNavbarNav className="me-auto mb-2 mb-lg-0">
            <MDBNavbarItem className="active">
                <Link to="/">
                    <MDBNavbarLink aria-current="page">
                            Home
                    </MDBNavbarLink>
              </Link>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <Link to="/addBlog">
                <MDBNavbarLink>Add Blog</MDBNavbarLink>
              </Link>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <Link to="/about">
                <MDBNavbarLink >About</MDBNavbarLink>
              </Link>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  </div>
};

export default Header;
