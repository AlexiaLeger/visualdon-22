import * as d3 from 'd3';
import pib from '../data/income_per_person_gdppercapita_ppp_inflation_adjusted.csv';
import esperance from '../data/life_expectancy_years.csv';
import population from '../data/population_total.csv';
// Pour importer les données
// import file from '../data/data.csv'

//1. affichage des axes
const svg = d3.select('#monSvg');

const margin = { top: 10, right: 40, bottom: 10, left: 40 },
    width = 1000 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

svg.attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//2. PIB sur axe x
const tabPib2021 = pib.map(d => {
    return d['2021'];
})

//transforme tab pib
const pibTransformed = pib.map(d => {
    // Trouver le format SI (M, B, k)
    let SI = typeof d["2021"] === 'string' || d["2021"] instanceof String ? d["2021"].slice(-1) : d["2021"];
    // Extraire la partie numérique
    let number = typeof d["2021"] === 'string' || d["2021"] instanceof String ? parseFloat(d["2021"].slice(0, -1)) : d["2021"];
    // Selon la valeur SI, multiplier par la puissance
    switch (SI) {
        case 'M': {
            return Math.pow(10, 6) * number;
            break;
        }
        case 'B': {
            return Math.pow(10, 9) * number;
            break;
        }
        case 'k': {
            return Math.pow(10, 3) * number;
            break;
        }
        default: {
            return number;
            break;
        }
    }
})
//console.log(pibTransformed);
const maxPib = d3.max(pibTransformed);
const x = d3.scaleLinear()
    .domain([0, maxPib])
    .range([40, width])

svg.append('g')
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x)
        .ticks(20));

//3. Espérance sur axe y
const tabEsperance2021 = esperance.map(d => {
    return d['2021'];
})
//console.log(tabEsperance2021);
const y = d3.scaleLinear()
    .domain([40, d3.max(tabEsperance2021)])
    .range([height, 40])

svg.append('g')
    .attr("transform", "translate(" + margin.left + ",0)")
    .call(d3.axisLeft(y)
        .ticks(20));

//4. Cercle en fonction de la population

//tableau des pays
const tabPays = pib.map(d => {
    return d.country;
})

//transforme fichier csv population
const popTransformed = population.map(d => {
    // Trouver le format SI (M, B, k)
    let SI = typeof d["2021"] === 'string' || d["2021"] instanceof String ? d["2021"].slice(-1) : d["2021"];
    // Extraire la partie numérique
    let number = typeof d["2021"] === 'string' || d["2021"] instanceof String ? parseFloat(d["2021"].slice(0, -1)) : d["2021"];
    // Selon la valeur SI, multiplier par la puissance
    switch (SI) {
        case 'M': {
            return { "country": d.country, "pop": Math.pow(10, 6) * number };
            break;
        }
        case 'B': {
            return { "country": d.country, "pop": Math.pow(10, 9) * number };
            break;
        }
        case 'k': {
            return { "country": d.country, "pop": Math.pow(10, 3) * number };
            break;
        }
        default: {
            return { "country": d.country, "pop": number };
            break;
        }
    }
})
let tabTout = [];
for (let index = 0; index < popTransformed.length; index++) {
    let ligne = {
        "pib" : pibTransformed[index],
        "esperance" : tabEsperance2021[index],
        "population" : popTransformed[index].pop,
        "pays" : tabPays[index]
    }
    tabTout.push(ligne);
}

//console.log(tabTout);
//faire un tableau avec les trois tableau de données pour pouvoir y avoir accès ici
const groupe = svg.append('g');
groupe.selectAll('circle')
    .data(tabTout)
    .enter()
    .append('circle')
    .attr('r', d => d.population/10000000)
    .attr('cx', d => x(d.pib - margin.left))
    .attr('cy', d => y(d.esperance - margin.bottom))
    .attr('stroke', 'black')
    .attr('fill', 'white');
    