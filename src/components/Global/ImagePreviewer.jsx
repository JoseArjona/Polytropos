import { useRef } from 'react'
import { BlobFetch } from '../../lib/utils'
import toast from 'react-hot-toast'
export const ImagePreviewer = ({ imageUrl, fileName = 'img-' }) => {
  const downloadRef = useRef(null)
  const downloadImage = async () => {
    try {
      const blob = await BlobFetch(imageUrl)
      const url = URL.createObjectURL(blob)
      downloadRef.current.href = url
      downloadRef.current.download = `${fileName}${Date.now()}.png`
      downloadRef.current.click()
      URL.revokeObjectURL(url) // Liberar memoria después de descarga
    } catch (error) {
      console.error('Error al Procesar la imagen:', error)
      toast('Error, No se pudo Procesar la imagen, Descarga la imagen de forma manual',
        {
          icon: '✖️',
          style: {
            borderRadius: '10px',
            background: 'var(--background)',
            color: 'var(--red)'
          }
        })
    }
  }
  return (
    <article>
        <picture className="mt px flex center" >
        <img src={imageUrl} alt="QR generado" style={{ maxWidth: '100%', cursor: 'pointer' }} onClick={downloadImage}/>
        </picture>
        <p className="txt-sm txt-secondary">Haz click en la imagen para copiarla</p>
        <a href="" ref={downloadRef} style={{ display: 'none' }} target="_blank" rel="noreferrer" ></a>
    </article>
  )
}
