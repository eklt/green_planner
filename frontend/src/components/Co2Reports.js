import React, { useEffect, useState } from "react";
import { Grid, Divider, Row, Col, FlexboxGrid, Form, Button,  SelectPicker ,Table} from "rsuite";
import Tabs from "./Tabs";
import { CsvToHtmlTable } from 'react-csv-to-table';
import Papa from 'papaparse';
import { csv } from "d3-fetch";

const restEndpoint = "http://54.177.46.243:5000/computeco2";
var ip ="";
export default function Co2Reports() {
 
  const [countyRankingArray,setCountyRankingArray] =useState([])
  const [countryArray,setCountryArray] = useState([])
  const [sortColumn, setSortColumn] = React.useState();
  const [sortType, setSortType] = React.useState();
  const [loading, setLoading] = React.useState(false);


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
      marginBottom:"25px"
    },
    tableheader: {
      fontSize: 14,
    },
  };
 
useEffect(()=>{
  fetchCountryData()
  fetchCounyData()
},[])

const fetchCountryData = () => {
  let inputArrayValue = [];
  csv("/country_data.csv").then((counties) => {
    counties.map((val) => {
      inputArrayValue.push(val);
    });
    setCountryArray(inputArrayValue);
  });
  
};

const fetchCounyData = () => {
  let inputArrayValue = [];
  csv("/county_ranking.csv").then((counties) => {
    counties.map((val) => {
      inputArrayValue.push(val);
    });
    setCountyRankingArray(inputArrayValue);
  });
  
};

const tableData = countryArray.filter((v, i) => i < countryArray.length);
  const getData = () => {
    if (sortColumn && sortType) {
      return tableData.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === 'number') {
          x = x.charCodeAt();
        }
        if (typeof y === 'number') {
          y = y.charCodeAt();
        }
        if (sortType === 'asc') {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    return tableData;
  };

  const countyRankingData  = countyRankingArray.filter((v, i) => i < countyRankingArray.length);
  const getCountyRankingDataData = () => {
    if (sortColumn && sortType) {
      return countyRankingData.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === 'number') {
          x = x.charCodeAt();
        }
        if (typeof y === 'number') {
          y = y.charCodeAt();
        }
        if (sortType === 'asc') {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    return countyRankingData;
  };
  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };


  return (
    <Grid fluid style={styles.Container}>
        <Row>
          <Col xs={7}  style={styles.Item}>
                  <h4>CO2 Emission Reports </h4>
          </Col>
        </Row>
      <br></br>
      <Tabs>
        <div label="California Counties">
        <Table
      height={380}
      headerHeight={60}
      data={getCountyRankingDataData()}
      sortColumn={sortColumn}
      sortType={sortType}
      onSortColumn={handleSortColumn}
      loading={loading}
      onRowClick={data => {
        console.log(data);
      }}
    >
      <Table.Column width={100} align="center" fixed sortable>
        <Table.HeaderCell style={styles.tableheader}>County</Table.HeaderCell>
        <Table.Cell dataKey="County" />
      </Table.Column>
      <Table.Column width={150} sortable>
        <Table.HeaderCell  height={50} style={styles.tableheader}><span>CO2 Emission<br/>&#40;MetricTons&#41;</span></Table.HeaderCell>
        <Table.Cell dataKey="pred_co2" />
      </Table.Column>
      <Table.Column width={150} sortable>
        <Table.HeaderCell style={styles.tableheader}><span>CO2perGDP$<br/>&#40;MetricTons&#41;</span></Table.HeaderCell>
        <Table.Cell dataKey="CO2perGDP" />
      </Table.Column>
      <Table.Column width={150} sortable>
        <Table.HeaderCell style={styles.tableheader}><span>CO2perCapita<br/>&#40;MetricTons&#41;</span></Table.HeaderCell>
        <Table.Cell dataKey="CO2perCapita" />
      </Table.Column>
      <Table.Column width={150} sortable>
        <Table.HeaderCell style={styles.tableheader}><span>CO2perArea(SqKm)<br/>&#40;MetricTons&#41;</span></Table.HeaderCell>
        <Table.Cell dataKey="CO2perArea" />
      </Table.Column>
      <Table.Column width={150} sortable>
        <Table.HeaderCell style={styles.tableheader}>EcoScore**</Table.HeaderCell>
        <Table.Cell dataKey="good_bad_ratio" />
      </Table.Column>

    </Table>
          {/* <CsvToHtmlTable
              data={cadata}
              csvDelimiter=","
              tableClassName="table table-striped table-hover"
            />        */}
        </div>
        <div label="Countries">
        <Table
      virtualized
      height={400}
      headerHeight={60}
      data={getData()}
      sortColumn={sortColumn}
      sortType={sortType}
      onSortColumn={handleSortColumn}
      loading={loading}
      onRowClick={data => {
        console.log(data);
      }}
    >
      <Table.Column width={200} align="center" fixed sortable>
        <Table.HeaderCell>Country</Table.HeaderCell>
        <Table.Cell dataKey="country" />
      </Table.Column>

      <Table.Column width={200} fixed sortable>
        <Table.HeaderCell><span>Co2 Emission<br/>&#40;MetricTons&#41;</span></Table.HeaderCell>
        <Table.Cell dataKey="co2" />
      </Table.Column>

      <Table.Column width={200} sortable>
        <Table.HeaderCell><span>GDP<br/>&#40;$&#41;</span></Table.HeaderCell>
        <Table.Cell dataKey="gdp" />
      </Table.Column>

      <Table.Column width={200} sortable>
        <Table.HeaderCell>Population</Table.HeaderCell>
        <Table.Cell dataKey="population" />
      </Table.Column>

      <Table.Column width={200}>
        <Table.HeaderCell><span>Area<br/>&#40;SqKm&#41;</span></Table.HeaderCell>
        <Table.Cell dataKey="area" />
      </Table.Column>
    </Table>
          {/* <CsvToHtmlTable
              data={worlddata}
              csvDelimiter=","
              tableClassName="table table-striped table-hover"
          />          */}
        </div>
        </Tabs>
    </Grid>
  );
}
