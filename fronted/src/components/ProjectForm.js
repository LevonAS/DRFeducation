import React from 'react'


class ProjectForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { name: '', users: props.usersSS[0]?.id }
  }

  handleChange(event) {
    this.setState(
      {
        [event.target.name]: event.target.value
      }
    );
    console.log("pF_1", event.target.name, event.target.value)
  }

  handleSubmit(event) {
    console.log("pF_2_n", this.state.name)
    console.log("pF_2_u", this.state.users)
    this.props.createProject(this.state.name, this.state.users)
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <div className="form-group">
          <label htmlFor="name">Project name  </label>
          <input type="text" className="form-control" name="name"
            value={this.state.name} onChange={(event) => this.handleChange(event)} />
        </div>
        {/* <div className="form-group">
          <label htmlFor="users">Users  </label>
          <input type="number" className="form-control" name="users"
            value={this.state.users} onChange={(event) => this.handleChange(event)} />
        </div> */}
        <div className="form-group">
          <label htmlFor="users">Users  </label>
          <select name="users" className='form-control' 
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

export default ProjectForm