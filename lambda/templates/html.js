module.exports.getHtmlResponse = function (statusCode, htmlString) {
  return {
    statusCode: statusCode,
    headers: {
      'Content-Type': 'text/html'
    },
    body: htmlString
  }
}

module.exports.getHtmlRedirectResponse = function (redirectUrl) {
  return {
    statusCode: 303,
    headers: {
      Location: redirectUrl
    }
  }
}

module.exports.getHtmlLayout = function (title, header, content) {
  // HTML template literal for layout based on Bootstrap 4
  return `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
      <title>${title}</title>
    </head>
    <body>
      <div class="container">
        <h1>${header}</h1>
        ${content}
      </div>

      <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    </body>
  </html>`
}

module.exports.getHtmlError = function (error) {
  const content = `
    <p class="lead">An error has occurred.</p>
    <pre>
      <code>
        ${JSON.stringify(error, null, 2)}
      </code>
    </pre>
  `

  return this.getHtmlLayout('Tickets - Error', 'Error', content)
}

module.exports.getHtmlTickets = function (tickets) {
  const content = `
    <p class="lead">Serverless ticketing example.</p>

    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th>text</th>
            <th>checked</th>
            <th>createdAt</th>
            <th>updatedAt</th>
          </tr>
        </thead>
        <tbody>
          ${tickets ? tickets.map(t => `
            <tr>
              <td>${t.text}</td>
              <td>${t.checked}</td>
              <td>${(new Date(t.createdAt)).toLocaleString('en-GB', { timeZone: 'UTC' })}</td>
              <td>${(new Date(t.updatedAt)).toLocaleString('en-GB', { timeZone: 'UTC' })}</td>
            </tr>`).join('') : ''}
        </tbody>
      </table>
    </div>

    <div>
      <form method="POST" action="">
        <div class="form-group">
          <label for="text">Text</label>
          <input type="text" class="form-control" id="text" name="text" placeholder="Enter text">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  `

  return this.getHtmlLayout('Tickets', 'Tickets', content)
}
