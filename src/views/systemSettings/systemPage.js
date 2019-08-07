import React from 'react'
import {Link,withRouter,Route} from 'react-router-dom'
import connect from 'connect'
import ZzglAdmin from  './zzgl/index'
import UserAdmin from './userAdmin/index'
import RoleAdmin from './roleAdmin/index'
import LevelAdmin from './levelAdmin/index'
// import NavBar from './nav'
import './page.less'
@connect
@withRouter
class PageIndex extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const { location } = this.props;
        console.log(location.pathname);
        return(
            <div className="systemPageWrap"> 
                {/* <NavBar /> */}
                <div className='content'>
                    <Route path={`/systemSettings/zzgl`} exact component={ZzglAdmin}/>  
                    <Route path={`/systemSettings/roleAdmin`}  component={RoleAdmin}/>  
                    <Route path={`/systemSettings/userAdmin`}  component={UserAdmin}/>  
                    <Route path={`/systemSettings/levelAdmin`}  component={LevelAdmin}/>
                </div>
        </div>
            
        )
    }
}
export default PageIndex;