# CTRC V5 Foundation Program — Unit Test

**Caution Tape Robotics Club — Merging Program**

| | |
|---|---|
| **Student Name** | ______________________________ |
| **Date** | ______________________________ |
| **Total Marks** | 100 points (25 per section) |
| **Passing Score** | 80 points |
| **Time Limit** | 75 minutes |

This test covers the four core units of the V5 Foundation Program. Answer every question. For multiple choice, circle **one** answer unless the question says otherwise. Show your work on calculation questions.

---

## Section 1 — Unit 1: Drivetrain Mastery (25 points)

### Multiple Choice (2 points each)

**1.1** What is the difference between trackwidth and wheelbase?

- A) Trackwidth is front to back; wheelbase is side to side
- B) Trackwidth is side to side; wheelbase is front to back
- C) They are two names for the same measurement
- D) Trackwidth only applies to omni wheels

**1.2** A robot keeps tipping forward when it stops suddenly. Which change would MOST directly reduce tipping?

- A) Adding more bearings to the drive shafts
- B) Lowering the center of mass and keeping it between the wheels
- C) Switching from 4 wheels to omni corners
- D) Increasing the motor cartridge speed

**1.3** Which of the following is an advantage of a 6-wheel drivetrain over a 4-wheel drivetrain?

- A) It is simpler to build
- B) It has less friction
- C) It has more traction
- D) It is always faster

**1.4** What is the purpose of a "drop center" on a 6-wheel drivetrain?

- A) It lowers the battery closer to the ground
- B) The middle wheels become the main traction and driving contact points, letting the outer wheels act as low-friction followers for more mobile turning
- C) It allows the robot to drive over obstacles taller than the wheels
- D) It removes the need for bearings on the middle wheels

**1.5** A drivetrain with **traction wheels on all positions** is best described as:

- A) Low friction — very agile but easily pushed by other robots
- B) High friction — less mobile but very resistant to pushes from other robots
- C) Frictionless — ideal for skills runs
- D) Identical in behavior to an all-omni setup

**1.6** When is a **live shaft** (and therefore a bearing) required?

- A) On every joint of the robot, always
- B) Only on structural crossmembers
- C) Whenever a shaft connects two rotating objects, such as a motor to a wheel
- D) Only when using pneumatics

**1.7** During competition maintenance, which THREE items does the curriculum say to check on? *(Circle one answer)*

- A) Overheating motors, loosening screws, shaft collar creep
- B) Battery voltage, radio channel, brain firmware
- C) Wheel color, chain tension, controller batteries
- D) Field tiles, license plates, driver station cables

**1.8** According to the Unit 1 curriculum, what is described as "the biggest enemy of all" in drivetrain building?

- A) Weight
- B) Friction
- C) Cost
- D) Wiring

### Short Answer

**1.9** *(4 points)* Compare a **wide trackwidth** robot to a **long wheelbase** robot: give one benefit of each geometry.

**1.10** *(5 points)* Your drivetrain rolls freely but veers to the left when driving straight. List **two** likely mechanical causes and **one** test you could perform to diagnose the problem.

---

## Section 2 — Unit 2: Programming Foundations (25 points)

### Multiple Choice (2 points each)

**2.1** In Object-Oriented Programming, a **class** is best described as:

- A) A single line of code that runs once
- B) A blueprint that defines the variables and methods of an object
- C) A type of loop
- D) A file that stores motor ports

**2.2** What is **encapsulation**?

- A) Wrapping wires in electrical tape
- B) Keeping an object's data and the methods that operate on it together, hiding internal details from outside code
- C) Copying and pasting code between projects
- D) Running two programs at the same time

**2.3** In a robot state machine with states `IDLE`, `LIFTING`, and `PLACING`, what causes the robot to move between states?

- A) Nothing — states are fixed at startup
- B) Controller input or autonomous triggers/conditions
- C) The battery level
- D) Recompiling the program

**2.4** What is the purpose of a command class like `LiftCommand` or `ClawCommand`?

- A) To store the robot's battery statistics
- B) To encapsulate a single robot action so it can be reused and organized cleanly
- C) To replace the need for motors
- D) To make the code run faster on the V5 brain

**2.5** While testing state transitions, what simple debugging technique does the curriculum recommend to confirm the robot changed states?

- A) Watching the motor LEDs
- B) Printing messages to the console
- C) Removing all sensors
- D) Restarting the brain after every run

**2.6** Which line of pseudocode correctly represents the transition logic taught in Unit 2?

- A) `if state == LIFTING → move lift motor`
- B) `while battery > 50 → state = LIFTING`
- C) `state = LIFTING + PLACING`
- D) `move motor → then check state`

**2.7** A limit switch is added so the lift stops automatically at the top. This is an example of:

- A) Open-loop control
- B) Sensor feedback integration
- C) Driver control
- D) Encapsulation

**2.8** Which programming environment does the Foundation Program use for text-based programming?

- A) Scratch
- B) VEXcode V5 Text (C++)
- C) RobotC for Cortex
- D) MATLAB

### Short Answer

**2.9** *(4 points)* Name the three robot behavior states used as the example in Unit 2, and describe what a **state machine** is in one or two sentences.

