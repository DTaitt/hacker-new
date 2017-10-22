import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function Header() {
    return(
        <header>
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                    <Link to="/">
                        <h1>HackerNew</h1>                       
                    </Link>
                    </Navbar.Brand>    
                </Navbar.Header>
                <Nav>
                    <LinkContainer to="/favorites">
                        <NavItem eventKey = { 1 } >Favorites</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/history">
                    <NavItem eventKey = { 2 } >History</NavItem>
                </LinkContainer>
                </Nav>
            </Navbar>
        </header>
    )
};