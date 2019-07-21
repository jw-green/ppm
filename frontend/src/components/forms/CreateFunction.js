import React, { Component } from 'react';
import '../../styles/forms/CreateFunction.scss'

class CreateFunction extends Component {

    render() {
        return (
            <div className="create_function_wrapper">
                <form action="." onSubmit={(e) => {this.props.onSubmit(e)}} className="new_package_form" autoComplete="off">
                    <input required type="text" value={this.props.name} placeholder="Name" onChange={(e)=>{this.props.onChangeField(e, 'name', 'function')}}/>
                    <input required type="text" value={this.props.author} placeholder="Author" onChange={(e)=>{this.props.onChangeField(e, 'author', 'function')}}/>
                    <input required type="text" value={this.props.tag} placeholder="Tag" onChange={(e)=>{this.props.onChangeField(e, 'tag', 'function')}}/>
                    <textarea required value={this.props.description} placeholder="Description" onChange={(e) => {this.props.onChangeField(e, 'description', 'function')}}/>
                    <input type="submit" name="submit" value="Add Function" className="btn btn-4"/>
                </form>
            </div>
        )
    }

};

export default CreateFunction;