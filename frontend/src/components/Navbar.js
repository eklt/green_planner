import React from "react";
import {
  RangeSlider,
  Slider,
  Form,
  ButtonToolbar,
  Button,
  setFormValue,
  Nav,
  Row,
  Col,
  InputNumber,
  Footer,
} from "rsuite";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <div>
      <Nav className="App">
        <Nav.Item
          as={Link}
          to={{ pathname: "https://www.globalgreenpartners.com" }}
          target="_blank"
        >
          <span className="navItem">
            <img src="favicon.ico" /></span>
        </Nav.Item>
        <Nav.Item as={Link} to="/index_single_working">
          <span className="navItem">CO2 Estimator</span>
        </Nav.Item>
        <Nav.Item as={Link} to="/plannig_doc">
          <span className="navItem">Planner Tools</span>
        </Nav.Item>
        <Nav.Item as={Link} to="/reports">
          <span className="navItem">Reports</span>
        </Nav.Item>
        <Nav.Item as={Link} to="/map">
          <span className="navItem">Map</span>
        </Nav.Item>

      </Nav>
      <p>
        <br />
      </p>
    </div>
  );
}
