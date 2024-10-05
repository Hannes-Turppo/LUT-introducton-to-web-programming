const fetch_data = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

const create_map = async () => {
    const data = await fetch_data('https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326');
    const migration_pos = await fetch_data("https://statfin.stat.fi/PxWeb/sq/4bb2c735-1dc3-4c5e-bde7-2165df85e65f");
    const migration_neg = await fetch_data("https://statfin.stat.fi/PxWeb/sq/944493ca-ea4d-4fd9-a75c-4975192f7b6e");

    // Integrate migration data with GeoJSON data
    data.features.forEach((feature, index) => {
        feature.properties.migration_pos = migration_pos.dataset.value[index+1] || 0;
        feature.properties.migration_neg = migration_neg.dataset.value[index+1] || 0;
    });

    // create the map
    let map = L.map('map', {
        minZoom: -3,
    });

    // show info when clicking on a feature
    let geoJson = L.geoJson(data, {
        onEachFeature: getFeature,
        weight: 2
    }).addTo(map);

    // add OSM basemap
    let osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: "© OpenStreetMap"
    }).addTo(map);

    // define basemaps
    let basemap = {
        "OpenStreetMap": osm
    };

    // define overlay
    let overlay = {
        "Municipalities": geoJson
    };

    // add layer control and create bounds
    let layers = L.control.layers(basemap, overlay).addTo(map);
    map.fitBounds(geoJson.getBounds());
}

const getFeature = (feature, layer) => {
    if (!feature.id) return;
    const id = feature.id;

    // Onclick event
    layer.bindPopup(
        `<p>Name: ${feature.properties.name}</p>
         <p>migration: +${feature.properties.migration_pos}, -${feature.properties.migration_neg}</p>`);
    layer.bindTooltip(
        `<p>${feature.properties.name}</p>`
    );
}

// Call the create_map function to initialize the map
create_map();
