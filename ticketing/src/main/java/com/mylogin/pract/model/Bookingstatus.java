package com.mylogin.pract.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Table(name = "bookingstatus")
@AllArgsConstructor
@NoArgsConstructor
public class Bookingstatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;


    @Column(name = "name")
    @Basic(optional = false)
    private String name;
}
