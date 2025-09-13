// deviceInfo.js
import FingerprintJS from '@fingerprintjs/fingerprintjs';

const getDeviceInfo = async () => {
  const fp = await FingerprintJS.load();
  const result = await fp.get();

  const userAgent = navigator.userAgent;
  let os = "Unknown OS";
  let identifierType = "Unknown Identifier";

  if (/Windows/i.test(userAgent)) {
    os = "Windows";
    identifierType = "Windows Device";
  } else if (/Macintosh|Mac/i.test(userAgent)) {
    os = "Mac";
    identifierType = "Mac Device";
  } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
    os = "iOS";
    identifierType = "iOS Device";
  } else if (/Android/i.test(userAgent)) {
    os = "Android";
    identifierType = "Android Device";
  } else if (/Linux/i.test(userAgent)) {
    os = "Linux";
    identifierType = "Linux Device";
  }

  return {
    deviceId: result.visitorId,
    os: os,
    identifierType: identifierType
  };
};

export default getDeviceInfo;
