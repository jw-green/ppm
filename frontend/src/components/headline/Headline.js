import React, { Component } from 'react';
import '../../styles/headline/Headline.scss'

class Headline extends Component {

    render() {
        return (
            <div className="headline_wrapper">
                <div className="headline_left">
                    <div className="headline_icon">
                        <img className="headline_icon-img" src={this.props.img} alt="Logo"/>
                    </div>
                    <h1 className="headline_titles-main">
                        {this.props.title}
                    </h1>
                </div>
                <div className="headline_right">
                </div>
            </div>
        )
    }

};

export default Headline;