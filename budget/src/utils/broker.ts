import { Channel, connect } from "amqplib";
import { MSG_QUEUE_URL, EXCHANGE, BUDGET_SERVICE, BUDGET_QUEUE } from "../config/secrets";

export class MessageBroker {
  // create a channel
  async createChannel(): Promise<Channel | null> {
    try {
      const conn = await connect(MSG_QUEUE_URL);
      const chan = await conn.createChannel();
      chan.assertExchange(EXCHANGE, "direct", { durable: true });
      return chan;
    } catch (err) {
      console.log(err)
      return null;
    }
  }

  // The service is the destination for the message or data
  async publishMessage(
    chan: Channel,
    service: string,
    data: string
  ): Promise<void> {
    chan.publish(EXCHANGE, service, Buffer.from(data));
    console.log("Sent: ", data);
  }

  // subscribe to messages
  async subscribeMessage(chan: Channel): Promise<void> {
    chan.assertExchange(EXCHANGE, "direct", { durable: true });
    const q = await chan.assertQueue(BUDGET_QUEUE, { durable: true });
    console.log(` Waiting for messages in queue: ${q.queue}`);
    chan.bindQueue(q.queue, EXCHANGE, BUDGET_SERVICE);
    chan.consume(
      q.queue,
      (message) => {
        if (message?.content) {
          console.log(message.content);
          return message.content;
        }
      },
      { noAck: true }
    );
  }
}
