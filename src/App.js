import {useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
	const [textInput,setTextInput] = useState("");
	const [todos, setTodos] = useState([]);
	const [firstTime,setFirstTime] = useState(false);
	async function fetchData(){
		const response = await fetch('http://127.0.0.1:5000/todos');
		const data = await response.json();
		return data;
	}
	async function updateFetchData(){
		const data = await fetchData();
		setTodos(data);
	}

	if (!firstTime){
		updateFetchData();
		setFirstTime(true);
	}

	async function handleTextInputChange(event){
		setTextInput(event.target.value);
	}

	async function handleDeleteButtonClick(event,tInput) {
    		event.preventDefault();
    		const response = await fetch("http://127.0.0.1:5000/todos", {
      			method: "DELETE",
      			headers: {
        			"Content-Type": "application/json",
      			},
      			body: JSON.stringify(tInput),
    		});
    		const json = await response.json();
    		return (json);
  	}

	async function handleAddButtonClick(event,tInput) {
    		event.preventDefault();
    		const response = await fetch("http://127.0.0.1:5000/todos", {
      			method: "POST",
      			headers: {
        			"Content-Type": "application/json",
      			},
      			body: JSON.stringify(tInput),
    		});
    		const json = await response.json();
    		return (json);
  	}

	async function updateDeleteData(event,tInput) {
	    	const data = await handleDeleteButtonClick(event,tInput);
		setTodos(data);
    	}

 	async function updatePostData(event) {
		if (textInput === "") {
	    		return;
		} else {
	    		const data = await handleAddButtonClick(event,textInput);
	    		setTodos(data);
	    		setTextInput('');
		}
    	}

	return (
    	<div className="App">
      	<header className="App-header">
		<h1>Todos</h1>
	<input type="text" value={textInput} onChange={handleTextInputChange} 
		placeholder="Add a new task here"/>

	<button onClick={updatePostData}>Add</button>
	  <ul>
	  {todos.map((item)=> 
		  <li key={item.id}>
		  {item.task} 
		  <button onClick={(event) => updateDeleteData(event,item.id)}>Del</button>
		  </li>
	  )}
	  </ul>
              </header>
    	</div>
  	);
}

export default App;
