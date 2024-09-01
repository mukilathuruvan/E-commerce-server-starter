import https from "https";

import Otp from "../modules/otp/model.js";

export const generateRandomOTP = () => {
  const randomNum = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  const otp = randomNum.toString().padStart(6, "0");

  return {
    otp: Number(otp),
    expriryAt: Date.now() + 50,
  };
};

export const autoCleanExperiedOtps = async () => {
  setTimeout(async () => {
    await Otp.deleteMany({
      expriryAt: {
        $gt: Date.now(),
      },
    });
  }, 86400000);
};

export const smsSender = (mobile) => {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      Text: "Sample text",
      Number: "918925697069",
      SenderId: "SMSCountry",
      DRNotifyUrl: "https://www.domainname.com/notifyurl",
      DRNotifyHttpMethod: "POST",
      Tool: "API",
    });

    const options = {
      hostname: "restapi.smscountry.com",
      path: "/v0.1/Accounts/x5XLHNZZLw68e6TlClHKANd/SMSes/",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic eDVYTEhOWlpMdzY4ZTZUbENsSEsgQU5kOmllamptYm9icVBjTHZxY2JEMWtaQmxVQkRKbnlqbnZMZVc1TFJkVkg=",
      },
    };

    const req = https.request(options, (res) => {
      let responseData = "";

      res.on("data", (chunk) => {
        responseData += chunk;
      });

      res.on("end", () => {
        resolve(JSON.parse(responseData));
      });
    });

    req.on("error", (error) => {
      console.error("Error:", error);
      reject(error);
    });

    req.write(data);

    req.end();
  });
};
