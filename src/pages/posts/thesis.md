---
path: "/blog/thesis"
date: "2021-03-16"
title: "My Undergraduate Thesis (In Progress)"
tags: ['machine learning', 'research']
excerpt: "Generating Declarative Knowledge From Transformers"
---

<div class="notification is-link">
  This post will be under construction until I graduate, and is subject to (probably a lot of) change. For any errata, feel free to reach out to me!
</div>

# My Undergraduate Thesis
> Generating Declarative Knowledge From Transformer Language Models

After (almost) 4 long years at the University of Pennsylvania, I'm finally a senior approaching my final few weeks as a student. Sentiments aside, this means that I'm also wrapping up a lot of the research on machine learning and natural language processing I've done during my time at Penn. For my program, this culminates in a senior thesis (on a topic of my choosing) during my final semester.

A single semester isn't typically enough time to make a significant contribution to the field, so I'm hoping to use this thesis as an opportunity to explore new areas of machine intelligence. I'm really excited to shift some of my focus from my previous research from generative models (i.e. language models) towards knowledge representation.

I'll be using this part of my website as a public workspace for my foray into **information extraction, knowledge graph construction, and machine reasoning**. This will probably include (but isn't limited to) code snippets, equations/derivations, background reading, literature review, and personal hot takes.

---

## Introduction

In recent years, there has been an explosion of data of various formats (e.g. video, text, sensor), which are not always immediately useful for completing tasks. An overarching goal in the field of machine intelligence is the problem of **knowledge representation**, a field dedicated to designing *efficient* representations of data that capture their respective data.

This problem is not just a question of information theory, but also relies on biological inspiration. When collecting new information, humans are able to make connections between related data, which enables not only efficient recall but also provides a framework for synthesizing new thoughts or beliefs. Providing such a framework for machines to perform such types of reasoning over previously given data is a goal for the field and, in turn, this paper.

The approach that this thesis is primarily interested in is the **knowledge graph** model, which models real life (or abstract) entities and their relationships as a graph $G = (V, E)$. Google aptly describes this approach as "things, not strings", referring to the notion that these graphs are often mined from pure language but contain a far more powerful semantic meaning.

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

The current state-of-the-art in various natural language processing tasks (particularly related to information extraction and text generation) are **transformer** models, which have been popularized by Vatswani et. al in 2017. These models are largely extensions of feed-forward neural networks, and mark a departure from the previous generation of language models that were variations of **recurrent neural networks**. Due to their feed-forward nature, transformer networks are highly parallelizable, and thereby making it feasible to train of vast quantities of language data. As a result, these models have achieved widespread state-of-the-art results on many tasks in natural language processing, often achieving human-level performance.

