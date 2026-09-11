// Detect user's location
function getLocation() {

    const latitude = document.getElementById("latitude");
    const longitude = document.getElementById("longitude");

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(

            function(position) {

                latitude.value = position.coords.latitude;
                longitude.value = position.coords.longitude;

                alert("Location detected successfully.");

            },

            function() {

                alert("Unable to access your location.");

            }

        );

    } else {

        alert("Geolocation is not supported by this browser.");

    }
}


// Submit disaster report
document.getElementById("report-form").addEventListener("submit", async function(event) {

    event.preventDefault();

    const resultMessage = document.getElementById("result-message");

    const reportData = {

        type: document.getElementById("type").value,

        description: document.getElementById("description").value,

        latitude: parseFloat(document.getElementById("latitude").value),

        longitude: parseFloat(document.getElementById("longitude").value),

        severity: document.getElementById("severity").value

    };


    resultMessage.innerHTML = "Submitting report...";


    try {

        const response = await fetch(
            "YOUR_BACKEND_URL/api/reports",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(reportData)
            }
        );


        const data = await response.json();


        if (response.ok) {

            resultMessage.innerHTML =
                "✅ Disaster report submitted successfully!";

            document.getElementById("report-form").reset();

        } else {

            resultMessage.innerHTML =
                "❌ Error: " + data.error;

        }

    } catch (error) {

        resultMessage.innerHTML =
            "❌ Unable to connect to the Bhorosha server.";

        console.error(error);

    }

});
