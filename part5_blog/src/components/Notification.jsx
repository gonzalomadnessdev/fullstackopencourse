import { useState, forwardRef, useImperativeHandle } from 'react'

const Notification = forwardRef((props, refs) => {
  const [message, setMessage] = useState(null)
  const [type, setType] = useState(null)

  useImperativeHandle(refs, () => {
    return { success, error }
  }, [])

  const send = (msg) => {
    setMessage(msg)
    setTimeout(() => { setMessage(null) }, 1500)
  }

  const success = (msg) => {
    setType('success')
    send(msg)
  }

  const error = (msg) => {
    setType('error')
    send(msg)
  }

  if (message === null) {
    return null
  }
  return (
    <div className={`notification notification-${type}`}>
      {message}
    </div>
  )
})

export default Notification