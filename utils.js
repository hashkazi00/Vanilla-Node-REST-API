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
            req.on('data', (chunk) => { //req is a stream and it inherits from the EventEmitter by default, so we can listen to the data event on it also note that the chunk comes from stream 
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

function replaceTemplate(card, data) { //a reusable function that can be used for all our pages, note that if the regex fails to match we just skip

    let output = card; //Good functional programming practice to not directly change recd. data.

    //replace the placeholder(s) in the file one by one.
    output = output.replace(/{%TITLE%}/g, data.title);
    output = output.replace(/{%PRICE%}/g, data.price);
    output = output.replace(/{%ID%}/g, data.id);
    output = output.replace(/{%DESCRIPTION%}/g, data.description);

    return output;
}

module.exports = {
    writeFileToData,
    getPostData,
    replaceTemplate
}