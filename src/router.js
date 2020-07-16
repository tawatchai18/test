import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import Switch from 'react-router-transition-switch'
import Loadable from 'react-loadable'
import { connect } from 'react-redux'

import Layout from 'layouts'
import NotFoundPage from 'pages/system/404'
import Loader from 'components/layout/Loader'

const loadable = loader =>
  Loadable({
    loader,
    delay: false,
    loading: () => <Loader />,
  })

const routes = [
  // Dashboards
  {
    path: '/dashboard/analytics',
    Component: loadable(() => import('pages/dashboard/analytics')),
    exact: true,
  },
  {
    path: '/dashboard/crypto',
    Component: loadable(() => import('pages/dashboard/crypto')),
    exact: true,
  },
  {
    path: '/system/login',
    Component: loadable(() => import('pages/system/login')),
    exact: true,
  },
]

const mapStateToProps = ({ settings }) => ({ settings })

@connect(mapStateToProps)
class Router extends React.Component {
  render() {
    const {
      history,
      settings: { routerAnimation },
    } = this.props
    return (
      <ConnectedRouter history={history}>
        <Layout>
          <Switch
            render={props => {
              const {
                children,
                location: { pathname },
              } = props
              return (
                <SwitchTransition>
                  <CSSTransition
                    key={pathname}
                    classNames={routerAnimation}
                    timeout={routerAnimation === 'none' ? 0 : 300}
                  >
                    {children}
                  </CSSTransition>
                </SwitchTransition>
              )
            }}
          >
            <Route exact path="/" render={() => <Redirect to="/dashboard/analytics" />} />
            {routes.map(({ path, Component, exact }) => (
              <Route path={path} key={path} exact={exact}>
                <Component />
              </Route>
            ))}
            <Route component={NotFoundPage} />
          </Switch>
        </Layout>
      </ConnectedRouter>
    )
  }
}
export default Router
