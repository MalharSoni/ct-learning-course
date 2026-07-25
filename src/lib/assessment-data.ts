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
  /** Route segment under /assessments. */
  slug: string;
  /** Short label used in nav and results headings, e.g. "Unit 1". */
  unitLabel: string;
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

export const v5Unit1Test: Assessment = {
  id: 'v5-unit-1-cad',
  slug: 'v5-unit-1',
  unitLabel: 'Unit 1',
  title: 'V5 Foundation — Unit 1 Test: Onshape CAD',
  description:
    'This test covers Unit 1 of the V5 Foundation Program, one section per lesson: sketching basics, sketch tools and constraints, assemblies and mates, and engineering drawings, plus a short section on designing a part to be 3D printed. Multiple choice questions are graded automatically; short answer questions are reviewed by your instructor.',
  totalPoints: 83,
  passingScore: 66,
  timeLimitMinutes: 75,
  sections: [
    {
      id: 'sketching-basics',
      title: 'Lesson 1 — Sketching Basics',
      description: 'What CAD is, the Onshape interface, sketches, dimensions and constraints, and the Extrude options.',
      questions: [
        mc(
          '1-1',
          'What does CAD stand for?',
          ['Computer-Aided Design', 'Computer Animation Design', 'Calculated Automatic Drafting', 'Custom Assembly Drawing'],
          0,
          'CAD is Computer-Aided Design: software for designing 3D parts on a computer before you build them in real life.'
        ),
        mc(
          '1-2',
          'Every 3D part in Onshape begins as what?',
          ['A finished solid', 'A 2D sketch on a flat plane', 'An assembly', 'A drawing'],
          1,
          'Every part starts as a flat 2D sketch on a plane, which you then push into 3D with Extrude.'
        ),
        mc(
          '1-3',
          'Which three default planes does Onshape give you to sketch on?',
          ['X, Y, and Z', 'Top, Front, and Right', 'North, South, and East', 'Base, Side, and Center'],
          1,
          'Onshape gives you Top, Front, and Right, set at right angles like the corner of a room.'
        ),
        mc(
          '1-4',
          'Which plane gives you a straight-down view of your part?',
          ['Front', 'Right', 'Top', 'Isometric'],
          2,
          'Top plane means looking straight down at the part. Front is head-on and Right is from the side.'
        ),
        mc(
          '1-5',
          'What does the Feature list on the left of the Part Studio show you?',
          ['Only the parts you have finished', 'A running history of everything you have done, in order, plus your default planes', 'The keyboard shortcuts for each tool', 'A preview of the finished drawing'],
          1,
          'The Feature list is a running history of your features in order. It also holds the Top, Front, and Right planes and lists your parts at the bottom.'
        ),
        mc(
          '1-6',
          'What is the view cube in the top right corner for?',
          ['Changing the units of the document', 'Snapping your view to a standard angle so you know which way you are looking', 'Measuring the size of the part', 'Switching between Part Studio and Assembly'],
          1,
          'The view cube snaps the camera to a standard angle so you always know which way you are looking at the part.'
        ),
        mc(
          '1-7',
          'What is the difference between a dimension and a constraint in a sketch?',
          ['A dimension locks a relationship like parallel; a constraint sets an exact number', 'A dimension sets an exact size with a number; a constraint locks a relationship between lines, such as parallel or equal', 'They are two names for the same tool', 'Constraints work only on circles and dimensions only on lines'],
          1,
          'Dimensions set exact numeric sizes. Constraints lock relationships between entities, such as parallel, equal, or coincident.'
        ),
        mc(
          '1-8',
          'Your sketch geometry is showing blue. What does that tell you?',
          ['The sketch is fully locked and finished', 'The sketch is under-constrained and something can still move', 'The lines are construction geometry', 'The sketch is on the wrong plane'],
          1,
          'Blue means under-constrained: something can still move. Black means fully constrained and locked.'
        ),
        mc(
          '1-9',
          'Which Extrude option do you use to cut a hole through an existing block?',
          ['New', 'Add', 'Remove', 'Intersect'],
          2,
          'Remove subtracts material from an existing part, which is how you cut holes and slots.'
        ),
        mc(
          '1-10',
          'You already extruded a solid block and now want to fuse a new cylinder onto it as one part. Which Extrude option?',
          ['New', 'Add', 'Remove', 'Intersect'],
          1,
          'Add joins new material onto an existing part. New would start a separate part instead.'
        ),
        mc(
          '1-11',
          'In the Extrude dialog, what does the Blind setting with a Depth value do?',
          ['Hides the sketch while extruding', 'Pushes the shape a set distance that you type in', 'Extrudes until it hits another part', 'Extrudes in both directions automatically'],
          1,
          'Blind means a set depth: you type how far the shape travels and Onshape sweeps it exactly that far.'
        ),
        mc(
          '1-12',
          'A teammate asks you to add a rounded corner to a finished 3D part with the Fillet tool. Where does Fillet work?',
          ['Only inside a sketch, before extruding', 'On the solid part: you select an edge and type a radius', 'Only on the drawing sheet', 'Fillet must be drawn by hand with the Arc tool'],
          1,
          'Fillet is not a sketch tool. You select an edge on the finished 3D part, run Fillet, and type a radius.'
        ),
        mc(
          '1-13',
          'You sketch a 6 by 4 rectangle and extrude it 2 inches with the New option. What do you have?',
          ['A 6 by 4 by 2 solid block', 'A 6 by 4 flat face with no thickness', 'Two separate parts', 'A 12 by 8 by 2 block'],
          0,
          'Extrude sweeps the shape through the depth you set, so a 6 by 4 rectangle pushed 2 inches becomes a 6 by 4 by 2 block.'
        ),
        {
          kind: 'short-answer',
          id: '1-14',
          prompt: 'List, in order, the four moves used to build a block with a hole through it, starting from an empty document. For each move, name the tool or option you would use.',
          points: 4,
          modelAnswer: 'Any answer matching this loop: (1) Sketch the outline on a plane (Top plane) and dimension it. (2) Exit the sketch and Extrude with the New option to a set depth, making the solid block. (3) Start a new sketch on the top face of the block and draw a circle where the hole goes. (4) Exit and Extrude that circle with the Remove option, deep enough to pass through, which carves out the hole. Award credit for the sketch, extrude New, sketch on face, extrude Remove sequence even if wording differs.',
        },
      ],
    },
    {
      id: 'sketch-tools-constraints',
      title: 'Lesson 2 — Sketch Tools & Constraints',
      description: 'Polygon, Slot, Spline and Center Rectangle, construction lines, the common constraints, and Mirror and patterns.',
      questions: [
        mc(
          '2-1',
          'Which sketch tool draws a regular shape with N equal sides, such as the hexagon that matches a VEX hex shaft?',
          ['Slot', 'Polygon', 'Spline', 'Center Rectangle'],
          1,
          'Polygon draws a regular shape with the number of equal sides you type, built around a dashed construction circle.'
        ),
        mc(
          '2-2',
          'Which tool draws a rounded rectangle: a straight section capped by a half-circle at each end?',
          ['Slot', 'Polygon', 'Arc', 'Spline'],
          0,
          'Slot draws a straight section with a rounded cap on each end, used for cable pass-throughs, adjustment tracks, and zip-tie openings.'
        ),
        mc(
          '2-3',
          'Why does the lesson tell you to use Splines sparingly?',
          ['They cannot be extruded', 'They are hard to fully constrain', 'They only work on the Top plane', 'They always turn the sketch blue'],
          1,
          'Splines are hard to fully constrain, so line, rectangle, and arc are the first choice for most VEX parts.'
        ),
        mc(
          '2-4',
          'How is a Center Rectangle different from a normal rectangle?',
          ['It has rounded corners', 'It grows outward from its center instead of from a corner', 'It is always square', 'It is construction geometry only'],
          1,
          'Center Rectangle grows outward from the center point you click, so a plate centered on the origin stays symmetric in all four directions.'
        ),
        mc(
          '2-5',
          'What is a construction line?',
          ['A line that becomes a real edge when you extrude', 'A dashed reference line that never becomes real geometry', 'A line that is automatically dimensioned', 'A line that can only be drawn on the Front plane'],
          1,
          'Construction lines are dashed reference geometry. They live in the sketch as scaffolding but never extrude or become an edge.'
        ),
        mc(
          '2-6',
          'Why is a construction line a good choice for a mirror axis?',
          ['It doubles the number of dimensions in the sketch', 'It defines the axis without adding a real edge to the finished part', 'It forces the sketch to stay blue', 'It automatically applies the Equal constraint'],
          1,
          'A construction line defines the symmetry axis but never becomes real geometry, so it will not extrude or leave an edge on the part.'
        ),
        mc(
          '2-7',
          'Which constraint locks two points together, or pins a point onto a line?',
          ['Equal', 'Tangent', 'Coincident', 'Parallel'],
          2,
          'Coincident is the glue that joins geometry. It is why a rectangle’s corners stay attached, and Onshape applies it constantly as you draw.'
        ),
        mc(
          '2-8',
          'Which constraint forces two line segments to be the same length?',
          ['Coincident', 'Parallel', 'Equal', 'Tangent'],
          2,
          'Equal forces two segments to the same length, or two circles to the same radius, without typing a number for each.'
        ),
        mc(
          '2-9',
          'What do the Horizontal and Vertical constraints do?',
          ['Lock a line along the X axis and along the Y axis', 'Set the length of a line', 'Make two lines meet at 90 degrees to each other', 'Convert a line to construction geometry'],
          0,
          'Horizontal locks a line along the X axis and Vertical locks it along the Y axis, removing the wobble from a line that is almost straight.'
        ),
        mc(
          '2-10',
          'Which constraint guarantees a true 90-degree corner between two lines?',
          ['Parallel', 'Perpendicular', 'Equal', 'Coincident'],
          1,
          'Perpendicular forces two lines to meet at exactly 90 degrees, so you state the relationship instead of dimensioning an angle.'
        ),
        mc(
          '2-11',
          'Which constraint makes a straight line flow smoothly into a rounded end, touching at one point without crossing in?',
          ['Tangent', 'Coincident', 'Equal', 'Vertical'],
          0,
          'Tangent makes a line meet a circle or arc smoothly at one point. It is what makes a slot’s straight side flow into its rounded end.'
        ),
        mc(
          '2-12',
          'You have one circle and need a row of 5 evenly spaced holes. Which tool?',
          ['Mirror', 'Circular Pattern', 'Linear Pattern', 'Slot'],
          2,
          'Linear Pattern repeats an entity along a straight line at even spacing. You set the count, the direction, and the spacing.'
        ),
        mc(
          '2-13',
          'You need six bolt holes spaced evenly around a circular flange. Which tool?',
          ['Mirror', 'Linear Pattern', 'Circular Pattern', 'Polygon'],
          2,
          'Circular Pattern repeats an entity around a center point, spacing copies evenly around a circle.'
        ),
        mc(
          '2-14',
          'A Circular Pattern needs which three inputs?',
          ['Width, height, and depth', 'Count, center point, and total angle', 'Spacing, tangent, and equal', 'Color, layer, and name'],
          1,
          'Circular Pattern needs how many copies (count), what to rotate around (center point), and how far around to spread them (total angle).'
        ),
        mc(
          '2-15',
          'You set a Circular Pattern to 4 copies across 270 degrees instead of 360. What do you get?',
          ['Four holes evenly spread around three quarters of the circle, leaving one quarter open', 'Four holes bunched at one side', 'An error, because a pattern must be 360 degrees', 'Three holes instead of four'],
          0,
          'A smaller total angle spreads the copies over part of the circle. The lesson’s example puts 4 holes across 270 degrees, leaving one quarter open.'
        ),
        mc(
          '2-16',
          'You finish a sketch and one line is still blue. According to the lesson, what usually fixes it?',
          ['Adding another dimension is always the answer', 'Adding a constraint such as Equal, Parallel, or Perpendicular', 'Deleting the line and redrawing it', 'Switching the sketch to a different plane'],
          1,
          'A blue line usually needs an Equal, Parallel, or Perpendicular constraint rather than another dimension. One constraint can do the work of five dimensions.'
        ),
        {
          kind: 'short-answer',
          id: '2-17',
          prompt: 'Explain what it means for a sketch to be fully constrained, how Onshape shows you that on screen, and one check you can do that is more reliable than reading the colour.',
          points: 4,
          modelAnswer: 'A fully constrained sketch has every point and line pinned down, so it cannot change shape by accident and it updates predictably when you edit a dimension. Onshape shows it by colouring the geometry black; blue means under-constrained and something can still move. The more reliable check is the drag test: try to drag the geometry, and if nothing moves the sketch is locked.',
        },
      ],
    },
    {
      id: 'assemblies-mates',
      title: 'Lesson 3 — Assemblies & Mates',
      description: 'Part Studio versus Assembly, degrees of freedom, the four core mates, mate connectors, and the standard build workflow.',
      questions: [
        mc(
          '3-1',
          'Where do you model individual parts, and where do you mate them together?',
          ['Model in Assemblies; mate in Part Studios', 'Model in Part Studios; mate in Assemblies', 'Both happen in the Drawing tab', 'Onshape does not support assemblies'],
          1,
          'Parts are modelled in a Part Studio, then inserted into an Assembly where mates define how they move.'
        ),
        mc(
          '3-2',
          'A part floating freely in 3D space has how many degrees of freedom?',
          ['3', '6', '1', '12'],
          1,
          'A free part has 6 degrees of freedom: three slides (X, Y, Z) and three spins.'
        ),
        mc(
          '3-3',
          'What is a mate’s job, stated in terms of degrees of freedom?',
          ['To add degrees of freedom so parts can move more', 'To remove degrees of freedom until a part can only move the way the real joint allows', 'To lock every part in the assembly', 'To change the size of a part'],
          1,
          'A mate removes degrees of freedom. Name the joint’s real motion, then pick the mate that leaves only that.'
        ),
        mc(
          '3-4',
          'How many degrees of freedom does a Fastened mate leave?',
          ['0', '1 rotational', '1 translational', '3'],
          0,
          'Fastened removes all six degrees of freedom, bonding the two parts into one rigid piece.'
        ),
        mc(
          '3-5',
          'A wheel needs to spin on an axle but never slide along it. Which mate?',
          ['Slider', 'Revolute', 'Fastened', 'Planar'],
          1,
          'Revolute leaves exactly one rotational degree of freedom, which is what a wheel on an axle needs.'
        ),
        mc(
          '3-6',
          'Which mate leaves one translational degree of freedom, for a drawer or a linear rail?',
          ['Revolute', 'Slider', 'Fastened', 'Cylindrical'],
          1,
          'Slider leaves one translational degree of freedom: the part slides in a straight line but cannot rotate.'
        ),
        mc(
          '3-7',
          'A Planar mate leaves which three degrees of freedom?',
          ['Rotation about X, Y, and Z', 'Translation in X, translation in Y, and rotation about Z', 'Translation in X, Y, and Z', 'None; it removes all six'],
          1,
          'Planar keeps a part on a flat surface: it slides in X and Y and spins about Z, like a hockey puck on ice.'
        ),
        mc(
          '3-8',
          'Which mate allows a part to BOTH rotate about an axis AND slide along that same axis?',
          ['Fastened', 'Planar', 'Cylindrical', 'Revolute'],
          2,
          'Cylindrical combines a Revolute and a Slider on the same axis: one rotational plus one translational degree of freedom.'
        ),
        mc(
          '3-9',
          'You are assembling a drivetrain. Which mates are correct for (a) a wheel spinning on its axle and (b) a motor bolted permanently to a chassis plate?',
          ['(a) Fastened, (b) Revolute', '(a) Revolute, (b) Fastened', 'Both Revolute', 'Both Fastened'],
          1,
          'The wheel must rotate, so Revolute. The bolted motor must be rigid with zero degrees of freedom, so Fastened.'
        ),
        mc(
          '3-10',
          'What is the correct order for the standard assembly workflow?',
          ['Fix one part, add mates, then insert parts', 'Insert parts, fix one part, then add mates', 'Add mates, insert parts, then fix one part', 'Insert parts, add mates, then fix one part'],
          1,
          'Insert every part first, fix one as the anchor, then mate everything else relative to it.'
        ),
        mc(
          '3-11',
          'Why do you Fix the first part in an assembly?',
          ['It makes the file smaller', 'It anchors the assembly so parts do not drift when you drag them', 'Onshape will not let you save without it', 'It mates all the other parts automatically'],
          1,
          'Without an anchor, dragging one part drags the others because nothing holds still. One fixed part is the foundation everything else builds on.'
        ),
        mc(
          '3-12',
          'What is a mate connector?',
          ['A physical VEX part used to join channels', 'A small coordinate system on a face, edge, or point, which mates attach to', 'A tool for measuring distances', 'A type of export file'],
          1,
          'A mate connector is a tiny set of X, Y, Z axes sitting on your geometry. Every mate joins two of them, and those two define the Z axis of the mate.'
        ),
        mc(
          '3-13',
          'After adding a mate, what is the fastest way to check you picked the right one?',
          ['Export the file and check its size', 'Drag the part and see whether it moves only the way the real joint would', 'Count the parts in the parts list', 'Check the colour of the mate icon'],
          1,
          'Drag-to-test is not optional. Check each mate right after you add it, because catching a wrong one later takes far longer.'
        ),
        mc(
          '3-14',
          'In the fidget spinner build, the side bearings have to spin AND slide. Which mate did the lesson use, and why?',
          ['Fastened, because it locks the bearing in place', 'Planar, because it slides on a flat surface', 'Cylindrical, because it combines a Revolute and a Slider', 'Revolute, because it only needs to rotate'],
          2,
          'Cylindrical is the first combined mate: Revolute plus Slider on one axis, so the bearing can both spin and slide.'
        ),
        mc(
          '3-15',
          'What does the Animate feature on a mate do?',
          ['Exports a video of the whole assembly', 'Moves the part through its range between a start and end value so you can watch the motion', 'Adds a second mate automatically', 'Converts the assembly into a drawing'],
          1,
          'Animate plays a mate’s motion: pick the mate, set a start and end value, and Onshape moves the part through its range.'
        ),
        {
          kind: 'short-answer',
          id: '3-16',
          prompt: 'You are building a four-bar lift in an assembly. State which mate you would use at each of the four pivots and which mate for the screwed structural joints, and explain both choices using degrees of freedom. Then describe how you would confirm the assembly is mated correctly.',
          points: 5,
          modelAnswer: 'Revolute at each of the four pivots, because each linkage joint rotates about a single axis and Revolute leaves exactly one rotational degree of freedom. Fastened for the screwed structural joints, because they must be rigid and Fastened removes all six degrees of freedom. To confirm, drag the linkage in the assembly: it should swing the way the real four-bar would and nothing else should move. Full credit also for mentioning fixing one part first as the anchor.',
        },
      ],
    },
    {
      id: 'engineering-drawings',
      title: 'Lesson 4 — Engineering Drawings',
      description: 'Views, section and detail views, dimensioning rules, notes, title block and BOM, and exporting.',
      questions: [
        mc(
          '4-1',
          'What is an engineering drawing for?',
          ['Making the 3D model look nicer on screen', 'Giving someone the exact sizes and notes they need to build the part', 'Storing a backup copy of the model', 'Replacing the assembly'],
          1,
          'The model is the idea; the drawing is the instructions. It is what you hand to whoever actually cuts or machines the part.'
        ),
        mc(
          '4-2',
          'What keeps an Onshape drawing correct when you change the 3D part?',
          ['You redraw the affected views by hand', 'The drawing stays linked to the model and updates automatically', 'You export a new PDF and edit the numbers in it', 'Nothing; drawings and models are separate files'],
          1,
          'Onshape drawings stay linked to the model, so changing the part updates the views and dimensions.'
        ),
        mc(
          '4-3',
          'A dimension on your drawing is wrong because you changed a hole size on the 3D part. What is the correct fix, per the golden rule?',
          ['Double-click the dimension text and type the correct number', 'Edit the 3D part, and the linked drawing view updates itself', 'Delete the drawing and start a new one', 'Leave it, because drawings do not need to match the model'],
          1,
          'Let the model drive the drawing. A hand-edited number lies the moment the model changes.'
        ),
        mc(
          '4-4',
          'Which two template families does the lesson name as the ones you will see most?',
          ['DWG and DXF', 'Metric and Imperial', 'ANSI and ISO', 'Front and Top'],
          2,
          'ANSI (United States, often inches) and ISO (most of the world, millimetres). You will also see JIS.'
        ),
        mc(
          '4-5',
          'Which four views does the lesson say you will use constantly?',
          ['Front, Top, Right, and Isometric', 'Front, Back, Left, and Right', 'Top, Bottom, Section, and Detail', 'Isometric only'],
          0,
          'Front, Top, Right, and Isometric. Start with Front, project Top and Right, and put an Isometric in a corner.'
        ),
        mc(
          '4-6',
          'For a simple flat plate with one hole, why are Front, Top, and an Isometric enough?',
          ['Onshape allows only three views per sheet', 'One view leaves the thickness ambiguous, while Back, Bottom, and Left would just repeat what Front, Top, and Right already show', 'An Isometric view always replaces the Front view', 'Plates never need dimensions, only views'],
          1,
          'One view is not enough and five is clutter. Show the outline, the thickness, and the overall shape, each exactly once.'
        ),
        mc(
          '4-7',
          'A part has a bore hidden deep inside it that you need to dimension. Which view?',
          ['Detail view, because it enlarges the outside of the part', 'Section view, because it slices the part open along a cutting line', 'Isometric view', 'A second Front view'],
          1,
          'A Section view cuts the part open and hatches the cut face so you can see and dimension internal features such as bores and pockets.'
        ),
        mc(
          '4-8',
          'A chamfer on your part is too small to read on the drawing. Which view fixes that?',
          ['Section view', 'Detail view', 'Top view', 'Auxiliary view'],
          1,
          'A Detail view draws a small region at a larger scale. You circle the region on a parent view and Onshape creates an enlarged, labelled copy.'
        ),
        mc(
          '4-9',
          'A drawing tags the same hole twice, once as 8 mm and once as 7.5 mm. What is this called and why is it a problem?',
          ['Under-dimensioned; the maker has to guess the size', 'Over-dimensioned; the maker cannot tell which number to trust', 'Correctly dimensioned; two views need two numbers', 'A scale error; the numbers are both right at different scales'],
          1,
          'Over-dimensioned means a feature is dimensioned more than once, producing conflicting values. The maker cannot tell which to trust and one of the parts comes out wrong.'
        ),
        mc(
          '4-10',
          'What is the rule that prevents both over- and under-dimensioning?',
          ['Dimension each feature exactly once', 'Always use at least five views', 'Dimension only the largest features', 'Put every dimension inside the part outline'],
          0,
          'Dimension each feature exactly once: every size the maker needs appears, and no size appears twice.'
        ),
        mc(
          '4-11',
          'Which four items does the lesson say you should always fill in on the title block?',
          ['Part name, scale, units, and material', 'Designer name, date, revision, and colour', 'Quantity, cost, supplier, and weight', 'Front, Top, Right, and Isometric'],
          0,
          'The title block is the boxed table in the sheet corner. Always fill in at least part name, scale, units, and material.'
        ),
        mc(
          '4-12',
          'What is a BOM on an assembly drawing?',
          ['A note describing the material', 'A parts list with one row per part: item number, quantity, name, and part number', 'A type of section view', 'The border around the sheet'],
          1,
          'A Bill of Materials lists every part in the assembly and updates automatically when you add or remove parts.'
        ),
        mc(
          '4-13',
          'On an assembly drawing, why must each callout (balloon) match a row in the BOM?',
          ['Balloons set the scale of the drawing', 'So every part in the picture maps to exactly one line in the parts list', 'Because the BOM cannot update on its own', 'To replace the dimensions on the assembly'],
          1,
          'A callout carries a part’s item number from the BOM, so the picture and the table agree.'
        ),
        mc(
          '4-14',
          'You are handing a drawing to a sponsor’s shop to print and cut. Which export, and what do you check first?',
          ['DXF, and check the BOM lists every part', 'PDF, and check the scale label in the title block', 'DWG, and check the Isometric view is in a corner', 'Any format works and nothing needs checking'],
          1,
          'Export a PDF for printing and sharing, and check the scale label first. A PDF printed at the wrong scale measures wrong on paper.'
        ),
        mc(
          '4-15',
          'Which export format would you use to bring the drawing into other CAD or CAM software, such as for a CNC router’s toolpaths?',
          ['PDF', 'DWG or DXF', 'PNG', 'STL'],
          1,
          'DWG or DXF carry the drawing into other CAD or CAM software. PDF is for sharing and printing.'
        ),
        mc(
          '4-16',
          'Which of these belongs in a Note rather than as a dimension?',
          ['The diameter of a hole', 'The material and the projection standard', 'The distance between two holes', 'The overall length of the plate'],
          1,
          'Notes carry what a size cannot: material, finish, projection standard, or an instruction such as "BREAK ALL SHARP EDGES".'
        ),
        {
          kind: 'short-answer',
          id: '4-17',
          prompt: 'The lesson says a drawing is only finished when a person who has never seen your 3D model could build the part from it. Using that standard, list four things you would check on a drawing before handing it over, and explain why each one matters.',
          points: 4,
          modelAnswer: 'Any four of: every feature dimensioned exactly once, with nothing missing or duplicated, so the maker never has to guess or choose between two numbers; only the views needed are shown, usually three or four, so nothing is ambiguous and nothing is clutter; dimensions placed in clear space around the views rather than on the part, so they stay readable; units and material stated in the title block, so the part is made from the right stock at the right size; centrelines and centremarks on every hole and round feature; the scale label checked before printing.',
        },
        {
          kind: 'short-answer',
          id: '4-18',
          prompt: 'You need to document a part that has a hidden internal pocket and one very small fillet. Name the two special views you would add, say what each one does, and explain why the standard Front, Top, and Right views are not enough on their own.',
          points: 3,
          modelAnswer: 'A Section view slices the part open along a cutting line and hatches the cut face, revealing the internal pocket so it can be seen and dimensioned. A Detail view draws a small region at a larger scale so the small fillet is readable. The standard views only show the outside of the part at one scale, so a hidden pocket does not appear and a tiny fillet is too small to read.',
        },
      ],
    },
    {
      id: 'design-for-printing',
      title: 'Designing for 3D Printing',
      description: 'Design decisions you make in CAD so a custom part prints cleanly and holds up. No printer or slicer settings are tested.',
      questions: [
        mc(
          '5-1',
          'When designing a part to be printed, why keep overhanging faces within about 45 degrees?',
          ['Because a printer cannot physically move past 45 degrees', 'Because past about 45 degrees each layer hangs too far out over the layer below, so there is not enough material underneath and the plastic droops', 'It is only a styling preference', 'Because angled faces are harder to draw in CAD'],
          1,
          'Each layer can only hang out so far past the one below it. Keeping faces within about 45 degrees means every layer has support under it.'
        ),
        mc(
          '5-2',
          'A printed bracket will carry a load. Which way is a printed part weakest?',
          ['Along the layer lines, where layers can peel apart under load', 'Perpendicular to the layer lines', 'Printed parts are equally strong in every direction', 'Diagonally at exactly 45 degrees'],
          0,
          'Prints fail by layers separating, so orient the part in CAD such that the load does not pull the layers apart.'
        ),
        mc(
          '5-3',
          'You model a bracket with a hole sized exactly to a VEX shaft, but after printing the shaft will not fit. What is the design fix?',
          ['The hole was left out of the CAD model', 'Model the hole slightly oversized, because printed holes come out slightly undersized', 'VEX shafts expand when they touch plastic', 'Move the hole to a different face'],
          1,
          'Printed holes come out slightly undersized. Oversize them in CAD, or clean them up afterwards with a drill or file.'
        ),
      ],
    },
  ],
};

