import React from 'react';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';

export const TodoAppView = observer(({ todo }) => {
  return (
    <div style={{ marginTop: '30px' }}>
      <input
        className="create-task-input"
        type="text"
        placeholder="create task"
        onKeyPress={e => todo.createNew(e)}
      />
      <ul>
        {todo.filterdeTodos.map(todo => {
          return (
            <li key={todo.id}>
              <input
                type="checkbox"
                className="check-input"
                value={todo.complete}
                onChange={todo.toggleComplete}
                checked={todo.complete}
              />
              {todo.value}
              <hr />
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
  @observable value;
  @observable id;
  @observable complete;

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
