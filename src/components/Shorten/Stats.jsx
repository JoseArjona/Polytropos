import { useState } from 'react'
import Spinner from '../Global/Spinner.jsx'
import { Form } from '../Global/Form.jsx'
import toast from 'react-hot-toast'

const API_SHORTEN = 'https://spoo.me/stats/'
export const Stats = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const statsForm = async (e) => {
    e.preventDefault()
    setLoading(true)
    const data = new FormData(e.target)
    const alias = data.get('alias')
    const url = API_SHORTEN + alias
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      }
    })
    if (!res.ok) {
      setLoading(false)
      toast('Error, Asegúrate de que el alias sea correcto. Inténtalo más tarde o Prueba usando otra alias', {
        icon: '✖️',
        style: {
          borderRadius: '10px',
          background: 'var(--background)',
          color: 'var(--red)'
        }
      })
      return setData(null)
    }
    const json = await res.json()
    setData(json)
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
  return (
    <details className='radius br-primary px'>
      <summary className='txt-primary'>Obtener Estadísticas</summary>
      <Form
        bg='secondary'
        color='txt-contrast'
        textBtn='Consultar'
        submitForm={statsForm}
      >
        <fieldset>
          <label className='input pt flex f-col gap-nm' ariaLabel='Escribe el alias de tu url'>
            Escribe el alias de tu url.
            <input
              name='alias'
              style={{ maxWidth: '100%' }}
              type='text'
              placeholder='alias'
              required
            />
          </label>
        </fieldset>
      </Form>
      {loading && <Spinner />}
      {data && !loading && (
        <>
          <div className='txt-sm'>
            <h4>Visitas</h4>
            <p>Visitas: {data.total_unique_clicks}</p>
            <p>Ultima visita: {data['last-click-country']} {data['last-click']}</p>
          </div>
          <article className='grid col-3 sm-col-2'>
            <header className='span-3 sm-span-2'>
              <h4>Promedio de clicks</h4>
            </header>
            <section className='card br-accent f-col center middle sm-span-2 '>
              <p className='txt-sm'>Diarios</p>
              <p className='txt-accent txt-bg'>{data.average_daily_clicks}</p>
            </section>
            <section className='card br-accent f-col center middle '>
              <p className='txt-sm'>Mensuales</p>
              <p className='txt-accent txt-bg'>{data.average_monthly_clicks}</p>
            </section>
            <section className='card br-accent f-col center middle '>
              <p className='txt-sm'>Semanales</p>
              <p className='txt-accent txt-bg'>{data.average_weekly_clicks}</p>
            </section>
          </article>
        </>
      )}
    </details>
  )
}
