package com.EMS.ems_backend.controller;

import com.EMS.ems_backend.dto.AttendanceDto;
import com.EMS.ems_backend.service.AttendanceService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/attendances")
public class AttendanceController {
    private AttendanceService attendanceService;

    @PostMapping
    public ResponseEntity<AttendanceDto> createAttendance(@RequestBody AttendanceDto attendanceDto){
        AttendanceDto saved = attendanceService.createAttendance(attendanceDto);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }
    @GetMapping("{id}")
    public ResponseEntity<AttendanceDto> getAttendanceById(@PathVariable("id") Long attendanceId){
        return ResponseEntity.ok(attendanceService.getAttendanceById(attendanceId));
    }
    @GetMapping
    public ResponseEntity<List<AttendanceDto>> getAllAttendances() {
        return ResponseEntity.ok(attendanceService.getAllAttendances());
    }
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<AttendanceDto>> getAttendancesByEmployee(@PathVariable Long employeeId) {
        return ResponseEntity.ok(attendanceService.getAttendanceByEmployeeId(employeeId));
    }
    @PutMapping("{id}")
    public ResponseEntity<AttendanceDto> updateAttendance(@PathVariable("id") Long attendanceId ,@RequestBody AttendanceDto updatedAttendance){
        return ResponseEntity.ok(attendanceService.updateAttendance(attendanceId, updatedAttendance));
    }
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteAttendance(@PathVariable("id") Long attendanceId) {
        attendanceService.deleteAttendance(attendanceId);
        return ResponseEntity.ok("Attendance Deleted Successfully!");
    }
}
