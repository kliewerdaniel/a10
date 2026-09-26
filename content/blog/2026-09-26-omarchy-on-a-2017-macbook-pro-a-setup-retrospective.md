---
author: Daniel Kliewer
canonical_url: /blog/omarchy-on-a-2017-macbook-pro-a-setup-retrospective
date: 09-26-2026
description: 'Replacing macOS on a 2017 MacBook Pro with Omarchy — the flash-drive install, the hybrid-graphics black screen, a boot menu that silently rolled back the filesystem, and wiring a local Llama 3.1 8B into an agent harness. What broke, what actually fixed it, and what the firmware would not give up.'
image: /images/ComfyUI_00210_.png
layout: post
og:description: 'Replacing macOS on a 2017 MacBook Pro with Omarchy — the flash-drive install, the hybrid-graphics black screen, a boot menu that silently rolled back the filesystem, and wiring a local Llama 3.1 8B into an agent harness. What broke, what actually fixed it, and what the firmware would not give up.'
og:image: /images/ComfyUI_00210_.png
og:title: 'Omarchy on a 2017 MacBook Pro: A Setup Retrospective'
og:type: article
og:url: /blog/omarchy-on-a-2017-macbook-pro-a-setup-retrospective
tags:
- linux
- omarchy
- arch
- macbook
- limine
- btrfs
- luks
- snapper
- amdgpu
- hyprland
- llama-cpp
- local-first
- self-hosting
title: 'Omarchy on a 2017 MacBook Pro: A Setup Retrospective'
twitter:card: summary_large_image
twitter:description: 'Replacing macOS on a 2017 MacBook Pro with Omarchy — the flash-drive install, the hybrid-graphics black screen, a boot menu that silently rolled back the filesystem, and wiring a local Llama 3.1 8B into an agent harness. What broke, what actually fixed it, and what the firmware would not give up.'
twitter:image: /images/ComfyUI_00210_.png
twitter:title: 'Omarchy on a 2017 MacBook Pro: A Setup Retrospective'
wiki_references: []
---

# Omarchy on a 2017 MacBook Pro

## What it took to replace macOS with Arch on a hybrid-graphics laptop, and every assumption that turned out to be backwards

A 2017 MacBook Pro is a bad computer to run Linux on, and it is a particularly bad computer to run Linux on *by way of a polished desktop distribution*. The display topology is inverted from what the "hybrid graphics" label implies. The bootloader is not the one you expect. The filesystem is capable of silently reverting your work without warning. And the machine is old enough that its most famous hardware feature is permanently out of reach.

This is the account of installing Omarchy on that machine, what failed, and — more usefully — which of my own confident explanations turned out to be wrong in both directions.

**The machine:** MacBookPro13,3, i7-6820HQ, Radeon RX 460 (Baffin, Polaris10) plus Intel HD 530. 512 GB Apple SSD. Kernel `7.2.5-3-omarchy`.

---

## Phase one: the install

Omarchy is Arch with opinions. You write the image to a USB stick, boot it, and it does the rest: `btrfs` subvolumes for the root and `/home`, LUKS on top, and Snapper snapshots for rollback. The bootloader is **Limine**, not GRUB — modern Omarchy ships Limine plus `limine-mkinitcpio` and a `limine-snapper-sync` service that keeps the boot menu in sync with new snapshots.

Two properties of that stack matter for everything that follows, and neither is obvious until it has already bitten you.

**The kernel command line is assembled from three concatenated layers**, in descending priority:

```
/etc/default/limine                      (highest — the LUKS + root mapping)
/etc/limine-entry-tool.d/omarchy-defaults.conf
/etc/limine-entry-tool.d/resume.conf
```

And there is a `/etc/kernel/cmdline` file that **looks** authoritative and is read by nothing. Editing it does nothing at all. I verified this by comparing `/proc/cmdline` against the union of the three real layers: the unused file's contents appeared nowhere in the live command line.

**Snapshots are real boot targets, not just backups.** The generated menu gets a second entry — `//Snapshots` — with `rootflags=subvol=/@/.snapshots/1/snapshot`. If that entry ever becomes the default, the machine does not merely revert your packages. It boots a *different, older initramfs and kernel* as well, because the UKI is part of what the snapshot captured.

---

## Phase two: the black screen, and the first three wrong explanations

