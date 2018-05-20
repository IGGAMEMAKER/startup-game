import Channel from './Channel';

export default class ChannelManager {
  constructor(channels: Array, sessionId) {
    this.channels = channels;
    this.sessionId = sessionId;
  }

  getChannelById(channelId): Channel {
    const item = this.channels.find(c => c.getId() === channelId);

    if (!item) throw `no channel ${channelId} in session ${this.sessionId}`;

    return item;
  };






  grabClients(projectId, channelId) {
    this.getChannelById(channelId).grabClients(projectId, 40);
  }
}
