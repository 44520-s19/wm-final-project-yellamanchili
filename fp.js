
const puppeteer = require('puppeteer');
const fs = require("fs");

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto('https://www.premierleague.com/players?se=54&cl=-1');
    await page.setViewport({
        width: 1200,
        height: 800
    });

    await autoScroll(page);


    const html = await page.content();

    fs.writeFileSync("premireLeague_2016-2017.html", html)
    await page.screenshot({
        path: 'premireLeagueScreenshot.png',
        fullPage: true
    });

    await browser.close();
})();

async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}