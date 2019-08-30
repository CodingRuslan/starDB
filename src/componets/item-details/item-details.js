import React, { Component } from 'react';

import './item-details.css';
import Spinner from "../spiner";

export default class ItemDetails extends Component {

	state = {
		item: null,
		image: null
	};

	componentDidMount() {
		this.updateItem();
	}


	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.itemId !== prevProps.itemId) {
			this.updateItem();
		}
	}

	updateItem() {
		const {itemId, getData, getImageUrl} = this.props;
		if (!itemId) return;

		getData(itemId)
			.then((item) => {
				this.setState({
					item,
					image: getImageUrl(item)
				})
			})
	};

	render() {

		if (!this.state.item) {
			return <Spinner/>
		}

		const {id, name, gender, birthYear, eyeColor} = this.state.item;

		return (
			<div className="item-details card">
				<img className="item-image"
						 alt="image"
						 src={this.state.image} />

				<div className="card-body">
					<h4>{name}</h4>
					<ul className="list-group list-group-flush">
						<li className="list-group-item">
							<span className="term">Gender</span>
							<span>{gender}</span>
						</li>
						<li className="list-group-item">
							<span className="term">Birth Year</span>
							<span>{birthYear}</span>
						</li>
						<li className="list-group-item">
							<span className="term">Eye Color</span>
							<span>{eyeColor}</span>
						</li>
					</ul>
				</div>
			</div>
		)
	}
}