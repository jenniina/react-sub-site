// // colors.test.ts
// import { rgbToHSL, hslToRGB, hslToHex } from '../../utils'

// test('rgbToHSL returns saturation within 0-100%', () => {
//   const { s } = rgbToHSL(255, 0, 0)
//   expect(s).toBeLessThanOrEqual(100)
//   expect(s).toBeGreaterThanOrEqual(0)
// })

// test('hslToRGB handles saturation correctly', () => {
//   const { r, g, b } = hslToRGB(0, 100, 50)
//   expect(r).toBe(255)
//   expect(g).toBe(0)
//   expect(b).toBe(0)
// })

// test('hslToHex generates valid HEX with correct saturation', () => {
//   const hex = hslToHex(0, 100, 50)
//   expect(hex).toBe('#FF0000')
// })

// test('Clamping function correctly limits values', () => {
//   const clamp = (value: number, min: number, max: number): number => {
//     return Math.max(min, Math.min(value, max))
//   }

//   expect(clamp(150, 0, 100)).toBe(100)
//   expect(clamp(-20, 0, 100)).toBe(0)
//   expect(clamp(50, 0, 100)).toBe(50)
// })
