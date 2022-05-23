import { allowedColors } from "../config/allowedColors"

export const getVariantIdsFromColors = (colors: Array<string>): Array<number> => {
  return colors.map(color => {
    const match = allowedColors.find(allowedColor => allowedColor.cliName === color)
    if (!match) {
      throw new Error(`Variant not found for color ${color}!`);
    }
    return match.variantId
  })
}
