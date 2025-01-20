const fs = require('fs');
const { mkdir, copyFile, readdir, unlink, stat } = require('fs/promises');
const path = require('path');

async function copyDir() {
    const pathToRoot = path.resolve('04-copy-directory');
    const pathToOrgDir = path.resolve(pathToRoot, 'files');
    const pathToCopyDir = path.resolve(pathToRoot, 'files-copy');

    try {
        await mkdir(pathToCopyDir, { recursive: true });

        const files = await readdir(pathToOrgDir, { withFileTypes: true });
        const filesCopy = await readdir(pathToCopyDir, { withFileTypes: true });

        for (let file of files) {
            const pathToFile = path.resolve(pathToOrgDir, file.name);
            const pathToCopyFile = path.resolve(pathToCopyDir, file.name);

            if (file.isFile()) {
                try {
                    const orgFolderFileStats = await stat(pathToFile);
                    const copyFolderFileStats = await stat(pathToCopyFile);

                    if (orgFolderFileStats.mtime > copyFolderFileStats.mtime) {
                        await copyFile(pathToFile, pathToCopyFile);
                        console.log(`Updated: ${file.name}`);
                    }
                } catch (err) {
                    await copyFile(pathToFile, pathToCopyFile);
                    console.log(`Copied: ${file.name}`);
                }
            }
        }

        for (let file of filesCopy) {
            const pathToCopyFile = path.resolve(pathToCopyDir, file.name);
            const pathToOrgFile = path.resolve(pathToOrgDir, file.name);

            if (!files.some(item => item.name === file.name)) {
                await unlink(pathToCopyFile);
                console.log(`Deleted: ${file.name}`);
            }
        }

        console.log('Ok! Script done!');
    } catch (err) {
        console.error('Error reading or copying files:', err);
    }
}

copyDir();