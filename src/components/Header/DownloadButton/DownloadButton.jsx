import React, { Component } from 'react';
import { jsPDF } from "jspdf";

import './CentraNo2-Book-normal';

import DownloadPopup from './DownloadPopup/DownloadPopup';
import DownloadIcon from "./img/download.svg";
import styles from './DownloadButton.module.scss';

class DownloadButton extends Component {
  constructor(props) {
    super(props);

    const colorsLength = props.colors.filter(color => color.id).length;
    const offsets = this.getOffsets(props.cascade, colorsLength);

    this.state = {
      cascadeWidth: props.cascadeWidth + offsets.offsetX,
      cascadeHeight: props.cascadeHeight + offsets.offsetY,
      offsetX: offsets.offsetX,
      offsetY: offsets.offsetY,
      isDownloadPopupActive: false
    }
  }

  getOffsets = (cascade, colorsLength) => {
    const gap = 20;
    const legendX = 490 + gap;
    const legendY = colorsLength * 20 + (colorsLength - 1) * 10 + 30 + 65 + gap;

    let offsetX = 0,
        offsetY = 0;

    const getOffset = (group = {}) => {
      const calcOffsetForCurrGroup = (xPos, yPos) => {
        let currOffsetX = 0,
            currOffsetY = 0;

        if (xPos < legendX) {
          currOffsetX = legendX - xPos;
        }

        if (yPos < legendY) {
          currOffsetY = legendY - yPos;
        }

        if (currOffsetX && currOffsetY) {
          if ((currOffsetX <= currOffsetY) && currOffsetX > offsetX) {
            offsetX = currOffsetX;
          }

          if ((currOffsetY < currOffsetX) && currOffsetY > offsetY) {
            offsetY = currOffsetY;
          }
        }
      }

      calcOffsetForCurrGroup(group.xPos, group.yPos);

      if (group.childGroups && group.childGroups.length) {
        group.childGroups.forEach((child => {
          const lineElemPosX1 = group.xPos + Math.round(group.width / 2);
          const lineElemPosY1 = group.yPos + Math.round(group.height / 2);
          const lineElemPosX2 = child.xPos + Math.round(child.width / 2);
          const lineElemPosY2 = child.yPos;

          const minPosXOfLineElement = Math.min(lineElemPosX1, lineElemPosX2);
          const minPosYOfLineElement = Math.min(lineElemPosY1, lineElemPosY2);

          calcOffsetForCurrGroup(minPosXOfLineElement, minPosYOfLineElement);

          getOffset(child);
        }));
      }
    }

    getOffset(cascade);

    return {
      offsetX: offsetX,
      offsetY: offsetY
    };
  }

  addColoredBackgrounds = (maxiom, doc) => {
    const highlighter = this.props.highlighters[`highlighter_${maxiom.maxiomId}`] || [];

    highlighter.forEach((currHighlighterId, highlighterIndex, highlighterArr) => {
      doc.setFillColor(
        this.props.colors.find(currColor => currColor.id === currHighlighterId).colorHEX
      );

      doc.rect(
        maxiom.xPos + ((maxiom.width / highlighterArr.length) * highlighterIndex) + this.state.offsetX,
        maxiom.yPos + this.state.offsetY,
        (highlighterIndex && (highlighterIndex + 1 === highlighterArr.length))
          ? maxiom.width / highlighterArr.length
          : Math.ceil(maxiom.width / highlighterArr.length),
        maxiom.height,
        'F'
      );
    });
  }

  addMaxioms = (group, doc, isColored) => {
    group.maxioms.forEach(maxiom => {
      if (isColored) this.addColoredBackgrounds(maxiom, doc);

      maxiom.maxiomLines.forEach((line, lineIndex) => {
        let xPos = maxiom.xPos + (maxiom.width / 2);
        let yPos = maxiom.yPos + 7 + (lineIndex * maxiom.lineHeight);

        if (isColored) {
          xPos += this.state.offsetX;
          yPos += this.state.offsetY;
        }

        doc.text(
          line.trim(),
          xPos,
          yPos,
          null,
          null,
          "center"
        );
      });
    });
  }

  addRect = (group, doc, isColored) => {
    doc.roundedRect(
      isColored ? group.xPos + this.state.offsetX : group.xPos,
      isColored ? group.yPos + this.state.offsetY : group.yPos,
      group.width,
      group.height,
      4,
      4,
      'FD'
    );
  }

