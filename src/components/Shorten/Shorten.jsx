import { useState } from 'react'
import Spinner from '../Global/Spinner.jsx'
import { Form } from '../Global/Form.jsx'
import toast from 'react-hot-toast'
import { copyClipboard } from '../../lib/utils.ts'

const API_SHORTEN = 'https://ulvis.net/API/write/get?url='
const CUSTOM_URL = '&custom='
const SETTING_URL = '&private=1&type=json'

export const Shorten = () => {
  const [loading, setLoading] = useState(false)
  const [shortenUrl, setShortenUrl] = useState()

  const submitForm = (e) => {
    e.preventDefault()
    setLoading(true)
    const data = new FormData(e.target)
    const url = data.get('url')
    const custom = data.get('custom') || 'Shorten'
    const urlShorten = API_SHORTEN + url + CUSTOM_URL + custom + SETTING_URL
    fetch(urlShorten)
      .then((res) => res.json())
      .then((data) => setShortenUrl(data.data.url))
      .catch(() => {
        toast('Error, Inténtalo más tarde o Prueba usando otra url',
          {
            icon: '✖️',
            style: {
              borderRadius: '10px',
              background: 'var(--background)',
              color: 'var(--red)'
            }
          })
      })
      .finally(() => {
        setLoading(false)
        toast('Listo',
          {
            icon: '✅',
            style: {
              borderRadius: '10px',
              background: 'var(--background)',
              color: 'var(--text)'
            }
          })
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
    <section className="flex f-col">
      <Form bg="secondary" color="txt-contrast" textBtn="Acortar" submitForm={submitForm}>
        <fieldset>
        <label className="input flex f-col gap-nm">
          Escribe la Url.
          <input name="url" style={{ maxWidth: '100%' }} type="text" placeholder="URL" required/>
        </label>
        </fieldset>
        <fieldset>
          <label className="input flex f-col gap-nm">
            Escribe un nombre para tu url.
            <input name="custom" style={{ maxWidth: '100%' }} type="text" placeholder="tucustomname" required/>
          </label>
        </fieldset>
      </Form>
      <article style={{ minHeight: '20dvh' }}>
        {loading && <Spinner />}
        {shortenUrl && <p className="txt-sm">Tu url acortada es: </p> }
        {shortenUrl && <a className="txt-blue" href={shortenUrl} target="_blank" onClick={handleCopy}>{shortenUrl}</a>}
        {shortenUrl && <p className="txt-sm txt-secondary">Haz click en la url para copiarla</p>}
        {shortenUrl && <button className="btn transparent br-secondary" onClick={clean}>Nuevo</button>}
      </article>
    </section>
  )
}
