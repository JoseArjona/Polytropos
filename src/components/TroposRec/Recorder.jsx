import { useState } from 'react'
export const Recorder = () => {
  const [recorder, setRecorder] = useState(null)
  const [includeAudio, setIncludeAudio] = useState(false)

  const handleClick = async () => {
    const media = await navigator.mediaDevices.getDisplayMedia({
      video: { frameRate: { ideal: 30 } },
      audio: includeAudio

    })
    const mediaRecorder = new MediaRecorder(media, {
      mimeType: 'video/webm;codecs=vp8,opus'
    })

    mediaRecorder.start()

    setRecorder(mediaRecorder)

    const [video] = media.getVideoTracks()
    video.addEventListener('ended', () => {
      mediaRecorder.stop()
      setRecorder(null)
    })

    mediaRecorder.addEventListener('dataavailable', e => {
      const blob = new Blob([e.data], { type: 'video/webm' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'captura.webm'
      a.click()
      URL.revokeObjectURL(url)
    }) 
  }

  const stopRecording = () => {
    if (recorder) {
      recorder.stop()
      setRecorder(null)
    }
  }

  return (
    <div className="flex f-col gap-nm">
       <label>
        <input type="checkbox" checked={includeAudio} onChange={(e) => setIncludeAudio(e.target.checked)}/>
        Grabar con audio
      </label>
       <div className="flex f-row gam-nm">
       <button className="btn green txt-dark" onClick={handleClick}>
          Grabar Pantalla
        </button>
        {recorder && <button className="btn red txt-light" onClick={stopRecording}>
          Detener
        </button>}
       </div>
    </div>
  )
}
