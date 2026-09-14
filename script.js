async function activateSOS() {

    const popup = document.getElementById("sos-message");
    const locationStatus = document.getElementById("location-status");

    popup.classList.remove("hidden");

    locationStatus.innerHTML = "Getting your location...";

    if (!navigator.geolocation) {

        locationStatus.innerHTML =
            "Geolocation is not supported by this browser.";

        return;
    }

    navigator.geolocation.getCurrentPosition(

        async function(position) {

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            locationStatus.innerHTML =
                "Location detected.<br>" +
                "Sending SOS...";

            try {

                const response = await fetch(
                    "https://hackathon-htn2.onrender.com/api/sos",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({
                            latitude: latitude,
                            longitude: longitude
                        })
                    }
                );

                const data = await response.json();

                if (response.ok) {

                    locationStatus.innerHTML =
                        "🚨 SOS ACTIVATED SUCCESSFULLY!<br>" +
                        "SOS ID: " + data.sos.id +
                        "<br>Location sent to the response system.";

                } else {

                    locationStatus.innerHTML =
                        "❌ SOS failed: " + data.error;

                }

            } catch (error) {

                locationStatus.innerHTML =
                    "❌ Unable to connect to the Bhorosha server.";

                console.error(error);
            }

        },

        function() {

            locationStatus.innerHTML =
                "❌ Unable to access your location.";

        }

    );
}function closeSOS() {

    document.getElementById("sos-message")
        .classList.add("hidden");

}


function showMapMessage() {

    alert("Live disaster map will be available here.");

}


function showAlerts() {

    alert("Emergency alerts will be displayed here.");

}
