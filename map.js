// Create map
const map = L.map("map").setView([22.5726, 88.3639], 10);


// Add OpenStreetMap
L.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution: "&copy; OpenStreetMap contributors"
    }
).addTo(map);


// Get disaster reports
async function loadReports() {

    const status = document.getElementById("map-status");

    try {

        const response = await fetch(
            "https://hackathon-htn2.onrender.com/api/reports"
        );

        const reports = await response.json();


        if (!response.ok) {

            status.innerHTML =
                "Unable to load disaster reports.";

            return;
        }


        if (reports.length === 0) {

            status.innerHTML =
                "No disaster reports available.";

            return;
        }


        reports.forEach(function(report) {

            const marker = L.marker([
                report.latitude,
                report.longitude
            ]).addTo(map);


            marker.bindPopup(
                "<b>Disaster:</b> " + report.type +
                "<br><b>Severity:</b> " + report.severity +
                "<br><b>Status:</b> " + report.status +
                "<br><b>Description:</b> " +
                report.description
            );

        });


        status.innerHTML =
            reports.length + " disaster report(s) found.";

    }

    catch (error) {

        status.innerHTML =
            "Unable to connect to the Bhorosha server.";

        console.error(error);

    }
}


loadReports();
