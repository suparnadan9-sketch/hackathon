function activateSOS() {

    const popup = document.getElementById("sos-message");

    popup.classList.remove("hidden");

    const locationStatus = document.getElementById("location-status");

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(

            function(position) {

                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                locationStatus.innerHTML =
                    "Location detected.<br>" +
                    "Latitude: " + latitude.toFixed(5) +
                    "<br>Longitude: " + longitude.toFixed(5);

            },

            function() {

                locationStatus.innerHTML =
                    "Unable to access your location.";

            }

        );

    } else {

        locationStatus.innerHTML =
            "Geolocation is not supported by this browser.";

    }
}


function closeSOS() {

    document.getElementById("sos-message")
        .classList.add("hidden");

}


function showMapMessage() {

    alert("Live disaster map will be available here.");

}


function showAlerts() {

    alert("Emergency alerts will be displayed here.");

}
