const express = require('express');
const cors = require('cors');
const { convertImage, downloadConvertedImage } = require('./processImage');

const app = express();

app.use(cors());

app.post('/', convertImage);
app.get('/download', downloadConvertedImage);


app.listen(5000, () => console.log('listening on port 5000'));