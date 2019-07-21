import React, { Component } from 'react';
import '../../styles/stage/Stage.scss'
import axios from 'axios';

import x from '../../assets/x.svg'
import arrowLeft from '../../assets/arrow-left.svg'

import PackageDetails from '../package_details/PackageDetails';
// import FunctionCard from '../cards/FunctionCard';
import CodeEditor from '../codeEditor/CodeEditor';

class Stage extends Component {
    constructor(props) {
        super(props);

        this.funct = {

        }

        this.modes = {
            create: "CREATE",
            demo: "DEMO",
        }

        this.views = {
            dash: "DASH",
            package: "PACKAGE",
            codeEditor: "CODE",
        }

        this.state = {
            app: {
                mode: this.modes.demo,
                view: this.views.dash,
                selected: {
                    type: "",
                    id: "",
                },
            },
            package: {
                name: '',
                author: '',
                tag: '',
                in_prod: false,
            },
            selected_package_id: '',
            package_list: []
        }

        this.updateStageSelected = this.updateStageSelected.bind(this)
        this.stageManager = this.stageManager.bind(this)
        this.handleGlobalState = this.handleGlobalState.bind(this)
    }

    handleGlobalState(app_state) {
        console.log("State Update!", app_state)
        this.setState({...this.state,
            app: app_state,
        });
        this.funct = app_state.function;
    }

    // Handles global stage view
    stageManager(view, funct) {
        this.setState({
            ...this.state,
            app: {
                ...this.state.app,
                view: view,
                function: funct,
            }
        });
    }

    updateStageSelected(field, value) {
        this.setState({
            app: {
                ...this.state.app,
                selected : {
                    [field]: value,
                    ...this.state.app.selected,
                }
            }
        })
    }

    onChangeField(e, field) {
        this.setState({
            package: {
                ...this.state.package,
                [field]: e.target.value,
            }
        });
    }

    onSubmit(e) {
        e.preventDefault();
     
        const newPackage = this.state.package;
        newPackage._id = newPackage.name;

        axios.post('http://localhost:4000/packages/add', newPackage)
            .then(res => {console.log(res.data); this.getPackages()})

        this.setState({
            package: {
                name: '',
                author: '',
                tag: '',
                in_prod: false
            },
        })
    }

    deletePackage(e, id) {
        e.preventDefault();

        const payload = {
            _id: id,
        }

        axios.delete('http://localhost:4000/packages/delete/'+id, payload)
            .then(res => {console.log(res.data); this.getPackages()})
    }

    getPackages() {
        axios.get('http://localhost:4000/packages/')
        .then(response => {
            this.setState({ package_list: response.data });
        })
        .catch(function (error){
            console.log(error);
        })
    }

    componentDidMount() {
        this.getPackages()
    }

    isoToRegular(time) {
        time = time.replace(/T/, ' ')
        time = time.replace(/\..+/, '')
        return time
    }

    profilePage() {
        console.log(this.state)
        return (
            <React.Fragment>
                <div className="toolbar">
                    <div onClick={(e) => {this.setState({
                        app: {
                            ...this.state.app,
                            selected: {
                                ...this.state.app.selected,
                                id: ""
                            },
                            view: this.views.dash,
                        },
                    })}}><img src={arrowLeft} alt="Back"/></div>
                </div>
                <PackageDetails stateHandler={this.handleGlobalState} state={this.state.app} stageManager={this.stageManager}/>
            </React.Fragment>
        )
    }

    landingPage() {
        return (
            <React.Fragment>
                <div className="stage_banner">
                    <div className="banner">
                        <h1>PPM</h1>
                        <h2>Get the most out of your packages.</h2>
                    </div>
                </div>
                <div className="stage_main">
                    <div className="current_projects new_package">
                        <h1>Quick Add Package</h1>
                        <form action="." onSubmit={(e) => {this.onSubmit(e)}} className="new_package_form" autoComplete="off">
                            <input required type="text" value={this.state.package.name} placeholder="Name" onChange={(e)=>{this.onChangeField(e, 'name')}}/>
                            <input required type="text" value={this.state.package.author} placeholder="Author" onChange={(e)=>{this.onChangeField(e, 'author')}}/>
                            <input required type="text" value={this.state.package.tag} placeholder="Tag" onChange={(e) => {this.onChangeField(e, 'tag')}}/>
                            <input type="submit" name="submit" value="Add Package" className="btn btn-4"/>
                        </form>
                    </div>
                </div>
                <div className="stage_main">
                    <h1>Latest Packages</h1>
                    <div className="latest_packages">
                        <div className="package_table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Author</th>
                                        <th>Tag</th>
                                        <th>Created</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        {this.state.package_list.map((pkg, i) => {
                                            let ts = pkg.timestamp;
                                            return (
                                                <tr key={`body_r${i}`}>
                                                    <td key={`${ts}_name`}>
                                                        <p className="package_link"
                                                            onClick={(e) => {
                                                                this.setState({
                                                                    app: {
                                                                        ...this.state.app,
                                                                        selected: {
                                                                            id: pkg._id,
                                                                            type: "package",
                                                                        },
                                                                        view: this.views.package,
                                                                    },
                                                                })
                                                        }}>
                                                            {pkg.name}
                                                        </p>
                                                    </td>
                                                    <td key={`${ts}_author`}>{pkg.author}</td>
                                                    <td key={`${ts}_tag`}><span className="tag">{pkg.tag}</span></td>
                                                    <td key={`${ts}_ts`}>{this.isoToRegular(pkg.timestamp)}</td>
                                                    <td key={`${ts}_actions`}>
                                                        <img className="delete" 
                                                            src={x} onClick={(e) => {this.deletePackage(e, pkg._id)}} 
                                                            alt="Delete"/>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    sandbox() {
        return (
            <React.Fragment>

            </React.Fragment>
        )
    }

    codeEditor() {
        console.log("Code Editor")
        return (
            <React.Fragment>
                <div className="toolbar">
                    <div onClick={(e) => {this.setState({
                        app: {
                            ...this.state.app,
                            selected: {
                                ...this.state.app.selected,
                                id: ""
                            },
                            view: this.views.dash,
                        },
                    })}}><img src={arrowLeft} alt="Back"/></div>
                </div>
                <CodeEditor state={this.state.app}/>
            </React.Fragment>
        )
    }

    stageSpotlight() {
        console.log(this.state.app.view)
        if (this.state.app.mode === this.modes.create) {
            return this.sandbox()
        } else {
            if (this.state.app.view === this.views.dash) {
                return this.landingPage();
            } else if (this.state.app.view === this.views.package) {
                return this.profilePage();
            } else if (this.state.app.view === this.views.codeEditor) {
                return this.codeEditor();
            }
        }
    }

    render() {
        return (
            <div className="stage_wrapper">
                {this.stageSpotlight()}
            </div>
        )
    }

};

export default Stage;