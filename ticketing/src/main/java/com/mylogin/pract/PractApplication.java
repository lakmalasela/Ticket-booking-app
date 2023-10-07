package com.mylogin.pract;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class PractApplication {

	public static void main(String[] args) {
		SpringApplication.run(PractApplication.class, args);

	}

}
