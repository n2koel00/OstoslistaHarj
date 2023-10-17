import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";

const URL = "http://localhost:3001/"

function App() {
const [items, setItems] = useState([])
const [item, setItem] = useState("")

useEffect(() => {
  axios.get(URL)
  .then((response) => {
    setItems(response.data)
  }).catch (error => {
    alert(error.response.data.error)
  })
}, [])

function save() {
  const json = JSON.stringify({description: item})
  axios.post(URL + "new",json,{
    headers: {
      "Content-Type" : "application/json"
    }
  })
  .then((response) => {
  const addedObject = JSON.parse(json)

  addedObject.id = response.data.id

  setItems(items => [...items, addedObject])
  setItem("")
}).catch(error => {
  alert(error.response.data.error)
})
}

function remove(id) {
  axios.delete(`${URL}delete/${id}`)
  .then(()=>{
    const newListWithoutRemoved = items.filter((item) => item.id !==id)
    setItems(newListWithoutRemoved)
  }).catch (error => {
    alert(error.response.data.error)
  })
}

  return (
    <div style={{margin: "25px"}}>
      <h3>Shopping List</h3>
      <form>
        <label>Add to list: </label>
        <input value={item} onChange={e => setItem(e.target.value)}/>
        <button type="button" onClick={save}>Save</button>
      </form>
      <ol>
      {items.map(item => (
        <li key={item.id}>{item.description} <a href="#" onClick={() => remove(item.id)}>Delete</a></li>
      ))}
      </ol>
    </div>

  );
}


export default App;
