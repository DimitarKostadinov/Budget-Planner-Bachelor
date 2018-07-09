import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends Component {
    render() {
        const { loggedIn, onLogout } = this.props;
        const currentMonth = (new Date().getMonth() + 1);

        return (
            <main>
            <header>
                <nav className="navbar navbar-dark bg-secondary">
                    <div className="container">
                        <div className="row header-row">
                            <div className="col-md-12">
                                {loggedIn && <NavLink className="nav-link" exact to={`/monthly/${currentMonth}`}>Monthly Balance</NavLink>}
                                {loggedIn && <NavLink className="nav-link"  to="/yearly">Yearly Balance</NavLink>}
                                
                                {!loggedIn &&<NavLink className="nav-link" to="/login"> <p className="text-dark login">Login</p></NavLink>}
                                {!loggedIn &&<NavLink className="nav-link" to="/register"><p className="text-dark register">Register</p></NavLink>}
                            </div>
                            {!loggedIn &&<h1><p className="text-center" className="text-dark welcomeMessage">Добре дошли в Бюджетния Планификатор!</p></h1>}
                        </div>
                        <div className="row">
                        {loggedIn &&<p className="nav-link userName">Welcome, {localStorage.getItem('name')}!</p>}
                        {loggedIn &&<a onClick={onLogout} href="javascript:void(0)" className="nav-link logout">Logout</a>}
                        </div>
                    </div>
                </nav>
            </header>
            </main>
        );
    }
}