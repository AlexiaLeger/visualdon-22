import * as d3 from 'd3';
import pib from '../data/income_per_person_gdppercapita_ppp_inflation_adjusted.csv';
import esperance from '../data/life_expectancy_years.csv';
import population from '../data/population_total.csv';
// Pour importer les données
// import file from '../data/data.csv'
//console.log(pib);
//1. affichage des axes
const svg = d3.select('#monSvg');

const margin = { top: 10, right: 40, bottom: 10, left: 40 },
    width = 1000 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

svg.attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//2. PIB sur axe x
const tabPib1800 = pib.map((d,i) => {
    return d[i];
})
const tabPays = pib.map(d =>{
    return d.country;
})
console.log(tabPib1800);
const x = d3.scaleBand()
    .domain([tabPib1800])
    .range([40, width])

svg.append('g')
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

const y = d3.scaleBand()
    .domain([0, 10,20,30,40,50,60,70,80,90])
    .range([height, 10])

svg.append('g')
    .attr("transform", "translate(" + margin.left + ",0)")
    .call(d3.axisLeft(y));




//3. Espérance sur axe y


//4. Cercle en fonction de la population


