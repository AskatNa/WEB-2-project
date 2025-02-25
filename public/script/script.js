let map;
let marker;

document.addEventListener("DOMContentLoaded", function () {
    map = L.map("map").setView([51.1657, 10.4515], 4);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);
});

async function searchCity() {
    const city = document.getElementById("cityInput").value.trim();

    if (!city) {
        alert("Enter a city name.");
        return;
    }

    try {
        const response = await fetch(`/location?city=${city}`);
        const contentType = response.headers.get("content-type");

        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Invalid response from server. Check if API is working.");
        }

        const data = await response.json();
        if (data.error) {
            alert(data.error);
            return;
        }

        if (!map) {
            console.error("Error: Map is not initialized.");
            return;
        }

        map.setView([data.lat, data.lon], 10);

        if (marker) {
            map.removeLayer(marker);
        }
        marker = L.marker([data.lat, data.lon]).addTo(map)
            .bindPopup(`<b>${data.city}</b>`)
            .openPopup();
    } catch (error) {
        console.error("Error fetching city:", error);
        alert("Failed to get location.");
    }
}

window.searchCity = searchCity;
