import asyncComponent from './asyncComponent'



const _import_components = file => asyncComponent(() => import(`components/${file}`))

const _import_views = file => asyncComponent(() => import(`views/${file}`))

const setChildrenRoles = routes => routes.map((route, index) => {
    let role = route.role;
    console.log(role)

    if (!role) {
        return route
    }

    let fn = (children, role) => {
        return children.map(child => {
            child.role = Array.from(new Set([...(child.role || []), ...role]))
            if (child.children) {
                child.children = fn(child.children, child.role)
            }
            return child
        })
    }
    if (route.children) {
        route.children = fn(route.children, role)
    }
    return route
})


// react-router-config
const asyncRouterMapList = [
    {
        path: '/assessmentCatalog',
        login: true,
        layout: true,
        name: '考核目录',
        redirect: '/assessmentCatalog/Catalog',
        children: [
            {
                path: '/assessmentCatalog/index',
                component: _import_views('assessmentCatalog/index'),
                name: '考核目录'
            },
            {
                path: '/assessmentCatalog/Catalog',
                component: _import_views('assessmentCatalog/index'),
                name: '考核目录',
            },
            {
                path: '/assessmentCatalog/AddClass',
                component: _import_views('assessmentCatalog/index'),
                name: '考核目录 > 加分项'
            },
            {
                path: '/assessmentCatalog/SubClass',
                component: _import_views('assessmentCatalog/index'),
                name: '考核目录 > 减分项'
            },
            {
                path: '/assessmentCatalog/DownClass',
                component: _import_views('assessmentCatalog/index'),
                name: '考核目录 > 降档项'
            },
            {
                path: '/assessmentCatalog/AddCheckList',
                component: _import_views('assessmentCatalog/pages/Catalog/AddCheckList/index'),
                name: '考核目录 > 添加考核目录'
            },
            {
              path: '/assessmentCatalog/EditCheckList',
              component: _import_views('assessmentCatalog/pages/Catalog/EditCheckList/index'),
              name: '考核目录 > 修改考核目录'
            },
        ]
    },
    {
        path: '/assessment',
        login: true,
        layout: true,
        name: '考核评价',
        redirect: '/assessment/publishTask',
        children: [
            { path: '/assessment/index', component: _import_views('assessment/index'), name: '考核评价' },
            { path: '/assessment/publishTask', component: _import_views('assessment/index'), name: '发布任务' },
            { path: '/assessment/selfEvaluation', component: _import_views('assessment/index'), name: '企业自评' },
            { path: '/assessment/selfEvaluationEdit/:checkdir_id/:level', component: _import_views('assessment/page/selfEvaluationEdit'), name: '自评' },
            { path: '/assessment/selfEvaluationView/:checkdir_id/:level', component: _import_views('assessment/page/selfEvaluationView'), name: '查看自评' },
            { path: '/assessment/selfEvaluationReport', component: _import_views('assessment/index'), name: '自评报告' },
            { path: '/assessment/selfEvaluationReportEdit/:id', component: _import_views('assessment/page/selfEvaluationReportEdit'), name: '编写自评报告' },
            { path: '/assessment/selfEvaluationReportView/:id', component: _import_views('assessment/page/selfEvaluationReportView'), name: '查看自评报告' },
            { path: '/assessment/postOnSiteAssessment', component: _import_views('assessment/index'), name: '发布现场考核' },
            { path: '/assessment/siteEvaluation', component: _import_views('assessment/index'), name: '现场评价' },
            { path: '/assessment/siteEvaluationEdit/:checkdir_id/:level/:org_id', component: _import_views('assessment/page/siteEvaluationEdit'), name: '现场评价' },
            { path: '/assessment/siteEvaluationView/:checkdir_id/:level/:org_id', component: _import_views('assessment/page/siteEvaluationView'), name: '现场评价' },
            { path: '/assessment/bonus', component: _import_views('assessment/index'), name: '加分项' },
            { path: '/assessment/bonusEdit/:year/:id', component: _import_views('assessment/page/bonusEdit'), name: '加分项' },
            { path: '/assessment/bonusView/:year/:id', component: _import_views('assessment/page/bonusView'), name: '加分项' },
            { path: '/assessment/implementScores', component: _import_views('assessment/index'), name: '日常落实情况打分' },
            { path: '/assessment/dailyScore/:year/:org_id', component: _import_views('assessment/page/dailyScore'), name: '日常打分' },
            { path: '/assessment/minusPoints', component: _import_views('assessment/index'), name: '减分项' },
            { path: '/assessment/minusPointsEdit/:year/:id', component: _import_views('assessment/page/minusPointsEdit'), name: '减分' },
            { path: '/assessment/minusPointsView/:year/:id', component: _import_views('assessment/page/minusPointsView'), name: '减分' },
            { path: '/assessment/opinion', component: _import_views('assessment/index'), name: '初评意见' },
            { path: '/assessment/opinionEdit/:year/:org_id', component: _import_views('assessment/page/opinionEdit'), name: '初评意见' },
            { path: '/assessment/downgrade', component: _import_views('assessment/index'), name: '降档' },
            { path: '/assessment/downgradeEdit/:year/:id', component: _import_views('assessment/page/downgradeEdit'), name: '降档' },
            { path: '/assessment/downgradeView/:year/:id', component: _import_views('assessment/page/downgradeView'), name: '降档' },
            { path: '/assessment/evaluationResults', component: _import_views('assessment/index'), name: '评价结果' },
            { path: '/assessment/evaluationResultsEdit/:year/:org_id', component: _import_views('assessment/page/evaluationResultsEdit'), name: '评价结果' },
        ]
    },
    {
        path: '/dataAnalysis',
        login: true,
        layout: true,
        name: '数据分析',
        redirect: '/dataAnalysis/Rank',
        children: [
            {
                path: '/dataAnalysis/index',
                component: _import_views('dataAnalysis/index'),
                name: '数据分析'
            },
            {
                path: '/dataAnalysis/Rank',
                component: _import_views('dataAnalysis/index'),
                name: '考核排行榜'
            },
            {
                path: '/dataAnalysis/Analysis',
                component: _import_views('dataAnalysis/index'),
                name: '考核数据分析'
            },
            {
                path: '/dataAnalysis/Progress',
                component: _import_views('dataAnalysis/index'),
                name: '内评工作进度'
            },
        ]
    },
    {
        path: '/integratedQuery',
        login: true,
        layout: true,
        name: '综合查询',
        redirect: '/integratedQuery/queryCategory',
        children: [
            { path: '/integratedQuery/index', component: _import_views('integratedQuery/index'), name: '考核目录查询' },
            { path: '/integratedQuery/queryCategory', component: _import_views('integratedQuery/index'), name: '考核目录查询' },
            { path: '/integratedQuery/queryRecord', component: _import_views('integratedQuery/index'), name: '考核记录查询' },
            { path: '/integratedQuery/queryCompany', component: _import_views('integratedQuery/index'), name: '企业报告查询' },
        ]
    },
    {
        path: '/systemSettings',
        login: true,
        layout: true,
        icon: 'edit',
        name: '系统设置',
        redirect: '/systemSettings/zzgl',
        children: [
            { path: '/systemSettings/zzgl', component: _import_views('systemSettings/index'), name: '组织管理' },
            { path: '/systemSettings/roleAdmin', component: _import_views('systemSettings/index'), name: '角色管理' },
            { path: '/systemSettings/userAdmin', component: _import_views('systemSettings/index'), name: '用户管理' },
            { path: '/systemSettings/levelAdmin', component: _import_views('systemSettings/index'), name: '分级管理' },
            { path: '/systemSettings/addUser', component: _import_views('systemSettings/userAdmin/addUser'), name: '添加用户' },
            { path: '/systemSettings/addRole', component: _import_views('systemSettings/roleAdmin/addRole'), name: '添加角色' },
            { path: '/systemSettings/modifyAuth', component: _import_views('systemSettings/userAdmin/modifyAuth'), name: '修改权限' },
        ]
    },
    {
        path: '/modifyAvater',
        login: true,
        layout: true,
        showOntab: true,
        name: '修改头像',
        hidden: true,
        component: _import_views('Home/personInfo/modifyAvater')
    },
    {
        path: '/modifyInfo',
        login: true,
        layout: true,
        showOntab: true,
        name: '基本信息',
        hidden: true,
        component: _import_views('Home/personInfo/modifyInfo')
    },
    {
        path: '/news',
        login: true,
        layout: true,
        showOntab: true,
        name: '消息列表',
        hidden: true,
        component: _import_views('Home/news')
    },
    {
        path: '/modifyPassword',
        login: true,
        layout: true,
        showOntab: true,
        name: '修改密码',
        hidden: true,
        component: _import_views('Home/personInfo/modifyPassword')
    },
]
export const constantRouterMap = [
    {
        path: '/login',
        login: false,
        hidden: true,
        name: '账号登陆',
        component: _import_views('Login')
    },
    {
        path: '/',
        exact: true,
        login: true,
        layout: true,
        name: '首页',
        component: _import_views('Home'),


    }
]
export const asyncRouterMap = setChildrenRoles(asyncRouterMapList)
export const allRoutes = constantRouterMap.concat(asyncRouterMap)
export const routes = constantRouterMap

// export const asyncRouterMap 

