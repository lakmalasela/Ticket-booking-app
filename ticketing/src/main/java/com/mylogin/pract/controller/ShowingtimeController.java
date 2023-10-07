package com.mylogin.pract.controller;

import com.mylogin.pract.model.Movie;
import com.mylogin.pract.model.Showingtime;
import com.mylogin.pract.repository.ShowingtimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/showtime")
public class ShowingtimeController {


    @Autowired
    private ShowingtimeRepository daoshowtime;


    @GetMapping(value = "/list",produces = "application/json")
    public List<Showingtime> movieList(){
        return daoshowtime.findAll();
    }
}
