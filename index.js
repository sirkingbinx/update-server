import services from './services.json' with { type: 'json' };
import express from "express";

const app = express();
const PORT = 1552;

let update_data = { };

function updateServiceInformation(service) {
    let headers = {
        "User-Agent": "github.com/sirkingbinx/update-service (Self-Hosted)"
    };

    if (services.github_api_key !== "AUTHENTICATION ALLOWS FOR MORE REQUESTS PER-HOUR" && services.github_api_key !== "") {
        headers["Authorization"] = services.github_api_key;
    }

    fetch(service.github_api_release_url, {
        method: "GET",
        headers: headers
    }).then(resp => 
        resp.json().then(json => {
            try {
                update_data[service.service_name] = {
                    "version": json["tag_name"],
                    "download": json["assets"][0]["browser_download_url"],
                    "status": 200
                }
            } catch (err) {
                if (update_data[service.service_name] == null) {
                    update_data[service.service_name] = {
                        "message": "The GitHub servers could not be contacted to update version information. The server is online and running. Please give up to 30 minutes in order for version data to update.",
                        "status": 500
                    }
                }
            }
        })
    );
}

// service service service service service
services.services.forEach((service) => {
    let update = () => updateServiceInformation(service);
    setInterval(update, service.update_interval);
})

app.get("/version/:service_name", (req, res) => {
    const service_name = req.params.service_name;

    if (!Object.hasOwn(update_data, service_name)) {
        res.json({
            status: 404,
            message: "No service named " + service_name
        });
        return;
    }

    let service_info = update_data[service_name];

    if (service_info.status == null)
        service_info.status = 200;

    res.json(service_info)
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
