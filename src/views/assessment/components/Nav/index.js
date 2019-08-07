import React, { Component, Fragment } from 'react'
import connect from 'connect'
import { Link, withRouter } from 'react-router-dom'
import './index.less'
import { Divider } from 'antd';
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
import axios from 'utils/axios'


@connect
@withRouter
class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true,
      data: []
    }
  }



  // shouldComponentUpdate(nextProps, nextState) {
  //   return false
  // }

  showItem() {
    this.setState({
      show: false
    })
  }

  componentDidMount() {
    new Swiper('.swiper-container', {
      slidesPerView: '6',
    })
    axios.get('v1/users/jobNav').subscribe(res => {
      this.setState({
        data: res.data.data
      })
    })
  }




  render() {
    const nav = [
      {
        name: '发布自评任务',
        path: '/assessment/publishTask'
      },
      {
        name: "企业自评",
        path: '/assessment/selfEvaluation'
      },
      {
        name: '自评报告',
        path: '/assessment/selfEvaluationReport'
      },

      {
        name: '发布现场考核',
        path: '/assessment/postOnSiteAssessment'
      },

      {
        name: '现场评价',
        path: '/assessment/siteEvaluation'
      },
      {
        name: '加分项',
        path: '/assessment/bonus'
      },
      {
        name: '日常落实情况打分',
        path: '/assessment/implementScores'
      },
      {
        name: '减分项',
        path: '/assessment/minusPoints'
      },
      {
        name: '初评意见',
        path: '/assessment/opinion'
      },
      {
        name: '降档',
        path: '/assessment/downgrade'
      },
      {
        name: '评价结果',
        path: '/assessment/evaluationResults'
      },


    ]
    const { location } = this.props
    const { activePath } = this.props.state
    var show = false;

  
    return (
      <Fragment>
        <ul className="nav">
          <div className="swiper-container">
            <div class="swiper-wrapper">
              {
                this.state.data.map((item, index) =>
                  <Link className={`${item.path == location.pathname ? 'navList active' : 'navList'}  swiper-slide `} to={item.path} >
                    <li key={item.name + index}>
                      <i>{item.name.substr(0, 1)}</i>
                      <span>{item.name}</span>
                    </li>
                  </Link>
                )
              }

            </div>

          </div>
        </ul>
      </Fragment>
    )
  }
}

export default Nav