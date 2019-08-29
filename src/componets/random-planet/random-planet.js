import React, { Component } from 'react';

import './random-planet.css';

import SwapiService from "../../services/swapi-servise";
import Spinner from "../spiner";
import ErrorIndicator from "../error-indicator";

export default class RandomPlanet extends Component {

	swapiService = new SwapiService();

	state = {
		planet: {},
		loading: true
	};

	componentDidMount() {
		this.updatePlanet();
		this.interval = setInterval(this.updatePlanet, 3000)
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	onPlanetLoaded = (planet) => {
		this.setState({
			planet,
			loading: false,
			err: false
			});
	};

	onError = (err) => {
		this.setState({
			err: true,
			loading:false
		})
	};

	updatePlanet = () => {
		const id = Math.floor(Math.random()*17 ) + 2;
		this.swapiService.getPlanet(id)
			.then(this.onPlanetLoaded)
			.catch(this.onError);
	};

	render() {
		const {planet, loading, err } = this.state;

		const hasData = !(loading || err);

		const errMessage = err ? <ErrorIndicator/> : null;
		const spinner = loading ? <Spinner/> : null;
		const content = hasData ? <PlanetView planet={planet}/> : null;

		return (
			<div className="random-planet jumbotron rounded">
				{errMessage}
				{spinner}
				{content}
			</div>

		);
	}
}

const PlanetView = ({planet}) => {
	const { id, name, population, rotationPeriod, diameter} = planet;
	return (
		<React.Fragment>
			<img className="planet-image"
					 alt="image"
					 src= {`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
			<div>
				<h4>{name}</h4>
				<ul className="list-group list-group-flush">
					<li className="list-group-item">
						<span className="term">Population</span>
						<span>{population}</span>
					</li>
					<li className="list-group-item">
						<span className="term">Rotation Period</span>
						<span>{rotationPeriod}</span>
					</li>
					<li className="list-group-item">
						<span className="term">Diameter</span>
						<span>{diameter}</span>
					</li>
				</ul>
			</div>
		</React.Fragment>
	)
};