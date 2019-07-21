import React, { Component } from 'react';
import Prism from 'prismjs';

import "prismjs/components/prism-python.js";
import "prismjs/components/prism-jsx.js";
import "prismjs/components/prism-js-extras";

import axios from 'axios';
import '../../styles/code_editor/CodeEditor.scss'
import '../../styles/base/prism.css'
import copy from '../../assets/feather/copy.svg'

class CodeEditor extends Component {
    constructor(props) {
        super(props);

        this.code_editor = {
            mode: {
                edit: false,
                read: true,
            }
        }

        this.state = {
            app: {
                ...props.state,
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
                description: '',
                is_favorite: false,
            },
            reload: false,
            function_list: [],
        }
    }

    componentDidMount() {
        this.setState({function: this.props.state.function});
        Prism.highlightAll();
    }

    onChangeField(e, field, type) {
        this.setState({
            [type]: {
                ...this.state[type],
                [field]: e.target.value,
            }
        });
    }

    updateCode(e, funct) {
        e.preventDefault();
        console.log("Sending Function", funct)
        axios.post('http://localhost:4000/functions/edit/' + funct._id, funct)
        .then(response => {
            this.code_editor = {
                ...this.code_editor,
                mode: {
                    ...this.code_editor.mode,
                    edit: false,
                    read: true,
                }
            };
            this.setState({reload: true})
        })
        .catch(function (error){
            console.log(error);
        })
    }

    copyFunction(e) {
        const copyText = document.getElementsByClassName("codeEnv")[0].textContent;
        const textArea = document.createElement('textarea');
        textArea.textContent = copyText;
        document.body.append(textArea);
        textArea.select();
        document.execCommand("copy");
        textArea.outerHTML = "";
    }

    modeRenderer() {
        if (this.state.function.code==="") {
            console.log("Hitting")
            this.code_editor = {
                mode: {
                    edit: true,
                    read: false,
                }
            }
        }

        if (this.code_editor.mode.edit) {
            return (
                <React.Fragment>
                    <form action="." onSubmit={(e) => {this.updateCode(e, this.state.function)}} className="new_package_form" autoComplete="off">
                        <input type="submit" name="submit" value="Save" className="btn btn-4 btn-small"/>
                        <textarea className="language-javascript code_area" 
                                value={this.state.function.code} 
                                onChange={(e)=>{this.onChangeField(e, 'code', 'function')}}/>
                    </form>
                </React.Fragment>
            )
        } else if (this.code_editor.mode.read) {
            let lang = this.props.state.function.tag.toLowerCase();

            if (lang !== 'python') {
                lang = 'jsx';
            }

            return (
                <React.Fragment>
                        <div className="copy_dialog">
                            {/* <p className="hidden">Copied!</p> */}
                            <img src={copy}
                                className="copyFunction" 
                                alt="Copy Function" 
                                onClick={(e) => {this.copyFunction(e)}}
                                />
                        </div>
                        <pre className="codeEnv">
                            <code className={`language-${lang}`}>
                                {this.props.state.function.code}
                            </code>
                        </pre>
                </React.Fragment>
            )
        }
    }

    render() {
        console.log(this.state)
        return (
            <div className="code_editor_wrapper">
                <div className="package_titles">
                    <h1 className="name">{this.state.function.name}</h1>
                    <h2 className="tag-large">{this.state.function.tag}</h2>
                </div>
                <div className="package_content">
                    <div className="code_editor">
                        {this.modeRenderer()}
                    </div>
                </div>
            </div>
        )
    }

};

export default CodeEditor;