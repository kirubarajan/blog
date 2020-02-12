---
path: "/blog/narrative"
date: "2020-01-10"
title: "Independent Study on Narrative Event Chains"
tags: ['machine learning', 'natural language processing', 'research']
excerpt: "My Notes on Recent Papers in Machine Learning and NLP"
---

# Unsupervised Learning of Narrative Event Chains
*Nathanael Chambers and Dan Jurafsky (2008)*

In Fall 2019, I worked on an updated implementation of *Unsupervised Learning of Narrative Event Chains* by Chambers and Jurafsky (2008) as part of an independent study project at the University of Pennsylvania, advised by Chris Callison-Burch. The overall goal of the project is to learn discrete representations of narrative knowledge through **Narrative Events** and orderings known as **Narrative Chains**. 

Hand-written scripts were used in NLP in the 1980s as a structured representation of a body of text. In this paper, such scripts are learned for narrative text, referred to as **narrative chains**. These chains not only provide a representation of the source text, but also encode subject/verb semantics and temporal orderings of events as well. From the paper: "Since we are focusing on a single actor in this study, a narrative event is thus a tuple of the event and the typed dependency of the protagonist". Let's formalize:

## The Paper

The contributions of this paper are three-fold: 1) learning unsupervised relations between entities, 2) temporal ordering of narrative events, 3) pruning of the narrative chains into discrete sets.

### The Narrative Chain Model
The authors define two key terminology: **narrative chains** and **narrative events**. Narrative Events are defined as tuples of an event and its participants, represented as typed dependencies. This paper only considers single actors as **protagonists** and as such narrative events are a tuple of the event and the typed dependency of the protagonist: *(event, dependency)*. Narrative Chains are therefore defined as a partially ordered set of narrative events that share a common protagonist/actor. Formally this is defined as $\{e_1, e_2, ..., e_n \}$ where $n$ is the length of the chain and relationship $B(e_i, e_j)$ is true if and only if event $i$ occurs strictly before event $j$.

### Learning Narrative Relations
Given a list of observed verb/dependency frequencies, we can compute the pointwise mutual information between these occurances as:

$$
PMI[e(w, d), e(v, g)] = \operatorname{log} \frac{P[e(w, d), e(v, g)]}{P[e(w, d)] \cdot P[e(v, g)]}
$$

where $e(w, d)$ is the verb/dependency pair between $w$ and $d$.

### Evaluation
Evaluation is performed using the *Narrative Cloze* Evaluation Task for narrative coherence. A narrative chain is provided to the task and an event is removed in order for the model to perform a prediction to be evaluated on. The aim of the task is to perform a fill-in-the-blanks task, which upon successful completion indicates the presence of coherent narrative knowledge by the model. Given of tuple list of `(chain, event)` where `chain` is missing the true prediction `event`, the evaluation module returns the average model position. The model position is defined as the true event's position in the model's ranked candidate outputs (lower is better).

## My Implementation
My implementation of (Chambers and Jurafsky, 2008) uses updated libaries, classes and functions. Written in Python, using the Stanford CoreNLP library (updated dependency parsing from transition model to neural-based Universal Dependencies) as well as the SpaCy pipeline for neural network models (with extensions from HuggingFace). I also extended the project to use NLP's secret sauce: word embeddings. An interpolated model between pointwise mutual information and cosine similarity shows strong results with low amounts of training data.

The following libraries are used throughout the study:
1. Stanford CoreNLP Python Implementation (`stanfordnlp`)
2. SpaCy Dependency Parser (`spacy`)
3. HuggingFace Neural Coreference Resolution (`neuralcoref`)

Extensions include:
1. Magnitude Embedding Library (`pymagnitude`)
2. Word2Vec Google News Skip-Gram Model

### Examples
Examples of identified narrative events in the format `(subject, verb, dependency, dependency_type, probability)`:

```
you kiss girl dobj 0.00023724792408066428
that enables users dobj 0.00023724792408066428
God bestows benefaction dobj 0.00023724792408066428
Astronomers observed planets dobj 0.00023724792408066428
```

Examples of generated narrative chains (using a Greedy Decoding strategy):

*(Embedding-Similary Based)*
```
seed event: play I dsubj -> I play
score nsubj -> I score
win nsubj -> I win
beat nubj -> I beat
```

*(Pointwise Mutual Information Approximation Based)*
```
seed event:  go I nsubj -> I go
get nsubj -> I get
do nsubj -> I do
want nsubj -> I want
```

### Implementation Notes 
1. verb space too large -> lemmatizing verbs before parsing
2. events are similar to themselves -> removing seen verbs in chain from prediction candidates
3. coreference resolution fails occasionally -> increase chunk size
4. parsing is slow -> single grammatical pass and resolve entities ad-hoc
5. coreference count computation is slow -> refactor to matrix implementation

## Conclusion
This was a really interesting approach to modelling narrative semantics. I'm currently taking an [advanced seminar course](interactive-fiction-class.org/) in text generation and interactive fiction, and I hope to draw inspiration from this project to state of the art models/games such as GPT-2 and AI Dungeon 2!