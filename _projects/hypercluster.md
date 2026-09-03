---
layout: page
title: HyperCluster
description: Decentralized LLM inference across a self-organizing peer-to-peer device cluster
importance: 3
category: work
---

## Overview

HyperCluster is a peer-to-peer framework for running large language models across heterogeneous edge devices. The system automatically forms a computational ring, shards dense models according to each device's available memory and compute, and pipelines inference without a central coordinator.

## Key Features

### Distributed Architecture

- **Self-organizing network** with automatic peer discovery
- **Fault tolerance** using Iroh protocol
- **Dynamic layer offloading** for efficient resource utilization

### General model sharding

- Automatic partitioning for dense Hugging Face Transformer models
- Capability-aware placement across heterogeneous peers
- Ring-based pipelining of intermediate states

### Edge Computing

- Runs on **consumer hardware**
- No centralized cloud infrastructure required
- Collaborative execution across peers

## Technical Stack

- **Networking**: Iroh for P2P communication
- **Models**: Hugging Face Transformers
- **Languages**: Python and Rust

## Vision

HyperCluster aims to democratize access to large language models by enabling communities to pool their computing resources. This approach reduces dependence on centralized cloud providers and makes AI more accessible globally.

## Publication

Published at **DAIS 2026** in the Springer LNCS proceedings and presented as a poster at the **AAAI 2026 ML4Wireless workshop**.

[Read the paper](https://doi.org/10.1007/978-3-032-27358-1_2)
