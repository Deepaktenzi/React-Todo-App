import React, { useState, useEffect } from 'react';
import todoPic from '../images/workdesk.svg';
import '../App.css';
import ShowQuotes from './ShowQuotes';

// Store Data In Local Storage

const localDataStorage = () => {
  let list = localStorage.getItem('items');

  if (list) return JSON.parse(list);
  else return [];
};

const TodoList = () => {
  const [data, setData] = useState('');

  const [items, setItems] = useState(localDataStorage());

  const [toggleSubmit, setToggleSubmit] = useState(true);

  const [IsEditId, setIsEditId] = useState(null);

  useEffect(() => {
    //Store Data in localStrorage//
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  // Add TodoList Item //
  const addItems = () => {
    if (data) {
      if (toggleSubmit) {
        const inputData = {
          id: new Date().getTime().toString(),
          name: data,
        };
        setItems([...items, inputData]);
        setData('');
      } else {
        setItems(
          items.map((val) => {
            if (val.id === IsEditId) {
              return { ...val, name: data };
            }
            return val;
          })
        );
        setToggleSubmit(true);
        setData('');
        setIsEditId(null);
      }
    }
  };

  // Edit Items//

  const editItem = (idx) => {
    let editedItems = items.find((val) => {
      return val.id === idx;
    });

    setToggleSubmit(false);
    console.log(editedItems.name);
    setData(editedItems.name);
    setIsEditId(idx);
  };

  // Delete TodoList Item //
  const itemDelete = (idx) => {
    const updatedData = items.filter((val) => {
      return val.id !== idx;
    });
    setItems(updatedData);
  };

  // Delete ALL TodoList Item //
  const deleteAllItems = () => {
    setItems([]);
  };

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src={todoPic} alt="Todo_Logo" width="80px" />
            <figcaption>Add ToDo Work 📋</figcaption>
          </figure>

          <div className="addItems">
            <input
              className="form-control"
              type="text"
              onChange={(e) => setData(e.target.value)}
              value={data}
              placeholder="✍️ Add Items..."
            />
            {toggleSubmit ? (
              <i
                className="fa-solid fa-plus add-btn"
                onClick={addItems}
                title="Add Items"
              ></i>
            ) : (
              <i
                className="fas fa-edit add-btn"
                title="Update Item"
                onClick={addItems}
              ></i>
            )}
          </div>

          <div className="showItems">
            {items.map((val) => {
              return (
                <div className="eachItem" key={val.id}>
                  <h3> {val.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => itemDelete(val.id)}
                      title="Delete Item"
                    ></i>
                    <i
                      className="fas fa-edit add-btn"
                      title="Update Item"
                      onClick={() => editItem(val.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              target="_blank"
              onClick={deleteAllItems}
            >
              <span>Check List</span>
            </button>
          </div>
        </div>

        <div className="quotes-div">{<ShowQuotes />}</div>
      </div>
    </>
  );
};
export default TodoList;
