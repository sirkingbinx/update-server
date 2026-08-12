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

## Service Config
I do this personally so I don't have to bother with leaving a terminal open. This assumes you're using systemd, figure it out if you're not
```bash
# make sure you're in your dir containing the update server
service_text="[Unit]
Description=Update Server (TCP 1552)
After=network.target

[Service]
Type=simple
User=$(whoami)
WorkingDirectory=$(pwd)
ExecStart=$(which node) index.js
Restart=always
RestartSec=10
SyslogIdentifier=updateserver
Environment=NODE_ENV=production PORT=1552

[Install]
WantedBy=multi-user.target"

sudo echo "$service_text" | sudo tee /etc/systemd/system/updateserver.service

sudo systemctl daemon-reload
sudo systemctl start updateserver
sudo systemctl enable updateserver
```
