import React, { Component } from 'react';
import './Auth.scss';

import is from 'is_js';
import axios from 'axios';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

export default class Auth extends Component {
	state = {
		isFormValid: false,
		formControls: {
			email: {
				value: '',
				type: 'email',
				label: 'Email',
				errorMessage: 'Please enter a valid email',
				valid: false,
				touched: false,
				validation: {
					required: true,
					email: true,
				},
			},
			password: {
				value: '',
				type: 'password',
				label: 'Password',
				errorMessage: 'Please enter a valid password',
				valid: false,
				touched: false,
				validation: {
					required: true,
					minLength: 6,
				},
			},
		},
	};

	loginHandler = async () => {
		const authData = {
			email: this.state.formControls.email.value,
			password: this.state.formControls.password.value,
			returnSecureToken: true,
		};
		try {
			const response = await axios.post(
				'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDHp6rwp7P9appPWAiexfusJh6L470aKFQ',
				authData
			);
			console.log('login', response.data);
		} catch (error) {
			console.error(error);
		}
	};

	registerHandler = async () => {
		const authData = {
			email: this.state.formControls.email.value,
			password: this.state.formControls.password.value,
			returnSecureToken: true,
		};
		try {
			const response = await axios.post(
				'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDHp6rwp7P9appPWAiexfusJh6L470aKFQ',
				authData
			);
			console.log('logup', response.data);
		} catch (error) {
			console.error(error);
		}
	};

	submitHandler = event => {
		event.preventDefault();
	};

	validateControl(value, validation) {
		if (!validation) {
			return true;
		}

		let isValid = true;
		if (validation.required) {
			isValid = value.trim() !== '' && isValid;
		}
		if (validation.email) {
			isValid = is.email(value) && isValid;
		}
		if (validation.minLength) {
			isValid = value.length >= validation.minLength && isValid;
		}
		return isValid;
	}

	onChangeHandler = (event, controlName) => {
		const formControls = { ...this.state.formControls };
		const control = { ...formControls[controlName] };

		control.value = event.target.value;
		control.touched = true;
		control.valid = this.validateControl(control.value, control.validation);

		formControls[controlName] = control;

		let isFormValid = true;
		Object.keys(formControls).forEach(name => {
			isFormValid = formControls[name].valid && isFormValid;
		});

		this.setState({
			formControls,
			isFormValid,
		});
	};

	renderInputs() {
		return Object.keys(this.state.formControls).map((controlName, index) => {
			const control = this.state.formControls[controlName];
			return (
				<Input
					key={controlName + index}
					type={control.type}
					value={control.value}
					valid={control.valid}
					touched={control.touched}
					label={control.label}
					errorMessage={control.errorMessage}
					shouldValidate={!!control.validation}
					onChange={event => this.onChangeHandler(event, controlName)}
				/>
			);
		});
	}

	render() {
		return (
			<div className="Auth">
				<div>
					<h1>Authorization</h1>

					<form onSubmit={this.submitHandler}>
						{this.renderInputs()}

						<Button
							type="success"
							onClick={this.loginHandler}
							disabled={!this.state.isFormValid}>
							Log in
						</Button>

						<Button
							type="primary"
							onClick={this.registerHandler}
							disabled={!this.state.isFormValid}>
							Sign up
						</Button>
					</form>
				</div>
			</div>
		);
	}
}
