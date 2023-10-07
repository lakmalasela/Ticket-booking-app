package com.mylogin.pract.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Table(name="seat")
@AllArgsConstructor
@NoArgsConstructor
public class Seat {

    @Id
    @Basic(optional = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;


    @Column(name = "seatcode")
    @Basic(optional = false)
    private String seatcode;
}
