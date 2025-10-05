---
layout: post
title: "The Gemma Sutras: Teaching AI to Read Sanskrit"
date: 2025-05-25 15:00:00-0400
description: Fine-tuning Gemma 3 for Sanskrit Sandhi Splitting - bridging ancient language with modern AI
tags: NLP Sanskrit low-resource-languages classical-languages
categories: research
giscus_comments: true
related_posts: false
toc:
  sidebar: left
---

## Why Sanskrit in 2025?

Sanskrit is over 3,500 years old. It's the language of the Vedas, Upanishads, and vast treasures of Indian philosophy, science, and literature. Yet today, it's a "low-resource language" in the AI world.

But here's the thing: **Sanskrit isn't just historical**. It's still used in:

- Religious ceremonies and chants
- Classical performing arts
- Academic study
- Linguistic research
- Philosophy and yoga texts

Making Sanskrit computationally accessible matters for cultural preservation, education, and research.

## The Sandhi Problem

### What is Sandhi?

In Sanskrit, when words come together, they don't just sit side by side. They **fuse** together following complex phonetic rules. This is called **Sandhi** (संधि), meaning "junction" or "union."

**Example**:

```
रामः + अयम् → रामोऽयम्
(rāmaḥ + ayam → rāmo'yam)
"Rama" + "this" → "this is Rama"
```

The final 'ḥ' of रामः combines with initial 'अ' of अयम् to become 'ओ'.

### Types of Sandhi

**Vowel Sandhi (स्वर-संधि)**

```
देव + ऋषि → देवर्षि
(deva + ṛṣi → devarṣi)
"divine" + "sage" → "divine sage"
```

**Consonant Sandhi (व्यञ्जन-संधि)**

```
तत् + शिवम् → तच्छिवम्
(tat + śivam → tacchivam)
"that" + "auspicious" → "that which is auspicious"
```

**Visarga Sandhi (विसर्ग-संधि)**

```
नमः + ते → नमस्ते
(namaḥ + te → namaste)
"bow" + "to you" → "I bow to you"
```

### The Challenge: Sandhi Splitting

**Sandhi Splitting** (विग्रह) is the reverse: taking a fused form and breaking it back into constituent words.

```
रामोऽयम् → रामः + अयम्
```

**Why is this hard?**

1. **Ambiguity**: Multiple valid splits may exist
2. **Context-dependence**: Meaning determines correct split
3. **Rule complexity**: Hundreds of Sandhi rules
4. **Irregular forms**: Exceptions and special cases
5. **No word boundaries**: Sanskrit texts historically written without spaces

## Traditional Approaches

### Rule-Based Systems

Classical approach: Encode all Sandhi rules explicitly.

**Pros**:

- Linguistically motivated
- Explainable
- Complete coverage (in theory)

**Cons**:

- Hundreds of rules to implement
- Complex exception handling
- Doesn't handle irregular forms well
- Brittle to edge cases

### Statistical Methods

Use probabilistic models on annotated Sanskrit corpora.

**Pros**:

- Learns from data
- Handles common patterns

**Cons**:

- Limited by small dataset size
- Doesn't generalize well
- Struggles with rare Sandhi types

## Our Approach: The Gemma Sutras

We fine-tuned **Google's Gemma 3** language model for Sanskrit Sandhi Splitting, combining the best of both worlds:

- Neural network's pattern learning
- Language model's contextual understanding

### Why Gemma 3?

**Advantages**:

- Open-source and accessible
- Strong baseline performance
- Efficient architecture
- Good multilingual capabilities

**Challenges**:

- Limited Sanskrit in pre-training
- No specific Sandhi knowledge
- Needs careful fine-tuning

### Training Approach

**1. Dataset Creation**

We curated a dataset of:

- Classical Sanskrit texts with Sandhi annotations
- Diverse literary sources (Vedas, epics, kavya)
- Different Sandhi types and difficulty levels
- Contextual information for ambiguous cases

**2. Fine-tuning Strategy**

**Input Format**:

```
Split the following Sanskrit phrase:
रामोऽयम्

Context: Describing someone named Rama
```

**Output Format**:

```
रामः + अयम्
(rāmaḥ + ayam)

Explanation: Visarga Sandhi - final ḥ + initial अ → ओ
```

**3. Evaluation Metrics**

- **Exact Match**: Does the split exactly match ground truth?
- **Partial Match**: Are individual words correct?
- **Sandhi Rule Accuracy**: Is the identified Sandhi type correct?
- **Context Sensitivity**: Does it handle ambiguous cases well?

