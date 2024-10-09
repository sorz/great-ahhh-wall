# great-ahhh-wall

A Cloudflare Workers program protecting ActivityPub inbox from spam.

It simplely drop posts with a lots (e.g. >= 10) mentions.
False postive exists, use with caution.

## Deployment

You can customize the error messages and value of limits in index.js.

0. Install Node.js and
   [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/)
   `npm install wrangler --save-dev`
1. `pnpm run deploy` to deploy.
2. Add following routes to Workers Routes.
   - `[YourDomain]/inbox`
   - `[YourDomain]/users/*`

## Credits

- [paricafe/great-pari-wall](https://github.com/paricafe/great-pari-wall)
- [shrimpia/great-ebichiri-wall](https://github.com/shrimpia/great-ebichiri-wall)

## License

CC0
