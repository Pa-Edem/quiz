import React, { Component } from 'react';
import './Drawer.scss';
import { NavLink } from 'react-router-dom';
import Backdrop from '../../UI/Backdrop/Backdrop';

const links = [
	{ to: '/', label: 'Test list', exact: true },
	{ to: '/auth', label: 'Authorization', exact: false },
	{ to: '/quiz-creator', label: 'Create test', exact: false },
];

class Drawer extends Component {
	clickHandler = () => {
		this.props.onClose();
	};

	renderLinks() {
		return links.map((link, index) => {
			return (
				<li key={index}>
					<NavLink
						to={link.to}
						exact={link.exact}
						activeClassName="active"
						onClick={this.clickHandler}>
						{link.label}
					</NavLink>
				</li>
			);
		});
	}

	render() {
		const cls = ['Drawer'];

		if (!this.props.isOpen) {
			cls.push('close');
		}

		return (
			<React.Fragment>
				<nav className={cls.join(' ')}>
					<ul>{this.renderLinks()}</ul>
				</nav>
				{this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
			</React.Fragment>
		);
	}
}

export default Drawer;
