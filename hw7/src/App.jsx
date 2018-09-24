
var contentNode = document.getElementById('contents');

const initialEntries = [
	{
		id:1, fastingBGL:60, postBreakfastBGL:120, postLunchBGL:115, postDinnerBGL:133, 
		breakfast:"oatmeal", lunch:"sandwich", dinner:"pizza", exercise:"jogging", 
		createdDate: new Date('2018,07,31'), exerciseAmount:30, status:'Poor'
	}, 
	{
		id:2, fastingBGL:80, postBreakfastBGL:135, postLunchBGL:137, postDinnerBGL:140, 
		breakfast:"cereal", lunch:"hotdog", dinner:"pasta", exercise:"hike",
		createdDate: new Date('2018,08,04'), exerciseAmount:45, status:'Good'
	}
];

const EntryRow  = (props) =>(
	<tr>
		<td>{props.id}</td>
		<td>{props.createdDate ? entry.createdDate.toDateString():''}</td>
		<td>{props.fastingBGL}</td>
		<td>{props.breakfast}</td>
		<td>{props.postBreakfastBGL}</td>
		<td>{props.lunch}</td>
		<td>{props.postLunchBGL}</td>
		<td>{props.dinner}</td>
		<td>{props.postDinnerBGL}</td>
		<td>{props.exercise}</td>
		<td>{props.exerciseAmount}</td>
		<td>FUCK</td>
	</tr>
); 

function EntryTable(props){
	const entryRows = props.entries.map(entry => <EntryRow key={entry.id} entry={entry}/>);
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
			exerciseAmount: form.exercise_amount.value,
			status: 'Unknown', 
			created: new Date()
		});
		
		// clear the form for the next input
		form.exercise.value = ""; form.exercise_amount.value = "";
	}

	render () {
		return (
			<div>
				<form name='entryAdd' onSubmit={this.handleSubmit}>
					<input type='text' name='exercise' placeholder='Exercise'/>
					<input type='text' name='exercise_amount' placeholder='Excercise Amount'/>
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
		setTimeout(() => {
			this.setState({entries: initialEntries});
		}, 500);
	}

	createEntry(newEntry){
		const newEntries = this.state.entries.slice();
		newEntry.id = this.state.entries.length + 1;
		newEntries.push(newEntry);
		this.setState({entries: newEntries});
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