package com.EMS.ems_backend.entity;

import jakarta.persistence.*;
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
@Entity
@Table(name = "Attendances")
public class Attendance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @Column(name = "Date", nullable = false)
    private LocalDate Date;
    private LocalTime checkIn;
    private LocalTime checkOut;
    private Double totalWorkingHours;
    private String remarks;
    @Enumerated(EnumType.STRING)
    @Column(name = "AttendanceStatus", nullable = false)
    private AttendanceStatus attendanceStatus;
}
