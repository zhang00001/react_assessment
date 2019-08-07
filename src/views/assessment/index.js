import React from 'react'
import './index.less'
import { Route, Switch } from 'react-router-dom'
import { Link, withRouter } from 'react-router-dom'
import connect from 'connect'

import Nav from './components/Nav'
import PublishTask from './page/publishTask'
import selfEvaluation from './page/selfEvaluation'
import selfEvaluationReport from './page/selfEvaluationReport'
import postOnSiteAssessment from './page/postOnSiteAssessment'
import siteEvaluation from './page/siteEvaluation'
import bonus from './page/bonus'
import implementScores from './page/implementScores'
import minusPoints from './page/minusPoints'
import opinion from './page/opinion'
import downgrade from './page/downgrade'
import evaluationResults from './page/evaluationResults'



@withRouter
@connect
class layout extends React.Component {

	render() {

		return (
			<div className="home_wrapper" >
				<div class="label">
					<Nav />
				</div>

				<div class="container1">
						<Route path={`/assessment/publishTask`} component={PublishTask} />
						<Route path={`/assessment/selfEvaluation`} component={selfEvaluation} />
						<Route path={`/assessment/selfEvaluationReport`} component={selfEvaluationReport} />
						<Route path={`/assessment/postOnSiteAssessment`} component={postOnSiteAssessment} />
						<Route path={`/assessment/siteEvaluation`} component={siteEvaluation} />
						<Route path={`/assessment/bonus`} component={bonus} />
						<Route path={`/assessment/implementScores`} component={implementScores} />
						<Route path={`/assessment/minusPoints`} component={minusPoints} />
						<Route path={`/assessment/opinion`} component={opinion} />
						<Route path={`/assessment/downgrade`} component={downgrade} />
						<Route path={`/assessment/evaluationResults`} component={evaluationResults} />
				</div>
			</div >)
	}
}

export default layout;