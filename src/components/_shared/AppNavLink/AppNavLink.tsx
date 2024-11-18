import { FC, RefAttributes } from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'
import { combineClassNames } from 'utils/classNames'
import styles from './AppNavLink.module.css'

type CustomProps = {
  primary?: boolean
  disabled?: boolean
}

const AppNavLink: FC<NavLinkProps & RefAttributes<HTMLAnchorElement> & CustomProps> = (props) => {
  const { primary, disabled, ...propsWithoutCustomOnes } = props
  return (
    <NavLink
      className={combineClassNames(
        styles.link,
        primary ? styles.primary : styles.secondary,
        disabled && styles.disabled
      )}
      {...propsWithoutCustomOnes}
    >
      {props.children}
    </NavLink>
  )
}

export default AppNavLink
