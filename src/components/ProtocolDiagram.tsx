import { useState } from "react";
import { ArrowDown, Cpu, HardDrive, Network, Radio, Zap } from "lucide-react";

type ProtocolSpec = {
  id: string;
  name: string;
  type: string;
  mechanism: string;
  concurrency: string;
  throughputStrategy: string;
  specDetails: string[];
};

const protocols: ProtocolSpec[] = [
  {
    id: "http",
    name: "Segmented HTTP Range",
    type: "Parallel Multi-Socket TCP",
    mechanism: "Queries `Accept-Ranges: bytes` header; calculates dynamic file slices.",
    concurrency: "4 to 16 parallel TCP socket connections with connection pooling.",
    throughputStrategy: "Circumvents ISP/server per-connection rate limits; saturates full interface bandwidth.",
    specDetails: [
      "Initial HTTP HEAD probe determines Content-Length and Range support",
      "Dynamic worker threads request deterministic byte spans: bytes=n1-n2",
      "Automatic chunk retry and reassignment upon socket timeout or TCP reset",
    ],
  },
  {
    id: "torrent",
    name: "BitTorrent Swarm Engine",
    type: "Distributed Peer-to-Peer",
    mechanism: "Queries UDP/HTTP trackers and Mainline DHT; negotiates peer wire protocol.",
    concurrency: "Up to 50 concurrent peer connections with rarest-first piece scheduling.",
    throughputStrategy: "Decentralized piece aggregation; SHA-1 piece hash verification before disk flush.",
    specDetails: [
      "Bencode metadata parser and tracker announce client",
      "Rarest-first piece bitfield evaluation to maximize swarm piece health",
      "End-game mode worker dispatch to eliminate tail latency on final pieces",
    ],
  },
  {
    id: "hls",
    name: "HLS Adaptive Stream Demuxer",
    type: "Fragmented Video Streaming",
    mechanism: "Parses M3U8 playlists; extracts variant streams and sequence URLs.",
    concurrency: "Concurrent segment pipeline fetching Transport Stream (.ts) chunks.",
    throughputStrategy: "Pre-fetches video segments ahead of stream timestamp; pipes to container stitcher.",
    specDetails: [
      "Hierarchical manifest parsing for master and audio/video sub-playlists",
      "Asynchronous chunk pipeline with monotonic sequence numbering",
      "FFmpeg binary pipe integration for zero-re-encoding MP4 container multiplexing",
    ],
  },
  {
    id: "youtube",
    name: "Dynamic Media Resolver",
    type: "Algorithmic Signature Decryption",
    mechanism: "Reverse-engineers player JavaScript to decrypt cipher signatures dynamically.",
    concurrency: "Separate high-bitrate DASH video and audio streams fetched in parallel.",
    throughputStrategy: "Bypasses web client throttling tokens; multiplexes audio and video tracks.",
    specDetails: [
      "Regex player extraction to discover current decipher algorithms",
      "Separate adaptive DASH video and Opus/AAC audio stream isolation",
      "Zero-transcode lossless remux into standard container formats",
    ],
  },
];

