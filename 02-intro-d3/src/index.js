import * as d3 from 'd3';

// C'est ici que vous allez écrire les premières lignes en d3!

const cercle2 = d3.select('#cercle2')
cercle2.attr("fill", "green");

const cercle1=d3.select('#cercle1');
const cercle3=d3.select('#cercle3');
cercle1.attr('cx','100');
cercle3.attr('cx', '300');
