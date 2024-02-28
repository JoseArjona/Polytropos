

export const copyClipboard = (textToCopy : string) => {
  if(!textToCopy) return
  navigator.clipboard.writeText(textToCopy);
}