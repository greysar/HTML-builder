const fs = require('fs/promises');
const path = require('path');

async function showFiles() {
    const pathToDir = path.resolve('03-files-in-folder', 'secret-folder');
    try {
        const files = await fs.readdir(pathToDir, { withFileTypes: true });
        for (const file of files) {
            if (file.isFile()) {
                const filePath = path.resolve(pathToDir, file.name);
                const stats = await fs.stat(filePath);
                const fileName = path.basename(file.name, path.extname(file.name));
                const fileExt = path.extname(file.name).slice(1);
                const fileSize = (stats.size / 1024).toFixed(3) + 'kb';
                console.log(`${fileName} - ${fileExt} - ${fileSize}`);
            }
        }
    } catch (err) {
        console.error('Error reading directory:', err);
    }
}

showFiles();