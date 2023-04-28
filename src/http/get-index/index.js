exports.handler = async function http (req) {
  return {
    statusCode: 200,
    headers: {
      "cache-control":
        "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
      "content-type": "text/html; charset=utf8"
    },
    body: `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>drought.ca.gov headless WordPress publishing service</title>
    </head>
    <body>  
      <h1>drought.ca.gov headless WordPress publishing service</h1>
      <p>
        Work in these endpoints is completed in the scheduled operations, code in: github.com/cagov/service-wordpress-to-github-drought-ca-gov
      </p>
    </body>
    </html>`
  }
}