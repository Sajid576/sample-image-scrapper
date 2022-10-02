var fs = require('fs');
const request = require('request');

const basePath = 'https://fastly-production.24c.in/webin/360';

var download = function (uri, filename, callback) {
  request.head(uri, function (err, res, body) {
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

function downloadAllImages() {
  for (let i = 1; i < 75; i++) {
    download(`${basePath}/output_${i}.jpeg`, `output_${i}.jpeg`, function () {
      console.log(i, 'th image downloaded');
    });
  }
}

downloadAllImages();