Symptom: after the GPU install step, a black screen following the bootloader menu. Reachable only via TTY. The natural assumption is a driver initialization failure on the hybrid graphics.

**Wrong explanation #1: it's a hybrid-graphics race, disable the dGPU.**

This is the advice almost every generic hybrid-GPU writeup gives, and on this machine it would have bricked the display. The connector states:

```
/sys/class/drm/card1-eDP-1/status  = connected     <-- panel is on the AMD GPU
/sys/class/drm/card0-DP-5/status    = disconnected
/sys/class/drm/card0-DP-6/status    = disconnected
/sys/class/drm/card0-HDMI-A-1/status = disconnected
/sys/class/drm/card0-HDMI-A-2/status = disconnected
```

`card1` is `amdgpu`. `card0` is `i915`. The internal panel is on the **AMD** card, and every Intel connector is dead. So `amdgpu.modeset=0`, or blacklisting `amdgpu`, removes the only working display. The topology is the *opposite* of what "hybrid graphics" implies: here the dGPU is the display owner, not the render-only compute card.

The accompanying i915 errors are expected and harmless:

```
i915 [drm] [ENCODER:110:DDI A/PHY A] failed to retrieve link info, disabling eDP
i915 [drm] Cannot find any crtc or sizes
```

Intel has no connected connectors, so it has no CRTCs. Nothing to fix. `amdgpu` itself was clean in every boot journal — firmware loaded (`Found VCE firmware Version: 53.26`, `Found UVD firmware Version: 1.130 Family ID: 16`), no faults, no resets, no timeouts.

**Wrong explanation #2: Omarchy's T2 fix applies.**

Omarchy ships `fix-t2.sh` and the parameters `intel_iommu=on iommu=pt pm_async=off mem_sleep_default=deep`. None of it applies: `lspci` shows no `106b:1801`/`106b:1802`, so there is no T2 chip on this machine. I nearly added those params on the strength of "it's a MacBook."

**Wrong explanation #3: `supergfxctl` will fix the GPU switching.**

It was installed during the GPU step. It is AMD-mux-only, and a MacBookPro13,3 has no mux. It does nothing here. It was also not uninstalled — it was *rolled back*, which is the next story.

### What it actually was

A silent boot window, and a very long one. Measured breakdown:

```
firmware   4.7s
loader     5.5s
kernel    71.1s   -> journald starts
userspace  4.8s   -> graphical.target, Hyprland
```

Roughly **75–80 seconds of pure black**, including the LUKS password prompt — which systemd draws on the console while the kernel log is suppressed. That is why it read as a hang.

Two things combined:

1. `quiet splash loglevel=0 systemd.show_status=false rd.udev.log_level=0 vt.global_cursor_default=0` on the command line.
2. No `plymouth` hook in `/etc/mkinitcpio.conf`'s `HOOKS`, so there was never a splash in the initramfs to draw anything.

Every second from power-on to desktop was rendering nothing. The fix is to remove the suppression tokens, not to touch a single GPU driver.

One misleading measurement worth naming: the first kernel line in `journalctl` is stamped `[72.308062]`, and so is every other early line, *to the millisecond*. That is not the kernel taking 72 seconds to print. It is the early ring buffer being flushed to the journal all at once, so that timestamp is when journald started.

The final state: the mute line was deleted from `/etc/limine-entry-tool.d/omarchy-defaults.conf` (original quoted in a comment for one-command restore, plus a timestamped `.bak`), and from `/boot/limine.conf`. Plymouth *is* genuinely installed, so the tradeoff is real and worth stating: you lose the graphical splash and get raw kernel text for ~15s. That is the price of a debuggable boot. Boot time also came down to **~29–31s**, because `initramfs_async=0` in the same drop-in removed a serialization that was costing roughly fifty seconds.

---

## Phase three: the boot menu was eating my packages

This is the failure that cost the most time, and it is the one I would most like to warn people about, because it presents as a *package manager* bug and is not one.

Packages kept vanishing. `supergfxctl` was installed at 16:25 and by evening `/usr/bin/supergfxctl` did not exist and `pacman` reported it as "not found" — not uninstalled, just *absent*. The same for `voxtype` and `visual-studio-code-bin`.

The cause was in `/boot/limine.conf`, line 2:

```
#timeout: 3
```

**Commented out.** With no timeout, the Limine menu waits forever and the user picks. Across fifteen boots that day, the machine alternated between entries:

