---
path: "/blog/thesis"
date: "2021-03-16"
title: "My Undergraduate Thesis (In Progress)"
tags: ['machine learning', 'research']
excerpt: "Thesis on Information Extraction, Knowledge Graph Construction & Neural Machine Reasoning"
---


<div class="notification is-link">
    This post will be under construction until I graduate, and is subject to (probably a lot of) change. For any errata, feel free to reach out to me!
</div>

# My Undergraduate Thesis

After (almost) 4 long years at the University of Pennsylvania, I'm finally a senior approaching my final few weeks as a student. Sentiments aside, this means that I'm also wrapping up a lot of the research on machine learning and natural language processing I've done during my time at Penn. For my program, this culminates in a senior thesis (on a topic of my choosing) during my final semester.

A single semester isn't typically enough time to make a significant contribution to the field, so I'm hoping to use this thesis as an opportunity to explore new areas of machine intelligence. I'm really excited to shift some of my focus from my previous research from generative models (i.e. language models) towards knowledge representation. I'm equally excited to work with Professor [Dan Roth](https://en.wikipedia.org/wiki/Dan_Roth), who helped pioneer the field of machine reasoning. 

I'll be using this part of my website as a public workspace for my foray into **information extraction, knowledge graph construction, and machine reasoning**. This will probably include (but isn't limited to) code snippets, equations/derivations, background reading, literature review, and personal hot takes.

---

## Introduction

In recent years, there has been an explosion of data of various formats (e.g. video, text, sensor), which are not always immediately useful for completing tasks. An overarching goal in the field of machine intelligence is the problem of **knowledge representation**, a field dedicated to designing *efficient* representations of data that capture their respective data.

This problem is not just a question of information theory, but also relies on biological inspiration. When collecting new information, humans are able to make connections between related data, which enables not only efficient recall but also provides a framework for synthesizing new thoughts or beliefs. Providing such a framework for machines to perform such types of reasoning over previously given data is a goal for the field and, in turn, this paper.

The approach that this thesis is primarily interested in is the **knowledge graph** model, which models real life (or abstract) entities and their relationships as a graph $G = (V, E)$. Google aptly describes this approach as "things, not strings" [1], referring to the notion that these graphs are often mined from pure language but contain a far more powerful semantic meaning.

In this paper, we explore various knowledge graph construction methods, both from their theoretical merits, as well as their empirical performance provided real natural language data as source material. We also aim to provide an unopinionated framework for expressing declarative knowledge over mined knowledge graphs to aid in logical reasoning. In addition, an engineering goal for this thesis is to make such knowledge graphs accessible to the general public, by offering an open source front-end application that is self-hostable for researchers.

## Background

### Machine Learning

In recent years, researchers have made incredible progress towards the goal of artificial intelligence through the field of machine learning. For tasks that cannot be completed with imperative rules (e.g. image classification, text generation), traditional algorithms and software fail to produce adequete results. Machine learning serves to remedy this by automatically extracting such patterns and rules from data, and applying them at algorithm runtime to make decisions.

<br />

