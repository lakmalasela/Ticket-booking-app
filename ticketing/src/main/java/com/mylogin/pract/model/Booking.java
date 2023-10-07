package com.mylogin.pract.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Table(name = "booking")
@AllArgsConstructor
@NoArgsConstructor

public class Booking {

    @Id
    @Basic(optional = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "customername")
    @Basic(optional = false)
    private String customername;

    @Column(name = "bookid")
    @Basic(optional = false)
    private String bookid;

    @Column(name = "price")
    @Basic(optional = false)
    private BigDecimal price;

    @Column(name = "bookingdatetime")
    @Basic(optional = false)
    private LocalDateTime bookingdatetime;

    //foreign keys
    @JoinColumn(name = "bookingstatus_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Bookingstatus bookingstatus_id;

    @JoinColumn(name = "movie_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Movie movie_id;

    @JoinColumn(name = "showingtime_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Showingtime showingtime_id;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "booking_id",fetch = FetchType.LAZY,orphanRemoval = true)
    private List<Bookinghasseat> bookinghasseatList;


    public Booking(String bookid){
        this.bookid = bookid;
    }









}
