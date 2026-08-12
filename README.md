# Update Server
This is the source to https://updates.sirkingbinx.dev, used by BingusNametags++ to provide fast and simple auto-updating features without being rate-limited by the GitHub API.

The web server is hosted on port 1552. You can check for updates to a service by sending a GET request to `/version/:service_name:`. A response will sorta look like this:
```json
{
    "version": "1.6.3",
    "download": "https://github.com/sirkingbinx/BingusNametagsPlusPlus/releases/download/1.6.3/BingusNametagsPlusPlus.dll",
    "status": 200
}

// taken from https://updates.sirkingbinx.dev/version/nametags
```

## Installation
Requires Node.js and Express.
```bash
# assuming node is installed already
git clone https://github.com/sirkingbinx/update-server updateServer
cd updateServer

npm install .
node index.js

# test to confirm that it's working
curl -s http://localhost:1552/version/nametags
```