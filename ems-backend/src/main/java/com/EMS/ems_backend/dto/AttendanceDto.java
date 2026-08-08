package com.EMS.ems_backend.dto;

import com.EMS.ems_backend.entity.AttendanceStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class
AttendanceDto {
    private Long id;
    private Long employeeId;
    private LocalDate Date;
    private LocalTime checkIn;
    private LocalTime checkOut;
    private Double totalWorkingHours;
    private String remarks;
    private AttendanceStatus attendanceStatus;
}
