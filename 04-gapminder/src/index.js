import * as d3 from 'd3'
import esperance from '../data/life_expectancy_years.csv';
import mapData from '../data/map.json'


let width = screen.availWidth;
let height = screen.availHeight - 100;

const svg = d3.select("svg").attr("width", width).attr("height", height);

// Map and projection
const projection = d3.geoMercator()
    .center([0, 10])
    .scale([width / (2 * Math.PI)])
    .translate([width / 2, height / 2]);

const pathGenerator = d3.geoPath().projection(projection);



// Data and color scale
const couleur = d3.scaleLinear().domain([50, 100])
    .range(["white", "green"])

// Load external data and boot
/* d3.queue()
    .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
    .defer(d3.csv, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world_population.csv", function(d) { data.set(d.code, +d.pop); })
    .await(ready);
 */

// Draw the map
svg.append("g")
    .selectAll("path")
    .data(mapData.features)
    .enter()
    .append("path")
    // draw each country
    .attr("d", pathGenerator)
    // set the color of each country
    .attr("fill", function(d) {
        const dataEsperance = getEsperance(d["properties"]["name"]);
        if (dataEsperance) {
            /* console.log(data);
            console.log(d["properties"]["name"])*/
            return couleur(dataEsperance);
        }
        return "red";
    });

function getEsperance(country) {
    try {
        const c = esperance.find((itmInner) => itmInner.country === country);
        return c["2021"];
    } catch (e) {
        //console.log(country);
        return null;
    }
}