const IMG_BASE_URL = import.meta.env.VITE_IMG_BASE_URL

export function imgUrl(path) {
  if (!path) return ''
  if (/^https?:\/\//.test(path)) return path
  return IMG_BASE_URL + path
}
