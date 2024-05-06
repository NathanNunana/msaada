import { Channel, connect } from "amqplib";

export class MessageBroker {
  MSG_QUEUE_URL: string;
  EXCHANGE: string;
  QUEUE_NAME: string;
  SERVICE: string;

  constructor(exchange: string, msg_queue_url: string, queue_name: string, service: string) {
    this.EXCHANGE = exchange;
    this.MSG_QUEUE_URL = msg_queue_url;
    this.QUEUE_NAME = queue_name;
    this.SERVICE = service;
  }

  // create a Channel
  async createChannel(): Promise<Channel | null> {
    try {
      const conn = await connect(this.MSG_QUEUE_URL);
      const chan = await conn.createChannel();
      chan.assertExchange(this.EXCHANGE, "direct", { durable: true });
      return chan;
    } catch (err) {
      return null;
    }
  }

  // The service is the destination for the message or data
  async publishMessage(
    chan: Channel,
    service: string,
    data: string
  ): Promise<void> {
    chan.publish(this.EXCHANGE, service, Buffer.from(data));
    console.log("Sent: ", data);
  }

  // subscribe to messages
  async subscribeMessage(chan: Channel): Promise<void> {
    chan.assertExchange(this.EXCHANGE, "direct", { durable: true });
    const q = await chan.assertQueue(this.QUEUE_NAME, { durable: true });
    console.log(` Waiting for messages in queue: ${q.queue}`);
    chan.bindQueue(q.queue, this.EXCHANGE, this.SERVICE);
    chan.consume(
      q.queue,
      (message) => {
        if (message?.content) {
          console.log(message.content.toString());
        }
      },
      { noAck: true }
    );
  }
}
