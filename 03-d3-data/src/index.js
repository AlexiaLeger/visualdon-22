import * as d3 from 'd3';

//charger les données v1
const dataPost = d3.json('https://jsonplaceholder.typicode.com/posts').then(data => {

});
const dataUsers = d3.json('https://jsonplaceholder.typicode.com/users').then(data => {
    //console.log(data);
});;

//charger les données v2
Promise.all([
    d3.json('https://jsonplaceholder.typicode.com/posts'),
    d3.json('https://jsonplaceholder.typicode.com/users')
])
    .then(([posts, users]) => {
        const tabNbPost = [];
        const userIdTexteLong = 0;
        for (let index = 0; index < users.length; index++) {
            let titres_posts = [];
            const tabData = {
                nom_utilisateur: users[index].username,
                ville: users[index].address.city,
                nom_companie: users[index].company.name,
                titres_posts
            }
            for (let index2 = 0; index2 < posts.length; index2++) {d
                if (posts[index2].userId == users[index].id) {
                    titres_posts.unshift(posts[index2].title);
                }
                

            }
            
            tabNbPost[users[index].id] = tabData.titres_posts.length;
        }
        
    });