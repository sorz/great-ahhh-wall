const CC_LIMIT = 9;

export default {
  async fetch(request: Request) {
    // Only for POST /inbox
    if (request.method !== 'POST' || !request.url.endsWith('/inbox')) {
      return fetch(request);
    }

    const bodyText = await request.text();
    try {
      const body = JSON.parse(bodyText);
      const cc = body.cc?.length ?? 0;
      if (cc > CC_LIMIT) {
        console.warn({
          action: 'DROP',
          activity: body,
        });
        // https://www.w3.org/wiki/ActivityPub/Primer/HTTP_status_codes_for_delivery
        // 403 for "a blocked user or domain", "fail delivery permanently"
        return new Response('Too many mentions', { status: 403 });
      }
    } catch (err) {
      console.error(err);
    }

    return fetch(request.url, {
      method: 'POST',
      headers: request.headers,
      body: bodyText,
    });
  },
} satisfies ExportedHandler;
