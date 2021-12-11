import React, { memo, useState, useEffect } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import { csv } from "d3-fetch";
import { scaleQuantize } from "d3-scale";
import { SelectPicker } from "rsuite";
// const geoUrl ="https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";

const colorScale = scaleQuantize()
  .domain([1, 220000000])
  .range([
    "#ffedea",
    "#ffcec5",
    "#ffad9f",
    "#ff8a75",
    "#ff5533",
    "#e2492d",
    "#be3d26",
    "#9a311f",
    "#ccccdb",
  ]);

const rounded = (num) => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};

const mycsv = csv("/unemployment-by-county-2017.csv");
const getco2fromcsv = (id) => {
  console.log("countyid ", `${id}`);
  return mycsv.co2;
};


const MapChart = ({ setTooltipContent }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    csv("/unemployment-by-county-2017.csv").then((counties) => {
      setData(counties);
    });
  }, []);
  return (
    <>
      <ComposableMap
        projection="geoAlbersUsa"
        data-tip=""
        projectionConfig={{ scale: 800 }}
      >
        <ZoomableGroup zoom={1}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const cur = data.find((s) => s.id === geo.id);

                console.log(cur)
                const { NAME, POP_EST } = geo.properties;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={colorScale(cur ? cur.co2 : "#000000")}
                    onMouseEnter={() => {
                      // console.log("co2", `${cur ? cur.year :" "}`)
                      setTooltipContent(
                        `${geo.properties.name}— ${ cur.co2}`
                      );
                  
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
     
    </>
  );
};

export default memo(MapChart);