  addLines = (group, doc, isColored) => {
    const { offsetX, offsetY } = this.state;

    doc.setDrawColor('#000');
    group.childGroups.forEach(child => {
      const coords = {
        x1: group.xPos + Math.round(group.width / 2),
        y1: group.yPos + Math.round(group.height / 2),
        x2: child.xPos + Math.round(child.width / 2),
        y2: child.yPos
      }

      if (isColored) {
        coords.x1 = coords.x1 + offsetX;
        coords.y1 = coords.y1 + offsetY;
        coords.x2 = coords.x2 + offsetX;
        coords.y2 = coords.y2 + offsetY;
      }

      doc.line(coords.x1, coords.y1, coords.x2, coords.y2);
    });
  }

  addLegend = (doc) => {
    const { colorsAmount } = this.props;

    let maxCounter = 0;

    for (let colorId in colorsAmount) {
      if (colorsAmount.hasOwnProperty(colorId)) {
        if (colorsAmount[colorId] > maxCounter) {
          maxCounter = colorsAmount[colorId];
        }
      }
    }

    const getColoredRectWidth = (id, maxValue) => {
      if (!colorsAmount[id]) return '0';

      const percentWidth = (colorsAmount[id] * 100) / maxValue;

      return (350 * percentWidth) / 100;
    }

    const colors = this.props.colors.filter(currElem => currElem.id);

    const legendBodyY = colors.length * 20 + (colors.length - 1) * 10 + 30 + 65;

    doc.setDrawColor('#d7d7d7');
    doc.line(50, 65, 490, 65);
    doc.line(490, 65, 490, 40);
    doc.line(490, 40, 50, 40);
    doc.line(50, 40, 50, legendBodyY);
    doc.line(50, legendBodyY, 490, legendBodyY);
    doc.line(490, legendBodyY, 490, 65);

    doc.text('Genius Profile™', 66, 57);

    doc.setDrawColor('#999');
    colors.forEach((color, index) => {
      doc.setFillColor(color.colorHEX);
      doc.circle(75, (90 + (30 * index)), 10, 'F');

      doc.setFontSize(15);
      doc.text(`${index + 1}`, 75, (94.4 + (30 * index)), null, null, 'center');

      doc.setFillColor(color.colorHEX);
      if (colorsAmount[color.id]) {
        doc.rect(95, (80 + (30 * index)), getColoredRectWidth(color.id, maxCounter), 20, 'F');
      }

      doc.text(color.text, 100, (94.4 + (30 * index)));

      doc.circle(465, (90 + (30 * index)), 10, "D");
      doc.setFontSize(11);
      doc.text(
        (colorsAmount[color.id] ? `${colorsAmount[color.id]}` : '0'),
        465,
        (93.4 + (30 * index)),
        null,
        null,
        'center'
      );
    });
  }

  createAndDownloadPDF = ({ fileName, isColored }) => {
    const width = isColored ? this.state.cascadeWidth : this.props.cascadeWidth;
    const height = isColored ? this.state.cascadeHeight : this.props.cascadeHeight;

    const doc = new jsPDF({
      orientation: height > width  ? "portrait" : "landscape",
      unit: "px",
      format: [width, height]
    });

    doc.setFont('CentraNo2-Book', 'normal');

    if (isColored) this.addLegend(doc);

    doc.setFontSize(10);

    const addGroup = currGroup => {
      this.addLines(currGroup, doc, isColored);

      doc.setFillColor(255, 255, 255);
      this.addRect(currGroup, doc, isColored);
      this.addMaxioms(currGroup, doc, isColored);

      if (currGroup.childGroups.length) {
        currGroup.childGroups.forEach(child => addGroup(child));
      }
    }

    addGroup(this.props.cascade);

    doc.save(fileName);
  }

  handleDownload = ({ color, blackAndWhite }) => {
    const fileName = ((localStorage.getItem('filename') || 'Cascade') + '.pdf').replace('.cmap', '');

    this.changePopupVisibility(false);

    if (color) this.createAndDownloadPDF({ fileName, isColored: true });
    if (blackAndWhite) this.createAndDownloadPDF({ fileName });
  }

  changePopupVisibility = (state) => {
    if (state && this.state.isDownloadPopupActive) return;

    this.setState({
      isDownloadPopupActive: state
    });
  }

  render() {
    return (
      <div className={styles.downloadLink} onClick={() => this.changePopupVisibility(true)}>
        <DownloadIcon className={styles.downloadIcon} />
        { this.state.isDownloadPopupActive
          ? <DownloadPopup closePopup={() => this.changePopupVisibility(false)} handleDownload={this.handleDownload} />
          : null
        }
      </div>
    );
  }
}

export default DownloadButton;
