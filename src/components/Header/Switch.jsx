import { useState, useEffect } from 'react'

export default function Switch () {
  const [isCheck, setCheck] = useState(false)

  const enabledDarkMode = () => {
    localStorage.setItem('dark', true)
    document.documentElement.setAttribute('data-theme', 'dark')
    setCheck(true)
  }

  const disabledDarkMode = () => {
    localStorage.setItem('dark', false)
    document.documentElement.setAttribute('data-theme', 'light')
    setCheck(false)
  }

  const handleSwitch = (e) => {
    if (e.target.checked) enabledDarkMode()
    if (!e.target.checked) disabledDarkMode()
  }
  useEffect(() => {
    if (localStorage.getItem('dark') === 'true') {
      enabledDarkMode()
    } else {
      disabledDarkMode()
    }
  }, [])

  return (
  <label className="ui-switch">
     <input type="checkbox" onChange={handleSwitch} checked={isCheck}/>
    <div className="slider">
      <div className="circle"></div>
    </div>
  </label>
  )
}
