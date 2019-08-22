import React from 'react'
import * as d3 from 'd3';
import '../candlestickFiles/cschart.css'
import { mainjs } from '../candlestickFiles/csmain'


const ChartSVG = () => {
    return (
    <div id="demobox">
        <div id="csbox">
            <div id="option">
                <input id="oneM" name="1M" type="button" value="1M"/>
                <input id="threeM" name="3M" type="button" value="3M" />
                <input id="sixM" name="6M" type="button" value="6M" />
                <input id="oneY" name="1Y" type="button" value="1Y" />
                <input id="twoY" name="2Y" type="button" value="2Y" />
                <input id="fourY" name="4Y" type="button" value="4Y" />
            </div>
            <div id="infobar">
               <div id="infodate" className="infohead"></div>
                <div id="infoopen" className="infobox"></div>
                <div id="infohigh" className="infobox"></div>
                <div id="infolow" className="infobox"></div>
                <div id="infoclose" className="infobox"></div>
            </div>
            <div id="chart1"></div>
        </div> 
    </div> 
  )
}

export default ChartSVG;