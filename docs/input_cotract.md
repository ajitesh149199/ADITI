# ADITI Input Contract

## 1. Purpose

The input contract defines the structure, format, and validation requirements of information entering the ADITI system.

All input sources must provide information according to the defined contract.

The same contract can be used for both simulated inputs and real hardware inputs.

---

## 2. Input Categories

ADITI accepts the following input categories:

- Camera input
- IMU input
- GPS input
- Distance/proximity input
- Environmental sensor input
- System state input

---

## 3. Camera Input

Camera input contains image frames used by the AI module.

Required information:

- Frame
- Frame ID
- Timestamp
- Image dimensions

The system must verify that the received frame is valid before AI processing.

---

## 4. IMU Input

IMU input contains motion and orientation information.

Required fields:

- Accelerometer X
- Accelerometer Y
- Accelerometer Z
- Gyroscope X
- Gyroscope Y
- Gyroscope Z
- Timestamp

The values must use consistent units.

---

## 5. GPS Input

GPS input contains geographical information.

Required fields:

- Latitude
- Longitude
- Timestamp
- GPS status

Optional fields:

- Altitude
- Speed
- Heading

Invalid GPS information must be marked as unavailable.

---

## 6. Distance / Proximity Input

Distance or proximity sensors provide information about nearby objects.

Required fields:

- Distance
- Unit
- Timestamp
- Sensor status

Invalid or negative measurements must be rejected.

---

## 7. Environmental Input

Environmental sensors may provide:

- Temperature
- Humidity
- Atmospheric pressure

Each measurement must contain:

- Value
- Unit
- Timestamp
- Sensor status

---

## 8. Input Validation

Every input must be checked for:

- Missing values
- Invalid values
- Incorrect data types
- Invalid ranges
- Outdated timestamps
- Sensor failure

Invalid input must not be passed directly to the AI or decision module.

---

## 9. AI Input

The AI module receives:

- Camera frames
- Sensor context when required
- Current system state

The AI module must convert this information into structured AI results.

---

## 10. Simulation Compatibility

During minor-project development, simulated data can be used instead of physical sensors.

The simulator must generate data using the same structure as real inputs.

Therefore:

Simulation Input
        |
        v
Input Contract
        |
        v
ADITI Processing

and:

Real Hardware Input
        |
        v
Input Contract
        |
        v
ADITI Processing

Both input sources use the same interface.