# great-ahhh-wall

A Cloudflare Workers program protecting ActivityPub inbox from spam.

It simplely drop posts with a lots (e.g. >= 10) mentions.
False postive exists, use with caution.

## Deployment

You can customize the error messages and value of limits in index.js.

1. Install Node.js and [pnpm](https://pnpm.io/)
2. `pnpm install`
3. `pnpm run cf-types` to generate types
4. `pnpm run deploy` to deploy
5. Add following routes to Workers Routes
   - `[YourDomain]/inbox`
   - `[YourDomain]/users/*`

## Credits

- [paricafe/great-pari-wall](https://github.com/paricafe/great-pari-wall)
- [shrimpia/great-ebichiri-wall](https://github.com/shrimpia/great-ebichiri-wall)

## License

CC0