export default function ProtocolDiagram() {
  const [activeProto, setActiveProto] = useState<string>("http");

  const selected = protocols.find((p) => p.id === activeProto) ?? protocols[0];

  return (
    <figure className="mt-10 border border-line bg-bg-sunken">
      <figcaption className="hud-label flex flex-wrap items-center justify-between gap-2 border-b border-line bg-bg-raised px-5 py-3 text-faint">
        <span className="flex items-center gap-2">
          <Network size={13} className="text-accent-ink" />
          Multi-Protocol Strategy Architecture
        </span>
        <span className="text-[10px] text-muted">Core Interface: IDownloadStrategy</span>
      </figcaption>

      <div className="grid-paper p-5 sm:p-8">
        {/* Source Protocol Strategy Row */}
        <div>
          <p className="hud-label mb-3 text-[10px] text-faint">
            Ingestion Adapters (Polymorphic Protocol Strategies)
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {protocols.map((p) => {
              const isActive = p.id === activeProto;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActiveProto(p.id)}
                  className={`flex flex-col p-3 text-left transition-all ${
                    isActive
                      ? "border-2 border-accent bg-accent/10 shadow-md"
                      : "border border-line bg-bg hover:border-line-strong hover:bg-bg-raised"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="hud-label text-[9px] text-accent-ink">{p.type.split(" ")[0]}</span>
                    <Radio
                      size={10}
                      className={isActive ? "text-accent-ink" : "text-faint"}
                    />
                  </div>
                  <p className="mt-2 font-display text-sm font-bold text-ink-strong">{p.name}</p>
                  <p className="mt-1 text-[11px] text-muted">{p.concurrency.split(" ")[0]} workers</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Protocol Deep Dive Card */}
        <div className="mt-4 border border-line bg-bg p-4 sm:p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-2.5">
            <div>
              <span className="hud-label text-accent-ink">Active Strategy: {selected.name}</span>
              <p className="mt-0.5 text-xs text-muted">{selected.mechanism}</p>
            </div>
            <span className="hud-label border border-line px-1.5 py-0.5 text-[10px] text-faint">
              {selected.type}
            </span>
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <p className="hud-label text-[9px] text-faint">Throughput Mechanism</p>
              <p className="mt-1 text-xs text-ink/90">{selected.throughputStrategy}</p>
            </div>
            <div>
              <p className="hud-label text-[9px] text-faint">Concurrency Model</p>
              <p className="mt-1 text-xs text-ink/90">{selected.concurrency}</p>
            </div>
          </div>

          <div className="mt-3 border-t border-line pt-2.5">
            <p className="hud-label text-[9px] text-faint">Technical Protocol Implementation</p>
            <ul className="mt-1.5 space-y-1">
              {selected.specDetails.map((detail) => (
                <li key={detail} className="flex gap-2 text-xs text-muted">
                  <span className="mt-[0.5em] h-1 w-1 shrink-0 rounded-full bg-accent-ink" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Data Pipeline Connector */}
        <div className="my-4 flex flex-col items-center justify-center">
          <div className="h-4 w-px bg-line-strong" />
          <div className="flex items-center gap-2 rounded border border-line bg-bg-raised px-3 py-1">
            <ArrowDown size={12} className="text-accent-ink" />
            <span className="hud-label text-[9px] text-muted">
              Asynchronous Ring Buffer: System.Threading.Channels
            </span>
          </div>
          <div className="h-4 w-px bg-line-strong" />
        </div>

        {/* Core Coordinator & Disk Engine */}
        <div className="border border-line bg-bg p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3">
            <div className="flex items-center gap-2.5">
              <span className="flex size-7 items-center justify-center border border-line text-accent-ink">
                <Cpu size={14} />
              </span>
              <div>
                <h4 className="font-display text-sm font-bold text-ink-strong sm:text-base">
                  Download Coordinator &amp; Storage Engine
                </h4>
                <p className="text-xs text-muted">Zero-Fragmentation Deterministic Disk IO</p>
              </div>
            </div>
            <span className="hud-label border border-accent/40 bg-accent/10 px-2 py-0.5 text-[10px] text-accent-ink">
              Core Runtime
            </span>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="border border-line bg-bg-raised p-3">
              <div className="flex items-center gap-1.5 text-accent-ink">
                <HardDrive size={13} />
                <p className="hud-label text-[10px]">Preallocated Storage</p>
              </div>
              <p className="mt-1.5 text-xs text-muted">
                Executes <code className="font-mono text-[11px] text-ink-strong">FileStream.SetLength()</code> upfront. Eliminates drive fragmentation on high-speed NVMe storage.
              </p>
            </div>

            <div className="border border-line bg-bg-raised p-3">
              <div className="flex items-center gap-1.5 text-accent-ink">
                <Zap size={13} />
                <p className="hud-label text-[10px]">Direct Sector Offset</p>
              </div>
              <p className="mt-1.5 text-xs text-muted">
                Parallel byte chunks seek and write directly to exact byte positions. Zero file-concatenation post-processing overhead.
              </p>
            </div>

            <div className="border border-line bg-bg-raised p-3">
              <div className="flex items-center gap-1.5 text-accent-ink">
                <Network size={13} />
                <p className="hud-label text-[10px]">Named Pipe IPC</p>
              </div>
              <p className="mt-1.5 text-xs text-muted">
                Chromium Native Messaging Host communicates with companion browser extension via JSON streams over standard I/O pipes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
