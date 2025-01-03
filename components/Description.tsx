import React from 'react'

const Description = () => {
  return (
    <div className="text-center mt-10">
      <h2>API Documentation</h2>
      <ul className="text-left mt-5">
        <li>
          <strong>GET /api/employees</strong>: Fetches a list of all employees.
        </li>
        <li>
          <strong>GET /api/employees/{"{id}"}</strong>: Fetches details of a
          specific employee by ID.
        </li>
        <li>
          <strong>POST /api/employees</strong>: Creates a new employee. Requires
          a JSON body with employee details.
        </li>
        <li>
          <strong>PUT /api/employees/{"{id}"}</strong>: Updates an existing
          employee by ID. Requires a JSON body with updated employee details.
        </li>
        <li>
          <strong>DELETE /api/employees/{"{id}"}</strong>: Deletes an employee
          by ID.
        </li>
      </ul>
    </div>
  );
}

export default Description