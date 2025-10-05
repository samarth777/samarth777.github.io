---
layout: post
title: "Winning the Meta Llama Impact Grant: Building Multilingual AI"
date: 2025-02-10 10:00:00-0400
description: How our work on the Nayana dataset earned a $100,000 Meta Llama Impact Grant and why multilingual AI matters
tags: AI multilingual-AI NLP computer-vision meta-grant
categories: research
giscus_comments: true
related_posts: false
featured: true
toc:
  sidebar: left
---

## The Announcement

In January 2025, we received incredible news: our project **Nayana** was awarded the **Meta Llama Impact Grant** worth **$100,000**. This recognition validates our mission to make AI truly inclusive across languages.

But let me back up and explain why this matters.

## The Problem: English-Only AI

Most AI systems today are built for English. While GPT-4, Claude, and other models are impressive, they struggle with:

- Low-resource languages (languages with limited training data)
- Non-Latin scripts (Devanagari, Tamil, Kannada, etc.)
- Multilingual documents (mixing multiple languages and scripts)
- Cultural context specific to different regions

**The result?** Billions of people are excluded from the AI revolution.

## Our Solution: The Nayana Project

### What is Nayana?

Nayana is a comprehensive framework for adapting Vision-Language Models (VLMs) to work with **over 22 languages**, particularly focusing on Indic languages.

### The Nayana Synthetic Dataset

We created the **largest multilingual document image dataset** with:
- **2M+ document images**
- **22+ languages** (including Hindi, Tamil, Telugu, Kannada, Bengali, and more)
- Support for **OCR, VQA, and layout analysis**
- Diverse fonts, layouts, and document types

### How We Built It: SynthDoc

To generate this massive dataset, we built **SynthDoc**, a synthetic document generation library that:

1. **Scales horizontally**: Using Modal, we ran 100 CPU and 10 GPU instances in parallel
2. **Handles multiple scripts**: Proper rendering for Devanagari, Tamil, Bengali scripts
3. **Generates realistic variations**: Different fonts, layouts, noise levels, and distortions
4. **Supports multiple tasks**: OCR, Visual Question Answering, layout analysis

## The Impact

### Research Publications

Our work has been accepted at multiple top-tier venues:
- **NAACL 2025** Workshop on Language Models for Underserved Communities
- **CVPR 2025** Workshop on Vision-Language Models for All
- **ICCV 2025** Workshop on Computer Vision for Developing Countries

### Real-World Applications

The Nayana dataset enables:

**1. Document Understanding**
- Digitizing government documents in local languages
- Processing multilingual forms and applications
- Automated translation services

**2. Education**
- Creating learning materials in native languages
- Accessible textbooks for visually impaired students
- Language learning applications

**3. Accessibility**
- Screen readers for non-English documents
- Text-to-speech in regional languages
- Assistive technology for diverse populations

**4. Business**
- Processing multilingual invoices and receipts
- Customer service in local languages
- Content moderation for regional platforms

## Why Meta Llama?

Meta's Llama models are open-source and designed to be adaptable. Our work aligns perfectly with Meta's mission to democratize AI:

- **Open Access**: Both Llama and Nayana are openly available
- **Community Impact**: Serving underserved linguistic communities
- **Technical Innovation**: Pushing boundaries of multilingual AI

The $100,000 grant recognizes this alignment and supports continued development.

## Technical Innovations

### Challenge 1: Limited Training Data

**Traditional Approach**: Manually collect and annotate documents
- Expensive
- Time-consuming
- Doesn't scale

**Our Approach**: Synthetic data generation
- Automated pipeline
- Infinite variations
- Cost-effective at scale

### Challenge 2: Multiple Scripts

Different scripts have different:
- Character sets
- Rendering requirements
- Layout conventions

**Solution**: Script-aware generation with proper Unicode handling and font management

### Challenge 3: Real-World Variations

Synthetic data must match real-world complexity:
- Scan artifacts and noise
- Multiple fonts and sizes
- Mixed language documents
- Various document types

**Solution**: Comprehensive augmentation pipeline with realistic variations

## Looking Forward

With the Meta Llama Impact Grant, we're expanding:

1. **More Languages**: Adding support for African, Southeast Asian languages
2. **Better Models**: Training state-of-the-art VLMs on our dataset
3. **Real-World Deployment**: Partnering with organizations serving low-resource communities
4. **Open Source**: Making everything freely available to researchers worldwide

## The Bigger Picture

AI should work for everyone, regardless of what language they speak. The Nayana project is a step toward that vision.

When AI systems can understand and generate content in any language, we unlock opportunities for billions of people. That's the future we're building.

---

**Collaborators**: Adithya S Kolavi and Vyoman Jain at CognitiveLab

**Resources**:
- Dataset: Available on Hugging Face
- Code: Open-source on GitHub
- Papers: Available on arXiv

The journey continues, and we're just getting started. 🌍

