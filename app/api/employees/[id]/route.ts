import { employees } from "@/lib/data";

import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/").pop();
  console.log(id);
  console.log(typeof id);
  const employeeIndex = employees.findIndex((employee) => employee.id === id);
  if (employeeIndex === -1) {
    return NextResponse.json({ error: "Employee not found" }, { status: 404 });
  }
  employees.splice(employeeIndex, 1);
  return NextResponse.json({ id });
}

export async function GET(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/").pop();

  const employee = employees.find((employee) => employee.id === id);
  if (!employee) {
    return NextResponse.json({ error: "Employee not found" }, { status: 404 });
  }
  return NextResponse.json(employee);
}
