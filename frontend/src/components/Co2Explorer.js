import React, { useState, useEffect } from "react";
import { csv } from "d3-fetch";
import { SelectPicker } from "rsuite";
import { Grid, Row, Col } from "rsuite";
import RoomIcon from "@mui/icons-material/Room";
import { CsvToHtmlTable } from 'react-csv-to-table';

export default function Co2Explorer() {
  const styles = {
    details: {
      minWidth: "250px",
      minHeight: "250px",
      backgroundColor: "lavender",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
  };
  const [countiesOptions, setCountiesOptions] = useState([]);
  const [value, setValue] = useState(countiesOptions[0]);
  const [inputValue, setInputValue] = useState([]);
  const [inputArray, setInputArray] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchInputVAlue();
  }, [value]);

  const fetchData = () => {
    let dataArray = [];
var inputArrayValue = [];

    csv("/unemployment-by-county-2017.csv").then((counties) => {
      counties.map((val) => {
        inputArrayValue.push(val);
        dataArray.push({ label: val.name, value: val.name});
      });
      setInputArray(inputArrayValue);
      setCountiesOptions(dataArray);
    });
  };
  const fetchInputVAlue = () => {
var detailsArray = [];

    inputArray.map((val) => {
      if (val.name === value) {
        detailsArray.push(
          "County: " + val.name,
          "CO2 emissions :" + val.co2
        );
      }
    });
    setInputValue(detailsArray);
    detailsArray = [];
  };
  return (
    <Grid fluid>
      {/* {console.log(inputArray)} */}
      <Row className="show-grid">
        <Col
          xsHidden
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <SelectPicker
            value={value}
            onChange={(newValue, event) => {
              setValue(newValue);
            }}
            data={countiesOptions}
            style={{ width: 300 }}
          />
        </Col>
        {inputValue.length ? (
          <Col
            xs={12}
            xs={12}
            style={{ display: "flex", justifyContent: "flex-start" }}
          >
            <div style={styles.details}>
              <div>
                <RoomIcon />
              </div>
              {inputValue.map((val, index) => (
                <div
                  key={index}
                  style={{ fontSize: "medium", fontWeight: "bold" }}
                >
                  {val}
                </div>
              ))}
            </div>
          </Col>
        ) : null}
      </Row>
    </Grid>
  );
}
