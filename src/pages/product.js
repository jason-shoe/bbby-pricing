import React, { Component } from 'react';
import axios from 'axios';
import './product.scss'
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries,LineMarkSeries} from 'react-vis';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {},
            info_new: {},
            numericCols:[],
            nonNumericCols:[]
        }
    }
    componentDidUpdate(prevProps){
        if(this.props.data != prevProps.data){
            this.setState({
                info: this.props.data,
                numericCols: this.props.columns.filter(function (item) {
                    return (parseInt(item) == item);
                }),
                nonNumericCols: this.props.columns.filter(function (item) {
                    return !(parseInt(item) == item);
                })
            })
        }
        
    }
    render(){
        const {info, numericCols, nonNumericCols} = this.state;
        console.log("the data", this.props.data)
        return(
            <div style={{width: '100%'}}>
                <h3 style={{textAlign:'center'}}>{info['TITLE']}</h3>
                <table style={{margin:'0 auto'}}>
                        <tbody>
                            <tr>
                                <td style ={{fontWeight:'bold',textAlign:'right'}}>Current Price:</td>
                                <td>${info[numericCols[numericCols.length - 1]]}</td>
                            </tr>
                            <tr>
                                <td style ={{fontWeight:'bold',textAlign:'right'}}>Color:</td>
                                <td>{info['COLOR']}</td>
                            </tr>
                            <tr>
                                <td style ={{fontWeight:'bold',textAlign:'right'}}>Category:</td>
                                <td>{info['CATEGORY']}</td>
                            </tr>
                            <tr>
                                <td style ={{fontWeight:'bold',textAlign:'right'}}>ID:</td>
                                <td>{info['ID']}</td>
                            </tr>
                            <tr>
                                <td style ={{fontWeight:'bold',textAlign:'right'}}>Product ID:</td>
                                <td>{info['PRODUCT_ID']}</td>
                            </tr>
                        </tbody>
                    </table>
                <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
                    <div>
                        <h2 style = {{textAlign:'center',marginBottom:'5px', marginTop:'0px'}}>Variant Image</h2>
                        <img style={{width:'auto',maxHeight:'300px'}}src={info['IMAGE_URL']}></img>
                    </div>
                    <div>
                        <h2 style = {{textAlign:'center',marginBottom:'5px', marginTop:'0px'}}>Pricing History</h2>
                        <XYPlot
                            width={300}
                            height={300}
                            getX={d => d[0]}
                            getY={d => d[1]}
                            yDomain={[0,Math.max(...Object.values(numericCols.map(key => info[key])))]}>
                        <HorizontalGridLines />
                        <LineMarkSeries
                            color="#0fb1c0"
                            fill="#00c0ef"
                            data={numericCols.map(key => [parseInt(key), info[key]])}/>
                        <XAxis title="X" />
                        <YAxis />
                        </XYPlot>
                    </div>
                </div>         
            </div>

        )
    }
}

export default Product;
