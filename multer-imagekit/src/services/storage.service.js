import dotenv from "dotenv";
dotenv.config();
import Imagekit from "imagekit";

let storageInstance = new Imagekit({
  publicKey: process.env.IMAGEKIT_PUB_KEY,
  privateKey: process.env.IMAGEKIT_PRI_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL,
});

export let sendToImageKit = async (file, fileName) => {
  let options = {
    file,
    fileName,
  };

  return await storageInstance.upload(options);
};
