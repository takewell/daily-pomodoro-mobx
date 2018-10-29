import React from 'react';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';

export const TodoAppView = observer(({ todo }) => {
  return (
    <div>
      <h1>Todos</h1>
      <div>{todo.filter}</div>
      <h2>Create</h2>
      <input
        className="create"
        type="text"
        onKeyPress={e => todo.createNew(e)}
      />
      <br />
      <h2>Filter</h2>
      <input
        className="filter"
        type="text"
        value={todo.filter}
        onChange={e => todo.filtering(e)}
      />
      <ul>
        {todo.filterdeTodos.map(todo => {
          return (
            <li key={todo.id}>
              <input
                type="checkbox"
                value={todo.complete}
                onChange={todo.toggleComplete}
                checked={todo.complete}
              />
              {todo.value}
            </li>
          );
        })}
      </ul>
      <button className="button" href="#" onClick={todo.clearComplete}>
        Clear Complete
      </button>
    </div>
  );
});

class TodoItemModel {
  @observable
  value;
  @observable
  id;
  @observable
  complete;

  constructor(value) {
    this.value = value;
    this.id = Date.now();
    this.complete = false;
  }

  @action
  toggleComplete = () => {
    this.complete = !this.complete;
  };
}

export class TodoAppModel {
  @observable
  todos = [];
  @observable
  filter = '';

  @computed
  get filterdeTodos() {
    const matchesFilter = new RegExp(this.filter, 'i');
    return this.todos.filter(
      todo => !this.filter || matchesFilter.test(todo.value)
    );
  }

  @action
  filtering = e => {
    this.filter = e.target.value;
  };

  @action
  createNew = e => {
    if (e.which === 13) {
      this.todos.push(new TodoItemModel(e.target.value));
      e.target.value = '';
    }
  };

  @action
  clearComplete = () => {
    const incompleteTodos = this.todos.filter(todo => !todo.complete);
    this.todos.replace(incompleteTodos);
  };
}
