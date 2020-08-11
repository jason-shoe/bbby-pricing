import React, { Component } from 'react';
import axios from 'axios';
import Product from './product.js'
import SimilarProduct from './similarProduct.js'

import styles from './navigation.module.css'

class NavigationTarget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            table: {'TITLE':0},
            curr_id: 10112834,
            curr_product_id: 1010112834,
            curr_index: 0,
            query: "0",
            sort_method: "none",
            filter_method: "none"
            
        }
        this.handleSortChange = this.handleSortChange.bind(this);
      }
    componentDidMount() {
        axios.get('127.0.0.1:5000/get_table/0/none/none/1000')
        .then(response => {
            this.setState({
                table: response.data
            })
        })
    }
    handleQueryChange = (event) => {
        if(event.keyCode == 13){
            event.preventDefault();
            this.setState({
                query: event.target.value,
            })
            if(event.target.value == ""){
                axios.get('127.0.0.1:5000/get_table_target/0/' + this.state.sort_method + '/' + this.state.filter_method + '/1000')
                .then(response => {
                    this.setState({
                        table: response.data
                    })
                })
            }else{
                axios.get('127.0.0.1:5000/get_table_target/' + event.target.value+'/' + this.state.sort_method + '/' + this.state.filter_method + '/1000')
                .then(response => {
                    this.setState({
                        table: response.data
                    })
                })
            }
        }
        
    }
    handleSortChange = (event) => {
        event.preventDefault();
        this.setState({
            sort_method: event.target.value,
        })
        axios.get('127.0.0.1:5000/get_table_target/' + this.state.query + '/' + event.target.value + '/' + this.state.filter_method + '/500')
        .then(response => {
            this.setState({
                table: response.data
            })
        })
        
    }

    handleFilterChange = (event) => {
        event.preventDefault();
        this.setState({
            filter_method: event.target.value,
        })
        axios.get('127.0.0.1:5000/get_table_target/' + this.state.query + '/' + this.state.sort_method + '/' + event.target.value +'/500')
        .then(response => {
            this.setState({
                table: response.data
            })
        })
    }

    updateKey(increment){
        console.log("in the update")
        console.log(Object.keys(this.state.table['TITLE']).length)
        console.log(this.state.curr_index + increment)
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
        const { table } = this.state;
        return(
            <div style = {{backgroundColor:'#eaeaea'}}>
                <div style={{display:'flex',flexDirection:'row',width:'100%'}}>
                    <div className={styles.container}>
                        <h1 className={styles.container_title}>Product Navigation</h1>
                        <form>
                            <input className = {styles.input_bar} name="query" type="text" onKeyDown={this.handleQueryChange} placeholder="Press Enter to Search" />
                            <select className = {styles.input_bar} onChange = {this.handleSortChange}>
                                <option value="none">None</option>
                                <option value="units_sold_asc">Units Sold Ascending</option>
                                <option value="units_sold_desc">Units Sold Descending</option>
                            </select>
                            <select className = {styles.input_bar} onChange = {this.handleFilterChange}>
                                <option value="none">None</option>
                                <option value="bedding">Bedding</option>
                                <option value="decor">Decor</option>
                                <option value="furniture">Furniture</option>
                                <option value="storage">Storage</option>
                                <option value="lighting">Lighting</option>
                                <option value="bath">Bath</option>
                            </select>
                            
                        </form>
                        <div style={{height:'500px',overflowY:'auto',width:'100%', borderTop:'1px solid black',borderBottom:'1px solid black'}}>
                            <table style={{width:'100%',borderCollapse:'collapse'}}>
                                <tr style={{border:'1px solid black',borderCollapse:'collapse',borderTopStyle:'none'}}>
                                {Object.keys(table).splice(1, Object.keys(table).length).map(keyTwo => 
                                    <th style={{border:'1px solid black',borderCollapse:'collapse',borderTopStyle:'none'}}>{keyTwo}</th>)}
                                    <th>IMAGE_URL</th>
                                </tr>
                                <tbody>
                                    {Object.keys(table['TITLE']).map((key, index) => <tr className = {styles.special} onClick={() => this.updateProduct(table['ID'][key],table['PRODUCT_ID'][key],index)} style={{borderBottom:'1px solid black',borderCollapse:'collapse'}}>
                                        {Object.keys(table).splice(1, Object.keys(table).length).map(keyTwo => 
                                        <td style={{border:'1px solid black',borderCollapse:'collapse'}}>
                                            {table[keyTwo][key]}
                                        </td>)}
                                        <td>
                                            <img style={{width:'100px',height:'auto'}} src={table['IMAGE_URL'][key]} />
                                        </td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <div className={styles.container}>
                        <h1 className={styles.container_title}>Selected Product</h1>
                        <div style={{display:'flex',flexDirection:'row', justifyContent:'center'}}>
                            <input onClick = {() => this.updateKey(-1)} type="button" value="Previous Product" />
                            <input onClick = {() => this.updateKey(1)} type="button" value="Next Product" />
                        </div>
                        <Product id={this.state.curr_id}/>
                    </div>
                </div>
                <div style ={{width: '98%'}} className={styles.container}>
                <h1 className={styles.container_title}>Similar Products</h1>
                    <SimilarProduct product_id={this.state.curr_product_id} id={this.state.curr_id}/>
                </div>

                
            </div>

        )
    }

}

export default NavigationTarget;
