import React, { useMemo, useState } from 'react'
import cx from 'classnames'
import { getURLSearchParams } from 'helpers/urlSearchParams'
import ArrowIcon from './img/arrow.svg'
import styles from './Legend.module.scss'

function Legend(props) {
  const [isOpened, toggle] = useState(window.innerWidth > 768)
  const [chartMode, toggleChartMode] = useState(false)

  if (IS_READ_ONLY_PAGE) return null

  // const maxCounter = Math.max(...Object.values(props.colorsAmount));
  let maxCounter = 0

  for (let colorId in props.colorsAmount) {
    if (props.colorsAmount.hasOwnProperty(colorId)) {
      if (props.colorsAmount[colorId] > maxCounter) {
        maxCounter = props.colorsAmount[colorId]
      }
    }
  }

  const renderColors = () => {
    const colors = props.colors.filter((currElem) => currElem.id)

    return colors.map((currElem, index, arr) => (
      <div className={styles.colorLine} key={index}>
        <div className={styles.circle} style={{ backgroundColor: currElem.colorHEX }}>
          {currElem.id}
        </div>
        <div className={styles.label}>
          <div
            className={styles.labelBg}
            style={
              chartMode
                ? {
                    backgroundColor: currElem.colorHEX,
                    width: props.colorsAmount[currElem.id]
                      ? `${(props.colorsAmount[currElem.id] * 100) / maxCounter}%`
                      : '0',
                    transition: `all 0.2s ease-in-out ${index * 50}ms`,
                  }
                : {
                    backgroundColor: currElem.colorHEX,
                    width: '0%',
                    transition: `all 0.2s ease-in-out ${(arr.length - 1 - index) * 50}ms`,
                  }
            }
          />
          <div className={styles.text}>{currElem.text}</div>
        </div>
        <div
          className={styles.counter}
          style={
            chartMode
              ? { opacity: '1', transition: `all 0.2s ease-in-out ${index * 50}ms` }
              : { opacity: '0', transition: `all 0.2s ease-in-out ${(arr.length - 1 - index) * 50}ms` }
          }
        >
          {props.colorsAmount[currElem.id] || 0}
        </div>
      </div>
    ))
  }

  const renderChartIconParts = () => {
    return [
      { width: 6, color: '#f89084' },
      { width: 11, color: '#fcca72' },
      { width: 15, color: '#fda8f4' },
      { width: 20, color: '#c5edf7' },
    ].map((curr, index) => (
      <div
        key={index}
        className={styles.chartIconPart}
        style={{ width: `${curr.width}px`, backgroundColor: chartMode ? curr.color : '#979797' }}
      />
    ))
  }

  return (
    <div className={styles.legend}>
      <div className={styles.btn} onClick={() => toggle(!isOpened)}>
        <div className={styles.btnLabel}>
          <div style={chartMode ? { transform: 'translateY(20px)' } : {}}>Legend</div>
          <div style={chartMode ? {} : { transform: 'translateY(-20px)' }} className={styles.withChart}>
            Genius Profile™
          </div>
        </div>
        <div className={cx(styles.controls, 'noPrint')}>
          <div
            onClick={(ev) => {
              ev.stopPropagation()
              toggleChartMode(!chartMode)
            }}
            className={styles.chartIcon}
          >
            {renderChartIconParts()}
          </div>
          <ArrowIcon className={styles.arrow} />
        </div>
      </div>
      <div className={cx(styles.container, { [styles.hidden]: !isOpened })}>{renderColors()}</div>
    </div>
  )
}

export default Legend
