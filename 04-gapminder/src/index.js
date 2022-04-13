import * as d3 from 'd3'

//récupèration des données
import population from '../data/population_total.csv';
import pib from '../data/income_per_person_gdppercapita_ppp_inflation_adjusted.csv';
import esperance from '../data/life_expectancy_years.csv';

//marges
var margin = { top: 10, right: 20, bottom: 30, left: 50 },
    width = screen.availWidth - 100 - margin.left - margin.right,
    height = screen.availHeight - 300 - margin.top - margin.bottom;

//mets en forme le svg
const svg = d3.select('#population_income .graphique')
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

/*const pays = pib.map(d => {
    return d.country
});*/
//console.log(pays);


/*let datas2 = population.map(d =>{
    const name = pays[d];
    console.log(name);

    const p = pib.find((objet) => objet.country === name);
    const e = esperance.find((objet) => objet.country === name);

    let ligne = {};
    if (p && e) {
        ligne = {
            name: name,
            population: population[d],
            pib: p,
            esperance: e
        };
    }
    return ligne;
})*/

//récupération des données dans un seul tableau
let datas = [];
for (let i = 0; i < population.length; i++) {
    const name = population[i]["country"];

    const p = pib.find((objet) => objet.country === name);
    const e = esperance.find((objet) => objet.country === name);

    if (p && e) {
        datas.push({
            name: population[i]["country"],
            population: population[i],
            pib: p,
            esperance: e
        });
    }

}

let populationMin = 1000000000000000;
datas.forEach(country =>{
    for (const [key, v] of Object.entries(country.population)) {
        let valeur = nettoieDonnees(v);
        if (populationMin > valeur) populationMin = valeur;
    }
})

let populationMax = 0;

datas.forEach(country => {
    for (const [key, v] of Object.entries(country.population)) {
        let valeur = nettoieDonnees(v);
        if (populationMax < valeur) populationMax = valeur;
    }
});

let pibMinimum = 10000000;

datas.forEach(country => {
    for (const [key, v] of Object.entries(country.pib)) {
        let valeur = nettoieDonnees(v);
        if (pibMinimum > valeur) pibMinimum = valeur;
    }
 });


let pibMaximum = 0;
datas.forEach(country=> {
    for (const [key, v] of Object.entries(country.pib)) {
        let valeur = nettoieDonnees(v);
        if (pibMaximum < valeur) pibMaximum = valeur;
    }
});

let esperanceMax = 0;
datas.forEach(country=>{
    for (const [key, v] of Object.entries(country.esperance)) {
        let valeur = nettoieDonnees(v);
        if (esperanceMax < valeur) esperanceMax = valeur;
    }
})

// Axe x
var x = d3.scaleSqrt()
    .domain([pibMinimum, 128000])
    .range([0, width]);
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

// Axe y
var y = d3.scaleLinear()
    .domain([20, esperanceMax])
    .range([height, 0]);
svg.append("g")
    .call(d3.axisLeft(y));

// Scale pour la taille des cercles
var z = d3.scaleLinear()
    .domain([populationMin, populationMax])
    .range([1, 40]);


function afficheCercle(annee) {
    supprimeCercle();

    // Ajoute les cercles
    svg.append('g')
        .attr("id", "groupDot")
        .selectAll("dot")
        .data(datas)
        .join(
            enter => enter.append("circle")
                .attr("id", function (d) {
                    return d.name
                })

                .attr("cx", function (d) {
                    return x(nettoieDonnees(d.pib[annee]));
                })
                .attr("cy", function (d) {
                    return y(d.esperance[annee]);
                })
                .attr("r", function (d) {
                    return z(nettoieDonnees(d.population[annee]));
                })
                .attr("stroke", "green"),

            update => update
                .attr("cx", function (d) {
                    return x(nettoieDonnees(d.pib[annee]));
                })
                .attr("cy", function (d) {
                    return y(d.esperance[annee]);
                })
                .attr("r", function (d) {
                    return z(nettoieDonnees(d.population[annee]));
                })
        )
        .transition(d3.transition()
            .duration(500)
            .ease(d3.easeLinear))


}

afficheCercle(2021)


let annee = 1800;

document.getElementById("yearRange").min = annee;
document.getElementById("yearRange").max = 2050;

//animation
document.getElementById("yearRange").addEventListener("change", function (event) {
    clearTimeout(interval)
    afficheCercle(this.value);
    document.querySelector("label").innerText = this.value;
    annee = this.value;
    running = false;

})

let interval;

function lanceInterval() {

    interval = setInterval(() => {
        annee++;
        afficheCercle(annee);
        document.getElementById("yearRange").value = annee;
        document.querySelector("label").innerText = annee;

    }, 500);

}

let running = true;

d3.select("#play").on("click", function () {
    if (running) {
        clearTimeout(interval);
        document.getElementById("play").innerText = "Play";
        running = false;

    } else {
        lanceInterval()
        document.getElementById("play").innerText = "Pause";
        running = true;

    }
});

lanceInterval()

function supprimeCercle() {
    svg.select("#groupDot").remove()
}


function nettoieDonnees(data) {
    if (isNaN(data)) {
        if (data.includes("k")) {
            const n = data.split("k")[0];
            return Number.parseFloat(n) * 1000;
        } else if (data.includes("M")) {
            const n = data.split("M")[0];
            return Number.parseFloat(n) * 1000000;

        }
    }

    return data;
}