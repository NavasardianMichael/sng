import React, { Component } from 'react';
import cx from 'classnames';

import FONT_BASE64 from 'helpers/cascadeFont';
import styles from './Cascade.module.scss';
import { getURLSearchParams } from 'helpers/urlSearchParams';

class Cascade extends Component {
  constructor(props) {
    super(props);

    this.colorsPopup = React.createRef();
    this.cascadeRef = React.createRef();
    this.hasBasicTokenRef = React.createRef();
    this.hasBasicTokenRef.current = getURLSearchParams('accessToken') != null;

    this.state = {
      colorsPopup: null
    }
  }

  // componentDidMount() {
  //   this.initializeDragSystem();
  // }

  // initializeDragSystem = () => {
  //   const scrollabelElem = document.documentElement;
  //   let pos = { top: 0, left: 0, x: 0, y: 0 };
  //   let isDown = false;

  //   const mouseDownHandler = function(event) {
  //     if (event.target.getAttribute('data-feature-name') !== 'cascadeChart') return;

  //     isDown = true;

  //     pos = {
  //       left: scrollabelElem.scrollLeft,
  //       top: scrollabelElem.scrollTop,
  //       x: event.clientX,
  //       y: event.clientY,
  //     };

  //     document.addEventListener('mousemove', mouseMoveHandler);
  //     document.addEventListener('mouseup', mouseUpHandler);
  //   };

  //   const mouseMoveHandler = (event) => {
  //     if(!isDown) return;
  //     scrollabelElem.classList.add('grabbing');

  //     const dx = event.clientX - pos.x;
  //     const dy = event.clientY - pos.y;

  //     scrollabelElem.scrollTop = pos.top - dy;
  //     scrollabelElem.scrollLeft = pos.left - dx;
  //   };

  //   const mouseUpHandler = () => {
  //     isDown = false;

  //     scrollabelElem.classList.remove('grabbing');

  //     document.removeEventListener('mousemove', mouseMoveHandler);
  //     document.removeEventListener('mouseup', mouseUpHandler);
  //   };

  //   scrollabelElem.addEventListener('mousedown', mouseDownHandler);
  // }

  getAccessibilityPosX = (highlighterIndex, highlighterLength, width, xPos) => {
    if ((highlighterLength === 1) || (highlighterIndex === (highlighterLength - 1))) return xPos + width - 1.5;
    if (highlighterIndex === 0) return xPos + 1.5;

    return (xPos + ((width / highlighterLength) * highlighterIndex) + (width / highlighterLength) / 2);
  }

  renderMaxiomLines = (maxiom) => {
    const highlighter = this.props.highlighters[`highlighter_${maxiom.maxiomId}`] || [];

    return (
      <>
        { highlighter.length
          ? highlighter.map((currHighlighterId, highlighterIndex, highlighterArr) => (
              <rect x={maxiom.xPos + ((maxiom.width / highlighterArr.length) * highlighterIndex)}
                    y={maxiom.yPos}
                    width={
                      (highlighterIndex && (highlighterIndex + 1 === highlighterArr.length))
                        ? maxiom.width / highlighterArr.length
                        : Math.ceil(maxiom.width / highlighterArr.length)
                    }
                    height={maxiom.height}
                    fill={this.props.legendData.legends.find(currColor => currColor.id === currHighlighterId).colorHEX}
                    key={highlighterIndex}
                    className="rect"
                    data-feature-name="maxiom"
              />
            ))
          : <rect x={maxiom.xPos}
                  y={maxiom.yPos}
                  width={maxiom.width}
                  height={maxiom.height}
                  fill="white"
                  className="rect"
                  data-feature-name="maxiom"
            />
        }
        { maxiom.maxiomLines.map((line, lineIndex) => (
            <text key={lineIndex}
                  x={maxiom.xPos + (maxiom.width / 2)}
                  y={maxiom.yPos + 7 + (lineIndex * maxiom.lineHeight)}
                  className="text"
                  textAnchor="middle"
                  data-feature-name="maxiom"
            >
              {line.trim()}
            </text>
          ))
        }
        { (this.props.accessibilityMode && highlighter.length)
          ? highlighter.map((currHighlighterId, highlighterIndex, highlighterArr) => (
            <g key={highlighterIndex}>
              <circle cx={this.getAccessibilityPosX(highlighterIndex, highlighterArr.length, maxiom.width, maxiom.xPos)}
                      cy={maxiom.yPos + 2.5}
                      fill="#fff"
                      strokeWidth="0.4"
                      stroke="#000"
                      r="3.4"
                      className="accessibilityCircle"
                      data-feature-name="maxiom"
                      key={highlighterIndex}
              />
              <text x={this.getAccessibilityPosX(highlighterIndex, highlighterArr.length, maxiom.width, maxiom.xPos)}
                    y={maxiom.yPos + 4.3}
                    textAnchor="middle"
                    className="accessibilityText"
                    data-feature-name="maxiom"
              >
                {currHighlighterId}
              </text>
            </g>
          ))
          : null
        }
      </>
    );
  }

