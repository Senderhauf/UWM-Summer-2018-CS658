'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var contentNode = document.getElementById('contents');

var EntryRow = function EntryRow(props) {
	return React.createElement(
		'tr',
		null,
		React.createElement(
			'td',
			null,
			props.id
		),
		React.createElement(
			'td',
			null,
			props.createdDate ? entry.createdDate.toDateString() : ''
		),
		React.createElement(
			'td',
			null,
			props.fastingBGL
		),
		React.createElement(
			'td',
			null,
			props.breakfast
		),
		React.createElement(
			'td',
			null,
			props.postBreakfastBGL
		),
		React.createElement(
			'td',
			null,
			props.lunch
		),
		React.createElement(
			'td',
			null,
			props.postLunchBGL
		),
		React.createElement(
			'td',
			null,
			props.dinner
		),
		React.createElement(
			'td',
			null,
			props.postDinnerBGL
		),
		React.createElement(
			'td',
			null,
			props.exercise
		),
		React.createElement(
			'td',
			null,
			props.exerciseAmount
		),
		React.createElement(
			'td',
			null,
			props.status
		)
	);
};

function EntryTable(props) {
	var entryRows = props.entries.map(function (entry) {
		return React.createElement(EntryRow, { key: entry.id, entry: entry });
	});

	return React.createElement(
		'table',
		{ className: 'bordered-table' },
		React.createElement(
			'thead',
			null,
			React.createElement(
				'tr',
				null,
				React.createElement(
					'th',
					null,
					'Id'
				),
				React.createElement(
					'th',
					null,
					'Created Date'
				),
				React.createElement(
					'th',
					null,
					'Fasting BGL'
				),
				React.createElement(
					'th',
					null,
					'Breakfast'
				),
				React.createElement(
					'th',
					null,
					'Post Breakfast BGL'
				),
				React.createElement(
					'th',
					null,
					'Lunch'
				),
				React.createElement(
					'th',
					null,
					'Post Lunch BGL'
				),
				React.createElement(
					'th',
					null,
					'Dinner'
				),
				React.createElement(
					'th',
					null,
					'Post Dinner BGL'
				),
				React.createElement(
					'th',
					null,
					'Exercise'
				),
				React.createElement(
					'th',
					null,
					'Exercise Amount'
				),
				React.createElement(
					'th',
					null,
					'Status'
				)
			)
		),
		React.createElement(
			'tbody',
			null,
			entryRows
		)
	);
}

var EntryAdd = function (_React$Component) {
	_inherits(EntryAdd, _React$Component);

	function EntryAdd() {
		_classCallCheck(this, EntryAdd);

		var _this = _possibleConstructorReturn(this, (EntryAdd.__proto__ || Object.getPrototypeOf(EntryAdd)).call(this));

		_this.handleSubmit = _this.handleSubmit.bind(_this);
		return _this;
	}

	_createClass(EntryAdd, [{
		key: 'handleSubmit',
		value: function handleSubmit(event) {
			event.preventDefault();
			var form = document.forms.entryAdd;
			this.props.createEntry({
				exercise: form.exercise.value,
				exerciseAmount: form.exerciseAmount.value,
				status: 'Unknown',
				created: new Date()
			});

			// clear the form for the next input
			form.exercise.value = "";form.exerciseAmount.value = "";
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'form',
					{ name: 'entryAdd', onSubmit: this.handleSubmit },
					React.createElement('input', { type: 'text', name: 'exercise', placeholder: 'Exercise' }),
					React.createElement('input', { type: 'text', name: 'exerciseAmount', placeholder: 'Excercise Amount' }),
					React.createElement(
						'button',
						null,
						'Add'
					)
				)
			);
		}
	}]);

	return EntryAdd;
}(React.Component);

var EntryList = function (_React$Component2) {
	_inherits(EntryList, _React$Component2);

	function EntryList() {
		_classCallCheck(this, EntryList);

		var _this2 = _possibleConstructorReturn(this, (EntryList.__proto__ || Object.getPrototypeOf(EntryList)).call(this));

		_this2.state = { entries: [] };
		_this2.createEntry = _this2.createEntry.bind(_this2);
		return _this2;
	}

	_createClass(EntryList, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.loadData();
		}
	}, {
		key: 'loadData',
		value: function loadData() {
			var _this3 = this;

			fetch('/api/entries').then(function (response) {
				return response.json();
			}).then(function (data) {
				console.log("Total count of records: ", data._metadata.total_count);
				data.records.forEach(function (entry) {
					entry.created = new Date(entry.created);
					if (entry.completionDate) {
						entry.completionDate = new Date(entry.completionDate);
					}
				});
				_this3.setState({ entries: data.records });
			}).catch(function (err) {
				console.log(err);
			});
		}
	}, {
		key: 'createEntry',
		value: function createEntry(newEntry) {
			var _this4 = this;

			fetch('/api/entries', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newEntry)
			}).then(function (response) {
				if (response.ok) {
					response.json().then(function (updatedEntry) {
						updatedEntry.created = new Date(updatedEntry.created);
						if (updatedEntry.completionDate) updatedEntry.completionDate = new Date(updatedEntry.completionDate);
						var newEntries = _this4.state.entries.concat(updatedEntry);
						_this4.setState({ entries: newEntries });
					});
				} else {
					response.json().then(function (error) {
						alert("Failed to add entry: " + error.message);
					});
				}
			}).catch(function (err) {
				alert("Error sending data to server" + err.message);
			});
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'h1',
					null,
					'Diabetes Self-Management App'
				),
				React.createElement('hr', null),
				React.createElement(EntryTable, { entries: this.state.entries }),
				React.createElement('hr', null),
				React.createElement(EntryAdd, { createEntry: this.createEntry })
			);
		}
	}]);

	return EntryList;
}(React.Component);

ReactDOM.render(React.createElement(EntryList, null), contentNode); //render the component inside the contentNode