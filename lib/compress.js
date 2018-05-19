const brotli = require('brotli')
const fs = require('fs')
const chalk = require('chalk');
const recursive = require('recursive-readdir');

const brotliSettings = {
    extension: 'br',
    skipLarger: true,
    mode: 1, // 0 = generic, 1 = text, 2 = font (WOFF2)
    quality: 11,
    lgwin: 12
};

console.log('');
console.log(chalk.green.bold('[Brotly compress start]'));
console.log('------------------------------------');


async function compress() {
    const files = await new Promise((resolve, reject) => {
        recursive('dist', ['*.ttf', '.ico', '*.png', '*.jpg'], function (err, files) {
            return resolve(files);
        });
    });

    for (const file of files) {
        if (file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.html') || file.endsWith('.json')) {
            brotliSettings.mode = 1;
            const result = brotli.compress(fs.readFileSync(file), brotliSettings);
            fs.writeFileSync(file + '.br', result);
            console.log(chalk.yellow.bold('[Cжатие]', file, getFilesizeInBytes(file)));
        } else if (file.endsWith('.woff2')) {
            brotliSettings.mode = 2;
            console.log(chalk.yellow.bold('[Cжатие]', file));
            const result = brotli.compress(fs.readFileSync(file), brotliSettings);
            fs.writeFileSync(file + '.br', result);
        }
    }
}

function getFilesizeInBytes(filename) {
    const stats = fs.statSync(filename);
    const fileSizeInBytes = stats.size / 1024;

    const zipFile = fs.statSync(filename + '.br');
    const zipFileSizeInBytes = zipFile.size / 1024;

    const percent = (fileSizeInBytes - zipFileSizeInBytes) / zipFileSizeInBytes * 100;

    return `${fileSizeInBytes.toFixed(1)}kb -> ${zipFileSizeInBytes.toFixed(1)}kb`; //${percent.toFixed(1)}%
}

compress();
console.log('------------------------------------');
console.log(chalk.green.bold('[Brotly compress complete]'));