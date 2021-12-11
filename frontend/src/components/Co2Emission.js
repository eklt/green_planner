import React, { useEffect, useState } from "react";

import {
  Grid,
  Divider,
  Row,
  Col,
  FlexboxGrid,
  Form,
  Button,
  SelectPicker,
} from "rsuite";
import Tabs from "./Tabs";
import { CsvToHtmlTable } from "react-csv-to-table";
import { csv } from "d3-fetch";

const restEndpoint = "http://54.177.46.243:5000/computeco2";
var ip = " ";
export default function Co2Emission() {
  const [countryOptions, setcountryOptions] = useState([]);
  const [value, setValue] = useState(countryOptions[0]);
  const [message, setMessage] = useState("");

  const [inputArray, setInputArray] = useState([]);

  const [population, setPopulation] = useState(1000);
  const [gdp, setGdp] = useState(10000);
  const [area, setArea] = useState(0.5);

  const styles = {
    Item: {
      display: "flex",
      justifyContent: "left",
    },
    Container: {
      marginLeft: "50px",
    },
    value: {
      display: "flex",
      justifyContent: "center",
      alignItem: "center",
      marginTop: "5px",
      width: "auto",
    },
    header: {
      marginLeft: "15px",
      marginBottom: "25px",
    },
    message: {
      display: "flex",
      justifyContent: "left",
      alignItem: "left",
      marginTop: "5px",
      width: "auto",
    },
  };

  useEffect(() => {
    getCo2();
  }, [population, gdp, area]);

  const getCo2 = () => {
    let countyinfo = [
      {
        gdp: parseFloat(gdp),
        population: parseFloat(population),
        area: parseFloat(area),
      },
    ];

    fetch(restEndpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(countyinfo),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setMessage("CO2 Emission: " + data.toLocaleString(undefined, {maximumFractionDigits:2})+"  Metric Tons.");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetchSelectedData();
  }, []);

  useEffect(() => {
    fetchInputValue();
  }, [value]);

  const fetchSelectedData = () => {
    let dataArray = [];
    let inputArrayValue = [];
    csv("/country_data.csv").then((counties) => {
      counties.map((val) => {
        console.log("Val",val)
        inputArrayValue.push(val);
        dataArray.push({ label: val.country, value: val.country, id: val.id });
      });
      setInputArray(inputArrayValue);
      setcountryOptions(dataArray);
    });
  };

  const fetchInputValue = () => {
    inputArray.map((val) => {
      if (val.country === value) {
        setGdp(Math.floor(val["gdp"]));
        setPopulation(Math.floor(val["population"]));
        setArea(Math.floor(val["area"]));
      }
    });
  };

  return (
    <Grid fluid style={styles.Container}>
      <Row>
        <Col xs={12} style={styles.Item}>
          <h5>CO2 Emission based on demographic& economic data</h5>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col xs={5} style={styles.Item}>
          <h4> Choose the country </h4>
        </Col>
        <Col xs={5} style={{ display: "flex" }}>
          <SelectPicker
            value={value}
            onChange={(newValue, event) => {
              setValue(newValue);
            }}
            data={countryOptions}
            style={{ width: 300 }}
          />
        </Col>
      </Row>
      <Divider />
      <div label="Compute">
        <Row className="show-grid">
          <Form layout="horizontal">
            <Form.Group controlId="population">
              <Form.ControlLabel style={styles.Item}>
                Population
              </Form.ControlLabel>
              <Form.Control
                type="text"
                placeholder="population"
                name="population"
                defaultValue={"10000"}
                onChange={(e) => {
                  setPopulation(e);
                }}
                value={population.toLocaleString()}
              />
            </Form.Group>
            <Form.Group controlId="gdp">
              <Form.ControlLabel style={styles.Item}>
                {" "}
                GDP ($){" "}
              </Form.ControlLabel>
              <Form.Control
                type="text"
                placeholder="GDP"
                name="gdp"
                onChange={(e) => {
                  setGdp(e);
                }}
                value={gdp.toLocaleString()}
              />
            </Form.Group>
            <Form.Group controlId="area">
              <Form.ControlLabel style={styles.Item}>
                {" "}
                Area (
                <p>
                  km<sup>2</sup>
                </p>
                ){" "}
              </Form.ControlLabel>
              <Form.Control
                placeholder="Area"
                name="area"
                type="text"
                onChange={(e) => {
                  setArea(e);
                }}
                value={area.toLocaleString()}
              />
            </Form.Group>

              <Row>
                <Form.ControlLabel style={styles.message}>
                  <h5>{message}</h5>
                </Form.ControlLabel>
              </Row>

          </Form>
        </Row>
      </div>
    </Grid>
  );
}
