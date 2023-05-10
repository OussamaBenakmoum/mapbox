import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';
import geoJson from "./sh.json";
import InfoCard from './InfoCard';
mapboxgl.accessToken = 'pk.eyJ1Ijoib3Vzc2FtYWJlbmFrbW91bWUiLCJhIjoiY2xleW5odmdsMWs0eDN3bWtmMmozejR3NyJ9.oRCpsgixzLYvCEcXf9E-5g';

const Map = () => {
  const mapContainerRef = useRef(null);
  const tooltipRef = useRef(new mapboxgl.Popup({ offset: 15 }));

  const [infoCardData, setInfoCardData] = useState(null);

  function openInfoCard(feature) {
    console.log("clicked");
    setInfoCardData({
      title: feature.properties.title,
      description: feature.properties.description,
      image: "image"
    });
  }

  function closeInfoCard() {
    setInfoCardData(null);
  }

  const [lng, setLng] = useState(2.5951);
  const [lat, setLat] = useState(27.8931);
  const [zoom, setZoom] = useState(5.5);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    var coordinates = [
      [
        [4.246409, 31.226421 ],
        [3.015940, 29.089294 ],
        [3.752024, 28.492347 ],
        [7.058909, 30.130397 ],
        [6.608470, 32.226275 ],
        [4.246409, 31.226421 ]  
      ]
  ];

    map.on("load", function () {
      // Add an image to use as a custom marker
      map.loadImage(
        "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
        function (error, image) {
          if (error) throw error;
          map.addImage("custom-marker", image);
          
          map.addLayer({
            'id': 'my-polygon',
            'type': 'fill',
            'source': {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Polygon',
                        'coordinates': coordinates
                    }
                }
            },
            'paint': {
                'fill-color': '#54ea08',
                'fill-opacity': 0.5
            },
            'layout': {}
        });

          

          // Add a symbol layer
          map.addLayer({
            id: "points",
            type: "symbol",
            source: {
              'type': 'geojson',
                'data': {
                  type: "FeatureCollection",
                  features: geoJson.features,
                }
            },
            layout: {
              "icon-image": "custom-marker",
              // get the title name from the source's "title" property
              "text-field": ["get", "title"],
              "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
              "text-offset": [0, 1.25],
              "text-anchor": "top",
            },
          });
        }
      );
    });

    



    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-left');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    map.on('click', function(e) {
      // Check if the clicked point is within one of the defined points
      var features = map.queryRenderedFeatures(e.point, { layers: ['points', 'my-polygon'] });
      console.log(infoCardData);
      if (features.length > 0) {
          // Get the clicked point geometry
          var clickedPoint = features[0].properties.title;
          
          openInfoCard(features[0]);
          // alert(clickedPoint)
      }
  });

 

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='rectangle-container'>
      <div className='sidebarStyle'>
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div className="map-buttons">
        <button className='p-2 px-4 bg-orange-500/75 text-white	 rounded '>Regions</button>
        <button className='p-2 px-4 bg-orange-500/75 text-white	 rounded '>Unites</button>
        <button className='p-2 px-4 bg-orange-500/75 text-white	 rounded '>Perimetre</button>
        <button className='p-2 px-4 bg-orange-500/75 text-white	 rounded '>Puits</button>
      </div>
      <div className='map-container' ref={mapContainerRef} />
      {infoCardData && <InfoCard title={infoCardData.title} description={infoCardData.description} image={infoCardData.image} onClose={closeInfoCard} />}

    </div>
  );
};

export default Map;
   // map.on('mousemove', e => {
    //   const features = map.queryRenderedFeatures(e.point);
    //   if (features.length) {
    //     const feature = features[0];

    //     // Create tooltip node
    //     const tooltipNode = document.createElement('div');
    //     ReactDOM.render(<Tooltip feature={feature} />, tooltipNode);

    //     // Set tooltip on map
    //     tooltipRef.current
    //       .setLngLat(e.lngLat)
    //       .setDOMContent(tooltipNode)
    //       .addTo(map);
    //   }
    // });



    // map.addSource('my-polygon', {
    //   'type': 'geojson',
    //   'data': {
    //     'type': 'Feature',
    //     'geometry': {
    //       'type': 'Polygon',
    //       'coordinates': [  [31.226421, 4.246409],
    //       [29.089294, 3.015940],
    //       [28.492347, 3.752024],
    //       [30.130397, 7.058909],
    //       [32.226275, 6.608470],
    //       [31.226421, 4.246409]
    //        // Make sure to repeat the first coordinate to close the polygon
    //     ]
    //     }
    //   }
    // });

    // map.addLayer({
    //   'id': 'my-polygon-layer',
    //   'type': 'fill',
    //   'source': 'my-polygon',
    //   'layout': {},
    //   'paint': {
    //     'fill-color': '#FF2500',
    //     'fill-opacity': 0.5
    //   }
    // });

    // Add a GeoJSON source with multiple points
          // map.addSource("points", {
          //   type: "geojson",
          //   data: {
          //     type: "FeatureCollection",
          //     features: geoJson.features,
          //   },
          // });