import type { VercelRequest, VercelResponse } from "@vercel/node";

let cachedServer: any = null;

async function getServer() {
  if (cachedServer) return cachedServer;

  try {
    const serverModule = await import("../dist/server/server.js");
    cachedServer = serverModule.default;
    return cachedServer;
  } catch (error) {
    console.error("Failed to load server:", error);
    throw error;
  }
}

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    const server = await getServer();

    if (!server || typeof server.fetch !== "function") {
      res.status(500).json({ error: "Server handler not available" });
      return;
    }

    // Convert Vercel request to standard fetch Request
    const url = new URL(req.url || "/", `https://${req.headers.host}`);
    const fetchRequest = new Request(url, {
      method: req.method,
      headers: req.headers as HeadersInit,
      body:
        req.method !== "GET" && req.method !== "HEAD"
          ? JSON.stringify(req.body)
          : undefined,
    });

    // Call server handler
    const response = await server.fetch(fetchRequest);

    // Convert response back to Vercel format
    res.status(response.status);

    response.headers.forEach((value: string, key: string) => {
      res.setHeader(key, value);
    });

    const body = await response.text();
    res.send(body);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
};