export const v5Unit3Test: Assessment = {
  id: 'v5-unit-3-build',
  slug: 'v5-unit-3',
  unitLabel: 'Unit 3',
  title: 'V5 Foundation — Unit 3 Test: Build',
  description:
    'This test covers Unit 3 of the V5 Foundation Program, one section per lesson: knowing your kit, building and squaring the frame, wiring and driving the robot, and gearing and iterating on it. Multiple choice questions are graded automatically; short answer questions are reviewed by your instructor.',
  totalPoints: 86,
  passingScore: 69,
  timeLimitMinutes: 75,
  sections: [
    {
      id: 'know-your-kit',
      title: 'Lesson 1 — Know Your Kit',
      description: 'Shop safety, structure and the hole grid, fasteners, the motion parts, and the Free-Spin Test.',
      questions: [
        mc(
          '1-1',
          'Which of the following is one of the four shop safety rules?',
          ['Work as fast as possible to finish before time runs out', 'Clean your workspace before and after every session', 'Keep safety glasses at your seat until you are ready to use a tool', 'Only the team captain may handle power tools'],
          1,
          'The four rules: act with common sense; clean your workspace before and after every session; use tools only as instructed; race for perfection, not for speed.'
        ),
        mc(
          '1-2',
          'When do safety glasses go on?',
          ['After you pick up a tool', 'Before you enter the safety-glasses zone', 'Only when using power tools', 'Only when cutting metal'],
          1,
          'Safety glasses go on before you enter the zone, not after you already have a tool in hand.'
        ),
        mc(
          '1-3',
          'Where do most competition breakdowns come from?',
          ['Code errors', 'Bad strategy or drive tuning', 'Something coming apart: a loose screw, wobbly shaft, or missing spacer', 'Battery failures'],
          2,
          'Mechanical failures are the most common. The parts are consistent; the only variable is whether you use them correctly.'
        ),
        mc(
          '1-4',
          'What is the hole spacing on all VEX structure parts?',
          ['1.0 inch', '0.5 inches', '0.25 inches', 'It varies by part type'],
          1,
          'Every VEX structure part uses a 0.5-inch hole grid, which is why you can count holes instead of measuring.'
        ),
        mc(
          '1-5',
          'A piece of C-channel spans 15 holes. How long is it?',
          ['7.5 inches', '15 inches', '30 inches', '3.75 inches'],
          0,
          'Holes are 0.5 inches apart, so 15 holes is 7.5 inches. Count holes and divide by 2 for the length in inches.'
        ),
        mc(
          '1-6',
          'What does the "2x" or "5x" in a C-channel name refer to?',
          ['Its length in inches', 'The number of holes across the short face', 'How many screws it needs', 'Its thickness'],
          1,
          'C-channel comes in 2x, 3x, and 5x widths, named for the number of holes across the short face.'
        ),
        mc(
          '1-7',
          'Which structure part would you choose for a low-profile cross-brace or motor mount?',
          ['C-channel', 'L-channel', 'Flat plate', 'Standoff'],
          2,
          'Flat plate is unfolded structure, used for cross-braces and motor mounts where you need a low profile. L-channel is for corner bracing.'
        ),
        mc(
          '1-8',
          'You are bolting a motor to a drive rail, and the motor vibrates every time it runs. Which nut?',
          ['Keps nut, because it threads on faster', 'Nylock nut, because its plastic insert resists vibration', 'Either nut works equally well here', 'No nut is needed if the screw is the right length'],
          1,
          'Anything that moves or vibrates gets a nylock. The plastic insert grips the threads and will not back off.'
        ),
        mc(
          '1-9',
          'When is a keps nut the right choice?',
          ['On axles and motor mounts', 'On static joints that do not move', 'On anything under repeated load', 'Keps nuts should never be used'],
          1,
          'Keps nuts thread on fast but can loosen under vibration, so use them for static joints such as a standoff between two panels that never move.'
        ),
        mc(
          '1-10',
          'What thread size and drive type are standard VEX screws?',
          ['6-32 thread, Phillips drive', '8-32 thread, star (Torx) drive', '10-24 thread, flat drive', 'M3 thread, hex drive'],
          1,
          'VEX screws are 8-32 thread with a star (Torx) drive, in 1/8-inch length steps.'
        ),
        mc(
          '1-11',
          'What is a standoff used for?',
          ['Filling a gap on a spinning shaft', 'Offsetting two pieces of structure with a threaded post', 'Holding a shaft from sliding sideways', 'Letting a shaft spin inside a hole'],
          1,
          'Standoffs are threaded posts that offset two pieces of structure and create light, rigid connections.'
        ),
        mc(
          '1-12',
          'What is the rule for spacers on any spinning assembly?',
          ['One spacer somewhere on the shaft is enough', 'A spacer on each side of the spinning part, so no metal rubs metal', 'Spacers are only needed on the motor side', 'Spacers should be replaced with shaft collars'],
          1,
          'No metal rubbing metal. Put a spacer on each side of any part that rotates, or the assembly wastes motor power and eventually stalls.'
        ),
        mc(
          '1-13',
          'Which V5 cartridge colour belongs in the Foundation drivetrain, and what speed does it run?',
          ['Red, 100 rpm', 'Green, 200 rpm', 'Blue, 600 rpm', 'Any colour works as long as both motors match'],
          1,
          'Red is 100 rpm (high torque), green is 200 rpm (standard), blue is 600 rpm (high speed). The Foundation drive uses green.'
        ),
        mc(
          '1-14',
          'Your mechanism needs maximum torque and does not need speed. Which cartridge?',
          ['Red, 100 rpm', 'Green, 200 rpm', 'Blue, 600 rpm', 'Cartridge colour does not affect torque'],
          0,
          'Red is the 100 rpm high-torque, low-speed cartridge.'
        ),
        mc(
          '1-15',
          'How do you reverse the direction a motor drives?',
          ['Swap the two wires in the smart cable', 'Flip the motor around on the rail', 'Set it in the code configuration block', 'Change the cartridge colour'],
          2,
          'Never reverse a motor by rewiring. Reversal is set in the code configuration block.'
        ),
        mc(
          '1-16',
          'Why do the drive shafts have a square cross-section?',
          ['It makes them lighter', 'It keeps the wheel from spinning in place on the shaft', 'It lets them flex under load', 'It makes them fit the bearing flat more tightly'],
          1,
          'The square cross-section carries rotation from motor to wheel without the wheel slipping on the shaft.'
        ),
        mc(
          '1-17',
          'What does a shaft collar do, and what tool tightens it?',
          ['Stops the shaft sliding sideways; 5/64-inch hex key', 'Lets the shaft spin in the hole; T15 star driver', 'Holds the wheel to the shaft; wrench', 'Offsets two plates; T8 star driver'],
          0,
          'Shaft collars prevent the shaft from sliding sideways. Each uses a 5/64-inch hex set screw.'
        ),
        mc(
          '1-18',
          'A shaft passes through a hole in a C-channel. What must be installed in that hole first, and why?',
          ['A shaft collar, to stop the shaft sliding', 'A bearing flat, to give the shaft a smooth hole to spin in instead of grinding on the channel', 'A nylock nut, to resist vibration', 'A spacer, to fill the gap'],
          1,
          'Every shaft through structure gets a bearing flat. Without one the shaft grinds against the C-channel hole and wastes motor power.'
        ),
        mc(
          '1-19',
          'Why does the Foundation drivetrain use omni wheels?',
          ['They grip the mat harder than any other wheel', 'The rollers along the rim let the wheel slide sideways, so the robot can pivot without the wheels fighting each other', 'They are lighter than solid wheels', 'They do not need bearing flats'],
          1,
          'Small rollers along the rim let the wheel slide sideways, so the robot pivots without the wheels fighting each other. The Foundation drive uses 4-inch omnis.'
        ),
        mc(
          '1-20',
          'In the Free-Spin Test, how long must the wheel keep spinning to pass?',
          ['At least 1 second', 'At least 3 seconds', 'At least 10 seconds', 'Any spin at all counts as a pass'],
          1,
          'The pass bar is at least 3 seconds. Under 1 second usually means a missing spacer.'
        ),
        mc(
          '1-21',
          'A wheel assembly spins for only 1 second in the Free-Spin Test. What should you check first?',
          ['Whether the motor is connected', 'Whether there is a spacer on each side of the wheel', 'Whether the wheel size matches the spec', 'Whether the battery is charged'],
          1,
          'Short spin time means friction. Check for a missing spacer first, then that both bearing flats sit flat, then collar tension. Change one thing per attempt.'
        ),
        {
          kind: 'short-answer',
          id: '1-22',
          prompt: 'Write out the correct order of parts on a shaft for the Free-Spin Test, from one end to the other. Then state the pass bar, and explain what a spin time of under 1 second usually means and how you would fix it.',
          points: 4,
          modelAnswer: 'Order: shaft collar, spacer, wheel, spacer, bearing flat (with a collar on each end and a bearing flat at each channel wall). Pass bar: the wheel keeps spinning for at least 3 seconds. Under 1 second means a spacer is missing and the wheel is rubbing the channel wall directly, so add the missing spacer. Also accept: check both bearing flats sit flat and the nearest collar is not overtightened, changing one thing per attempt.',
        },
      ],
    },
    {
      id: 'build-the-frame',
      title: 'Lesson 2 — Build the Frame',
      description: 'Bracing and boxing, squaring the chassis by diagonal measurement, the locked drive specification, and the push and drop tests.',
      questions: [
        mc(
          '2-1',
          'A frame that flexes under load causes the robot to:',
          ['Drive faster, because less structure means less weight', 'Drift off a straight line, because force goes sideways instead of into the wheels', 'Steer more accurately, because flex absorbs bumps', 'Use less battery power'],
          1,
          'A flexible frame sends force sideways instead of into the wheels, so the robot drifts even when the code is correct.'
        ),
        mc(
          '2-2',
          'Which shape cannot change its corner angles without changing the length of a side?',
          ['Rectangle', 'Triangle', 'Square', 'Hexagon'],
          1,
          'Changing a triangle’s corner angles requires changing a side length, and metal cannot stretch, so a triangulated structure cannot fold.'
        ),
        mc(
          '2-3',
          'What is the bracing rule for the robot’s structure?',
          ['Brace only the frame corners nearest the motors', 'Cross-brace or gusset every large rectangle', 'Add a standoff to every hole', 'Bracing is only needed on robots over a certain weight'],
          1,
          'Cross-brace or gusset every large rectangle. A diagonal member or corner plate turns each rectangle into two triangles so the structure cannot fold.'
        ),
        mc(
          '2-4',
          'What does "boxing" a drive rail mean?',
          ['Wrapping the channel in tape for protection', 'Bolting two C-channels face-to-face to close them into a rectangular tube', 'Cutting a channel into a box shape', 'Mounting the channel inside a plastic box'],
          1,
          'Boxing closes two C-channels into a rectangular tube that resists twisting in every direction. Each Foundation drive rail is two channels bolted face-to-face.'
        ),
        mc(
          '2-5',
          'Why does a boxed pair of channels resist twisting better than a single open channel?',
          ['It weighs more', 'Closing the section into a tube stops it twisting in every direction', 'It uses nylock nuts', 'The paint adds stiffness'],
          1,
          'A single open channel twists easily under hand pressure; closing it into a rectangular tube barely moves.'
        ),
        mc(
          '2-6',
          'How do you verify that a frame is square?',
          ['Use a protractor on each corner', 'Measure both diagonals and confirm they are within 2 mm of each other', 'Eyeball it from above and check the rails look parallel', 'Weigh each side and confirm they are equal'],
          1,
          'Equal diagonals prove 90-degree corners. Eyeballing is not accurate enough: a frame can look parallel while being 6 to 8 mm out of square.'
        ),
        mc(
          '2-7',
          'Which two measurements are the diagonals of a drive frame?',
          ['Front-left to front-right, and back-left to back-right', 'Front-left to back-right, and front-right to back-left', 'Front-left to back-left, and front-right to back-right', 'The two long rails'],
          1,
          'Corner to opposite corner: front-left to back-right, then front-right to back-left.'
        ),
        mc(
          '2-8',
          'You measure a drive frame’s two diagonals and get 314 mm and 310 mm. Is the frame square?',
          ['Yes, because both numbers start with 31', 'No, the 4 mm difference exceeds the 2 mm pass bar, so nudge the frame and re-measure', 'Yes, any difference under 10 mm passes', 'It cannot be determined without a protractor'],
          1,
          'The pass bar is both diagonals within 2 mm of each other. A 4 mm difference fails, so loosen the cross-brace bolts, nudge, snug, and measure again.'
        ),
        mc(
          '2-9',
          'When should you fully tighten the frame bolts?',
          ['Before measuring the diagonals, so nothing shifts', 'Only after the diagonals pass the 2 mm bar', 'Halfway through, then re-measure', 'It does not matter when'],
          1,
          'Snug the bolts enough to hold position, check the diagonals, nudge if needed, then tighten completely. Do not fully tighten any bolt before the frame passes.'
        ),
        mc(
          '2-10',
          'What cartridge and wheel does the locked Foundation drive specification call for?',
          ['Red cartridges and 4-inch traction wheels', 'Green cartridges and 4-inch omni wheels', 'Blue cartridges and 3.25-inch omni wheels', 'Any cartridge with 4-inch omni wheels'],
          1,
          'Two V5 Smart Motors, one per side, green (200 rpm) cartridges, and 4-inch omni wheels, two per side.'
        ),
        mc(
          '2-11',
          'Why is cartridge colour not cosmetic on this build?',
          ['Different colours have different weights', 'The Unit 2 starter is calibrated for 200 rpm, so red or blue makes autonomous distances wrong by a factor of 2 or 6', 'Only green cartridges physically fit the motor', 'Colour changes the motor’s power draw only'],
          1,
          'Green is 200 rpm and the code expects it. Swap cartridges without updating the code and every autonomous distance lands wrong.'
        ),
        mc(
          '2-12',
          'In what order do you install the drive, according to the lesson?',
          ['Motors first, then bearing flats, then shafts', 'Bearing flats first, then shafts and spacers, then mount the motors last', 'Wheels first, then the frame', 'Shafts first, then bearing flats around them'],
          1,
          'Install bearing flats before the shaft goes in, space the shaft so nothing rubs, then mount the motors last.'
        ),
        mc(
          '2-13',
          'What is the Push Test checking for?',
          ['Whether the robot can push another robot', 'Whether the rails spread, creak, or click, revealing a loose joint or missing brace', 'Whether the motors have enough torque', 'Whether the battery is seated'],
          1,
          'Press firmly on each corner toward the opposite corner. Spreading, creaking, or clicking means a loose joint to tighten or a brace to add.'
        ),
        mc(
          '2-14',
          'During the Drop Test you hear rattling and feel a wheel wobble on its shaft. What is the likely cause?',
          ['The frame is out of square', 'A missing shaft-collar set screw or a missing spacer', 'The cartridge is the wrong colour', 'The battery is low'],
          1,
          'Rattling fasteners and a wobbling wheel point to a missing shaft-collar set screw or a missing spacer.'
        ),
        {
          kind: 'short-answer',
          id: '2-15',
          prompt: 'Describe the process for squaring a drive frame using diagonal measurement, including the pass bar and what to do if the two diagonals do not match.',
          points: 4,
          modelAnswer: 'Measure diagonal 1 (front-left to back-right) and diagonal 2 (front-right to back-left). Compare them. If they differ by more than 2 mm, loosen the cross-brace bolts, nudge the frame, snug the bolts, and measure again. Repeat until both diagonals are within 2 mm, then fully tighten every bolt. Do not fully tighten any bolt before the frame passes.',
        },
        {
          kind: 'short-answer',
          id: '2-16',
          prompt: 'A teammate says their frame is fine because it "looks square and feels solid". Explain why that is not good enough, and give the two separate checks that would actually prove the frame is ready, naming what each one measures.',
          points: 4,
          modelAnswer: 'Looking square is not accurate enough: a frame can look parallel while being 6 to 8 mm out of square, and an out-of-square frame makes the robot track crooked no matter what the code says. The two checks are (1) the diagonal measurement, which proves the corners are at 90 degrees when both diagonals are within 2 mm of each other, and (2) the push and drop tests, which prove rigidity and that nothing is loose: pressing each corner toward the opposite corner should produce no spreading, creaking, or clicking, and setting the robot down and shaking it should produce no rattles or wobbling wheels.',
        },
      ],
    },
    {
      id: 'wire-and-drive',
      title: 'Lesson 3 — Wire It and Drive It',
      description: 'The power and data path, smart ports, cable routing and strain relief, port configuration, the reversed flag, DRIVE_RPM, and brake modes.',
      questions: [
        mc(
          '3-1',
          'Where does power flow in the V5 system, in order?',
          ['Controller, radio, brain, motors', 'Battery, brain, motors via smart ports', 'Brain, battery, motors', 'Radio, brain, battery, motors'],
          1,
          'The battery supplies power to the brain, which distributes power and data to the motors through numbered smart ports.'
        ),
        mc(
          '3-2',
          'What does a V5 smart cable carry?',
          ['Power only', 'Data only', 'Both power and data in one plug', 'Power, data, and compressed air'],
          2,
          'One smart cable carries both power and data. One end clicks into a numbered smart port, the other into a motor or the radio.'
        ),
        mc(
          '3-3',
          'How many smart ports does the V5 brain have?',
          ['8', '12', '21', '32'],
          2,
          'The brain has 21 smart ports, numbered 1 through 21. Any port accepts any device.'
        ),
        mc(
          '3-4',
          'Where does the radio plug in?',
          ['Into the battery', 'Into any open smart port', 'Into a dedicated radio-only socket', 'It connects wirelessly with no cable'],
          1,
          'The radio plugs into any open smart port. The top of the brain housing is a common mounting spot because it is elevated.'
        ),
        mc(
          '3-5',
          'What does strain relief mean for a smart cable?',
          ['Pulling the cable tight so it cannot move', 'Leaving a short slack loop or secure anchor so the connector is never pulled tight', 'Taping the cable to the wheel', 'Using the shortest cable available'],
          1,
          'Strain relief gives the cable slack or an anchor so the connector never carries tension and never bends at the same spot twice.'
        ),
        mc(
          '3-6',
          'A cable runs straight from the brain to the motor with no slack. What happens?',
          ['Nothing; a tight cable is the goal', 'The connector bends hard on every turn and eventually cracks', 'The motor runs slower', 'The brain reports a port error'],
          1,
          'A taut cable bends hard at the connector every time the robot turns, and the connector cracks. Leave a small loop right before the motor.'
        ),
        mc(
          '3-7',
          'During the figure-8 slalom the cable snags the right wheel on every turn. What is the correct fix?',
          ['Drive faster so the snag clears', 'Switch to a shorter cable', 'Re-route along the inside face of the rail and secure it with a zip tie, away from the wheel path', 'Change brake mode to coast'],
          2,
          'A cable in the wheel path snags regardless of speed or brake mode. Routing along structure and securing with zip ties is the only real fix.'
        ),
        mc(
          '3-8',
          'You plug the left motor into port 3 on the brain. What must you do in the code?',
          ['Rewire the cables so the motor spins correctly', 'Update the left motor port number in the ROBOT CONFIG block to 3', 'Delete the config block and re-enter every value', 'Move the motor to port 1, because the config only accepts port 1'],
          1,
          'The port number in the ROBOT CONFIG block must equal the physical port on the brain.'
        ),
        mc(
          '3-9',
          'Why does a drivetrain need a reversed flag on one side?',
          ['Because one motor is always weaker', 'Because the motors face each other, so a single "forward" command would drive one side backward', 'Because the brain numbers ports differently on each side', 'Because omni wheels spin backward by design'],
          1,
          'Motors on opposite sides face each other. The reversed flag flips one side in software so both drive the robot the same way.'
        ),
        mc(
          '3-10',
          'You deploy the code and the robot spins in place when you push the left stick forward. What does that tell you?',
          ['The battery charge is too low', 'Both reversed flags are wrong, so flip both', 'The smart cables are the wrong length', 'The brain firmware is out of date'],
          1,
          'Spinning in place means the two sides are driving against each other. Curving to one side means only one flag is wrong.'
        ),
        mc(
          '3-11',
          'The robot curves to one side instead of driving straight. What is the fix?',
          ['Flip both reversed flags', 'Flip the flag on the backward-driving side only', 'Lower DRIVE_RPM', 'Switch to hold brake mode'],
          1,
          'Curving to one side means one flag is wrong. Flip the flag on the side driving backward, deploy, and test again.'
        ),
        mc(
          '3-12',
          'The ROBOT CONFIG block ships with DRIVE_RPM set to 360. What should it be for the Foundation green direct-drive, and why?',
          ['360, because that is the factory value', '200, because that is the true wheel speed with green cartridges direct-drive', '100, because slower is safer', '600, to match the blue cartridge'],
          1,
          'The 360 placeholder is calibrated for a geared drive. Green direct-drive runs at 200 rpm, and DRIVE_RPM must match the real wheel speed.'
        ),
        mc(
          '3-13',
          'DRIVE_RPM is left at 360 on a green direct-drive robot. What happens in autonomous?',
          ['The robot stops short on every move', 'The robot overshoots every target', 'Nothing changes', 'The motors overheat'],
          0,
          'The code thinks the wheels spin faster than they do, so it declares the move done too early and the robot stops short.'
        ),
        mc(
          '3-14',
          'How do you switch between hold and coast brake modes?',
          ['Change a value in the ROBOT CONFIG block and deploy', 'Press button A during a drive', 'Swap the motor cartridge', 'Hold both sticks down for three seconds'],
          1,
          'Brake mode is the button-A toggle in opcontrol, not a config setting. No deploy is needed and the controller screen confirms the mode.'
        ),
        mc(
          '3-15',
          'You need the robot to stop sharply and stay put on a bump. Which brake mode?',
          ['COAST', 'HOLD', 'Either works the same', 'Neither; lower DRIVE_RPM instead'],
          1,
          'HOLD makes the motors resist spinning so the robot stops sharply, which suits staying on a bump or defending a position. COAST rolls to a stop for smooth open-floor driving.'
        ),
        {
          kind: 'short-answer',
          id: '3-16',
          prompt: 'Your robot is wired and the code is deployed, but pushing the left stick forward makes it spin in place. Describe how you would diagnose and fix this, and state the habit the lesson says you should follow while testing.',
          points: 4,
          modelAnswer: 'Spinning in place means the reversed flags are wrong for one or both motors. Flip the flag on one side, deploy, and test again; if it then curves to one side, flip the flag on the side still driving backward. Repeat until forward stick means forward robot. The habit is to test and observe rather than guess by eye, and to change only one thing at a time so you can tell what caused the change.',
        },
      ],
    },
    {
      id: 'gear-and-race',
      title: 'Lesson 4 — Gear It and Race It',
      description: 'Gear ratios and the speed-torque tradeoff, friction on a geared axle, and the Engineering Design Process loop.',
      questions: [
        mc(
          '4-1',
          'How is gear ratio calculated in this course?',
          ['Driving teeth divided by driven teeth', 'Driven teeth divided by driving teeth', 'The two tooth counts added together', 'Motor rpm divided by wheel diameter'],
          1,
          'Gear ratio = driven teeth / driving teeth. The driving gear connects to the motor shaft; the driven gear connects to the wheel axle.'
        ),
        mc(
          '4-2',
          'A student uses a 12-tooth driving gear and a 60-tooth driven gear. What is the ratio?',
          ['0.2:1', '5:1', '12:1', '1:5'],
          1,
          'Driven / driving = 60 / 12 = 5:1, meaning five turns of the motor shaft for every one turn of the wheel axle.'
        ),
        mc(
          '4-3',
          'Compared to a 1:1 setup, what does a 5:1 setup give the drive?',
          ['Five times the speed and the same torque', 'More torque and less top speed', 'The same output, because the cartridge rpm does not change', 'Exactly five times the speed at the wheel'],
          1,
          'A larger ratio means more torque and less speed at the driven axle. That is the no-free-lunch rule.'
        ),
        mc(
          '4-4',
          'A 36-tooth driving gear turns a 60-tooth driven gear. What is the ratio, and what does it buy you?',
          ['1.67:1, more torque and less speed', '0.6:1, more speed and less torque', '96:1, mostly torque', '1.67:1, more speed and more torque'],
          0,
          '60 / 36 = 1.67:1. A ratio above 1 trades speed for torque, which is why this setup handles the bump while staying competitive on time.'
        ),
        mc(
          '4-5',
          'Which setup would let the robot blaze down the straights but stall on the 2x4 bump?',
          ['36-tooth driving with a 12-tooth driven gear', '12-tooth driving with a 60-tooth driven gear', '36-tooth driving with a 60-tooth driven gear', 'Any 1:1 setup'],
          0,
          'A 36-tooth driving gear turning a 12-tooth driven gear is 0.33:1: the wheel turns about three times per motor revolution. Fast on open floor, but it stalls on the bump.'
        ),
        mc(
          '4-6',
          'What is the no-free-lunch rule?',
          ['Every gear swap costs money', 'You cannot gain both speed and torque from one gear change', 'Gears always lose energy to friction', 'A robot cannot climb and turn at the same time'],
          1,
          'Gear for speed and you give up pushing force. Gear for torque and you give up top speed.'
        ),
        mc(
          '4-7',
          'Which gear tooth counts are in the kit?',
          ['10, 20, 40, and 80', '12, 36, 60, and 84', '15, 30, 45, and 90', '12, 24, 48, and 96'],
          1,
          'The kit includes gears with 12, 36, 60, and 84 teeth.'
        ),
        mc(
          '4-8',
          'Why must the two gear shafts sit at a centre-to-centre distance that matches the hole grid?',
          ['So the gears mesh cleanly instead of grinding or slipping', 'So the shafts are the same length', 'So the gears are the same colour', 'So the motor can reach both shafts'],
          0,
          'Both gears must mesh cleanly, and the 0.5-inch hole grid is what sets the centre-to-centre distance. Count holes when positioning the shaft holes.'
        ),
        mc(
          '4-9',
          'After installing a new gear pair, a student spins the driven axle by hand and it stops after 0.8 seconds. Most likely cause?',
          ['The gear ratio is too high', 'A missing bearing flat, missing spacers, or misaligned shafts', 'The green cartridge is not fast enough for this pair', 'The axle is too long'],
          1,
          'The free-spin standard is about 3 seconds. Under 1 second points to friction, not to the ratio. Gear ratio does not affect free-spin time.'
        ),
        mc(
          '4-10',
          'Which of these is NOT one of the three friction sources named in the lesson?',
          ['Metal on metal where a shaft runs in a plain hole', 'Missing spacers letting a gear rub a plate', 'Misaligned shafts making teeth grind', 'A battery below half charge'],
          3,
          'The three sources are metal on metal, missing spacers, and misaligned shafts. Battery charge is not a friction source.'
        ),
        mc(
          '4-11',
          'You hear a gritty sound from a gear pair and the axle drags. What should you check?',
          ['Whether the two gear shafts are parallel', 'Whether the cartridge is green', 'Whether DRIVE_RPM is set to 200', 'Whether the battery is seated'],
          0,
          'A gritty sound means the teeth are grinding rather than meshing, which points to misaligned shafts. Look along both shafts from the end.'
        ),
        mc(
          '4-12',
          'What are the four steps of the Engineering Design Process loop, in order?',
          ['Design, build, present, repeat', 'Test, measure, change one thing, re-test', 'Measure, predict, rebuild, race', 'Plan, gear, wire, drive'],
          1,
          'Test the robot on the course, measure and record the exact time, change one thing, then re-test and compare.'
        ),
        mc(
          '4-13',
          'Between Run 1 and Run 2 a team swaps the driven gear from 60T to 36T AND adds a missing bearing flat. Their time improves. What is the problem?',
          ['Adding a bearing flat is not part of the EDP loop', 'They changed two things at once, so they cannot tell which change caused the improvement', 'Gear swaps and friction fixes must happen in separate sessions', 'A run log is required before any gear swap'],
          1,
          'The loop requires changing one thing at a time. With two changes, any improvement cannot be attributed to either one.'
        ),
        mc(
          '4-14',
          'A team runs the course, makes a change, and comes back slower than before. What does the lesson say to do?',
          ['Discard the run, because only improvements count', 'Log it as a valid result and try a different direction', 'Repeat the same change until it works', 'Return to the original setup and stop iterating'],
          1,
          'The loop does not promise every change helps. Finding that the previous setup was better is still a valid result: log it and try a different direction.'
        ),
        mc(
          '4-15',
          'Why does the lesson tell you to write down your prediction before making a change?',
          ['So the instructor can grade the prediction', 'Because a gap between what you expected and what happened is the most useful data you collect', 'Because predictions are required by competition rules', 'So you can skip the re-test if the prediction was right'],
          1,
          'If the result differs from your prediction, that gap is the most useful data you will collect all day.'
        ),
        {
          kind: 'short-answer',
          id: '4-16',
          prompt: 'Your robot climbs the 2x4 bump easily but crawls on the straights and finishes with a slow time. Using the gear ratio formula, explain which direction you would change the gearing and what you would give up. Then describe how you would confirm the change actually helped, following the EDP loop.',
          points: 5,
          modelAnswer: 'Crawling on the straights with easy climbing means the ratio is geared too far toward torque (for example 60 driven / 12 driving = 5:1). Since gear ratio = driven / driving, lowering the ratio means a smaller driven gear or a larger driving gear, for example 60 driven / 36 driving = 1.67:1. That buys speed and gives up torque, so the robot may struggle on the bump: the no-free-lunch rule. To confirm, follow the EDP loop: record the current time, change only the gear pair (nothing else), re-run the course, and compare times. Also accept: run the free-spin test after the swap to make sure the new gear stack did not add friction that would erase the gain.',
        },
      ],
    },
  ],
};

export const v5Assessments: Assessment[] = [v5Unit1Test, v5Unit3Test];

export function assessmentBySlug(slug: string): Assessment | undefined {
  return v5Assessments.find((a) => a.slug === slug);
}

export function assessmentAutoGradedPoints(assessment: Assessment): number {
  return assessment.sections
    .flatMap((s) => s.questions)
    .filter((q) => q.kind === 'multiple-choice')
    .reduce((sum, q) => sum + q.points, 0);
}

export function assessmentQuestionCount(assessment: Assessment): number {
  return assessment.sections.reduce((sum, s) => sum + s.questions.length, 0);
}
