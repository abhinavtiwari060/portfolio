import mongoose from "mongoose";

function sanitizeMongoUri(rawUri: string): string {
  if (!rawUri) return "mongodb://127.0.0.1:27017/abhinav_portfolio";

  try {
    const srvPrefix = "mongodb+srv://";
    const stdPrefix = "mongodb://";

    if (rawUri.startsWith(srvPrefix) || rawUri.startsWith(stdPrefix)) {
      const isSrv = rawUri.startsWith(srvPrefix);
      const prefix = isSrv ? srvPrefix : stdPrefix;
      const rest = rawUri.slice(prefix.length);

      const lastAtIndex = rest.lastIndexOf("@");
      if (lastAtIndex > -1) {
        const creds = rest.slice(0, lastAtIndex);
        const hostAndRest = rest.slice(lastAtIndex + 1);

        const colonIndex = creds.indexOf(":");
        if (colonIndex > -1) {
          const user = creds.slice(0, colonIndex);
          const rawPass = creds.slice(colonIndex + 1);
          // Only encode if not already encoded
          const encodedPass = rawPass.includes("%")
            ? rawPass
            : encodeURIComponent(decodeURIComponent(rawPass));
          return `${prefix}${user}:${encodedPass}@${hostAndRest}`;
        }
      }
    }
  } catch (err) {
    console.warn("[MongoDB] URI sanitize warning:", err);
  }

  return rawUri;
}

const RAW_MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/abhinav_portfolio";
const MONGODB_URI = sanitizeMongoUri(RAW_MONGODB_URI);
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || "abhinav_portfolio";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose | null> | null;
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
    const isAtlas = MONGODB_URI.startsWith("mongodb+srv://");
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      dbName: MONGODB_DB_NAME,
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 10000,
      family: 4,
      ...(isAtlas ? { tls: true } : {}),
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((m) => {
        console.log(`[MongoDB] Connected successfully to database: ${MONGODB_DB_NAME}`);
        return m;
      })
      .catch((err) => {
        console.error(`[MongoDB Error] Connection failed:`, err.message);
        cached.promise = null;
        return null;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error("[MongoDB Error] Failed to resolve connection promise:", e);
    return null;
  }

  return cached.conn;
}

export default connectToDatabase;

