package com.EMS.ems_backend.mapper;

import com.EMS.ems_backend.dto.AttendanceDto;
import com.EMS.ems_backend.entity.Attendance;

public class AttendanceMapper {
    public static AttendanceDto mapToAttendanceDto(Attendance attendance)
    {
        return new AttendanceDto(
                attendance.getId(),
                attendance.getEmployee().getId(),
                attendance.getDate(),
                attendance.getCheckIn(),
                attendance.getCheckOut(),
                attendance.getTotalWorkingHours(),
                attendance.getRemarks(),
                attendance.getAttendanceStatus()
        );
    }
    public static Attendance mapToAttendance(AttendanceDto attendanceDto){
        Attendance attendance = new Attendance();
        attendance.setId(attendanceDto.getId());
        attendance.setDate(attendanceDto.getDate());
        attendance.setCheckIn((attendanceDto.getCheckIn()));
        attendance.setCheckOut((attendanceDto.getCheckOut()));
        attendance.setRemarks(attendanceDto.getRemarks());
        attendance.setAttendanceStatus(attendanceDto.getAttendanceStatus());
        return attendance;
    }
}
