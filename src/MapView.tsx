import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MARKERS, MAP_W, MAP_H } from './mapData'

interface Props {
  focusId?: string | null
}

export default function MapView({ focusId }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const markerRefs = useRef<Record<string, L.Marker>>({})

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = L.map(containerRef.current, {
      crs: L.CRS.Simple,
      minZoom: -2,
      maxZoom: 2,
      zoomSnap: 0.25,
      attributionControl: false,
    })

    const bounds: L.LatLngBoundsExpression = [
      [0, 0],
      [MAP_H, MAP_W],
    ]
    L.imageOverlay(`${import.meta.env.BASE_URL}map-2026.png`, bounds).addTo(map)
    map.fitBounds(bounds)
    map.setMaxBounds([
      [-200, -200],
      [MAP_H + 200, MAP_W + 200],
    ])

    for (const m of MARKERS) {
      const icon = L.divIcon({
        className: 'map-marker',
        html: `<div class="map-pin">${m.emoji}</div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      })
      // CRS.Simple: lat = y (от низа), lng = x. Наши y — от верха картинки.
      const marker = L.marker([MAP_H - m.y, m.x], { icon })
        .addTo(map)
        .bindPopup(
          `<b>${m.emoji} ${m.name}</b>${m.note ? `<br/>${m.note}` : ''}`,
        )
      markerRefs.current[m.id] = marker
    }

    mapRef.current = map
    return () => {
      map.remove()
      mapRef.current = null
      markerRefs.current = {}
    }
  }, [])

  useEffect(() => {
    if (!focusId || !mapRef.current) return
    const m = MARKERS.find((x) => x.id === focusId)
    const marker = markerRefs.current[focusId]
    if (m && marker) {
      mapRef.current.setView([MAP_H - m.y, m.x], 0.5, { animate: true })
      marker.openPopup()
    }
  }, [focusId])

  return (
    <div className="map-wrap">
      <div ref={containerRef} className="map-container" />
      <p className="map-hint">
        Тапни по значку — увидишь, что там у нас по плану. Колесо/щипок — зум.
        {' '}
        <a
          href={`${import.meta.env.BASE_URL}map-2026-with-legend.png`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Полная карта с легендой (PNG)
        </a>
      </p>
    </div>
  )
}
