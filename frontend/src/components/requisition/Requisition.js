import React, { Component } from 'react';
import '../../styles/requisition/Requisition.scss'

class Requisition extends Component {

    render() {
        return (
            <div className="requisition_wrapper">
                <div className="requisition_header">
                    <h1 className="requisition_title">
                        {this.props.title}
                    </h1>
                    <h2 className="requisition_subtitle">
                        {this.props.subtitle}
                    </h2>
                </div>
                <div className="requisition_form">
                </div>
            </div>
        )
    }

};

export default Requisition;