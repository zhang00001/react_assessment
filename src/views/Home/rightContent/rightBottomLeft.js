import React from 'react'
import './left.less'
import '../base.less'
import { DatePicker } from 'antd';
import axios from '../../../utils/axios.js'
import echarts from 'echarts';
import connect from 'connect'
console.log(echarts);
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
@connect
class BottomLeft extends React.Component{
    constructor(props){
        super(props)
        this.state={
                org_all_count:0,
                org_complete_count:0,
                percent:0
        }
    }
    async initCircle(){
        let myChart =echarts.init(document.getElementById("life"));
        console.log(myChart);
        const complete =this.state.percent+'%';
        const data =[
            {value: this.state.org_all_count},
            {value:this.state.org_complete_count}
        ]
        // 绘制图表
        myChart.setOption({
            color:['#EEEEEE','#4265ED'],
            graphic: [{　　　　　　　　　　　　　　　　//环形图中间添加文字
                type: 'text',　　　　　　　　　　　　//通过不同top值可以设置上下显示
                left: 'center',
                top: '110px',
                style: {
                    text: "自评任务",
                    textAlign: 'center',
                    fill: '#000',　　　　　　　　//文字的颜色
                    width: 30,
                    height: 30,
                    fontSize: 16,
                    color: "#333333",
                    fontFamily: "Microsoft YaHei"
    }
    }, {
                type: 'text',
                left: 'center',
                top: '140px',
                style: {
                text: '完成度',
                textAlign: 'center',
                fill: '#CCCCCC',
                width: 30,
                height: 30,
                fontSize: 14,
            }
        },
                {
                    type: 'text',
                    left: 'center',
                    top: '160px',
                    style: {
                        text: complete,
                        textAlign: 'center',
                        fill: '#4265ED',
                        fontSize: 36,
                    },
                }
        ],
            series: [
                {
                    name:'访问来源',
                    type:'pie',
                    radius: ['71%', '90%'],
                    avoidLabelOverlap: false,
                    color:['#ccc','#4265ED'],
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: false,
                            textStyle: {
                                fontSize: '16',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:data
                }
            ]
        });
    }
    getCharts(date){
        axios.get('v1/users/selfOrgData',{
            date:date
        }).subscribe((res)=>{
            console.log(res);
            this.setState({
                org_all_count:res.data.data.org_all_count,
                org_complete_count:res.data.data.org_complete_count,
                percent:res.data.data.percent
            })
            this.initCircle()
        })
    }
    onChange(date, dateString){
        console.log(date, dateString);
        this.getCharts(dateString)
    }
    componentDidMount(){
        this.getCharts()
    }
    render(){
        return(
            <div className='rightBottomLeft '>
               <div className='rightTitle'>
                   <span className="rightTitleLeft">自评工作进度 - 企业</span>
                   <MonthPicker onChange={(date,dateString)=>this.onChange(date,dateString)} placeholder="2019-07"  className="rightDate" />
               </div>
                <div className="bottomLeftEchart flex">
                    <div id="life" style={{ width: 290, height: 290 }}></div>
                    <div className="echartText flex-1">
                        <div>
                            <p>总任务数（项）</p>
                            <p>{this.state.org_all_count}</p>
                        </div>
                        <div>
                            <p>已完成（项）</p>
                            <p className="blue">{this.state.org_complete_count}</p>
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}
export default  BottomLeft