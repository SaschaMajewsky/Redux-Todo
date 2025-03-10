import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { addTodo, toggleTodoStatus, deleteTodo, loadTodos } from '../actions';
import TodoList from '../components/TodoList';
import taskBurner from './lava-lamp-preloader.svg';

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      todos: [],
    };
  }

  componentDidMount() {
    this.props.loadTodos();
  }

  addTodo = event => {
    event.preventDefault();
    if (this.state.text.length > 0) {
      this.props.addTodo({
        text: this.state.text,
        status: false,
        user: localStorage.getItem('user'),
      });
      this.setState({ text: '' });
    }
  };

  deleteATodo = id => {
    this.props.deleteTodo(id);
    this.setState({ todos: this.props.todoProps });
  };

  toggleTodo = id => {
    this.props.toggleTodoStatus({
      _id: id,
      status: !this.props.todoProps.filter(todo => todo._id === id)[0].status,
    });
    this.setState({ todos: this.props.todoProps });
  };

  onInputChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  render() {
    if (localStorage.getItem('user') === null) {
      return <Redirect to='/' />;
    }
    const loading = this.props.loadingProps;
    console.log('LOADING: ', this.props.loadingProps);
    return (
      <div className='form-container'>
        {loading && (
          <div className='burn-loader'>
            <img src={taskBurner} alt='Moving animation of a flame.' />
          </div>
        )}
        {loading && (
          <span className='loading-text'> burning all of your done tasks</span>
        )}
        {!loading && (
          <form className='md-form' onSubmit={this.addTodo}>
            <input
              type='text'
              name='text'
              value={this.state.text}
              onChange={this.onInputChange}
              id='exampleForm2'
              className='form-control white-text todo-input'
              autoComplete='off'
              maxLength='14'
              placeholder='Add Todo'
              required
            />
            <button className='btn peach-gradient' type='submit'>
              Add
            </button>
          </form>
        )}
        {!loading && (
          <TodoList toggle={this.toggleTodo} delete={this.deleteATodo} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todoProps: state.todoReducer.todos,
  loadingProps: state.todoReducer.loadingTodos,
});

export default connect(
  mapStateToProps,
  { addTodo, toggleTodoStatus, deleteTodo, loadTodos },
)(TodoForm);
