import React from "react";
import { Link } from "react-router-dom"


const ProjectItem = ({ project, deleteProject }) => {
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
        {project.users.join(", ")}
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


class ProjectsList extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const rows = []

    this.props.projects.forEach((project) => {
      if (project.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
        return;
      }
      rows.push(<ProjectItem
        key={project.id}
        project={project}
        // usersSS={usersSS}
        deleteProject={(id) => this.props.deleteProject(id)}
      />)
      // console.log("p_2", filterText)
      // console.log("p_3", rows);
    });

    return (
      <div>
        <div>
          <table>
            <thead>
              <tr>
                <th>
                  ID
                </th>
                <th>
                  Project Name
                </th>
                <th>
                  Сreators
                </th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
          <Link to='/projects/create'>Create project</Link>
        </div>
      </div>
    )
  }
}



export default ProjectsList