const sql = require("mssql");
const config = require("../../dbconfig");

getEmployees = async () => {
    try {
        let pool = await sql.connect(config);
        let employees = await pool.request().query("select EmployeeID, EmployeeName, DepartmentName, MailID, DOJ from dbo.Employees E inner join dbo.Departments Dep on Dep.DepartmentID = E.DepartmentID");
        return employees.recordsets;
    } catch (error) {
        console.log(error);
    }
}

getEmployee = async (employeeId) => {
    try {
        let pool = await sql.connect(config);
        let employee = await pool.request()
            .input("employeeId", sql.Int, employeeId)
            .query("select EmployeeID, EmployeeName, DepartmentName, MailID, DOJ from dbo.Employees E inner join dbo.Departments Dep on Dep.DepartmentID = E.DepartmentID where EmployeeID = @employeeId");
        return employee.recordsets;
    } catch (error) {
        console.log(error.message);
    }
}

insertEmployee = async (employee) => {
    try {
        let pool = await sql.connect(config);
        let employeeReq = await pool.request()
            .input("EmployeeName", sql.VarChar, employee.EmployeeName)
            .input("DepartmentID", sql.Int, employee.DepartmentID)
            .input("MailID", sql.VarChar, employee.MailID)
            .input("DOJ", sql.Date, employee.DOJ)
            .query("insert into dbo.Employees values (@EmployeeName, @DepartmentID, @MailID, @DOJ)");
        return employeeReq.rowsAffected;
    } catch (error) {
        console.log(error.message);
    }
}

updateEmployee = async (employee) => {
    try {
        let pool = await sql.connect(config);
        let employeeReq = await pool.request()
            .input("EmployeeID", sql.Int, employee.EmployeeID)
            .input("EmployeeName", sql.VarChar, employee.EmployeeName)
            .input("DepartmentID", sql.Int, employee.DepartmentID)
            .input("MailID", sql.VarChar, employee.MailID)
            .input("DOJ", sql.Date, employee.DOJ)
            .query("update dbo.Employees set EmployeeName = @EmployeeName, DepartmentID = @DepartmentID, MailID = @MailID, DOJ = @DOJ where EmployeeID = @EmployeeID");
        return employeeReq.rowsAffected;
    } catch (error) {
        console.log(error.message);
    }
}

deleteEmployee = async (employeeId) => {
    try {
        let pool = await sql.connect(config);
        let employee = await pool.request()
            .input("EmployeeID", sql.Int, employeeId)
            .query("delete from dbo.Employees where EmployeeID = @EmployeeID");
        return employee.rowsAffected;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getEmployees,
    getEmployee,
    insertEmployee,
    updateEmployee,
    deleteEmployee
}