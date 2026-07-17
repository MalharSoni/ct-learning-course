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
    'This test covers the four core units of the V5 Foundation Program. Multiple choice questions are graded automatically; short answer questions are reviewed by your instructor.',
  totalPoints: 100,
  passingScore: 80,
  timeLimitMinutes: 75,
  sections: [
    {
      id: 'unit-1',
      title: 'Unit 1: Drivetrain Mastery',
      description:
        'Safety, common parts, drivetrain geometry, drive types, gearing, and maintenance.',
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
          prompt: 'When is a live shaft (and therefore a bearing) required?',
          options: [
            'On every joint of the robot, always',
            'Only on structural crossmembers',
            'Whenever a shaft connects two rotating objects, such as a motor to a wheel',
            'Only when using pneumatics',
          ],
          correctIndex: 2,
          points: 2,
          explanation:
            'Live shafts connect two rotating objects (like motor to wheel) and need bearings to spin freely.',
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
      id: 'unit-2',
      title: 'Unit 2: Programming Foundations',
      description:
        'Object-oriented programming, state machines, command patterns, and sensor feedback in VEXcode V5 Text.',
      questions: [
        {
          kind: 'multiple-choice',
          id: '2-1',
          prompt: 'In Object-Oriented Programming, a class is best described as:',
          options: [
            'A single line of code that runs once',
            'A blueprint that defines the variables and methods of an object',
            'A type of loop',
            'A file that stores motor ports',
          ],
          correctIndex: 1,
          points: 2,
          explanation: 'A class is a blueprint defining data (variables) and behavior (methods).',
        },
        {
          kind: 'multiple-choice',
          id: '2-2',
          prompt: 'What is encapsulation?',
          options: [
            'Wrapping wires in electrical tape',
            "Keeping an object's data and the methods that operate on it together, hiding internal details from outside code",
            'Copying and pasting code between projects',
            'Running two programs at the same time',
          ],
          correctIndex: 1,
          points: 2,
          explanation: 'Encapsulation bundles data and methods together and hides internal details.',
        },
        {
          kind: 'multiple-choice',
          id: '2-3',
          prompt:
            'In a robot state machine with states IDLE, LIFTING, and PLACING, what causes the robot to move between states?',
          options: [
            'Nothing — states are fixed at startup',
            'Controller input or autonomous triggers/conditions',
            'The battery level',
            'Recompiling the program',
          ],
          correctIndex: 1,
          points: 2,
          explanation: 'States switch based on controller input or autonomous triggers.',
        },
        {
          kind: 'multiple-choice',
          id: '2-4',
          prompt: 'What is the purpose of a command class like LiftCommand or ClawCommand?',
          options: [
            "To store the robot's battery statistics",
            'To encapsulate a single robot action so it can be reused and organized cleanly',
            'To replace the need for motors',
            'To make the code run faster on the V5 brain',
          ],
          correctIndex: 1,
          points: 2,
          explanation: 'Command classes encapsulate one action each, keeping code organized and reusable.',
        },
        {
          kind: 'multiple-choice',
          id: '2-5',
          prompt:
            'While testing state transitions, what simple debugging technique does the curriculum recommend to confirm the robot changed states?',
          options: [
            'Watching the motor LEDs',
            'Printing messages to the console',
            'Removing all sensors',
            'Restarting the brain after every run',
          ],
          correctIndex: 1,
          points: 2,
          explanation: 'Console prints confirm state transitions during testing.',
        },
        {
          kind: 'multiple-choice',
          id: '2-6',
          prompt: 'Which line of pseudocode correctly represents the transition logic taught in Unit 2?',
          options: [
            'if state == LIFTING → move lift motor',
            'while battery > 50 → state = LIFTING',
            'state = LIFTING + PLACING',
            'move motor → then check state',
          ],
          correctIndex: 0,
          points: 2,
          explanation: 'Behavior depends on the current state: if state == LIFTING → move motor.',
        },
        {
          kind: 'multiple-choice',
          id: '2-7',
          prompt:
            'A limit switch is added so the lift stops automatically at the top. This is an example of:',
          options: [
            'Open-loop control',
            'Sensor feedback integration',
            'Driver control',
            'Encapsulation',
          ],
          correctIndex: 1,
          points: 2,
          explanation: 'Using a sensor to affect behavior is sensor feedback integration.',
        },
        {
          kind: 'multiple-choice',
          id: '2-8',
          prompt:
            'Which programming environment does the Foundation Program use for text-based programming?',
          options: ['Scratch', 'VEXcode V5 Text (C++)', 'RobotC for Cortex', 'MATLAB'],
          correctIndex: 1,
          points: 2,
          explanation: 'The program uses VEXcode V5 Text.',
        },
        {
          kind: 'short-answer',
          id: '2-9',
          prompt:
            'Name the three robot behavior states used as the example in Unit 2, and describe what a state machine is in one or two sentences.',
          points: 4,
          modelAnswer:
            'States: IDLE, LIFTING, PLACING. A state machine is a program structure where the robot is always in exactly one defined state and moves between states when conditions or inputs trigger a transition; behavior depends on the current state.',
        },
        {
          kind: 'short-answer',
          id: '2-10',
          prompt:
            'You are writing an autonomous routine that picks up an object and places it on a platform. Describe the sequence of state transitions your robot would go through, and name one sensor you could add to make the sequence more reliable (explain what it would do).',
          points: 5,
          modelAnswer:
            'Example: IDLE → intake/grab state when the routine begins → LIFTING (raise to target height) → PLACING (release object) → back to IDLE. Sensor: a limit switch to stop the lift at exact height, a bumper/distance sensor to confirm the object is captured before lifting, or encoder feedback to verify lift position.',
        },
      ],
    },
    {
      id: 'unit-3',
      title: 'Unit 3: CAD and Machining',
      description:
        'Onshape fundamentals, custom parts, CNC, drilling, filing, sanding, and tolerance adjustment.',
      questions: [
        {
          kind: 'multiple-choice',
          id: '3-1',
          prompt: 'Which CAD platform does the Foundation Program use?',
          options: ['Fusion 360', 'SolidWorks', 'Onshape', 'TinkerCAD'],
          correctIndex: 2,
          points: 2,
          explanation: 'The program teaches Onshape.',
        },
        {
          kind: 'multiple-choice',
          id: '3-2',
          prompt: 'Why do engineers CAD their robots before building?',
          options: [
            'It is required by the VEX game manual',
            'Precision, collaboration, iteration, and documentation',
            'It makes the robot lighter',
            'CAD replaces the need for testing',
          ],
          correctIndex: 1,
          points: 2,
          explanation: 'CAD enables precision, collaboration, iteration, and documentation.',
        },
        {
          kind: 'multiple-choice',
          id: '3-3',
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
          id: '3-4',
          prompt:
            'Which part library is named in the curriculum for inserting VEX components into Onshape?',
          options: ['MKCAD', 'GrabCAD', 'Thingiverse', 'McMaster-Carr'],
          correctIndex: 0,
          points: 2,
          explanation: 'MKCAD (plus CautionTape-specific libraries).',
        },
        {
          kind: 'multiple-choice',
          id: '3-5',
          prompt: 'What file format do you export from Onshape to send a custom part to the CNC?',
          options: ['.stl', '.pdf', '.dxf', '.docx'],
          correctIndex: 2,
          points: 2,
          explanation: 'DXF files are exported from Onshape for CNC cutting.',
        },
        {
          kind: 'multiple-choice',
          id: '3-6',
          prompt: 'Before drilling a hole in aluminum, you should first:',
          options: [
            'Sand the surface with the belt sander',
            'Center punch the hole location (and use a pilot hole for accuracy)',
            'Heat the metal',
            'File the edges',
          ],
          correctIndex: 1,
          points: 2,
          explanation: 'Center punching (and pilot holes) keep the drill bit from wandering.',
        },
        {
          kind: 'multiple-choice',
          id: '3-7',
          prompt: 'What is deburring?',
          options: [
            'Removing sharp leftover material from drilled holes and cut edges',
            'Painting the part',
            'Measuring the part with calipers',
            'Exporting the CAD file',
          ],
          correctIndex: 0,
          points: 2,
          explanation: 'Deburring removes sharp burrs left by drilling and cutting.',
        },
        {
          kind: 'multiple-choice',
          id: '3-8',
          prompt:
            'After test-fitting a machined part on the robot, you discover the holes are slightly misaligned. According to the Unit 3 workflow, what should you do?',
          options: [
            'Force the screws in with a bigger driver',
            'Throw the part away and start a new design from scratch',
            'Diagnose the misalignment, adjust the CAD (tolerances/hole placement), and re-machine if necessary',
            'Ignore it — small misalignments never matter',
          ],
          correctIndex: 2,
          points: 2,
          explanation:
            'The workflow is: diagnose via CAD, adjust tolerances or hole placement, and re-machine if needed.',
        },
        {
          kind: 'short-answer',
          id: '3-9',
          prompt:
            'Name two hand-finishing tools/techniques from Lesson 3 (drilling, filing, sanding) and state what each is used for.',
          points: 4,
          modelAnswer:
            'Any two: drill press with twist/step bits (accurate holes, clamped work), files — flat/round/half-round (smoothing edges, precise dimensions, deburring holes), belt sander (clean aluminum edges, sneaking up on final size), center punch (marking hole locations so the bit does not wander).',
        },
        {
          kind: 'short-answer',
          id: '3-10',
          prompt:
            'What is a tolerance in CAD, and why does it matter when designing a custom bracket with holes for shafts and screws? Give one example of a tolerance decision you would make.',
          points: 5,
          modelAnswer:
            'A tolerance is the allowable variation between the designed dimension and the real part. It matters because parts must physically fit — holes must clear screws and shafts, and machining is never perfectly exact. Example: oversizing a shaft hole slightly so the shaft spins freely, or sizing screw holes for clearance vs. thread engagement.',
        },
      ],
    },
    {
      id: 'unit-4',
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
            'Any two: cross-brace or box the lift against twisting, use screw joints instead of loose axles at the pivots, fix spacing or add washers/bearings so joints do not bind, link/gear both sides identically so they move together, correct the gearing for torque so motors are not stalling and flexing the structure.',
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
