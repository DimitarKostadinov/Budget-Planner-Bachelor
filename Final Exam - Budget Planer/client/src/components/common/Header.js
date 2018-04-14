import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends Component {
    render() {
        const { loggedIn, onLogout } = this.props;
        const currentMonth = (new Date().getMonth() + 1);

        return (
            <header>
                <nav className="navbar navbar-dark bg-secondary">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                {loggedIn && <NavLink className="nav-link" exact to={`/monthly/${currentMonth}`}>Monthly Balance</NavLink>}
                                {loggedIn && <NavLink className="nav-link"  to="/yearly">Yearly Balance</NavLink>}
                                {loggedIn &&<a onClick={onLogout} href="javascript:void(0)" className="nav-link">Logout</a>}
                                {!loggedIn &&<NavLink className="nav-link" to="/login"> <p class="text-info">Login</p></NavLink>}
                                {!loggedIn &&<NavLink className="nav-link" to="/register"><p class="text-success">Register</p></NavLink>}
                            </div>
                            {!loggedIn &&<h1><p className="text-center" className="text-primary">Добре дошли в Бюджетния Планер!</p></h1>}
                        </div>
                       
                    </div>
                </nav>
            </header>
        );
    }
}