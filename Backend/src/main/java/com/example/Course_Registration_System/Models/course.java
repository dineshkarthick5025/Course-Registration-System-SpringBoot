package com.example.Course_Registration_System.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class course {

    @Id
    private String courseId;

    private String courseName;

    private String trainer;

    private int duration;

    public course() {}

    public course(String courseId,
                  String courseName,
                  String trainer,
                  int duration) {

        this.courseId = courseId;
        this.courseName = courseName;
        this.trainer = trainer;
        this.duration = duration;
    }
}