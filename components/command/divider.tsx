import { memo } from 'react'
import cn from 'classnames'
import defaultStyles from './command.module.css'

const Divider: React.FC<{ className?: string }> = memo(({ className }) => (
  <li className={cn(defaultStyles.divider, className)} />
))

export default Divider
