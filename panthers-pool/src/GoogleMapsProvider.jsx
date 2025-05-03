// src/GoogleMapsProvider.jsx
import { LoadScript } from '@react-google-maps/api';

const libraries = ['places'];

export default function GoogleMapsProvider({ children }) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API;

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
      {children}
    </LoadScript>
  );
}