  handleMaxiomClick(ev, groupWidth, groupPosX, maxiom) {
    if(this.hasBasicTokenRef.current) return;
    
    const {
      zoomMod
    } = this.props;

    const positionXFromLeft = (groupPosX * zoomMod) - (250 + 3);
    const positionXFromRight = (groupPosX + groupWidth) * zoomMod + 3;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const maxiomRect = ev.target.getBoundingClientRect();
    const rightBorder = (maxiomRect.right - (maxiomRect.width / 2)) + ((groupWidth * zoomMod) / 2);
    const isRightSideAvailable = (rightBorder + 250 + 5) < (window.innerWidth - scrollbarWidth);

    this.setState({
      colorsPopup: {
        positionXFromLeft: positionXFromLeft,
        positionXFromRight: positionXFromRight,
        xPos: isRightSideAvailable ? positionXFromRight : positionXFromLeft,
        yPos: ((maxiom.yPos + ((maxiom.maxiomLinesLength * maxiom.lineHeight) / 2)) * zoomMod) - 15,
        maxiomId: maxiom.maxiomId,
        groupWidth: groupWidth * zoomMod,
        isRightPosition: isRightSideAvailable
      }
    });

    const handleResize = () => {
      const colorsPopupElem = this.colorsPopup.current;

      if (!colorsPopupElem) return;

      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      let rightBorder = colorsPopupElem.getBoundingClientRect().right;

      if (!this.state.colorsPopup.isRightPosition) {
        rightBorder = rightBorder + this.state.colorsPopup.groupWidth + 250 + 6;
      }

      const isRightSideAvailable = (rightBorder + 2) < (window.innerWidth - scrollbarWidth);

      if (!this.state.colorsPopup.isRightPosition && isRightSideAvailable) {
        this.setState(prevState => ({
          colorsPopup: {
            ...prevState.colorsPopup,
            xPos: prevState.colorsPopup.positionXFromRight,
            isRightPosition: true
          }
        }));
      }

      if (this.state.colorsPopup.isRightPosition && !isRightSideAvailable) {
        this.setState(prevState => ({
          colorsPopup: {
            ...prevState.colorsPopup,
            xPos: prevState.colorsPopup.positionXFromLeft,
            isRightPosition: false
          }
        }));
      }
    }

    const handleClick = (ev) => {
      const featureName = ev.target.getAttribute('data-feature-name');

      if (featureName === 'colorsPopup' || featureName === 'maxiom') return;

      document.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);

      this.setState({
        colorsPopup: null
      })
    }

