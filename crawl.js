const {JSDOM} = require('jsdom');
function normalizeURL(url){
    let res = url;
    if(url.includes('://')){
        res = url.toLowerCase().split('://')[1];
    }
    return res[res.length-1] === '/' ? res.slice(0, -1) : res;
}

function getURLsFromHTML(dom) {
    const anchors = Array.from(dom.window.document.querySelectorAll('a'));
    return anchors.map(a => a.href);
}

async function crawlPage(baseURL, currentURL, pages) {
    const nb = normalizeURL(baseURL);
    if(currentURL[0] === '/'){
        currentURL = nb+currentURL;
    }
    let nc = normalizeURL(currentURL);
    if(nc === nb && pages[nb] !== undefined) {
        return;
    }
    if(pages[nc]){
        pages[nc]++;
    } else if(nc) {
        pages[nc] = 1;
    }
    if(nc?.slice(0, nb.length) !== nb){
        return;
    }
    let res;
    try{
        res = await fetch('https://' + nc, {
            method: 'GET',
        });
        if(res?.type === 'error'){
            console.error('Erroneus request');
            return;
        }
    } catch (e) {
        return;
    }
    if(res){
        const dom = new JSDOM(await res.text())
        const newUrls = getURLsFromHTML(dom);
        await Promise.all(newUrls.map(async e => await crawlPage(baseURL, e, pages)));
    }
}

function printReport(pages) {
    console.log('print is called');
    let sortable = [];
    for (let page in pages) {
        sortable.push([page, pages[page]]);
    }
    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });
    const rep = {};
    sortable.forEach(s => rep[s[0]] = s[1]);
    console.log(rep);
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage,
    printReport
}