export type GeofenceMapProps = {
  path?: { lat: number; lng: number }[]
  // eslint-disable-next-line no-unused-vars
  onChange: (path: { lat: number; lng: number }[]) => void
  className?: string
}
