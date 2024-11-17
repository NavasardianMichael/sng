import React, { Component } from 'react';
import cx from 'classnames';

import styles from './DownloadPopup.module.scss';

class DownloadPopup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colorOption: false,
      blackAndWhiteOption: false
    }
  }

  toggleOption = (option) => {
    this.setState(prevState => (
      { [option]: !prevState[option] }
    ));
  }

  handleSubmit = () => {
    const  {
      colorOption,
      blackAndWhiteOption
    } = this.state;

    if (!colorOption && !blackAndWhiteOption) return;

    this.props.handleDownload({ color: colorOption, blackAndWhite: blackAndWhiteOption });
  }

  render() {
    const  {
      colorOption,
      blackAndWhiteOption
    } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.title}>Download PDF</div>
        <div className={styles.options}>
          <div className={styles.option}>
            <div className={cx(styles.checkbox, {[styles.checkboxActive]: colorOption})}
                 onClick={() => this.toggleOption('colorOption')}
            >
              <div />
            </div>
            <div className={styles.label} onClick={() => this.toggleOption('colorOption')}>
              Color
            </div>
          </div>
          <div className={styles.option}>
            <div className={cx(styles.checkbox, {[styles.checkboxActive]: blackAndWhiteOption})}
                 onClick={() => this.toggleOption('blackAndWhiteOption')}
            >
              <div />
            </div>
            <div className={styles.label} onClick={() => this.toggleOption('blackAndWhiteOption')}>
              Black and White
            </div>
          </div>
        </div>
        <div className={styles.btns}>
          <button type="button" className={styles.cancelBtn} onClick={this.props.closePopup}>Cancel</button>
          <button type="button" className={styles.downloadBtn} onClick={this.handleSubmit}>Download</button>
        </div>
      </div>
    );
  }
}

export default DownloadPopup;
