export interface LessonItem {
  id: string;
  title: string;
  slug: string;
  description?: string;
}

export interface ModuleSection {
  id: string;
  title: string;
  slug: string;
  lessons: LessonItem[];
}

export interface CurriculumCategory {
  id: string;
  title: string;
  slug: string;
  description: string;
  sections: ModuleSection[];
}

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  prerequisites: string[];
  skills: string[];
}

// Learning Course Curriculum
export const learningCourse: CurriculumCategory[] = [
  {
    id: 'intro',
    title: 'Getting Started',
    slug: 'getting-started',
    description: 'Introduction to STEM and robotics fundamentals',
    sections: [
      {
        id: 'intro-stem',
        title: 'Intro to STEM',
        slug: 'intro-to-stem',
        lessons: [
          { id: 'what-is-stem', title: 'What is STEM?', slug: 'what-is-stem' },
          { id: 'stem-careers', title: 'STEM Careers & Opportunities', slug: 'stem-careers' },
          { id: 'engineering-design', title: 'Engineering Design Process', slug: 'engineering-design-process' },
          { id: 'problem-solving', title: 'Problem Solving & Critical Thinking', slug: 'problem-solving' },
        ],
      },
    ],
  },
  {
    id: 'v5-building',
    title: 'V5 Building Fundamentals',
    slug: 'v5-building',
    description: 'Master the basics of VEX V5 construction',
    sections: [
      {
        id: 'safety-parts',
        title: 'Safety and Common Parts',
        slug: 'safety-and-parts',
        lessons: [
          { id: 'safety', title: 'Safety First & Shop Tour', slug: 'safety-first' },
          { id: 'tools', title: 'V5 Common Tools & Uses', slug: 'common-tools' },
          { id: 'channels-beams', title: 'Channels and Beams', slug: 'channels-beams' },
          { id: 'screws-nuts', title: 'Screws and Nuts', slug: 'screws-nuts' },
          { id: 'spacers-washers', title: 'Spacers and Washers', slug: 'spacers-washers' },
          { id: 'standoffs', title: 'Standoffs and Bracing', slug: 'standoffs' },
          { id: 'bearings', title: 'Bearings', slug: 'bearings' },
          { id: 'motors', title: 'Motors and Cartridges', slug: 'motors-cartridges' },
          { id: 'axles-shafts', title: 'Axles and Shafts', slug: 'axles-shafts' },
          { id: 'wheels', title: 'Wheel Types', slug: 'wheels' },
        ],
      },
      {
        id: 'build-fundamentals',
        title: 'Build Fundamentals',
        slug: 'build-fundamentals',
        lessons: [
          { id: 'bracing', title: 'Bracing & Structural Stability', slug: 'bracing' },
          { id: 'dof', title: 'Degrees of Freedom', slug: 'degrees-of-freedom' },
          { id: 'triangle-bracing', title: 'Triangle Bracing', slug: 'triangle-bracing' },
          { id: 'boxing', title: 'Boxing Techniques', slug: 'boxing' },
          { id: 'first-drivetrain', title: 'Building Your First Drivetrain', slug: 'first-drivetrain' },
        ],
      },
      {
        id: 'gear-ratios',
        title: 'Gear Ratios and Friction',
        slug: 'gear-ratios',
        lessons: [
          { id: 'gear-basics', title: 'Understanding Gear Ratios', slug: 'gear-basics' },
          { id: 'torque-speed', title: 'Torque vs Speed Trade-offs', slug: 'torque-speed' },
          { id: 'friction-management', title: 'Friction Management', slug: 'friction-management' },
          { id: 'screw-joints', title: 'Screw Joints', slug: 'screw-joints' },
          { id: 'free-spin', title: 'Free Spin Testing', slug: 'free-spin' },
        ],
      },
    ],
  },
  {
    id: 'v5-build-concepts',
    title: 'V5 Build Concepts',
    slug: 'v5-build-concepts',
    description: 'Advanced mechanisms and subsystems',
    sections: [
      {
        id: 'lift-mechanisms',
        title: 'Lift Mechanisms',
        slug: 'lift-mechanisms',
        lessons: [
          { id: '2-bar', title: '2-Bar Lifts', slug: '2-bar' },
          { id: 'dr4b', title: 'Double Reverse 4-Bar (DR4B)', slug: 'dr4b' },
          { id: 'linear-slider', title: 'Linear Sliders', slug: 'linear-slider' },
          { id: 'scissor-lift', title: 'Scissor Lifts', slug: 'scissor-lift' },
        ],
      },
      {
        id: 'intake-mechanisms',
        title: 'Intake Mechanisms',
        slug: 'intake-mechanisms',
        lessons: [
          { id: 'top-roller', title: 'Top Roller Intakes', slug: 'top-roller' },
          { id: 'compression', title: 'Compression & Contact', slug: 'compression' },
          { id: 'deadzone', title: 'Solving Deadzone Issues', slug: 'deadzone' },
          { id: 'flex-wheels', title: 'Flex Wheels vs Rubber', slug: 'flex-wheels' },
        ],
      },
      {
        id: 'drivetrain-types',
        title: 'Drivetrain Types',
        slug: 'drivetrain-types',
        lessons: [
          { id: 'tank-drive', title: 'Tank Drive', slug: 'tank-drive' },
          { id: 'x-drive', title: 'X-Drive (Holonomic)', slug: 'x-drive' },
          { id: 'mecanum', title: 'Mecanum Drive', slug: 'mecanum' },
          { id: 'omni-wheels', title: 'Omni-Directional Configurations', slug: 'omni-wheels' },
        ],
      },
    ],
  },
  {
    id: 'v5-advanced-building',
    title: 'V5 Advanced Build Concepts',
    slug: 'v5-advanced-building',
    description: 'Competition-level building techniques',
    sections: [
      {
        id: 'power-transmission',
        title: 'Power Transmission',
        slug: 'power-transmission',
        lessons: [
          { id: 'chain-sprockets', title: 'Chains and Sprockets', slug: 'chain-sprockets' },
          { id: 'gears-advanced', title: 'Advanced Gearing', slug: 'gears-advanced' },
          { id: 'compound-gears', title: 'Compound Gear Ratios', slug: 'compound-gears' },
          { id: 'belt-drives', title: 'Belt Drives', slug: 'belt-drives' },
        ],
      },
      {
        id: 'structural-design',
        title: 'Structural Design',
        slug: 'structural-design',
        lessons: [
          { id: 'stress-analysis', title: 'Stress Distribution', slug: 'stress-analysis' },
          { id: 'weight-reduction', title: 'Weight Reduction Techniques', slug: 'weight-reduction' },
          { id: 'modular-design', title: 'Modular Design Philosophy', slug: 'modular-design' },
          { id: 'iteration', title: 'Rapid Iteration & Testing', slug: 'iteration' },
        ],
      },
    ],
  },
  {
    id: 'v5-cad',
    title: 'V5 CAD',
    slug: 'v5-cad',
    description: 'Computer-Aided Design for robotics',
    sections: [
      {
        id: 'onshape-basics',
        title: 'Onshape Fundamentals',
        slug: 'onshape-basics',
        lessons: [
          { id: 'onshape-intro', title: 'Introduction to Onshape', slug: 'intro' },
          { id: 'sketching', title: 'Sketching Basics', slug: 'sketching' },
          { id: 'features', title: 'Features & Extrusions', slug: 'features' },
          { id: 'assemblies', title: 'Creating Assemblies', slug: 'assemblies' },
          { id: 'mates', title: 'Mates & Constraints', slug: 'mates' },
        ],
      },
      {
        id: 'vex-cad',
        title: 'VEX-Specific CAD',
        slug: 'vex-cad',
        lessons: [
          { id: 'vex-library', title: 'VEX Part Library', slug: 'vex-library' },
          { id: 'cad-drivetrain', title: 'CAD Your Drivetrain', slug: 'cad-drivetrain' },
          { id: 'cad-2bar', title: 'CAD a 2-Bar Wedge', slug: 'cad-2bar' },
          { id: 'cad-dr4b', title: 'CAD a DR4B', slug: 'cad-dr4b' },
          { id: 'cad-intake', title: 'CAD a Top Roller Intake', slug: 'cad-intake' },
        ],
      },
      {
        id: 'advanced-cad',
        title: 'Advanced CAD',
        slug: 'advanced-cad',
        lessons: [
          { id: 'motion-studies', title: 'Motion Studies', slug: 'motion-studies' },
          { id: 'interference', title: 'Interference Detection', slug: 'interference' },
          { id: 'full-robot', title: 'Full Robot Design', slug: 'full-robot' },
        ],
      },
    ],
  },
  {
    id: 'v5-code',
    title: 'V5 Competition Code',
    slug: 'v5-code',
    description: 'Programming for VEX V5 robots',
    sections: [
      {
        id: 'code-basics',
        title: 'Programming Basics',
        slug: 'code-basics',
        lessons: [
          { id: 'intro-coding', title: 'Introduction to Programming', slug: 'intro' },
          { id: 'vexcode', title: 'VEXcode Environment', slug: 'vexcode' },
          { id: 'variables', title: 'Variables & Data Types', slug: 'variables' },
          { id: 'functions', title: 'Functions & Methods', slug: 'functions' },
        ],
      },
      {
        id: 'robot-control',
        title: 'Robot Control',
        slug: 'robot-control',
        lessons: [
          { id: 'motors-code', title: 'Motor Control', slug: 'motors' },
          { id: 'sensors', title: 'Sensors & Input', slug: 'sensors' },
          { id: 'driver-control', title: 'Driver Control Setup', slug: 'driver-control' },
          { id: 'autonomous', title: 'Autonomous Programming', slug: 'autonomous' },
        ],
      },
      {
        id: 'advanced-code',
        title: 'Advanced Programming',
        slug: 'advanced-code',
        lessons: [
          { id: 'pid', title: 'PID Control', slug: 'pid' },
          { id: 'odometry', title: 'Odometry & Position Tracking', slug: 'odometry' },
          { id: 'pure-pursuit', title: 'Pure Pursuit Pathfollowing', slug: 'pure-pursuit' },
          { id: 'lemlib', title: 'LemLib & Advanced Libraries', slug: 'lemlib' },
        ],
      },
    ],
  },
  {
    id: 'v5-electronics',
    title: 'V5 Electronics',
    slug: 'v5-electronics',
    description: 'Electronic systems and troubleshooting',
    sections: [
      {
        id: 'electronics-basics',
        title: 'Electronics Fundamentals',
        slug: 'electronics-basics',
        lessons: [
          { id: 'v5-brain', title: 'V5 Brain & Ports', slug: 'v5-brain' },
          { id: 'battery', title: 'Battery Management', slug: 'battery' },
          { id: 'radio', title: 'Radio & Controller', slug: 'radio' },
          { id: 'wiring', title: 'Cable Management & Wiring', slug: 'wiring' },
        ],
      },
      {
        id: 'sensors-advanced',
        title: 'Advanced Sensors',
        slug: 'sensors-advanced',
        lessons: [
          { id: 'inertial', title: 'Inertial Sensor (IMU)', slug: 'inertial' },
          { id: 'vision', title: 'Vision Sensor', slug: 'vision' },
          { id: 'optical', title: 'Optical Sensor', slug: 'optical' },
          { id: 'rotation', title: 'Rotation Sensor', slug: 'rotation' },
          { id: 'distance', title: 'Distance Sensor', slug: 'distance' },
        ],
      },
      {
        id: 'troubleshooting',
        title: 'Troubleshooting',
        slug: 'troubleshooting',
        lessons: [
          { id: 'common-issues', title: 'Common Electronics Issues', slug: 'common-issues' },
          { id: 'diagnostics', title: 'Using Diagnostics', slug: 'diagnostics' },
          { id: 'motor-troubleshoot', title: 'Motor Problems', slug: 'motor-troubleshoot' },
        ],
      },
    ],
  },
  {
    id: 'v5-pneumatics',
    title: 'V5 Pneumatics',
    slug: 'v5-pneumatics',
    description: 'Pneumatic systems for fast actuation',
    sections: [
      {
        id: 'pneumatics-intro',
        title: 'Pneumatics Basics',
        slug: 'pneumatics-intro',
        lessons: [
          { id: 'pneumatics-overview', title: 'What are Pneumatics?', slug: 'overview' },
          { id: 'components', title: 'Pneumatic Components', slug: 'components' },
          { id: 'reservoir', title: 'Air Reservoir & Pump', slug: 'reservoir' },
          { id: 'solenoids', title: 'Solenoid Valves', slug: 'solenoids' },
        ],
      },
      {
        id: 'pneumatics-design',
        title: 'Pneumatic Design',
        slug: 'pneumatics-design',
        lessons: [
          { id: 'single-double', title: 'Single vs Double Acting', slug: 'single-double' },
          { id: 'tubing', title: 'Tubing & Fittings', slug: 'tubing' },
          { id: 'mounting', title: 'Cylinder Mounting', slug: 'mounting' },
          { id: 'use-cases', title: 'When to Use Pneumatics', slug: 'use-cases' },
        ],
      },
    ],
  },
];

