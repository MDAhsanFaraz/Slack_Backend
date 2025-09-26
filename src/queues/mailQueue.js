import Queue from 'bull';

import redisConfig from '../config/redisConfig.js';

export default new Queue('mailQueue', { redis: redisConfig });
// this creates a new queue named 'mailQueue' using Bull, with Redis configuration imported from redisConfig.js
// which can be used to add jobs related to sending emails
