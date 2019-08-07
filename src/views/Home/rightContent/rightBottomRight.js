import React from 'react'
import './right.less'
import { DatePicker } from 'antd';
import axios from '../../../utils/axios.js'
const { MonthPicker } = DatePicker;
import echarts from 'echarts';
const style={
    width:'100%',
    height:'300px'
};
class BottomRight extends React.Component{
    constructor(props){
        super(props)
        this.state={
            personArr:[],
            xName:[],
            complete1:[],
            complete2:[],
            nowTime:''
        }
    }
   async initBar(){
       let that =this;
        setTimeout(()=>{

            let myChart =echarts.init(document.getElementById("rightBar"));
            var option = {
                color: ['#4265ED', '#FF8453'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    show: true,
                    data: ['任务数', '完成量'],
                    bottom:'0px',
                    color:['#f00','#f36']
                },
                calculable: true,
                xAxis: 
                    {
                        type: 'category',
                        axisTick: {show: false},
                        data: that.state.xName,
                        axisLine:{
                            lineStyle:{
                                color:"#DDD"
                            }
                        },
                        axisLabel:{
                            color:"#333"
                        },
                       
                      
                    },
                grid: {
                    top:'10px',
                    left: '10%',
                    right: '10%',
                    bottom: '30px',
                    containLabel: true,
                    borderColor:'#fff',
                    show:true
                },
                yAxis: [
                    {
                        type: 'value',
                        borderColor:'#fff',
                        max:300,
                        axisLine:{
                            lineStyle:{
                                color:"#fff"
                            }
                        },
                        axisLabel:{
                            color:"#AAAAAA"
                        },
                        splitLine:{
                            show:true,
                            lineStyle:{
                                color:['#EEEEEE'],
                                type:'dashed'
                            }
                        }
                    }
                ],
                series: [
                    {
                        name: '任务数',
                        type: 'bar',
                        barGap: 0,
                        data: that.state.complete1
                    },
                    {
                        name: '完成量',
                        type: 'bar',
                        data:  that.state.complete2
                    },
                ]
            };
            myChart.setOption(option)
        },0)
    }
    onChange(date, dateString){
        console.log(date,dateString)
        this.getCharts(dateString)
    }
    getCharts(date){
       var xName=[],
          complete1=[],
          complete2=[];
        axios.get('/v1/users/selfUserData',{
            date:date
        }).subscribe((res)=>{
            console.log(res.data.data);
            for(var i in res.data.data){
                xName[i]=res.data.data[i].real_name;
                complete1[i] =res.data.data[i].complete_count;
                complete2[i] =res.data.data[i].all_count;
            }
            this.setState({
                xName,
                complete1,
                complete2
            })
            this.initBar()
        })
    }
    componentDidMount(){
        var date =new Date();
        const year =date.getFullYear();
        const month =date.getMonth()>=10?parseInt(date.getMonth()*1+1):"0"+parseInt(date.getMonth()*1+1);
        this.getCharts(`${year}-${month}`)
    }
    render(){
        return(
            <div className='rightBottomRight'>
                <div className='rightTitle'>
                    <span className="rightTitleLeft">自评工作进度 - 个人</span>
                    <MonthPicker onChange={(date,dateString)=>this.onChange(date,dateString)} placeholder="2019-07"  className="rightDate" />
                </div>
                <div className="rightBar">
                    <div className="rightBottomBar" id='rightBar' style={style}></div>
                </div>

            </div>
        )
    }
}
export default BottomRight