import React from 'react';
export default class EntryAdd extends React.Component {
	constructor() {
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		var form = document.forms.entryAdd;
		this.props.createEntry({
			exercise: form.exercise.value, 
			exerciseAmount: form.exerciseAmount.value,
			status: 'Unknown', 
			created: new Date()
		});
		
		// clear the form for the next input
		form.exercise.value = ""; form.exerciseAmount.value = "";
	}

	render () {
		return (
			<div>
				<form name='entryAdd' onSubmit={this.handleSubmit}>
					<input type='text' name='exercise' placeholder='Exercise'/>
					<input type='text' name='exerciseAmount' placeholder='Excercise Amount'/>
					<button>Add</button>
				</form>
			</div>
		)
	}
}