    document.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);
  }

  renderMaxioms = (group) => {
    return group.maxioms.map((currMaxiom, maxiomIndex) => {
      return (
        <g
          key={maxiomIndex}
          onClick={(ev) => {
            this.handleMaxiomClick(ev, group.width, group.xPos, currMaxiom);
          }}
          data-feature-name="maxiom"
        >
          {this.renderMaxiomLines(currMaxiom)}
        </g>
      );
    });
  }

  renderLines = (group) => {
    return group.childGroups.map((child, index) => (
      <line key={index}
            x1={group.xPos + Math.round(group.width / 2)}
            y1={group.yPos + Math.round(group.height / 2)}
            x2={child.xPos + Math.round(child.width / 2)}
            y2={child.yPos}
            stroke="black"
      />
    ));
  }

  renderCascadeGroups = (group = {}) => {
    const result = [];

    const addGroup = (currGroup) => {
      result.push(
        <g key={currGroup.cmapId}>
          { currGroup.childGroups.length
            ? this.renderLines(currGroup)
            : null
          }
          <rect x={currGroup.xPos} y={currGroup.yPos}
                width={currGroup.width} height={currGroup.height}
                fill="#fff"
                stroke="#000"
                strokeWidth="1"
                rx="4" ry="4"
          />
          { this.renderMaxioms(currGroup)}
        </g>
      );

      if (currGroup.childGroups.length) {
        currGroup.childGroups.forEach(child => addGroup(child));
      }
    }

    addGroup(group);

    return result;
  }

  renderColors (maxiomId) {
    const colors = this.props.legendData.legends.filter(currElem => currElem.id);

    return colors.map((currElem, index) => {
      const highlighter = this.props.highlighters[`highlighter_${maxiomId}`] || [];

      return (
        <div
          key={index}
          className={cx(styles.color, {[styles.colorActive]: highlighter.includes(currElem.id)})}
          onClick={() => this.props.handleColorClick(maxiomId, currElem.id)}
          style={{backgroundColor: currElem.colorHEX}}
          data-feature-name="colorsPopup"
        >
          {index + 1}
        </div>
      );
    });
  }

  renderLegend = () => {
    if (this.hasBasicTokenRef.current) return null;
    
    const colors = this.props.legendData.legends.filter(currElem => currElem.id);
    const {
      colorsAmount
    } = this.props;

    let maxCounter = 0;

    for (let colorId in colorsAmount) {
      if (colorsAmount.hasOwnProperty(colorId)) {
        if (colorsAmount[colorId] > maxCounter) {
          maxCounter = colorsAmount[colorId];
        }
      }
    }

    const getColoredRectWidth = (id, maxValue) => {
      if (!colorsAmount[id]) return;

      const percentWidth = (colorsAmount[id] * 100) / maxValue;

      return (350 * percentWidth) / 100;
    }

    return (
      <g id="cascade-legend-group" display="none">
        <path d={`M50 65 H 490 V 40 H 50 V ${colors.length * 20 + (colors.length - 1) * 10 + 30 + 65} H 490 V 65`}
              strokeWidth="1"
              stroke="#d7d7d7"
              fill="none"
        />
        <text x="66" y="57" className="legendText">
          Genius Profile™
        </text>
        {colors.map((color, index) => (
          <g key={index}>
            <circle cx="75"
                    cy={90 + (30 * index)}
                    fill={color.colorHEX}
                    r="10"
            />
            <text x="75" y={94.4 + (30 * index)} className="legendText" textAnchor="middle">
              {index + 1}
            </text>
            <rect x="95" y={80 + (30 * index)}
                  width={getColoredRectWidth(color.id, maxCounter)} height="20"
                  fill={color.colorHEX}
            />
            <text x="100" y={94.4 + (30 * index)} className="legendText">
              {color.text}
            </text>
            <circle cx="465"
                    cy={90 + (30 * index)}
                    fill="#fff"
                    strokeWidth="1"
                    stroke="#999"
                    r="10"
            />
            <text x="465" y={93.4 + (30 * index)} className="amountText" textAnchor="middle">
              {colorsAmount[color.id] || 0}
            </text>
          </g>
        ))}
      </g>
    );
  }

  render() {
    const {
      colorsPopup
    } = this.state;

    const {
      cascade,
      zoomMod
    } = this.props;

    return (
      <table className={styles.container}>
        <tbody>
          <tr>
            <td align="center">
              <div id='cascade-chart' className={styles.chartWrap}>
                <svg width={this.hasBasicTokenRef.current ? undefined : cascade.width * zoomMod}
                     height={this.hasBasicTokenRef.current ? undefined : cascade.height * zoomMod}
                     viewBox={`0 0 ${cascade.width} ${cascade.height}`}
                     ref={this.cascadeRef}
                     data-feature-name="cascadeChart"
                     className={styles.chart}
                >
                  <g id="cascade-main-group">
                    {this.renderCascadeGroups(cascade.body)}
                  </g>
                  {this.renderLegend()}
                  <style type="text/css">
                    {`@font-face {
                        font-family: CentraNo2-Book;
                        src: url(data:application/font-woff;charset=utf-8;base64,${FONT_BASE64}) format('woff');
                      }
                    `}
                  </style>
                  <style>
                    {`.text {font: 8px CentraNo2-Book, Arial, Helvetica, sans-serif; fill: #000; cursor: pointer;}
                      .legendText {font: 13px CentraNo2-Book, Arial, Helvetica, sans-serif; fill: #000;}
                      .amountText {font: 9px CentraNo2-Book, Arial, Helvetica, sans-serif; fill: #000;}
                      .rect {cursor: pointer;}
                      .accessibilityCircle {cursor: pointer;}
                      .accessibilityText {font: 5px CentraNo2-Book; fill: #000; cursor: pointer;}
                    `}
                  </style>
                </svg>
                { colorsPopup
                  ? <div className={cx(styles.colorsPopup, 'noPrint')}
                         style={{top: `${colorsPopup.yPos}px`, left: `${colorsPopup.xPos}px`}}
                         data-feature-name="colorsPopup"
                         ref={this.colorsPopup}
                  >
                    {this.renderColors(colorsPopup.maxiomId)}
                    <div data-feature-name="colorsPopup"
                         onClick={() => this.props.removeAllColors(colorsPopup.maxiomId)}
                         className={styles.eraser}
                    />
                  </div>
                  : null
                }
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default Cascade;
