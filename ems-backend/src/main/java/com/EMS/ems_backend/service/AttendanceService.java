package com.EMS.ems_backend.service;

import com.EMS.ems_backend.dto.AttendanceDto;

import java.util.List;

public interface AttendanceService {
    AttendanceDto createAttendance(AttendanceDto attendanceDto);
    AttendanceDto getAttendanceById(Long attendanceId);
    List<AttendanceDto> getAllAttendances();
    List<AttendanceDto> getAttendanceByEmployeeId(Long employeeId);

    AttendanceDto updateAttendance(Long attendanceId , AttendanceDto attendanceDto);
    void deleteAttendance(Long attendanceId);

}
