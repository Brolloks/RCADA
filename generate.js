const fs = require('fs');
const path = require('path');

const baseDir = './CNC-Raffle';
const filePath = path.join(baseDir, 'CNCAlaRaffle#000.metadata.json');
let rawdata = fs.readFileSync(filePath);
let jsondata = JSON.parse(rawdata);

// Function to recursively search for the 'Ticket:' field and update its value
function updateTicketValue(obj, i) {
    for(let prop in obj) {
        if(typeof obj[prop] === 'object') {
            updateTicketValue(obj[prop], i);
        } else if(prop === 'Ticket:') {
            obj[prop] = i;
        }
    }
}

for(let i = 1; i <= 600; i++) {
    let newdata = JSON.parse(JSON.stringify(jsondata)); // Deep copy of the original data
    updateTicketValue(newdata, i); // Update the 'Ticket:' value
    let filename = 'CNCAlaRaffle#' + ('000' + i).slice(-3) + '.metadata.json';
    let newFilePath = path.join(baseDir, filename);
    fs.writeFileSync(newFilePath, JSON.stringify(newdata, null, 2));
}

console.log('JSON files have been generated.');

