export type ImplementationHighlight = {
  title: string;
  body: string;
};

export type TechnicalDecision = {
  decision: string;
  rationale: string;
  tradeoff: string;
};

export type CodeSnippet = {
  language: string;
  filename: string;
  caption: string;
  code: string;
};

export type CaseStudy = {
  slug: string;
  role: string;
  timeline: string;
  overview: string;
  challenge: string;
  architecture: string;
  diagram?: "clean-arch" | "protocol";
  implementation: ImplementationHighlight[];
  codeSnippet?: CodeSnippet;
  keyDecisions: TechnicalDecision[];
  outcomes: string[];
};

export const caseStudies: Record<string, CaseStudy> = {
  spectre: {
    slug: "spectre",
    role: "Lead Architect & Android Engineer",
    timeline: "Active Development",
    overview:
      "Spectre is a zero-knowledge, native Android client for Bitwarden built from cryptographic first principles using Kotlin, Jetpack Compose, and Clean Architecture. Unlike standard API wrappers or Webview shells, Spectre is engineered to ensure sensitive master keys, vault ciphers, and decryption routines never leak into the presentation layer or stay resident in garbage-collected heap memory.",
    challenge:
      "Modern password managers often sacrifice either interface fluidity or memory safety. Web-based or hybrid clients carry substantial runtime overhead and broad attack surfaces. The core challenge was building a high-speed, tactile Android UI while enforcing strict cryptographic zero-knowledge guarantees: keeping secrets strictly bounded in transient memory structures, managing background auto-lock timers securely, and synchronizing encrypted vault payloads without risking plaintext exposure.",
    architecture:
      "The application strictly adheres to Clean Architecture with unidirectional data flow (UDF). Presentation, Domain, and Data exist as distinct, decoupled modules with dependencies pointing strictly inward toward domain logic. The domain layer defines cryptographic contracts, vault models, and cipher decryption use cases in pure Kotlin with zero Android framework dependencies.",
    diagram: "clean-arch",
    implementation: [
      {
        title: "Cryptographic Key Derivation & Vault Decryption",
        body: "Implemented PBKDF2 (SHA-256) and Argon2id key derivation according to Bitwarden specifications. Stored master keys are derived with high iteration counts and cached exclusively in transient memory structures. Cipher decryption utilizes AES-256-CBC with HMAC-SHA256 signature verification to prevent padding oracle and cipher tampering attacks.",
      },
      {
        title: "In-Memory Credential Sanitization",
        body: "Constructed custom zero-allocation memory buffers and explicit array clearing routines (`CharArray.fill('\\u0000')`) that aggressively overwrite sensitive credential bytes as soon as cryptographic operations complete, mitigating heap inspection risks.",
      },
      {
        title: "Biometric Crypto-Object Binding",
        body: "Integrated the AndroidX Biometric library with hardware-backed KeyStore keys. Biometric authentication requires a valid CryptoObject signature, preventing mock biometric bypasses and securing vault unlock tokens behind the device's Secure Element (SE) / Trusted Execution Environment (TEE).",
      },
      {
        title: "Declarative UI with Zero Framework Leaks",
        body: "Crafted the entire user interface in Jetpack Compose. Screens observe immutable UI state streams emitted by ViewModels, ensuring that presentation components have zero direct access to decryption routines or raw vault repositories.",
      },
    ],
    codeSnippet: {
      language: "kotlin",
      filename: "VaultCipherDecryptor.kt",
      caption: "Zero-Knowledge In-Memory Decryption & Memory Sanitization Pipeline",
      code: `/**
 * Decrypts a Bitwarden vault cipher with AES-256-CBC, verifying the HMAC-SHA256
 * integrity signature and scrubbing sensitive master keys from transient heap memory.
 */
class VaultCipherDecryptor(
    private val cryptoEngine: AesCbcCryptoEngine
) {
    suspend fun decrypt(
        encryptedPayload: EncryptedCipherPayload,
        transientKey: ProtectedByteArray
    ): Result<VaultItem, CryptoError> = transientKey.use { keyBytes ->
        // 1. Verify HMAC signature before initiating cipher decryption (prevent padding oracle)
        if (!cryptoEngine.verifyHmac(encryptedPayload, keyBytes)) {
            return Result.failure(CryptoError.SignatureMismatch)
        }
        
        // 2. Perform AES-256-CBC decryption using hardware-accelerated Cipher
        val rawBytes = cryptoEngine.decryptAes256(
            cipherText = encryptedPayload.cipherText,
            key = keyBytes,
            iv = encryptedPayload.iv
        )
        
        // 3. Parse domain entity and immediately zero-fill the allocated buffer
        try {
            Result.success(VaultItem.deserialize(rawBytes))
        } finally {
            rawBytes.fill(0.toByte()) // Explicitly scrub plaintext bytes from heap
        }
    }
}`,
    },
    keyDecisions: [
      {
        decision: "Pure Kotlin Domain Layer",
        rationale: "Ensures business logic and cryptographic routines can be verified and unit-tested without Android runtime mocks.",
        tradeoff: "Requires custom abstractions over platform primitives (such as secure random generation and time tracking).",
      },
      {
        decision: "Hardware KeyStore-Backed Session Keys",
        rationale: "Prevents root and malware dumps from extracting persistent credentials even on modified devices.",
        tradeoff: "Added complexity when handling fallback PINs or biometric sensor configuration changes.",
      },
    ],
    outcomes: [
      "Engineered an independent, zero-knowledge Bitwarden client capable of decrypting complex multi-folder vault structures.",
      "Achieved sub-16ms Compose frame rendering across all vault list navigations, even with deep cipher hierarchies.",
      "Established 100% test coverage over cryptographic serialization, cipher decryption, and HMAC validation use cases.",
    ],
  },
  "packer-antidebug-auditor": {
    slug: "packer-antidebug-auditor",
    role: "Co-Author & Security Tooling Engineer",
    timeline: "Research & Open Source Tool",
    overview:
      "Packer & Anti-Debug Auditor is a pre-execution static triage engine for Windows PE32/PE32+ binaries (.exe, .dll, .sys) and Android APK packages. Engineered to identify malicious binary obfuscation before execution, it detects packers, runtime protectors, anti-debugging APIs, and EDR-evasion stubs, mapping every finding to MITRE ATT&CK and scoring threat probability via a trained Random Forest model.",
    challenge:
      "Automated sandboxes often fail to analyze modern malware because evasive loaders detect virtualization or debugger artifacts and terminate silently. Conversely, running suspicious binaries dynamically poses containment risks. The engineering challenge was building a high-throughput, purely static inspection pipeline capable of distinguishing benign compression from weaponized packers, calculating reliable section entropy across tiny file fragments, and detecting indirect syscall stubs without executing a single byte of untrusted code.",
    architecture:
      "Engineered around a decoupled analysis core exposed via three distinct interfaces: a high-throughput CLI with multi-core batch processing for CI/CD gates, a FastAPI asynchronous server with Server-Sent Events (SSE) for live telemetry, and an interactive React 19 web dashboard. The engine parses raw PE headers with pefile, extracts APK dex bytecode via JADX, and executes heuristic rule evaluators in parallel.",
    diagram: "clean-arch",
    implementation: [
      {
        title: "Per-Section Shannon Entropy Analysis",
        body: "Calculates byte-frequency entropy across all PE sections, flagging sections above 7.0 bits/byte as packed. Incorporates statistically grounded threshold gating that marks sections smaller than 256 bytes as unreliable to prevent false positive flags on tiny headers.",
      },
      {
        title: "W^X Section & Entry Point Anomaly Detection",
        body: "Identifies dangerous memory sections possessing both IMAGE_SCN_MEM_WRITE and IMAGE_SCN_MEM_EXECUTE flags (indicating self-modifying unpacker code), entry points situated outside section boundaries, and massive virtual-to-raw expansion ratios (>10x).",
      },
      {
        title: "Anti-Debug & Direct Syscall Pattern Matching",
        body: "Scans import address tables (IAT) and disassembly for evasive APIs: PEB BeingDebugged checks, CheckRemoteDebuggerPresent, NtQueryInformationProcess, hardware breakpoint registers (DR0-DR3), RDTSC timing loops, and Hell's Gate / Halo's Gate direct syscall stubs.",
      },
      {
        title: "APK Decompilation & Manifest Auditing",
        body: "Pipes APK binaries into an automated JADX decompilation worker, auditing AndroidManifest.xml and Smali bytecode for root detection routines, certificate pinning, dynamic DexClassLoader calls, and hidden broadcast receivers.",
      },
    ],
    codeSnippet: {
      language: "python",
      filename: "entropy.py",
      caption: "Shannon Entropy Calculation with Minimum Sample-Size Statistical Gating",
      code: `"""Shannon entropy calculation for PE sections with statistical noise gating."""
import math
from collections import Counter

PACKED_ENTROPY_THRESHOLD = 7.0
MIN_RELIABLE_SECTION_BYTES = 256

def calculate_section_entropy(data: bytes) -> tuple[float, bool]:
    """Computes Shannon entropy (0.0 - 8.0 bits/byte).
    Returns (entropy, is_statistically_reliable).
    """
    length = len(data)
    if length == 0:
        return 0.0, False

    # Gating: Below 256 bytes, entropy lacks statistical significance
    is_reliable = length >= MIN_RELIABLE_SECTION_BYTES

    counts = Counter(data)
    entropy = 0.0
    for count in counts.values():
        p = count / length
        entropy -= p * math.log2(p)

    return entropy, is_reliable`,
    },
    keyDecisions: [
      {
        decision: "Purely Static Pre-Execution Triage vs. Dynamic Sandbox",
        rationale: "Guarantees zero-risk execution of weaponized samples while defeating anti-VM evasion traps that hide malicious payloads in sandboxes.",
        tradeoff: "Cannot observe multi-stage runtime unpacking; mitigated by scoring heuristics that flag the unpacker stub itself.",
      },
      {
        decision: "Tri-Interface Architecture (CLI + FastAPI + React)",
        rationale: "Permits seamless integration into automated CI/CD binary validation pipelines while providing security analysts with an interactive visual triage UI.",
        tradeoff: "Requires maintaining both synchronous CLI utilities and asynchronous web endpoints over the core analysis library.",
      },
    ],
    outcomes: [
      "Achieved sub-500ms static classification across standard Windows PE binaries.",
      "Accurately flagged UPX, Themida, VMProtect, and ASPack packers across test suites.",
      "Mapped 100% of discovered evasion heuristics directly to standardized MITRE ATT&CK technique IDs.",
    ],
  },
  "palette-auth": {
    slug: "palette-auth",
    role: "Sole Creator & Cryptographic Engineer",
    timeline: "Completed Research Library",
    overview:
      "palette-auth is a lightweight, self-contained image authentication, spatial tamper localization, and self-recovery library for indexed-color images (PNG-8, GIF). By utilizing embedding-invariant pair-swap steganography, palette-auth embeds an Ed25519 digital signature, block verification tags, and low-frequency recovery color priors directly into pixel data without requiring sidecar files, external manifests, or visual degradation.",
    challenge:
      "Standard digital signatures fail when images are transmitted across web platforms because metadata headers (EXIF) are frequently stripped or re-encoded. Fragile watermarks detect alterations but provide zero spatial context on what changed and cannot restore modified pixels. The challenge was engineering a self-contained in-pixel authentication scheme that verifies provenance cryptographically, pinpoints exact spatial tamper coordinates down to 4x4 blocks, and physically reconstructs altered regions—all within indexed-color constraints.",
    architecture:
      "Built as a modular Python cryptographic library with 100% type safety (mypy) and zero external C dependencies. Images are parsed into color palettes and indexed pixel grids. A canonical pair map assigns each palette color to an invariant representative. A 2D block grid computes block-level SHA-256 hashes and 2x2 RGB color priors, which are pseudorandomly distributed across distant blocks via a distance-maximizing PRNG to guarantee recovery.",
    diagram: "protocol",
    implementation: [
      {
        title: "Embedding-Invariant Pair-Swap Steganography",
        body: "Pairs visually similar palette entries (Ca, Cb). The canonical representative min(Ca, Cb) is used during hash derivation. Flipping a pixel between Ca and Cb embeds a watermark bit without changing the canonical index, ensuring the image can be signed and verified deterministically.",
      },
      {
        title: "Ed25519 Root Digital Signature",
        body: "Signs the canonical image digest with asymmetric Ed25519 cryptography. The 64-byte signature is embedded into a reserved corner header, guaranteeing that any tampering with image pixels invalidates the mathematical signature.",
      },
      {
        title: "Distance-Maximized PRNG Block Mapping",
        body: "Maps block A's recovery payload into a distant block B using a seeded pseudorandom permutation. This guarantees that localized cropping, splicing, or watermark removal on block A leaves its recovery thumbnail intact inside block B.",
      },
      {
        title: "Autonomous In-Pixel Tamper Reconstruction",
        body: "Upon detecting an authentication tag mismatch in block A, the verification engine queries the inverse PRNG map to locate block B, extracts the embedded 2x2 RGB color prior, and restores the tampered region autonomously.",
      },
    ],
    codeSnippet: {
      language: "python",
      filename: "core.py",
      caption: "In-Pixel Dual-Layer Cryptographic Signing & Verification Engine",
      code: `"""High-level sign / verify pipeline for in-pixel image authentication."""
from palette_auth.crypto import sign_digest, verify_signature
from palette_auth.embed import embed_payload, extract_payload
from palette_auth.blocks import compute_block_hashes, map_blocks_prng

def sign_image(image_pixels: list[int], palette: list[tuple[int, int, int]], private_key: bytes) -> list[int]:
    """Signs image root with Ed25519 and embeds block-level recovery priors."""
    # 1. Compute canonical block hashes and 2x2 low-frequency RGB priors
    block_data = compute_block_hashes(image_pixels, palette)
    root_digest = block_data.compute_root_sha256()

    # 2. Cryptographic signature over root digest
    ed25519_sig = sign_digest(root_digest, private_key)

    # 3. Permute block recovery payloads using distance-maximized PRNG
    mapped_payloads = map_blocks_prng(block_data.recovery_priors, seed=root_digest[:8])

    # 4. In-pixel embedding via pair-swap steganography
    return embed_payload(image_pixels, ed25519_sig, mapped_payloads)`,
    },
    keyDecisions: [
      {
        decision: "Pair-Swap Steganography over LSB Replacement",
        rationale: "LSB replacement on indexed-color palette images causes catastrophic visual artifacts by jumping across unrelated palette indices; pair-swap limits error to visually indistinguishable twin colors.",
        tradeoff: "Requires sorting and pairing palette entries by perceptual color distance (Delta E) prior to embedding.",
      },
      {
        decision: "Distance-Maximized Permutation vs. Adjacent Embedding",
        rationale: "Prevents localized tampering (e.g., painting over a face or logo) from simultaneously destroying both the target area and its recovery data.",
        tradeoff: "Requires deterministic seed derivation to reconstruct the permutation index during verification.",
      },
    ],
    outcomes: [
      "100% self-contained image authentication with zero reliance on sidecars or databases.",
      "Demonstrated exact spatial tamper localization on spliced and modified PNG-8 images.",
      "Passed all 35 unit test suites with strict mypy static type checking in CI.",
    ],
  },
  "android-utils": {
    slug: "android-utils",
    role: "Systems & Android Tooling Engineer",
    timeline: "Active Production Tool",
    overview:
      "Android Partition Repack Toolkit is a low-level unpacker and repacker engineered for modern Android 10 – 15+ vendor partition filesystem images (EROFS and EXT4). Built to handle firmware from ColorOS, OxygenOS, HyperOS, OneUI, and Pixel ROMs, it resolves filesystem edge-case crashes, maintains SELinux security contexts, and generates AVB 2.0 cryptographically signed images for seamless bootloader execution.",
    challenge:
      "Modern Android partitions (such as `my_product`, `system`, `vendor`, and `odm`) frequently crash standard Linux extraction utilities when dumped from devices. Truncated trailing zero-blocks cause EROFS to throw fatal 'bogus i_mode' errors; internationalized packages with non-ASCII Chinese UTF-8 characters break path decoders; and repacking without exact UID/GID/SELinux context mappings causes instant bootloops.",
    architecture:
      "Engineered with a dual-mode extraction engine: standard binary extraction tools are paired with an automatic fallback to an in-house inode-tree walker (`unpack_erofs.py`) that parses raw 32-byte EROFS inode structs from the root down. Repacking integrates `simg2img`, sparse image compression, and Google's `avbtool` for Android Verified Boot signature generation.",
    diagram: "protocol",
    implementation: [
      {
        title: "EROFS Inode-Tree Walker Fallback",
        body: "Bypasses the fatal EROFS 'bogus i_mode' crash by implementing a direct binary inode parser. Instead of performing a linear block scan across unallocated tail sectors, the engine starts at the root inode (nid) and walks directory trees hierarchically.",
      },
      {
        title: "Deterministic SELinux & Capability Preservation",
        body: "Extracts and reconstructs `fs_config` (UID, GID, POSIX mode, Linux capabilities) and `file_contexts` (SELinux labels), ensuring repacked partitions boot without permission denial crashes.",
      },
      {
        title: "Cryptographic AVB 2.0 Image Signing",
        body: "Integrates Android Verified Boot 2.0 metadata injection via `avbtool`. Computes hash trees and signs the partition footer using standard OEM keys, ensuring modified partitions pass bootloader signature checks.",
      },
      {
        title: "Sparse & Payload Extraction Pipeline",
        body: "Supports one-step unpacking of raw OTA update payloads (`payload.bin`), Android sparse images (`simg2img`), and dynamic super-partition images.",
      },
    ],
    codeSnippet: {
      language: "python",
      filename: "unpack_erofs.py",
      caption: "Raw Binary Inode Struct Parser & Fallback Tree Traverser",
      code: `#!/usr/bin/env python3
"""Low-level EROFS raw binary inode parser and hierarchical tree walker."""
import struct
from pathlib import Path

# EROFS Inode layout: 32 bytes (fmt, xcount, mode, nlink, size, res, u, ino, uid, gid, csum)
INODE_STRUCT_FMT = "<HHIIQQIIIIH"

def parse_inode_raw(file_handle, nid: int) -> dict | None:
    """Reads 32-byte EROFS inode struct at sector offset (nid * 32).
    Avoids linear scan crashes by jumping directly to deterministic node IDs.
    """
    file_handle.seek(nid * 32)
    raw = file_handle.read(32)
    if len(raw) < 32:
        return None

    fmt, xcount, mode, nlink, size, res, u, ino, uid, gid, csum = struct.unpack(
        INODE_STRUCT_FMT, raw[:struct.calcsize(INODE_STRUCT_FMT)]
    )

    return {
        "nid": nid,
        "format": fmt,
        "mode": mode,
        "size": size,
        "uid": uid,
        "gid": gid
    }`,
    },
    keyDecisions: [
      {
        decision: "Hierarchical Inode Tree Walking vs. Linear Block Scanning",
        rationale: "Partition dumps pulled over ADB frequently omit trailing zero-sectors; walking the inode tree from root down ensures 100% extraction success regardless of omitted tail blocks.",
        tradeoff: "Requires custom binary struct unpacking logic rather than relying exclusively on precompiled C binaries.",
      },
      {
        decision: "Automated Context Dictionary Generation",
        rationale: "Eliminates manual SELinux policy debugging by recording exact runtime contexts to a companion manifest during unpack.",
        tradeoff: "Requires writing and maintaining manifest parsers compatible with diverse Android vendor OEM conventions.",
      },
    ],
    outcomes: [
      "Resolved 100% of EROFS 'bogus i_mode' extraction aborts across ColorOS and HyperOS ROM dumps.",
      "Successfully extracted and repacked partitions with full SELinux and AVB 2.0 integrity.",
      "Adopted by Android modding communities and firmware researchers worldwide.",
    ],
  },
  helix: {
    slug: "helix",
    role: "Desktop Systems Engineer",
    timeline: "Completed",
    overview:
      "Helix is a multi-threaded desktop download accelerator and protocol aggregation engine for Windows. Built in C# and WPF, Helix resolves a fundamental limitation of modern web browsers: single-socket transfers that leave gigabit connections underutilized, and the necessity of juggling separate tools for HTTP downloads, BitTorrent swarms, HLS media streams, and YouTube content.",
    challenge:
      "Different download sources operate under conflicting paradigms: HTTP depends on byte-range server requests; BitTorrent relies on peer piece selection and distributed hash tables; HLS operates via sequential media segment playlists; and YouTube requires dynamic cipher and stream URL resolution. The challenge was building an asynchronous, fault-tolerant download core that exposes a uniform interface for queuing, pacing, paused resumption, and real-time chunk aggregation.",
    architecture:
      "Helix employs the Strategy Pattern backed by an asynchronous producer-consumer ring buffer. A central Download Coordinator orchestrates downloads across disparate source handlers (HttpDownloader, TorrentDownloader, HlsDownloader, YoutubeDownloader) while exposing uniform telemetry to the WPF user interface. A companion browser extension uses Windows Native Messaging IPC to intercept downloads automatically.",
    diagram: "protocol",
    implementation: [
      {
        title: "Parallel Segmented HTTP Range Requests",
        body: "Queries server capability via HTTP HEAD requests for the `Accept-Ranges: bytes` header. The target file is calculated and split into dynamic byte spans, each streamed over dedicated TCP sockets to maximize bandwidth utilization across high-latency links.",
      },
      {
        title: "In-Memory Reassembly & Disk IO Optimization",
        body: "Engineered pre-allocated chunk buffers using `FileStream.SetLength` to prevent drive fragmentation. Parallel byte chunks write directly to deterministic disk offsets, eliminating post-download merge overhead.",
      },
      {
        title: "Adaptive HLS Demuxing & Segment Stitching",
        body: "Parses M3U8 master playlists to select optimal video/audio bitrates, fetches transport stream (.ts) segments concurrently, and stitches them into standard MP4 containers using an integrated FFmpeg pipe.",
      },
      {
        title: "Browser Extension Interception via Native Messaging",
        body: "Developed a lightweight browser extension that intercepts browser download triggers and passes URLs, headers, cookies, and referrers directly to Helix via standard I/O named pipes, allowing seamless one-click downloads.",
      },
    ],
    codeSnippet: {
      language: "csharp",
      filename: "HttpRangeWorker.cs",
      caption: "High-Throughput Parallel Range Worker with Preallocated File Stream",
      code: `/// <summary>
/// Parallel byte-range download worker. Employs pooled sockets, seeks directly
/// to pre-allocated disk offsets, and streams chunks via System.Threading.Channels.
/// </summary>
public sealed class HttpRangeWorker
{
    private readonly HttpClient _client;
    private readonly ChannelWriter<ChunkResult> _channelWriter;

    public async Task StreamRangeAsync(
        Uri targetUri, 
        long startByte, 
        long endByte, 
        FileStream diskStream, 
        CancellationToken ct)
    {
        using var request = new HttpRequestMessage(HttpMethod.Get, targetUri);
        request.Headers.Range = new RangeHeaderValue(startByte, endByte);

        using var response = await _client.SendAsync(request, HttpCompletionOption.ResponseHeadersRead, ct);
        response.EnsureSuccessStatusCode();

        using var contentStream = await response.Content.ReadAsStreamAsync(ct);
        var buffer = ArrayPool<byte>.Shared.Rent(81920); // 80 KB chunk buffer
        long currentOffset = startByte;

        try {
            int bytesRead;
            while ((bytesRead = await contentStream.ReadAsync(buffer.AsMemory(0, buffer.Length), ct)) > 0) {
                lock (diskStream) {
                    diskStream.Seek(currentOffset, SeekOrigin.Begin);
                    diskStream.Write(buffer, 0, bytesRead);
                }
                currentOffset += bytesRead;
                await _channelWriter.WriteAsync(new ChunkResult(bytesRead), ct);
            }
        } finally {
            ArrayPool<byte>.Shared.Return(buffer);
        }
    }
}`,
    },
    keyDecisions: [
      {
        decision: "Custom Segment Worker vs. WebClient/HttpClient Default",
        rationale: "Standard .NET HttpClient streams sequentially through a single socket; custom chunking yields up to 4-8x faster speeds on rate-limited servers.",
        tradeoff: "Requires robust handling of server-side connection dropouts, partial retries, and dynamic segment reallocation.",
      },
      {
        decision: "Pre-allocated File Descriptors",
        rationale: "Prevents disk thrashing and fragmentation on high-speed NVMe and spinning disk drives during gigabit downloads.",
        tradeoff: "Requires upfront disk space allocation before the download begins.",
      },
    ],
    outcomes: [
      "Demonstrated up to 400% download speed improvements over browser native engines on rate-limited single-thread HTTP servers.",
      "Unified direct HTTP, BitTorrent, HLS streams, and YouTube extraction under one responsive desktop interface.",
      "Built resilient pause-and-resume capability capable of surviving network disconnects and application restarts.",
    ],
  },
  planora: {
    slug: "planora",
    role: "Sole Creator & Android Developer",
    timeline: "Completed",
    overview:
      "Planora is a native, offline-first personal productivity and financial intelligence platform for Android. By uniting note-taking, hierarchical task management, and automated expense tracking into one cohesive app, Planora eliminates context switching while maintaining complete data autonomy through on-device processing and SQLCipher encryption.",
    challenge:
      "Most expense trackers require tedious manual entry or demand access to financial credentials via third-party cloud aggregators. Planora was created to prove that automated financial tracking can exist with zero cloud reliance. The technical hurdle was creating a deterministic, on-device parsing engine capable of handling hundreds of disparate Indian bank SMS formats in real time without missing transactions or misclassifying debits, credits, and account balances.",
    architecture:
      "Built on Clean Architecture with an offline-first repository pattern. Room and SQLCipher form the local database layer, while background BroadcastReceivers and WorkManager workers feed incoming SMS notifications into an isolated parsing pipeline. The UI layer communicates strictly with domain use cases via Kotlin Coroutines and StateFlow.",
    diagram: "clean-arch",
    implementation: [
      {
        title: "Deterministic Regex SMS Parser",
        body: "Architected a multi-stage regex tokenization engine that extracts transaction amounts, merchant names, account identifiers, and running balances from bank SMS alerts on-device, handling inconsistent punctuation, regional vernacular, and OTP exclusions without cloud round-trips.",
      },
      {
        title: "Zero-Knowledge Local Storage via SQLCipher",
        body: "Wrapped SQLite with 256-bit AES encryption via SQLCipher. Database passphrases are generated per installation and sealed with Android KeyStore, ensuring that device dumps or physical memory extraction cannot expose financial history or notes.",
      },
      {
        title: "Unidirectional MVI State Pipeline",
        body: "Implemented a predictable Model-View-Intent (MVI) state management pattern. User gestures and system events emit intents; pure reducer functions produce consolidated immutable ViewState objects consumed by Jetpack Compose.",
      },
      {
        title: "Offline-First Sync Resilience",
        body: "Designed the data schema around conflict-free local revisions. All operations — note edits, task completion, budget reallocations — execute instantaneously against the local cache, guaranteeing zero latency regardless of network availability.",
      },
    ],
    codeSnippet: {
      language: "kotlin",
      filename: "DeterministicSmsEngine.kt",
      caption: "On-Device Transaction SMS Tokenizer & State Machine",
      code: `/**
 * Deterministic on-device finite state parser for multi-bank transaction SMS notifications.
 * Operates with zero network IO, isolating balance and merchant extraction locally.
 */
class DeterministicSmsEngine {
    private val accountPattern = Regex("""(?i)(?:acct|a/c|card|acc)\\s*(?:no\\.?)?\\s*[*xX]*([0-9]{3,4})""")
    private val amountPattern = Regex("""(?i)(?:inr|rs\\.?|inr\\.)\\s*([\\d,]+\\.?\\d*)""")
    private val debitPattern = Regex("""(?i)\\b(debited|spent|paid|withdrawn|transferred)\\b""")
    private val creditPattern = Regex("""(?i)\\b(credited|deposited|refunded|received)\\b""")

    fun parse(smsBody: String, sender: String, timestamp: Long): TransactionRecord? {
        if (isOtpOrPromotional(smsBody)) return null
        
        val amountMatch = amountPattern.find(smsBody) ?: return null
        val amountCents = parseAmountToCents(amountMatch.groupValues[1])
        val accountLast4 = accountPattern.find(smsBody)?.groupValues?.get(1) ?: "UNKNOWN"
        val type = when {
            debitPattern.containsMatchIn(smsBody) -> TransactionType.DEBIT
            creditPattern.containsMatchIn(smsBody) -> TransactionType.CREDIT
            else -> return null
        }

        return TransactionRecord(
            accountLast4 = accountLast4,
            amountCents = amountCents,
            type = type,
            merchant = extractMerchant(smsBody),
            timestamp = timestamp
        )
    }
}`,
    },
    keyDecisions: [
      {
        decision: "On-Device Rule-Based Parsing vs. Cloud NLP",
        rationale: "Absolute privacy preservation and instant zero-latency processing without external API dependency or subscriptions.",
        tradeoff: "Requires maintaining a comprehensive test suite of bank notification patterns to prevent regressions across banking updates.",
      },
      {
        decision: "SQLCipher Full Database Encryption",
        rationale: "Protects sensitive notes, financial histories, and task logs against root exploits or physical storage extraction.",
        tradeoff: "Slight cold-start overhead during initial database decryption, mitigated through asynchronous pre-warming.",
      },
    ],
    outcomes: [
      "Eliminated 95% of manual financial transaction logging for regular bank alert users.",
      "Achieved 100% offline functionality with zero external telemetry or cloud dependencies.",
      "Constructed a unified, fluid Compose interface combining complex calendar grids, interactive financial charts, and Markdown notes.",
    ],
  },
  "ex-employee": {
    slug: "ex-employee",
    role: "Android Developer Intern",
    timeline: "May – Jul 2026",
    overview:
      "The Ex-Employee Welfare Portal is an enterprise Android application engineered for Power Grid Corporation of India Limited (a Maharatna Public Sector Enterprise). The application provides thousands of retired employees with direct, self-service access to post-retirement welfare schemes, healthcare allowances, and claim status tracking without physical paperwork.",
    challenge:
      "Legacy enterprise workflows required retired personnel to submit paper forms or access complex internal intranets to claim medical reimbursement benefits. This caused administrative backlogs, delayed claim adjudications, and poor accessibility for elderly retirees across remote regions. The objective was to design an intuitive, highly accessible, and securely authenticated native Android application tailored for senior citizens that connects directly to PowerGrid's enterprise backends.",
    architecture:
      "Engineered strictly according to Google's Recommended Architecture and Clean Architecture principles. The application is divided into Presentation (Jetpack Compose, MVVM), Domain (Use Cases, Validation Logic), and Data (Repositories, Retrofit REST, Encrypted SharedPreferences, Room). Hilt is utilized throughout for robust dependency injection and modularity.",
    diagram: "clean-arch",
    implementation: [
      {
        title: "End-to-End Benefit Claim Pipeline",
        body: "Engineered a streamlined, multi-step claim submission wizard with real-time input sanitization, receipt document uploads, and automated allowance balance recalculation.",
      },
      {
        title: "Senior-Centric Ergonomics & Accessibility",
        body: "Designed high-contrast, scalable typography, generous touch targets (>48dp), and clear visual progress trackers tailored specifically for retired personnel and elderly users.",
      },
      {
        title: "Enterprise Token Authentication & Session Security",
        body: "Implemented JWT authentication with secure refresh token rotation stored in Android KeyStore-backed EncryptedSharedPreferences, protecting retiree identity records.",
      },
      {
        title: "Offline Caching & State Reconciliation",
        body: "Utilized Room database to cache past claims, benefit balances, and circular notifications locally, allowing users to review their claim history without active connectivity.",
      },
    ],
    codeSnippet: {
      language: "kotlin",
      filename: "SubmitWelfareClaimUseCase.kt",
      caption: "Clean Architecture Domain Interactor for Enterprise Claim Lifecycle",
      code: `/**
 * Clean Architecture UseCase managing end-to-end medical allowance claim lifecycle
 * for retired personnel, enforcing client validation and offline Room caching.
 */
class SubmitWelfareClaimUseCase @Inject constructor(
    private val claimsRepository: IClaimsRepository,
    private val sessionManager: ISessionManager,
    private val dispatcher: CoroutineDispatcher = Dispatchers.IO
) {
    suspend operator fun invoke(
        claimRequest: MedicalClaimDraft
    ): Result<SubmittedClaimReceipt, ClaimSubmissionError> = withContext(dispatcher) {
        val employeeId = sessionManager.getActiveRetireeId() 
            ?: return@withContext Result.failure(ClaimSubmissionError.Unauthenticated)

        // Enforce business rules: validation, non-empty bills, quota limits
        val validationResult = validateClaimEligibility(claimRequest, employeeId)
        if (validationResult.isFailure) {
            return@withContext Result.failure(validationResult.error)
        }

        // Cache locally first (Offline-First), then synchronize with enterprise backend
        claimsRepository.persistClaimDraft(claimRequest)
        claimsRepository.dispatchClaimToEnterpriseGateway(claimRequest)
    }
}`,
    },
    keyDecisions: [
      {
        decision: "Jetpack Compose over Legacy XML Views",
        rationale: "Drastically reduced UI boilerplate, simplified complex dynamic forms, and enabled fluid state transitions.",
        tradeoff: "Required strict state hoisting and immutable models to prevent accidental recomposition cycles.",
      },
      {
        decision: "Clean Architecture Domain Isolation",
        rationale: "Kept enterprise business logic and claim validation algorithms completely independent of API response shapes and UI widgets.",
        tradeoff: "Added mapper classes between data transfer objects (DTOs), domain models, and UI state objects.",
      },
    ],
    outcomes: [
      "Digitized post-retirement welfare benefit tracking, eliminating manual paper submissions across regional divisions.",
      "Delivered a secure, production-ready enterprise Android application adhering to national corporate security standards.",
      "Established modular codebase patterns (Hilt, Coroutines, Compose) that served as a template for subsequent internal mobile tooling.",
    ],
  },
};
