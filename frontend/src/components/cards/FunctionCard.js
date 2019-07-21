import React, { Component } from 'react';
import '../../styles/cards/FunctionCard.scss'
import heart from '../../assets/heart.svg'
import trash from '../../assets/trash-2.svg'

class FunctionCard extends Component {

    favorited() {
        let classes = "favorite"
        if(this.props.is_favorited) {
            classes = "favorite red"
        }
        return <img className={classes} src={heart} alt="Favorite" onClick={(e)=>{this.props.handler()}}/>
    }

    render() {
        return (
            <div className="function_card_wrapper">
                <div className="headline">
                    <h1 className="name" onClick={(e) => {this.props.stageManager("CODE", this.props.function)}}>{this.props.name}</h1>
                    {this.favorited()}
                </div>
                <div className="content">
                    <div className="description">
                        {this.props.description}
                    </div>
                    <img className="delete" src={trash} alt="Delete" onClick={this.props.delete}/>
                </div>
            </div>
        )
    }

};

export default FunctionCard;