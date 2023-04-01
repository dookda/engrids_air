const express = require('express');
const router = express.Router();

// fetch data
const getHotspot = () => {
    const url = "https://firms.modaps.eosdis.nasa.gov/mapserver/wfs/SouthEast_Asia/c56f7d70bc06160e3c443a592fd9c87e/?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAME=ms:fires_snpp_24hrs&STARTINDEX=0&COUNT=10000&SRSNAME=urn:ogc:def:crs:EPSG::4326&BBOX=-90,-180,90,180,urn:ogc:def:crs:EPSG::4326&outputformat=geojson"
    fetch(url).then();

}


router.get('/api', (req, res) => {
    res.send('Hello World!');
});

module.exports = router;

