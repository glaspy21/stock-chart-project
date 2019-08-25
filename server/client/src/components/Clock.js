import React, { Component, Fragment } from 'react';
import $ from 'jquery'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { setCurrentTime } from '../actions/index'


class Clock extends Component {
    constructor() {
        super()

        this.state = {
            year: '',
            month: '',
            day: '',
            hour: '',
            minute: '',
        }
    }

    componentDidUpdate() {
        console.log(this.state)
    }

    renderForm () {
        $("#form1").toggle();
    }

    render() {
        return (
            <Fragment>
                <div className="col-md-6">
                <button type="button" id="formButton" onClick={this.renderForm}>Change Time</button>

                <form id="form1">
                    <div>
                        <b>M</b> <input type="text" style={{width: 20}} placeholder="MM" name="month" onChange={(e) => {this.setState({ month: e.target.value })}}/>
                        <b>D</b> <input type="text" style={{width: 20}} placeholder="DD" name="month" onChange={(e) => {this.setState({ day: e.target.value })}}/>
                        <b>Y</b> <input type="text" style={{width: 30}} placeholder="YYYY" name="month" onChange={(e) => {this.setState({ year: e.target.value })}}/>
                    </div>
                    <div>
                        <b>H</b> <input type="text" style={{width: 20}} placeholder="HH" name="month" onChange={(e) => {this.setState({ hour: e.target.value })}}/>
                        <b>m</b> <input type="text" style={{width: 20}} placeholder="mm" name="month" onChange={(e) => {this.setState({ minute: e.target.value })}}/>
                    </div>
                <button type="button" id="submit" onClick={() => this.props.setCurrentTime(this.state)}>Change</button>
                </form>
                </div>
                <div className="col-md-6 text-right">
                    <div className="col-md-6 text-center" />
                    <div>
                        <div>
                            <span style={{fontSize: 40}}><b>{this.props.currentTime.hour}:{this.props.currentTime.minute}:{this.props.currentTime.second}</b></span><span style={{fontSize: 10}}>AM</span>
                            <div>{this.props.currentTime.month} {this.props.currentTime.day} {this.props.currentTime.year} </div>
                        </div>
                        
                    </div>

                </div>
                {/* <div>{this.props.currentTime}</div> */}
            </Fragment>
        )
    }
}

function mapStateToProps (state) {
    return {
        currentTime: state.currentTime
    }
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators({ setCurrentTime }, dispatch)
}



export default connect (mapStateToProps, mapDispatchToProps)(Clock)