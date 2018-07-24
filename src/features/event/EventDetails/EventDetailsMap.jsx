import React from 'react';
import { Segment, Icon } from 'semantic-ui-react';
import GoogleMapReact from 'google-map-react';

const Marker = () => {
    return (
        <Icon name='marker' size='big' color='red' />
    )
}

const EventDetailsMap = ({ lat, lng }) => {
    const center = [lat, lng];
    const zoom = 14;
    return (
        <Segment attached='bottom' style={{padding: 0}}>
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyC0CSi7BBxMF3aORIwq0hcpDzmLn_9_200' }}
                    defaultCenter={center}
                    defaultZoom={zoom}
                >
                    <Marker
                        lat={lat}
                        lng={lng}
                    />
                </GoogleMapReact>
            </div>
        </Segment>
    )
}

export default EventDetailsMap;