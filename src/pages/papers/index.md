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

### 4) Learning Narrative Relations

Given a list of observed verb/dependency frequencies, we can compute the pointwise mutual information between these occurances as:

$$
PMI[e(w, d), e(v, g)] = \operatorname{log} \frac{P[e(w, d), e(v, g)]}{P[e(w, d)] \cdot P[e(v, g)]}
$$

where $e(w, d)$ is the verb/dependency pair between $w$ and $d$.