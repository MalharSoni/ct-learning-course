import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';
import { ContentWrapper } from '@/components/layout/content-wrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Lightbulb, Cpu, Wrench, Calculator } from 'lucide-react';
import Link from 'next/link';

export default function WhatIsSTEMPage() {
  return (
    <>
      <Sidebar />
      <Topbar title="What is STEM?" />
      <ContentWrapper>
        <div className="space-y-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link href="/course/getting-started" className="hover:text-foreground">Getting Started</Link>
            <span>/</span>
            <span className="text-foreground font-medium">What is STEM?</span>
          </div>

          {/* Page Title */}
          <div>
            <h1 className="text-[32px] font-black tracking-tight mb-3">
              What is STEM?
            </h1>
            <p className="text-[15px] text-muted-foreground">
              Understanding the four pillars of modern innovation and how they work together
            </p>
          </div>

          {/* Introduction */}
          <section className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-[15px] leading-relaxed">
              STEM stands for <strong>Science, Technology, Engineering, and Mathematics</strong>. These four
              disciplines are the foundation of innovation in the modern world. Rather than existing in isolation,
              they work together to solve real-world problems and create new technologies.
            </p>
            <p className="text-[15px] leading-relaxed">
              When you&apos;re building a robot, you&apos;re not just doing &quot;engineering&quot; - you&apos;re using all four
              STEM fields simultaneously. Let&apos;s explore each one and see how they apply to robotics.
            </p>
          </section>

          {/* The Four Pillars */}
          <section>
            <h2 className="text-[24px] font-bold mb-4">The Four Pillars of STEM</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[18px]">
                    <Lightbulb className="h-5 w-5 text-blue-500" />
                    Science
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-[14px]">
                  <p className="font-semibold">The study of the natural world through observation and experimentation.</p>
                  <p className="text-muted-foreground">
                    In robotics, science helps us understand:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                    <li>Physics (forces, motion, energy)</li>
                    <li>Material properties (strength, friction, elasticity)</li>
                    <li>Sensor principles (how optical/distance sensors work)</li>
                    <li>Battery chemistry and electrical properties</li>
                  </ul>
                  <div className="bg-muted p-3 rounded-md mt-3">
                    <p className="text-[13px] font-medium">Example:</p>
                    <p className="text-[13px] text-muted-foreground">
                      Understanding friction science helps you choose between traction wheels
                      (high friction) and omni wheels (low friction) for your drivetrain.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[18px]">
                    <Cpu className="h-5 w-5 text-green-500" />
                    Technology
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-[14px]">
                  <p className="font-semibold">The application of scientific knowledge to create tools and systems.</p>
                  <p className="text-muted-foreground">
                    In robotics, technology includes:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                    <li>V5 Brain (computer running your code)</li>
                    <li>Motors and sensors (actuators and inputs)</li>
                    <li>CAD software (Onshape for design)</li>
                    <li>3D printers (manufacturing custom parts)</li>
                  </ul>
                  <div className="bg-muted p-3 rounded-md mt-3">
                    <p className="text-[13px] font-medium">Example:</p>
                    <p className="text-[13px] text-muted-foreground">
                      The V5 Vision Sensor uses camera technology and image processing
                      algorithms to detect colored objects - technology built on scientific principles.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-amber-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[18px]">
                    <Wrench className="h-5 w-5 text-amber-500" />
                    Engineering
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-[14px]">
                  <p className="font-semibold">The process of designing and building solutions to problems.</p>
                  <p className="text-muted-foreground">
                    In robotics, engineering involves:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                    <li>Mechanical design (lifts, intakes, drivetrains)</li>
                    <li>Electrical systems (wiring, power distribution)</li>
                    <li>Software engineering (clean, maintainable code)</li>
                    <li>Systems integration (making everything work together)</li>
                  </ul>
                  <div className="bg-muted p-3 rounded-md mt-3">
                    <p className="text-[13px] font-medium">Example:</p>
                    <p className="text-[13px] text-muted-foreground">
                      Designing a DR4B (Double Reverse 4-Bar) lift requires engineering trade-offs:
                      height vs speed vs structural integrity vs weight.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[18px]">
                    <Calculator className="h-5 w-5 text-purple-500" />
                    Mathematics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-[14px]">
                  <p className="font-semibold">The language of patterns, relationships, and quantitative reasoning.</p>
                  <p className="text-muted-foreground">
                    In robotics, math is essential for:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                    <li>Gear ratios (torque vs speed calculations)</li>
                    <li>Trigonometry (angle calculations for movement)</li>
                    <li>Algebra (PID control tuning)</li>
                    <li>Geometry (CAD modeling, field positioning)</li>
                  </ul>
                  <div className="bg-muted p-3 rounded-md mt-3">
                    <p className="text-[13px] font-medium">Example:</p>
                    <p className="text-[13px] text-muted-foreground">
                      A 5:1 gear ratio means for every 5 rotations of the input gear, the output
                      rotates once - giving you 5× more torque but ⅕ the speed.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* How They Work Together */}
          <section>
            <h2 className="text-[24px] font-bold mb-4">How STEM Fields Work Together</h2>
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
              <CardContent className="pt-6 space-y-4 text-[14px]">
                <p className="font-semibold text-[15px]">
                  Real-World Example: Building an Autonomous Line Follower Robot
                </p>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white text-[12px] font-bold flex-shrink-0">
                      S
                    </div>
                    <div>
                      <p className="font-medium">Science:</p>
                      <p className="text-muted-foreground">
                        Understanding how optical sensors detect light reflected from the line vs the background.
                        Physics of robot motion and center of gravity.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white text-[12px] font-bold flex-shrink-0">
                      T
                    </div>
                    <div>
                      <p className="font-medium">Technology:</p>
                      <p className="text-muted-foreground">
                        Using V5 optical sensors to read reflected light values. Programming the V5 Brain
                        to process sensor data in real-time.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-white text-[12px] font-bold flex-shrink-0">
                      E
                    </div>
                    <div>
                      <p className="font-medium">Engineering:</p>
                      <p className="text-muted-foreground">
                        Designing a low, stable chassis for consistent sensor readings. Positioning sensors
                        at optimal height and spacing. Implementing PID control algorithm for smooth following.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500 text-white text-[12px] font-bold flex-shrink-0">
                      M
                    </div>
                    <div>
                      <p className="font-medium">Mathematics:</p>
                      <p className="text-muted-foreground">
                        Calculating error value (distance from line center). Tuning PID constants
                        (Proportional, Integral, Derivative). Converting sensor readings to motor speeds.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Why STEM Matters */}
          <section>
            <h2 className="text-[24px] font-bold mb-4">Why STEM Matters</h2>
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p className="text-[15px] leading-relaxed">
                STEM skills are increasingly essential in the modern world:
              </p>
              <ul className="space-y-2 text-[14px]">
                <li>
                  <strong>Job Market:</strong> STEM careers are among the fastest-growing and highest-paying
                  fields. Robotics engineers, software developers, and data scientists are in high demand.
                </li>
                <li>
                  <strong>Problem Solving:</strong> STEM teaches you systematic approaches to tackle complex
                  challenges - skills applicable to any career.
                </li>
                <li>
                  <strong>Innovation:</strong> Almost every modern innovation - from smartphones to self-driving
                  cars to medical devices - comes from STEM fields.
                </li>
                <li>
                  <strong>Critical Thinking:</strong> STEM education develops analytical thinking, attention to
                  detail, and evidence-based decision making.
                </li>
              </ul>
            </div>
          </section>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-8 border-t border-border">
            <Button variant="outline" asChild>
              <Link href="/course/getting-started">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Getting Started
              </Link>
            </Button>
            <Button asChild>
              <Link href="/course/getting-started/intro-to-stem/stem-careers">
                Next: STEM Careers
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </ContentWrapper>
    </>
  );
}
