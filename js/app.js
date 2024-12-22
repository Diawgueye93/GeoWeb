//inserer un fond de carte OSM
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
});

var osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France'
});

var satellite = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    attribution: '© Google'
});

var Dark_carto = L.tileLayer('https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
    minZoom: 0,
    maxZoom: 20,
    attribution: 'Terrain',
    ext: 'png'
});

//Inserer etendue centre de la carte
var map = L.map('map', {
    center: [14.370834, -14.831543],
    zoom: 7,
    layers: [osm]
});

//Inserer les fonds de carte dans le controle de couche
var baseMaps = {
    "OpenStreetMap": osm,
    "OpenStreetMap.HOT": osmHOT,
    "Satellite": satellite,
    "Carto Dark": Dark_carto
};

// Ajout de la couche WMS
var Departement = L.tileLayer.wms("http://localhost:8080/geoserver/ne/wms", {
    layers: 'Departement',
    format: 'image/png',
    transparent: true

}).addTo(map)


    // Ajoute des couches Geojson
    var arrondissement = L.geoJson(arrondissement).addTo(map);
    var localitess = L.geoJson(localitess).addTo(map);

var Routes = L.tileLayer.wms("http://localhost:8080/geoserver/UAM/wms", {
    layers: 'Routes',
    format: 'image/png',
    transparent: true
}).addTo(map)

//Inserer les fonds de carte dans le controle de couche
var OverLayerMaps = {
"Routes": Routes,
"localitess": localitess,
"arrondissement": arrondissement,
"Departement": Departement,

};

//Inserer le controle des couches
L.control.layers(baseMaps, OverLayerMaps).addTo(map);

// Ajouter l'impression des cartes
L.control.browserPrint({ position: 'topleft' }).addTo(map);

// Ajout d'un contrôle d'échelle à la carte 
L.control.scale({
    position: 'bottomleft',
    metric: true,
    imperial: false
}).addTo(map);
