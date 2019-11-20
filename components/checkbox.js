export const Checkboxes = ({ children }) => {
  return (
    <div>
      {children}
      <style jsx>{`
        div {
          display: flex;
        }
      `}</style>
    </div>
  )
}

export const Checkbox = ({ name, color, checked }) => {
  return (
    <label>
      <input type="checkbox" name={name} defaultChecked={checked} />
      <span>{name}</span>

      <style jsx>{`
        label {
          --color: ${color};
        }
      `}</style>

      <style jsx>{`
        input {
          clip: rect(0 0 0 0);
          clip-path: inset(100%);
          height: 1px;
          overflow: hidden;
          position: absolute;
          white-space: nowrap;
          width: 1px;
          appearance: none;
        }

        input:checked + span {
          color: #fff;
          background-color: var(--color);
          transition: color var(--transition),
            background-color var(--transition);
        }

        span {
          background: transparent;
          padding: var(--gap-quarter) var(--gap);
          border-radius: var(--radius);
        }

        label {
          user-select: none;
          flex: 1;
          display: flex;
          justify-content: center;
          position: relative;
          cursor: pointer;
          color: var(--gray);
          font-weight: 500;
          white-space: nowrap;

          transition: color var(--transition);
        }

        label + :global(label) {
          margin-left: var(--gap-half);
        }

        label:hover,
        label:focus,
        label:focus-within {
          outline: none;
          color: var(--fg);
        }
      `}</style>
    </label>
  )
}