// Projects Curriculum
export const projects: ProjectItem[] = [
  {
    id: 'battlebots',
    title: 'BattleBots',
    slug: 'battlebots',
    description: 'Design and build a combat robot using V5 parts and 3D printed armor. Learn weapon systems, defensive strategies, and competition tactics.',
    difficulty: 'intermediate',
    estimatedTime: '4-6 weeks',
    prerequisites: ['V5 Building Fundamentals', 'Basic CAD', 'Driver Control Programming'],
    skills: ['Combat Robot Design', 'Weapon Systems', 'Armor Design', 'Strategy', '3D Printing'],
  },
  {
    id: 'line-follower',
    title: 'Autonomous Line Follower',
    slug: 'line-follower',
    description: 'Build a robot that autonomously follows a line using optical sensors. Master PID control and sensor-based navigation.',
    difficulty: 'beginner',
    estimatedTime: '2-3 weeks',
    prerequisites: ['V5 Building Fundamentals', 'Basic Programming'],
    skills: ['Sensor Programming', 'PID Control', 'Autonomous Navigation'],
  },
  {
    id: 'robotic-arm',
    title: 'Precision Robotic Arm',
    slug: 'robotic-arm',
    description: 'Create a multi-axis robotic arm capable of picking and placing objects. Learn inverse kinematics and precise motor control.',
    difficulty: 'advanced',
    estimatedTime: '6-8 weeks',
    prerequisites: ['Advanced Build Concepts', 'CAD', 'Advanced Programming'],
    skills: ['Kinematics', 'Precision Control', 'Multi-axis Coordination', 'End Effector Design'],
  },
  {
    id: 'maze-solver',
    title: 'Maze Solving Robot',
    slug: 'maze-solver',
    description: 'Program a robot to autonomously navigate and solve mazes using wall-following algorithms and distance sensors.',
    difficulty: 'intermediate',
    estimatedTime: '3-4 weeks',
    prerequisites: ['Basic Programming', 'Sensors', 'Autonomous Programming'],
    skills: ['Pathfinding Algorithms', 'Sensor Fusion', 'Decision Making'],
  },
  {
    id: 'ball-launcher',
    title: 'Ball Launcher System',
    slug: 'ball-launcher',
    description: 'Design a robot that accurately launches balls at targets. Study projectile motion, flywheel systems, and trajectory calculation.',
    difficulty: 'intermediate',
    estimatedTime: '4-5 weeks',
    prerequisites: ['Gear Ratios', 'Motors', 'Basic Programming'],
    skills: ['Flywheel Design', 'Projectile Physics', 'Trajectory Calculation', 'Vision Targeting'],
  },
  {
    id: 'sumo-bot',
    title: 'Sumo Wrestling Robot',
    slug: 'sumo-bot',
    description: 'Build a powerful pushing robot for sumo competitions. Focus on traction, center of gravity, and pushing power optimization.',
    difficulty: 'beginner',
    estimatedTime: '2-3 weeks',
    prerequisites: ['V5 Building Fundamentals', 'Drivetrain Types'],
    skills: ['Traction Optimization', 'Weight Distribution', 'Pushing Power', 'Competition Strategy'],
  },
  {
    id: 'sorting-machine',
    title: 'Color Sorting Machine',
    slug: 'sorting-machine',
    description: 'Create an automated system that sorts objects by color using vision sensors. Learn conveyor design and automation principles.',
    difficulty: 'intermediate',
    estimatedTime: '4-5 weeks',
    prerequisites: ['Intake Mechanisms', 'Vision Sensor', 'Basic Programming'],
    skills: ['Vision Processing', 'Automation', 'Conveyor Systems', 'Sorting Algorithms'],
  },
  {
    id: 'iot-weather',
    title: 'IoT Weather Station',
    slug: 'iot-weather',
    description: 'Build a weather monitoring station using ESP32, sensors, and display. Learn IoT connectivity and data visualization.',
    difficulty: 'beginner',
    estimatedTime: '2-3 weeks',
    prerequisites: ['Basic Electronics', 'Basic Programming'],
    skills: ['ESP32 Programming', 'Sensor Integration', 'IoT Protocols', 'Data Visualization'],
  },
];
