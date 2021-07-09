<template>
  <div id="mapContainer" class="map"></div>
</template>

<script>
  import mapboxgl from "mapbox-gl";
  import {
    mapState
  } from 'vuex'

  export default {
    name: "Map",
    data() {
      return {
        accessToken: 'pk.eyJ1IjoibWFsdGVvcCIsImEiOiJja3Bta2R5ajYwMm9lMzFwNDd4dHg2cDV1In0.k0u0_zAjo2NP7Bq_BCF5MQ',
        map: undefined,
        geojson: {
          'type': 'FeatureCollection',
          'features': []
        },
        lastSelectedSensor: undefined,
        selected: false,
        fireIndex: undefined,
        polyColor: undefined
      };
    },
    props: [
      'newWeatherData'
    ],
    mounted() {
      mapboxgl.accessToken = this.accessToken;
      this.getForest()
      this.getAllSensors()
      this.loadAllMarkers()
    },
    computed: {
      ...mapState(['forest', 'sensor']),
    },
    watch: {
      forest: function () {
        this.selected = false
        this.getForest()
      },
      sensor: function () {
        if (this.$store.state.sensor.length == 0) {
          this.selected = false

          let data = {
            _id: undefined
          }
          this.getSensors(data)
        }
        else if(this.$store.state.sensor.length != 0 && this.selected === false){
          this.getSensors(this.$store.state.sensor[0])
          this.selected = true
        }
        this.getAllSensors()
        this.loadAllMarkers()

      }
    },
    methods: {
      getAllSensors() {
        if (this.$store.state.sensor) {
          this.$store.state.sensor.forEach(sensor => {
            let newSensor = {
              'type': 'Feature',
              'properties': {
                'message': sensor.sensorstationNr,
                'iconSize': [32, 32],
                'iconColor': '#F1C21B',
                'selectedColor': '#FE6B01',
                'sensorId': sensor._id,
                'selected': false
              },
              'geometry': {
                'type': 'Point',
                'coordinates': [sensor.position.longitude, sensor.position.latitude]
              }
            };
            if (this.map.getSource(sensor._id + 'poly')) {
              this.map.removeSource(sensor._id + 'poly');
            }
            this.map.addSource(sensor._id.toString() + 'poly', {
              'type': 'geojson',
              'data': {
                'type': 'Feature',
                'geometry': {
                  'type': 'Polygon',
                  'coordinates': [sensor.areaPoints]
                }
              }
            })
            
            this.geojson.features.push(newSensor);
          })
        }
      },
      calcFireIndex(sensor) {
        if(this.newWeatherData && this.$store.state.sensor) {
          this.fireIndex = Math.round(((((sensor.tempStreu / sensor.moistureStreu) + (sensor.tempHumus / sensor.moistureHumus) * (this.newWeatherData.windspeed / (this.newWeatherData.temperature / this.newWeatherData.humidity)))) * 100) + 800)
        }
      },
      setPolyColor() {
        switch(true) {
          case (this.fireIndex <= 2000):
            this.polyColor = '#83B764'
            break
          case (this.fireIndex <= 2500):
            this.polyColor = '#F9C747'
            break
          case (this.fireIndex <= 3000):
            this.polyColor = '#F98747'
            break
          case (this.fireIndex > 3000):
            this.polyColor = '#FF5E5E'
            break
        }
      },
      loadAllMarkers() {
        this.geojson.features.forEach((marker) => {
          let el = document.createElement('div');
          el.className = 'marker';
          el.style.width = marker.properties.iconSize[0] + 'px';
          el.style.height = marker.properties.iconSize[1] + 'px';
          el.style.backgroundColor = marker.properties.iconColor;
          el.style.borderRadius = '100%';
          el.style.cursor = 'pointer';
          el.addEventListener('click', () => {
            this.selectSensor(el, marker)
          });
          new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .addTo(this.map);
          this.$store.state.sensor.forEach(sensor => {
            
          this.calcFireIndex(sensor)

          console.log(this.fireIndex)

          this.setPolyColor()
          
          console.log(this.polyColor)

            if (this.map.getLayer(sensor._id + 'area')) {
              this.map.removeLayer(sensor._id + 'area');
            }
            this.map.addLayer({
              'id': sensor._id + 'area',
              'type': 'fill',
              'source': sensor._id.toString() + 'poly', // reference the data source
              'layout': {},
              'paint': {
                'fill-color': this.polyColor, // blue color fill
                'fill-opacity': 0.5
              }
            });
          })
        })
      },
      getSensors(sensor) {
        this.$emit('showSensor', sensor)
      },

      getForest() {
        let centerPos = [];
        centerPos.push(this.$store.state.forest.location.latitude);
        centerPos.push(this.$store.state.forest.location.longitude);
        let longBound = [];
        longBound.push(centerPos[0] - 0.02);
        longBound.push(centerPos[1] - 0.02);
        let latBound = [];
        latBound.push(centerPos[0] + 0.05);
        latBound.push(centerPos[1] + 0.05);
        this.map = new mapboxgl.Map({
          container: "mapContainer",
          style: "mapbox://styles/mapbox/satellite-v9",
          center: centerPos,
          zoom: 14,
          maxBounds: [
            longBound,
            latBound,
          ],
        });
      },
      selectSensor(el, marker) {
        this.$store.state.sensor.forEach(sensor => {
          if (marker.properties.sensorId === sensor._id) {
            this.getSensors(sensor)
            console.log("click", sensor)
          }
        })
      },
    },
  };
</script>

<style scoped>
  #mapContainer {
    grid-column-start: 2;
    grid-column-end: 3;

    grid-row-start: 1;
    grid-row-end: 4;


  }

  .map {
    position: absolute;
    top: 5%;
    left: 5%;
    display: inline-block;
    width: 90%;
    height: 90%;
  }

  .marker {
    display: block;
    padding: 0;
    z-index: 2;
  }
</style>