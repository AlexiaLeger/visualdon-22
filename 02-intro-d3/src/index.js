import * as d3 from 'd3';

// C'est ici que vous allez écrire les premières lignes en d3!

const cercle2 = d3.select('#cercle2')
cercle2.attr("fill", "green");

const cercle1=d3.select('#cercle1');
const cercle3=d3.select('#cercle3');
cercle1.attr('cx','100');
cercle3.attr('cx', '300');

const svgCercle = d3.select('#monsvg');
svgCercle.append('text').text('texte cercle 1').attr('x',60).attr('y',100);
svgCercle.append('text').text('texte cercle 2').attr('x',100).attr('y',200);
svgCercle.append('text').text('texte cercle 3').attr('x',250).attr('y',300);


cercle3.on("click", ()=>{
    cercle1.attr('cx', "100");
    cercle2.attr('cx', "100");
    cercle3.attr('cx', '100');
})

const data = [20, 5, 25, 8, 15];
const largeur = 20;
const svg = d3.select("#svgRectangle");
svg.selectAll("rect")
.data(data)
.enter()
.append("rect")
.attr('x', (d,i) => (i*23+50))
.attr('y', d => 500-d)
.attr('width', largeur)
.attr('heigth', d => d)
.attr('fill', 'green')
.attr('stroke', 'black');