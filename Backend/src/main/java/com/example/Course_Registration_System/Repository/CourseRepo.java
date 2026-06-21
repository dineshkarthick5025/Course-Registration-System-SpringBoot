package com.example.Course_Registration_System.Repository;

import com.example.Course_Registration_System.Models.course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepo extends JpaRepository<course,Integer> {
}
