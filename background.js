const headers = ["content-security-policy", "x-frame-options"];

chrome.webRequest.onHeadersReceived.addListener(
  (details) => ({
    responseHeaders: details.responseHeaders.filter(
      (header) => !headers.includes(header.name.toLowerCase())
    ),
  }),
  {
    urls: ["https://chrome.todoist.com/ja"],
  },
  ["blocking", "responseHeaders", "extraHeaders"]
);
