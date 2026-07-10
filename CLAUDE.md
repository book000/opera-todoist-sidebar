# CLAUDE.md

## Overview

A browser sidebar extension (WebExtension, manifest v2) that embeds Todoist
(`https://chrome.todoist.com/ja`) in the browser sidebar. Targets browsers that
support the `sidebar_action` API (Opera / Firefox). Todoist normally cannot be
framed, so a background script strips the headers that block embedding.

## Architecture / key files

- `manifest.json`: WebExtension manifest (v2). Declares `sidebar_action` with
  `sidebar.html` as the panel, registers `background.js`, and requests the
  `webRequest` / `webRequestBlocking` permissions.
- `sidebar.html`: the sidebar panel. A single full-viewport `<iframe>` pointing
  at the Todoist URL.
- `background.js`: on `webRequest.onHeadersReceived` for the Todoist URL, removes
  the `content-security-policy` and `x-frame-options` response headers so the
  page can be loaded inside the iframe.
- `icons/`: extension icons (48px, 128px).
- `renovate.json`: Renovate config extending `book000/templates`.

## Development

There is no build, test, or lint tooling and no `package.json`. The source is
loaded as-is by the browser.

To verify changes manually, load the unpacked extension as a temporary add-on in
a browser that supports `sidebar_action` (e.g. Firefox `about:debugging` ->
"Load Temporary Add-on" -> select `manifest.json`), open the sidebar, and confirm
Todoist renders inside it.

## Conventions and caveats

- Keep to manifest v2: `sidebar_action`, background `scripts`, and blocking
  `webRequest` are v2 features. Do not migrate to manifest v3 unless the target
  browsers' sidebar/webRequest support is confirmed.
- The Todoist URL (`https://chrome.todoist.com/ja`) is hard-coded in both
  `sidebar.html` (iframe `src`) and `background.js` (`urls` filter). If it
  changes, update both places, otherwise the header stripping stops matching.
- The header-stripping logic must only target the Todoist URL. Do not broaden the
  `urls` filter, since removing CSP / `x-frame-options` weakens those pages'
  protections.

## Documentation update rules

- Bump `version` in `manifest.json` for any user-visible change.
- Update this file and `README.md` when the file layout, the embedded URL, or the
  set of stripped headers changes.
