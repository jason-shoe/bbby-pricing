import React, { Component } from 'react';
import axios from 'axios';
import './product.scss'
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries} from 'react-vis';

class SimilarProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            table: {},
            prod_id: 0,
            numericCols:[],
            nonNumericCols:[]
        }
      }

    componentDidUpdate(prevProps){
        if(this.props.prod_id != prevProps.prod_id){
            this.setState({
                table: this.props.data,
                prod_id: this.props.prod_id,
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
        const {table, prod_id, numericCols, nonNumericCols} = this.state;
        console.log(prod_id)
        return(
            <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap', justifyContent:'center'}}>
                {Object.keys(table).filter(key => table[key]['PRODUCT_ID'] == prod_id).map(key => 
                <div style={{width: '22%',marginLeft:'1%',margin:'1%', border:'1px solid black', borderRadius:'10px', padding:'3px'}}>
                    <h4 style={{marginTop:'3px', borderBottom:'1px solid black', textAlign:'center'}}>{table[key]['TITLE']}</h4>
                    <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-start'}}>
                        <div style={{width:'50%'}}>
                            <img style={{maxWidth:'100%',height:'auto'}}src={table[key]['IMAGE_URL']}></img>
                        </div>
                        <table style={{margin:'0 auto'}}>
                            <tbody>
                                <tr>
                                    <td style ={{fontWeight:'bold',textAlign:'left'}}>Price:</td>
                                    <td>${table[key][numericCols[numericCols.length - 1]]}</td>
                                </tr>
                                <tr>
                                    <td style ={{fontWeight:'bold',textAlign:'left'}}>Color:</td>
                                    <td>{table[key]['COLOR_GROUP']}</td>
                                </tr>
                                <tr>
                                    <td style ={{fontWeight:'bold',textAlign:'left'}}>Cat:</td>
                                    <td>{table[key]['CATEGORY']}</td>
                                </tr>
                                <tr>
                                    <td style ={{fontWeight:'bold',textAlign:'left'}}>ID:</td>
                                    <td>{table[key]['ID']}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                                    
                </div>)}
            </div>
            
        )
    }
}

export default SimilarProduct;
