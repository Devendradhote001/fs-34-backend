let ImageKit = require("imagekit");

let storageInstance = new ImageKit({
  publicKey: process.env.IK_PUB_KEY,
  privateKey: process.env.IK_PRI_KEY,
  urlEndpoint: process.env.IK_URL,
});

let sendToIK = async (file, fileName) => {
  try {
    let options = {
      file,
      fileName,
      folder:'fs-34'
    };

    return await storageInstance.upload(options);
  } catch (error) {
    console.log("error in upload funtion", error);
  }
};

module.exports = sendToIK;
