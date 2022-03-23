import * as d3 from 'd3';

//charger les données v1
const dataPost = d3.json('https://jsonplaceholder.typicode.com/posts').then(data => {

});
const dataUsers = d3.json('https://jsonplaceholder.typicode.com/users').then(data => {
    //console.log(data);
});;

//mise en page des échelles et des axes
const margin = { top: 10, right: 40, bottom: 10, left: 40 },
    width = 600 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
const svg = d3.select('#monSvg');
svg.attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
/*.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");*/
const x = d3.scaleLinear()
    .domain([0, 100])
    .range([40, width])
svg.append('g')
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
const y = d3.scaleLinear()
    .domain([0, 100])
    .range([height, 10])
svg.append('g')
    .attr("transform", "translate("+margin.left+",0)")
    .call(d3.axisLeft(y));

//charger les données v2
Promise.all([
    d3.json('https://jsonplaceholder.typicode.com/posts'),
    d3.json('https://jsonplaceholder.typicode.com/users')
])
    .then(([posts, users]) => {
        //1. nouvel objet
        let result1 = users.map(usr => {
            let posts_filtered = posts.filter(post => post.userId === usr.id);
            let newObject = {
                'nom_utilisateur': usr.name,
                'ville': usr.address.city,
                'titres_posts': posts_filtered.map(post => post.title)
            }
            return newObject;
        })
        //console.log(result1);

        //2. nombre de post par user
        let result2 = users.map(usr => {
            let posts_filtered = posts.filter(post => post.userId === usr.id);
            let newObject = {
                'nom_utilisateur': usr.name,
                'nombrePost': posts_filtered.length,
                'id_utilisateur': usr.id
            }
            //4. affiche le graphique
            svg.append("rect").attr("x", 40 + 20 * usr.id).attr("y", 10);
            svg.selectAll("rect")
                .attr('fill', '#69a3b2')
                .attr('stroke', 'black')
                .attr('width', 10)
                .attr('height', 40 * posts_filtered.length);
            return newObject;
        })
        console.log(result2);

        //3. user qui a écrit le plus long body
        let result3 = users.map(usr => {
            let posts_filtered = posts.filter(post => post.body.lenght === Math.max(post));
            let newObject = {
                'nom_utilisateur': usr.name,
                'longueurTexte': posts_filtered
            }
            return newObject;
        })
        //console.log(result3);

        //5. Etiquettes
        result2.map(usr => {
            svg.select('rect')
                .append('text')
                .text(result2.nombrePost)
                .attr('x', 20 * result2.id_utilisateur)
                .attr('y', 450)
                .attr('stroke', 'black');
        })

    });

/*const tabNbPost = [];
let tabData = {};

//je prends les users je map (créer un nouveau tableau avec les mêmes lignes mais les attributs modifié), donc je vais changer les infors que j'ai besoin, créer une nouvelle variable titres user où je vais filter les postes de suser
//user.map : itère dans mes users, titres postes : poste filter

//mets les données dans l'objet
for (let index = 0; index < users.length; index++) {
    let titres_posts = [];
    tabData = {
        nom_utilisateur: users[index].username,
        ville: users[index].address.city,
        nom_companie: users[index].company.name,
        titres_posts
    }
    let max = 0;
    let idMax = 0;
    let min = 100000000000;
    let idMin = 0;
    for (let index2 = 0; index2 < posts.length; index2++) {

        //mets les titres des postes dans l'objet
        if (posts[index2].userId == users[index].id) {
            titres_posts.unshift(posts[index2].title);
        }

        //regarde qui a le body le plus long
        if (posts[index2].body.length <= min) {
            min = posts[index2].body.length;
            idMin = posts[index2].userId;
        } else {
            if (posts[index2].body.length >= max) {
                max = posts[index2].body.length;
                idMax = posts[index2].userId;
            }
        }
    }
/*
    //calcule le nombre de poste par user
    tabNbPost[users[index].id] = tabData.titres_posts.length;
    svg.append("rect").attr("x", index * users[index].id).attr("y", 10);
    svg.select("rect")
        .attr('fill', '#69a3b2')
        .attr('stroke', 'black')
        .attr("width", 5)
        .attr('height', tabData[index].titres_posts.length);
}
        //x et y : position du départ de rectangle
        //width et heigth : largeur et longueur du rectangle*/