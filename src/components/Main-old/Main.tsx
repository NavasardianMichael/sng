// import React, { Component } from 'react'
// import { ZOOM_RANGE } from 'constants/zoom-range'
// import PropTypes from 'prop-types'
// import { toggleAccessibilityMode } from 'store/settings/slice'
// import Cascade from 'components/Cascade/Cascade'
// import Header from 'components/Header/Header'
// import Legend from 'components/Legend/Legend'
// import Loader from 'components/Loader/Loader'
// import SystemMessage from 'components/SystemMessage/SystemMessage'

// const Main

// class Main extends Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       isLoaderDisplayed: true,
//       isContentDisplayed: false,
//       zoomMod: 1,
//       accessibilityMode: false,
//       highlighters: {},
//       colorsAmount: {},
//     }
//   }

//   componentDidUpdate(prevProps, prevState, snapshot) {
//     console.log({ prevProps, prevState })

//     if (prevProps.isFetching !== this.props.isFetching) {
//       if (!this.props.isFetching) {
//         let initHighlighters = {}

//         if (this.props.cascade && this.props.legend) {
//           initHighlighters = this.getInitHighlighters(
//             this.props.cascade.initList,
//             this.props.legend.multipleColorMaxCount
//           )
//         }

//         setTimeout(() => {
//           this.setState({
//             isLoaderDisplayed: false,
//             isContentDisplayed: true,
//             highlighters: initHighlighters,
//             colorsAmount: this.getColorsAmount(initHighlighters),
//           })
//         }, 500)
//       } else {
//         this.setState({
//           isLoaderDisplayed: true,
//         })
//       }
//     }
//   }

//   getInitHighlighters = (maxioms, multipleColorMaxCount) => {
//     const highlighters = {}

//     maxioms.forEach((maxiom) => {
//       highlighters[`highlighter_${maxiom.maxiomId}`] = maxiom.colors
//         .filter((color, index) => index < multipleColorMaxCount && color.colorId)
//         .map((color) => color.colorId)
//     })

//     return highlighters
//   }

//   getColorsAmount = (initHighlighters = {}) => {
//     const result = {}

//     for (let key in initHighlighters) {
//       if (initHighlighters.hasOwnProperty(key)) {
//         initHighlighters[key].forEach((currElem) => {
//           result[currElem] = result[currElem] ? result[currElem] + 1 : 1
//         })
//       }
//     }

//     return result
//   }

//   // toggleAccessibilityMode = () => {
//   //   this.setState((prevState) => ({
//   //     accessibilityMode: !prevState.accessibilityMode,
//   //   }))
//   // }

//   // doZoom = ({ zoomIn, zoomOut, zoomOutAvailability }) => {
//   //   const { zoomMod } = this.state

//   //   if (zoomIn && zoomMod !== ZOOM_RANGE.max) {
//   //     this.setState((prevState) => ({
//   //       zoomMod: prevState.zoomMod + ZOOM_RANGE.step,
//   //     }))
//   //   }

//   //   if (zoomOut && zoomOutAvailability && zoomMod !== ZOOM_RANGE.min) {
//   //     this.setState((prevState) => ({
//   //       zoomMod: prevState.zoomMod - ZOOM_RANGE.step,
//   //     }))
//   //   }
//   // }

//   // resetZoom = () => {
//   //   this.setState({
//   //     zoomMod: 1,
//   //   })
//   // }

//   handleColorClick = (maxiomId, legendColorId) => {
//     const highlighter = this.state.highlighters[`highlighter_${maxiomId}`] || []

//     if (highlighter.includes(legendColorId)) {
//       const newHighlighterArr = highlighter.filter((currElem) => currElem !== legendColorId)

//       this.setState((prevState) => ({
//         highlighters: {
//           ...prevState.highlighters,
//           [`highlighter_${maxiomId}`]: newHighlighterArr,
//         },
//         colorsAmount: {
//           ...prevState.colorsAmount,
//           [legendColorId]: prevState.colorsAmount[legendColorId] - 1,
//         },
//       }))

//       this.props.updateMaxiom({
//         maxiomId: maxiomId,
//         colors: newHighlighterArr.map((currElem, index) => ({ colorId: currElem, orderId: index + 1 })),
//       })
//     } else {
//       if (highlighter.length >= this.props.legend.multipleColorMaxCount) return

//       highlighter.push(legendColorId)

//       this.setState((prevState) => ({
//         highlighters: {
//           ...prevState.highlighters,
//           [`highlighter_${maxiomId}`]: highlighter,
//         },
//         colorsAmount: {
//           ...prevState.colorsAmount,
//           [legendColorId]: prevState.colorsAmount[legendColorId] ? prevState.colorsAmount[legendColorId] + 1 : 1,
//         },
//       }))

//       this.props.updateMaxiom({
//         maxiomId: maxiomId,
//         colors: highlighter.map((currElem, index) => ({ colorId: currElem, orderId: index + 1 })),
//       })
//     }
//   }

//   removeAllColors = (maxiomId) => {
//     const colorsAmount = this.state.colorsAmount

//     this.state.highlighters[`highlighter_${maxiomId}`].forEach((currColorId) => {
//       colorsAmount[currColorId] = colorsAmount[currColorId] - 1
//     })

//     this.setState((prevState) => ({
//       highlighters: {
//         ...prevState.highlighters,
//         [`highlighter_${maxiomId}`]: [],
//       },
//       colorsAmount: colorsAmount,
//     }))

//     this.props.updateMaxiom({
//       maxiomId: maxiomId,
//       colors: [],
//     })
//   }

//   render() {
//     // const { error, isFetching, cascade, legend, updateMaxiom } = this.props

//     // const { isLoaderDisplayed, isContentDisplayed, zoomMod, accessibilityMode, colorsAmount, highlighters } = this.state

//     // if (error) {
//     //   return (
//     //     <>
//     //       <Header error={error} />
//     //       <SystemMessage error={error} />
//     //     </>
//     //   )
//     // }

//     return (
//       <>
//         {/* <Header
//           isLoaderDisplayed={isLoaderDisplayed}
//           isContentDisplayed={isContentDisplayed}
//           doZoom={doZoom}
//           resetZoom={resetZoom}
//           zoomMod={zoomMod}
//           cascade={cascade && cascade.body}
//           cascadeWidth={cascade && cascade.width}
//           cascadeHeight={cascade && cascade.height}
//           accessibilityMode={accessibilityMode}
//           toggleAccessibilityMode={toggleAccessibilityMode}
//           colors={legend && legend.legends}
//           colorsAmount={colorsAmount}
//           highlighters={highlighters}
//         /> */}
//         {isContentDisplayed && cascade ? (
//           <>
//             <Cascade
//               cascade={cascade}
//               zoomMod={zoomMod}
//               legendData={legend}
//               updateMaxiom={updateMaxiom}
//               accessibilityMode={accessibilityMode}
//               highlighters={highlighters}
//               handleColorClick={this.handleColorClick}
//               removeAllColors={this.removeAllColors}
//               colorsAmount={colorsAmount}
//             />
//             <Legend colors={legend && legend.legends} colorsAmount={colorsAmount} />
//           </>
//         ) : null}
//         {isLoaderDisplayed && <Loader isFetching={isFetching} />}
//       </>
//     )
//   }
// }

// Main.propTypes = {
//   isFetching: PropTypes.bool,
//   error: PropTypes.any,
// }

// export default Main
