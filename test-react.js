import { JSDOM } from 'jsdom';
import fs from 'fs';

const dom = new JSDOM(`<!DOCTYPE html><div id="root"></div>`, {
  url: "http://localhost/",
  runScripts: "dangerously"
});

const window = dom.window;
const scriptContent = fs.readFileSync('v-bundle.js', 'utf8');

window.console.error = function(...args) {
    console.error("REACT ERROR:", ...args);
}
window.console.warn = function(...args) {
    console.warn("REACT WARN:", ...args);
}

try {
    const script = window.document.createElement("script");
    script.textContent = scriptContent;
    window.document.body.appendChild(script);
} catch(e) {
    console.error("SCRIPT EXEC ERROR:", e);
}

setTimeout(() => {
    console.log("ROOT CONTENT:", window.document.getElementById('root').innerHTML.substring(0, 200));
}, 1000);
