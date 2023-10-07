package com.mylogin.pract.controller;


import com.mylogin.pract.model.Movie;
import com.mylogin.pract.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/movie")
public class MovieController {

    @Autowired
    private MovieRepository daomovie;

    @GetMapping(value = "/list",produces = "application/json")
    public List<Movie> movieList(){
        return daomovie.findAll();
    }
}
