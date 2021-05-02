const sharp = require('sharp');
var os = require("os");
var multiparty = require('multiparty');

const formDataParser = (req, res) => {
    return new Promise((resolve, reject) => {
        var form = new multiparty.Form();
        form.parse(req, function(err, fields, files) {
            if (err) reject(err)
            resolve({fields, files})
        });
    })
}

const downloadConvertedImage = (req, res) => {
    const filename = req.query.filename
    res.status(200).sendFile(__dirname + '/' + filename)
}

const convertImage = (req, res) => {
    formDataParser(req, res).then(data => {
        const resolution = data.fields.resolution[0]
        const [img_width, img_height] = resolution.split('x')
        sharp(data.files.file[0].path)
            .resize(+img_width, +img_height)
            .toFile(__dirname + '/converted_' + data.files.file[0].originalFilename, (err, info) => { 
                if (err) return res.status(500).send({'Error': 'Something went wrong, please try again later.'})
                else {
                    console.log(`Thumbnail Generated.`);
                    return res.send({'url':`https://${req.headers.host}/download?filename=converted_${data.files.file[0].originalFilename}`})
                }
                });
    }).catch(err => res.status(500).send({'Error': 'Something went wrong, please try again later.'}))
}

module.exports = {
    convertImage, 
    downloadConvertedImage
}


