package com.example.Course_Registration_System.Services;

import com.example.Course_Registration_System.Models.course;
import com.example.Course_Registration_System.Models.courseRegistry;
import com.example.Course_Registration_System.Repository.CourseRegistryRepo;
import com.example.Course_Registration_System.Repository.CourseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseServices {
    @Autowired
    CourseRepo courseRepo;
    @Autowired
    CourseRegistryRepo courseRegistryRepo;

    public  List<course> DisplayCourses() {
        return courseRepo.findAll();
    }

    public void AddCourses(course course) {
        courseRepo.save(course);
    }

    public List<courseRegistry> DisplayRegistry() {
        return courseRegistryRepo.findAll();
    }

    public void AddRegistry(courseRegistry courseRegistry) {
        courseRegistryRepo.save(courseRegistry);
    }
}
