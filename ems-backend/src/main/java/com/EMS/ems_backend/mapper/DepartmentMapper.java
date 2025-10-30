package com.EMS.ems_backend.mapper;

import com.EMS.ems_backend.dto.DepartmentDto;
import com.EMS.ems_backend.entity.Department;

public class DepartmentMapper {
    //convert department jpa entity to department dto
    public static DepartmentDto mapToDepartmentDto(Department department){
        return new DepartmentDto(
                department.getId(),
                department.getDepartmentName(),
                department.getDepartmentDescription()
        );
    }
    //convert departmentDto tp department jpa entity
    public static Department mapToDepartment(DepartmentDto departmentDto){
        return new Department(
                departmentDto.getId(),
                departmentDto.getDepartmentName(),
                departmentDto.getDepartmentDescription()
        );
    }

}
