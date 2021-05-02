const express = require('express');
const cors = require('cors');
const { convertImage, downloadConvertedImage } = require('./processImage');

const app = express();

app.use(cors());

app.post('/', convertImage);
app.get('/download', downloadConvertedImage);


app.listen(process.env.PORT || 5000, () => console.log(`listening on port ${process.env.PORT} or 5000`));