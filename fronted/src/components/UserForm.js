import React from 'react'


class UserForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { username: '', first_name: '', last_name: '', email: '' }
  }
  
  handleChange(event) {
    this.setState(
      {
        [event.target.name]: event.target.value
      }
    );
    console.log("uF_1", event.target.name, event.target.value)
  }
  
  handleSubmit(event) {
    console.log("uF_2_u", this.state.username)
    console.log("uF_2_e", this.state.email)
    this.props.createUser(this.state.username, this.state.first_name, 
      this.state.last_name, this.state.email)
    event.preventDefault()
  }
  
  render() {
    return (
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <div className="form-group">
          <label htmlFor="username">Username  </label>
          <input type="text" className="form-control" name="username"
            value={this.state.username} onChange={(event) => this.handleChange(event)} />
        </div>
        <div className="form-group">
          <label htmlFor="first_name">First name  </label>
          <input type="text" className="form-control" name="first_name"
            value={this.state.first_name} onChange={(event) => this.handleChange(event)} />
        </div>
        <div className="form-group">
          <label htmlFor="last_name">Last name  </label>
          <input type="text" className="form-control" name="last_name"
            value={this.state.last_name} onChange={(event) => this.handleChange(event)} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address  </label>
          <input type="text" className="form-control" name="email"
            value={this.state.email} onChange={(event) => this.handleChange(event)} />
        </div>
        <input type="submit" className="btn btn-primary" value="Save" />
      </form>
    );
  }
}

export default UserForm
