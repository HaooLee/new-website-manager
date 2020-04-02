import React, { Component } from 'react'
import styles from './index.less'


export default class Label extends Component {

  render() {
    const { title, value } = this.props
    return (
      <div className={styles.label}>
        <span className={styles.title}>{ title }</span>
        <span className={styles.value}>{ value }</span>
      </div>
    )
  }

}
