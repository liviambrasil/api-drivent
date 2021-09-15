import util from "util";
import redis from "redis";

export default function newClient() {
  const client = redis.createClient(process.env.REDIS_URL, {
    tls: {
      rejectUnauthorized: false,
    },
  });

  const get = util.promisify(client.get).bind(client);
  const set = util.promisify(client.set).bind(client);
  const endConnection = util.promisify(client.quit).bind(client);
  return {
    get,
    set,
    endConnection,
  };
}
