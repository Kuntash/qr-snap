import React, { memo, useCallback, useEffect, useRef, useState } from "react"
import { GoogleMap, LoadScript, RectangleF } from "@react-google-maps/api"
import { GeofenceMapProps } from "./types"
import { cn } from "@main/lib/utils"

export const GeofenceMap = (props: GeofenceMapProps) => {
  const { onChange, bounds, className } = props

  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral | null>(
    null
  )
  const rectangleRef = useRef<google.maps.Rectangle | null>(null)

  const onGeofenceLoad = useCallback((rectangle: google.maps.Rectangle) => {
    if (rectangle) {
      rectangleRef.current = rectangle
    }
  }, [])
  useEffect(() => {
    if (bounds) {
      console.log("bounds", bounds)
      setMapCenter({
        lat: (bounds.north + bounds.south) / 2,
        lng: (bounds.east + bounds.west) / 2,
      })
      return
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log("position", position)
        setMapCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        onChange({
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
        zoom={20}
        center={mapCenter as google.maps.LatLngLiteral}
      >
        <RectangleF
          bounds={bounds as google.maps.LatLngBoundsLiteral}
          editable
          draggable
          onBoundsChanged={() => {
            const bounds: google.maps.LatLngBoundsLiteral = {
              north:
                rectangleRef.current?.getBounds()?.getNorthEast()?.lat() ?? 0,
              east:
                rectangleRef.current?.getBounds()?.getNorthEast()?.lng() ?? 0,
              south:
                rectangleRef.current?.getBounds()?.getSouthWest()?.lat() ?? 0,
              west:
                rectangleRef.current?.getBounds()?.getSouthWest()?.lng() ?? 0,
            }
            onChange(bounds)
            console.log("🚀 ~ file: GeofenceMap.tsx:59 ~ rectangleR", bounds)
          }}
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

export const GeofenceMapMemoized = memo(GeofenceMap, (oldProps, newProps) => {
  const oldNorth = oldProps.bounds?.north.toFixed(5)
  const oldSouth = oldProps.bounds?.south.toFixed(5)
  const oldEast = oldProps.bounds?.east.toFixed(5)
  const oldWest = oldProps.bounds?.west.toFixed(5)

  const newNorth = newProps.bounds?.north.toFixed(5)
  const newSouth = newProps.bounds?.south.toFixed(5)
  const newEast = newProps.bounds?.east.toFixed(5)
  const newWest = newProps.bounds?.west.toFixed(5)
  return (
    oldNorth === newNorth &&
    oldSouth === newSouth &&
    oldEast === newEast &&
    oldWest === newWest
  )
})
