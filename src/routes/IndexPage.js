import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.less';
import i18n from '../i18n/i18n';

class IndexPage extends React.Component {
  render() {
    const { count, dispatch } = this.props;
    return (
      <div className={styles.normal}>
        <div className={styles.record}>Highest Record: {count.record}</div>
        <div className={styles.current}>{count.current}</div>
        <div className={styles.button}>
          <button onClick={() => { dispatch({ type: 'count/add' }); }}>{i18n('hello', '你好')}</button>
          <button onClick={() => { dispatch({ type: 'count/minus' }); }}>{i18n('hello', '你好')}</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { count: state.count };
}

export default connect(mapStateToProps)(IndexPage);
