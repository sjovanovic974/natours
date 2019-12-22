/* eslint-disable */

const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken =
  'pk.eyJ1Ijoic2pvdmFub3ZpYzk3NCIsImEiOiJjanl5NGlua3gwd3RpM2NtZTg5cWUwaGdxIn0.12mHVeZx_qHteNdrFOS-lQ';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/sjovanovic974/ck4fn02wt4mne1cl4vuh2pdna',
  scrollZoom: false
  // center: [-118.113491, 34.111745],
  // zoom: 8,
  // interactive: false
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach(loc => {
  // Creates marker
  const el = document.createElement('div');
  el.className = 'marker';

  // Adds marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom'
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  // Add popup
  new mapboxgl.Popup({
    offset: 30
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);

  // Extends map bounds to include current location
  bounds.extend(loc.coordinates);

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
});