**2.10** *(5 points)* You are writing an autonomous routine that picks up an object and places it on a platform. Describe the sequence of state transitions your robot would go through, and name **one** sensor you could add to make the sequence more reliable (explain what it would do).

---

## Section 3 — Unit 3: CAD and Machining (25 points)

### Multiple Choice (2 points each)

**3.1** Which CAD platform does the Foundation Program use?

- A) Fusion 360
- B) SolidWorks
- C) Onshape
- D) TinkerCAD

**3.2** Why do engineers CAD their robots before building? *(Best answer)*

- A) It is required by the VEX game manual
- B) Precision, collaboration, iteration, and documentation
- C) It makes the robot lighter
- D) CAD replaces the need for testing

**3.3** In Onshape, where are individual parts modeled, and where are they mated together?

- A) Parts are modeled in Assemblies; mated in Parts Studios
- B) Parts are modeled in Parts Studios; mated in Assemblies
- C) Both happen in the Drawing tab
- D) Onshape does not support assemblies

**3.4** Which part library is named in the curriculum for inserting VEX components into Onshape?

- A) MKCAD
- B) GrabCAD
- C) Thingiverse
- D) McMaster-Carr

**3.5** What file format do you export from Onshape to send a custom part to the CNC?

- A) .stl
- B) .pdf
- C) .dxf
- D) .docx

**3.6** Before drilling a hole in aluminum, you should first:

- A) Sand the surface with the belt sander
- B) Center punch the hole location (and use a pilot hole for accuracy)
- C) Heat the metal
- D) File the edges

**3.7** What is **deburring**?

- A) Removing sharp leftover material from drilled holes and cut edges
- B) Painting the part
- C) Measuring the part with calipers
- D) Exporting the CAD file

**3.8** After test-fitting a machined part on the robot, you discover the holes are slightly misaligned. According to the Unit 3 workflow, what should you do?

- A) Force the screws in with a bigger driver
- B) Throw the part away and start a new design from scratch
- C) Diagnose the misalignment, adjust the CAD (tolerances/hole placement), and re-machine if necessary
- D) Ignore it — small misalignments never matter

### Short Answer

**3.9** *(4 points)* Name **two** hand-finishing tools/techniques from Lesson 3 (drilling, filing, sanding) and state what each is used for.

**3.10** *(5 points)* What is a **tolerance** in CAD, and why does it matter when designing a custom bracket with holes for shafts and screws? Give one example of a tolerance decision you would make.

---

## Section 4 — Unit 4: Manipulators & Mechanisms (25 points)

### Multiple Choice (2 points each)

**4.1** Which of the following lists contains ONLY lift mechanisms?

- A) Four-bar, six-bar, DR4B, linear lift
- B) Flywheel, puncher, catapult
- C) Roller, claw, passive intake
- D) Tank drive, X-drive, mecanum

**4.2** You gear a lift motor for more **torque**. What happens to its output speed?

- A) It increases
- B) It decreases
- C) It stays the same
- D) Torque and speed are unrelated

**4.3** A 12-tooth pinion drives an 84-tooth gear on a lift arm. What is the gear ratio, and what does it do?

- A) 1:7 for speed — the arm spins 7× faster
- B) 7:1 for torque — the arm turns 7× slower but with about 7× the torque
- C) 84:12 for speed
- D) 1:1 — tooth count doesn't matter

**4.4** Why are rubber bands often added to lift mechanisms?

- A) To make the robot legal for competition
- B) To counterbalance the lift's weight so the motors work less
- C) To increase friction in the joints
- D) For decoration

**4.5** What is **compression** in an intake system?

- A) The amount the intake squeezes/grips the game object between rollers and a surface
- B) Compressing air for pneumatics
- C) Reducing the file size of your CAD
- D) Folding the intake for size limits

**4.6** What is the difference between an **active** and a **passive** intake?

- A) Active intakes are powered (e.g., motorized rollers); passive intakes use no motor (e.g., hooks, scoops, gravity)
- B) Active intakes are made of metal; passive intakes are plastic
- C) Passive intakes are always better
- D) There is no difference

**4.7** In VEXcode, what is the difference between motor **hold** mode and **coast** mode when the motor stops?

- A) Hold actively resists movement and holds position; coast lets the mechanism spin/drift freely
- B) Coast holds position; hold lets it drift
- C) Both behave identically
- D) Hold turns the motor off permanently

**4.8** For a lift arm pivot that does NOT need to transfer rotation through the shaft, the curriculum recommends considering:

- A) A rubber axle
- B) A screw joint instead of an axle
- C) Removing the pivot entirely
- D) Two motors on the same axle

### Short Answer

**4.9** *(4 points)* Your four-bar lift twists side to side and binds when raising. Using Unit 4 concepts, give **two** specific fixes.

**4.10** *(5 points)* Describe the automated sequence from Lesson 4 (*intake object → lift to height → drop object*) in terms of what the code must do at each step. Include the controller feature you would use for driver-assisted intake control (grab on one press, release on the next).

---

*End of test. Check that you answered all 40 questions before submitting.*
