import { FC, useCallback, useEffect, useRef, useState } from 'react'
import cx from 'classnames'
import { ZOOM_RANGE } from 'constants/zoom-range'
import ResetIcon from 'assets/icons/reset.svg'
import ZoomInIcon from 'assets/icons/zoom-in.svg'
import ZoomOutIcon from 'assets/icons/zoom-out.svg'
import Logo from 'assets/images/logo.svg'
import { selectSettings } from 'store/settings/selectors'
import { setSettings, toggleAccessibilityMode } from 'store/settings/slice'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import { checkIsReadOnlyMode } from 'helpers/app'
import { Tabs } from './Tabs/Tabs'
import styles from './Header.module.scss'

const Header: FC = () => {
  const dispatch = useAppDispatch()
  const { zoomMod, accessibilityMode } = useAppSelector(selectSettings)
  const [isZoomOutAvailability, setIsZoomAvailability] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)

  const getZoomOutAvailability = useCallback(() => {
    const cascadeWidth = 0,
      cascadeHeight = 0

    if (!headerRef.current) return false

    return (
      cascadeWidth * zoomMod > window.innerWidth ||
      cascadeHeight * zoomMod > window.innerHeight - headerRef.current?.getBoundingClientRect()?.height ||
      zoomMod > 1
    )
  }, [zoomMod])

  useEffect(() => {
    const setZoomOutAvailability = () => {
      const actualZoomOutAvailability = getZoomOutAvailability()

      if (
        (isZoomOutAvailability && !actualZoomOutAvailability) ||
        (!isZoomOutAvailability && actualZoomOutAvailability)
      ) {
        setIsZoomAvailability(actualZoomOutAvailability)
      }
    }

    window.addEventListener('resize', setZoomOutAvailability)

    return () => {
      window.removeEventListener('resize', setZoomOutAvailability)
    }
  }, [getZoomOutAvailability, isZoomOutAvailability])

  useEffect(() => {
    setIsZoomAvailability(getZoomOutAvailability())
  }, [getZoomOutAvailability])

  const renderControls = () => {
    return (
      <div className={cx(styles.controls, 'noPrint')}>
        <div className={styles.accessibility}>Accessibility</div>
        <div
          className={cx(styles.toggle, {
            [styles.toggleActive]: accessibilityMode,
          })}
          onClick={() => dispatch(toggleAccessibilityMode())}
        />
        <ZoomInIcon
          className={cx(styles.zoomInIcon, {
            [styles.zoomInIconInactive]: zoomMod === ZOOM_RANGE.max,
          })}
          onClick={() => {
            doZoom({ zoomIn: true })
          }}
        />
        <div
          className={cx(styles.percentage, {
            [styles.percentageInactive]: zoomMod === 1,
          })}
        >
          {zoomMod * 100}%
        </div>
        <ZoomOutIcon
          className={cx(styles.zoomOutIcon, {
            [styles.zoomOutIconInactive]: !isZoomOutAvailability,
          })}
          onClick={() => {
            doZoom({
              zoomOut: true,
              zoomOutAvailability: getZoomOutAvailability(),
            })
          }}
        />
        <ResetIcon
          className={cx(styles.resetIcon, {
            [styles.resetIconInactive]: zoomMod === 1,
          })}
          onClick={() => dispatch(setSettings({ zoomMod: 1 }))}
        />
        {/* <DownloadButton
          cascade={cascade}
          colors={colors}
          colorsAmount={colorsAmount}
          // cascadeWidth={cascadeWidth}
          // cascadeHeight={cascadeHeight}
          highlighters={highlighters}
        /> */}
      </div>
    )
  }

  if (checkIsReadOnlyMode()) return null

  const doZoom = ({
    zoomIn,
    zoomOut,
    zoomOutAvailability,
  }: {
    zoomIn?: boolean
    zoomOut?: boolean
    zoomOutAvailability?: boolean
  }) => {
    if (zoomIn && zoomMod !== ZOOM_RANGE.max) {
      dispatch(setSettings({ zoomMod: zoomMod + ZOOM_RANGE.step }))
    }

    if (zoomOut && zoomOutAvailability && zoomMod !== ZOOM_RANGE.min) {
      dispatch(setSettings({ zoomMod: zoomMod - ZOOM_RANGE.step }))
    }
  }

  return (
    <div className={styles.container} ref={headerRef}>
      <Logo className={styles.logo} />
      <Tabs />
      {renderControls()}
    </div>
  )
}

export default Header
