import '../processors/mailProcessor.js';

import mailQueue from '../queues/mailQueue.js';
// to run mail processor whenever mail is added to the queue we import mailProcessor
//if we used bullmq we did not need to import mailProcessor here as it would run automatically because of Worker in bull mq
export const addEmailtoMailQueue = async (emaildata) => {
  try {
    await mailQueue.add(emaildata);
    console.log('Email added to mail queue');
  } catch (error) {
    console.log('Add email to mail queue errro ', error);
  }
};
// this is a producer function that adds email data to the mail queue
// it takes emaildata as an argument and uses the add method of the mailQueue to enqueue the job
// if there's an error while adding the job to the queue, it catches the error and logs it to the console
// this function can be called whenever an email needs to be sent, and the actual sending will be handled by a separate consumer process
