export interface MultipleChoiceQuestion {
  kind: 'multiple-choice';
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  points: number;
  explanation: string;
}

export interface ShortAnswerQuestion {
  kind: 'short-answer';
  id: string;
  prompt: string;
  points: number;
  modelAnswer: string;
}

export type AssessmentQuestion = MultipleChoiceQuestion | ShortAnswerQuestion;

export interface AssessmentSection {
  id: string;
  title: string;
  description: string;
  questions: AssessmentQuestion[];
}

export interface Assessment {
  id: string;
  title: string;
  description: string;
  totalPoints: number;
  passingScore: number;
  timeLimitMinutes: number;
  sections: AssessmentSection[];
}

export const v5FoundationTest: Assessment = {
  id: 'v5-foundation-test',
  title: 'CTRC V5 Foundation Program — Unit Test',
  description:
    'This test covers the core build units of the V5 Foundation Program: drivetrains, common parts and fabrication, CAD and 3D printing, and manipulators. Multiple choice questions are graded automatically; short answer questions are reviewed by your instructor.',
  totalPoints: 100,
  passingScore: 80,
  timeLimitMinutes: 75,
  sections: [
    {
      id: 'drivetrain',
      title: 'Unit 1: Drivetrain Mastery',
      description:
        'Drivetrain geometry, drive types, live shafts, friction, and maintenance.',
      questions: [
        {
          kind: 'multiple-choice',
          id: '1-1',
          prompt: 'What is the difference between trackwidth and wheelbase?',
          options: [
            'Trackwidth is front to back; wheelbase is side to side',
            'Trackwidth is side to side; wheelbase is front to back',
            'They are two names for the same measurement',
            'Trackwidth only applies to omni wheels',
          ],
          correctIndex: 1,
          points: 2,
          explanation: 'Trackwidth measures side to side; wheelbase measures front to back.',
        },
        {
          kind: 'multiple-choice',
          id: '1-2',
          prompt:
            'A robot keeps tipping forward when it stops suddenly. Which change would MOST directly reduce tipping?',
          options: [
            'Adding more bearings to the drive shafts',
            'Lowering the center of mass and keeping it between the wheels',
            'Switching from 4 wheels to omni corners',
            'Increasing the motor cartridge speed',
          ],
          correctIndex: 1,
          points: 2,
          explanation:
            'The center of mass acts as a lever over the wheels during momentum changes — lower and more centered means less tippy.',
        },
        {
          kind: 'multiple-choice',
          id: '1-3',
          prompt:
            'Which of the following is an advantage of a 6-wheel drivetrain over a 4-wheel drivetrain?',
          options: [
            'It is simpler to build',
            'It has less friction',
            'It has more traction',
            'It is always faster',
          ],
          correctIndex: 2,
          points: 2,
          explanation: '6 wheels give more traction, at the cost of complexity and friction.',
        },
        {
          kind: 'multiple-choice',
          id: '1-4',
          prompt: 'What is the purpose of a "drop center" on a 6-wheel drivetrain?',
          options: [
            'It lowers the battery closer to the ground',
            'The middle wheels become the main traction and driving contact points, letting the outer wheels act as low-friction followers for more mobile turning',
            'It allows the robot to drive over obstacles taller than the wheels',
            'It removes the need for bearings on the middle wheels',
          ],
          correctIndex: 1,
          points: 2,
          explanation:
            'Dropping the middle wheels makes them the main traction points while outer wheels follow with low friction.',
        },
        {
          kind: 'multiple-choice',
          id: '1-5',
          prompt: 'A drivetrain with traction wheels on all positions is best described as:',
          options: [
            'Low friction — very agile but easily pushed by other robots',
            'High friction — less mobile but very resistant to pushes from other robots',
            'Frictionless — ideal for skills runs',
            'Identical in behavior to an all-omni setup',
          ],
          correctIndex: 1,
          points: 2,
          explanation:
            'All-traction is high friction: push-resistant but less mobile, and wheel rub can overheat motors faster.',
        },
        {
          kind: 'multiple-choice',
          id: '1-6',
          prompt: 'When is a live shaft required?',
          options: [
            'On every joint of the robot, always',
            'Only on structural crossmembers',
            'Whenever a shaft connects two rotating objects, such as a motor to a wheel',
            'Only when using pneumatics',
          ],
          correctIndex: 2,
          points: 2,
          explanation:
            'Live shafts connect two rotating objects (like motor to wheel); where they pass through structure they need bearings to spin freely.',
        },
        {
          kind: 'multiple-choice',
          id: '1-7',
          prompt:
            'During competition maintenance, which THREE items does the curriculum say to check on?',
          options: [
            'Overheating motors, loosening screws, shaft collar creep',
            'Battery voltage, radio channel, brain firmware',
            'Wheel color, chain tension, controller batteries',
            'Field tiles, license plates, driver station cables',
          ],
          correctIndex: 0,
          points: 2,
          explanation:
            'Check overheating motors (hotswap or compressed air), screws loosening over time (Loctite), and shaft collar creep.',
        },
        {
          kind: 'multiple-choice',
          id: '1-8',
          prompt:
            'According to the Unit 1 curriculum, what is described as "the biggest enemy of all" in drivetrain building?',
          options: ['Weight', 'Friction', 'Cost', 'Wiring'],
          correctIndex: 1,
          points: 2,
          explanation: '"Friction. The biggest enemy of all. Learn how to fix it, diagnose it, and avoid it."',
        },
        {
          kind: 'short-answer',
          id: '1-9',
          prompt:
            'Compare a wide trackwidth robot to a long wheelbase robot: give one benefit of each geometry.',
          points: 4,
          modelAnswer:
            'Wider trackwidth: more stable and requires less turning effort. Longer wheelbase: naturally drives straighter.',
        },
        {
          kind: 'short-answer',
          id: '1-10',
          prompt:
            'Your drivetrain rolls freely but veers to the left when driving straight. List two likely mechanical causes and one test you could perform to diagnose the problem.',
          points: 5,
          modelAnswer:
            'Causes (any two): uneven friction between sides (spacing, missing washers/bearings), frame not square, bent shaft or rubbing shaft collar, uneven weight distribution, one weak/overheating motor. Test (any one): rolling-straight push test, free-spin test on each wheel, swap motor sides and compare.',
        },
      ],
    },
    {
      id: 'parts-fabrication',
      title: 'Unit 1: Common Parts, Tools & Fabrication',
      description:
        'Spacers, standoffs and boxing, screw joints, bearings, motors and cartridges, and hand-tool techniques.',
      questions: [
        {
          kind: 'multiple-choice',
          id: '2-1',
          prompt: 'What is the primary purpose of spacers and washers on a shaft or screw?',
          options: [
            'To add weight to the robot for stability',
            'To fill the space along the shaft or screw so components stay in place without rubbing metal-on-metal',
            'To replace shaft collars entirely',
            'To make the shaft spin faster',
          ],
          correctIndex: 1,
          points: 2,
          explanation:
            'Spacers and washers set friction-free spacing: components stay where they belong without sliding or grinding against structure.',
        },
        {
          kind: 'multiple-choice',
          id: '2-2',
          prompt: 'How are standoffs used for "boxing" a structure?',
          options: [
            'They are only used to mount the V5 brain',
            'They connect two parallel C-channels or plates together, turning the joint into a rigid box that resists twisting',
            'They replace screws in high-load joints',
            'They are decorative supports',
          ],
          correctIndex: 1,
          points: 2,
          explanation:
            'Boxing with standoffs ties parallel members together so the joint acts like a rigid box instead of a flexible single wall.',
        },
        {
          kind: 'multiple-choice',
          id: '2-3',
          prompt: 'What is a screw joint?',
          options: [
            'Any joint that uses more than one screw',
            'A pivot where the mechanism rotates around a stationary screw instead of a live axle — usable wherever a live shaft is not required, and it can double as a structural crossmember',
            'A joint that is glued and screwed for extra strength',
            'A special VEX part that must be 3D printed',
          ],
          correctIndex: 1,
          points: 2,
          explanation:
            'Screw joints pivot around a stationary screw. They work anywhere a live shaft is not required and can double as structural crossmembers.',
        },
        {
          kind: 'multiple-choice',
          id: '2-4',
          prompt: 'Where is a bearing NOT required?',
          options: [
            'Where a drive shaft passes through a C-channel wall',
            'On the end of a shaft inserted directly into a V5 motor — the motor supports the shaft internally',
            'On both sides of a wheel on a live shaft',
            'Bearings are required at every point a shaft touches anything',
          ],
          correctIndex: 1,
          points: 2,
          explanation:
            'The motor itself supports the shaft internally, so no bearing is needed at the motor. Extra bearings beyond what is required just add unnecessary friction.',
        },
        {
          kind: 'multiple-choice',
          id: '2-5',
          prompt: 'Match the V5 motor cartridge color to its output speed:',
          options: [
            'Red = 600 RPM, Green = 200 RPM, Blue = 100 RPM',
            'Red = 100 RPM, Green = 200 RPM, Blue = 600 RPM',
            'Red = 200 RPM, Green = 100 RPM, Blue = 600 RPM',
            'All cartridges are 200 RPM; only the gears inside differ',
          ],
          correctIndex: 1,
          points: 2,
          explanation: 'Red = 100 RPM (torque), Green = 200 RPM (standard), Blue = 600 RPM (speed).',
        },
        {
          kind: 'multiple-choice',
          id: '2-6',
          prompt:
            'What is a key difference between the 11W and 5.5W V5 Smart Motors?',
          options: [
            'The 5.5W motor is faster than any 11W cartridge',
            'The 11W motor accepts swappable cartridges (100/200/600 RPM); the 5.5W motor is fixed at 200 RPM with no interchangeable cartridge',
            'The 11W motor cannot be used on drivetrains',
            'They are identical except for the connector',
          ],
          correctIndex: 1,
          points: 2,
          explanation:
            'The 11W motor takes 100/200/600 RPM cartridges; the 5.5W motor has a fixed 200 RPM output and no swappable cartridge.',
        },
        {
          kind: 'multiple-choice',
          id: '2-7',
          prompt:
            'When cutting C-channel with a hacksaw, why should you couple (nest) two C-channels together before clamping them in the vice?',
          options: [
            'It lets you skip marking the cut line',
            'The nested channels reinforce each other, so the walls do not bend or crush in the vice and the cut stays straight and square',
            'It makes the hacksaw blade last longer',
            'It is only done to save time by cutting two parts at once',
          ],
          correctIndex: 1,
          points: 2,
          explanation:
            'Nesting the channels reinforces the thin walls so the vice cannot crush them, and the extra rigidity keeps the cut straight and square.',
        },
        {
          kind: 'multiple-choice',
          id: '2-8',
          prompt: 'After cutting metal with a hacksaw, what should you use a file for?',
          options: [
            'Polishing the entire part to a mirror finish',
            'Smoothing the cut edge, removing sharp burrs, and fine-tuning the part to final size',
            'Bending the channel to shape',
            'Files are only used on plastic parts',
          ],
          correctIndex: 1,
          points: 2,
          explanation:
            'Filing cleans up the cut: it smooths sharp edges, removes burrs, and lets you sneak up on the final dimension.',
        },
        {
          kind: 'short-answer',
          id: '2-9',
          prompt:
            'Describe the correct process for cutting a C-channel to length with a hacksaw, from marking the cut to finishing the edge.',
          points: 4,
          modelAnswer:
            'Mark the cut line, couple/nest a second C-channel with the one being cut for rigidity, clamp the pair securely in the vice close to the cut line, cut with steady full strokes on the marked line, then file the cut edge smooth to remove burrs and reach final size.',
        },
        {
          kind: 'short-answer',
          id: '2-10',
          prompt:
            'A wheel is driven on a live shaft that passes through both walls of a C-channel, powered by an 11W motor plugged onto one end of the shaft. State where bearings ARE needed, where a bearing is NOT needed, and why you should not add more bearings than required.',
          points: 5,
          modelAnswer:
            'Bearings are needed where the shaft passes through each C-channel wall so the live shaft spins smoothly. No bearing is needed at the motor — the motor supports the shaft internally. Extra bearings beyond what is required just add unnecessary friction.',
        },
      ],
    },
    {
      id: 'cad-3d-printing',
      title: 'Unit 3: CAD & 3D Printing',
      description:
        'Onshape Parts Studios, Assemblies, mates (fastened and revolute), and designing parts for 3D printing.',
      questions: [
        {
          kind: 'multiple-choice',
          id: '3-1',
          prompt: 'In Onshape, where are individual parts modeled, and where are they mated together?',
          options: [
            'Parts are modeled in Assemblies; mated in Parts Studios',
            'Parts are modeled in Parts Studios; mated in Assemblies',
            'Both happen in the Drawing tab',
            'Onshape does not support assemblies',
          ],
          correctIndex: 1,
          points: 2,
          explanation: 'Model in Parts Studios; insert and mate in Assemblies.',
        },
        {
          kind: 'multiple-choice',
          id: '3-2',
          prompt: 'What is a mate connector in Onshape?',
          options: [
            'A physical VEX part used to join channels',
            'A point (with position and orientation) on a part where mates attach when assembling',
            'A tool for measuring distances',
            'A type of export file',
          ],
          correctIndex: 1,
          points: 2,
          explanation:
            'Mate connectors are the snap points — each one carries a position and orientation that mates use to align parts.',
        },
        {
          kind: 'multiple-choice',
          id: '3-3',
          prompt: 'What does a FASTENED mate do?',
          options: [
            'Allows rotation about one axis',
            'Locks two parts rigidly together with zero degrees of freedom',
            'Allows sliding along one axis',
            'Connects a part to the origin only',
          ],
          correctIndex: 1,
          points: 2,
          explanation:
            'Fastened removes all degrees of freedom — use it for parts that are screwed or fixed together.',
        },
        {
          kind: 'multiple-choice',
          id: '3-4',
          prompt: 'What does a REVOLUTE mate do?',
          options: [
            'Locks two parts rigidly together',
            'Allows rotation about a single axis — one rotational degree of freedom',
            'Allows free movement in all directions',
            'Mirrors a part across a plane',
          ],
          correctIndex: 1,
          points: 2,
          explanation:
            'Revolute leaves exactly one rotational degree of freedom — the mate for anything that spins or pivots.',
        },
        {
          kind: 'multiple-choice',
          id: '3-5',
          prompt:
            'You are assembling a drivetrain in Onshape. Which mates are correct for (a) a wheel spinning on its axle and (b) a C-channel screwed to another C-channel?',
          options: [
            '(a) Fastened, (b) Revolute',
            '(a) Revolute, (b) Fastened',
            'Both Revolute',
            'Both Fastened',
          ],
          correctIndex: 1,
          points: 2,
          explanation:
            'The wheel needs to rotate → revolute. The screwed structure must be rigid → fastened.',
        },
        {
          kind: 'multiple-choice',
          id: '3-6',
          prompt:
            'Which part library is named in the curriculum for inserting VEX components into Onshape?',
          options: ['MKCAD', 'GrabCAD', 'Thingiverse', 'McMaster-Carr'],
          correctIndex: 0,
          points: 2,
          explanation: 'MKCAD (plus CautionTape-specific libraries).',
        },
        {
          kind: 'multiple-choice',
          id: '3-7',
          prompt: 'What file format do you export from Onshape to 3D print a custom part?',
          options: ['.dxf', '.pdf', '.stl', '.docx'],
          correctIndex: 2,
          points: 2,
          explanation: 'STL is the standard export format for 3D printing.',
        },
        {
          kind: 'multiple-choice',
          id: '3-8',
          prompt: 'What does the slicer do with your STL file before printing?',
          options: [
            'It checks the file for viruses',
            'It converts the 3D model into layer-by-layer instructions (G-code) the printer can execute, using your settings like layer height and infill',
            'It shrinks the model to fit the print bed automatically',
            'It uploads the model to Onshape',
          ],
          correctIndex: 1,
          points: 2,
          explanation:
            'Slicing turns the model into layers and toolpaths — the printer instructions — based on settings like layer height, infill, and supports.',
        },
        {
          kind: 'multiple-choice',
          id: '3-9',
          prompt: 'Why is 45° considered the limit for support-free overhangs in 3D printing?',
          options: [
            'The printer nozzle physically cannot tilt past 45°',
            'Beyond about 45°, each layer overhangs too far past the layer below it, so the plastic droops without support material',
            'It is only a stylistic guideline',
            'Overhangs of any angle always need supports',
          ],
          correctIndex: 1,
          points: 2,
          explanation:
            'Each layer can only overhang the previous one a little; past ~45° there is not enough material underneath and the print sags.',
        },
        {
          kind: 'multiple-choice',
          id: '3-10',
          prompt: 'What is the trade-off of printing a part with LOWER infill percentage?',
          options: [
            'Lighter, faster, and cheaper to print — but weaker',
            'Stronger but heavier',
            'No difference except color',
            'Lower infill always causes the print to fail',
          ],
          correctIndex: 0,
          points: 2,
          explanation:
            'Lower infill saves material and print time and reduces weight, at the cost of part strength.',
        },
        {
          kind: 'short-answer',
          id: '3-11',
          prompt:
            'You are assembling a four-bar lift in Onshape and 3D printing a custom bracket for it. (a) State which mate you would use at each pivot and which mate for the screwed structural joints, and why. (b) Give two design decisions you would make so the printed bracket is strong and prints cleanly (think orientation, overhangs, infill, or hole tolerances).',
          points: 5,
          modelAnswer:
            '(a) Revolute mates at each of the four pivots because each linkage joint rotates about one axis; fastened mates for the screwed structural joints because they must be rigid with zero degrees of freedom. (b) Any two: orient the print so layer lines run perpendicular to the load (parts split along layer lines), avoid overhangs past 45° or add supports/chamfers, raise infill (or add wall perimeters) for strength on load-bearing parts, and oversize holes slightly so shafts and screws fit after printing.',
        },
      ],
    },
    {
      id: 'manipulators',
      title: 'Unit 4: Manipulators & Mechanisms',
      description:
        'Lift systems, intakes, torque and speed, gear ratios, and mechanism programming.',
      questions: [
        {
          kind: 'multiple-choice',
          id: '4-1',
          prompt: 'Which of the following lists contains ONLY lift mechanisms?',
          options: [
            'Four-bar, six-bar, DR4B, linear lift',
            'Flywheel, puncher, catapult',
            'Roller, claw, passive intake',
            'Tank drive, X-drive, mecanum',
          ],
          correctIndex: 0,
          points: 2,
          explanation:
            'Four-bar, six-bar, DR4B, and linear lifts are lift mechanisms; the others are shooters, intakes, and drivetrains.',
        },
        {
          kind: 'multiple-choice',
          id: '4-2',
          prompt: 'You gear a lift motor for more torque. What happens to its output speed?',
          options: ['It increases', 'It decreases', 'It stays the same', 'Torque and speed are unrelated'],
          correctIndex: 1,
          points: 2,
          explanation: 'Torque and speed trade off: more torque means less speed.',
        },
        {
          kind: 'multiple-choice',
          id: '4-3',
          prompt:
            'A 12-tooth pinion drives an 84-tooth gear on a lift arm. What is the gear ratio, and what does it do?',
          options: [
            '1:7 for speed — the arm spins 7× faster',
            '7:1 for torque — the arm turns 7× slower but with about 7× the torque',
            '84:12 for speed',
            "1:1 — tooth count doesn't matter",
          ],
          correctIndex: 1,
          points: 2,
          explanation: '84 ÷ 12 = 7, so the ratio is 7:1 for torque.',
        },
        {
          kind: 'multiple-choice',
          id: '4-4',
          prompt: 'Why are rubber bands often added to lift mechanisms?',
          options: [
            'To make the robot legal for competition',
            "To counterbalance the lift's weight so the motors work less",
            'To increase friction in the joints',
            'For decoration',
          ],
          correctIndex: 1,
          points: 2,
          explanation: 'Rubber bands counterbalance the lift, reducing motor load.',
        },
        {
          kind: 'multiple-choice',
          id: '4-5',
          prompt: 'What is compression in an intake system?',
          options: [
            'The amount the intake squeezes/grips the game object between rollers and a surface',
            'Compressing air for pneumatics',
            'Reducing the file size of your CAD',
            'Folding the intake for size limits',
          ],
          correctIndex: 0,
          points: 2,
          explanation: 'Compression is how much the intake squeezes the game object — set by roller spacing.',
        },
        {
          kind: 'multiple-choice',
          id: '4-6',
          prompt: 'What is the difference between an active and a passive intake?',
          options: [
            'Active intakes are powered (e.g., motorized rollers); passive intakes use no motor (e.g., hooks, scoops, gravity)',
            'Active intakes are made of metal; passive intakes are plastic',
            'Passive intakes are always better',
            'There is no difference',
          ],
          correctIndex: 0,
          points: 2,
          explanation: 'Active = powered; passive = unpowered (hooks, scoops, gravity-fed).',
        },
        {
          kind: 'multiple-choice',
          id: '4-7',
          prompt:
            'In VEXcode, what is the difference between motor hold mode and coast mode when the motor stops?',
          options: [
            'Hold actively resists movement and holds position; coast lets the mechanism spin/drift freely',
            'Coast holds position; hold lets it drift',
            'Both behave identically',
            'Hold turns the motor off permanently',
          ],
          correctIndex: 0,
          points: 2,
          explanation: 'Hold resists movement and keeps position; coast lets the mechanism drift.',
        },
        {
          kind: 'multiple-choice',
          id: '4-8',
          prompt:
            'For a lift arm pivot that does NOT need to transfer rotation through the shaft, the curriculum recommends considering:',
          options: [
            'A rubber axle',
            'A screw joint instead of an axle',
            'Removing the pivot entirely',
            'Two motors on the same axle',
          ],
          correctIndex: 1,
          points: 2,
          explanation: 'Screw joints are recommended for pivots where a live shaft is not needed.',
        },
        {
          kind: 'short-answer',
          id: '4-9',
          prompt:
            'Your four-bar lift twists side to side and binds when raising. Using Unit 4 concepts, give two specific fixes.',
          points: 4,
          modelAnswer:
            'Any two: cross-brace or box the lift with standoffs against twisting, use screw joints instead of loose axles at the pivots, fix spacing or add washers/spacers so joints do not bind, link/gear both sides identically so they move together, correct the gearing for torque so motors are not stalling and flexing the structure.',
        },
        {
          kind: 'short-answer',
          id: '4-10',
          prompt:
            'Describe the automated sequence from Lesson 4 (intake object → lift to height → drop object) in terms of what the code must do at each step. Include the controller feature you would use for driver-assisted intake control (grab on one press, release on the next).',
          points: 5,
          modelAnswer:
            'Run the intake motor until the object is captured (timed or sensor-confirmed), stop/hold the intake, drive the lift to the target height (timed movement or encoder target) using hold mode to keep position, reverse/open the intake to drop the object, then lower/reset. Driver-assisted control uses a button toggle: first press grabs, second press releases, tracked with a boolean or state variable.',
        },
      ],
    },
  ],
};

export function assessmentAutoGradedPoints(assessment: Assessment): number {
  return assessment.sections
    .flatMap((s) => s.questions)
    .filter((q) => q.kind === 'multiple-choice')
    .reduce((sum, q) => sum + q.points, 0);
}

export function assessmentQuestionCount(assessment: Assessment): number {
  return assessment.sections.reduce((sum, s) => sum + s.questions.length, 0);
}
