import { NextRequest, NextResponse } from 'next/server';

import { employees } from '@/lib/data';
import { setEmployees } from '@/lib/data';


export async function GET() {
    return NextResponse.json(employees);
}

export async function POST(req: NextRequest) {
    const newEmployee = await req.json();
    employees.push(newEmployee);
    return NextResponse.json(newEmployee, { status: 201 });
}

export async function PUT(req: NextRequest) {
    const { id, ...updatedEmployee } = await req.json();
    const index = employees.findIndex(emp => emp.id === id);
    if (index !== -1) {
        employees[index] = { id, ...updatedEmployee };
        setEmployees(employees);
    }
    return NextResponse.json({ id, ...updatedEmployee });
}


