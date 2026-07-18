# CTRC V5 Foundation Program — Unit Test ANSWER KEY

**Instructor use only.** Total: 100 points (25 + 25 + 25 + 25 across 4 sections). Passing: 80.

Multiple choice is worth 1 point per question. For short answers, award partial credit where indicated; accept any answer that demonstrates the underlying concept even if the wording differs from the samples below.

---

## Section 1 — Unit 1: Drivetrain Mastery

| Q | Answer | Notes |
|---|--------|-------|
| 1.1 | **B** | Trackwidth measures side to side; wheelbase measures front to back. |
| 1.2 | **B** | The center of mass acts as a lever over the wheels during momentum changes — lower and more centered means less tippy. |
| 1.3 | **B** | Wider trackwidth = more stable and less turning effort. |
| 1.4 | **A** | A longer wheelbase makes the robot naturally drive straighter. |
| 1.5 | **C** | 6 wheels give more traction, at the cost of complexity and friction. |
| 1.6 | **C** | 4-wheel drives are simpler and more mobile with less friction; 6-wheel gains traction. |
| 1.7 | **B** | Dropping the middle wheels makes them the main traction points while outer wheels follow with low friction. |
| 1.8 | **B** | All-traction is high friction: push-resistant but less mobile, and wheel rub can overheat motors faster. |
| 1.9 | **B** | Outer wheels travel the most during a turn — omnis there preserve mobility while central traction wheels keep grip. |
| 1.10 | **B** | Over-gearing loses torque — motors stall and overheat. Under-gearing wastes speed. |
| 1.11 | **B** | Wheel diameter multiplies into the effective ratio: bigger wheels = faster but less torque. |
| 1.12 | **C** | Live shafts connect two rotating objects (like motor to wheel); where they pass through structure they need bearings to spin freely. |
| 1.13 | **A** | Check overheating motors (hotswap or compressed air), screws loosening over time (Loctite), and shaft collar creep. |
| 1.14 | **B** | Hotswap with elastic-band-mounted motors or cool with compressed air. |
| 1.15 | **B** | "Build once, Loctite the 2nd" — Loctite keeps screws from loosening over time. |
| 1.16 | **B** | "Friction. The biggest enemy of all. Learn how to fix it, diagnose it, and avoid it." |

**1.17** *(4 pts)*
Wider trackwidth: more stable and requires less turning effort. Longer wheelbase: naturally drives straighter.

**1.18** *(5 pts)*
Causes (any two): uneven friction between sides (spacing, missing washers/bearings), frame not square, bent shaft or rubbing shaft collar, uneven weight distribution, one weak/overheating motor. Test (any one): rolling-straight push test, free-spin test on each wheel, swap motor sides and compare.

---

## Section 2 — Unit 1: Common Parts, Tools & Fabrication

| Q | Answer | Notes |
|---|--------|-------|
| 2.1 | **B** | Spacers and washers set friction-free spacing: components stay where they belong without sliding or grinding against structure. |
| 2.2 | **B** | Boxing with standoffs ties parallel members together so the joint acts like a rigid box instead of a flexible single wall. |
| 2.3 | **B** | Screw joints pivot around a stationary screw. They work anywhere a live shaft is not required and can double as structural crossmembers. |
| 2.4 | **B** | Nylock nuts hold their position without being torqued down, so the joint can pivot freely without the nut walking off. |
| 2.5 | **B** | The unthreaded shoulder acts as a precise, smooth pivot surface — less slop and wear than riding on threads. |
| 2.6 | **B** | Bearing flats give shafts a low-friction, supported hole so they spin true instead of wearing the channel. |
| 2.7 | **B** | Shaft collars stop shafts from sliding out of position — and they can creep loose, which is why you check them at competition. |
| 2.8 | **B** | The motor itself supports the shaft internally, so no bearing is needed at the motor. Extra bearings beyond what is required just add unnecessary friction. |
| 2.9 | **B** | Metal rubbing on metal adds friction and grinds parts down; spacers, washers, and bearings keep moving surfaces apart. |
| 2.10 | **B** | Red = 100 RPM (torque), Green = 200 RPM (standard), Blue = 600 RPM (speed). |
| 2.11 | **C** | The red 100 RPM cartridge trades speed for the most torque. |
| 2.12 | **B** | The 11W motor takes 100/200/600 RPM cartridges; the 5.5W motor has a fixed 200 RPM output and no swappable cartridge. |
| 2.13 | **B** | Half the power, smaller and lighter — 5.5W motors suit light mechanisms that do not need full 11W power. |
| 2.14 | **B** | Nesting the channels reinforces the thin walls so the vice cannot crush them, and the extra rigidity keeps the cut straight and square. |
| 2.15 | **B** | Hacksaw teeth point forward: apply steady pressure on the push stroke, using full-length strokes. |
| 2.16 | **B** | Filing cleans up the cut: it smooths sharp edges, removes burrs, and lets you sneak up on the final dimension. |

**2.17** *(4 pts)*
Mark the cut line, couple/nest a second C-channel with the one being cut for rigidity, clamp the pair securely in the vice close to the cut line, cut with steady full strokes on the marked line, then file the cut edge smooth to remove burrs and reach final size.

**2.18** *(5 pts)*
Bearings are needed where the shaft passes through each C-channel wall so the live shaft spins smoothly. No bearing is needed at the motor — the motor supports the shaft internally. Extra bearings beyond what is required just add unnecessary friction.

---

## Section 3 — Unit 3: CAD & 3D Printing

