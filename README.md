# great-ahhh-wall

A Cloudflare Workers program protecting ActivityPub inbox from spam.

It simplely drop posts with a lots (e.g. > 9) mentions.
False postive exists, use with caution.

## Deployment

1. Install Node.js and [pnpm](https://pnpm.io/)
2. `pnpm i` to install dependencies
3. `pnpm run deploy` to deploy
4. Add following routes to Workers Routes
   - `[YourDomain]/inbox`
   - `[YourDomain]/users/*`

Max allowed mentions `CC_LIMIT` is `9` by default, you can edit it
on `wrangler.toml` before deploy, or on Cloudflare dashboard after deploy
(Workers & Pages / activitypub-inbox-filter / Settings / Variables and Secrets).

## Development

Run `pnpm run cf-types` to generate types.

Logs can be found on Cloudflare dashboard.


## Credits

- [paricafe/great-pari-wall](https://github.com/paricafe/great-pari-wall)
- [shrimpia/great-ebichiri-wall](https://github.com/shrimpia/great-ebichiri-wall)

## License

CC0
