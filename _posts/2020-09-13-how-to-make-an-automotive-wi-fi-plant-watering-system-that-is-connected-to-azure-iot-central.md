---
layout: post
title: "How to make an automotive Wi-Fi plant watering system that is connected to Azure IoT Central?"
author: poanchen
date: 2020-09-13 08:30:30
tags:
- Azure IoT Central
- Arduino
- Arduino IDE
- DIY
- ESP8266
- Wi-Fi
---
I often forget to water my plants, and as a result they would get really dry and sometimes even die. So I thought it would be cool to build an automotive Wi-Fi plant watering system that will continue to water my plant until it reaches a certain level of moist. In addition, I am planning to leverage [Azure IoT Central](https://azure.microsoft.com/services/iot-central), so that I have a nice dashboard that I can work with and check when was the last time the system watered my plant as well as the moist level for the past few hours/days/weeks. In this tutorial, I will walk you through it step by step. For folks who don't know what Azure IoT Central is or wish to create one programmically, I wrote a nice tutorial all about it, check it out over [here](/blog/2019/11/23/how-to-create-an-azure-iot-central-application-programmatically).

But first, these are the items you need to get it first, (Disclosure, I may earn some affiliate commission when you buy the product through the link listed below, however, the price you pay will be exactly the same regardless of the affiliate program, thank you for your support!)

1. [Vinyl Tubing - 30 CM 5/16 ID - 7/16 OD2](https://amzn.to/2GXIImp) * 1
2. [1 Channel Relay Module](https://amzn.to/32ptAq4) * 1
3. [Capacitive Soil Moisture Sensor Module](https://amzn.to/3hpexkt) * 1
4. [Jumper wires, Male to Female, 40pin Male to Male, 40pin Female to Female](https://amzn.to/3k7O24O) * 1
5. [Mini Micro Submersible Motor Pump Water Pumps](https://amzn.to/2Zx1DL8) * 1
6. [AI-Thinker NodeMCU-8266 (ESP8266MOD)](https://amzn.to/3hryHdL) * 1
7. [AC/DC Adapter - 5VDC 2.0A, Micro-USB Plug](https://amzn.to/3mlyhci) * 1

These are the software you need to install on your computer,
1. Download the latest [Arduino IDE](https://www.arduino.cc/en/Main/Software)

Firstable, thanks to the people who made [it](https://github.com/esp8266/Arduino) happen by porting the ESP8266 into Arduino IDE. Otherwise, these wouldn't have been possible. 

Let's start! Initially, I plan to hook up ESP8266 with Capacitive Soil Moisture Sensor Module, so that it will begin to send some data on how moisture the soil is.

Once you have downloaded the Arduino IDE, launch it first. Go to files and click on the preference in the Arduino IDE

<img src="\img\2020\09\13\how-to-make-an-automotive-wi-fi-plant-watering-system-that-is-connected-to-azure-iot-central/arduino preferences esp8266.JPG" alt="Arduino Preferences ESP8266">

Copy the below URL into the Additional Boards Manager URLs

{% highlight python %}
https://arduino.esp8266.com/stable/package_esp8266com_index.json
{% endhighlight %}

Click OK to close the Preferences window.

After completing the above steps, go to Tools and Board, and then select board Manager

<img src="\img\2020\09\13\how-to-make-an-automotive-wi-fi-plant-watering-system-that-is-connected-to-azure-iot-central/boards manager.JPG" alt="Board Manager">

Search esp8266 and click install.

<img src="\img\2020\09\13\how-to-make-an-automotive-wi-fi-plant-watering-system-that-is-connected-to-azure-iot-central/esp8266 install.JPG" alt="esp8266 install">

Next, go to Tools, Board, ESP8266 Boards and select NodeMCU 1.0 (ESP-12E Module)

<img src="\img\2020\09\13\how-to-make-an-automotive-wi-fi-plant-watering-system-that-is-connected-to-azure-iot-central/nodemcu v1.JPG" alt="nodemcu v1">

Now, I need to set up the board with Capacitive Soil Moisture Sensor Module. Here is how I set it up,

<img src="\img\2020\09\13\how-to-make-an-automotive-wi-fi-plant-watering-system-that-is-connected-to-azure-iot-central/Capacitive-Soil-Moisture-Sensor-ESP8266 diagram.JPG" alt="Capacitive-Soil-Moisture-Sensor-ESP8266 diagram">

The above picture is taken and modified from WayinTop.

In words,

1. The AOUT pin on the Capacitive Soil Moisture Sensor Module connects to pin A0 on the ESP8266.
2. The GND pin on the Capacitive Soil Moisture Sensor Module connects to a GND pin on the ESP8266.
3. The VCC pin on the Capacitive Soil Moisture Sensor Module connects to a 3v3 pin on the ESP8266.

Here is the PIN map of ESP8266, just for your information,

<img src="\img\2020\09\13\how-to-make-an-automotive-wi-fi-plant-watering-system-that-is-connected-to-azure-iot-central/NODEMCU_DEVKIT_V1.0_PINMAP.png" alt="NODEMCU_DEVKIT_V1.0_PINMAP">

The above picture is from [here](https://github.com/nodemcu/nodemcu-devkit-v1.0#pin-map).

Here is what I wrote in Arduino IDE,
{% highlight java %}
const int AirValue = 640; // you might need to calibrate this number, instruction is down below
const int WaterValue = 353; // you might need to calibrate this number, instruction is down below
const int SoilMoisturePin = A0;
int soilMoistureValue = 0;
int soilmoisturepercent = 0;

void setup() {
  Serial.begin(115200);
  pinMode(SoilMoisturePin, INPUT);
}

void loop() {
  soilMoistureValue = analogRead(SoilMoisturePin);
  soilmoisturepercent = map(soilMoistureValue, AirValue, WaterValue, 0, 100);
  Serial.print(soilmoisturepercent);
  Serial.println("%");
  delay(60000);
}
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2020/09/13/how-to-make-an-automotive-wi-fi-plant-watering-system-that-is-connected-to-azure-iot-central/sketch_aug23a.ino" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

> While talking about the accuracy, the capacitive soil moisture sensor is not so much accurate as expected. But you can do the calibration to get the closest accurate reading. Just upload the simple code to NodeMCU and check the sensor analog reading when the sensor is in dry air and when the sensor is in water. From here you can find the maximum and minimum analog value that can be mapped to percentage value from 0% to 100% as per program.

Quote taken from [here](https://how2electronics.com/capacitive-soil-moisture-sensor-esp8266-esp32-oled-display#Capacitive_Soil_Moisture_Sensor_Calibration).

When the program runs, this is what I see,
<img src="\img\2020\09\13\how-to-make-an-automotive-wi-fi-plant-watering-system-that-is-connected-to-azure-iot-central/moisture percentage.gif" alt="moisture percentage">

The moisture percentage gets close to 100% when the Capacitive Soil Moisture Sensor Module is in the water and goes down to percentage near to 0% when the Capacitive Soil Moisture Sensor Module is in the dry air.

Next, I need to make sure when the Capacitive Soil Moisture Sensor Module detects that our soil is dry at a certain percentage, I would let the water pumps water our plant. To do that, I need to connect the ESP8266 with a Relay Module so that it can turn on or off based on the value I read from the Capacitive Soil Moisture Sensor Module.

Here is how I set it up so that the Relay Module can switch on or off based on how dry the soil is.

<img src="\img\2020\09\13\how-to-make-an-automotive-wi-fi-plant-watering-system-that-is-connected-to-azure-iot-central/Capacitive-Soil-Moisture-Sensor-ESP8266 diagram with relay.JPG" alt="Capacitive-Soil-Moisture-Sensor-ESP8266 diagram with relay">

The above picture is taken and modified from WayinTop.

In words,

1. The AOUT pin on the Capacitive Soil Moisture Sensor Module connects to pin A0 on the ESP8266.
2. The GND pin on the Capacitive Soil Moisture Sensor Module connects to a GND pin on the ESP8266.
3. The VCC pin on the Capacitive Soil Moisture Sensor Module connects to a 3v3 pin on the ESP8266.
4. The VCC pin on the Relay Module connects to a 3v3 pin on the ESP8266.
5. The GND pin on the Relay Module connects to a GND pin on the ESP8266.
6. The IN pin on the Relay Module connects to pin D2 on the ESP8266.
7. The NO pin on the Relay Module connects to the red wire on the Water Pumps.
8. The COM pin on the Relay Module connects to a 3v3 pin on the ESP8266.
9. The black wire on the Water Pumps connects to a GND pin on the ESP8266.

Here is what I wrote in Arduino IDE,
{% highlight java %}
const int AirValue = 640; // you might need to calibrate this number, instruction is down below
const int WaterValue = 353; // you might need to calibrate this number, instruction is down below
const int DrySoilMoisturePercentage = 50;
const int SoilMoisturePin = A0;
const int RelayPin = D2;
int soilMoistureValue = 0;
int soilmoisturepercent = 0;

void setup() {
  Serial.begin(115200);
  pinMode(SoilMoisturePin, INPUT);
  pinMode(RelayPin, OUTPUT);
  digitalWrite(RelayPin, HIGH);
}

void loop() {
  soilMoistureValue = analogRead(SoilMoisturePin);
  soilmoisturepercent = map(soilMoistureValue, AirValue, WaterValue, 0, 100);
  Serial.print(soilmoisturepercent);
  Serial.println("%");
  if (soilmoisturepercent <= DrySoilMoisturePercentage) {
    Serial.println("Water pumps running...");
    digitalWrite(RelayPin, LOW);
    delay(5000);
  }
  Serial.println("Water pumps stopped...");
  digitalWrite(RelayPin, HIGH);
  delay(60000);
}
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2020/09/13/how-to-make-an-automotive-wi-fi-plant-watering-system-that-is-connected-to-azure-iot-central/sketch_aug23b.ino" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

Let me quickly explain what this code does,

Initially, the Relay Module is set to be off. Every 60 seconds, it will check the soil dryness percentage. If the soil dryness percentage fall below 51%, it will water the plant for 5 seconds before it is turn off (I only water for 5 seconds because I want to prevent overwatering).

Here is what it looks like in real life,

<img src="\img\2020\09\13\how-to-make-an-automotive-wi-fi-plant-watering-system-that-is-connected-to-azure-iot-central/ESP8266 without plant real life.jpg" alt="ESP8266 without plant real life">
<img src="\img\2020\09\13\how-to-make-an-automotive-wi-fi-plant-watering-system-that-is-connected-to-azure-iot-central/ESP8266 with plant real life.jpg" alt="ESP8266 with plant real life">

Now, I just need to figure out how to send data to [Azure IoT Central](https://azure.microsoft.com/services/iot-central).

First, you need to create an [Azure IoT Central](https://azure.microsoft.com/services/iot-central) app, check out [this](https://docs.microsoft.com/azure/iot-central/core/quick-deploy-iot-central) doc.<br>
Second, you need to create a [Device Templates](https://docs.microsoft.com/azure/iot-central/core/concepts-device-templates) in the Azure IoT Central app by following this wonderful [doc](https://docs.microsoft.com/azure/iot-central/core/howto-set-up-template#create-a-device-template-from-scratch) (Remember to simply select IoT device for the custom device template). Once it is created successfully, follow [this](https://docs.microsoft.com/azure/iot-central/core/howto-set-up-template#create-a-capability-model) doc to create a capability model by importing [this](https://github.com/poanchen/code-for-blog/blob/master/2020/09/13/how-to-make-an-automotive-wi-fi-plant-watering-system-that-is-connected-to-azure-iot-central/Automotive Wi-Fi Plant Watering System.json) JSON file. At the end, it should look something similar to this.

<img src="\img\2020\09\13\how-to-make-an-automotive-wi-fi-plant-watering-system-that-is-connected-to-azure-iot-central/device template create.JPG" alt="device template create">

Notice that I have two of the telemetry, one will tell me the soil dryness percentage while the other one tell me the time when the system water them.

Third, I need to create a device based on the Device Templates that I created in the prior step. It would look something like this.

<img src="\img\2020\09\13\how-to-make-an-automotive-wi-fi-plant-watering-system-that-is-connected-to-azure-iot-central/device create.JPG" alt="device create">

Forth, you need to follow [this](https://github.com/Azure/iotc-device-bridge#azure-iot-central-device-bridge) doc to create a bridge between your Arduino project and the Azure IoT Central by creating the necessary resources in [Microsoft Azure Portal](https://azure.microsoft.com/features/azure-portal/).

Assuming that you have followed the steps above, you should have these resources created. (name may vary)

<img src="\img\2020\09\13\how-to-make-an-automotive-wi-fi-plant-watering-system-that-is-connected-to-azure-iot-central/iotc resources.JPG" alt="iotc resources">

Now that I have the [Azure Functions](https://azure.microsoft.com/services/functions) running, let's go ahead and write the code to send the data.

Here is what I wrote in Arduino IDE,
{% highlight java %}
#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>

const int AirValue = 640; // you might need to calibrate this number, instruction is down below
const int WaterValue = 353; // you might need to calibrate this number, instruction is down below
const int DrySoilMoisturePercentage = 50;
const int SoilMoisturePin = A0;
const int RelayPin = D2;
int soilMoistureValue = 0;
int soilmoisturepercent = 0;
int plantJustWatered = 0;

void setup() {
  Serial.begin(115200);
  WiFi.begin("Wi-Fi name", "Wi-Fi password");
  pinMode(SoilMoisturePin, INPUT);
  pinMode(RelayPin, OUTPUT);
  digitalWrite(RelayPin, HIGH);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Waiting for connection...");
  }
}

void loop() {
  soilMoistureValue = analogRead(SoilMoisturePin);
  soilmoisturepercent = map(soilMoistureValue, AirValue, WaterValue, 0, 100);
  Serial.print(soilmoisturepercent);
  Serial.println("%");
  plantJustWatered = 0;
  if (soilmoisturepercent <= DrySoilMoisturePercentage) {
    Serial.println("Water pumps running...");
    digitalWrite(RelayPin, LOW);
    delay(3500);
    plantJustWatered = 1;
  }
  Serial.println("Water pumps stopped...");
  digitalWrite(RelayPin, HIGH);
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    // get the Azure Functions url by following this doc, https://docs.microsoft.com/azure/azure-functions/functions-create-first-azure-function#test-the-function
    http.begin("http://iotc-fnce72a5dmyl4xs.azurewebsites.net/api/IoTCIntegration?code=1v//IKFDfdJKOdfdsoMKlkpJNOfdoOrpIWuystxtBHJUds==");
    http.addHeader("Content-Type", "application/json");
    // you can get your deviceId by going over this doc, https://docs.microsoft.com/azure/iot-central/core/concepts-get-connected#connect-a-single-device
    String moistureData = "{\"device\": {\"deviceId\": \"1wc1sdkminp\"},\"measurements\": {\"MoisturePercentage\": \"" + String(soilmoisturepercent) + "\", \"PlantJustWatered\": \"" + String(plantJustWatered) + "\"}}";
    int httpCode = http.POST(moistureData);
    if (httpCode == 200) {
      Serial.println("Moisture data sent successfully...");
    } else {
      Serial.println("Moisture data failed to send...");  
    }
    http.end();
  }
  delay(60000);
}
{% endhighlight %}
<a href="https://github.com/poanchen/code-for-blog/blob/master/2020/09/13/how-to-make-an-automotive-wi-fi-plant-watering-system-that-is-connected-to-azure-iot-central/sketch_aug23c.ino" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

Let me quickly explain what this code does, (other than the code I wrote earlier)

Initially, it would try to connect to your home Wi-Fi. It won't start the program until Wi-Fi is connected. Once connected, it would send two telemetry over, namely the MoisturePercentage and PlantJustWatered. MoisturePercentage will most likely be a number from 0 to 100 while the PlantJustWatered is simply a boolean with value 0 and 1.

If you set up your own personal dashboard, your data would look something similar to this.

<img src="\img\2020\09\13\how-to-make-an-automotive-wi-fi-plant-watering-system-that-is-connected-to-azure-iot-central/dashboard.JPG" alt="dashboard">

Tada! You are done! Simply sit back and relax and watch the plant watering system do all the work for you!

## Wrapping Up

Hopefully you enjoyed this article and will inspire you to build your own automative Wi-Fi plant watering system that is connected to Azure IoT Central. Let me know if this helps you. Thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [let us know](https://github.com/poanchen/poanchen.github.io/issues/new?title=&body=%0A%0A%0A%5BEnter+feedback+here%5D%0A%0A%0A---%0A%23%23%23%23+Document+Details%0A%0A%E2%9A%A0+*Do+not+edit+this+section.*%0A%0A*+Blog+URL%3A+%5B{{ page.title }}%5D({{ site.url }}{{ page.url }})%0A*+GitHub+Source+URL%3A+%5B{{ page.url | split: "/" | slice: 5}}.md%5D(https://github.com/poanchen/poanchen.github.io/blob/will-jekyll-template/_posts/{{ page.date | date: "%Y-%m-%d" }}-{{ page.url | split: "/" | slice: 5}}.md)).

### Getting started

* [Quick Start to Nodemcu (ESP8266) on Arduino IDE](https://www.instructables.com/id/Quick-Start-to-Nodemcu-ESP8266-on-Arduino-IDE) by [Magesh Jayakumar](https://www.instructables.com/member/Magesh+Jayakumar).
* [Capacitive Soil Moisture Sensor with ESP8266/ESP32 & OLED Display](https://how2electronics.com/capacitive-soil-moisture-sensor-esp8266-esp32-oled-display/) by Mr. Alam.
* [1 channel Plant Watering System with Arduino UNOR3](https://github.com/poanchen/code-for-blog/blob/master/2020/09/13/how-to-make-an-automotive-wi-fi-plant-watering-system-that-is-connected-to-azure-iot-central/1 channel Plant Watering System with Arduino UNO R3 and ESP8266.pdf) by WayinTop.
