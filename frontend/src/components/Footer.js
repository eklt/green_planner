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
  Footer
} from "rsuite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebook,
  faLinkedin
} from "@fortawesome/free-brands-svg-icons";

export default function Navbar() {
  return (
    <div className="footer">
      <Footer>
        <br></br>
      
      <a href="https://twitter.com/BerkeleyISchool?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" className="twitter social">
        <FontAwesomeIcon icon={faTwitter} size="2x" color="#2a7fcd"/>
      </a>
      <a href="https://www.facebook.com/BerkeleyISchool/"
        className="facebook social">
        <FontAwesomeIcon icon={faFacebook} size="2x" color="#2a7fcd"/>
      </a>
      <a href="https://www.linkedin.com/school/uc-berkeley/"
        className="twitter social">
        <FontAwesomeIcon icon={faLinkedin} size="2x" color="#2a7fcd" />
      </a>
      <div >
                <div >
                    <div>
                        <p >
                            <a href="index.html" className="footerlinks" >Home</a> |
                            <a href="about.html" className="footerlinks" >About</a> |
                            <a href="tech.html" className="footerlinks" >Technical</a> |
                            <a href="know.html" className="footerlinks" >CO2 Prediction</a> |
                            <a href="policy.html" className="footerlinks" >CO2 Policies</a> |
                            <a href="team.html" className="footerlinks" >Team</a> |
                            <a href="contact.html" className="footerlinks" >Contact</a>
                        </p>
                    </div>
                </div>
                <div>
                    <p className="footertext">
                        &copy; 2021 Created by Global Green Partners.
                    </p>
                </div>
            </div>
      </Footer>
            
    </div>
  );
}