```
-14..0   LIVE-@ and //Snapshots alternate almost every power-on
-1,-3,-5,-7,-9,-10   LIVE @    (clean cmdline)
-2,-4,-6,-8,-11,0    SNAPSHOT  (stale UKI)
```

Booting `//Snapshots` mounted `/@/.snapshots/1/snapshot` — a subvolume created at **15:30**, before packages were installed at 15:46. The proof is in the file sizes: that entry's UKI is **81,581,056 bytes**; the live entry's is **91,877,888**. Different kernel, different initramfs, different userspace. Anything installed after 15:46 simply did not exist on that boot.

So the "graphics fix" that never worked and the "packages disappearing" problem were the same bug wearing two costumes. The black screen was never a GPU fault. The rollback was never a pacman fault.

**The fix** was uncommenting `timeout: 3` so the menu auto-selects, and confirming `default_entry: 1` so the default points at the live `+Omarchy` subvolume rather than the snapshot. Then patching the `/etc` drop-in too — because `/boot/limine.conf` is *generated*, and the next `limine-mkinitcpio` would silently re-mute the boot and re-break the default. Fixing only the generated file is fixing a build artifact.

A related piece of rot: the snapper watcher was logging `WARNING: Root filesystem is not Btrfs. limine-snapper-watcher stopped.` It runs as root on the host, so this was not a sandbox artifact — snapshot automation was genuinely dead. One snapshot existed where the config expects five retained, and it would neither create nor prune more. That is *why* `default_entry` was able to point at a stale 15:30 snapshot that nothing was maintaining. A stale pointer to an unmaintained rollback target is the failure mode; the timeout is what let it persist.

---

## Phase four: graphics, verified rather than assumed

Once the boot was fixed, it was worth confirming the display stack was actually healthy rather than just not complaining. All three APIs check out on the RX 460:

| API | Result |
| --- | --- |
| OpenGL | `radeonsi` — 2880×1800 @ 60Hz on `card1-eDP-1`, brightness 257/1023 |
| Vulkan | RADV |
| Video decode | VA-API via `radeonsi_drv_video.so` |

And the proof that matters is not the driver listing but the open file descriptors: Hyprland, quickshell, Xwayland, and Chromium all hold `/dev/dri/renderD128` open simultaneously. That is not "drivers installed" — that is the compositor, the shell, the XWayland bridge, and the browser all actively rendering on the AMD card.

Two things deliberately left alone:

- **The iGPU.** It contributes a second render node and nothing else. Disabling `i915` would quiet Xwayland/GLX selection noise but risks disturbing which adapter Xwayland picks. Low reward, non-zero risk.
- **CUDA.** NVIDIA-proprietary, wrong vendor entirely. And ROCm is not an option either: ROCm dropped everything pre-Vega, and Polaris is pre-Vega. A 2015-era RX 460 has no GPU compute path at all. The honest answer is CPU inference.

---

## Phase five: a local model the machine can actually run

With no usable GPU for compute, the local-LLM work is CPU-bound by construction.

**llama.cpp, installed from the official prebuilt release** — not from pacman, which has no `llama.cpp` package here — unpacked to `~/.local/opt/llama/llama-b11200`.

**Models in `~/models/`:**

| Model | Size |
| --- | --- |
| `Meta-Llama-3.1-8B-Instruct-Q4_K_M.gguf` | 4.9 GB |
| `qwen2.5-coder-7b-instruct-q4_k_m.gguf` | 4.7 GB |
| `qwen2.5-coder-1.5b-instruct-q8_0.gguf` | 1.9 GB |

**The server**, CPU-only with the thread counts tuned against a 4-core/8-thread i7-6820HQ:

```bash
cd ~/.local/opt/llama/llama-b11200
./llama-server \
  -m ~/models/Meta-Llama-3.1-8B-Instruct-Q4_K_M.gguf \
  --alias llama31-8b \
  -ngl 0 -t 8 -tb 8 -np 1 \
  -c 32768 --host 127.0.0.1 --port 8080
```

`-ngl 0` is not optional — there is no GPU offload available. `-np 1` keeps the server single-slot so a long generation is not interleaved with a second request. Thread count had to be reconciled with the batch thread count; getting those wrong produced servers that started fine and then stalled on the first real prompt.

**Wiring it into the agent harness** — Hermes, pointed at the local endpoint with a large declared context:

