let nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ddhote780@gmail.com",
    pass: "mukklkraycsvdsuo",
  },
});

let sendMailTo = async (to, subject, html) => {
  let options = {
    from: "ddhote780@gmail.com",
    to,
    subject,
    html,
  };

  return await transporter.sendMail(options);
};

module.exports = sendMailTo;
