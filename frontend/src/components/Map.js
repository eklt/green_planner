import React, { useState } from "react";
import {
  Grid,
  Divider,
  Row,
  Col,
  FlexboxGrid,
  Form,
  Button,
  Slider,
  InputNumber,
} from "rsuite";
import MapChart from "./MapChart";
import ReactTooltip from "react-tooltip";
export default function Map() {
  const [content, setContent] = useState("");
  const styles = {
    Item: {
      display: "flex",
      justifyContent: "left",
    },
    Container: {
      marginLeft: "100px",
    },
    value: {
      display: "flex",
      justifyContent: "center",
      alignItem: "center",
      marginTop: "5px",
    },
    header: {
      marginLeft: "0"
    },
  };
  return (
    <Grid fluid style={styles.Container}>
    <Row>
      <Col xs={12} style={styles.header}>
        <FlexboxGrid>
          <FlexboxGrid.Item>
            <h4>Carbon emissions in California and more...</h4>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Col>
    </Row>
    <Divider />
    <Row className="show-grid">
    <div style={{ width: "1500px",
     height: "650px" ,objectFit:"cover",
     objectPosition:"{10% 90% }",
     position:"center",
     display: "flex",
     justifyContent:"left"
    }}

     >
      <MapChart setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
    </div>
    </Row>
    </Grid>
  );
}