| Q | Answer | Notes |
|---|--------|-------|
| 3.1 | **B** | Model in Parts Studios; insert and mate in Assemblies. |
| 3.2 | **B** | Mate connectors are the snap points — each one carries a position and orientation that mates use to align parts. |
| 3.3 | **B** | Fastened removes all degrees of freedom — use it for parts that are screwed or fixed together. |
| 3.4 | **B** | Revolute leaves exactly one rotational degree of freedom — the mate for anything that spins or pivots. |
| 3.5 | **B** | Slider leaves one translational degree of freedom — the mate for linear slides and rails. |
| 3.6 | **C** | Cylindrical = rotation plus translation along one axis. |
| 3.7 | **B** | The wheel needs to rotate → revolute. The screwed structure must be rigid → fastened. |
| 3.8 | **C** | A linear lift stage translates along one axis → slider mate. |
| 3.9 | **B** | Fixing the first part anchors the assembly; without it the whole model can drift when you drag parts. |
| 3.10 | **B** | Dragging the assembly reveals its degrees of freedom — a correctly mated four-bar swings like the real one. |
| 3.11 | **B** | MKCAD supplies accurate VEX part models, so design time goes into the robot, not remodeling stock parts. |
| 3.12 | **C** | STL is the standard export format for 3D printing. |
| 3.13 | **B** | Slicing turns the model into layers and toolpaths — the printer instructions — based on settings like layer height, infill, and supports. |
| 3.14 | **B** | Each layer can only overhang the previous one a little; past ~45° there is not enough material underneath and the print sags. |
| 3.15 | **A** | Lower infill saves material and print time and reduces weight, at the cost of part strength. |
| 3.16 | **B** | Smaller layers = finer detail and accuracy, but many more layers to print, so it takes longer. |
| 3.17 | **A** | Prints fail by layers separating — orient the part so the load does not pull layers apart. |
| 3.18 | **B** | Printed holes shrink slightly — oversize them in CAD or post-process with a drill or file. |
| 3.19 | **B** | Supports hold up geometry that exceeds the ~45° overhang limit or spans gaps; they are removed after printing. |
| 3.20 | **B** | Onshape runs in the browser with real-time collaboration and version control — the whole team works in one document. |

**3.21** *(5 pts)*
(a) Revolute mates at each of the four pivots because each linkage joint rotates about one axis; fastened mates for the screwed structural joints because they must be rigid with zero degrees of freedom. (b) Any two: orient the print so layer lines run perpendicular to the load (parts split along layer lines), avoid overhangs past 45° or add supports/chamfers, raise infill (or add wall perimeters) for strength on load-bearing parts, and oversize holes slightly so shafts and screws fit after printing.

---

## Section 4 — Unit 4: Manipulators & Mechanisms

| Q | Answer | Notes |
|---|--------|-------|
| 4.1 | **A** | Four-bar, six-bar, DR4B, and linear lifts are lift mechanisms; the others are shooters, intakes, and drivetrains. |
| 4.2 | **B** | A parallel four-bar keeps the end effector at the same angle as it travels — great for keeping game objects level. |
| 4.3 | **B** | Stacking two reversed four-bars doubles the height with straight vertical travel. |
| 4.4 | **B** | Torque and speed trade off: more torque means less speed. |
| 4.5 | **B** | 84 ÷ 12 = 7, so the ratio is 7:1 for torque. |
| 4.6 | **C** | Compound stages multiply: (60/12) × (36/12) = 5 × 3 = 15:1. |
| 4.7 | **B** | Chain spans distance and keeps rotation direction; meshed gears reverse direction and must be adjacent. |
| 4.8 | **B** | Rubber bands counterbalance the lift, reducing motor load. |
| 4.9 | **B** | "Limit range with standoffs or physical stops" — hard stops protect the mechanism. |
| 4.10 | **A** | Compression is how much the intake squeezes the game object — set by roller spacing. |
| 4.11 | **B** | Too tight = jams and stalled motors; too loose = dropped objects. Compression must be tuned. |
| 4.12 | **A** | Active = powered; passive = unpowered (hooks, scoops, gravity-fed). |
| 4.13 | **A** | Hold resists movement and keeps position; coast lets the mechanism drift. |
| 4.14 | **B** | Screw joints are recommended for pivots where a live shaft is not needed. |
| 4.15 | **B** | Stalling means not enough torque: gear down and/or counterbalance with rubber bands before anything else. |
| 4.16 | **B** | Torque = force × lever arm. A shorter lever arm means less torque needed for the same load. |

**4.17** *(4 pts)*
Any two: cross-brace or box the lift with standoffs against twisting, use screw joints instead of loose axles at the pivots, fix spacing or add washers/spacers so joints do not bind, link/gear both sides identically so they move together, correct the gearing for torque so motors are not stalling and flexing the structure.

**4.18** *(5 pts)*
Run the intake motor until the object is captured (timed or sensor-confirmed), stop/hold the intake, drive the lift to the target height (timed movement or encoder target) using hold mode to keep position, reverse/open the intake to drop the object, then lower/reset. Driver-assisted control uses a button toggle: first press grabs, second press releases, tracked with a boolean or state variable.

---

### Score Summary Table

| Section | Topic | Points |
|---------|-------|--------|
| 1 | Drivetrain Mastery | /25 |
| 2 | Common Parts, Tools & Fabrication | /25 |
| 3 | CAD & 3D Printing | /25 |
| 4 | Manipulators & Mechanisms | /25 |
| **Total** | **(pass = 80)** | **/100** |
