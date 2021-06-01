const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    "428568904300-qr141kvg7m1mjnun6oc0nftikuuk3ifm.apps.googleusercontent.com",
    "4hOGAeAEqqieJpR7OCrRjhzD",
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token:
      "1//04YjnsPSMFPo1CgYIARAAGAQSNwF-L9IrYKCWRyo9hmiSewAnHMApHaUgAlDfg1V1he_0MP0O_hf3hCi7KkPoVa0Sh6ohcLI43zw",
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject("Failed to create access token :(");
      }
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "18521381@gm.uit.edu.vn",
      accessToken,
      clientId:
        "428568904300-qr141kvg7m1mjnun6oc0nftikuuk3ifm.apps.googleusercontent.com",
      clientSecret: "4hOGAeAEqqieJpR7OCrRjhzD",
      refreshToken: process.emitWarning.REFRESH_TOKEN,
    },
  });
  return transporter;
};

const sendEmail = async (emailOptions) => {
  let emailTransporter = await createTransporter();
  await emailTransporter.sendMail(emailOptions);
};

function createRemindEmail(mInfo) {
  return {
    subject: `Đăng ký khóa học`,
    text: `Số điện thoại ${mInfo.phone} muốn đăng ký khóa học ${mInfo.course} của bạn !`,
    to: "thailnv263@gmail.com",
    from: "18521381@gm.uit.edu.vn",
  };
}

const scheduleEmail = async (req, res, next) => {
  try {
    let emailMessage = createRemindEmail(req.body);
    await sendEmail(emailMessage)
      .then()
      .catch((err) => {
        console.log(err);
      });
    console.log("email scheduled");
    next();
  } catch (err) {
    console.log(err);
    next();
  }
};
module.exports = {
  scheduleEmail,
};
