// Imports the Google Cloud client library
var vision = require('@google-cloud/vision');
require("dotenv").config();

// Creates a client
var client = new vision.ImageAnnotatorClient({
  projectId: "lazyfood-193118",
  credentials: {
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.GOOGLE_CLIENT_EMAIL
  }
});

// Performs label detection on the image file
function labelDetection (imageURL, cb) {
  var labelsArr = [];
  client
  .labelDetection(imageURL)
  .then(results => {
    var labels = results[0].labelAnnotations;
    for (var i = 0; i < 5; i++) {
      labelsArr.push(labels[i].description);
    }
    cb(labelsArr);
    // console.log('Labels:');
    // labels.forEach(label => console.log(label.description));
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
}

module.exports = {
  labelDetection: labelDetection
} 


