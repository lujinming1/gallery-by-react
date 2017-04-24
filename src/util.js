function getImageURL(imageDatasArr){
  for(var i = 0, j = imageDatasArr.length; i < j; i++){
    var singleImageData = imageDatasArr[i];
    singleImageData.imageURL = require('./images/'
      + singleImageData.filename);

      imageDatasArr[i] = singleImageData;
  }

  return imageDatasArr;
}

export default getImageURL;
