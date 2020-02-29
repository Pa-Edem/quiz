import React, { Component } from 'react';
import './QuizCreator.scss';

import axios from '../../axios/axiosQuiz';

import {
	createControl,
	validate,
	validateForm,
} from '../../form/formFramework';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';

function createOptionControl(number) {
	return createControl(
		{
			label: `Version ${number}`,
			errorMessage: 'Value cannot be empty',
			id: number,
		},
		{
			required: true,
		}
	);
}

function createFormControl() {
	return {
		question: createControl(
			{
				label: 'Enter a question',
				errorMessage: 'The question cannot be empty',
			},
			{
				required: true,
			}
		),
		option1: createOptionControl(1),
		option2: createOptionControl(2),
		option3: createOptionControl(3),
		option4: createOptionControl(4),
	};
}
export default class QuizCreator extends Component {
	state = {
		quiz: [],
		isFormValid: false,
		rightAnswerId: 1,
		formControls: createFormControl(),
	};

	submitHandler = event => {
		event.preventDefault();
	};

	addQuestionHandler = event => {
		event.preventDefault();

		const quiz = this.state.quiz.concat();
		const index = quiz.length + 1;

		const {
			question,
			option1,
			option2,
			option3,
			option4,
		} = this.state.formControls;

		const questionItem = {
			question: question.value,
			id: index,
			rightAnswerId: this.state.rightAnswerId,
			answers: [
				{ text: option1.value, id: option1.id },
				{ text: option2.value, id: option2.id },
				{ text: option3.value, id: option3.id },
				{ text: option4.value, id: option4.id },
			],
		};

		quiz.push(questionItem);
		this.setState({
			quiz,
			isFormValid: false,
			rightAnswerId: 1,
			formControls: createFormControl(),
		});
	};

	createQuizHandler = async event => {
		event.preventDefault();

		try {
			await axios.post('/quizes.json', this.state.quiz);
			this.setState({
				quiz: [],
				isFormValid: false,
				rightAnswerId: 1,
				formControls: createFormControl(),
			});
		} catch (error) {
			console.error(error);
		}
	};

	changeHandler = (value, name) => {
		const formControls = { ...this.state.formControls };
		const control = { ...formControls[name] };

		control.value = value;
		control.touched = true;
		control.valid = validate(control.value, control.validation);

		formControls[name] = control;

		this.setState({
			formControls,
			isFormValid: validateForm(formControls),
		});
	};

	renderControls() {
		return Object.keys(this.state.formControls).map((name, index) => {
			const control = this.state.formControls[name];

			return (
				<React.Fragment key={name + index}>
					<Input
						value={control.value}
						valid={control.valid}
						touched={control.touched}
						label={control.label}
						errorMessage={control.errorMessage}
						shouldValidate={!!control.validation}
						onChange={e => this.changeHandler(e.target.value, name)}
					/>
					{index === 0 ? <hr /> : null}
				</React.Fragment>
			);
		});
	}

	selectChangeHandler = event => {
		this.setState({
			rightAnswerId: +event.target.value,
		});
	};

	render() {
		const select = (
			<Select
				label="Choose the correct answer"
				value={this.state.rightAnswerId}
				onChange={this.selectChangeHandler}
				options={[
					{ text: 'Version 1', value: 1 },
					{ text: 'Version 2', value: 2 },
					{ text: 'Version 3', value: 3 },
					{ text: 'Version 4', value: 4 },
				]}
			/>
		);

		return (
			<div className="QuizCreator">
				<div>
					<h1>Test creation</h1>

					<form onSubmit={this.submitHandler}>
						{this.renderControls()}

						{select}

						<Button
							type="primary"
							onClick={this.addQuestionHandler}
							disabled={!this.state.isFormValid}>
							Add Question
						</Button>
						<Button
							type="success"
							onClick={this.createQuizHandler}
							disabled={this.state.quiz.length === 0}>
							Create test
						</Button>
					</form>
				</div>
			</div>
		);
	}
}
