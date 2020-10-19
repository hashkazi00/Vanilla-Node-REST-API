const fs = require('fs');

function writeFileToData(filename, content) {
    return fs.writeFileSync(filename,
        JSON.stringify(content), 'utf-8',
        (err) => { console.log(err) }
    );
}

module.exports = {
    writeFileToData
}