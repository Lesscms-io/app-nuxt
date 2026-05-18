// Build a CSS gradient string. Mirrors lesscms/app/vue/src/utils/gradient.ts —
// duplicated here because the Nuxt app is a separate package, no shared util.

export function buildGradientStops (startColor: string, endColor: string, intensity = 0): string {
  const i = Math.max(0, Math.min(100, Number(intensity) || 0))
  if (i <= 0) return `${startColor} 0%, ${endColor} 100%`
  const hold = i / 2
  return `${startColor} 0%, ${startColor} ${hold.toFixed(2)}%, ${endColor} ${(100 - hold).toFixed(2)}%, ${endColor} 100%`
}

export function buildGradientCss (
  type: string,
  angle: number,
  position: string,
  intensity: number,
  startColor: string,
  endColor: string
): string {
  const stops = buildGradientStops(startColor, endColor, intensity)
  if (type === 'radial') {
    return `radial-gradient(circle at ${position || 'center'}, ${stops})`
  }
  return `linear-gradient(${angle}deg, ${stops})`
}
