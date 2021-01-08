if [[ "$OSTYPE" == "linux-gnu"* ]]; then
  sed -i "s/puppeteerArgs: \[\],/puppeteerArgs: \[\"--no-sandbox\", \"--disable-setuid-sandbox\"\],/" ./node_modules/react-snap/index.js
  echo changed arguments in react-snap
elif [[ "$OSTYPE" == "darwin"* ]]; then
  gsed -i "s/puppeteerArgs: \[\],/puppeteerArgs: \[\"--no-sandbox\", \"--disable-setuid-sandbox\"\],/" ./node_modules/react-snap/index.js
  echo changed arguments in react-snap
else
  echo could not change arguments in react-snap
fi