const fs = require('fs');
const { readdir } = require('fs/promises');
const path = require('path');

async function mergeInOne() {
    const pathToRoot = path.resolve('05-merge-styles');
    const pathToSrcDir = path.resolve(pathToRoot, 'styles');
    const pathToDistDir = path.resolve(pathToRoot, 'project-dist');

    try {
        const pathToBundle = path.resolve(pathToDistDir, 'bundle.css');
        const bundleStream = fs.createWriteStream(pathToBundle);

        const files = await readdir(pathToSrcDir, { withFileTypes: true });

        for (const file of files) {
            const pathToFile = path.resolve(pathToSrcDir, file.name);

            if (file.isFile() && path.extname(pathToFile) === '.css') {
                await new Promise((resolve, reject) => {
                    const readStream = fs.createReadStream(pathToFile, { encoding: 'utf8' });

                    readStream.pipe(bundleStream, { end: false });
                    readStream.on('end', resolve);
                    readStream.on('error', reject);
                });
            }
        }
        
        bundleStream.end();
        console.log('Ok! Script done!');
    } catch (err) {
        console.error('Error merging styles:', err);
    }
}

mergeInOne();