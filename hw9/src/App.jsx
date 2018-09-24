
var contentNode = document.getElementById('contents');

const EntryRow  = (props) =>(
	<tr>
		<td>{props.entry._id}</td>
		<td>{props.entry.createdDate ? props.entry.createdDate.toDateString():''}</td>
		<td>{props.entry.fastingBGL}</td>
		<td>{props.entry.breakfast}</td>
		<td>{props.entry.postBreakfastBGL}</td>
		<td>{props.entry.lunch}</td>
		<td>{props.entry.postLunchBGL}</td>
		<td>{props.entry.dinner}</td>
		<td>{props.entry.postDinnerBGL}</td>
		<td>{props.entry.exercise}</td>
		<td>{props.entry.exerciseAmount}</td>
		<td>{props.entry.status}</td>
	</tr>
); 

function EntryTable(props) {
	const entryRows = props.entries.map(entry => <EntryRow key={entry._id} entry={entry}/>);
	
	return ( 
		<table className="bordered-table">
			<thead>
				<tr>
					<th>Id</th>
					<th>Created Date</th>
					<th>Fasting BGL</th>
					<th>Breakfast</th>
					<th>Post Breakfast BGL</th>
					<th>Lunch</th>
					<th>Post Lunch BGL</th>
					<th>Dinner</th>
					<th>Post Dinner BGL</th>
					<th>Exercise</th>
					<th>Exercise Amount</th>
					<th>Status</th>
				</tr>
			</thead>
			<tbody>
				{entryRows}
			</tbody>
		</table>
	);
}

class EntryAdd extends React.Component {
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

class EntryList extends React.Component {
	constructor(){
		super();
		this.state = {entries: []};
		this.createEntry = this.createEntry.bind(this);
	}

	componentDidMount(){
		this.loadData();
	}
	

	loadData(){
		fetch('/api/entries').then(response => {
			if(response.ok){
				response.json().then(data => {
					console.log("Total count of records: ", data._metadata.total_count);
					data.records.forEach(entry => {
						entry.createdDate = new Date(entry.createdDate);
						if(entry.completionDate){
							entry.completionDate = new Date(entry.completionDate);
						}
					});
					this.setState({entries: data.records});
				});
			} else {
				response.json().then(error => {
					alert("Failed to fetch entries:" + error.message)
				});
			}
		}).catch(err => {
			alert("Error in fetching data from server:", err);
		});
	}

	createEntry(newEntry){
		fetch('/api/entries', {
			method: 'POST', 
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newEntry)
		}).then(response => {
			if(response.ok){
				response.json()
				.then(updatedEntry => {
					updatedEntry.createdDate = new Date(updatedEntry.createdDate);
					if(updatedEntry.completionDate)
						updatedEntry.completionDate = new Date(updatedEntry.completionDate);
					const newEntries = this.state.entries.concat(updatedEntry);
					this.setState({entries: newEntries});
				})
			}
			else{
				response.json().then(error =>{
					alert("Failed to add entry: " + error.message);
				});
			}
		}).catch(err => {
			alert("Error sending data to server" + err.message);
		});
	}
	
	render() {
		return (
			<div>
				<h1>Diabetes Self-Management App</h1>
				<hr/>
				<EntryTable entries={this.state.entries}/>
				<hr/>
				<EntryAdd createEntry={this.createEntry}/>
			</div>
		);
	}
}
ReactDOM.render(<EntryList/>, contentNode); //render the component inside the contentNode