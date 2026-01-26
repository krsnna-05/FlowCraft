type env = {
  PORT: number;
  MONGO_URI: string;
};

export const getEnv = (): env => {
  const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
  const MONGO_URI = process.env.MONGO_URI || "";

  if (!MONGO_URI) {
    throw new Error("MONGO_URI is not defined in environment variables");
  }

  return {
    PORT,
    MONGO_URI,
  };
};
