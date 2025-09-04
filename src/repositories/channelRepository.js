import Channel from '../schema/channel.js';
import crudRepository from './crudRepository.js';

const channelRepository = {
  ...crudRepository(Channel),
  getChannelWithWorspaceDetails: async function (channelId) {
    //console.log('---------------->', channelId);
    const channel = await Channel.findById(channelId).populate('workspaceId');
    return channel;
  }
};

export default channelRepository;