```yaml
model:
  provider: custom:llamacpp
  base_url: http://127.0.0.1:8080/v1
  default: llama31-8b
  api_key: not-needed
  context_length: 131072
```

The `api_key: not-needed` line is not a placeholder. The server binds to `127.0.0.1` only, so there is no credential to present and the harness must be told not to expect one.

Two things had to be true before this was usable, and neither is about llama.cpp:

1. **The 8B had to clear a context floor.** A small coder model runs fine interactively and then silently truncates once an agent harness starts stuffing whole files into the prompt. The 1.5B and 7B Qwen models were both below it.
2. **Tool calls had to be native.** Qwen2.5-Coder needed a shim to emit structured tool calls the harness would accept. Llama 3.1 8B emits them natively, which is why it became the default rather than the smaller model that was nominally easier to run.

**And then a corrupt download.** One of the GGUFs produced garbage output — not wrong answers, *garbage*, which is the signature of a bad file rather than a bad model. The `~/models/` listing above shows the current, working set; the corrupt one was replaced.

---

## Phase six: the Touch Bar, and a definitive no

The last hardware goal was the Touch Bar. It is a nice target for a Linux-on-Mac project and it is **not achievable on this machine**.

The old `macbook12-spi-driver` DKMS package would not even build against kernel 7.2.5 — five separate API breaks (`asm/unaligned.h` moved, `.owner` removed from platform drivers, `.llseek` gone from `file_operations` since 5.6, `report_fixup` const-correctness, `.remove` now `void`). All five were small fixes, all four modules then compiled clean, they built, signed, loaded, and bound:

```
apple_ibridge   32768  2 apple_ib_als,apple_ib_tb
apple_ib_tb     32768  0
apple_ib_als    20480  0
```

The ACPI device bound. Platform children appeared. And the kernel log's entire contribution was:

```
apple_ibridge: loading out-of-tree module taints kernel.
apple_ibridge: module verification failed: signature and/or required key missing
```

Then nothing. `hid_register_driver` succeeded, the child bound, and the HID probe **never fired**.

The drivers all wait on a USB HID endpoint that the Mac's own firmware does not enumerate when booting non-Apple firmware — `05ac:4770` for the old driver, `05ac:8600` for the maintained `t2linux/apple-ib-drv`. Neither exists here.

I checked every bus before concluding anything. SPI carries exactly one device, the topcase keyboard/touchpad, with 310,202 transfers; the other controller is enumerated and functional but has zero devices. All 18 I2C adapters are display, SMBus, or thermal. USB has one Apple device, `05ac:1281`, class `0xfe/0xff` — DFU/recovery, not HID.

Then I dumped and decompiled all 22 ACPI tables with `iasl` and read the iBridge device directly. It is `\_SB.ASOC`, `_HID = EisaId("APP7777")`, and its **complete** method set is ten methods:

```
SWDS  SWDM  SWDC  SWDD  FDFU  DFU1  DFU2  FRST  SOCW  MBXC
```

Every one is power, GPIO, or firmware-update control. There is no read-a-byte, no write-a-byte, no SPI transfer primitive, no DMA descriptor. Nothing that could move a single byte of Touch Bar framebuffer data. I enumerated all 27 `_HID` device IDs across every table and not one is a Touch Bar; grepping the decompiled ASL for `Touch Bar` returns zero hits. The firmware never mentions the display.

A from-scratch driver needs a device to bind to, a transport, and a protocol. This machine supplies none of the three. **The Touch Bar requires macOS.**

The "just the Esc/F-keys" fallback is not a smaller job — it is the same job with the impossible part removed. Those are HID reports on the same absent endpoint, consumed by `appletb_hid_event()`.

One more correction along the way, worth recording because it nearly became a bad recommendation. I said the ambient light sensor was "a genuine win" from the driver work. It is not. `apple-ib-als` is a *HID* driver that returns `-ENODEV` without a real HID device, and gets its data from `hid_hw_request()` — the same absent endpoint. What misled me was reading `lsmod`:

```
industrialio_triggered_buffer    12288  1 apple_ib_als
```

That `1` is the module dependency refcount, not a live device. There is no `iio:device*` in sysfs at all. But there *is* a second, genuinely independent ALS on this machine — `/sys/bus/acpi/devices/APPLE-UART-SOC-ALS:00`, on the embedded controller's UART at 115200 baud, which enumerates and is bound. That is the one that actually works on 2016/2017 Macs, and it is untouched by removing the driver.

