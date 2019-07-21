import React, { Component } from 'react';
import FunctionCard from '../cards/FunctionCard';

import axios from 'axios';
import '../../styles/package_details/PackageDetails.scss'
import CreateFunction from '../forms/CreateFunction';

import add from '../../assets/feather/plus-circle.svg'

class PackageDetails extends Component {

    //=========================================================================
    // Class Functions
    //=========================================================================

    constructor(props) {
        super(props);

        this.state = {
            app: {
                ...props.state,
            },
            page: {
                add_function: false,
            },
            package: {
                id: "",
                name: "",
                tag: "",
                in_prod: false,
            },
            function: {
                name: '',
                author: '',
                tag: '',
                code: '',
                description: '',
                is_favorite: false,
            },
            function_list: [],
        }

        this.toggleFavorite = this.toggleFavorite.bind(this)
        this.onChangeField = this.onChangeField.bind(this)
        this.onSubmitFunction = this.onSubmitFunction.bind(this)
        this.updateStageManager = this.updateStageManager.bind(this)
        this.handleGlobalState = this.handleGlobalState.bind(this)
    }

    componentDidMount() {
        this.getPackage(this.state.app.selected.id);
        this.getFunctions();
    }



    //=========================================================================
    // Local State
    //=========================================================================

    onChangeField(e, field, type) {
        this.setState({
            [type]: {
                ...this.state[type],
                [field]: e.target.value,
            }
        });
    }

    addMode(e) {
        e.preventDefault();
        this.setState({
            ...this.state,
            page: {
                ...this.state.page,
                add_function: true,
            }
        })
    }

    cancelAdd(e) {
        e.preventDefault();
        this.setState({
            ...this.state,
            page: {
                ...this.state.page,
                add_function: false,
            }
        })
    }

    //=========================================================================
    // Global State
    //=========================================================================

    handleGlobalState(funct) {
        let new_state = {...this.state,
            app: {
                ...this.state.app,
                function: funct,
            },
        };
        this.props.stateHandler(new_state)
        console.log("Sending New State:", new_state)
    }

    updateStageManager(value, funct) {
        this.handleGlobalState(funct);
        this.props.stageManager(value, funct);
        console.log("Hitting Parent")
    }

    //=========================================================================
    // API Calls
    //=========================================================================

    onSubmitFunction(e) {
        e.preventDefault();
     
        const newFunction = this.state.function;
        newFunction.package = this.state.package.name;

        console.log(newFunction)

        axios.post('http://localhost:4000/functions/add', newFunction)
            .then(res => {console.log(res.data); this.getFunctions()})

        this.setState({
            function: {
                name: '',
                author: '',
                tag: '',
                description: '',
                is_favorite: false,
            },
            page: {
                add_function: false,
            }
        })
    }

    getFunctions() {
        axios.get('http://localhost:4000/functions/find/' + this.state.app.selected.id)
        .then(response => {
            // console.log(response);
            this.setState({ function_list: response.data });
        })
        .catch(function (error){
            console.log(error);
        })
    }

    toggleFavorite(id, is_favorited) {

        let payload = {
            is_favorite: !is_favorited,
        }

        axios.post('http://localhost:4000/functions/update/' + id, payload)
        .then(response => {
            this.getFunctions();
        })
        .catch(function (error){
            console.log(error);
        })
    }

    deleteFunction(e, id) {
        e.preventDefault();

        const payload = {
            _id: id,
        }

        axios.delete('http://localhost:4000/functions/delete/'+id, payload)
            .then(res => {console.log(res.data); this.getFunctions()})
    }

    getPackage(id) {
        axios.get('http://localhost:4000/packages/' + id)
        .then(response => {
            this.setState({ 
                package: {
                    id: response.data._id,
                    name: response.data.name,
                    tag: response.data.tag,
                    in_prod: response.data.in_prod,
                }
             });
        })
        .catch(function (error){
            console.log(error);
        })
    }

    //=========================================================================
    // Functions
    //=========================================================================

    addFunctionButton() {
        if (!this.state.page.add_function) {
            return (
                <img className="addFunction" src={add} alt="Add" onClick={(e) => {this.addMode(e)}}/>
            )
        } else {
            return (
                <img className="cancelFunction" src={add} alt="Cancel" onClick={(e) => {this.cancelAdd(e)}}/>
            )
        }
    }
    // 
    // renderFunctionCards()
    // ---------------------------------------------------------------------
    // If there are snippets returned from the GET, render them, if not, 
    // offer user the chance to create.
    // 

    renderFunctionCards() {
        const renderPlaceholder = () => {
            return (
                <div className="content_placeholder">
                    <h1>No functions found</h1>
                    <h2>Why not add some?</h2>
                    <CreateFunction onChangeField={this.onChangeField} onSubmit={this.onSubmitFunction}/>
                </div>
            )
        };

        const renderCards = () => {
            return (
                <div className="card_gallery">
                    {this.state.function_list.map((funct, i) => {
                        return (<FunctionCard name={funct.name} 
                                    function={funct}
                                    description={funct.description}
                                    is_favorited={funct.is_favorite}
                                    handler={(e) => {this.toggleFavorite(funct._id, funct.is_favorite)}}
                                    delete={(e) => {this.deleteFunction(e, funct._id)}}
                                    stageManager={this.updateStageManager}
                                    key = {`function_${i}`}
                        />)
                    })}
                </div>
            )
        }

        const newFunctionDialog = () => {
            return(
                <div className="content_placeholder">
                    <CreateFunction onChangeField={this.onChangeField} 
                                    onSubmit={this.onSubmitFunction}/>
                </div>
            )
        }

        if (!this.state.function_list || this.state.function_list < 1) {
            return renderPlaceholder();
        } else if (!this.state.page.add_function) {
            return renderCards();
        } else if (this.state.page.add_function) {
            return newFunctionDialog();
        }
    }

    //=========================================================================
    // Main Render
    //=========================================================================


    render() {
        return (
            <div className="package_details_wrapper">
                <div className="package_titles">
                    <h1 className="name">{this.state.package.name}</h1>
                    <h2 className="tag-large">{this.state.package.tag}</h2>
                </div>
                {this.addFunctionButton()}
                <div className="package_content">
                    {this.renderFunctionCards()}
                </div>
            </div>
        )
    }

};

export default PackageDetails;