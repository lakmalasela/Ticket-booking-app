package com.mylogin.pract.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalTime;

@Entity
@Data
@Table(name = "showingtime")
@AllArgsConstructor
@NoArgsConstructor
public class Showingtime {


    @Id
    @Basic(optional = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;


    @Column(name = "time")
    @Basic(optional = false)
    private LocalTime time;
}
