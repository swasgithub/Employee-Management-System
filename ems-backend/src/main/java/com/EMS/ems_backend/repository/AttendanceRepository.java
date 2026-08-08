package com.EMS.ems_backend.repository;

import com.EMS.ems_backend.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance,Long> {
    List<Attendance> findByEmployeeId(Long employeeId);
}
