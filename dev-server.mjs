import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import analyzeSite from "./api/analyze-site.js";

const root = process.cwd();
const port = Number(process.env.PORT || 4187);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
};

createServer(async (request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host}`);

  if (url.pathname === "/api/places-search") {
    await handlePlacesSearch(url, response);
    return;
  }

  if (url.pathname === "/api/analyze-site") {
    await handleAnalyzeSite(url, response);
    return;
  }

  const requestedPath = url.pathname === "/" ? "/index.html" : url.pathname;
  const filePath = normalize(join(root, requestedPath));

  if (!filePath.startsWith(root) || !existsSync(filePath) || !statSync(filePath).isFile()) {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  response.writeHead(200, {
    "content-type": mimeTypes[extname(filePath)] || "application/octet-stream",
  });
  createReadStream(filePath).pipe(response);
}).listen(port, "127.0.0.1", () => {
  console.log(`Lead Leak Audit Studio running at http://127.0.0.1:${port}`);
});

async function handlePlacesSearch(url, response) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const niche = url.searchParams.get("niche") || "";
  const location = url.searchParams.get("location") || "";

  if (!apiKey) {
    sendJson(response, 400, { error: "Set GOOGLE_PLACES_API_KEY before using API search." });
    return;
  }

  if (!niche.trim() || !location.trim()) {
    sendJson(response, 400, { error: "Niche and location are required." });
    return;
  }

  try {
    const placesResponse = await fetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-goog-api-key": apiKey,
        "x-goog-fieldmask":
          "places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.websiteUri,places.rating,places.userRatingCount,places.googleMapsUri",
      },
      body: JSON.stringify({
        textQuery: `${niche} in ${location}`,
        maxResultCount: 12,
      }),
    });

    const payload = await placesResponse.json();

    if (!placesResponse.ok) {
      sendJson(response, placesResponse.status, {
        error: payload.error?.message || "Google Places search failed.",
      });
      return;
    }

    sendJson(response, 200, {
      prospects: (payload.places || []).map((place) => ({
        id: `places-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        businessName: place.displayName?.text || "Unnamed business",
        website: place.websiteUri || "",
        phone: place.nationalPhoneNumber || "",
        niche,
        location: place.formattedAddress || location,
        rating: place.rating ? String(place.rating) : "",
        reviews: place.userRatingCount ? String(place.userRatingCount) : "",
        notes: place.googleMapsUri ? `Google Maps: ${place.googleMapsUri}` : "",
        status: "New",
        source: "Google Places",
        createdAt: new Date().toISOString(),
      })),
    });
  } catch {
    sendJson(response, 500, { error: "Places search request failed." });
  }
}

function sendJson(response, status, payload) {
  response.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(payload));
}

async function handleAnalyzeSite(url, response) {
  await analyzeSite(
    { query: Object.fromEntries(url.searchParams.entries()) },
    {
      status(code) {
        response.statusCode = code;
        return this;
      },
      json(payload) {
        sendJson(response, response.statusCode || 200, payload);
      },
    },
  );
}
