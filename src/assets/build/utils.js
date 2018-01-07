import fs from 'fs';
import path from 'path';

function getPages(_dir) {
    let distPages = process.env.DIST_PAGES;
    if (distPages) {
        return distPages.split(',');
    }
    return fs.readdirSync(_dir);
}

export function getEntries(_dir) {
    let entries = {};
    let pages = getPages(_dir);
    for (let page of pages) {
        let fn = path.resolve(_dir, `${page}/index.js`);
        if (fs.existsSync(fn)) {
            entries[page] = [fn];
        }
    }
    return entries;
}
