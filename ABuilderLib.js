const fs    = require('fs');
const path  = require('path');
const [,, libsource, libres] = process.argv;

if (libsource && libres) {
    fs.readFile(path.join(__dirname, `${libsource}.json`), 'UTF-8', async function(err, oSource) {
        if (err) throw err;
        oSource = parseStructure(JSON.parse(oSource));
        let oRes = parseStructure(JSON.parse(fs.readFileSync(path.join(__dirname, `${libres}.json`), 'UTF-8')));
        for (let key in oSource) {
            if (oSource[key].length == 0) continue;
            if (oRes[key]) {
                oSource[key].forEach(item => {
                    if (!oRes[key].includes(item)) oRes[key].push(item);
                });
                continue;
            }
            oRes[key] = oSource[key];
        }
        fs.writeFile(`${libres}.json`, JSON.stringify(setStructure(objectSort(oRes)), null, '\t'), function(error){
            if(error) throw error;
        });
    });
}

function parseStructure (oValue) {
    for (let key in oValue) {
        if (typeof(oValue[key]) == "string") {
            oValue[key] = oValue[key] != ""? [oValue[key]]: [];
        }
    }
    return oValue;
}

function setStructure (oValue) {
    for (let key in oValue) {
        if (Array.isArray(oValue[key]) && oValue[key].length <= 1) {
            oValue[key] = oValue[key].length == 0? "": oValue[key][0];
        }
    }
    return oValue;
}

function objectSort(oValue) {
    let a = [];
    for (let key in oValue) {
        a.push(key);
    }
    a = a.sort();
    let oRes = {};
    a.forEach(key => {
        oRes[key] = oValue[key];
    });
    return oRes;
}