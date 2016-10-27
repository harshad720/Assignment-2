# Assignment-2
An Internet connected device that senses and logs the temperature on a website and a neopixel matrix

## Circuit Description
This device uses the following components:
* Particle Photon
* One Wire Temprature sensor DS18B20
* OLED screen
* Neopixel Matrix

## Circuit Functions:
*Using the input coming from the temprature sensor and publishing it to the cloud. 
*Using the data from the cloud and visualizing it using the OLED screen, which shows the last published temprature, 
and the Neopixel Matrix, which graphs the temprature values.

## Input Visualization:
The website uses D3.js to use the data from the photon to plot a Bar Graph of the values.

## Libraries used:
*OneWire/OneWire.h
*neopixel/neopixel.h
*SparkFunMicroOLED/SparkFunMicroOLED.h


## API reference:
*D3.js:https://d3js.org/

Images:

![img_0803](https://cloud.githubusercontent.com/assets/21200411/19778080/2355c3fa-9c49-11e6-86c6-3d18cd4f5464.jpg)

![img_0799](https://cloud.githubusercontent.com/assets/21200411/19778085/26ba851c-9c49-11e6-88ad-369aff4625a5.jpg)
