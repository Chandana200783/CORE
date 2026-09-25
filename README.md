# ROVERA v2.6 | Autonomous Multi-Agent Robot Fleet Coordination Platform
### HackFusion 2026 • IEEE Robotics & Automation Society (RAS)

[![IEEE RAS](https://img.shields.io/badge/IEEE-Robotics%20%26%20Automation%20Society-00629B.svg)](https://www.ieee-ras.org/)
[![HackFusion 2026](https://img.shields.io/badge/HackFusion-2026%20Problem%20Statement-cyan.svg)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg)](#)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg)](#)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple.svg)](#)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](#)

---

## 📌 Executive Summary

**ROVERA** is a decentralized, fault-tolerant autonomous multi-agent fleet coordination engine engineered for heterogeneous robotic swarms operating in dynamic, energy-constrained, and contested environments. Built for the **IEEE RAS HackFusion 2026 Problem Statement**, ROVERA eliminates single points of failure through peer-to-peer (P2P) negotiation, spatial-temporal conflict prediction, cyclic deadlock recovery, battery-aware return-to-base (RTB) scheduling, and an $O(N)$ spatial hashing grid that scales smoothly to **500+ simulated robots**.

---

## 🎯 Key Functionalities & Features

### 1. Multi-Agent Task Allocation (MATA)
- **Multi-Factor Bidding Engine:** Assigns and rebalances tasks based on capability match ($RGB$, $Thermal$, $LiDAR$, $Relay$, $Payload$), Euclidean/corridor distance, current workload, battery reserve State-of-Charge (SOC), risk rating, and Estimated Completion Time (ECT).
- **Dynamic Workload Rebalancing:** Re-evaluates assignments when emergent tasks appear or agent status changes.

### 2. Peer-to-Peer (P2P) Negotiation & Consensus
- **Contract Net Protocol (CNP):** Robots broadcast Calls for Proposals (CFP), submit competitive bids with marginal cost evaluations, and negotiate awards without central server dependence.
- **Game-Theoretic Coalitions:** Heterogeneous robots self-organize into multi-agent coalitions for complex missions requiring complementary sensors and payload capacities (e.g., Scout Drone + LiDAR Rover + Utility Rover).

### 3. Conflict & Collision Management (CBS & RVO)
- **Spatial-Temporal Conflict Prediction:** Looks ahead along space-time trajectory horizons (up to 12 ticks) to detect pairwise conflict zones (head-on, crossing, and corridor contention).
- **Autonomous Right-of-Way (RoW) Resolution:** Resolves spatial conflicts through deterministic priority ordering:
  $$\text{Priority Score} = 10 \cdot P_{\text{task}} + 5 \cdot \mathbb{I}(\text{Battery} < 25\%) + 2 \cdot \mathbb{I}(\text{Payload} > 40) + \text{TieBreaker}$$
- **Dynamic Detour Generation:** Lower-priority yielding robots immediately compute and follow orthogonal alternative detour trajectories.

### 4. Deadlock Detection & Automated Recovery
- **Wait-For Graph (WFG) Modeling:** Constructs a directed graph $G = (V, E)$ where an edge $(R_i \to R_j)$ indicates Robot $R_i$ is blocked waiting for Robot $R_j$ to vacate a pathway.
- **Cycle Detection (Tarjan / DFS):** Flags closed waiting cycles (e.g., $R_1 \to R_2 \to R_3 \to R_1$) as system deadlocks.
- **Autonomous Recovery Maneuvers:** Automatically resolves deadlocks via lateral back-off yield maneuvers to clearance pockets, priority inversion, or task migration.

### 5. Battery-Aware Scheduling & Return-To-Base (RTB)
- **Mission Feasibility Energy Audit:** Before task commitment, robots evaluate:
  $$E_{\text{total}} = E_{\text{transit}} + E_{\text{execution}} + E_{\text{RTB}} + E_{\text{reserve}} (15\%)$$
- If $E_{\text{avail}} < E_{\text{total}}$, the mission is rejected or handed over to a peer, and the robot is routed to the nearest charging station (Pad Alpha, Beta, or Gamma).
- **Automated Charging Station Queues:** Tracks docking capacity, charge rates (+3.5%–4.0% per tick), and charging queue status.

### 6. Decentralized Ad-Hoc Gossip Mesh Mode (Central Blackout Resilience)
- **Central Disconnect Resilience:** Mission execution continues uninterrupted when the central orchestrator is killed.
- **P2P Wireless Mesh:** Robots within radio range form an ad-hoc multi-hop gossip mesh with inter-agent heartbeats and distributed state replication.

### 7. Scalability Toward 500+ Simulated Robots
- **$O(N)$ Spatial Hashing Grid:** Partitions 2D operational space into localized buckets. Neighborhood and collision queries run in $O(1)$ constant time per agent, eliminating the $O(N^2)$ quadratic bottleneck.
- **High-Performance Canvas Rendering:** Automatically switches to a vectorized 2D Canvas pipeline when scaled to 50, 150, or 500+ robots, sustaining 60 FPS animation.

### 8. Partial, Delayed, or Conflicting Information Simulation
- **Network Degradation Controls:** Configurable packet loss (0%–45%), latency jitter (0–800 ms), and inter-robot radio radius.
- **Bayesian Belief Fusion:** Local belief state synchronization overcomes dropped or out-of-order packets.

### 9. Interactive Fault-Injection Suite
- One-click failure triggers:
  - 💥 Motor actuator lock / seizure
  - 🔋 Sudden battery depletion (12% critical)
  - 📡 RF comms jamming / network disconnect
  - 🔌 Central controller blackout
  - 🚧 Corridor deadlock contention scenario

---

## 🏗️ System Architecture

```mermaid
graph TD
    subgraph Operational Environment
        T[Task Objectives Queue] --> MATA[Multi-Agent Task Allocation]
        Z[Danger & Blocked Zones] --> CBS[Conflict-Based Search Engine]
    end

    subgraph Autonomous Fleet Coordination
        MATA -->|Task Specs| CNP[P2P Contract Net Protocol]
        CNP -->|Bids & Coalitions| ROBOTS[Heterogeneous Robot Fleet]
        ROBOTS -->|Planned Paths| CBS
        CBS -->|Spatial-Temporal Intersections| ROW[Right-of-Way Resolver]
        ROW -->|Detour Trajectories| ROBOTS
        ROBOTS -->|Corridor Dependencies| WFG[Wait-For Graph & Deadlock Engine]
        WFG -->|Lateral Escape Maneuvers| ROBOTS
    end

    subgraph Energy & Network Infrastructure
        ROBOTS -->|SOC Monitoring| RTB[Battery-Aware RTB Scheduler]
        RTB -->|Queuing & Docking| PADS[Charging Stations Alpha, Beta, Gamma]
        ROBOTS <-->|RF Ad-Hoc Links| MESH[P2P Gossip Mesh Network]
        MESH -->|Packet Loss & Jitter| SIM[Network Degradation Simulator]
    end

    subgraph High-Scale Swarm Engine
        ROBOTS -->|2D Coordinates| GRID[Spatial Hashing Grid O(N)]
        GRID -->|Neighborhood Lookups| SWARM[500+ Swarm Physics & Canvas]
    end
```

---

## 💻 Tech Stack

- **Frontend & UI:** React 18, TypeScript, Tailwind CSS, Lucide Icons, HTML5 Canvas 2D
- **Build Tool & Bundler:** Vite 5
- **Algorithms:**
  - Conflict-Based Search (CBS) & Reciprocal Velocity Obstacles (RVO)
  - Contract Net Protocol (CNP) & Shapley Value Coalition Formation
  - Tarjan / DFS Directed Cycle Deadlock Detection
  - Spatial Grid Partitioning ($O(N)$ Complexity)
  - Bayesian Multimodal Evidence Fusion

---

## 🚀 Getting Started & Local Setup

### Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)

### Installation
1. Clone this repository:
```bash
git clone https://github.com/your-username/rovera-multi-agent-fleet.git
cd rovera-multi-agent-fleet/project
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

4. Build for production:
```bash
npm run build
```
Optimized static assets will be output to `dist/`.

---

## 🧪 Demonstration Guide for Evaluators & Jury

1. **Mission Control (`/`):**
   - Click **"Run Demo"** to initiate autonomous task discovery, bidding, and execution.
   - Toggle **Mesh**, **Conflicts**, **Chargers**, and **Deadlocks** layer overlays in the tactical grid header.
2. **Conflicts & Deadlocks Tab:**
   - Observe real-time predicted trajectory intersections and Right-of-Way assignments.
   - Click **"Inject Head-On Deadlock"** and observe how the Wait-For Graph cycle is automatically broken via lateral escape maneuvers.
3. **Battery & RTB Tab:**
   - Inspect the **Energy Feasibility Audit** table showing transit, execution, RTB energy, and 15% safety margins.
   - Click **"Send RTB"** on any robot to observe automated docking and recharge at Stations Alpha, Beta, or Gamma.
4. **Faults & Mesh Resilience Tab:**
   - Click **"Kill Central Controller"** to simulate total central node failure. Notice that the system switches to **P2P GOSSIP MESH** and mission execution continues without interruption.
   - Inject motor failures, battery drops, or comms jamming and witness real-time peer task handover.
5. **500+ Swarm Benchmarks Tab:**
   - Click **"Swarm (500+ Robots)"** to scale simulation to over 500 active agents.
   - Review the live telemetry gauges: 60 FPS, &lt;2 ms tick latency, and thousands of pairwise collision checks eliminated via spatial hashing.

---

## 👥 HackFusion 2026 Team Details
- **Project Name:** ROVERA Multi-Agent Fleet Engine
- **Hackathon:** HackFusion 2026
- **Society:** IEEE Robotics & Automation Society (RAS)
- **Evaluation Track:** Autonomous Multi-Agent Coordination & Swarm Systems
