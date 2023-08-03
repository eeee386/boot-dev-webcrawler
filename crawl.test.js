const {test, expect} = require("@jest/globals");
const {normalizeURL, getURLsFromHTML} = require("./crawl");
const {JSDOM} = require('jsdom');

test('should create normalized urls, from different urls', () => {
    const nu1 = normalizeURL('https://wagsLane.Dev/path');
    const nu2 = normalizeURL('https://wagslane.dev/path/');
    const nu3 = normalizeURL('https://wagsLane.Dev/path');
    const nu4 = normalizeURL('http://wagslane.dev/path');
    expect(nu1).toBe('wagslane.dev/path');
    expect(nu2).toBe('wagslane.dev/path');
    expect(nu3).toBe('wagslane.dev/path');
    expect(nu4).toBe('wagslane.dev/path');
});

test('should get urls from HTML', () => {
    const dom = new JSDOM('<html><body><a href="https://lol.com">LOL</a><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a></body></html>');
    expect(getURLsFromHTML(dom)).toEqual(['https://lol.com/', 'https://blog.boot.dev/']);


})