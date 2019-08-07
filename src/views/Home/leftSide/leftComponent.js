import React from 'react'
import './leftComponent.less'
import { Link, withRouter } from 'react-router-dom'
import  connect from 'connect'
@withRouter
@connect
class LeftComponent extends  React.Component{
    constructor(props){
        super(props)
    }
    render(){
        console.log(this.props.state)
        const {IndexData} =this.props.state;
        console.log(IndexData);
        // '企业自评','现场评价','加分项','提供减分材料','提供减分材料','提供减分材料'
        let arr =[{
            name:'企业自评',
            iconfont:'dangjiankaohe_icon_qiyeziping',
            count:IndexData&&IndexData.fast_entry.self_count,
            path:'/assessment/selfEvaluation'
        },{
            name:'现场评价',
            iconfont:'dangjiankaohe_icon_bianji',
            count:IndexData&&IndexData.fast_entry.scene_count,
            path:'/assessment/siteEvaluation'
        },{
            name:'加分项',
            iconfont:'dangjiankaohe_icon_jiafenxiang',
            count:IndexData&&IndexData.fast_entry.add_count,
            path:'/assessment/bonus'
        },{
            name:'提供减分材料',
            iconfont:'dangjiankaohe_icon_jianfencailiao',
            count:4,
            path:'/assessment/minusPoints'
        }]
        return(
            <div className='leftComponent'>
                {
                    arr.map((el,index)=>{
                        return (
                            <Link to={el.path} key={index+1}>
                                <div  className="clearfix leftComponentList">
                                        <i className={`${el.iconfont} iconfont`}></i>
                                        <span >{el.name}</span>
                                        <b className={`${el.count?'show':'hide'}`}>{el.count}</b>
                                </div>
                            </Link>
                           
                            )

                    })
                }
            </div>
        )
    }
}
export default LeftComponent