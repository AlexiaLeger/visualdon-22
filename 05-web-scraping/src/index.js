import puppeteer from "puppeteer";
import { JSDOM } from 'jsdom';
import fetch from "isomorphic-fetch"

(async () => {
    // Lancement browser
    const browser = await puppeteer.launch();
    //Ouvrir une nouvelle page
    const page = await browser.newPage();

    //Aller au lien wikipedia
    await page.goto('https://fr.wikipedia.org/wiki/Canton_(Suisse)#Donn%C3%A9es_cantonales');

    //Faire un screenshot
    const screen = await page.screenshot({ path: '05-web-scraping\\cantons.png', fullPage: false });
    console.log(screen);

    // Fermer les browser
    await browser.close();
})();

//recupérer les cantons
(async () => {
    const response = await fetch('https://fr.wikipedia.org/wiki/Canton_(Suisse)#Donn%C3%A9es_cantonales');
    const text = await response.text();
    const dom = new JSDOM(text);
    const cantons = dom.window.document.querySelectorAll("table.wikitable tr");
    for (const canton of cantons) {
        try {
            const nom = canton.querySelector("td a").textContent;
            const pop = canton.querySelector("td bdi").textContent;
            //console.log("Cantons : " + nom + ", Population : " + pop);
        } catch (error) { }
    }
})();


//webscraper site e-commerce
(async () => {
    const response = await fetch('https://www.webscraper.io/test-sites/e-commerce/allinone/computers/laptops');
    const text = await response.text();
    const dom = new JSDOM(text);
    const produits = dom.window.document.querySelectorAll("div.thumbnail ");
    for (const produit of produits) {
        try {
            const ligne = {
                "produit" : produit.querySelector("div.caption h4 a").textContent,
                "prix" : produit.querySelector("div.caption h4").textContent,
                "etoiles" : produit.querySelectorAll("div.ratings p span").length
            }
            console.log(ligne);
        } catch (error) {}   
    }
})()