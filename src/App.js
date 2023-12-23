import { useState, useEffect } from 'react';
import './App.css';

const ItemsList = ({ items, setItems }) => {
  const [filterType, setFilterType] = useState('all')
  const [filteredItems, setFilteredItems] = useState(items)

  const onChangeCheckBox = (event, index) => {
    const newItems = [...items];
    const item = { ...items[index], completed: event.currentTarget.checked }
    newItems[index] = item;
    setItems(newItems)
  }

  const onDestroyItem = (id) => {
    const newItems = items.filter(item => item.id !== id)
    setItems(newItems)
  }

  const handleClickClearCompleted = () => {
    const newItems = items.filter(item => item.completed !== true)
    setItems(newItems)
  }

  const handleClickFilter = (filter) => {
    setFilterType(filter)
  }

  useEffect(() => {
    switch (filterType) {
      case 'all':
        setFilteredItems(items)
        break;
      case 'active':
        setFilteredItems(items.filter(item => item.completed === false))
        break;
      case 'completed':
        setFilteredItems(items.filter(item => item.completed === true))
        break;
      default:
        break;
    }
  }, [filterType, items])


  return (
    <>
      <section className="main">
        <input className="toggle-all" type="checkbox" />
        <label htmlFor="toggle-all">
          Mark all as complete
        </label>

        <ul className="todo-list">
          {filteredItems.map((item, index) => {
            return (
              <li key={item.id} className={`${item.completed ? 'completed' : ''}`}>
                <div className="view">
                  <input className="toggle" type="checkbox" defaultChecked={item.completed} onChange={(event) => onChangeCheckBox(event, index)} />
                  <label>{item.value}</label>
                  <button className="destroy" onClick={() => onDestroyItem(item.id)} ></button>
                </div>
              </li>
            )
          })}
        </ul>
      </section>
      <footer className="footer">
        <span className="todo-count">
          <strong>{items.filter(item => item.completed === false).length}</strong>
          items left
        </span>

        <ul className="filters">
          <li>
            <a href="#" className={filterType == 'all' ? 'selected' : ''} onClick={() => handleClickFilter('all')}>All</a>
          </li>
          <li>
            <a href="#" className={filterType == 'active' ? 'selected' : ''} onClick={() => handleClickFilter('active')} >Active</a>
          </li>
          <li>
            <a href="#" className={filterType == 'completed' ? 'selected' : ''} onClick={() => handleClickFilter('completed')} >Completed</a>
          </li>
        </ul>

        <button onClick={handleClickClearCompleted} className="clear-completed">
          Clear completed
        </button>
      </footer>
    </>

  )
}

const initalFormValue = { id: 0, value: '', completed: false, }

const Header = ({ setItems, items }) => {
  const [formValue, setFormValue] = useState(initalFormValue)

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (formValue.value) {
      setItems(prev => ([...prev, formValue]))
      setFormValue(initalFormValue)
    }
  }

  const onChangeInput = (event) => {
    setFormValue(prev => ({ ...prev, value: event.target.value, id: items.length > 0 ? (Math.max(...items.map(item => item.id)) + 1) : 0 }))
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={handleFormSubmit} >
        <input className="new-todo" placeholder="What needs to be done?" autoFocus name='newTodo' value={formValue.value} onChange={onChangeInput} />
      </form>
    </header>
  )
}

const Footer = () => {
  return (
    <>
      <footer className="info">
        <p>Click to edit a todo</p>
        <p>Created by <a href="https://d12n.me/">Dmitry Sharabin</a></p>
        <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
      </footer>
    </>
  )
}


function App() {
  const [items, setItems] = useState([])

  return (
    <>
      <section className="todoapp">
        <Header setItems={setItems} items={items} />
        <ItemsList items={items} setItems={setItems} />
      </section>
      <Footer />
    </>
  );
}

export default App;
