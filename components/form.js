import { memo, useState, useCallback } from 'react'
import Button from './button'

const Form = ({ placeholder }) => {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState('')

  const onSubmit = useCallback(
    e => {
      e.preventDefault()
      setLoading(true)

      // Do form stuff here
    },
    [value]
  )

  return (
    <form onSubmit={onSubmit}>
      <div>
        <input
          type="url"
          placeholder={placeholder}
          maxLength={200}
          onChange={e => setValue(e.target.value)}
        />
        <Button disabled={!value} loading={loading}>
          Send
        </Button>
      </div>

      <style jsx>{`
        form {
          margin: var(--small-gap) 0;
        }

        div {
          border: 1px solid var(--lighter-gray);
          display: flex;
          border-radius: var(--radius);
          padding: var(--gap-half);
          transition: border-color var(--transition);
        }

        div:hover,
        div:focus-within {
          border-color: var(--light-gray);
        }

        input {
          flex: 1;
          width: 100%;
          background: none;
          border-radius: var(--radius);
          color: var(--fg);
          border: none;
          padding: var(--gap-half);
          font-size: 1rem;
          outline: none;
        }
      `}</style>
    </form>
  )
}

export default memo(Form)
