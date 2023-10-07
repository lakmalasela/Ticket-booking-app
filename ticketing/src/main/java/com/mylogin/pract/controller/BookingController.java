package com.mylogin.pract.controller;


import com.mylogin.pract.model.Booking;
import com.mylogin.pract.model.Bookinghasseat;
import com.mylogin.pract.repository.BookingRepository;
import com.mylogin.pract.repository.BookingstatusRepository;
import com.mylogin.pract.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/bookticket")
public class BookingController {

    @Autowired
    private BookingRepository daobooking;

    @Autowired
    private BookingstatusRepository daobookingstatus;

    @Autowired
    private MovieRepository daomovie;


    @GetMapping(value = "/findAll",params = {"page","size"},produces = "application/json")
    public Page<Booking> findAll(@RequestParam("page") int page, @RequestParam("size") int size){


        return daobooking.findAll(PageRequest.of(page, size, Sort.Direction.DESC,"id"));

    }

    @GetMapping(value = "/nextnumber",produces = "application/json")
    public Booking nextnumber(){
        String nextnumber = daobooking.getNextNumber();
        Booking nextcustomer = new Booking(nextnumber);
        return  nextcustomer;
    }



    //insert
    @PostMapping
    public String inset(@RequestBody Booking booking){

            try{
                booking.setBookingstatus_id(daobookingstatus.getReferenceById(1));


                for(Bookinghasseat bhs: booking.getBookinghasseatList())
                    bhs.setBooking_id(booking);


                daobooking.save(booking);
                return "0";
            }catch (Exception ex){
                return "Not Save Your Data"+ex.getMessage();
            }





    }


}
