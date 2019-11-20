import cn from 'classnames'

const Button = ({ disabled, loading, children }) => {
  return (
    <button disabled={disabled} className={cn({ loading })}>
      {children}

      <style jsx>{`
        button {
          cursor: pointer;
          margin-left: var(--gap);
          border-radius: var(--radius);
          color: #fff;
          font-weight: 500;
          background: var(--blue);
          border: none;
          padding: var(--gap-half) var(--gap);
          transition: background-color var(--transition),
            color var(--transition);
        }

        button:hover,
        button:focus {
          outline: none;
          color: #fff;
          background: var(--blue);
        }

        button[disabled] {
          cursor: not-allowed;
          background: var(--lighter-gray);
          color: var(--gray);
        }
      `}</style>
    </button>
  )
}

export default Button
