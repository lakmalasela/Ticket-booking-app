package com.mylogin.pract.repository;

import com.mylogin.pract.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BookingRepository extends JpaRepository<Booking,Integer> {

    @Query(value = "SELECT concat('B',lpad(substring(max(b.bookid),2)+1,9,0)) FROM ticketapp.booking as b",nativeQuery = true)
    String getNextNumber();
}
