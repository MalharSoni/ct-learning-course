# CTRC V5 Foundation Program — Unit Test ANSWER KEY

**Instructor use only.** Total: 100 points, 25 per section. Passing: 80 (matches the program's 24/30 rubric bar of 80%).

Marking guidance for short answers: award partial credit where indicated. Accept any answer that demonstrates the underlying concept even if the wording differs from the samples below.

---

## Section 1 — Unit 1: Drivetrain Mastery

| Q | Answer | Notes |
|---|--------|-------|
| 1.1 | **B** | Trackwidth = side to side, wheelbase = front to back |
| 1.2 | **B** | CoM acts as a lever over the wheels during momentum changes; lower and more centered = less tippy |
| 1.3 | **C** | 6 wheels: more traction, more complex, more friction |
| 1.4 | **B** | Drop center: middle wheels carry traction, outer wheels are low-friction followers |
| 1.5 | **B** | All-traction = high friction, push-resistant, less mobile (wheel rub also overheats motors faster) |
| 1.6 | **C** | Live shafts connect two rotating objects (motor→wheel); they require bearings to spin freely |
| 1.7 | **A** | Overheating motors (hotswap/compressed air), loosening screws (Loctite), shaft collar creep |
| 1.8 | **B** | "Friction. The biggest enemy of all." |

**1.9** *(4 pts — 2 per geometry)*
- Wider trackwidth: more stable / requires less turning effort (2 pts)
- Longer wheelbase: naturally drives straighter (2 pts)

**1.10** *(5 pts — 2 + 2 + 1)*
Any two causes (2 pts each), e.g.:
- Uneven friction between left and right sides (over-tightened spacing, missing washers/bearings on one side)
- Frame not square (poor squaring during assembly)
- Bent shaft or shaft collar rubbing on one side
- Uneven weight distribution / CoM offset over one side
- One motor weaker/overheating

Any one diagnostic test (1 pt), e.g.:
- Rolling-straight test (push the unpowered robot and watch drift)
- Free-spin test on each wheel to compare friction
- Swap/compare motor sides

---

## Section 2 — Unit 2: Programming Foundations

| Q | Answer | Notes |
|---|--------|-------|
| 2.1 | **B** | A class is a blueprint defining variables (data) and methods (behavior) |
| 2.2 | **B** | Encapsulation = bundling data + methods, hiding internals |
| 2.3 | **B** | Controller input or autonomous triggers cause state transitions |
| 2.4 | **B** | Command classes encapsulate one action for reuse and organization |
| 2.5 | **B** | Console prints to confirm state transitions |
| 2.6 | **A** | `if state == LIFTING → move motor` is the taught transition logic |
| 2.7 | **B** | Limit switch stopping the lift = sensor feedback integration |
| 2.8 | **B** | VEXcode V5 Text (C++) |

**2.9** *(4 pts — 2 for states, 2 for definition)*
- States: **IDLE, LIFTING, PLACING** (2 pts; all three needed for full marks, 1 pt for two)
- State machine: a program structure where the robot is always in exactly one defined state, and moves between states when conditions/inputs trigger a transition; behavior depends on the current state (2 pts)

**2.10** *(5 pts — 3 for sequence, 2 for sensor)*
Sample sequence (3 pts): start in IDLE → transition to an intake/grab state when the routine begins → LIFTING (raise lift to target height) → PLACING (release object) → return to IDLE. Accept any coherent ordering that shows discrete states with triggered transitions.
Sensor (2 pts), e.g.: limit switch to stop the lift at exact height; bumper/distance sensor to confirm object is captured before lifting; encoder feedback to verify lift position.

---

## Section 3 — Unit 3: CAD and Machining

| Q | Answer | Notes |
|---|--------|-------|
| 3.1 | **C** | Onshape |
| 3.2 | **B** | Precision, collaboration, iteration, documentation |
| 3.3 | **B** | Model in Parts Studios, mate in Assemblies |
| 3.4 | **A** | MKCAD (plus CautionTape-specific libraries) |
| 3.5 | **C** | DXF export for CNC cutting |
| 3.6 | **B** | Center punch, then pilot hole for accuracy |
| 3.7 | **A** | Removing sharp leftover material (burrs) from holes/edges |
| 3.8 | **C** | Diagnose via CAD, adjust tolerances/hole placement, re-machine if needed |

**3.9** *(4 pts — 2 per tool: 1 for naming, 1 for use)* Any two of:
- Drill press / drill bits (twist, step bit): making accurate holes; clamp work, correct speed
- Files (flat, round, half-round): smoothing edges, precise dimensioning, deburring holes
- Belt sander: cleaning aluminum edges to professional finish, sneaking up on accurate part size
- Center punch: marking hole locations so the bit doesn't wander

**3.10** *(5 pts — 3 for definition/why, 2 for example)*
- Tolerance = the allowable variation between the designed dimension and the real part; matters because parts must physically fit — holes must clear screws/shafts, and CNC/drilling isn't perfectly exact (3 pts)
- Example (2 pts), e.g.: making a shaft hole slightly oversized so the shaft spins freely; sizing screw holes for clearance vs. thread engagement; leaving alignment-hole spacing to match VEX 0.5" hole pitch

---

## Section 4 — Unit 4: Manipulators & Mechanisms

| Q | Answer | Notes |
|---|--------|-------|
| 4.1 | **A** | Four-bar, six-bar, DR4B, linear lift (B = shooters, C = intakes, D = drivetrains) |
| 4.2 | **B** | Torque up = speed down; it's a trade-off |
| 4.3 | **B** | 84/12 = 7:1 for torque; output turns 7× slower with ~7× torque |
| 4.4 | **B** | Rubber bands counterbalance lift weight, reducing motor load |
| 4.5 | **A** | Compression = squeeze/grip on the game object (proper roller spacing) |
| 4.6 | **A** | Active = powered (motorized rollers); passive = unpowered (hooks, scoops, gravity) |
| 4.7 | **A** | Hold resists and holds position; coast drifts freely |
| 4.8 | **B** | Screw joints for pivots where a live shaft isn't needed |

**4.9** *(4 pts — 2 per fix)* Any two of:
- Brace the lift against twisting (cross-bracing/boxing between the two sides)
- Use screw joints instead of loose axles at the pivots
- Fix spacing/add washers or bearings so joints don't bind
- Ensure both sides are geared/linked identically so they move together
- Correct gearing for torque so motors aren't stalling and flexing the structure

**4.10** *(5 pts — 3 for sequence, 2 for toggle)*
Sequence (3 pts): run intake motor until object is captured (timed or sensor-confirmed) → stop/hold intake → drive lift motor to target height (timed movement or encoder target), using hold mode to keep position → reverse/open intake to drop the object → return lift down / reset.
Controller feature (2 pts): a **button toggle** — first press starts the intake to grab, second press of the same button releases (tracked with a boolean/state variable in code).

---

### Score Summary Table

| Section | Unit | /25 |
|---------|------|-----|
| 1 | Drivetrain Mastery | |
| 2 | Programming Foundations | |
| 3 | CAD and Machining | |
| 4 | Manipulators & Mechanisms | |
| **Total** | **(pass = 80)** | **/100** |
