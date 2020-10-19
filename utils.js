const fs = require('fs');

function writeFileToData(filename, content) {
    return fs.writeFileSync(filename,
        JSON.stringify(content), 'utf-8',
        (err) => { console.log(err) }
    );
}


//we did this for reusability 
function getPostData(req) {
    return new Promise((resolve, reject) => {
        try {

            body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            });

            req.on('end', () => {
                resolve(body);
            });

        } catch (error) {
            console.log(error);
        }
    })
}

module.exports = {
    writeFileToData,
    getPostData
}