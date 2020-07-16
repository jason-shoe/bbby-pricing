import React, { Component } from 'react';
import axios from 'axios';
import './product.scss'
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries} from 'react-vis';

class SimilarProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {'CATEGORY':0}
        }
      }
    componentDidMount() {
        axios.get('http://localhost:5000/get_info_similar/'+this.props.product_id + '/' + this.props.id)
        .then(response => {
            this.setState({
                info: response.data
            })
        })
      }
    
    componentDidUpdate(prevProps){
        if(this.props.id != prevProps.id){
            axios.get('http://localhost:5000/get_info_similar/'+this.props.product_id + '/' + this.props.id)
            .then(response => {
                this.setState({
                    info: response.data
                })
            })
        }
      }
    render(){
        const {info } = this.state;
        const num_non_numeric = 10
        return(
            <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap', justifyContent:'center'}}>
                {Object.keys(info['CATEGORY']).map(key => 
                <div style={{width: '22%',marginLeft:'1%',margin:'1%', border:'1px solid black', borderRadius:'10px', padding:'3px'}}>
                    <h4 style={{marginTop:'3px', borderBottom:'1px solid black', textAlign:'center'}}>{info['TITLE'][key]}</h4>
                    <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-start'}}>
                        <div style={{width:'50%'}}>
                            <img style={{maxWidth:'100%',height:'auto'}}src={info['IMAGE_URL'][key]}></img>
                        </div>
                        <table style={{margin:'0 auto'}}>
                            <tbody>
                                <tr>
                                    <td style ={{fontWeight:'bold',textAlign:'left'}}>Price:</td>
                                    <td>${info[Object.keys(info)[Object.keys(info).length-num_non_numeric - 1]][key]}</td>
                                </tr>
                                <tr>
                                    <td style ={{fontWeight:'bold',textAlign:'left'}}>Color:</td>
                                    <td>{info['COLOR_GROUP'][key]}</td>
                                </tr>
                                <tr>
                                    <td style ={{fontWeight:'bold',textAlign:'left'}}>Cat:</td>
                                    <td>{info['CATEGORY'][key]}</td>
                                </tr>
                                <tr>
                                    <td style ={{fontWeight:'bold',textAlign:'left'}}>ID:</td>
                                    <td>{info['ID'][key]}</td>
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
