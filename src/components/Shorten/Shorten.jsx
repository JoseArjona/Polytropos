import { useState } from 'react'
import Spinner from '../Global/Spinner.jsx'
import { Form } from '../Global/Form.jsx'
import toast from 'react-hot-toast'
import { copyClipboard } from '../../lib/utils.ts'

const API_SHORTEN = 'https://spoo.me/?url='
const CUSTOM_URL = '&alias='

export const Shorten = () => {
  const [loading, setLoading] = useState(false)
  const [shortenUrl, setShortenUrl] = useState()

  const submitForm = async (e) => {
    e.preventDefault()
    setLoading(true)
    const data = new FormData(e.target)
    const url = data.get('url')
    const custom = data.get('custom') || 'Shorten'
    const urlShorten = API_SHORTEN + url + CUSTOM_URL + custom
    const res = await fetch(urlShorten, {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Accept: 'application/json'
      },
      body: {
        urlShorten
      }
    })
    if (!res.ok) {
      toast('Error, Inténtalo más tarde o Prueba usando otra url', {
        icon: '✖️',
        style: {
          borderRadius: '10px',
          background: 'var(--background)',
          color: 'var(--red)'
        }
      })
      setLoading(false)
      return
    }
    const json = await res.json()
    setShortenUrl(json.short_url)
    setLoading(false)
    toast('Listo', {
      icon: '✅',
      style: {
        borderRadius: '10px',
        background: 'var(--background)',
        color: 'var(--text)'
      }
    })
  }

  const handleCopy = () => {
    copyClipboard(shortenUrl)
  }

  const clean = () => {
    setLoading(false)
    setShortenUrl('')
    document.querySelector('form').reset()
  }

  return (
    <section className='flex f-col'>
      <Form
        bg='secondary'
        color='txt-contrast'
        textBtn='Acortar'
        submitForm={submitForm}
      >
        <fieldset>
          <label className='input flex f-col gap-nm'>
            Escribe la Url.
            <input
              name='url'
              style={{ maxWidth: '100%' }}
              type='text'
              placeholder='URL'
              required
            />
          </label>
        </fieldset>
        <fieldset>
          <label className='input flex f-col gap-nm'>
            Escribe un alias para tu url.
            <input
              name='custom'
              style={{ maxWidth: '100%' }}
              type='text'
              placeholder='tucustomname'
              required
            />
          </label>
        </fieldset>
      </Form>
      <article className='mb'>
        {loading && <Spinner />}
        {shortenUrl && <p className='txt-sm'>Tu url acortada es: </p>}
        {shortenUrl && (
          <a
            className='txt-blue'
            href={shortenUrl}
            target='_blank'
            onClick={handleCopy}
            rel='noreferrer'
          >
            {shortenUrl}
          </a>
        )}
        {shortenUrl && (
          <p className='txt-sm txt-secondary'>
            Haz click en la url para copiarla
          </p>
        )}
        {shortenUrl && (
          <button className='btn transparent br-secondary' onClick={clean}>
            Nuevo
          </button>
        )}
      </article>

    </section>
  )
}
