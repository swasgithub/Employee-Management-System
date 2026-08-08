package com.EMS.ems_backend.service.impl;

import com.EMS.ems_backend.dto.AttendanceDto;
import com.EMS.ems_backend.entity.Attendance;
import com.EMS.ems_backend.entity.Employee;
import com.EMS.ems_backend.exception.ResourceNotFoundException;
import com.EMS.ems_backend.mapper.AttendanceMapper;
import com.EMS.ems_backend.repository.AttendanceRepository;
import com.EMS.ems_backend.repository.EmployeeRepository;
import com.EMS.ems_backend.service.AttendanceService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AttendanceServiceImpl implements AttendanceService {

    private AttendanceRepository attendanceRepository;
    private EmployeeRepository employeeRepository;

    @Override
    public AttendanceDto createAttendance(AttendanceDto attendanceDto) {
        Employee employee = employeeRepository.findById(
                attendanceDto.getEmployeeId())
                .orElseThrow(()-> new ResourceNotFoundException
                        ("Employee does not exist with a given id: " + attendanceDto.getEmployeeId()));

        Attendance attendance = AttendanceMapper.mapToAttendance(attendanceDto);
        attendance.setEmployee(employee);
        attendance.setTotalWorkingHours(calculateWorkingHours(attendanceDto.getCheckIn(), attendanceDto.getCheckOut()));

        Attendance savedAttendance = attendanceRepository.save(attendance);
        return AttendanceMapper.mapToAttendanceDto(savedAttendance);

    }

    @Override
    public AttendanceDto getAttendanceById(Long attendanceId) {
        Attendance attendance = attendanceRepository.findById(attendanceId).orElseThrow(
                () -> new ResourceNotFoundException("Attendance does not exist with a given id: " + attendanceId)
        );
        return AttendanceMapper.mapToAttendanceDto(attendance);

    }

    @Override
    public List<AttendanceDto> getAllAttendances() {
        return attendanceRepository.findAll().stream()
                .map(AttendanceMapper::mapToAttendanceDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<AttendanceDto> getAttendanceByEmployeeId(Long employeeId) {
        return attendanceRepository.findByEmployeeId(employeeId).stream()
                .map(AttendanceMapper::mapToAttendanceDto)
                .collect(Collectors.toList());
    }

    @Override
    public AttendanceDto updateAttendance(Long attendanceId, AttendanceDto updatedAttendance) {
        Attendance attendance = attendanceRepository.findById(attendanceId).orElseThrow(
                () -> new ResourceNotFoundException("Attendance does not exist with a given id: " + attendanceId));
        attendance.setDate(updatedAttendance.getDate());
        attendance.setCheckIn(updatedAttendance.getCheckIn());
        attendance.setCheckOut(updatedAttendance.getCheckOut());
        attendance.setTotalWorkingHours(calculateWorkingHours(updatedAttendance.getCheckIn(), updatedAttendance.getCheckOut()));
        attendance.setRemarks(updatedAttendance.getRemarks());
        attendance.setAttendanceStatus(updatedAttendance.getAttendanceStatus());

        Attendance savedAttendance = attendanceRepository.save(attendance);
        return AttendanceMapper.mapToAttendanceDto(savedAttendance);


    }

    @Override
    public void deleteAttendance(Long attendanceId) {
        attendanceRepository.findById(attendanceId).orElseThrow(
                () -> new ResourceNotFoundException("Attendance does not exist with a given id: " + attendanceId)
        );
        attendanceRepository.deleteById(attendanceId);
    }
    private Double calculateWorkingHours(LocalTime checkIn, LocalTime checkOut) {
        if (checkIn == null || checkOut == null) return null;
        Duration duration = Duration.between(checkIn, checkOut);
        return duration.toMinutes() / 60.0;
    }
}
