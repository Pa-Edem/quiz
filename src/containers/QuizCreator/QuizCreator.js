import React, { Component } from 'react';
import classes from './QuizCreator.css';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

export default class QuizCreator extends Component {
	submitHandler = event => {
		event.preventDefault();
	};

	addQuestionHandler = () => {
		console.log('ADD_QUESTION');
	};

	createQuizHandler = () => {
		console.log('CREATE_TEST');
	};

	render() {
		return (
			<div className={classes.QuizCreator}>
				<div>
					<h1>Создание теста</h1>

					<form
						className={classes.QuizCreatorForm}
						onSubmit={this.submitHandler}>
						<Input />
						<hr />
						<Input />
						<Input />
						<Input />
						<Input />
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
