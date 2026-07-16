export default async function handler(request, response) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const niche = request.query.niche || "";
  const location = request.query.location || "";

  if (!apiKey) {
    response.status(400).json({ error: "Set GOOGLE_PLACES_API_KEY before using API search." });
    return;
  }

  if (!String(niche).trim() || !String(location).trim()) {
    response.status(400).json({ error: "Niche and location are required." });
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
      response.status(placesResponse.status).json({
        error: payload.error?.message || "Google Places search failed.",
      });
      return;
    }

    response.status(200).json({
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
    response.status(500).json({ error: "Places search request failed." });
  }
}
