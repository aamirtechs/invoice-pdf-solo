# Invoice PDF Solo
Live page: https://aamirtechs.github.io/invoice-pdf-solo/

Create a professional invoice, quote or receipt PDF in about a minute with no account, no footer branding and no monthly cap. Tax-inclusive and tax-exclusive maths are handled correctly for freelancers and micro-businesses.

## Features
- Form with live preview and local-only logo upload
- Line items with discount and tax exclusive or inclusive maths
- Multi-currency formatting and per-type numbering for invoice, quote and receipt
- PDF download via pdf-lib with no branding or footer
- Local history (last 50) with duplicate plus JSON export and import

## How it works
Enter seller, client and line items, choose discount, tax mode and currency, preview the totals, then download a clean PDF. History stays in localStorage on this device with JSON backup and restore. It runs entirely in the browser.

## Privacy
Runs 100% in your browser. Your files never leave this device, nothing is uploaded, and there is no tracking.

## Development
Core logic lives in `src/logic.js` and is shared by the page and the tests. Run the tests with `npm test`.

## License
MIT, Copyright 2026 Amir Hussain.
