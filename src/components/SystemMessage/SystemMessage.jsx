import React from 'react';
import cx from 'classnames';

import styles from './SystemMessage.module.scss';

function SystemMessage(props) {
  return (
    <table className={cx(styles.container, {[styles.containerError]: props.error})}>
      <tbody className={styles.messageWrap}>
        <tr>
          <td>
            <div className={styles.message}>
              We’re sorry.<br/>
              It looks like there was a problem. We are working to resolve the issue. If you’d like to <a
              href='mailto:diagnostics@gapinternational.com'>tell us more</a> about what you were doing when this error
              occurred, we would greatly appreciate&nbsp;it.
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default SystemMessage;
