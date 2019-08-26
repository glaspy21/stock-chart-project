import React, { Component } from 'react'

class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-light sticky-top shadow-sm" style={{height: 40, fontFamily: 'helvetica', fontSize: 15, color: 'white', fontWeight: 'bold', backgroundColor: 'black'}}>
                <div className="ml-3 mr-3">
                    <span className="mr-4">
                    T3
                    </span>
                   <span>
                        Technical Trading Trainer
                   </span>
                </div>
               
            </nav>
        )
    }
}

export default NavBar

//border-style: dotted
//border-color: coral
//FB8B1E