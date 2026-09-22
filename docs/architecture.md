# ADITI Architecture
## Full Name
            Ai driven Data, Information & Technology Integaration
## Overview
           ADITI (Ai driven Data, Information and Tech Integration) is a modular architecture designed for an intelligent assistive system for visually impaired users.

The architecture integrates camera data, sensor data, artificial intelligence, decision making, and user feedback into a single modular processing system.

The system is designed so that individual modules can be developed, tested, replaced, or expanded without requiring major changes to the complete architecture.

The prototype uses a central processing computer to handle sensor acquisition, camera processing, AI inference, decision making, and system coordination.

## Purpose 
            The purpose of ADITI (Artificial Data, Information and Tech Integration) is to provide a modular and efficient system architecture for an AI-based assistive device. It is designed to integrate sensor data, camera-based vision, artificial intelligence, processing, and user feedback into a single coordinated framework.

ADITI separates the system into functional modules so that different types of data can be processed according to their importance and context. Low-level sensor information such as motion, location, and environmental parameters can be handled independently from computationally intensive AI tasks such as object detection, object recognition, and visual analysis.

The architecture is designed to reduce unnecessary processing and user feedback by selecting and prioritizing the information that is most relevant to the current situation. Instead of continuously presenting every detected piece of information to the user, ADITI aims to provide meaningful outputs through appropriate feedback mechanisms such as audio, visual, or haptic feedback.

Another purpose of ADITI is to make the system modular, scalable, and easy to modify. Individual sensors, AI models, processing units, or output mechanisms can be replaced or upgraded without requiring a complete redesign of the system. This allows the prototype to initially operate with simulated data and later be extended to work with real hardware and sensors.

Therefore, ADITI acts as the software and system-level architecture that coordinates data acquisition, processing, AI-based interpretation, information prioritization, and user feedback, forming the foundation for the development of an intelligent assistive device.

## High Level Architecture
               ADITI follows the following processing flow:

Input Modules
        |
        v
Central Processing / AI Computer
        |
        v
AI Processing
        |
        v
Decision and Feedback Selection
        |
        v
Output Modules
            
## Input Modules
               The input layer provides information about the user's surrounding environment and system state.

The major input sources are:

- Camera
- IMU
- GPS
- Distance/proximity sensors
- Environmental sensors
- Other compatible sensors

## Processing Modules

 ### Camera Module

The camera provides visual information to the AI processing system.

The camera can be used for:

- Object detection
- Object recognition
- Text detection
- Scene understanding
- Visual environment analysis

Camera frames are provided to the AI module for processing.
 
### Sensor Module

The sensor module collects information from connected sensors.

Supported sensor categories include:

- IMU
- GPS
- Distance sensors
- Proximity sensors
- Temperature sensors
- Humidity sensors
- Pressure sensors

Sensor data is validated and converted into a structured format before being used by other modules.

 ### Central Processing / AI Computer

The central processing computer is responsible for coordinating the complete system.

For the prototype, a Raspberry Pi can be used for this purpose.

Its responsibilities include:

- Receiving sensor data
- Receiving camera frames
- Processing sensor information
- Running AI models
- Performing object detection
- Performing object recognition
- Performing text detection
- Combining sensor and AI information
- Running decision logic
- Managing feedback
- Monitoring system status

This design eliminates the requirement for a separate MCU processing layer in the current prototype.

 ### AI Processing Layer

The AI layer processes information obtained from the camera and other inputs.

Major functions include:

- Object detection
- Object recognition
- Text detection
- Scene analysis
- Confidence calculation
- Visual information extraction

The AI layer generates structured results instead of directly sending every detection to the user.

### Decision and Feedback Selection Layer

The decision layer determines which detected events are important enough to communicate to the user.

Events can be prioritized using:

- Confidence
- Importance
- Distance
- Urgency
- Repetition
- Current system state

The purpose of this layer is to prevent excessive and unnecessary feedback.

## Output Modules
                 The output layer communicates selected information to the user.

The major output types are:

### Audio

Used for:

- Object information
- Recognized text
- Important warnings
- Navigation-related information
- System notifications

### Haptic

Used for:

- Immediate alerts
- Proximity warnings
- Important environmental events

### Visual

Used mainly during development and monitoring.

The dashboard can display:

- Camera feed
- Detected objects
- AI confidence
- Sensor data
- System status
- Generated alerts

## Modular Design

                  ADITI is divided into independent modules.

The major modules are:

- Input Module
- Camera Module
- Sensor Module
- Communication Module
- AI Module
- Decision Module
- Feedback Module
- Monitoring Module
- Simulation Module

Each module communicates through defined interfaces.

Each module communicates through defined interfaces.

## Data Flow
                 The system follows this sequence:

1. Input devices generate data.
2. The input module receives the data.
3. Input data is validated.
4. Camera frames are passed to the AI module.
5. Sensor data is processed.
6. AI models analyze visual information.
7. AI results and sensor information are combined.
8. The decision module evaluates the generated events.
9. Important events are selected.
10. The feedback module generates appropriate outputs.
11. The monitoring interface displays the current system state.

 ## Design Goals

ADITI is designed to provide:

- Modularity
- Real-time processing
- Reduced unnecessary feedback
- Easy testing
- Easy hardware integration
- Expandability
- Hardware flexibility
- Separation of responsibilities
- Efficient information processing