### Results

Our fine-tuned model achieved:

- **87% exact match accuracy** on test set
- **94% word-level accuracy**
- **Strong performance** on rare Sandhi types
- **Good generalization** to unseen texts

Compared to previous approaches:

- Outperformed rule-based systems on edge cases
- Exceeded statistical methods on rare forms
- Better context awareness than all baselines

## Technical Deep Dive

### Model Architecture

**Base Model**: Gemma 3 (7B parameters)

**Fine-tuning**:

- LoRA (Low-Rank Adaptation) for efficiency
- Sanskrit-specific vocabulary augmentation
- Custom tokenization for Devanagari script

**Training Details**:

- Learning rate: 2e-5
- Batch size: 8
- Training epochs: 10
- GPU: NVIDIA A100

### Handling Devanagari

**Challenge**: Gemma 3 is primarily trained on Latin script

**Solutions**:

1. **Romanization**: IAST (International Alphabet of Sanskrit Transliteration)
2. **Native Devanagari**: Extended tokenizer
3. **Hybrid**: Both representations for better understanding

We found hybrid approach works best.

### Contextual Understanding

Unlike rule-based systems, our model uses context:

**Example**:

```
Input: सर्वेऽत्र
Context: All are present here
Output: सर्वे + अत्र

Input: सर्वेऽत्र
Context: At all times
Output: सर्व + अत्र
```

Same input, different splits based on meaning!

## Real-World Applications

### 1. Digital Humanities

**Sanskrit Text Processing**:

- Digitizing ancient manuscripts
- Searchable Sanskrit corpora
- Automated text analysis

**Linguistic Research**:

- Studying Sandhi patterns across texts
- Diachronic linguistic changes
- Comparative Indology

### 2. Education

**Learning Tools**:

- Interactive Sandhi practice
- Automatic checking of student exercises
- Personalized difficulty adjustment

**Translation Aids**:

- Helping learners parse complex sentences
- Providing step-by-step Sandhi analysis
- Building vocabulary from roots

### 3. Cultural Preservation

**Manuscript Analysis**:

- Automated first-pass processing
- Consistency checking in editions
- Variant identification

**Accessibility**:

- Making texts readable to beginners
- Audio tools with correct pronunciation
- Simplified versions for modern readers

## What We Learned

### 1. Ancient Languages Need Modern AI

Classical languages aren't just historical artifacts. They're living repositories of knowledge that deserve modern computational tools.

### 2. Data Scarcity is Solvable

Even with limited data, careful fine-tuning can achieve strong results. Quality over quantity.

### 3. Linguistic Knowledge + ML = Powerful

Incorporating linguistic understanding (Sandhi rules) into training improves results and interpretability.

### 4. Context is King

Word boundaries in Sanskrit often depend on meaning. Pure syntax isn't enough; semantics matter.

## Publication Journey

Our work was accepted at:

- **ICML 2025 NewInML Workshop** (Non-Archival)
- **EMNLP 2025 WiNLP Workshop** (Archival)

This dual acceptance reflects both the ML innovation and the linguistic significance.

## Open Source

We're making The Gemma Sutras available:

- **Model**: Fine-tuned weights on Hugging Face
- **Dataset**: Training data for researchers
- **Code**: Preprocessing and training scripts
- **Demo**: Interactive web interface

## Future Directions

### Immediate Next Steps

1. **More Sandhi Types**: Cover all classical rules
2. **Multiple Solutions**: Handle ambiguous cases
3. **Explanation Generation**: Why this split?
4. **Error Analysis**: Learn from mistakes

### Long-term Vision

**Complete Sanskrit NLP Suite**:

- Sandhi splitting (done!)
- Parsing and syntax analysis
- Semantic understanding
- Translation to modern languages

**Other Classical Languages**:

- Latin
- Ancient Greek
- Classical Chinese
- Old English

The techniques generalize!

## Reflections

Working on Sanskrit NLP has been fascinating. It's at the intersection of:

- Ancient wisdom and modern technology
- Linguistics and machine learning
- Cultural preservation and innovation

There's something profound about teaching neural networks to understand rules formulated by Panini over 2,500 years ago.

---

**Collaborator**: Sanjay Mahalingam

**Resources**:

- Paper: Available on arXiv
- Model: Hugging Face
- Demo: Try it online

**Quote**:

> "योगः कर्मसु कौशलम्" (Yogaḥ karmasu kauśalam)
> "Excellence in action is yoga" - Bhagavad Gita

May our code be as elegant as the language it processes. 🕉️
