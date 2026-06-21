package com.example.Course_Registration_System.Controllers;

import com.example.Course_Registration_System.Models.course;
import com.example.Course_Registration_System.Models.courseRegistry;
import com.example.Course_Registration_System.Services.CourseServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class CourseController {
    @Autowired
    CourseServices courseServices;

    @GetMapping("/courses")
    public List<course> DisplayCourses(){
        return courseServices.DisplayCourses();
    }
    @PostMapping("/courses/add")
    public String AddCourse(@RequestBody course course){
        courseServices.AddCourses(course);
        return "course added";
    }
    @GetMapping("/registry")
    public List<courseRegistry> DisplayRegistry(){
        return courseServices.DisplayRegistry();
    }
    @PostMapping("/registry/add")
    public String AddRegistry(@RequestBody courseRegistry courseRegistry){
        courseServices.AddRegistry(courseRegistry);
        return "added";
    }
}

