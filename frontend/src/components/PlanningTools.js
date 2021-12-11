import React, { useState, useEffect } from "react";
import {
  Grid,
  Divider,
  Row,
  Col,
  FlexboxGrid,
  Form,
  Slider,
  InputNumber,
  SelectPicker,
} from "rsuite";
import { csv } from "d3-fetch";
import Tooltip from "@mui/material/Tooltip";

const restEndpoint = "http://54.177.46.243:5000/co2plan";
const electricityMax = 50000;
const gasMax = 10000;
const wasteMax = 5000000;
const vehicleMAx = 5000000;
const waterMax = 10000;
export default function PlanningTools() {
  const [gasSlider, setGasSlider] = useState("");
  const [elecricitySlider, setElectrictySlider] = useState("");
  const [wasteSlider, setWasteSlider] = useState("");
  const [vehiclesSlider, setVehicleSlider] = useState("");
  const [waterSlider, setWaterSlider] = useState("");
  const [countiesOptions, setCountiesOptions] = useState([]);
  const [value, setValue] = useState(countiesOptions[0]);
  const [message, setMessage] = useState("__");
  const [sliderMessage, setSliderMessage] = useState("__");
  const [computedco2, setcomputedco2] = useState("");
  const [totalelectricity, setElectricty] = useState(100);
  const [totalgas, setGas] = useState(100);
  const [inputArray, setInputArray] = useState([]);
  const [totalwaste, setWaste] = useState(100);
  const [totalvehicles, setVehicles] = useState(100);
  const [totalwater, setWater] = useState(100);

  const [testSlider, setTestSlider] = useState(100);


  const [isCheck, setIsCheck] = useState(false);

  const [setVal, setSetVal] = useState("");

  const styles = {
    Item: {
      display: "flex",
      justifyContent: "left",
      alignItems: "center",
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
      marginTop: "15px",
      marginBottom: "25px",
    },
  };
  const handleStyle = {
    color: "black",
    fontSize: 12,
    width: 32,
    height: 22,
  };
  useEffect(() => {
    getCO2();
  }, []);
  useEffect(() => {
    if (value) {
      getCO2();
    } else {
      getCo2Value();
    }
    setElectrictySlider(
      parseInt((totalelectricity / electricityMax) * 100) + "%"
    );
    setGasSlider(parseInt((totalgas / gasMax) * 100) + "%");
    setWasteSlider(parseInt((totalwaste / wasteMax) * 100) + "%");
    setVehicleSlider(parseInt((totalvehicles / vehicleMAx) * 100) + "%");
    setWaterSlider(parseInt((totalwater / waterMax) * 100) + "%");
  }, [totalelectricity, totalgas, totalwaste, totalvehicles, totalwater]);

  const getCO2 = () => {
    setIsCheck(false);
    let countyinfo = [
      {
        totalelectricity: parseFloat(totalelectricity),
        totalgas: parseFloat(totalgas),
        totalwaste: parseFloat(totalwaste),
        totalvehicles: parseFloat(totalvehicles),
        totalwater: parseFloat(totalwater),
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
        setMessage(data.toLocaleString(undefined, {maximumFractionDigits:2}));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const getCo2Value = () => {
    let countyinfo = [
      {
        totalelectricity: parseFloat(totalelectricity),
        totalgas: parseFloat(totalgas),
        totalwaste: parseFloat(totalwaste),
        totalvehicles: parseFloat(totalvehicles),
        totalwater: parseFloat(totalwater),
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
        console.log("Successsss:", data);

        setSliderMessage(data.toLocaleString(undefined, {maximumFractionDigits:2}));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetchSelectedData();
  }, []);

  useEffect(() => {
    fetchInputVAlue();
  }, [value]);

  const fetchSelectedData = () => {
    let dataArray = [];
    let inputArrayValue = [];
    csv("/ca_counties_data.csv").then((counties) => {
      counties.map((val) => {
        inputArrayValue.push(val);
        dataArray.push({ label: val.County, value: val.County, id: val.id });
      });
      setInputArray(inputArrayValue);
      setCountiesOptions(dataArray);
    });
  };
  const valuetext = (value) => {
    console.log(value);
    let a = parseInt((value / 5000) * 100) + "%";
    console.log("a", a);
    return a;
  };
  const fetchInputVAlue = () => {
    inputArray.map((val) => {
      if (val.County === value) {
        setElectricty(Math.floor(val["Elec2- Total"]));
        setGas(Math.floor(val["Gas2- Total"]));
        setWaste(Math.floor(val["Waste- DisposalTon"]));
        setVehicles(Math.floor(val["Veh- Overall"]));
        setWater(Math.floor(val["Water"]));
      }
    });
  };
  return (
    <Grid fluid style={styles.Container}>
      <Row>
        <Col xs={12} style={styles.Item}>
          <h5>CO2 Emission based on consumption parameters </h5>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col xs={2} style={styles.Item}>
          <h5>County: </h5>
        </Col>
        <Col xs={4} style={{ display: "flex" }}>
          <SelectPicker
            value={value}
            onChange={(newValue, event) => {
              setValue(newValue);
            }}
            data={countiesOptions}
            style={{ width: 300 }}
          />
        </Col>
        <Col>
          <Row xs={8} style={styles.Item}>
            <h5> Current Estimate:<span>&nbsp;&nbsp;</span>{message} <span>&nbsp;</span> Metric Tons.</h5>
          </Row>
          <Row>
            {isCheck ? <h5>Predicted Estimate:<span>&nbsp;&nbsp;</span>  {sliderMessage} <span>&nbsp;</span>Metric Tons.</h5> 
            : null}
          </Row>
        </Col>
      </Row>
      <Row>
        <Divider />
      </Row>
      <Row className="show-grid">
        <Form layout="horizontal">
          <Form.Group controlId="electricity">
            <Form.ControlLabel style={styles.Item}>
              Electricity (GWh)
            </Form.ControlLabel>
            <Row>
              <Col md={8} xs={4}>
                {/* <Tooltip visible>{per}</Tooltip> */}
                <Tooltip title={elecricitySlider}>
                  <Slider
                    progress
                    min={0}
                    max={electricityMax}
                    step={100}
                    style={{ marginTop: 16, width: 400 }}
                    value={totalelectricity}
                    tooltip={false}
                    onChange={(value) => {
                      // setPer(parseInt((value / 50000) * 100) + "%");
                      setValue();
                      setElectricty(value);
                      setIsCheck(true);
                      getCo2Value();
                    }}
                  />
                </Tooltip>
              </Col>
              <Col md={4} xs={4}>
                <InputNumber
                  min={1000}
                  max={electricityMax}
                  style={{ width: 150 }}
                  value={totalelectricity.toLocaleString()}
                  onChange={(value) => {
                    setElectricty(value);
                  }}
                  readOnly
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId="gas">
            <Form.ControlLabel style={styles.Item}>
              {" "}
              Gas (MTherm){" "}
            </Form.ControlLabel>
            <Row>
              <Col md={8} xs={4}>
                <Tooltip title={gasSlider}>
                  <Slider
                    progress
                    max={gasMax}
                    min={100}
                    step={100}
                    style={{ marginTop: 16, width: 400 }}
                    value={totalgas}
                    tooltip={false}
                    onChange={(value) => {
                      setValue();
                      setIsCheck(true);
                      getCo2Value();
                      setGas(value);
                    }}
                  />
                </Tooltip>
              </Col>
              <Col md={4} xs={4}>
                <InputNumber
                  max={gasMax}
                  min={100}
                  step={10}
                  value={totalgas.toLocaleString()}
                  style={{ width: 150 }}
                  onChange={(value) => {
                    setSetVal(value);
                    setGas(value);
                  }}
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId="waste">
            <Form.ControlLabel style={styles.Item}>
              {" "}
              Waste (Tons){" "}
            </Form.ControlLabel>
            <Row>
              <Col md={8}>
                <Tooltip title={wasteSlider}>
                  <Slider
                    progress
                    min={100}
                    max={wasteMax}
                    step={100}
                    style={{ marginTop: 16, width: 400 }}
                    value={totalwaste}
                    tooltip={false}
                    onChange={(value) => {
                      setValue();
                      setIsCheck(true);
                      getCo2Value();
                      setWaste(value);
                    }}
                  />
                </Tooltip>
              </Col>
              <Col md={4}>
                <InputNumber
                  min={100}
                  max={wasteMax}
                  value={totalwaste.toLocaleString()}
                  style={{ width: 150 }}
                  onChange={(value) => {
                    setWaste(value);
                  }}
                  readOnly
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId="vehicles">
            <Form.ControlLabel style={styles.Item}>
              {" "}
              Vehicles{" "}
            </Form.ControlLabel>
            <Row>
              <Col md={8}>
                <Tooltip title={vehiclesSlider}>
                  <Slider
                    progress
                    min={100}
                    max={vehicleMAx}
                    tooltip={false}
                    step={100}
                    style={{ marginTop: 16, width: 400 }}
                    value={totalvehicles}
                    onChange={(value) => {
                      setValue();
                      setIsCheck(true);
                      getCo2Value();
                      setVehicles(value);
                    }}
                  />
                </Tooltip>
              </Col>
              <Col md={4}>
                <InputNumber
                  min={100}
                  max={vehicleMAx}
                  value={totalvehicles.toLocaleString()}
                  style={{ width: 150 }}
                  onChange={(value) => {
                    setVehicles(value);
                  }}
                  readOnly
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId="water">
            <Form.ControlLabel style={styles.Item}>
              {" "}
              Water (MGal)
            </Form.ControlLabel>
            <Row>
              <Col md={8}>
                <Tooltip title={waterSlider}>
                  <Slider
                    progress
                    min={100}
                    max={waterMax}
                    step={1}
                    tooltip={false}
                    style={{ marginTop: 16, width: 400 }}
                    value={totalwater}
                    onChange={(value) => {
                      setValue();
                      setIsCheck(true);
                      getCo2Value();
                      setWater(value);
                    }}
                  />
                </Tooltip>
              </Col>
              <Col md={4}>
                <InputNumber
                  min={0.1}
                  max={waterMax}
                  value={totalwater.toLocaleString()}
                  style={{ width: 150 }}
                  onChange={(value) => {
                    setWater(value);
                  }}
                  readOnly
                />
              </Col>
            </Row>
          </Form.Group>

        </Form>
      </Row>
    </Grid>
  );
}
