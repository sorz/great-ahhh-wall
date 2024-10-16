function checkIsSpam(activity: any, env: Env): [boolean, string] {
  // Only check for notes
  const type = activity.object?.type ?? activity.type;
  if (type !== 'Note') {
    return [false, `ignore type ${type}`]
  }

  // Ignore replies
  // (until reply-spamming become popular)
  if (activity.object?.inReplyTo) {
    return [false, 'ignore replies']
  }

  // Check CC count
  const cc = activity.cc ?? [];
  // Some server (GoToSocial) may sent `cc` as single string
  const ccCount = Array.isArray(cc) ? cc.length : 1;
  if (ccCount > env.CC_LIMIT) {
    return [true, `CC excessed (${ccCount})`]
  }

  // Check mention count
  // I'm not sure why but sometime CC count is less than mention count
  const content = activity.object?.content ?? "";
  const mentionCount = content.match(/<a [^>]+ class="[^"]*\bmention\b/)?.length ?? 0;
  if (mentionCount> env.CC_LIMIT) {
    return [true, `mention excessed (${mentionCount})`]
  }

  return [false, 'pass all test']
}

export default {
  async fetch(request, env) {
    // Only for POST /inbox
    if (request.method !== 'POST' || !request.url.endsWith('/inbox')) {
      return fetch(request);
    }

    const bodyText = await request.text();
    try {
      const activity = JSON.parse(bodyText);
      const [isSpam, reason] = checkIsSpam(activity, env);
      if (isSpam) {
        console.warn({
          action: 'DROP',
          reason,
        });
        // https://www.w3.org/wiki/ActivityPub/Primer/HTTP_status_codes_for_delivery
        // 403 for "a blocked user or domain", "fail delivery permanently"
        return new Response('Too many mentions', { status: 403 });
      } else {
        console.debug({
          action: 'ACCEPT',
          reason,
        });
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
} satisfies ExportedHandler<Env>;
