import { describe, expect, it } from 'vitest';
import { containedPose, MAX_CHIP_ANGLE } from '../components/studio/physicsRules';
describe('Contained hero physics', () => {
  it('limits rotation to 13 degrees in both directions', () => {
    expect(MAX_CHIP_ANGLE).toBe(13 * Math.PI / 180);
    expect(containedPose(200,200,2,100,40,400,400).angle).toBe(MAX_CHIP_ANGLE);
    expect(containedPose(200,200,-2,100,40,400,400).angle).toBe(-MAX_CHIP_ANGLE);
  });
  it('keeps chips inside all four walls, including the top', () => {
    expect(containedPose(-10,-100,0,100,40,400,300)).toEqual({x:50,y:20,angle:0});
    expect(containedPose(900,900,0,100,40,400,300)).toEqual({x:350,y:280,angle:0});
  });
});