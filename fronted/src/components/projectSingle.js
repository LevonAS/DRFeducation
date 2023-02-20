import React from "react";
import { useParams } from "react-router-dom";

const ProjectItem = ({ item, usersSS }) => {
  return (
    <tr>
      <td>
        {item.id}
      </td>
      <td>
        {item.name}
      </td>
      <td>
        {item.users.map((userID) => {
          let user = usersSS.find((u) => u.id === userID)
          if (user) {
            return user.username
          } return false
        })}
      </td>
      <td>
        {item.repository}
      </td>
    </tr>
  )
}

const ProjectSingle = ({ projects, usersSS }) => {
  // console.log("itemId_1",useParams())
  let itemId = useParams()
  // console.log("itemId_2", itemId, itemId.id  )
  // console.log("itemid_3", projects.filter((item) => item.id == 2) )
  let filter_projects = projects.filter((item) => item.id === +itemId.id)
  // console.log("filter_projects", filter_projects )
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
      <th>
        Url repository
      </th>
      {/* {projects?.map((project_) => <ProjectItem project={project_} />)} */}
      {filter_projects?.map((project_) => <ProjectItem item={project_} usersSS={usersSS} />)}
    </table>
  )
}

export default ProjectSingle