import React, { Component } from 'react';
import classes from './QuizCreator.css';

import { createControl } from '../../form/formFramework';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';

function createOptionControl(number) {
	return createControl(
		{
			label: `Вариант ${number}`,
			errorMessage: 'Значение не может быть пустым',
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
				label: 'Введите вопрос',
				errorMessage: 'Вопрос не может быть пустым',
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
		formControls: createFormControl(),
	};

	submitHandler = event => {
		event.preventDefault();
	};

	addQuestionHandler = () => {
		console.log('ADD_QUESTION');
	};

	createQuizHandler = () => {
		console.log('CREATE_TEST');
	};

	changeHandler = (value, name) => {};

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

	render() {
		return (
			<div className={classes.QuizCreator}>
				<div>
					<h1>Создание теста</h1>

					<form
						className={classes.QuizCreatorForm}
						onSubmit={this.submitHandler}>
						{this.renderControls()}
						{/* TODO доделать вывод селекта */}
						<select></select>

						<Button type="primary" onClick={this.addQuestionHandler}>
							Добавить вопрос
						</Button>
						<Button type="success" onClick={this.createQuizHandler}>
							Создать тест
						</Button>
					</form>
				</div>
			</div>
		);
	}
}
