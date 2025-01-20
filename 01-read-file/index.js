const fs = require('fs');
const path = require('path');

const pathToFile = path.resolve('01-read-file' ,'text.txt');
const readStream = fs.createReadStream(pathToFile, {encoding: 'utf8'});

readStream.on('data',(data) => {
    console.log(data)
});

readStream.on('error', (err) => {
    console.log(err);
})

readStream.on('end', () => {
    console.log('Status:','Operation end!!!')
})