<<<<<<< HEAD
import * as puppeteer from "puppeteer";

(async () => {
    // Lancement browser
    const browser = await puppeteer.launch();
    //Ouvrir une nouvelle page
    const page = await browser.newPage();

    //Aller au lien wikipedia
    await page.goto('https://fr.wikipedia.org/wiki/Canton_(Suisse)#Donn%C3%A9es_cantonales');

    //Faire un screenshot
    const screen = await page.screenshot({ path: 'cantons.png', fullPage:true });
    console.log(screen);

    //Webscraper wikipedia
    //Sélecteurs
    //await page.$(table.wikitable td); // document.querySelector
    //await page.$$(sélecteur); // document.querySelectorAll
    // EXEMPLE : await page.$$(div);
     
    //Appliquer une fonction aux sélecteurs
    //await page.$$eval(sélecteur, pageFunction[...args]);
    // EXEMPLE : const divCount = await page.$$eval('div', (divs) => divs.length);

    // Fermer les browser
    await browser.close();
})();

//webscraper site e-commerce
=======
import jsdom from "jsdom";
import fetch from "isomorphic-fetch"
import puppeteer from "puppeteer"

>>>>>>> 33002473cc1fe9ac1760f63518f801ae49732448
