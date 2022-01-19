import React from 'react'
import { useSelector } from 'react-redux'

import UserRow from './UserRow'

import Table from 'react-bootstrap/Table'

const UsersList = () => {
  const users = useSelector((state) =>
    state.users.sort((a, b) => b.blogs.length - a.blogs.length)
  )

  return (
    <div>
      {users ? (
        <Table striped hover bordered className="userslist">
          <thead>
            <tr>
              <th>User</th>
              <th>Blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <UserRow key={user.id} user={user} />
            ))}
          </tbody>
        </Table>
      ) : (
        <></>
      )}
    </div>
  )
}

export default UsersList
