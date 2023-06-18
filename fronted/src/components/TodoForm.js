import React from 'react'


class TodoForm extends React.Component {
  constructor(props) {
    super(props)
    // console.log("tF_0_uSS", props.usersSS)
    this.state = { 
      project: props.projects[0]?.id, 
      text: '',
      creator: props.usersSS[0]?.id 
    }
  }

  handleChange(event) {
    this.setState(
      {
        [event.target.name]: event.target.value
      }
    );
    console.log("tF_1", event.target.name, event.target.value)
  }

  handleSubmit(event) {
    console.log("tF_2_p", this.state.project)
    console.log("tF_2_t", this.state.text)
    console.log("tF_2_c", this.state.creator)
    this.props.createTodo(this.state.project, this.state.text, this.state.creator)
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <div className="form-group">
          <label htmlFor="project">Project  </label>
          <select name="project" className='form-control' 
              onChange={(event) => this.handleChange(event)}>
            {this.props.projects.map((item) => 
              <option value={item.id}>{item.name}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="text">Text  </label>
          <input type="text" className="form-control" name="text"
            value={this.state.text} onChange={(event) => this.handleChange(event)} />
        </div>
        <div className="form-group">
          <label htmlFor="creator">Creator  </label>
          <select name="creator" className='form-control' 
              onChange={(event) => this.handleChange(event)}>
            {this.props.usersSS.map((item) => 
              <option value={item.id}>{item.username}</option>)}
          </select>
        </div>
        <input type="submit" className="btn btn-primary" value="Save" />
      </form>
    );
  }
}

export default TodoForm
