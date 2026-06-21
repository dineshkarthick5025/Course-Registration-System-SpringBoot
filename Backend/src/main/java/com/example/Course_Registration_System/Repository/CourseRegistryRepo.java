package com.example.Course_Registration_System.Repository;

import com.example.Course_Registration_System.Models.courseRegistry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRegistryRepo extends JpaRepository<courseRegistry,Integer> {

}