![](https://drek4537l1klr.cloudfront.net/chollet2/v-3/Figures/ch01-a-new-programming-paradigm.png)

<small> Source: François Chollet </small>

<br />

Although algorithms to make predictions from data have existed for many decades, the recent explosion in machine learning progress can be attributed to two key developments: more computing resources and more data. The first development is a byproduct of both Moore's Law, as well as readily available compute being made more prevelant by cloud providers such as Amazon's AWS or Microsoft's Azure. The latter development in machine learning progress is partly brought about by the former (i.e. more storage availability for big data), but is also made possible by an increased number of devices connected to the internet, providing troves of data to analyze.

Regarding this paper on knowledge graphs, machine learning has made it possible to automatically mine such graphical representations, instead of hand-annotating potentially billions of entities and their relations (as is the case with Google's Knowledge Graph, presumably the largest in existence).

#### Neural Networks

The most prevalent model in the machine learning renaissance is the **neural network**, which also goes by the name of **deep learning**. As the name implies, neural networks are machine learning models with a biological inspiration of neurons in animal brains. In particular, neurons can fire in accordance with other "similarly wired" neurons, where the strength between neurons (or synapses) can be modelled using continuous weights. 

In **feed-forward** neural networks (pictured below), we can often stack neurons in order to create a longer synapse path between the input layer and the output layer, thus creating the need for additional learnable model parameters. This increase in model capacity provides representational power to the neural network, thus giving the name **deep learning** (due to networks with hidden layers being "deep").

![](https://1.cms.s81c.com/sites/default/files/2021-01-06/ICLH_Diagram_Batch_01_03-DeepNeuralNetwork-WHITEBG.png)
<small> Source: IBM </small>

Neural networks offer a primary advantage of not requiring hand-picked or discrete features during inference. This is especially important when working when modelling data types that do not have explicitly identifiable features, such as language or image data. The downside to this power is that neural networks require orders of magnitude more training data than classical machine learning models (such as random forests or linear regression).

Neural Network parameters are generally stochastically optimized using **gradient descent**. The process for doing this is to first define an auxillary **loss function** that measures the "correctness" of the model's output with respect to some training data, known as a *forward pass*. Next, the gradients of the model parameters with respect to the loss function are computed using the chain rule of calculus in a dynamic programming algorithm named **backpropagation**, also known as the *backward pass*. Finally, the model parameters are updated in accordance with their gradients in order to minimize the loss function. The stochasticity in the optimization process arrives from sampling a **batch** of training examples at a time in order to leverage hardware parallelization (particularly in GPUs). 

The gradient descent update rule is given by:

$$
w_{t + 1} = w_t - \alpha \nabla w_t
$$

where $\alpha$ is the **learning rate**, often an integer in the range [0.01, 0.05].

### Transformers

The current state-of-the-art in various natural language processing tasks (particularly related to information extraction and text generation) are **transformer** models, which have been popularized by Vatswani et. al in 2017. These models are largely extensions of feed-forward neural networks, and mark a departure from the previous state-of-the-art models that were variations of **recurrent neural networks**. Due to their feed-forward nature, transformer networks are highly parallelizable, and thereby make it feasible to train of vast quantities of language data.

![](http://jalammar.github.io/images/t/transformer_resideual_layer_norm_3.png)

#### Model Fine-Tuning

A recent development in the natural language processing field is the use of **model fine-tuning**, where a base machine learning model is used to springboard additional training on another dataset, in order to leverage both the generalizability of the original base model as well as the domain-specific performance of the fine-tuning training set. For this paper, we rely on BERT for our base transformer model, and utilize the power of **fine-tuning** to acheive additional performance on specific downstream tasks, namely dependency parsing, named entity recognition, and text generation.

#### Connection to Graph Neural Networks

### Machine Reasoning

#### Knowledge Representation

#### Reasoning Tasks

#### Knowledge Graphs

For this paper, the knowledge representation scheme that we are concerned with are **knowledge graphs**. As the name implies, these are graphical data models that collect a set of *entities*, as well as various relationships between them. For example, Google Search incorporates a knowledge graph of various entities from the results of web searches (e.g. President Barack Obama), which allows it to provide information about the entity without performing additional web crawls.

![](https://cdn.app.compendium.com/uploads/user/e7c690e8-6ff9-102a-ac6d-e4aebca50425/5ff89cbc-ea1e-4ab0-b646-877369cad553/File/99553b788b5a24eb03c3e35e6917c008/disease_symptom_healthcare_knowledge_graph.png)

<small> Source: Oracle </small>

Collaborative human approaches to knowledge graph constructions have existed as volunteer efforts, namely through [Wikidata]() and [Freebase](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.538.7139&rep=rep1&type=pdf). However, the limitations to human approaches are (by nature) their inability to automatically adapt to new raw text, as well as their reliance on humans, which are either costly or time intensive (or both).

### Information Extraction

#### Named Entity Recognition

#### Dependency Parsing

## Related Work

### Knowledge Graph Construction

#### [CoType](https://arxiv.org/pdf/1610.08763.pdf)
#### [COMET](https://arxiv.org/pdf/1906.05317.pdf)

### Knowledge Graph Tasks

#### [Knowledge Graph Inference](https://www.cs.cmu.edu/~mg1/thesis.pdf)
#### [GraphWriter](https://arxiv.org/pdf/1904.02342.pdf)

## Experimental Setup

The primary experiment for this paper is relying on knowledge graph representations to generate unstructured text (inspired by Koncel-Kedziorski et. al). The experiment procedure given source data $D$ is as follows:

1. Mine knowledge graph $G$ from an excerpt of $D$.
2. Generate text $D'$ from representation $G$.
3. Compute information loss using various distance metrics (e.g. perplexity from language model, average embedding difference, BLEU etc.)

This task, although ambitious, serves to lay the foundation for future research in relying on knowledge graphs to generate coherent and logically consistent text.

## Dependency-Based Prototype

#### SpaCy

It can often be a considerable engineering effort to develop an NLP workflow from scratch that is performant enough to work with large datasets. The open source Python package spaCy solves this issue by providing industry-strength and reproducible NLP workflows over a variety of NLP tasks. In this thesis, we use spaCy's dependency parsing and named entity extraction pipelines to leverage reproducible pipelines, as well as clear and helpful abstractions over such NLP tasks.

#### HuggingFace Transformers

Utilizing pre-trained models can often be a complicated task due to the large number of different language models, as well as their differing input formats. In particular, large-scale language models with billions of parameters can be unwieldly due to their sheer size, making it difficult to implement in Python without GPU acceleration. The HuggingFace Transformers open source Python package solves this by providing a general purpose Python architecture for working with Transformer models, as well as a model registry for fine-tuning existing language models. We leverage the HuggingFace Transformers package for generating text from BERT-based language models.

#### Implementation

In this prototype, we leverage Transformer neural network models (i.e. BERT-based fine-tuning) for named entity extraction and dependency parsing, which we use to generate nodes and edges, respectively, for the knowledge graph.

The core procedure (implemented in Python) is given as follows:

```python
for token in doc:
    if token.dep_ == "ROOT" and token.pos_ == "VERB":
        # root verb (event) extraction
        print(token.dep_, token.text, token.pos_)

        for argument in token.children:
            if argument.dep_ in {"csubj", "nsubj", "nsubjpass"} and argument.pos_ in {"PRON", "NOUN", "PROPN"}:
                # named entity extraction
                if argument.pos_ == "PRON" and argument._.in_coref:
                    print(argument.text, "=", argument._.coref_clusters[0].main.text)

                # subject extraction
                print(argument.dep_, argument.text, argument.pos_)

            if argument.dep_ in {"dobj", "obj", "iobj", "pobj"}:
                # object extraction
                print(argument.dep_, argument.text, argument.pos_)
```

This generates a graph $G = (V, E)$ which we are able to export into a useable format for downstream tasks. We also develop auxillary functions for querying and interacting with the knowledge graph.

#### Usage

After exporting the knowledge graph, we are able to load it into our open source knowledge graph browser, which is self-hostable for researchers. Below is a screenshot of extracted entities from raw text of various news articles:

![](https://i.imgur.com/oOnLa1G.png)

#### Representation

In order to provide the knowledge graph as an input to standard language models, we must first generate a string representation for the graph. The simplest way to do this is to perform a string concatenation between the various nodes and edge annotations, ensuring that nodes and edges appear close-by in the representation.

## Results

TBD

## Future Work

TBD

## Conclusion

TBD

## Bibliography
1. https://blog.google/products/search/introducing-knowledge-graph-things-not/
2. https://arxiv.org/pdf/1906.05317.pdf
3. https://arxiv.org/pdf/1610.08763.pdf
4. https://arxiv.org/pdf/1904.02342.pdf
5. https://www.cs.cmu.edu/~mg1/thesis.pdf