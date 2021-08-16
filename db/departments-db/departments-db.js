const sql = require('mssql');
const config = require("../../dbconfig");

getDepartments = async () => {
    try {
        let pool = await sql.connect(config);
        let departments = await pool.request().query("select * from dbo.Departments");
        return departments.recordsets;
    } catch (error) {
        console.log(error.message);
    }
}

getDepartment = async (depatmentId) => {
    try {
        let pool = await sql.connect(config);
        let department = await pool.request()
            .input("departmentId", sql.Int, depatmentId)
            .query("select * from dbo.Departments where DepartmentID = @departmentId");
        return department.recordsets;
    } catch (error) {
        console.log(error.message);
    }
}

insertDepartment = async (department) => {
    try {
        let pool = await sql.connect(config);
        let departmentReq = await pool.request()
            .input("DepartmentName", sql.NVarChar, department.DepartmentName)
            .query("insert into dbo.Departments values (@DepartmentName)");
        return departmentReq;
    } catch (error) {
        console.log(erro.message);
    }
}

updateDepartment = async (department) => {
    try {
        let pool = await sql.connect(config);
        let departmentReq = await pool.request()
            .input("DepartmentID", sql.Int, department.DepartmentID)
            .input("DepartmentName", sql.NVarChar, department.DepartmentName)
            .query("update dbo.Departments set DepartmentName = @DepartmentName where DepartmentID = @DepartmentID");
        return departmentReq;
    } catch (error) {
        console.log(error.message);
    }
}

deleteDepartment = async (departmentId) => {
    try {
        let pool = await sql.connect(config);
        let department = await pool.request()
            .input("DepartmentID", sql.BigInt, departmentId)
            .query("delete from dbo.Departments where DepartmentID = @DepartmentID");
        return department;
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    getDepartments,
    getDepartment,
    insertDepartment,
    updateDepartment,
    deleteDepartment
}