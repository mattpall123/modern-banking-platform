package com.marigold.marigoldapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class MarigoldapiApplication {

	public static void main(String[] args) {
		SpringApplication.run(MarigoldapiApplication.class, args);
	}

}
