import { motion } from "framer-motion";
import { Zap, Users, Radio, CheckCircle, FileUp, Database } from "lucide-react";

// Simplified existing steps + new detailed technical steps
const detailedSteps = [
  {
    icon: Users,
    title: "1. Peer Discovery",
    desc: "Both users connect to the signaling server via WebSocket in order to find each other in the Online Users list.",
  },
  {
    icon: Radio,
    title: "2. Communication",
    desc: "There's a connection request. WebRTC offers, responses, and ICE candidates are shared after acceptance.",
  },
  {
    icon: Zap,
    title: "3. Direct Connection",
    desc: "A DataChannel is created. File transfers no longer require a WebSocket connection.",
  },
  {
    icon: Database,
    title: "4. Chunking",
    desc: "To prevent large files from crashing the browser, FileReader is used to read the file in 64KB chunks.",
  },
  {
    icon: FileUp,
    title: "5. Backpressure",
    desc: "In order to ensure optimal network usage, WireDrop keeps an eye on the bufferedAmount to pause and resume sending.",
  },
  {
    icon: CheckCircle,
    title: "6. Reassembling",
    desc: "The recipient gathers fragments, monitors development, and, when finished, rebuilds the file locally.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative bg-slate-950 py-24 text-white overflow-hidden">
       {/* Decorative gradient */}
       <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-emerald-900/20 blur-3xl" />
       <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-96 w-96 rounded-full bg-cyan-900/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight md:text-5xl"
          >
            How It Operates
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-xl text-slate-400"
          >
             Completely serverless, from handshake to download.
          </motion.p>
        </div>

        {/* Vertical Timeline for Desktop / Stack for Mobile */}
        <div className="relative">
             {/* Connector Line (Desktop) */}
             <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-emerald-500/0 via-emerald-500/50 to-emerald-500/0 md:block" />

             <div className="space-y-12 md:space-y-24">
                {detailedSteps.map((step, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className={`flex flex-col gap-8 md:flex-row items-center ${
                            i % 2 === 0 ? "md:flex-row-reverse" : ""
                        }`}
                    >
                        {/* Content */}
                        <div className="flex-1 text-center md:text-left">
                            <div className={`p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-colors ${i % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                                <h3 className="mb-2 text-xl font-bold text-emerald-400">{step.title}</h3>
                                <p className="text-slate-300 leading-relaxed">{step.desc}</p>
                            </div>
                        </div>

                        {/* Icon Node */}
                        <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-slate-950 border border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                            <step.icon size={28} className="text-emerald-400" />
                        </div>

                        {/* Spacer for alignment */}
                        <div className="flex-1" />
                    </motion.div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}