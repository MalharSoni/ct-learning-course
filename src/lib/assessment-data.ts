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

function mc(
  id: string,
  prompt: string,
  options: string[],
  correctIndex: number,
  explanation: string
): MultipleChoiceQuestion {
  return { kind: 'multiple-choice', id, prompt, options, correctIndex, points: 1, explanation };
}

export const v5FoundationTest: Assessment = {
  id: 'v5-foundation-test',
  title: 'CTRC V5 Foundation Program — Unit Test',
  description:
    'This test covers the core build units of the V5 Foundation Program: drivetrains, common parts and fabrication, CAD and 3D printing, and manipulators. Multiple choice questions are graded automatically; short answer questions are reviewed by your instructor.',
  totalPoints: 100,
  passingScore: 80,
  timeLimitMinutes: 90,
  sections: [
    {
      id: 'drivetrain',
      title: 'Unit 1: Drivetrain Mastery',
      description:
        'Drivetrain geometry, drive types, gearing choices, friction, and maintenance.',
      questions: [
        mc(
          '1-1',
          'What is the difference between trackwidth and wheelbase?',
          [
            'Trackwidth is front to back; wheelbase is side to side',
            'Trackwidth is side to side; wheelbase is front to back',
            'They are two names for the same measurement',
            'Trackwidth only applies to omni wheels',
          ],
          1,
          'Trackwidth measures side to side; wheelbase measures front to back.'
        ),
        mc(
          '1-2',
          'A robot keeps tipping forward when it stops suddenly. Which change would MOST directly reduce tipping?',
          [
            'Adding more bearings to the drive shafts',
            'Lowering the center of mass and keeping it between the wheels',
            'Switching from 4 wheels to omni corners',
            'Increasing the motor cartridge speed',
          ],
          1,
          'The center of mass acts as a lever over the wheels during momentum changes — lower and more centered means less tippy.'
        ),
        mc(
          '1-3',
          'What effect does a WIDER trackwidth have on a drivetrain?',
          [
            'It makes the robot drive straighter but turn slower',
            'It makes the robot more stable and require less turning effort',
            'It has no effect on handling',
            'It increases motor overheating',
          ],
          1,
          'Wider trackwidth = more stable and less turning effort.'
        ),
        mc(
          '1-4',
          'What effect does a LONGER wheelbase have on a drivetrain?',
          [
            'The robot naturally drives straighter',
            'The robot turns with less effort',
            'The robot becomes harder to tip forward but easier to tip sideways',
            'The robot gets more traction per wheel',
          ],
          0,
          'A longer wheelbase makes the robot naturally drive straighter.'
        ),
        mc(
          '1-5',
          'Which of the following is an advantage of a 6-wheel drivetrain over a 4-wheel drivetrain?',
          [
            'It is simpler to build',
            'It has less friction',
            'It has more traction',
            'It is always faster',
          ],
          2,
          '6 wheels give more traction, at the cost of complexity and friction.'
        ),
        mc(
          '1-6',
          'Which of these is an advantage of a 4-wheel drivetrain over a 6-wheel drivetrain?',
          [
            'More traction',
            'More resistant to defense',
            'Simpler and more mobile with less friction',
            'It requires no bearings',
          ],
          2,
          '4-wheel drives are simpler and more mobile with less friction; 6-wheel gains traction.'
        ),
        mc(
          '1-7',
          'What is the purpose of a "drop center" on a 6-wheel drivetrain?',
          [
            'It lowers the battery closer to the ground',
            'The middle wheels become the main traction and driving contact points, letting the outer wheels act as low-friction followers for more mobile turning',
            'It allows the robot to drive over obstacles taller than the wheels',
            'It removes the need for bearings on the middle wheels',
          ],
          1,
          'Dropping the middle wheels makes them the main traction points while outer wheels follow with low friction.'
        ),
        mc(
          '1-8',
          'A drivetrain with traction wheels on all positions is best described as:',
          [
            'Low friction — very agile but easily pushed by other robots',
            'High friction — less mobile but very resistant to pushes from other robots',
            'Frictionless — ideal for skills runs',
            'Identical in behavior to an all-omni setup',
          ],
          1,
          'All-traction is high friction: push-resistant but less mobile, and wheel rub can overheat motors faster.'
        ),
        mc(
          '1-9',
          'Why is "omni wheels on the outer corners, traction in the middle" a popular compromise?',
          [
            'Omni wheels are cheaper than traction wheels',
            'The outer wheels travel the most when turning, so omnis there keep turning easy while the traction wheels still resist pushes',
            'It is required by the game rules',
            'It eliminates the need for a drop center',
          ],
          1,
          'Outer wheels travel the most during a turn — omnis there preserve mobility while central traction wheels keep grip.'
        ),
        mc(
          '1-10',
          'What happens if you OVER-gear a drivetrain (gear it too fast) for the robot’s weight?',
          [
            'Nothing — faster is always better',
            'The motors stall and overheat under load',
            'The robot becomes more stable',
            'The wheels wear out faster but nothing else changes',
          ],
          1,
          'Over-gearing loses torque — motors stall and overheat. Under-gearing wastes speed.'
        ),
        mc(
          '1-11',
          'How does using LARGER wheels change the effective gearing of a drivetrain?',
          [
            'It has no effect',
            'Larger wheels act like a faster gear ratio — more ground speed, less pushing torque',
            'Larger wheels act like a slower gear ratio — less speed, more torque',
            'Larger wheels only change ground clearance',
          ],
          1,
          'Wheel diameter multiplies into the effective ratio: bigger wheels = faster but less torque.'
        ),
        mc(
          '1-12',
          'When is a live shaft required?',
          [
            'On every joint of the robot, always',
            'Only on structural crossmembers',
            'Whenever a shaft connects two rotating objects, such as a motor to a wheel',
            'Only when using pneumatics',
          ],
          2,
          'Live shafts connect two rotating objects (like motor to wheel); where they pass through structure they need bearings to spin freely.'
        ),
        mc(
          '1-13',
          'During competition maintenance, which THREE items does the curriculum say to check on?',
          [
            'Overheating motors, loosening screws, shaft collar creep',
            'Battery voltage, radio channel, brain firmware',
            'Wheel color, chain tension, controller batteries',
            'Field tiles, license plates, driver station cables',
          ],
          0,
          'Check overheating motors (hotswap or compressed air), screws loosening over time (Loctite), and shaft collar creep.'
        ),
        mc(
          '1-14',
          'A drivetrain motor is overheating between matches. What does the curriculum recommend?',
          [
            'Replace the entire drivetrain',
            'Hotswap the motor (using elastic band mounting) or cool it with compressed air',
            'Run the motor harder to break it in',
            'Ignore it — motors cannot overheat',
          ],
          1,
          'Hotswap with elastic-band-mounted motors or cool with compressed air.'
        ),
        mc(
          '1-15',
          'What is Loctite used for on a competition robot?',
          [
            'Lubricating bearings',
            'Keeping screws from vibrating loose over time',
            'Gluing wheels to shafts',
            'Cleaning aluminum parts',
          ],
          1,
          '"Build once, Loctite the 2nd" — Loctite keeps screws from loosening over time.'
        ),
        mc(
          '1-16',
          'According to the Unit 1 curriculum, what is described as "the biggest enemy of all" in drivetrain building?',
          ['Weight', 'Friction', 'Cost', 'Wiring'],
          1,
          '"Friction. The biggest enemy of all. Learn how to fix it, diagnose it, and avoid it."'
        ),
        {
          kind: 'short-answer',
          id: '1-17',
          prompt:
            'Compare a wide trackwidth robot to a long wheelbase robot: give one benefit of each geometry.',
          points: 4,
          modelAnswer:
            'Wider trackwidth: more stable and requires less turning effort. Longer wheelbase: naturally drives straighter.',
        },
        {
          kind: 'short-answer',
          id: '1-18',
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
        mc(
          '2-1',
          'What is the primary purpose of spacers and washers on a shaft or screw?',
          [
            'To add weight to the robot for stability',
            'To fill the space along the shaft or screw so components stay in place without rubbing metal-on-metal',
            'To replace shaft collars entirely',
            'To make the shaft spin faster',
          ],
          1,
          'Spacers and washers set friction-free spacing: components stay where they belong without sliding or grinding against structure.'
        ),
        mc(
          '2-2',
          'How are standoffs used for "boxing" a structure?',
          [
            'They are only used to mount the V5 brain',
            'They connect two parallel C-channels or plates together, turning the joint into a rigid box that resists twisting',
            'They replace screws in high-load joints',
            'They are decorative supports',
          ],
          1,
          'Boxing with standoffs ties parallel members together so the joint acts like a rigid box instead of a flexible single wall.'
        ),
        mc(
          '2-3',
          'What is a screw joint?',
          [
            'Any joint that uses more than one screw',
            'A pivot where the mechanism rotates around a stationary screw instead of a live axle — usable wherever a live shaft is not required, and it can double as a structural crossmember',
            'A joint that is glued and screwed for extra strength',
            'A special VEX part that must be 3D printed',
          ],
          1,
          'Screw joints pivot around a stationary screw. They work anywhere a live shaft is not required and can double as structural crossmembers.'
        ),
        mc(
          '2-4',
          'Which nut should you use on a screw joint pivot, and why?',
          [
            'A regular hex nut, because it is strongest',
            'A nylock nut — its nylon insert resists vibrating loose while still letting the joint pivot',
            'Two nuts tightened against the part so nothing can move',
            'No nut — friction holds the screw in place',
          ],
          1,
          'Nylock nuts hold their position without being torqued down, so the joint can pivot freely without the nut walking off.'
        ),
        mc(
          '2-5',
          'Why are shoulder screws useful for joints?',
          [
            'They are lighter than normal screws',
            'The smooth unthreaded shank fills the hole precisely, giving the pivot a clean bearing surface with less slop than threads',
            'They never need a nut',
            'They are the only screws allowed in competition',
          ],
          1,
          'The unthreaded shoulder acts as a precise, smooth pivot surface — less slop and wear than riding on threads.'
        ),
        mc(
          '2-6',
          'What is the purpose of a bearing flat on a C-channel?',
          [
            'To decorate the channel',
            'To support a shaft passing through the channel so it spins smoothly without wobbling or wearing the metal hole',
            'To hold screws in place',
            'To make the channel stronger against bending',
          ],
          1,
          'Bearing flats give shafts a low-friction, supported hole so they spin true instead of wearing the channel.'
        ),
        mc(
          '2-7',
          'What is the job of a shaft collar?',
          [
            'To increase the speed of the shaft',
            'To keep the shaft from sliding side to side out of position',
            'To connect two shafts end to end',
            'To replace bearings',
          ],
          1,
          'Shaft collars stop shafts from sliding out of position — and they can creep loose, which is why you check them at competition.'
        ),
        mc(
          '2-8',
          'Where is a bearing NOT required?',
          [
            'Where a drive shaft passes through a C-channel wall',
            'On the end of a shaft inserted directly into a V5 motor — the motor supports the shaft internally',
            'On both sides of a wheel on a live shaft',
            'Bearings are required at every point a shaft touches anything',
          ],
          1,
          'The motor itself supports the shaft internally, so no bearing is needed at the motor. Extra bearings beyond what is required just add unnecessary friction.'
        ),
        mc(
          '2-9',
          'Why should you avoid metal-on-metal contact between moving parts?',
          [
            'It looks bad',
            'It creates friction and wear — use spacers, washers, or bearings between moving surfaces instead',
            'It is illegal in competition',
            'Metal-on-metal contact is actually preferred',
          ],
          1,
          'Metal rubbing on metal adds friction and grinds parts down; spacers, washers, and bearings keep moving surfaces apart.'
        ),
        mc(
          '2-10',
          'Match the V5 motor cartridge color to its output speed:',
          [
            'Red = 600 RPM, Green = 200 RPM, Blue = 100 RPM',
            'Red = 100 RPM, Green = 200 RPM, Blue = 600 RPM',
            'Red = 200 RPM, Green = 100 RPM, Blue = 600 RPM',
            'All cartridges are 200 RPM; only the gears inside differ',
          ],
          1,
          'Red = 100 RPM (torque), Green = 200 RPM (standard), Blue = 600 RPM (speed).'
        ),
        mc(
          '2-11',
          'Your mechanism needs maximum torque directly from the motor. Which cartridge do you choose?',
          [
            'Blue (600 RPM)',
            'Green (200 RPM)',
            'Red (100 RPM)',
            'Cartridge choice does not affect torque',
          ],
          2,
          'The red 100 RPM cartridge trades speed for the most torque.'
        ),
        mc(
          '2-12',
          'What is a key difference between the 11W and 5.5W V5 Smart Motors?',
          [
            'The 5.5W motor is faster than any 11W cartridge',
            'The 11W motor accepts swappable cartridges (100/200/600 RPM); the 5.5W motor is fixed at 200 RPM with no interchangeable cartridge',
            'The 11W motor cannot be used on drivetrains',
            'They are identical except for the connector',
          ],
          1,
          'The 11W motor takes 100/200/600 RPM cartridges; the 5.5W motor has a fixed 200 RPM output and no swappable cartridge.'
        ),
        mc(
          '2-13',
          'When is a 5.5W motor a good choice?',
          [
            'On a heavy pushing drivetrain',
            'On a light, low-load mechanism where full 11W power is not needed',
            'Never — it is obsolete',
            'Only for flywheels',
          ],
          1,
          'Half the power, smaller and lighter — 5.5W motors suit light mechanisms that do not need full 11W power.'
        ),
        mc(
          '2-14',
          'When cutting C-channel with a hacksaw, why should you couple (nest) two C-channels together before clamping them in the vice?',
          [
            'It lets you skip marking the cut line',
            'The nested channels reinforce each other, so the walls do not bend or crush in the vice and the cut stays straight and square',
            'It makes the hacksaw blade last longer',
            'It is only done to save time by cutting two parts at once',
          ],
          1,
          'Nesting the channels reinforces the thin walls so the vice cannot crush them, and the extra rigidity keeps the cut straight and square.'
        ),
        mc(
          '2-15',
          'How should a hacksaw be used for a clean cut?',
          [
            'Teeth facing backward, cutting on the pull stroke',
            'Teeth facing forward, cutting with steady pressure on the push stroke',
            'Short fast strokes using only the middle of the blade',
            'Any direction works the same',
          ],
          1,
          'Hacksaw teeth point forward: apply steady pressure on the push stroke, using full-length strokes.'
        ),
        mc(
          '2-16',
          'After cutting metal with a hacksaw, what should you use a file for?',
          [
            'Polishing the entire part to a mirror finish',
            'Smoothing the cut edge, removing sharp burrs, and fine-tuning the part to final size',
            'Bending the channel to shape',
            'Files are only used on plastic parts',
          ],
          1,
          'Filing cleans up the cut: it smooths sharp edges, removes burrs, and lets you sneak up on the final dimension.'
        ),
        {
          kind: 'short-answer',
          id: '2-17',
          prompt:
            'Describe the correct process for cutting a C-channel to length with a hacksaw, from marking the cut to finishing the edge.',
          points: 4,
          modelAnswer:
            'Mark the cut line, couple/nest a second C-channel with the one being cut for rigidity, clamp the pair securely in the vice close to the cut line, cut with steady full strokes on the marked line, then file the cut edge smooth to remove burrs and reach final size.',
        },
        {
          kind: 'short-answer',
          id: '2-18',
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
        'Onshape Parts Studios, Assemblies, mates (fastened, revolute, slider), and designing parts for 3D printing.',
      questions: [
        mc(
          '3-1',
          'In Onshape, where are individual parts modeled, and where are they mated together?',
          [
            'Parts are modeled in Assemblies; mated in Parts Studios',
            'Parts are modeled in Parts Studios; mated in Assemblies',
            'Both happen in the Drawing tab',
            'Onshape does not support assemblies',
          ],
          1,
          'Model in Parts Studios; insert and mate in Assemblies.'
        ),
        mc(
          '3-2',
          'What is a mate connector in Onshape?',
          [
            'A physical VEX part used to join channels',
            'A point (with position and orientation) on a part where mates attach when assembling',
            'A tool for measuring distances',
            'A type of export file',
          ],
          1,
          'Mate connectors are the snap points — each one carries a position and orientation that mates use to align parts.'
        ),
        mc(
          '3-3',
          'What does a FASTENED mate do?',
          [
            'Allows rotation about one axis',
            'Locks two parts rigidly together with zero degrees of freedom',
            'Allows sliding along one axis',
            'Connects a part to the origin only',
          ],
          1,
          'Fastened removes all degrees of freedom — use it for parts that are screwed or fixed together.'
        ),
        mc(
          '3-4',
          'What does a REVOLUTE mate do?',
          [
            'Locks two parts rigidly together',
            'Allows rotation about a single axis — one rotational degree of freedom',
            'Allows free movement in all directions',
            'Mirrors a part across a plane',
          ],
          1,
          'Revolute leaves exactly one rotational degree of freedom — the mate for anything that spins or pivots.'
        ),
        mc(
          '3-5',
          'What does a SLIDER mate do?',
          [
            'Allows rotation about one axis',
            'Allows translation along a single axis — one linear degree of freedom',
            'Locks two parts together',
            'Allows both rotation and sliding',
          ],
          1,
          'Slider leaves one translational degree of freedom — the mate for linear slides and rails.'
        ),
        mc(
          '3-6',
          'Which mate allows a part to BOTH rotate about an axis AND slide along that same axis?',
          ['Fastened', 'Revolute', 'Cylindrical', 'Planar'],
          2,
          'Cylindrical = rotation plus translation along one axis.'
        ),
        mc(
          '3-7',
          'You are assembling a drivetrain in Onshape. Which mates are correct for (a) a wheel spinning on its axle and (b) a C-channel screwed to another C-channel?',
          [
            '(a) Fastened, (b) Revolute',
            '(a) Revolute, (b) Fastened',
            'Both Revolute',
            'Both Fastened',
          ],
          1,
          'The wheel needs to rotate → revolute. The screwed structure must be rigid → fastened.'
        ),
        mc(
          '3-8',
          'Which mate would you use for the moving stage of a linear lift on rails?',
          ['Revolute', 'Fastened', 'Slider', 'Ball'],
          2,
          'A linear lift stage translates along one axis → slider mate.'
        ),
        mc(
          '3-9',
          'Why should you fix (ground) the first part you insert into an Onshape assembly?',
          [
            'It makes the file smaller',
            'It anchors the assembly so everything else is mated relative to a part that cannot float around',
            'Onshape requires it before you can save',
            'It automatically mates all other parts',
          ],
          1,
          'Fixing the first part anchors the assembly; without it the whole model can drift when you drag parts.'
        ),
        mc(
          '3-10',
          'After mating a four-bar in Onshape, how do you quickly check that the joints have the right degrees of freedom?',
          [
            'Export the model and inspect the file size',
            'Drag the linkage in the assembly — it should move only the way the real mechanism would',
            'Count the number of parts',
            'Check the color of the mates',
          ],
          1,
          'Dragging the assembly reveals its degrees of freedom — a correctly mated four-bar swings like the real one.'
        ),
        mc(
          '3-11',
          'Why does the curriculum use the MKCAD library instead of modeling VEX parts from scratch?',
          [
            'MKCAD parts are stronger',
            'It provides accurate, ready-made VEX components so you can assemble designs quickly instead of remodeling every part',
            'Onshape cannot model VEX parts',
            'It is required to export STL files',
          ],
          1,
          'MKCAD supplies accurate VEX part models, so design time goes into the robot, not remodeling stock parts.'
        ),
        mc(
          '3-12',
          'What file format do you export from Onshape to 3D print a custom part?',
          ['.dxf', '.pdf', '.stl', '.docx'],
          2,
          'STL is the standard export format for 3D printing.'
        ),
        mc(
          '3-13',
          'What does the slicer do with your STL file before printing?',
          [
            'It checks the file for viruses',
            'It converts the 3D model into layer-by-layer instructions (G-code) the printer can execute, using your settings like layer height and infill',
            'It shrinks the model to fit the print bed automatically',
            'It uploads the model to Onshape',
          ],
          1,
          'Slicing turns the model into layers and toolpaths — the printer instructions — based on settings like layer height, infill, and supports.'
        ),
        mc(
          '3-14',
          'Why is 45° considered the limit for support-free overhangs in 3D printing?',
          [
            'The printer nozzle physically cannot tilt past 45°',
            'Beyond about 45°, each layer overhangs too far past the layer below it, so the plastic droops without support material',
            'It is only a stylistic guideline',
            'Overhangs of any angle always need supports',
          ],
          1,
          'Each layer can only overhang the previous one a little; past ~45° there is not enough material underneath and the print sags.'
        ),
        mc(
          '3-15',
          'What is the trade-off of printing a part with LOWER infill percentage?',
          [
            'Lighter, faster, and cheaper to print — but weaker',
            'Stronger but heavier',
            'No difference except color',
            'Lower infill always causes the print to fail',
          ],
          0,
          'Lower infill saves material and print time and reduces weight, at the cost of part strength.'
        ),
        mc(
          '3-16',
          'What does a SMALLER layer height give you?',
          [
            'A faster print with less detail',
            'A finer, more accurate surface — but a longer print time',
            'A stronger part in every direction',
            'Nothing — layer height is cosmetic only',
          ],
          1,
          'Smaller layers = finer detail and accuracy, but many more layers to print, so it takes longer.'
        ),
        mc(
          '3-17',
          'In which direction is a 3D printed part WEAKEST?',
          [
            'Along the layer lines — layers can peel apart (delaminate) under load',
            'Perpendicular to the layer lines',
            'Printed parts are equally strong in all directions',
            'Diagonally at exactly 45°',
          ],
          0,
          'Prints fail by layers separating — orient the part so the load does not pull layers apart.'
        ),
        mc(
          '3-18',
          'You design a printed bracket with a hole for a VEX shaft, but the shaft will not fit after printing. Why?',
          [
            'The slicer deleted the hole',
            'Printed holes come out slightly undersized, so holes should be modeled slightly oversized (or cleaned up with a drill/file)',
            'VEX shafts expand when touching plastic',
            'STL files cannot contain holes',
          ],
          1,
          'Printed holes shrink slightly — oversize them in CAD or post-process with a drill or file.'
        ),
        mc(
          '3-19',
          'When ARE support structures needed on a print?',
          [
            'On every print, always',
            'When the model has overhangs steeper than about 45° or bridges that would otherwise print into thin air',
            'Only when the part is taller than 10 cm',
            'Supports are added by Onshape, not the slicer',
          ],
          1,
          'Supports hold up geometry that exceeds the ~45° overhang limit or spans gaps; they are removed after printing.'
        ),
        mc(
          '3-20',
          'Why is Onshape well suited to team robot design?',
          [
            'It only runs on one dedicated computer',
            'It is cloud-based, so the whole team can view and edit the same document simultaneously with built-in version control',
            'It automatically builds the robot',
            'It is the only CAD tool that supports VEX parts',
          ],
          1,
          'Onshape runs in the browser with real-time collaboration and version control — the whole team works in one document.'
        ),
        {
          kind: 'short-answer',
          id: '3-21',
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
        mc(
          '4-1',
          'Which of the following lists contains ONLY lift mechanisms?',
          [
            'Four-bar, six-bar, DR4B, linear lift',
            'Flywheel, puncher, catapult',
            'Roller, claw, passive intake',
            'Tank drive, X-drive, mecanum',
          ],
          0,
          'Four-bar, six-bar, DR4B, and linear lifts are lift mechanisms; the others are shooters, intakes, and drivetrains.'
        ),
        mc(
          '4-2',
          'What useful property does a four-bar linkage give the mechanism on its end?',
          [
            'It spins the end continuously',
            'The end stays at a constant angle through the lift’s travel because the links move in parallel',
            'It doubles the motor’s speed',
            'It removes the need for bracing',
          ],
          1,
          'A parallel four-bar keeps the end effector at the same angle as it travels — great for keeping game objects level.'
        ),
        mc(
          '4-3',
          'What is the main advantage of a Double Reverse Four-Bar (DR4B) over a single four-bar?',
          [
            'It uses fewer parts',
            'It reaches roughly twice the height while keeping the end moving in a straight vertical path',
            'It does not need motors',
            'It is immune to twisting',
          ],
          1,
          'Stacking two reversed four-bars doubles the height with straight vertical travel.'
        ),
        mc(
          '4-4',
          'You gear a lift motor for more torque. What happens to its output speed?',
          ['It increases', 'It decreases', 'It stays the same', 'Torque and speed are unrelated'],
          1,
          'Torque and speed trade off: more torque means less speed.'
        ),
        mc(
          '4-5',
          'A 12-tooth pinion drives an 84-tooth gear on a lift arm. What is the gear ratio, and what does it do?',
          [
            '1:7 for speed — the arm spins 7× faster',
            '7:1 for torque — the arm turns 7× slower but with about 7× the torque',
            '84:12 for speed',
            "1:1 — tooth count doesn't matter",
          ],
          1,
          '84 ÷ 12 = 7, so the ratio is 7:1 for torque.'
        ),
        mc(
          '4-6',
          'A compound gear train has a 12t gear driving a 60t gear (stage 1), and on the same shaft as the 60t, a 12t gear drives a 36t gear (stage 2). What is the total ratio?',
          [
            '5:1 — only the first stage counts',
            '8:1 — add the two stages',
            '15:1 for torque — multiply the stages (5 × 3)',
            '3:1 — only the last stage counts',
          ],
          2,
          'Compound stages multiply: (60/12) × (36/12) = 5 × 3 = 15:1.'
        ),
        mc(
          '4-7',
          'When would you use chain and sprockets instead of gears?',
          [
            'When you need to reverse the direction of rotation',
            'When you need to transfer power across a distance while keeping the same direction of rotation',
            'When you need the absolute minimum backlash',
            'Chain is never preferred over gears',
          ],
          1,
          'Chain spans distance and keeps rotation direction; meshed gears reverse direction and must be adjacent.'
        ),
        mc(
          '4-8',
          'Why are rubber bands often added to lift mechanisms?',
          [
            'To make the robot legal for competition',
            "To counterbalance the lift's weight so the motors work less",
            'To increase friction in the joints',
            'For decoration',
          ],
          1,
          'Rubber bands counterbalance the lift, reducing motor load.'
        ),
        mc(
          '4-9',
          'How does the curriculum recommend limiting a lift’s range of motion?',
          [
            'Trusting the driver to stop in time',
            'With standoffs or other physical stops at the ends of travel',
            'By removing the motor at maximum height',
            'Range limits are unnecessary',
          ],
          1,
          '"Limit range with standoffs or physical stops" — hard stops protect the mechanism.'
        ),
        mc(
          '4-10',
          'What is compression in an intake system?',
          [
            'The amount the intake squeezes/grips the game object between rollers and a surface',
            'Compressing air for pneumatics',
            'Reducing the file size of your CAD',
            'Folding the intake for size limits',
          ],
          0,
          'Compression is how much the intake squeezes the game object — set by roller spacing.'
        ),
        mc(
          '4-11',
          'An intake has TOO MUCH compression. What happens?',
          [
            'Objects fly out at high speed',
            'Objects jam and the intake motor bogs down or stalls',
            'Nothing — more compression is always better',
            'The rollers spin faster',
          ],
          1,
          'Too tight = jams and stalled motors; too loose = dropped objects. Compression must be tuned.'
        ),
        mc(
          '4-12',
          'What is the difference between an active and a passive intake?',
          [
            'Active intakes are powered (e.g., motorized rollers); passive intakes use no motor (e.g., hooks, scoops, gravity)',
            'Active intakes are made of metal; passive intakes are plastic',
            'Passive intakes are always better',
            'There is no difference',
          ],
          0,
          'Active = powered; passive = unpowered (hooks, scoops, gravity-fed).'
        ),
        mc(
          '4-13',
          'In VEXcode, what is the difference between motor hold mode and coast mode when the motor stops?',
          [
            'Hold actively resists movement and holds position; coast lets the mechanism spin/drift freely',
            'Coast holds position; hold lets it drift',
            'Both behave identically',
            'Hold turns the motor off permanently',
          ],
          0,
          'Hold resists movement and keeps position; coast lets the mechanism drift.'
        ),
        mc(
          '4-14',
          'For a lift arm pivot that does NOT need to transfer rotation through the shaft, the curriculum recommends considering:',
          [
            'A rubber axle',
            'A screw joint instead of an axle',
            'Removing the pivot entirely',
            'Two motors on the same axle',
          ],
          1,
          'Screw joints are recommended for pivots where a live shaft is not needed.'
        ),
        mc(
          '4-15',
          'Your lift stalls just before reaching full height. Which fix does the curriculum suggest FIRST?',
          [
            'Drive the motor at more than 100% power',
            'Re-gear for more torque and/or add rubber band counterbalancing',
            'Shorten the driver’s practice time',
            'Remove the lift’s bracing to reduce weight',
          ],
          1,
          'Stalling means not enough torque: gear down and/or counterbalance with rubber bands before anything else.'
        ),
        mc(
          '4-16',
          'How does moving a load closer to the lift’s pivot affect the motor?',
          [
            'It has no effect',
            'It reduces the torque the motor must produce, because the load’s lever arm is shorter',
            'It increases the torque required',
            'It only matters for pneumatic lifts',
          ],
          1,
          'Torque = force × lever arm. A shorter lever arm means less torque needed for the same load.'
        ),
        {
          kind: 'short-answer',
          id: '4-17',
          prompt:
            'Your four-bar lift twists side to side and binds when raising. Using Unit 4 concepts, give two specific fixes.',
          points: 4,
          modelAnswer:
            'Any two: cross-brace or box the lift with standoffs against twisting, use screw joints instead of loose axles at the pivots, fix spacing or add washers/spacers so joints do not bind, link/gear both sides identically so they move together, correct the gearing for torque so motors are not stalling and flexing the structure.',
        },
        {
          kind: 'short-answer',
          id: '4-18',
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
