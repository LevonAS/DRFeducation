import React from "react";
import { Link } from "react-router-dom"

const ProjectItem = ({ project, usersSS }) => {
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
    </tr>
  )
}

const ProjectsList = ({ projects, usersSS }) => {
  return (
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
      {projects?.map((project_) => <ProjectItem project={project_} usersSS={usersSS} />)}
    </table>
  )
}

export default ProjectsList