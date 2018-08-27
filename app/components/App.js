import React from 'react'
import Popular from './Popular'
const ReactRouter = require('react-router-dom')
import Home from './Home'
import Nav from './Nav'
import Battle from './Battle'

const Router = ReactRouter.BrowserRouter
const Route = ReactRouter.Route
const Switch = ReactRouter.Switch

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <Nav />
                    <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path ='/battle' component={Battle} />
                    <Route path='/popular' component={Popular} />
                    <Route render={function() {
                        return <p>Not Found!</p>
                    }} />
                    </Switch>
                </div>
            </Router>
        )
    }
}