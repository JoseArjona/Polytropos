import { useState } from 'react'
import Spinner from '../Global/Spinner.jsx'
import { Form } from '../Global/Form.jsx'
import toast from 'react-hot-toast'

const API_IMG = 'https://api.qrserver.com/v1/create-qr-code/?data='

export const Qrgen = () => {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState()

  const submitForm = async (e) => {
    e.preventDefault()
    setLoading(true)
    const data = new FormData(e.target)
    const info = data.get('info')
    const size = data.get('size')
    const color = data.get('color') || '000'
    const bgcolor = data.get('bgcolor') || 'fff'
    const style = `&color=${color.substring(1)}&bgcolor=${bgcolor.substring(1)}`
    const qrImage = API_IMG + info + '&size=' + `${size}x${size}` + style
    console.log(qrImage)
    if (!qrImage) {
      toast('Error, Inténtalo más tarde o Prueba usando otra url',
        {
          icon: '✖️',
          style: {
            borderRadius: '10px',
            background: 'var(--background)',
            color: 'var(--red)'
          }
        })
    } else {
      setImageUrl(qrImage)
      toast('Listo',
        {
          icon: '✅',
          style: {
            borderRadius: '10px',
            background: 'var(--background)',
            color: 'var(--text)'
          }
        })
    }
    setLoading(false)
  }

  return (
    <section className="flex f-col">
      <Form bg="primary" color="txt-contrast" textBtn="Generar" submitForm={submitForm}>
        <fieldset>
        <label className="input flex f-col gap-nm">
          Escribe la información.
          <input name="info" style={{ maxWidth: '100%' }} type="text" placeholder="URL" required/>
        </label>
        </fieldset>
        <fieldset className='grid col-2 sm-col-1 middle'>
          <label className="input flex f-col gap-nm f-wrap center">
            Establece un tamaño en px.
            <div className="flex f-row">
            <input aria-label="tamaño en pixeles en la imagen" name="size" style={{ maxWidth: '100%' }} type="text" pattern="^[0-9]+$" placeholder="Solo números" required/>
            <span className="secondary txt-contrast radius" style={{ padding: '10px' }}>PX</span>
            </div>
          </label>
          <label className="flex f-col gap-nm ">
            Establece un color (opcional).
            <div className="flex f-row between" style={{ padding: '8px' }}>
            <div className="flex f-row">
              Color
            <input className="contrast br-none " name="color" type="color" defaultValue="#000000" />
            </div>
            <div className="flex f-row">
              Fondo
            <input className="contrast br-none" name="bgcolor" type="color" defaultValue="#ffffff" />
            </div>
            </div>
          </label>

        </fieldset>

    </Form>
      {
        loading && <Spinner />
       }
      <article>
        <picture className="mt px flex center" style={{ cursor: 'pointer' }}>
       { imageUrl && <img src={imageUrl} alt="QR generado" style={{ maxWidth: '100%' }} /> }
        </picture>
       {imageUrl && <p className="txt-sm txt-secondary">Haz click en la imagen para copiarla</p> }
      </article>
    </section>

  )
}
