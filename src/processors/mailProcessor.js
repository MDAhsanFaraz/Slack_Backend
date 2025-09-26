import transporter from '../config/mailConfig.js';
import mailQueue from '../queues/mailQueue.js';

mailQueue.process(async (job) => {
  const emailData = job.data;
  console.log('processing emiail', emailData);
  try {
    const response = await transporter.sendMail(emailData);
    console.log('Email sent', response);
  } catch (error) {
    console.log('Error processing email ', error);
  }
});
// this is a consumer function that processes email jobs from the mail queue
// it uses the nodemailer transporter to send emails
//here we are using bull not bullmq to process data from queue and send mail throgh nodemailer
// mailQueue.process is the syntax used in bull to define a processor for the queue
