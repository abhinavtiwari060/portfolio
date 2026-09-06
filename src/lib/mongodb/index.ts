import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/abhinav_portfolio";
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || "abhinav_portfolio";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectToDatabase(): Promise<typeof mongoose | null> {
  if (cached.conn && cached.conn.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      dbName: MONGODB_DB_NAME,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 8000,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((m) => {
        console.log(`[MongoDB] Connected successfully to ${MONGODB_DB_NAME}`);
        return m;
      })
      .catch((err) => {
        console.warn(`[MongoDB Warning] Could not connect to MongoDB at ${MONGODB_URI}:`, err.message);
        cached.promise = null;
        return null;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error("[MongoDB Error] Failed to resolve connection:", e);
    return null;
  }

  return cached.conn;
}

export default connectToDatabase;
