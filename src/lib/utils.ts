

export const copyClipboard = (textToCopy : string) => {
  if(!textToCopy) return
  navigator.clipboard.writeText(textToCopy);
}

export const BlobFetch = async (url : string) => {
  const response = await fetch(url)
  const blob = await response.blob()
  return blob
}