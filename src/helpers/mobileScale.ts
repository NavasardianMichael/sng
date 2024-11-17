declare global {
  interface Window {
    increaseChartWidth: unknown
    decreaseChartWidth: unknown
  }
}

export const initMobileScalers = () => {
  const min = 100
  const max = 2000
  const scaleStep = 100

  window.increaseChartWidth = () => {
    const chart = document.getElementById('cascade-chart')
    if (!chart) return

    let scale = chart?.dataset?.scale ? +chart?.dataset?.scale : 100

    if (!scale || scale < max) {
      scale += scaleStep
      chart.dataset.scale ??= scale.toString()
      chart.style.width = scale + '%'
    }

    return {
      scale,
      isMin: scale === min,
      isMax: scale === max,
    }
  }

  window.decreaseChartWidth = () => {
    const chart = document.getElementById('cascade-chart')
    if (!chart) return

    let scale = chart?.dataset?.scale ? +chart?.dataset?.scale : 100

    if (!scale || scale > min) {
      scale -= scaleStep
      chart.dataset.scale ??= scale.toString()
      chart.style.width = scale + '%'
    }

    return {
      scale,
      isMin: scale === min,
      isMax: scale === max,
    }
  }
}
