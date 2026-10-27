export const MAX_CHIP_ANGLE = 25 * Math.PI / 180;
export function containedPose(x: number, y: number, angle: number, chipWidth: number, chipHeight: number, width: number, height: number) {
  const rotation = Math.max(-MAX_CHIP_ANGLE, Math.min(MAX_CHIP_ANGLE, angle));
  const halfWidth = (Math.abs(Math.cos(rotation)) * chipWidth + Math.abs(Math.sin(rotation)) * chipHeight) / 2;
  const halfHeight = (Math.abs(Math.sin(rotation)) * chipWidth + Math.abs(Math.cos(rotation)) * chipHeight) / 2;
  return { x: Math.max(halfWidth, Math.min(width - halfWidth, x)), y: Math.max(halfHeight, Math.min(height - halfHeight, y)), angle: rotation };
}