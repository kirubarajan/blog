---
path: "/blog/papers"
date: "2019-12-22"
title: "Interesting Papers"
tags: ['machine learning', 'natural language processing', 'notes']
excerpt: "My Notes on Recent Papers in Machine Learning and NLP"
---

# Interesting Papers
> My Notes on Recent Papers in Machine Learning and NLP

## Unsupervised Learning of Narrative Event Chains
*Nathanael Chambers and Dan Jurafsky (ACL 2008)*

Hand-written scripts were used in NLP in the 1980s as a structured representation of a body of text. In this paper, such scripts are learned for narrative text, referred to as **narrative chains**. These chains not only provide a representation of the source text, but also encode subject/verb semantics and temporal orderings of events as well.

The contributions of this paper are three-fold: 1) learning unsupervised relations between entities, 2) temporal ordering of narrative events, 3) pruning of the narrative chains into discrete sets.

### 3) The Narrative Chain Model

The authors define two key terminology: **narrative chains** and **narrative events**. Narrative Events are defined as tuples of an event and its participants, represented as typed dependencies. This paper only considers single actors as **protagonists** and as such narrative events are a tuple of the event and the typed dependency of the protagonist: *(event, dependency)*. Narrative Chains are therefore defined as a partially ordered set of narrative events that share a common protagonist/actor. Formally this is defined as $\{e_1, e_2, ..., e_n \}$ where $n$ is the length of the chain and relationship $B(e_i, e_j)$ is true if and only if event $i$ occurs strictly before event $j$.

### 4) Learning Narrative Relations

Given a list of observed verb/dependency frequencies, we can compute the pointwise mutual information between these occurances as:

$$
PMI[e(w, d), e(v, g)] = \operatorname{log} \frac{P[e(w, d), e(v, g)]}{P[e(w, d)] \cdot P[e(v, g)]}
$$

where $e(w, d)$ is the verb/dependency pair between $w$ and $d$.