import React from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import 'react-leaflet-fullscreen-control'
import 'antd/dist/antd.css'

class Example extends React.Component {
  render() {
    const position = [51.505, -0.09]
    return (
      <div>
        <Map
          style={{ width: '50vw', height: '50vh' }}
          center={position}
          zoom={13}
          fullscreenControl
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup.
              <br />
              Easily customizable.
            </Popup>
          </Marker>
        </Map>
      </div>
    )
  }
}

export default Example
