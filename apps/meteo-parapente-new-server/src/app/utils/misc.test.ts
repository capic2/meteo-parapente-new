import { degToCardinal8, formatDateYYYYMMDD } from './misc';
import { describe, expect, it } from 'vitest';
describe('misc', () => {
  it('should return the correct degree', () => {
    expect(degToCardinal8(0)).toBe('N');
    expect(degToCardinal8(45)).toBe('NE');
    expect(degToCardinal8(90)).toBe('E');
    expect(degToCardinal8(135)).toBe('SE');
    expect(degToCardinal8(180)).toBe('S');
    expect(degToCardinal8(225)).toBe('SW');
    expect(degToCardinal8(270)).toBe('W');
    expect(degToCardinal8(315)).toBe('NW');
  });

  it('should return the correct formatDateYYYYMMDD', () => {
    expect(formatDateYYYYMMDD(new Date('2025-08-16'))).toBe('20250816');
  });
});