---

## The keyboard row that does not exist

The Touch Bar's top row is unobtainable, so the useful thing to do with a keyboard shortcut is make `Cmd+A` mean "select all" everywhere. Two failures worth recording, both of which would have shipped without verification.

**`foot` was the wrong tool.** My first attempt was `foot --hold key ctrl+shift+a`. `foot` has no `key` subcommand — that would have launched a *second terminal window* instead of sending a keystroke. The correct Wayland tool is `wtype`.

**My verification was wrong in a way that nearly produced a false "it didn't work."** I grepped `hyprctl binds` for `SUPER, A`, found nothing, and concluded the bind was dead. It was live. The Omarchy Hyprland config is Lua, so every binding surfaces as `dispatcher: __lua` with modifiers encoded as a numeric `modmask` — a key-name search returns nothing whether or not the bind exists. Verified properly through `hyprctl binds -j`, the bind appeared as `modmask 64, key A`, where 64 matches the working `SUPER + RETURN` binding exactly.

```lua
o.bind("SUPER + A", nil, "wtype -k ctrl+a")
o.bind("SUPER + SHIFT + A", nil, "wtype -k ctrl+shift+a")
```

`Cmd+A` → `Ctrl+A` covers every GUI toolkit. `Cmd+Shift+A` covers the terminal, where `Ctrl+A` is readline's "beginning of line" rather than select-all.

---

## What I got wrong, collected

I have spent this post correcting myself, which is the honest shape of the project, but it is worth stating plainly because the pattern is the actual lesson.

**I asserted premises I had not checked, and in both cases the premise was the load-bearing one.** "The Touch Bar is on SPI, so a SPI driver is the path" — the firmware said otherwise, definitively. "The ALS is a working win worth keeping" — it rides the same dead transport as everything else. Both times I quoted my own conclusions back as if they settled something. Neither time had I run the check that would have settled it.

**The cheapest artifact came last, when it should have come first.** On the Touch Bar I reasoned forward from an unenumerated assumption for hours, and the decompiled ACPI tables — a twenty-minute job — would have answered it immediately. The lesson generalizes past hardware: when a conclusion depends on a fact you have not actually observed, go get the fact before building on it.

**Cleanup scripts lie when their backups are missing.** My DKMS removal reported `no .orig backups found, nothing to restore` and exited successfully, having restored nothing. A script that manufactures the appearance of a clean revert is worse than one that fails loudly. It was a lie about state, and the sources on disk were still my patched versions.

**Enumerate before you theorize.** Every wrong turn in the graphics phase came from reasoning about the display from first principles. Three seconds of `cat /sys/class/drm/card*-*/status` would have shown the panel on the AMD card and made the entire "disable the dGPU" line of advice obviously wrong.

---

## Where it landed

```
Kernel        7.2.5-3-omarchy          Limine 12.8.0
Root          btrfs /dev/mapper/root[/@]  (LUKS + snapper)
Boot          ~29-31s, visible, timeout: 3, default_entry: 1
Graphics      radeonsi GL / RADV Vulkan / VA-API, all verified live
Panel         2880x1800 @ 60Hz on amdgpu (card1-eDP-1)
Local LLM     Llama 3.1 8B Q4_K_M, CPU-only, 127.0.0.1:8080
Agent         Hermes -> custom:llamacpp / llama31-8b, 131072 ctx
```

Two things remain genuinely open, and I would rather name them than let the tidy summary imply otherwise.

**Snapshot automation is still broken.** The watcher reports `Root filesystem is not Btrfs` as root on the host, one snapshot exists where five are configured, and it will neither create nor prune. The `timeout: 3` fix prevents the machine from *choosing* a stale snapshot, but nothing is currently *creating* fresh ones. Before making config changes on this machine, create a snapshot manually — the safety net is thinner than the config implies.

**The ambient light sensor is available and unwired.** `APPLE-UART-SOC-ALS:00` is a live 115200-baud device on the EC UART. A small daemon reading `/dev/ttyS0` to drive `gmux_backlight` for auto-brightness is a real, tractable project — and unlike the Touch Bar, every ingredient is confirmed present.

The Touch Bar is gone permanently, and that is a hardware fact rather than a defeat. Everything else on this machine is doing what it should.
