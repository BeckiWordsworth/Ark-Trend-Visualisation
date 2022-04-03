import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import "./style.css";

class Sidebar extends React.Component {
  render() {
    return (
      <Nav className="sidebar d-flex flex-column flex-shrink-0 p-3 text-white bg-dark">
        <a
          href="/"
          className="sidebar-title d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          ArK React Case
        </a>
        <hr />
        <ul class="nav nav-pills flex-column mb-auto">
          <li>
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
          </li>
          <li>
            <LinkContainer to="/adspend">
              <Nav.Link>Ad Spend</Nav.Link>
            </LinkContainer>
          </li>
          <li>
            <LinkContainer to="/purchases">
              <Nav.Link>Purchases</Nav.Link>
            </LinkContainer>
          </li>
        </ul>
      </Nav>
    );
  }
}

export default Sidebar;
