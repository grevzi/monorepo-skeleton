export const capitalize = (text: string) => {
  if (!text.length) return text
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}