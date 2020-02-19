const fs    = require('fs');
const path  = require('path');
const JSZip = require('jszip');
const [,, file, lib] = process.argv;

fs.readFile(path.join(__dirname, `${file}.docx`), async function(err, sData) {
    if (err) throw err;
    const zip = await JSZip.loadAsync(sData);    
    const sContent = await zip.file('word/document.xml').async("string");
    const oLib = lib? await JSON.parse(fs.readFileSync(path.join(__dirname, `${lib}.json`), 'UTF-8')): undefined;
    const oRes = getTextAbbreviation(sContent, oLib);
    fs.writeFile('result.json', JSON.stringify(oRes, null, '\t'), function(error){
        if(error) throw error;
    });
    fs.writeFile('result.txt', defStringify(oRes), function(error){
        if(error) throw error;
    });
});

// Поиск по файлу sContent и создание массива аббревиатур с учетом готовых oLib
function getTextAbbreviation (sContent, oLib) {
    let oRes = {};
    sContent.match(/[^А-Яа-я0-9_]([А-Я][А-Я]+[0-9]*)[^А-Яа-я0-9_]/g).map(sValue => sValue.slice(1, sValue.length - 1)).sort()
    .forEach(sValue => {
        oRes[sValue] = oLib? (oLib[sValue]? oLib[sValue]: ""): "";
    });
    return oRes;
}

function defStringify (oDefinitions) {
    let sRes = '';
    for (let sDefine in oDefinitions) {
        sRes += `${sDefine}\t-\t${oDefinitions[sDefine]};\n`;
    }
    return `${sRes.slice(0, sRes.length - 2)}.`;
}