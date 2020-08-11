import React, { Component } from 'react';
import axios from 'axios';
import Product from './product.js'
import SimilarProduct from './similarProduct.js'

import styles from './navigation.module.css'

import DataFrame from 'dataframe-js';

import data from '../totalbbb.csv';

import * as d3 from 'd3';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            table: {'columns':[]},
            curr_id: 10112834,
            curr_product_id: 1010112834,
            curr_index: 0,
            query: "",
            sort_method: "none",
            filter_method: "none",
            relevantColumns: ['TITLE','CATEGORY','COLOR_GROUP']
            
        }
        this.handleSortChange = this.handleSortChange.bind(this);
      }
    componentDidMount() {
        d3.csv(data).then((data) => {
            this.setState(prevState =>({
                table: data
                }))
        })
    }
    handleQueryChange = (event) => {
        if(event.keyCode == 13){
            event.preventDefault();
            this.setState({
                query: event.target.value,
            })
        }
        
    }
    handleSortChange = (event) => {
        event.preventDefault();
        this.setState({
            sort_method: event.target.value,
        })
    }

    handleFilterChange = (event) => {
        event.preventDefault();
        this.setState({
            filter_method: event.target.value,
        })
    }

    updateKey(increment){
        if(this.state.curr_index + increment >= 0 && this.state.curr_index + increment < Object.keys(this.state.table['TITLE']).length){
            this.setState({
                curr_id: this.state.table['ID'][Object.keys(this.state.table['TITLE'])[this.state.curr_index + increment]],
                curr_product_id: this.state.table['PRODUCT_ID'][Object.keys(this.state.table['TITLE'])[this.state.curr_index + increment]],
                curr_index: this.state.curr_index + increment
            })
        }
    }

    updateProduct(id, product_id, index){
        this.setState({
            curr_id: id,
            curr_product_id: product_id,
            curr_index: index
        })

    }
    render(){
        const { table , relevantColumns} = this.state;
        return(
            <div style = {{backgroundColor:'#eaeaea'}}>
                <div style={{display:'flex',flexDirection:'row',width:'100%'}}>
                    <div className={styles.container}>
                        <h1 className={styles.container_title}>Product Navigation</h1>
                        <form>
                            <input className = {styles.input_bar} name="query" type="text" onKeyDown={this.handleQueryChange} placeholder="Press Enter to Search" />
                            <select className = {styles.input_bar} onChange = {this.handleSortChange}>
                                <option value="none">None</option>
                                <option value="price_change_asc">Price Change Ascending</option>
                                <option value="price_change_desc">Price Change Descending</option>
                            </select>
                            <select className = {styles.input_bar} onChange = {this.handleFilterChange}>
                                <option value="none">None</option>
                                <option value="bedding">Bedding</option>
                                <option value="bath">Bath</option>
                                <option value="organization">Organization</option>
                                <option value="decor">Decor</option>
                                <option value="laundry">Laundry</option>
                                <option value="furniture">Furniture</option>
                                <option value="window">Window</option>
                            </select>
                            
                        </form>
                        <div style={{height:'500px',overflowY:'auto',width:'100%', borderTop:'1px solid black',borderBottom:'1px solid black'}}>
                            <table style={{width:'100%',borderCollapse:'collapse'}}>
                                <tr style={{border:'1px solid black',borderCollapse:'collapse',borderTopStyle:'none'}}>
                                {relevantColumns.map(keyTwo => 
                                    <th style={{border:'1px solid black',borderCollapse:'collapse',borderTopStyle:'none'}}>{keyTwo}</th>)}
                                    <th style={{border:'1px solid black',borderCollapse:'collapse',borderTopStyle:'none'}}>PRICE_CHANGE</th>
                                    <th style={{border:'1px solid black',borderCollapse:'collapse',borderTopStyle:'none'}}>IMAGE_URL</th>
                                </tr>
                                <tbody>
                                    {Object.keys(table).filter(key => new RegExp(this.state.query, 'i').test(table[key]['TITLE'])).filter(key => this.state.filter_method == "none" || this.state.filter_method == table[key]['CATEGORY']).sort((keyOne, keyTwo) => {
                                        if(this.state.sort_method == 'price_change_asc') return table[keyOne]['price_change'] - table[keyTwo]['price_change'];
                                        else if(this.state.sort_method == 'price_change_desc') return  table[keyTwo]['price_change'] - table[keyOne]['price_change'];
                                        return keyOne - keyTwo;
                                    }).splice(0,1000).map((key, index) => 
                                    <tr className = {styles.special} onClick={() => this.updateProduct(table[key]['ID'],table[key]['PRODUCT_ID'],index)} style={{borderBottom:'1px solid black',borderCollapse:'collapse'}}>
                                        {relevantColumns.map(keyTwo => 
                                        <td style={{border:'1px solid black',borderCollapse:'collapse'}}>{table[key][keyTwo]}</td>)}
                                        <td style={{border:'1px solid black',borderCollapse:'collapse'}}>
                                            {parseInt(100*table[key]['price_change'])}%
                                        </td>
                                        <td style={{border:'1px solid black',borderCollapse:'collapse'}}>
                                            <img style={{width:'100px',height:'auto'}} src={table[key]['IMAGE_URL']} />
                                        </td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <div className={styles.container}>
                        <h1 className={styles.container_title}>Selected Product</h1>
                        <Product data={table[Object.keys(table).filter(key => table[key]['ID'] == this.state.curr_id)[0]]} columns={table.columns}/>
                    </div>
                </div>
                <div style ={{width: '98%'}} className={styles.container}>
                    <h1 className={styles.container_title}>Similar Products</h1>
                    <SimilarProduct data = {table} prod_id = {this.state.curr_product_id} columns={table.columns}/>
                </div>
            </div>

        )
    }

}

export default Navigation;
