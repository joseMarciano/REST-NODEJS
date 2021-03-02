const fs = require('fs');
const pathNode = require('path');


module.exports = (path, fileName, callBackCreatedImage) => {
    const validTypes = [
        'jpg',
        'png',
        'jpeg'
    ];
    const fileType = pathNode.extname(path);
    const typeIsValid = validTypes.indexOf(fileType.substring(1)) !== -1;
    const fileNamePath = `./assets/images/${fileName.replace(/\s+/g, '')}${fileType}`;
    fs.createReadStream(path)
        .pipe(fs.createWriteStream(fileNamePath))
        .on('finish', () => callBackCreatedImage(fileNamePath));
}