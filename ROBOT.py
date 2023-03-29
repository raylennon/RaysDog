#!/usr/bin/env python
from importlib import import_module
import os
from flask import Flask, render_template, Response
import base64

# import camera driver
if os.environ.get('CAMERA'):
    Camera = import_module('camera_' + os.environ['CAMERA']).Camera
else:
    from camera import Camera

# Raspberry Pi camera module (requires picamera package)
# from camera_pi import Camera

import time
import numpy as np
import cv2
import time

from board import SCL, SDA
import busio

# Import the PCA9685 module. Available in the bundle and here:
#   https://github.com/adafruit/Adafruit_CircuitPython_PCA9685
from adafruit_pca9685 import PCA9685
from adafruit_motor import motor

#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
i2c = busio.I2C(SCL, SDA)
# Create a simple PCA9685 class instance for the Motor FeatherWing's default address.
pca = PCA9685(i2c, address=0x60)
pca.frequency = 100

# Motor 1 is channels 9 and 10 with 8 held high.
# Motor 2 is channels 11 and 12 with 13 held high.
# Motor 3 is channels 3 and 4 with 2 held high.
# Motor 4 is channels 5 and 6 with 7 held high.

pca.channels[2].duty_cycle = 0xFFFF
pca.channels[7].duty_cycle = 0xFFFF
motor3 = motor.DCMotor(pca.channels[3], pca.channels[4])
motor4 = motor.DCMotor(pca.channels[5], pca.channels[6])
motor3.decay_mode = (motor.SLOW_DECAY)  # Set motor to active braking mode to improve performance
motor4.decay_mode = (motor.SLOW_DECAY)
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app = Flask(__name__)#,static_folder='static')


@app.route('/')
def index():
    """Video streaming home page."""
    return render_template('index.html')


def gen(camera):
    """Video streaming generator function."""
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/go_<cmd>')
def command(cmd=None):
    r = cmd.lower()
    if cmd=="forward":
        motor3.throttle = motor4.throttle = 1
    elif cmd=="stop":
        motor3.throttle = motor4.throttle = 0
    elif cmd=="back":
        motor3.throttle = motor4.throttle = -1
    elif cmd=="left":
        motor3.throttle = 1
        motor4.throttle = -1
    elif cmd=="right":
        motor3.throttle = 1
        motor4.throttle = -1
    return r

@app.route('/video_feed')
def video_feed():
    """Video streaming route. Put this in the src attribute of an img tag."""
    return Response(gen(Camera()),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(host='0.0.0.0', threaded=True, port=80)