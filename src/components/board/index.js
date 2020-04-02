import React, { Component } from 'react'
import styles from './index.less'

function getAngle(px, py, mx, my) {
  const x = Math.abs(px - mx);
  const y = Math.abs(py - my);
  const z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  const cos = y / z;
  const radina = Math.acos(cos);
  // 用反三角函数求弧度
  let angle = Math.floor(180 / (Math.PI / radina));
  // 将弧度转换成角度

  if (mx > px && my > py) {
    // 鼠标在第四象限
    angle = 180 - angle;
  }
  if (mx === px && my > py) {
    // 鼠标在y轴负方向上
    angle = 180;
  }
  if (mx > px && my === py) {
    // 鼠标在x轴正方向上
    angle = 90;
  }
  if (mx < px && my > py) {
    // 鼠标在第三象限
    angle = 180 + angle;
  }
  if (mx < px && my === py) {
    // 鼠标在x轴负方向
    angle = 270;
  }
  if (mx < px && my < py) {
    // 鼠标在第二象限
    angle = 360 - angle;
  }
  return angle;
}

function getOffSet(obj, key) {
  return obj.offsetParent ? obj[key] + getOffSet(obj.offsetParent, key) : obj[key]
}

function getDistance(px, py, mx, my) {
  const x = Math.abs(px - mx);
  const y = Math.abs(py - my);
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

}


export default class Board extends Component {

  static defaultProps = {
    bgSrc: '',
    width: 231,
    height: 231,
    editable: false,
    initAngle: 0,
    switchable: false,
    initBool: false,
    originAngle: 0,
    onRotate: () => {
    },
  }

  constructor(props) {
    super(props)
    this.state.initAngle = props.initAngle
    this.state.angle = props.initAngle
    this.state.bool = props.initBool
    if (this.props.switchable) {
      this.state.angle = props.initBool ? -90 : 90
    }
    this.ref = React.createRef()
  }

  state = {
    initAngle: 0,
    angle: 0,
    touchStartAngle: 0,
    scrollDom: null,
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   const { initAngle } = nextProps;
  //   // initAngle，更新stateA
  //   if (initAngle !== prevState.initAngle) {
  //     return {
  //       angle: initAngle,
  //     };
  //   }
  //   // 否则，对于state不进行任何操作
  //   return null;
  // }

  componentDidMount() {
    this.setState({
      scrollDom: document.getElementById('scrollDom'),
    })
    this.ref.current.addEventListener('touchstart', this.handleTouchStart, { passive: false })
    this.ref.current.addEventListener('touchmove', this.handleTouchMove, { passive: false })
    this.ref.current.addEventListener('touchend', this.handleTouchEnd, { passive: false })
    this.props.onRotate(this.state.angle)
  }

  componentWillUnmount() {
    this.ref.current.removeEventListener('touchstart', this.handleTouchStart)
    this.ref.current.removeEventListener('touchmove', this.handleTouchMove)
    this.ref.current.removeEventListener('touchend', this.handleTouchEnd)
  }

  handleTouchStart = e => {
    if (!this.props.editable) return

    const px = getOffSet(e.target, 'offsetLeft') + e.target.offsetWidth / 2
    const py = getOffSet(e.target, 'offsetTop') + e.target.offsetHeight / 2
    const mx = e.touches[0].pageX
    const my = e.touches[0].pageY + this.state.scrollDom.scrollTop

    if (getDistance(px, py, mx, my) > this.props.width / 2) return

    const { angle } = this.state
    this.setState({
      initAngle: (angle + 360) % 360,
    })
    if (this.props.switchable) {
      const { bool } = this.state
      this.setState({
        bool: !bool,
        angle: bool ? 90 : -90,
      }, () => {
        this.props.onRotate(this.state.angle)
      })
      return
    }

    this.setState({
      touchStartAngle: getAngle(px, py, mx, my),
    })
    e.stopPropagation()
    e.preventDefault()
  }

  handleTouchMove = e => {

    const px = getOffSet(e.target, 'offsetLeft') + e.target.offsetWidth / 2
    const py = getOffSet(e.target, 'offsetTop') + e.target.offsetHeight / 2
    const mx = e.touches[0].pageX
    const my = e.touches[0].pageY + this.state.scrollDom.scrollTop

    if (!this.props.editable || this.props.switchable || getDistance(px, py, mx, my) > this.props.width / 2) return
    const { initAngle, touchStartAngle } = this.state
    const { max, originAngle } = this.props
    let resAngle = initAngle + (getAngle(px, py, mx, my) - touchStartAngle)
    if (max !== undefined && ((resAngle + 3600) % 360 <= 0 || (resAngle + 3600) % 360 > 360 - max / 2)) {
      resAngle = 0
    }
    if (max !== undefined && ((resAngle + 3600) % 360 > max && (resAngle + 3600) % 360 < 360 - max / 2)) {
      resAngle = max
    }
    this.props.onRotate((resAngle + 360) % 360)
    this.setState({
      angle: resAngle,
    })
    e.stopPropagation()
    e.preventDefault()
  }

  handleTouchEnd = e => {
    if (!this.props.editable || this.props.switchable) return
    // const { angle } = this.state
    // this.setState({
    //   initAngle: (angle + 360) % 360,
    // })
    // this.props.onRotateStop(this.state.angle)
    e.stopPropagation()
    e.preventDefault()
  }

  render() {
    const { bgSrc, width, height, originAngle, switchable, initAngle } = this.props
    const { angle } = this.state
    return (
      <div className={styles.board} style={{
        width,
        height,
        backgroundImage: `url(${bgSrc})`,
        backgroundSize: '100% 100%',
      }}
           ref={this.ref}
        // onTouchStart={this.handleTouchStart}
        // onTouchMove={this.handleTouchMove}
        // onTouchEnd={this.handleTouchEnd}
        // {getDuration(86400 * ((angle + 3600) % 360) / 360)}

      >
        <img className={styles.point}
             style={{
               transform: `rotate(${angle + originAngle}deg) translate3d(0, 10px, 0)`,
               transition: switchable ? 'transform 0.5s linear' : 'auto'
             }}
             src={require('../../assets/point.png')}
             alt=""/>
      </div>
    )
  }
}
