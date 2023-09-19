import nodemailer from 'nodemailer';

const htmlMarkup = `<table>
<tbody>
<tr>
    <td>Name</td>
    <td>{name}</td>
</tr>
<tr>
    <td>About</td>
    <td>{about}</td>
</tr>
<tr>
    <td>Eligibility</td>
    <td>{eligibility}</td>
</tr>
<tr>
    <td>Last Date</td>
    <td>{lastDateToApply}</td>
</tr>
<tr>
    <td colSpan=2><a href={link}>Apply here</a></td>
</tr>
</tbody>
</table>`

// Replace these with your email service details
const smtpConfig = {
  host: 'smtp.gmail.com',
  // host: 'smtp.example.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "fake123fake0981@gmail.com",
    pass: "cqnbbsyapgftarjw",
  },
};

const transporter = nodemailer.createTransport(smtpConfig);

const sendMail = async (body) => {
  try {
    const html = htmlMarkup
      .replace('{name}', body.name)
      .replace('{about}', body.about)
      .replace('{eligibility}', body.eligibility)
      .replace('{lastDateToApply}', body.lastDateToApply)
      .replace('{link}', body.link)
      .trim();
    
    const mailOptions = {
      from: 'fake123fake0981@gmail.com',
      to: '20501a05c1@pvpsit.ac.in',
      subject: 'New Notification update',
      html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(info.response);
  } catch (error) {
    console.error(error);
  }
};

export default sendMail;