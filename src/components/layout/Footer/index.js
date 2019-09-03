import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import style from './style.module.scss'

const mapStateToProps = ({ settings }) => ({ settings })

@connect(mapStateToProps)
class Footer extends React.Component {
  render() {
    const {
      settings: { isContentNoMaxWidth },
    } = this.props
    return (
      <div
        className={classNames(style.footer, {
          [style.footerFullWidth]: isContentNoMaxWidth,
        })}
      >
        <div className={style.inner}>
          <div className="row">
            <div className="col-md-8">
              {/* <p>
                <strong>Air UI Admin Template - Best Solution for Your Next Big App!</strong>
              </p> */}
              <p>
                <strong>
                  <a href="https://www.nstda.or.th/"> NSTDA </a>
                  National Science and Technology Development Agency
                </strong>
              </p>
              <p>Copyright © 2019</p>
            </div>
            <div className="col-md-4">
              <div className={style.logo}>
                <img src="resources/images/nstda-color1.png" alt="..." style={{ width:100, height:55 }} />
                {/* <img src="resources/images/air-logo.png" alt="Air UI" />
                <div className={style.logoName}>FFC</div>
                <div className={style.logoDescr}>Admin Template</div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Footer
