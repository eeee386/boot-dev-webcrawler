const {crawlPage, printReport} = require("./crawl");

function main(){
    if(process.argv.length !== 3) {
        console.error('Only one argument is valid')
    } else {
        console.info('Starting crawling...');
        const pages = {}

        crawlPage(process.argv[2], process.argv[2], pages).then(res => {
            printReport(pages);
        });
    }

}

main();