![](http://jalammar.github.io/images/t/transformer_resideual_layer_norm_3.png)

#### Architecture

TODO

#### Connection to Graph Neural Networks

Since the attention mechanism can be interpreted as a connected graph, with edged annotated with their various weights (or attention strenghths), transformer models are closely related to neural networks that operate over graphs, known as **graph neural networks**. In particular, a challenge in graph neural networks is the requirement that nodes are encoded in a representation that captures information about the local structure, namely to derive semantic value from a given node's neighbourhood. In transformer models, this same requirement is challenge as well, since the feed-forward nature of the neural network prohibits the model from learning the temporal ordering aspect of the input words. In transformer networks, this is solved by introducing a positional encoding (often a sinusoidal function) for each token, whose embeddings are an additional input to the multiple attention heads of the transformer model. Their connection to graph neural networks would suggest that transformers would be a natural choice for incorporating graphical data into a language setting.

### Language Models

We can use the chain rule in probability to break down a sequence (or sentence) of words into step-by-step calculations. For example, if we are considering the probability of the phrase "cat in the hat":

$$
P(\text{cat in the hat})
$$

We can break this value down into the product of the following terms (where $\text{<s>}$ denotes the starting token):

$$
P(\text{<s>})
\newline
P(\text{cat} ~|~ \text{<s>})
\newline 
P(\text{in} ~|~ \text{<s> cat}) 
\newline 
P(\text{the} ~|~ \text{<s> cat in}) 
\newline 
P(\text{hat} ~|~ \text{<s> cat in the}) 
$$

These probabilities are provided by a **language model**. In essence, a language model’s purpose is to provide $P(w ~|~ c)$, where $w$ is a particular target word (i.e. the next word) and $c$ is the context that precedes the target word. Using a trained model, we can use $P(w ~|~ c)$ to create a distribution of the likelihood for the next word. A common method to estimate this probbaility is using a neural network:

$$
P(w ~|~ c) = \operatorname*{softmax}(Wh_t + b)
$$

where $W$ represents a parameter matrix of the neural network weights, $h_t$ consists of a representation of the preceeding language (either the encoding of natural language string or the previous output of a neural network in the case of a recurrent architecture), and $b$ represents the bias of the prediction. The $\operatorname*{softmax}$ operation produces an distribution over possible outputs $i$ through the equation:

$$
\sigma(z)_i = \frac{e^{z_i}}{\sum_j{e^{z_j}}}
$$

Note that the output distribution is a valid probability distribution by the normalization of the denominator term, which allows the use of stochastic sampling for various applications (including text generation).

#### Text Generation

Now, we turn our focus to using these probabilities to **create** text. We first determine what the first word of our generation would be. Similar to the previous example, where we have a $\text{<s>}$ token to signify the beginning of a sequence, we can ask the model what the value of $P(w ~|~ \text{<s>})$ for a variety of different values of $w$.

More broadly, our goal is to select the words that maximize:

$$
\prod _{i = 0} ^{n} P(w_i ~ | ~ c_0 ~ ... ~ c_{i - 1})
$$

Note that we can model this problem as a graph with layers for each timestep *t* in the sentence comprised of nodes representing words that are fully connected to the nodes in the following layer. Thus, we can prove that this problem is equivalent to the **longest path problem**, which has been shown to be NP-complete. As such, generating text through deterministic combinatorial optimization is far too slow, both for real-world applications and for model training.

### Machine Reasoning

#### Knowledge Graphs

For this paper, the knowledge representation scheme that we are concerned with are **knowledge graphs**. As the name implies, these are graphical data models that collect a set of *entities*, as well as various relationships between them. For example, Google Search incorporates a knowledge graph of various entities from the results of web searches (e.g. President Barack Obama), which allows it to provide information about the entity without performing additional web crawls.

![](https://cdn.app.compendium.com/uploads/user/e7c690e8-6ff9-102a-ac6d-e4aebca50425/5ff89cbc-ea1e-4ab0-b646-877369cad553/File/99553b788b5a24eb03c3e35e6917c008/disease_symptom_healthcare_knowledge_graph.png)

<small> Source: Oracle </small>

Collaborative human approaches to knowledge graph constructions have existed as volunteer efforts, namely through [Wikidata]() and [Freebase](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.538.7139&rep=rep1&type=pdf). However, the limitations to human approaches are (by nature) their inability to automatically adapt to new raw text, as well as their reliance on humans, which are either costly or time intensive (or both).

#### Reasoning Tasks

TODO

### Information Extraction

#### Named Entity Recognition

TODO

#### Dependency Parsing

TODO

## Related Work

### Knowledge Extraction

#### [OpenIE](https://nlp.stanford.edu/pubs/2015angeli-openie.pdf)
##### Summary
TODO
##### Analysis
TODO

#### [Language Models as Knowledge Bases?](https://www.aclweb.org/anthology/D19-1250.pdf)
##### Summary
*Language Models as Knowledge Bases* is a paper written in 2019 by various researchers at Facebook AI Research (FAIR) and University College London. The paper is inspired by the notion that in the process of learning linguistic knowledge (i.e. language model training), models are possibly able to learn relational data as well, and that such relational data can be probed via cloze statements (or other fill-in-the-blank tasks). The goal of the paper is to explain that language models themselves contain relational data similar to how knowledge bases do, without the need for extensive manual annotating of a structured knowledge graph. The authors show this by evaluating the ability of BERT (without fine-tuning) to complete cloze tasks for factual data, as well as BERT's ability to perform question answering (QA) tasks. In the process, the authors develop a probe named *LAMA* (LAnguage Model Analysis), which is a set of subject-relation-object triples or question-answer pairs from various disparate sources.

##### Analysis
The intuition for the claims about language models made by the paper stem from the modern training process of large language models. In particular, the ability of modern language models to contain such linguistic and relational knowledge is two-fold. The first improvement that such models have to obtain excess factual knowledge than expected is due to the amount of training data used in the model training process. Since transformer language models do not have the bottle-necks in parallelization that recursive models do (e.g. recurrent neural networks), it is possible to train them on troves more data, which often include internet data containing a plethora of declarative/factual information such as Wikipedia. The second recent improvement in language modelling is sheer representational power, as transformer models have a representational capacity order of magnitudes larger than their predecessors, as it is common to see state-of-the-art models with billions of model parameters. The generation process itself may be a contributor to this, as language models tend to exihibit some sort of memorization when generating text, as well as information obfuscation or retrieval itself.

In addition, the method of information extraction put forth by the paper is particularly interesting to this research. Instead of producing declarative knowledge in a structured manner, the generative approach indirectly probes the model for answers via clever question/prompt formulation, relying on implicit knowledge representation peformed by the model that is hidden to observers. This is in contrast to a more direct approach of extracting knowledge, like the previous gold-standard information extraction approach of OpenIE.

The authors also note that certain types of factual knowledge are more easily acquired by language models than others. As a result, they argue that they are not measuring the average empirical performance of language models on this task, but are instead measuring a **lower bound** on the ability for language models to acquire knowledge.

### Knowledge Graph Tasks

#### [GraphWriter](https://arxiv.org/pdf/1904.02342.pdf)
##### Summary
*Text Generation from Knowledge Graphs with Graph Transformers* is a paper written in 2019 by researchers at the University of Washington, the University of Edinburgh, and the Allen Institute for Artificial Intelligence (AI2). The paper aims to improve the generational abilities of modern transformer language models by augmenting their knowledge abilities through declarative knowledge, in particular knowledge graphs. The paper introduces a novel graph encoding neural network architecture that is capable of understanding the relational structures that comprise knowledge graphs. This encoding architecture is then incorporated into an end-to-end trainable system that is capable of generating downstream text given a knowledge graph as input. The authors show that this architecture is superior than competing architectures through automatic evaluations (e.g. BLEU, METEOR), as well as human annotators agreeing that the produced text is more informative and captures more of the source information. In addition, the authors introduce the AGENDA (Abstract GENeration DAtaset) dataset as their encoder-decoder architecture is trained to generate scientific paper abstracts from their knowledge graph representations.

##### Analysis
TODO

#### [COMET](https://arxiv.org/pdf/1906.05317.pdf)
##### Summary
TODO
##### Analysis
TODO

## Dependency-Based Construction Task

### Experimental Design
Dataset: [CMU Book Summaries](http://www.cs.cmu.edu/~dbamman/booksummaries.html)

1. Extract knowledge graph using OpenIE.
2. Extract knowledge graph using NER + dependency parsing.
3. Compare extraction similarities.

### Pipeline Architecture

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

#### Representation

In order to provide the knowledge graph as an input to standard language models, we must first generate a string representation for the graph. The simplest way to do this is to perform a string concatenation between the various nodes and edge annotations, ensuring that nodes and edges appear close-by in the representation.

This notes a more ambitious, but less robust departure from GraphWriter, which relies on a graph neural network to process the given knowledge graph. 

#### Usage

After exporting the knowledge graph, we are able to load it into our open source knowledge graph browser, which is built in JavaScript and is self-hostable for researchers.

## Transformer-based Knowledge Graph Construction/Bootstrapping

### Experimental Design

#### Generative Construction Probe
Dataset: [CMU Book Summaries](http://www.cs.cmu.edu/~dbamman/booksummaries.html)

1. Extract knowledge graph using OpenIE + generative approach (OpenIE for subject and relation, generate object).
2. Compare accuracy/embedding similarity.

#### Knowledge Graph Reasoning Task
Dataset: [ATOMIC Dataset](https://homes.cs.washington.edu/~msap/atomic/)

1. Generate knowledge graph with NER + dependency parsing approach.
2. Feed knowledge graph representation to language model and evaluate on ATOMIC dataset.

TODO

### Results

TODO

### Comparison

TODO

## Future Work

TODO

## Conclusion

TODO

## Bibliography
1. https://blog.google/products/search/introducing-knowledge-graph-things-not/
2. https://arxiv.org/pdf/1906.05317.pdf
3. https://arxiv.org/pdf/1610.08763.pdf
4. https://arxiv.org/pdf/1904.02342.pdf
5. https://www.cs.cmu.edu/~mg1/thesis.pdf
6. https://www.aclweb.org/anthology/D19-1250.pdf