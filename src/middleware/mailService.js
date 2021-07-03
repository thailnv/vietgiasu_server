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

function createConfirmEmail(mInfo) {
  console.log(mInfo.tutor_email);
  return {
    subject: `Xác nhận dạy hoc`,
    to: mInfo.tutor_email,
    from: `Gia sư Việt <18521381@gm.uit.edu.vn>`,
    html: `<div style="text-align: center">Khóa học "<strong>${mInfo.course_name}</strong>" vừa có học viên đăng ký.Vui lòng nhấn vào nút dưới đây để xác nhận hoặc từ chối.
  </div>
  <a style="display:block; width: fit-content; font-weight: bold;
  margin: auto; padding: 8px; text-decoration: none;
  margin-top: 0.5em; color: white; border-radius: 4px;
  text-align: center; background: coral;"
    href="${mInfo.confirmLink}">CHI TIẾT</a>`,
  };
}

function createCancelEmail(mInfo) {
  console.log(mInfo.tutor_email);
  return {
    subject: `Đăng ký không thành công`,
    to: mInfo.tutor_email,
    from: `Gia sư Việt <18521381@gm.uit.edu.vn>`,
    html: `<div style="text-align: center">Khóa học "<strong>${mInfo.course_name}</strong>" đăng ký không thành công. Gia sư đã từ chối dạy học. 
    Chúng tôi xin lỗi vì sự bất tiện này.</div>`,
  };
}

const sendOrderEmail = async (req, res, next) => {
  try {
    let emailMessage = createConfirmEmail(req.body);
    await sendEmail(emailMessage)
      .then()
      .catch((err) => {
        console.log(err);
      });
    console.log("email sent");
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: "Có lỗi xảy ra vui lòng thử lại sau",
    });
  }
};

const sendCancelEmail = async (req, res, next) => {
  try {
    let emailMessage = createCancelEmail(req.body);
    await sendEmail(emailMessage)
      .then()
      .catch((err) => {
        console.log(err);
      });
    console.log("email sent");
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: "Có lỗi xảy ra vui lòng thử lại sau",
    });
  }
};

module.exports = {
  sendOrderEmail,
  sendCancelEmail,
};
