export const Form = ({ submitForm, bg, color, textBtn = 'Enviar', children }) => {
  const styleClass = `btn center ${bg} ${color}`

  return (
    <form className="flex f-col gap-bg" onSubmit={submitForm}>
        {children}
        <div className="flex f-col">
          <button className={styleClass} type="submit">
            {textBtn}
          </button>
        </div>
     </form>
  )
}
