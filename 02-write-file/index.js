const fs = require('fs');
const path = require('path');
const pathToNewFile = path.resolve('02-write-file', 'text-from-console.txt');
const readline = require('readline');
const initialText = 'Hello! Nice to meet you!\nPlease, enter your text: \n';
const closeText = 'Bye!!! See you next time!';
const writeStream = fs.createWriteStream(pathToNewFile);

const rl = readline.createInterface(
    process.stdin, 
    process.stdout
)

rl.setPrompt(initialText);
rl.prompt();

rl.on('line', (inputText) => {
    if (inputText === '.exit') {
        rl.close()
    } else {
        writeStream.write(inputText + '\n', false)
    }
})

rl.on('close', () => {
    console.log(closeText);
})

writeStream.on('error', (err) => {
    console.error('Error writing to file:', err.message);
});