sed -i "s/puppeteerArgs: \[\],/puppeteerArgs: \[\"--no-sandbox\", \"--disable-setuid-sandbox\"\],/" ./node_modules/react-snap/index.js && 
echo changed arguments in react-snap