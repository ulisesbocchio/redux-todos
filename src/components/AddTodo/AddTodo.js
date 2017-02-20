import React from 'react';
import TodosActions from '../../actions/TodosActions';

const AddTodo = () => {
  let input;

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault();
        if (!input.value.trim()) {
          return
        }
          TodosActions.addTodo(input.value);
        input.value = ''
      }}>
        <input ref={node => {
          input = node
        }} />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
};

export default AddTodo
