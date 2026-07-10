# Copilot code review instructions

## Project

A WebExtension (manifest v2) that embeds Todoist in the browser sidebar via
`sidebar_action`. A background script strips response headers so Todoist can be
shown inside an iframe. No build/test/lint tooling exists; source is loaded as-is
by the browser.

## Review focus

- **Header stripping scope**: `background.js` removes `content-security-policy`
  and `x-frame-options`. Flag any change that widens the `webRequest` `urls`
  filter beyond the single Todoist URL, since it strips security headers.
- **Hard-coded URL consistency**: the Todoist URL appears in both
  `sidebar.html` (iframe `src`) and `background.js` (`urls`). Flag changes that
  update one without the other.
- **Manifest correctness**: `manifest.json` must stay valid manifest v2. Check
  that referenced files (`background.js`, `sidebar.html`, icon paths) exist and
  that `permissions` still match what the code uses.
- **Version bump**: expect `manifest.json` `version` to be bumped for
  user-visible changes.

## Do not flag

- Absence of a build system, tests, linter, or `package.json` — this project has
  none by design.
- Use of manifest v2 APIs (`sidebar_action`, blocking `webRequest`, background
  `scripts`); they are required for the target browsers.
