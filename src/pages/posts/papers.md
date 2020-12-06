---
path: "/blog/papers"
date: "2020-02-05"
title: "Some Interesting Research Papers"
tags: ['machine learning', 'research', 'notes']
excerpt: "Notes on a few papers from my coursework"
---

# Some Interesting Research Papers
> Notes on a few papers from my coursework

This page is for short outlines of papers I find interesting. These notes may vary in techincal detail as well as in core concepts - feel free to reach out to me with errata or questions.

## Intelligence Without Representation
[Brooks (1987)](https://people.csail.mit.edu/brooks/papers/representation.pdf)

In this paper, roboticist Rodney Brooks advocates for a research direction of artificial intelligence that is orthogonal to the traditional paradigms of the 1980s (and before). In particular, he argues against centralized representation for AI systems, and instead offers that for a given *Creature*, the environment itself should act as a representation of the world through its feedback. This is an extension of the greater debate against Symbolic AI, and Brooks introduces the **Subsumption Architecture**. A variety of robots were developed and deployed at MIT, that leveraged the *actionist approach* to AI system design.

## Deep Reinforcement Learning with a Natural Language Action Space
[Ji He et al. (2016)](https://arxiv.org/abs/1511.04636)

This paper introduces a new deep reinforcement architecture for handling natural language spaces: the Deep Reinforcement Relevance Network (DRRN). The DRRN is shown to perform well in text-based game settings, with superior performance over standard Q-Learning architectures. 

### Q-Learning for Text Games
In text-based games, we can view the state as being a function of the description given to the player, and the action as one of the possible lists of actions for the current state. Formally, the environment is updated $s_{t + 1} = s'$ in accordance with the distribution $P(s' | s, a)$. Then, the agent receives a reward $r_t$ for the transition. The authors use a stochastic policy $\pi(a_t | s_t)$ for time $t$. The Q-function $Q^\pi (s, a)$ is defined as the expected return starting from state $s$, taking action $a$, and remaining optimal for the remainder of the horizon:

$$
Q^\pi(s_t, a_t) = \mathop{\mathbb{E}}~[\thinspace \sum_{k = 0}^\infty \gamma^k r_{t+k} | s_t = s, a_t = a \thinspace]
$$

One of the primary motivators of the Deep Reinforcement Relevance Network is semantic representation through word embeddings. As such, the DRRN uses two deep neural networks to approximate embeddings for both actions/states in the given textual environment. Then, a general interaction function can be defined between these finite vectors (e.g. dot product, inner product) to approximate the Q-function for the state-action pair. 

The optimal policy and Q-function is determined using the canonical Q-learning update algorithm, where $\eta$ is the learning rate:

$$
Q(s_t, a_t) \leftarrow Q(s_t, a_t) + \eta_t \cdot (r_t + \gamma \cdot \operatorname{max}_a Q(s_{t+1}, a) - Q(s_t, a_t))
$$

The authors also use a softmax selection strategy as the exploration policy during the learning state, where $A_t$ is the set of actions at time $t$:

$$
\pi(a_t = a_t^i | s_t) = \frac{\operatorname{exp} (\alpha \cdot Q(s_t, a_t^i))}{\sum _{j=1} ^{|A_t|} \operatorname{exp} (\alpha \cdot Q(s_t, a_t^j))}
$$

The scaling factor $\alpha$ is used to facilitate the degree of exploration early in the model's training. As the model approximates the Q-function better, the $\alpha$ factor will assign higher probability to the optimal action. This allows the model to practice exploitation of optimal policies later on in inference.

### Natural Language Target Spaces

For an action space $A$, and state space $S$, vanilla Q-learning recursion requires maintaining a table of size $|A| \cdot |S|$, which can be intractable for large action/state spaces. In addition, depending on the type of text-game, the possible action set $A_t$ for time $t$ can be unknown, so it's unrealistic to design an architecture around the cardinality of the action space.

> From the paper: "it is not practical to have a DQN architecture of a size that is explicitly dependent on the large number of natural language options"

To mitigate this problem, the DRNN is used to compute Q-values with a single forward pass for each state/action pair. Then, softmax selection can be applied with the exploration/exploitation factor $\alpha$.

### Experimental Setup 

The authors manually anotate endings for two different text games, with the reward being proportional to the sentiment of the output. Small negative rewards are given for each non-ending state, to promote the agent to finish the game as quickly as possible.

A Max-Action DQN and a Per-Action DQN are used as baselines to test against. The DRNNs used have 1 or 2 hidden layers with a dimensionality of 20, 50 or 100.

## Unsupervised Learning of Narrative Event Chains
[Nathanael Chambers and Dan Jurafsky (2008)]()

In Fall 2019, I worked on an updated implementation of *Unsupervised Learning of Narrative Event Chains* by Chambers and Jurafsky (2008) as part of an independent study project at the University of Pennsylvania, advised by Chris Callison-Burch. The overall goal of the project is to learn discrete representations of narrative knowledge through **Narrative Events** and orderings known as **Narrative Chains**. 

Hand-written scripts were used in NLP in the 1980s as a structured representation of a body of text. In this paper, such scripts are learned for narrative text, referred to as **narrative chains**. These chains not only provide a representation of the source text, but also encode subject/verb semantics and temporal orderings of events as well. From the paper: "Since we are focusing on a single actor in this study, a narrative event is thus a tuple of the event and the typed dependency of the protagonist". Let's formalize:

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

### My Implementation
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

### Conclusion
This was a really interesting approach to modelling narrative semantics. I'm currently taking an [advanced seminar course](interactive-fiction-class.org/) in text generation and interactive fiction, and I hope to draw inspiration from this project to state of the art models/games such as GPT-2 and AI Dungeon 2!