import * as d3 from 'd3';

// C'est ici que vous allez écrire les premières lignes en d3!

const cercle2 = d3.select('#cercle2')
cercle2.attr("fill", "green");

const cercle1=d3.select('#cercle1');
const cercle3=d3.select('#cercle3');
cercle1.attr('cx','100');
cercle3.attr('cx', '300');

cercle1.append('text').attr('value', 'texte cercle1').attr('color','green');
cercle2.append('text').attr('value', 'texte cercle2').attr('color','green');
cercle3.append('text').attr('value', 'texte cercle3').attr('color','green');

cercle3.on("click", ()=>{
    cercle1.attr('cx', "100");
    cercle2.attr('cx', "100");
    cercle3.attr('cx', '100');
})

const data = [20, 5, 25, 8, 15];
const svg = d3.select("#svgRectangle")
.selectAll("rect")
.data(data)
.enter()
.append("rect")
.attr('x', '50')
.attr('y', '50')
.attr('width', '20')
.attr('heigth', d => data)
.attr('fill', 'green');