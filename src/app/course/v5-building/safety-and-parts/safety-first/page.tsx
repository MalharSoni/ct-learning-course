import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';
import { ContentWrapper } from '@/components/layout/content-wrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, AlertTriangle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function SafetyFirstPage() {
  return (
    <>
      <Sidebar />
      <Topbar title="Safety First & Shop Tour" />
      <ContentWrapper>
        <div className="space-y-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link href="/course/v5-building" className="hover:text-foreground">V5 Building</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Safety First</span>
          </div>

          {/* Page Title */}
          <div>
            <h1 className="text-[32px] font-black tracking-tight mb-3">
              Safety First & Shop Tour
            </h1>
            <p className="text-[15px] text-muted-foreground">
              Learn essential safety protocols and familiarize yourself with the workshop environment
            </p>
          </div>

          {/* Alert Card */}
          <Card className="border-l-4 border-l-red-500 bg-red-50 dark:bg-red-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
                <AlertTriangle size={20} />
                Safety is Non-Negotiable
              </CardTitle>
            </CardHeader>
            <CardContent className="text-[14px] text-red-800 dark:text-red-300">
              Working with robotics involves tools, machinery, and electrical equipment. Following safety
              protocols protects you and your teammates from injury. Never skip safety procedures.
            </CardContent>
          </Card>

          {/* Content */}
          <div className="space-y-6">
            <section>
              <h2 className="text-[24px] font-bold mb-4">Common Sense Safety Principles</h2>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Always act with caution to avoid injury</strong> – Think before you act.
                    If something doesn&apos;t feel safe, stop and ask for help.
                  </div>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Clean up before and after</strong> – A cluttered workspace is a dangerous
                    workspace. Keep tools organized and surfaces clear.
                  </div>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Use tools properly, follow instructions carefully</strong> – Each tool has
                    a specific purpose and correct usage. Never improvise with tools.
                  </div>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Take your time to complete your task</strong> – This is a race for
                    perfection, not speed. Rushing leads to mistakes and injuries.
                  </div>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-[24px] font-bold mb-4">Workshop Zones</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-[16px]">🥽 Safety Glasses Zone</CardTitle>
                  </CardHeader>
                  <CardContent className="text-[14px]">
                    <p className="mb-2">
                      <strong>Safety glasses are MANDATORY in these areas:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Power tool stations</li>
                      <li>Drilling and cutting areas</li>
                      <li>Filing stations</li>
                      <li>3D printer zones (flying plastic debris)</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-[16px]">🔧 Tool Stations</CardTitle>
                  </CardHeader>
                  <CardContent className="text-[14px]">
                    <p className="mb-2">
                      <strong>Know your tool station locations:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Hand tools (wrenches, screwdrivers, pliers)</li>
                      <li>Power tools (drill press, band saw, Dremel)</li>
                      <li>Filing and deburring station</li>
                      <li>Cutting mats and utility knives</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-[16px]">📦 Parts Organization</CardTitle>
                  </CardHeader>
                  <CardContent className="text-[14px]">
                    <p className="mb-2">
                      <strong>Organized parts = efficient building:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Sorted parts rack by category</li>
                      <li>Screw and fastener organizers</li>
                      <li>Electronics storage area</li>
                      <li>Return parts to their designated spots</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-[16px]">🏗️ Work & Field Area</CardTitle>
                  </CardHeader>
                  <CardContent className="text-[14px]">
                    <p className="mb-2">
                      <strong>Dedicated spaces for different activities:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Individual work benches for assembly</li>
                      <li>Testing field for robot operation</li>
                      <li>CAD workstations with computers</li>
                      <li>Programming and electronics bench</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-[24px] font-bold mb-4">Activity: Coach-Guided Shop Tour</h2>
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <p className="text-[14px]">
                      <strong>Your coach will now guide you through the workshop.</strong> During the
                      tour, you will:
                    </p>
                    <ol className="list-decimal list-inside space-y-2 text-[14px] text-muted-foreground">
                      <li>Identify all safety equipment locations (first aid kit, fire extinguisher, eye wash)</li>
                      <li>Learn proper usage of each tool station</li>
                      <li>Understand the parts organization system</li>
                      <li>Practice finding specific parts and tools</li>
                      <li>Ask questions about anything unclear</li>
                    </ol>
                    <div className="mt-6 p-4 bg-muted rounded-md">
                      <p className="text-[13px] font-semibold mb-2">✅ Complete this checklist with your coach:</p>
                      <ul className="space-y-1.5 text-[13px] text-muted-foreground">
                        <li>□ Located safety glasses and first aid kit</li>
                        <li>□ Identified tool station zones</li>
                        <li>□ Learned parts rack organization</li>
                        <li>□ Found work bench assignment</li>
                        <li>□ Reviewed emergency procedures</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-8 border-t border-border">
            <Button variant="outline" asChild>
              <Link href="/course/v5-building">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to V5 Building
              </Link>
            </Button>
            <Button asChild>
              <Link href="/course/v5-building/safety-and-parts/common-tools">
                Next: Common Tools
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </ContentWrapper>
    </>
  );
}
