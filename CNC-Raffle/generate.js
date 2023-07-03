const fs = require('fs');
const path = require('path');

const baseDir = './CNC-Raffle';
const filePath = path.join(baseDir, 'CNCAlaRaffle#000.metadata.json');
let rawdata = fs.readFileSync(filePath);
let jsondata = JSON.parse(rawdata);

for(let i = 1; i <= 600; i++) {
    let newdata = JSON.parse(JSON.stringify(jsondata));
    newdata['721']['<policy_id>']['<asset_name>']['3_Attributes/']['Ticket:'] = i;
    let filename = 'CNCAlaRaffle#' + ('000' + i).slice(-3) + '.metadata.json';
    let newFilePath = path.join(baseDir, filename);
    fs.writeFileSync(newFilePath, JSON.stringify(newdata, null, 2));
}

console.log('JSON files have been generated.');
