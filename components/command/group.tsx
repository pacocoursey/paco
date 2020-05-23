import { memo } from 'react'
import cn from 'classnames'
import defaultStyles from './command.module.css'

const Label: React.FC<{ className?: string }> = memo(
  ({ className, children }) => {
    return <li className={cn(defaultStyles.label, className)}>{children}</li>
  }
)

Label.displayName = 'Label'

const Group: React.FC<{ className?: string; title: string }> = ({
  className,
  children,
  title
}) => {
  return (
    <>
      <Label className={className}>{title}</Label>
      {children}
    </>
  )
}

export default Group
