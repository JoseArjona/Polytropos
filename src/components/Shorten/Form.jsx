import { useState } from "react";
import Spinner from '../Global/Spinner.jsx';
import { copyClipboard } from "../../lib/utils.ts";

const API_SHORTEN = "https://ulvis.net/API/write/get?url=";
const CUSTOM_URL = "&custom=poly";
const SETTING_URL = "&private=1&type=json";

export const Form = () => {
  const [loading, setLoading] = useState(false);
  const [shortenUrl, setShortenUrl] = useState();

  const submitForm = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.target);
    const url = data.get("url");
    const custom = data.get("custom") || 'Shorten';
    const urlShorten = API_SHORTEN + url + CUSTOM_URL + custom + SETTING_URL;
    fetch(urlShorten)
    .then((res) => res.json())
    .then((data) => setShortenUrl(data.data.url))
    .catch((error)=> console.error(error))
    .finally(()=> setLoading(false))
  };

  const handleCopy = () => {
    copyClipboard(shortenUrl)
  }

  const clean = () =>  {
    setLoading(false)
    setShortenUrl('')
    document.querySelector('form').reset()
  }

  return (
    <section className="flex f-col">
      <form className="flex f-col gap-bg" onSubmit={submitForm}>
        <fieldset>
        <label className="input flex f-col gap-nm">
          Escribe la Url.
          <input name="url" style={{ maxWidth: "100%" }} type="text" placeholder="URL" required/>
        </label>
        </fieldset>
        <fieldset>
          <label className="input flex f-col gap-nm">
            Escribe un nombre para tu url.
            <input  name="custom" style={{ maxWidth: "100%" }} type="text" placeholder="poly-tucustomname" required/>
          </label>
        </fieldset>
        <div className="flex f-col">
          <button className="btn center secondary txt-contrast" type="submit">
            Acortar
          </button>
        </div>
      </form>
      <article style={{minHeight : "20dvh"}}>
        {loading && <Spinner />}
        {shortenUrl && <p className="txt-sm">Tu url acortada es: </p> }
        {shortenUrl && <a className="txt-blue" href={shortenUrl}  target="_blank" onClick={handleCopy}>{shortenUrl}</a>}
        {shortenUrl && <p className="txt-sm txt-secondary">Haz click en la url para copiarla</p>}
        {shortenUrl && <button className="btn transparent br-secondary" onClick={clean}>Nuevo</button>}
      </article>
    </section>
  );
};
