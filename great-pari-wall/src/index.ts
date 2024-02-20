export default {
  async fetch(request: Request) {
    const ccLimit = 4;
    const atLimit = 3;

    // If the request method is HEAD or GET, return it as it is.
    if (request.method === 'HEAD' || request.method === 'GET') {
      return await fetch(request.url, {
        method: request.method,
        headers: request.headers,
      });
    }

    const body = await request.text();

    try {
      const bodyJson = JSON.parse(body);
      const cc = bodyJson.cc?.length ?? 0;

      // Check if mentions exceed the limit
      const mentions = (bodyJson.text || '').match(/@(\w+)(?:@([\w.-]+))?/g) || [];

      if (mentions.length > atLimit) {
        return new Response(JSON.stringify({
          error: {
            message: 'Too many Ats.',
            code: 'TOO_MANY_ATS',
            id: 'c7e10ff1-042f-441a-b490-836956560650',
          }
        }), {
          // Note: Returning a 400 in ActivityPub may result in repeated retries from the remote or, in the worst case, delivery suspension. Therefore, return a 202 for 'inbox'.
          status: request.url.includes('inbox') ? 202 : 400,
        });
      }

      if (cc > ccLimit) {
        return new Response(JSON.stringify({
          error: {
            message: 'Too many mentions.',
            code: 'TOO_MANY_MENTIONS',
            id: 'c7e10ff1-042f-441a-b490-836956560650',
          }
        }), {
          // Note: Returning a 400 in ActivityPub may lead to repeated retries from the remote or, in the worst case, delivery suspension. Therefore, return a 202 in the case of 'inbox'.
          status: request.url.includes('inbox') ? 202 : 400,
        });
      }
    } catch (e) {
      // do nothing
    }

    // No badWords filtering

    return await fetch(request.url, {
      method: 'POST',
      headers: request.headers,
      body,
    });
  },
};
