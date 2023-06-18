<form onSubmit={(event) => this.handleSubmit(event)}>
<div className="form-group">
  <label htmlFor="name">Project name  </label>
  <input type="text" className="form-control" name="name"
    value={this.state.name} onChange={(event) => this.handleChange(event)} />
</div>
<input type="submit" className="btn btn-primary" value="Save" />
</form>



import React from "react";
import { Link } from "react-router-dom"

const ProjectItem = ({ project, usersSS, deleteProject }) => {
  return (
    <tr>
      <td>
        {project.id}
      </td>
      <td>
        <Link to={`/projects/${project.id}`}>
          {project.name}
        </Link>
      </td>
      <td>
        {project.users.map((userID) => {
          let user = usersSS.find((u) => u.id === userID)
          if (user) {
            return user.username
          } return false
        })}
      </td>
      {/* <td>
        {project.repository}
      </td> */}
      <td><button onClick={() => deleteProject(project.id)}
        type='button'> Delete project</button>
      </td>
    </tr>
  )
}


// handleChange() {
//   None
// }
// const searchData = (event) => { 
//   console.log("p_1", event, projects )   
//   const pr = projects.filter(item => item.name.toLowerCase().indexOf(event.toLowerCase()) !== -1)
//   console.log("p_2", pr )
//   return (
//     <div>
//       <input type="text" placeholder="Search somethingt   "
//         onChange={(event) => searchData(event.target.value)} />
//       <button >Find project</button>
//     </div>
//   )

// }



const ProjectsList = ({ projects, usersSS, deleteProject }) => { 
  let p = 0;
  // p === window.p;
  const searchData = (event) => { 
    // console.log("p_1", event, projects )   
    // window.p = '333' + window.p
    // console.log("p_21", p)
    
    const pr = projects.filter(item => item.name.toLowerCase().indexOf(event.toLowerCase()) !== -1)
    console.log("p_2", pr )
    p = p +1
    return p

  
  }
  console.log("p_3", p)
  // let p = searchData()
  // console.log("p_3", p )
  // const searchData = function  (event) {
  //   projects.filter(item => item.name.toLowerCase().indexOf(event.toLowerCase()) !== -1)

  // }
  // console.log("p_3", searchData )
  // let s = searchData()

  // // const s = searchData((event))
  // console.log("p_4", s )
  // console.log("p_3", s)
  // let query = 'ро'
  // let query = '00'
  // let query = ''
  // const projectss = projects.filter(item => item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1)
  return (

    <div>
      <div>
        <input type="text" placeholder="Search somethingt   "
          onChange={(event) => searchData(event.target.value)}/>
        <button >Find project</button>
      </div>
      <table>
        <th>
          ID
        </th>
        <th>
          Project Name
        </th>
        <th>
          Сreators
        </th>
        {/* <th>
        Url repository
      </th> */}
        {projects?.map((project_) => <ProjectItem project={project_}
          usersSS={usersSS} deleteProject={deleteProject} />)}
      </table>
      <Link to='/projects/create'>Create project</Link>
    </div>
  )
}

export default ProjectsList