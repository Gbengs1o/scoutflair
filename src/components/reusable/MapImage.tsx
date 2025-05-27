"use client";
import React, { FC, useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import { Style, Icon } from "ol/style";
import { defaults as defaultControls } from "ol/control";

const MapImage: FC<{ latitude: number; longitude: number }> = ({
  latitude,
  longitude,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapContainer.current) {
      const markerFeature = new Feature({
        geometry: new Point(fromLonLat([longitude, latitude])),
      });

      markerFeature.setStyle(
        new Style({
          image: new Icon({
            src: "https://openlayers.org/en/latest/examples/data/icon.png",
            scale: 0.5,
          }),
        })
      );

      const map = new Map({
        target: mapContainer.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          new VectorLayer({
            source: new VectorSource({
              features: [markerFeature],
            }),
          }),
        ],
        view: new View({
          center: fromLonLat([longitude, latitude]),
          zoom: 10,
        }),
        controls: defaultControls({
          attribution: true, // Ensure attribution is enabled
        }),
      });

      return () => map.setTarget(undefined);
    }
  }, [latitude, longitude]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        borderRadius: "1rem",
      }}
    >
      <div
        ref={mapContainer}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default MapImage;
