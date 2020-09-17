# CMM-Site-Scraper

The app iterates over pages in a sitemap and either
- copies the html from the page and makes a new .html file with the contents
- takes a full screenshot of the page
- or both

The newly created .html files are added to the "files" folder, and images are added to the "imgs" folder.
All errors are logged to an error file in the "logs" folder.

Run the file apps.js from the command line with two flags:

### url

the url flag takes a url in the form of a string. If it ends in a forwardslash, it will throw an error

### type

The type flag takes one of three valid values: HTML, SCREENSHOTS, HTML-SCREENSHOTS. Types are case sensitive.

## Example

node app.js --url=https://samplewebsite.com --type=SCREENSHOTS
