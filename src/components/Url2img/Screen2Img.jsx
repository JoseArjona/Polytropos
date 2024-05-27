import { useState } from 'react'
import Spinner from '../Global/Spinner.jsx'
import { Form } from '../Global/Form.jsx'
import toast from 'react-hot-toast'
import { ImagePreviewer } from '../Global/ImagePreviewer.jsx'

const API_IMG = 'https://image.thum.io/get/png/'

export const Screen2Img = () => {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState()

  const submitForm = async (e) => {
    e.preventDefault()
    setLoading(true)
    const data = new FormData(e.target)
    const url = data.get('url')
    const custom = data.get('custom') || ''
    const size = (custom === '') ? '/' : `width/${custom}/`
    const urlScreenImage = API_IMG + size + url
    if (!urlScreenImage) {
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
      setImageUrl(urlScreenImage)
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
    <section className='flex f-col'>
      <Form bg='blue' color='txt-contrast' textBtn='Capturar' submitForm={submitForm}>
        <fieldset>
          <label className='input flex f-col gap-nm'>
            Escribe la Url.
            <input name='url' style={{ maxWidth: '100%' }} type='text' placeholder='URL' required />
          </label>
        </fieldset>
        <fieldset>
          <label className='input flex f-col gap-nm'>
            Establece un tamaño en px.
            <div className='flex f-row'>
              <input aria-label='tamaño en pixeles en la imagen' name='custom' style={{ maxWidth: '100%' }} type='text' pattern='^[0-9/]+$' placeholder='Solo números' />
              <span className='secondary txt-contrast radius' style={{ padding: '10px' }}>PX</span>
            </div>
          </label>
          <p className='txt-sm txt-secondary'>Puedes ignorarlo</p>
        </fieldset>

      </Form>
      {
        loading && <Spinner />
       }
      {
        imageUrl && <ImagePreviewer imageUrl={imageUrl} fileName='screenshot' />
      }
    </section>

  )
}
