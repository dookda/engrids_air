const map = L.map('map', {
    center: [13.736717, 100.523186],
    zoom: 6,
})

const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
});

let fc = L.featureGroup();

const baseLayers = {
    "OSM": osm.addTo(map)
}

const overlays = {
    "จุดความร้อน": fc.addTo(map)
}

L.layerControl = L.control.layers(baseLayers, null, {}).addTo(map);


let hpData = axios.get("https://firms.modaps.eosdis.nasa.gov/mapserver/wfs/SouthEast_Asia/c56f7d70bc06160e3c443a592fd9c87e/?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAME=ms:fires_snpp_24hrs&STARTINDEX=0&COUNT=10000&SRSNAME=urn:ogc:def:crs:EPSG::4326&BBOX=-90,-180,90,180,urn:ogc:def:crs:EPSG::4326&outputformat=geojson");
let onEachFeatureHotspot = (feature, layer) => {
    if (feature.properties) {
        layer.bindPopup(
            `<span class="kanit"><b>ตำแหน่งจุดความร้อน</b>
            <br/>ข้อมูลจาก VIIRS
            <br/>ตำแหน่งที่พบ : ${feature.properties.latitude}, ${feature.properties.longitude} 
            <br/>ค่า Brightness temperature: ${feature.properties.brightness} Kelvin
            <br/>วันที่: ${feature.properties.acq_datetime} UTC`
        );
    }
}

let loadHotspot = async () => {
    let hp = await hpData;
    const fs = hp.data.features;
    var geojsonMarkerOptions = {
        radius: 6,
        fillColor: "#ff5100",
        color: "#a60b00",
        weight: 0,
        opacity: 1,
        fillOpacity: 0.8
    };

    await L.geoJSON(fs, {
        filter: function (feature) {
            if (feature.geometry.coordinates[0] > 96.295861 && feature.geometry.coordinates[0] < 106.113154) {
                if (feature.geometry.coordinates[1] > 5.157973 && feature.geometry.coordinates[1] < 20.221918) {
                    // myModal.hide();
                    return feature
                }
            }
        },
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
        },
        name: "lyr",
        onEachFeature: onEachFeatureHotspot
    }).addTo(fc)
}

document.addEventListener('DOMContentLoaded', function () {
    loadHotspot();
});