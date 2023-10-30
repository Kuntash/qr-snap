import React, { useCallback, useEffect, useRef, useState } from "react"
import { GoogleMap, LoadScript, RectangleF } from "@react-google-maps/api"
import { GeofenceMapProps } from "./types"
import { cn } from "@main/lib/utils"

export const GeofenceMap = (props: GeofenceMapProps) => {
  const { onChange, path, className } = props

  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral | null>(
    null
  )

  const [geofenceBounds, setGeofenceBounds] =
    useState<google.maps.LatLngBoundsLiteral | null>()

  const rectangleRef = useRef<google.maps.Rectangle | null>(null)

  // Call setPath with new edited path
  const onEdit = useCallback(() => {
    if (rectangleRef.current) {
    }
  }, [setGeofenceBounds])

  const onGeofenceLoad = useCallback((rectangle: google.maps.Rectangle) => {
    if (rectangle) {
      rectangleRef.current = rectangle
    }
  }, [])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMapCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })

        rectangleRef.current?.setBounds({
          north: position.coords.latitude + 0.0001,
          south: position.coords.latitude - 0.0001,
          east: position.coords.longitude + 0.0001,
          west: position.coords.longitude - 0.0001,
        })
        setGeofenceBounds({
          north: position.coords.latitude + 0.0001,
          south: position.coords.latitude - 0.0001,
          east: position.coords.longitude + 0.0001,
          west: position.coords.longitude - 0.0001,
        })
      })
    }
  }, [])

  // clean up refs
  const onRectangleUnMount = useCallback(() => {
    rectangleRef.current = null
  }, [])

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
      language="en"
    >
      <GoogleMap
        mapContainerClassName={cn(
          "geofence-google-map",
          "h-[400px] w-full",
          className
        )}
        zoom={18}
        center={mapCenter as google.maps.LatLngLiteral}
      >
        <RectangleF
          bounds={geofenceBounds as google.maps.LatLngBoundsLiteral}
          editable
          draggable
          onLoad={onGeofenceLoad}
          onUnmount={onRectangleUnMount}
        />
        {/* <Polygon
          path={geofencePath as google.maps.LatLngLiteral[]}
          editable
          draggable
          onLoad={onGeofenceLoad}
          onUnmount={onPolygonUnmount}
          options={{
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
          }}
          onMouseUp={onEdit}
          onDragEnd={onEdit}
        /> */}
      </GoogleMap>
    </LoadScript>
  )
}
