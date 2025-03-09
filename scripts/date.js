const currentyear = new Date().getFullYear();

const year = document.querySelector('#currentYear');
year.textContent = currentyear;



const date = new Date()
const modified = document.querySelector('#lastModified');
modified.textContent = `Last updated: ${date.toLocaleString()}`;