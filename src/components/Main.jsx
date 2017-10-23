import { Switch, Route } from 'react-router-dom'
import React from 'react'

import Home from './pages/Home';
import Favorites from './pages/Favorites';

export default function Main() {
    return(
        <main>
            <Switch>
                <Route exact path='/' component={ Home }/>
                <Route path='/favorites' component={ Favorites }/>
            </Switch>
        </main>
    )
}
