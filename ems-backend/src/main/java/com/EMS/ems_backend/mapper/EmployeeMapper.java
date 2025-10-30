package com.EMS.ems_backend.mapper;

import com.EMS.ems_backend.dto.EmployeeDto;
import com.EMS.ems_backend.entity.Employee;

public class EmployeeMapper {

    public static EmployeeDto tomapEmployeeDto(Employee employee){
        return new EmployeeDto(
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail()
        );
    }
    public static Employee tomapEmployee(EmployeeDto employeeDto){
        return new Employee(
                employeeDto.getId(),
                employeeDto.getFirstName(),
                employeeDto.getLastName(),
                employeeDto.getEmail()
        );
    }

}
