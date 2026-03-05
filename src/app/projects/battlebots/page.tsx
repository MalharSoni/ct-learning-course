import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';
import { ContentWrapper } from '@/components/layout/content-wrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, CheckCircle2, Target, Wrench, Code, Trophy, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function BattleBotsProjectPage() {
  return (
    <>
      <Sidebar />
      <Topbar title="BattleBots Project" />
      <ContentWrapper>
        <div className="space-y-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium animate-in fade-in slide-in-from-top-2 duration-500">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link href="/projects" className="hover:text-foreground transition-colors">Projects</Link>
            <span>/</span>
            <span className="text-foreground font-semibold">BattleBots</span>
          </div>

          {/* Hero */}
          <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="inline-flex items-center rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-wide bg-amber-100 dark:bg-amber-950/30 text-amber-800 dark:text-amber-400 shadow-sm">
                Intermediate
              </span>
              <span className="text-[14px] text-muted-foreground font-semibold flex items-center gap-1.5">
                <span className="text-amber-500">⏱️</span> 4-6 weeks
              </span>
            </div>
            <h1 className="text-[44px] font-black tracking-tighter leading-[1.1] bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              BattleBots Combat Robot
            </h1>
            <p className="text-[17px] text-muted-foreground leading-relaxed max-w-3xl font-medium">
              Design, build, and compete with your own combat robot. Learn weapon systems, defensive
              strategies, armor design, and competition tactics while combining V5 parts with
              3D-printed custom components.
            </p>
          </div>

          {/* Prerequisites */}
          <Card className="border-l-4 border-l-blue-500 bg-blue-50/50 dark:bg-blue-950/20 hover:shadow-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-[20px] text-blue-700 dark:text-blue-400">
                <div className="h-10 w-10 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center">
                  <Target size={20} />
                </div>
                Prerequisites
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[15px] text-muted-foreground font-medium mb-4">
                Before starting this project, you should complete:
              </p>
              <ul className="space-y-3">
                <li className="flex gap-3 text-[15px] group">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                  <Link href="/course/v5-building" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium hover:underline underline-offset-2">
                    V5 Building Fundamentals
                  </Link>
                </li>
                <li className="flex gap-3 text-[15px] group">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                  <Link href="/course/v5-cad" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium hover:underline underline-offset-2">
                    Basic CAD (Onshape)
                  </Link>
                </li>
                <li className="flex gap-3 text-[15px] group">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                  <Link href="/course/v5-code" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium hover:underline underline-offset-2">
                    Driver Control Programming
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Skills You&apos;ll Learn */}
          <section className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Trophy className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-[28px] font-black tracking-tight">Skills You&apos;ll Learn</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'Combat Robot Design', desc: 'Weight distribution, weapon placement, defensive geometry', icon: '⚙️' },
                { title: 'Weapon Systems', desc: 'Spinning weapons, flippers, lifters, and hammers', icon: '⚔️' },
                { title: 'Armor Design', desc: 'Material selection, 3D printing protective shells', icon: '🛡️' },
                { title: 'Strategy & Tactics', desc: 'Match analysis, opponent weaknesses, driving techniques', icon: '🎯' },
                { title: '3D Printing Integration', desc: 'Custom parts, armor plates, weapon components', icon: '🖨️' },
                { title: 'Competition Readiness', desc: 'Reliability testing, quick repairs, pit protocols', icon: '🏆' },
              ].map((skill, idx) => (
                <Card
                  key={skill.title}
                  className="hover:shadow-md hover:border-accent/50 transition-all duration-300 group"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <CardHeader className="space-y-2">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl group-hover:scale-110 transition-transform">{skill.icon}</span>
                      <div className="space-y-1">
                        <CardTitle className="text-[16px] group-hover:text-accent transition-colors">{skill.title}</CardTitle>
                        <CardDescription className="text-[14px]">{skill.desc}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </section>

          {/* Project Phases */}
          <section className="space-y-6 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-500">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Code className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-[28px] font-black tracking-tight">Project Phases</h2>
            </div>
            <div className="space-y-5">
              {/* Phase 1 */}
              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold bg-green-100 text-green-800 uppercase">
                        Phase 1 · Week 1
                      </span>
                      <CardTitle className="text-[20px]">Research & Strategy</CardTitle>
                      <CardDescription className="text-[13px]">
                        Study combat robotics fundamentals and plan your design
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-[14px] mb-2">Learning Objectives:</h4>
                    <ul className="space-y-1.5 text-[13px] text-muted-foreground ml-4">
                      <li>• Research different weapon types (spinners, wedges, flippers, hammers)</li>
                      <li>• Analyze successful BattleBots designs and their strategies</li>
                      <li>• Understand weight classes, rules, and safety requirements</li>
                      <li>• Study physics of combat (momentum, leverage, impact force)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[14px] mb-2">Deliverables:</h4>
                    <ul className="space-y-1.5 text-[13px] text-muted-foreground ml-4">
                      <li>□ Research document comparing 3+ weapon types</li>
                      <li>□ Strategy statement defining your bot&apos;s combat approach</li>
                      <li>□ Sketch/concept drawings of initial design ideas</li>
                      <li>□ Material and parts list</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Phase 2 */}
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="space-y-2">
                    <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-800 uppercase">
                      Phase 2 · Week 2-3
                    </span>
                    <CardTitle className="text-[20px]">CAD Design & Prototyping</CardTitle>
                    <CardDescription className="text-[13px]">
                      Create detailed 3D models and test core mechanisms
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-[14px] mb-2">Learning Objectives:</h4>
                    <ul className="space-y-1.5 text-[13px] text-muted-foreground ml-4">
                      <li>• CAD full robot assembly in Onshape</li>
                      <li>• Design custom 3D-printable armor and weapon components</li>
                      <li>• Calculate gear ratios for weapon speed/power</li>
                      <li>• Test weapon mechanism with cardboard/foam prototype</li>
                      <li>• Plan cable routing and electronics placement</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[14px] mb-2">Deliverables:</h4>
                    <ul className="space-y-1.5 text-[13px] text-muted-foreground ml-4">
                      <li>□ Complete Onshape assembly (drivetrain + weapon + armor)</li>
                      <li>□ 3D-printable STL files for custom parts</li>
                      <li>□ Cardboard/foam physical prototype for testing</li>
                      <li>□ Weight calculation spreadsheet (target: under weight limit)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Phase 3 */}
              <Card className="border-l-4 border-l-amber-500">
                <CardHeader>
                  <div className="space-y-2">
                    <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 uppercase">
                      Phase 3 · Week 3-4
                    </span>
                    <CardTitle className="text-[20px]">Build & Assembly</CardTitle>
                    <CardDescription className="text-[13px]">
                      Construct your robot using V5 parts and 3D-printed components
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-[14px] mb-2">Learning Objectives:</h4>
                    <ul className="space-y-1.5 text-[13px] text-muted-foreground ml-4">
                      <li>• Build robust drivetrain optimized for pushing power</li>
                      <li>• Assemble weapon system with proper motor/gearing</li>
                      <li>• Install and secure all electronics (Brain, motors, battery)</li>
                      <li>• Attach 3D-printed armor and protective panels</li>
                      <li>• Ensure all components are battle-hardened (lock-tite screws, reinforce joints)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[14px] mb-2">Deliverables:</h4>
                    <ul className="space-y-1.5 text-[13px] text-muted-foreground ml-4">
                      <li>□ Fully assembled combat robot</li>
                      <li>□ Weapon system functional and tested for free spin</li>
                      <li>□ All electronics mounted and wired</li>
                      <li>□ Build documentation (photos of each stage)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Phase 4 */}
              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <div className="space-y-2">
                    <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold bg-purple-100 text-purple-800 uppercase">
                      Phase 4 · Week 4-5
                    </span>
                    <CardTitle className="text-[20px]">Programming & Control</CardTitle>
                    <CardDescription className="text-[13px]">
                      Develop driver control code and weapon activation logic
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-[14px] mb-2">Learning Objectives:</h4>
                    <ul className="space-y-1.5 text-[13px] text-muted-foreground ml-4">
                      <li>• Program tank/arcade drive controls</li>
                      <li>• Implement weapon spin-up and shutdown sequences</li>
                      <li>• Add safety features (weapon disable when not needed)</li>
                      <li>• Tune motor speeds for optimal performance</li>
                      <li>• Create button mapping for weapon and drive modes</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[14px] mb-2">Deliverables:</h4>
                    <ul className="space-y-1.5 text-[13px] text-muted-foreground ml-4">
                      <li>□ Driver control program with smooth controls</li>
                      <li>□ Weapon activation code with safety lockout</li>
                      <li>□ Code comments explaining all functions</li>
                      <li>□ Controller button map diagram</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Phase 5 */}
              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <div className="space-y-2">
                    <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold bg-red-100 text-red-800 uppercase">
                      Phase 5 · Week 5-6
                    </span>
                    <CardTitle className="text-[20px]">Testing & Competition</CardTitle>
                    <CardDescription className="text-[13px]">
                      Battle-test your robot and compete in the class tournament
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-[14px] mb-2">Learning Objectives:</h4>
                    <ul className="space-y-1.5 text-[13px] text-muted-foreground ml-4">
                      <li>• Practice driving and weapon control</li>
                      <li>• Test durability through controlled battles</li>
                      <li>• Iterate based on failures (repair, reinforce, redesign)</li>
                      <li>• Develop match strategy against different opponent types</li>
                      <li>• Compete in class BattleBots tournament</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[14px] mb-2">Deliverables:</h4>
                    <ul className="space-y-1.5 text-[13px] text-muted-foreground ml-4">
                      <li>□ Battle-tested robot (survived 3+ matches)</li>
                      <li>□ Match strategy document for each opponent</li>
                      <li>□ Post-match repair and iteration notes</li>
                      <li>□ Competition performance reflection essay</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Phase 6 */}
              <Card className="border-l-4 border-l-gray-500">
                <CardHeader>
                  <div className="space-y-2">
                    <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold bg-gray-100 text-gray-800 uppercase">
                      Phase 6 · Week 6+
                    </span>
                    <CardTitle className="text-[20px]">Documentation & Portfolio</CardTitle>
                    <CardDescription className="text-[13px]">
                      Create professional documentation for your portfolio
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-[14px] mb-2">Portfolio Components:</h4>
                    <ul className="space-y-1.5 text-[13px] text-muted-foreground ml-4">
                      <li>• Project overview and design philosophy</li>
                      <li>• CAD renderings and technical drawings</li>
                      <li>• Build process photo gallery</li>
                      <li>• Competition match videos with annotations</li>
                      <li>• Engineering notebook with design iterations</li>
                      <li>• Reflection on lessons learned</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[14px] mb-2">Deliverables:</h4>
                    <ul className="space-y-1.5 text-[13px] text-muted-foreground ml-4">
                      <li>□ 3-5 page portfolio document (PDF)</li>
                      <li>□ 2-3 minute project showcase video</li>
                      <li>□ GitHub repository with code and CAD files</li>
                      <li>□ Presentation slides for parent demo night</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Resources */}
          <section>
            <h2 className="text-[26px] font-bold mb-4">Resources & References</h2>
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[15px]">📚 Learning Materials</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-[13px]">
                    <li>• <a href="https://kb.vex.com" target="_blank" rel="noopener" className="text-blue-600 hover:underline">VEX KB - Building & Design</a></li>
                    <li>• BattleBots Design Guide (see shared drive)</li>
                    <li>• Combat Robotics Weight Calculator Template</li>
                    <li>• 3D Printing Guidelines for Robotics</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-[15px]">🎥 Video Tutorials</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-[13px]">
                    <li>• Weapon System Physics Explained</li>
                    <li>• Armor Design Best Practices</li>
                    <li>• BattleBots Tournament Highlights & Analysis</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Safety Warning */}
          <Card className="border-l-4 border-l-red-500 bg-red-50 dark:bg-red-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
                <AlertCircle size={20} />
                Safety Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-[14px] text-red-800 dark:text-red-300">
              <p><strong>All combat robots must follow these safety rules:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Weapon systems must have a manual disable switch accessible without tools</li>
                <li>All spinning weapons must spin down to safe speeds within 60 seconds</li>
                <li>No projectile weapons, entanglement devices, or liquid weapons</li>
                <li>Safety glasses mandatory for all drivers and pit crew during matches</li>
                <li>Adult supervision required for all testing and competition</li>
              </ul>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-12 mt-8 border-t border-border/50 animate-in fade-in duration-700 delay-700">
            <Button
              variant="outline"
              asChild
              size="lg"
              className="hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-105 active:scale-95 font-semibold"
            >
              <Link href="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                All Projects
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <Link href="/projects/line-follower">
                Next Project: Line Follower
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </ContentWrapper>
    </>
  );
}
