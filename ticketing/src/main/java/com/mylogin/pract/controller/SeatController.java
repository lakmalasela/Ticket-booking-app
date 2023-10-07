package com.mylogin.pract.controller;


import com.mylogin.pract.model.Seat;
import com.mylogin.pract.model.Showingtime;
import com.mylogin.pract.repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/seat")
public class SeatController {

    @Autowired
    private SeatRepository daoseat;


    @GetMapping(value = "/list",produces = "application/json")
    public List<Seat> movieList(){
        return daoseat.findAll();
    }
}
