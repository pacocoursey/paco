import styles from './button.module.css'

const Button = ({ onClick, children, disabled }) => {
  return (
    <button onClick={onClick} className={styles.button} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button
