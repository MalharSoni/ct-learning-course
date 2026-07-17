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
| 1.6 | **C** | Live shafts connect two rotating objects (motor→wheel) |
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
- Rolling-straight push test (push the unpowered robot and watch drift)
- Free-spin test on each wheel to compare friction
- Swap/compare motor sides

---

## Section 2 — Unit 1: Common Parts, Tools & Fabrication

| Q | Answer | Notes |
|---|--------|-------|
| 2.1 | **B** | Spacers/washers fill space along the shaft or screw so components stay put without metal-on-metal rub |
| 2.2 | **B** | Boxing: standoffs tie parallel channels/plates into a rigid box that resists twisting |
| 2.3 | **B** | Screw joint = pivot around a stationary screw; usable where no live shaft is needed; doubles as a crossmember |
| 2.4 | **B** | No bearing needed at the motor — it supports the shaft internally; extra bearings = extra friction |
| 2.5 | **B** | Red = 100 RPM, Green = 200 RPM, Blue = 600 RPM |
| 2.6 | **B** | 11W: swappable 100/200/600 RPM cartridges; 5.5W: fixed 200 RPM |
| 2.7 | **B** | Nested channels reinforce each other — no crushing in the vice, straight and square cut |
| 2.8 | **B** | Filing smooths the cut edge, removes burrs, fine-tunes final size |

**2.9** *(4 pts — 1 pt per step)*
Sample full-credit process:
1. Measure and mark the cut line (1 pt)
2. Couple/nest a second C-channel with the one being cut for rigidity (1 pt)
3. Clamp the pair securely in the vice close to the cut line and cut with steady full strokes (1 pt)
4. File the cut edge smooth to remove burrs and reach final size (1 pt)

**2.10** *(5 pts — 2 + 2 + 1)*
- Bearings ARE needed where the shaft passes through each C-channel wall (both walls), so the live shaft spins smoothly (2 pts)
- A bearing is NOT needed at the motor — the motor supports the shaft internally (2 pts)
- More bearings than required just add unnecessary friction (1 pt)

---

## Section 3 — Unit 3: CAD & 3D Printing

| Q | Answer | Notes |
|---|--------|-------|
| 3.1 | **B** | Model in Parts Studios, mate in Assemblies |
| 3.2 | **B** | Mate connector = point with position + orientation where mates attach |
| 3.3 | **B** | Fastened = rigid, zero degrees of freedom |
| 3.4 | **B** | Revolute = one rotational degree of freedom about a single axis |
| 3.5 | **B** | Wheel spins → revolute; screwed structure → fastened |
| 3.6 | **A** | MKCAD (plus CautionTape-specific libraries) |
| 3.7 | **C** | STL is the 3D printing export format |
| 3.8 | **B** | Slicer converts the model to layer-by-layer G-code using layer height, infill, supports, etc. |
| 3.9 | **B** | Past ~45° each layer overhangs too far and droops without supports |
| 3.10 | **A** | Lower infill = lighter/faster/cheaper but weaker |

**3.11** *(5 pts — 3 for part a, 2 for part b)*
(a) Revolute mates at each of the four pivots (each linkage joint rotates about one axis); fastened mates for the screwed structural joints (rigid, zero degrees of freedom) (3 pts — 1 pt each for revolute, fastened, and correct reasoning)
(b) Any two (1 pt each):
- Orient the print so layer lines run perpendicular to the load (parts split along layer lines)
- Avoid overhangs past 45°, or add supports/chamfer them away
- Raise infill percentage (or wall count) on load-bearing parts for strength
- Oversize holes slightly so shafts and screws fit after printing (printed holes shrink)

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
- Cross-brace or box the lift with standoffs against twisting
- Use screw joints instead of loose axles at the pivots
- Fix spacing/add washers or spacers so joints don't bind
- Ensure both sides are geared/linked identically so they move together
- Correct gearing for torque so motors aren't stalling and flexing the structure

**4.10** *(5 pts — 3 for sequence, 2 for toggle)*
Sequence (3 pts): run intake motor until object is captured (timed or sensor-confirmed) → stop/hold intake → drive lift motor to target height (timed movement or encoder target), using hold mode to keep position → reverse/open intake to drop the object → return lift down / reset.
Controller feature (2 pts): a **button toggle** — first press starts the intake to grab, second press of the same button releases (tracked with a boolean/state variable in code).

---

### Score Summary Table

| Section | Topic | /25 |
|---------|-------|-----|
| 1 | Drivetrain Mastery | |
| 2 | Common Parts, Tools & Fabrication | |
| 3 | CAD & 3D Printing | |
| 4 | Manipulators & Mechanisms | |
| **Total** | **(pass = 80)** | **/100** |
