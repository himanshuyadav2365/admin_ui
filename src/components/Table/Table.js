import React from 'react'
import TableRow from '../TableRow/Table'
const Table = () => {
  return  (
    <table style={{ width: "80%", textAlign: "center" }}>
        <thead>
            <tr>
                <th>
                    <input
                        // onChange={checkAllHandler}
                        // checked={checkedAll ? true : false}
                        type="checkbox"
                    />
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <TableRow />
        </tbody>
    </table>
)
}

export default Table