interface Employee {
    id: string;
    name: string;
    position: string;
    department: string;
}

export let employees: Employee[] = [];


// Function to update the employees array
export function setEmployees(newEmployees: typeof employees) {
    employees = newEmployees;
}