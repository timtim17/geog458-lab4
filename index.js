'use strict';

/* global mapboxgl */

(function() {
    const myLayers = ['base', 'theme'];

    mapboxgl.accessToken = 'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw';
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/dark-v10', // style URL
        center: [-122.0321, 47.6062],
        zoom: 9,
    });

    map.on('load', () => {
        Array.from(document.querySelectorAll('input'))
            .map(input => input.value)
            .forEach(layerName => {
                map.addSource(`${layerName}-tiles`, {
                    'type': 'raster',
                    'tiles': [
                        `tiles/${layerName}/{z}/{x}/{y}.png`
                    ],
                    'tileSize': 256,
                    'attribution': myLayers.includes(layerName) ? 'Map tiles designed by Austin Jenchi'
                        : 'Data via King County Open GIS Data',
                });
        
                map.addLayer({
                    'id': `${layerName}`,
                    'type': 'raster',
                    'layout': {
                        'visibility': 'none'
                    },
                    'source': `${layerName}-tiles`
                });
            });
    });

    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('change', () => {
            map.setLayoutProperty(input.value, 'visibility', input.checked ? 'visible' : 'none');
        });
    });

    const needsLegend = ['transit_awning', 'awning_map']
        .map(layerName => document.querySelector(`input[value="${layerName}"]`));
    const legend = document.getElementById('legend');
    needsLegend.forEach(ele => {
        ele.addEventListener('change', function() {
            const showLegend = needsLegend.map(ele => ele.checked).includes(true);
            legend.className = showLegend ? '' : 'hidden';
        });
    });
})();
