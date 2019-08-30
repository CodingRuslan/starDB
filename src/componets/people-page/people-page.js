import React, { Component } from 'react';
import ItemList from "../item-list";
import ItemDetails from "../item-details";
import './people-page.css'
import SwapiService from "../../services/swapi-servise";
import Row from "../row";

export default class PeoplePage extends Component{

	swapiService = new SwapiService();

	state = {
		selectedPerson: 1
	};

	onPersonSelected = (selectedPerson) => {
		this.setState({
			selectedPerson
		})
	};

	render() {
		const itemList = (
			<ItemList
				onItemSelected={this.onPersonSelected}
				getData={this.swapiService.getAllPeople}
			>
				{(e) => (
					`${e.name} (${e.birthYear})`
				)}
			</ItemList>
		);

		const personDetails = (
			<ItemDetails
				itemId={this.state.selectedPerson}
				getData={this.swapiService.getPerson}
				getImageUrl={}
			/>
		);

		return (
			<Row left={itemList} right={personDetails}/>
		)
	}

}