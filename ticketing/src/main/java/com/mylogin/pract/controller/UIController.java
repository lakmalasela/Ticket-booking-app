package com.mylogin.pract.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class UIController {



    @GetMapping(value = {"/booking" })
    public ModelAndView employeeui() {
        ModelAndView modelAndView = new ModelAndView();

        modelAndView.setViewName("booking.html");
        return modelAndView;



    }









//    @RequestMapping(value = "/customer", method = RequestMethod.GET)
//    public ModelAndView customerUi() {
//        ModelAndView modelAndView = new ModelAndView();
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        User user = userService.findUserByUserName(auth.getName());
//        if(user!= null){
//            modelAndView.setViewName("booking.html");
//        }
//        else
//            modelAndView.setViewName("error.html");
//
//        return modelAndView;
//    }






































}





