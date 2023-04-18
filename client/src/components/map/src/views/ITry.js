// import React from 'react';
// import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
// import Geocode from "react-geocode";
// import Autocomplete from 'react-google-autocomplete';
// import { Descriptions } from 'antd';

// import {
//     Marker,
//     GoogleMap,
//     // InfoWindow,
//     withScriptjs,
//     withGoogleMap,
//     // DirectionsRenderer,
//   } from 'react-google-maps'

// //import { MarkerWithLabel } from "react-google-maps/lib/components/addons/MarkerWithLabel";

// const MAP_SETTINGS = {
//     DEFAULT_MAP_OPTIONS: {
//       scrollwheel: false,
//       mapTypeControl: false,
//       fullscreenControl: false,
//       streetViewControl: false,
//     },
//     DEFAULT_CENTER: { lat: 57, lng: 20 },
//     DEFAULT_ZOOM: 4,
//     MARKER_SIZE: 35,
//     PIXEL_OFFSET: {
//       MARKER: {
//         X: 0,
//         Y: -35,
//       },
//     },
//     DIRECTIONS_OPTIONS: { suppressMarkers: true, preserveViewport: true },
//   }


// Geocode.setApiKey("AIzaSyDokhWHEeqZfrBHeQ18lQl5B2xvFlp55S4");
// Geocode.enableDebug();

// class LocationSearchModal extends React.Component {

    

//     render() {
//         const AsyncMap = (
//                     <GoogleMap
//                         defaultZoom={this.state.zoom}
//                         defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
//                     >
//                         {/* InfoWindow on top of marker */}

//                         {/*Marker*/}
//                         <Marker
//                             google={this.props.google}
//                             name={'Dolores park'}
//                             draggable={true}
//                             onDragEnd={this.onMarkerDragEnd}
//                             position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
//                         />
//                         {/* <InfoWindow
//                             onClose={this.onInfoWindowClose}
//                             position={{ lat: (this.state.markerPosition.lat + 0.0018), lng: this.state.markerPosition.lng }}
//                         >
//                             <div>
//                                 <span style={{ padding: 0, margin: 0 }}>{this.state.address}</span>
//                             </div>
//                         </InfoWindow> */}
//                         <Marker />

//                         {/* <MarkerWithLabel
//                             position={{ lat: -34.397, lng: 150.644 }}
//                             labelAnchor={new google.maps.Point(0, 0)}
//                             labelStyle={{ backgroundColor: "yellow", fontSize: "32px", padding: "16px" }}
//                         >
//                             <div>Hello There!</div>
//                         </MarkerWithLabel> */}


//                         {/* For Auto complete Search Box */}
//                         <Autocomplete
//                             style={{
//                                 width: '100%',
//                                 height: '40px',
//                                 paddingLeft: '16px',
//                                 marginTop: '2px',
//                                 marginBottom: '2rem'
//                             }}
//                             onPlaceSelected={this.onPlaceSelected(this.props.data)}
//                             types={['(regions)']}
//                         />
//                     </GoogleMap>
//             //     )
//             // )
//         );

//         return (
//             <div style={{ padding: '1rem', margin: '0 auto', maxWidth: 1000 }}>
//                 <h1>Google Map Basic</h1>
//                 <Descriptions bordered>
//                     <Descriptions.Item label="City">{this.state.city}</Descriptions.Item>
//                     <Descriptions.Item label="Area">{this.state.area}</Descriptions.Item>
//                     <Descriptions.Item label="State">{this.state.state}</Descriptions.Item>
//                     <Descriptions.Item label="Address">{this.state.address}</Descriptions.Item>
//                 </Descriptions>

//                 <AsyncMap
//                     googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyALVjLwOIM1gf7EzdJJVmWLKdLP-yZGTcw&libraries=places"
//                     loadingElement={
//                         <div style={{ height: `100%` }} />
//                     }
//                     containerElement={
//                         <div style={{ height: this.state.height }} />
//                     }
//                     mapElement={
//                         <div style={{ height: `100%` }} />
//                     }
//                 />
//             </div>
//         )
//     }

// }

// export default LocationSearchModal;

