import type { Metadata } from 'next';
import Link from 'next/link';
import QRCode from 'qrcode';
import { assessmentQuestionCount, v5Assessments } from '@/lib/assessment-data';

/**
 * The address students type in. Kept short on purpose: it gets read off a TV
 * across a room and typed by hand. Change this if the site moves.
 */
const JOIN_URL = 'v5test.vercel.app';

export const metadata: Metadata = {
  title: 'V5 Foundation Test',
  description: 'Cast this screen so the room can see where to go.',
};

/** "V5 Foundation — Unit 1 Test: Onshape CAD" -> "Onshape CAD" */
function shortName(title: string) {
  return title.split(':').pop()?.trim() ?? title;
}

export default async function CastScreenPage() {
  // Dark-on-white keeps the code scannable on older phone cameras.
  const qrSvg = await QRCode.toString(`https://${JOIN_URL}`, {
    type: 'svg',
    margin: 0,
    errorCorrectionLevel: 'M',
    color: { dark: '#0A0A0A', light: '#FFFFFF' },
  });

  return (
    <main
      className="relative flex min-h-dvh w-full flex-col bg-[#0A0A0A] text-white select-none md:h-dvh md:overflow-hidden"
      style={{ colorScheme: 'dark' }}
    >
      {/* Soft green wash so a big black field does not read as a dead screen. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 12% 0%, rgba(62,207,142,0.14), transparent 60%), radial-gradient(90% 80% at 100% 100%, rgba(62,207,142,0.07), transparent 65%)',
        }}
      />

      {/* Header */}
      <header className="relative flex shrink-0 items-center justify-between px-[4vw] pt-[3.2vh]">
        <div className="flex items-center gap-[1vw]">
          <div className="flex aspect-square w-[clamp(2rem,3vw,3.5rem)] items-center justify-center rounded-[0.35em] bg-[#3ECF8E] font-black text-[clamp(0.85rem,1.25vw,1.5rem)] text-[#0A0A0A]">
            CT
          </div>
          <span className="text-[clamp(0.8rem,1.35vw,1.6rem)] font-bold tracking-tight text-white/90">
            V5 Foundation Program
          </span>
        </div>
        <span className="text-[clamp(0.6rem,0.95vw,1.15rem)] font-bold uppercase tracking-[0.22em] text-white/35">
          Unit Test
        </span>
      </header>

      {/* Hero: the address and the QR sit on one line, biggest thing on screen. */}
      <section className="relative flex items-center px-[4vw] py-[6vh] md:flex-1 md:py-0">
        <div className="flex w-full flex-col items-start gap-[4vh] md:flex-row md:items-center md:gap-[4vw]">
          <div className="min-w-0 flex-1">
            <p className="text-[clamp(0.95rem,1.7vw,2.1rem)] font-medium text-white/45">
              Go to
            </p>
            <p className="mt-[0.15em] text-[clamp(1.9rem,10vw,3rem)] font-black leading-[1.02] tracking-[-0.035em] text-[#3ECF8E] md:whitespace-nowrap md:text-[clamp(2rem,7.4vw,8.25rem)]">
              {JOIN_URL}
            </p>
            <p className="mt-[0.6em] text-[clamp(0.9rem,1.5vw,1.9rem)] font-medium text-white/55">
              On your laptop or phone
            </p>
          </div>

          {/* Pointless on the phone that is already here, so cast screens only. */}
          <div className="hidden shrink-0 flex-col items-center gap-[1.2vh] md:flex">
            <div className="w-[clamp(8rem,17.5vw,20rem)] rounded-[0.6rem] bg-white p-[0.85vw]">
              <div
                className="[&>svg]:block [&>svg]:h-auto [&>svg]:w-full"
                dangerouslySetInnerHTML={{ __html: qrSvg }}
              />
            </div>
            <span className="text-[clamp(0.6rem,0.95vw,1.15rem)] font-semibold uppercase tracking-[0.18em] text-white/40">
              Or scan
            </span>
          </div>
        </div>
      </section>

      {/* Which unit to open once they are on the site. */}
      <section className="relative shrink-0 px-[4vw] pb-[3.5vh]">
        <p className="mb-[1.4vh] text-[clamp(0.75rem,1.2vw,1.45rem)] font-semibold text-white/45">
          Then pick the unit your instructor assigned
        </p>
        <div className="flex flex-col gap-[1.6vh] md:flex-row md:gap-[1.6vw]">
          {v5Assessments.map((test) => (
            <Link
              key={test.id}
              href={`/assessments/${test.slug}`}
              className="flex-1 rounded-[0.75rem] border border-white/[0.12] bg-white/[0.045] px-[5vw] py-[2.4vh] transition-colors hover:border-[#3ECF8E]/50 hover:bg-white/[0.08] md:px-[2vw] md:py-[2.8vh]"
            >
              <span className="block text-[clamp(0.62rem,0.95vw,1.15rem)] font-bold uppercase tracking-[0.2em] text-[#3ECF8E]">
                {test.unitLabel}
              </span>
              <span className="mt-[0.25em] block truncate text-[clamp(1rem,2.1vw,2.6rem)] font-extrabold tracking-tight text-white">
                {shortName(test.title)}
              </span>
              <span className="mt-[0.35em] block text-[clamp(0.7rem,1.1vw,1.35rem)] font-medium text-white/45">
                {assessmentQuestionCount(test)} questions · {test.timeLimitMinutes} minutes ·{' '}
                {test.totalPoints} points
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
