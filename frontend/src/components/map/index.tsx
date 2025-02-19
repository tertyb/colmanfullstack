
import './index.scss';
import 'leaflet/dist/leaflet.css';
// MapComponent.jsx
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';



// This component handles clicks on the map.
interface LocationSelectorProps {
    setLocationName: (name: string) => void;
    setNewLocationNameSelector: (name: string) => void;
    setLocationX: (cord: number) => void;
    setLocationY: (name: number) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ setLocationName, setLocationX, setLocationY,setNewLocationNameSelector }) => {
    const [selectedPosition, setSelectedPosition] = useState<L.LatLng | null>(null);


    useMapEvents({
        async click(e) {
            const { lat, lng } = e.latlng;
            // Reverse geocode to get the location name using Nominatim.
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
                );
                const data = await response.json();
                const name = data.display_name || 'Unknown location';
                setSelectedPosition(e.latlng);
                setLocationX(lng)
                setLocationY(lat)
                setLocationName(name);
                setNewLocationNameSelector(name);
            } catch (error) {
                console.error('Reverse geocoding error:', error);
            }
        },
    });

    return selectedPosition ? (
        <Marker position={selectedPosition}>
        </Marker>
    ) : null;
};

interface MapComponentProps {
    savedLocation: { position: [number, number] };
    locationNameChange: (name: string) => void;
    setLocationX: (cord: number) => void;
    setLocationY: (name: number) => void;
    edit: boolean

}

const MapComponent: React.FC<MapComponentProps> = ({ locationNameChange, setLocationX, setLocationY, savedLocation, edit }) => {

  const [newlocationName, setNewLocationName] = useState('');

    return (
        <MapContainer
            center={!(savedLocation.position[0] === 1.0464363474 && savedLocation.position[1] === 3.0464363474) ? savedLocation.position : [51.505, -0.09]}
            zoom={13}
            style={{ width: '100%', height: '300px', zIndex: 1 }}
        >
            <TileLayer
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {edit &&
                <LocationSelector
                    setLocationName={locationNameChange}
                    setNewLocationNameSelector={setNewLocationName}
                    setLocationX={setLocationX}
                    setLocationY={setLocationY}

                />
            }

            {/* Render saved locations as markers.
          Since you’re storing only the location name in your DB, you’ll need to
          forward geocode the name to get coordinates for displaying markers. */}
            {savedLocation && newlocationName == '' &&

                < Marker position={savedLocation.position}>
        </Marker>
            }
        </MapContainer >
    );
};

export default MapComponent;
