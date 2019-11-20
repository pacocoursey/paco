import { useState, useMemo, useCallback } from 'react'

const SlideSwitch = ({ name, items }) => {
  const [active, setActive] = useState(items[0].value)
  const num = useMemo(() => items.findIndex(x => x.value === active), [
    items,
    active
  ])
  const color = useMemo(() => items[num].color, [items, num])

  const onChange = useCallback(
    e => {
      setActive(e.target.value)
    },
    [setActive]
  )

  return (
    <div className="switch">
      {items.map(item => {
        return (
          <label key={`${name}-${item.name}-${item.value}`}>
            <input
              type="radio"
              name={name}
              value={item.value}
              checked={active === item.value}
              onChange={onChange}
            />

            <span>{item.name}</span>
          </label>
        )
      })}

      <style jsx>{`
        .switch::before {
          transform: translateX(calc(${num} * 100%));
          background-color: ${color};
        }
      `}</style>

      <style jsx>{`
        .switch {
          width: 60%;
          display: flex;
          position: relative;
        }

        .switch::before {
          content: '';
          position: absolute;
          z-index: -1;
          width: calc(100% / 4);
          top: 0;
          left: 0;
          height: 100%;
          border-radius: 20px;
          transition: transform var(--transition),
            background-color var(--transition);
        }

        input {
          appearance: none;
          display: none;
        }

        input:checked + span {
          color: #fff;
          transition: color var(--transition);
        }

        span {
          border-radius: 20px;
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
          padding: var(--gap-quarter) var(--gap);

          transition: color var(--transition);
        }

        label:hover,
        label:focus,
        label:focus-within {
          outline: none;
          color: var(--fg);
        }
      `}</style>
    </div>
  )
}

export default SlideSwitch
