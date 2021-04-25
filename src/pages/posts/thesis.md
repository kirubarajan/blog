---
path: "/blog/thesis"
date: "2021-03-16"
title: "My Undergraduate Thesis (In Progress)"
tags: ['machine learning', 'research']
excerpt: "Extracting Knowledge From Transformer Language Models"
---

<div class="notification is-link">
  This post will be under construction until I graduate, and is subject to (probably a lot of) change. For any errata, feel free to reach out to me!
</div>

# My Undergraduate Thesis
> Extracting Knowledge From Transformer Language Models

After (almost) 4 long years at the University of Pennsylvania, I'm finally a senior approaching my final few weeks as a student. Sentiments aside, this means that I'm also wrapping up a lot of the research on machine learning and natural language processing I've done during my time at Penn. For my program, this culminates in a senior thesis (on a topic of my choosing) during my final semester.

A single semester isn't typically enough time to make a significant contribution to the field, so I'm hoping to use this thesis as an opportunity to explore new areas of machine intelligence. I'm really excited to shift some of my focus from my previous research from generative models (i.e. language models) towards knowledge representation.

I'll be using this part of my website as a public workspace for my foray into **information extraction, knowledge graph construction, and machine reasoning**. This will probably include (but isn't limited to) code snippets, equations/derivations, background reading, literature review, and personal hot takes.

---

## Introduction

In recent years, there has been an explosion of data of various formats (e.g. video, text, sensor), which are not always immediately useful for completing tasks. An overarching goal in the field of machine intelligence is the problem of **knowledge representation**, a field dedicated to designing *efficient* representations of data that capture their respective data.

This problem is not just a question of information theory, but also relies on biological inspiration. When collecting new information, humans are able to make connections between related data, which enables not only efficient recall but also provides a framework for synthesizing new thoughts or beliefs. Providing such a framework for machines to perform such types of reasoning over previously given data is a goal for the field and, in turn, this paper.

The approach that this paper is primarily interested in is the **knowledge graph** model, which models real life (or abstract) entities and their relationships as a graph $G = (V, E)$. Google aptly describes this approach as "things, not strings", referring to the notion that these graphs are often mined from pure language but contain a far more powerful semantic meaning.

In this paper, we explore various knowledge graph construction methods, both from their theoretical merits, as well as their empirical performance provided real natural language data as source material. We also aim to provide an unopinionated framework for expressing declarative knowledge over mined knowledge graphs to aid in logical reasoning. In addition, an engineering goal for this thesis is to make such knowledge graphs accessible to the general public, by offering an open source front-end application that is self-hostable for researchers.

## Background

### Machine Learning

In recent years, researchers have made incredible progress towards the goal of artificial intelligence through the field of machine learning. For tasks that cannot be completed with imperative rules (e.g. image classification, text generation), traditional algorithms and software fail to produce adequate results. Machine learning serves to remedy this by automatically extracting such patterns and rules from data, and applying them at algorithm runtime to make decisions.

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
<small> Source: Jay Allamar </small>

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

For this paper, the knowledge representation scheme that we are concerned with are **knowledge graphs**. As the name implies, these are graphical data models that collect a set of *entities*, as well as various relationships between them. The set of entities forms the nodes for the knowledge graph and their relations form the set of annotated edges. For example, Google Search incorporates a knowledge graph of various entities from the results of web searches (e.g. President Barack Obama), which allows it to provide information about the entity without performing additional web crawls.

![](https://cdn.app.compendium.com/uploads/user/e7c690e8-6ff9-102a-ac6d-e4aebca50425/5ff89cbc-ea1e-4ab0-b646-877369cad553/File/99553b788b5a24eb03c3e35e6917c008/disease_symptom_healthcare_knowledge_graph.png)

<small> Source: Oracle </small>

For many years, knowledge bases were only developed through human annotation. Collaborative human approaches to knowledge graph constructions have existed as volunteer efforts, namely through [Wikidata]() and [Freebase](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.538.7139&rep=rep1&type=pdf). The limitations to human approaches are (by nature) their inability to automatically adapt to new raw text, as well as their reliance on humans, which are either costly or time intensive (or both). 

A long-standing goal of artificial intelligence is knowledge graph construction, where such a graph represents a variety of high-precision knowledge on a variety of concepts that rivals human performance. As such, a variety of research has been conducted on novel methods of constructing knowledge graphs, ranging from a pure information extraction approach (e.g. OpenIE) to generative approaches (e.g. COMET). In this paper, both approaches will be examined, and we also present evidence that pre-trained Transformer models share some semantics with their OpenIE counterparts.

#### Reasoning Tasks

Using knowledge graphs as intermediary knowledge representation for reasoning tasks can serve to be a more efficient manner than analyzing raw text, since a single-pass of logical inference over the knowledge can be performed in $O(|V| + |E|)$ time and space, where $V$ contains the entities of the represented knowledge and $E$ contains the annotated relations between them.

### Information Extraction

#### Named Entity Recognition

TODO

#### Dependency Parsing

TODO

## Related Work

### Knowledge Extraction

#### [Neural Open Information Extraction](https://arxiv.org/pdf/1805.04270.pdf)
##### Summary
*Neural Open Information Extraction* is a paper written by researchers at Microsoft Research Asia in 2018 regarding improving Open Information Extraction (OpenIE). OpenIE is a natural language processing task of extracting a structured representation of knowledge in text. Typically, the extracted information is in the form of a knowledge tuple of the form (subject, relation, object), or another $n$-ary logical proposition. These knowledge tuples can be used for downstream tasks such as question answering (QA), knowledge graph construction, or natural language understanding (NLU). Since traditional OpenIE engines depend on hand-designed schemas, the approach outlined by the paper instead highly confident arguments and relationship tuples bootstrapped from a state-of-the-art OpenIE system, a similar method to Bosselut et al. The authors develop a novel neural network architecture that is able to generate knowledge tuples, rivalling the predictive performance of traditional OpenIE systems, while still maintaining computational efficency.

##### Analysis
The Neural Open Information Extraction system is based on an encoder-decoder neural network architecture, often known as Seq2Seq in the NLP field due to its objective of accepting a sequence as an input and producing a sequence as output. Since these architectures can be trained end-to-end, it also serves to produce an intermediary input representation, often as an embedding of the input sequence. This also has the added benefit of the architecture not needing to rely on hand-crafted patterns, and removing error propagation through the extracted knowledge. In particular, given input word sequence $X = (x_1, x_2, ..., x_m)$ and knowledge tuple sequence $Y = (y_1, y_2, ..., y_n)$, the neural network predicts the conditional distribution $P(Y | X)$ through the chain-rule decomposition:

$$
P(Y | X) = P(Y ~|~ x_1, x_2 ..., x_m)
= \prod _{i = 0} ^{n} P(y_i ~ | ~ y_0 ~ ... ~ y_{i - 1} ~ ; ~ x_0 ~ ... ~ x_n)
$$

Although OpenIE is able to capture structured information in a consistent manner, it is ill-suited to higher level reasoning. For example, if an entity is extracted and known "to be an adult", OpenIE will not represent the fact that the entity is not "known to be a child". This is by definition, since OpenIE is extractive, and thereby only captures knowledge that is explicilty represented in the text. Other papers related to using neural networks for knowledge graph construction serve to remedy this problem, and often rely on OpenIE as an extractive baseline.

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

Broadly, this paper is an advancement of the "concept-to-text" model of generation. One powerful result of this paper is showing that it is possible to provide neural language models with the context necessary for generating longer text that still maintains the logical integrity of the provided declarative knowledge. The AGENDA dataset also serves as a good evaluation benchmark for this task due to its generation domain of scientific abstracts since it contains 40,000 examples which all provide clear and consistent text with a heavy emphasis on declarative facts and knowledge. The strong performance on this benchmark may be an artifact of the domain itself, and further research could be conducted to show whether this task is feasible on more free-formed or longer text, such as narrative writing with summarizations.

The GraphWriter architecture introduced in the paper, which includes a graph transformer neural network, is a highly performant and task-dependent approach to encoding graphical data for use in a neural language model. It is worth noting that decoding strategy used in the paper differs from "pure generation" that other papers use (i.e. directly from the model's vocabulary) as the decoding process will additionally sample from the entities contained in the knowledge graph's set of labelled nodes. In particular, the architecture incorporates the two next-token distributions of sampling from the vocabulary (denoted $\text{vocab})$ or copying the text from a sample over the entities (denoted $\text{copy}$). This final probability is calculated as:

$$
p * \alpha^\text{copy} + (1 - p) * \alpha^\text{vocab}
$$

Possibly the most important advance in the paper is its attention to information flow. An interesting implementation detail is the inclusion of a "global vertex", which is connected to all other vertices in the knowledge graph. The goal of this vertex is to introduce less restricted information flow between all vertices, presumably due to it being otherwise difficult to provide an adequete initialization sequence. Although the paper's novel architecture bears a strong resemblance to the Graph Attention Network (GAT) paper (Velickovic et al. 2018), which uses self-attention over a node's neighbourhood to compute a hidden representation, there exist architecture differences regarding the attention mechanism's use towards incorporating declarative knowledge. These changes related to information flow provide a statistically significant performance increase on the AGENDA task.


#### [COMET](https://arxiv.org/pdf/1906.05317.pdf)
##### Summary
*COMET: Commensense Transformers for Automatic Knowledge Graph Construction* is a paper published by researchers at the Allen Institute for Artificial Intelligence (AI2), the University of Washington, and Microsoft Research in 2019. The paper is primarily concerned with progressing standards in knowledge graph construction, particularly making a paradigm shift from knowledge graph construction as an information task towards a generative task, moving away from the structured schemas of traditional knowledge bases. The paper is also primarily concerned with **commonsense knowledge**, as opposed to the traditional knowledge graph approach of representing domain-specific information about a particular narrative. In doing this, the authors propose a novel transformer architecture named COMET, which is able to augment an existing knowledge graph by generating commonsense descriptions for entities in natural language. The architecture also approaches human performance on the evaluation dataset of ATOMIC and ConceptNet (existing declarative knowledge datasets). As a result, the findings of this paper would indicate that generative models for commonsense may be a path forward to developing knowledge graphs.

This paper introduces a promising alternative to information extraction through the lens of generative modelling of language. In particular, the crux of the paper lies in the reduction of commonsense acquisition to knowledge base construction. Since previous work on large language models have shown that transformers are able to be useful in tasks related to declarative knowledge, this paper is able to rely on such findings to utilize such models for knowledge graph generation. An interesting caveat is that traditional knowledge graph construction is primarily concerned with representing over a well-defined space of entities and relations that can be directly modelled. In contrast, commensense knowledge is a reasoning task over an ill-defined space of possible entities and relations, and over an unrestricted vocabulary. As a result, it poses a considerably different problem than the tasks that transformers have been known to excel at (i.e. fine-tuning over a defined task space). However, this problem is arguably more well suited to transformers than traditional OpenIE approaches since contextualized language models are able to represent implicit knowledge, whereas extractive methods only consider knowledge that by definition is explicit.

##### Analysis
The COMET architecture is a performant framework for constructing commonsense knowledge graphs. COMET first relies on a seed set of knowledge tuples of the form $\{s, r, o\}$, where $s$ is the subject of the knowledge tuple, $r$ is the relation of the tuple, and $o$ is the object of the phrase. This seed set of knowledge is represented by concatenating the tokens of each part of the tuple into a single tensor:

$$
X = \{X^s, X^r, X^o\}
$$

COMET is then trained end-to-end to predict $X^o$ given  $\{X^s, X^o\}$ using the conditional loglikelihood loss function:

$$
L = - \sum^{|s| + |r| + |o|} _{t = |s| + |r|} \operatorname*{log} P(x_t | x_{< t})
$$

In addition, due to the lack of positional knowledge in transformer networks, each word representation $e_t$ is summed with a positional encoding for the position $t$ of the word:

$$
h_t = e_t + p_t
$$

The performance of this representation may suggest that locational information about knowledge may be of importance, since a similar notion of neighbourhood encoding is often a prevalent feature of graph neural networks and even convolutional neural networks (i.e. receptive fields). It may also be loosely related to the notion of contextualization in language models, where consideration of the positional structure of certain semantic entities is able to provide additional representation power.

Given the generation nature of the task of generating natural language descriptions of commonsense descriptions, the paper uses BLEU-2 as an evaluation metric. BLEU (Bilingual Evaluation Understudy) measures the quality of a text given a reference baseline using a modified form of precision between $n$-grams, originally used for machine translation. In the case of COMET, the reference text is the original knowledge tuple's object, which is often represented using natural language text as opposed to a direct enumerable entity. The authors also verify the automatic evaluation methods of both BLEU and perplexity using human annotation (e.g. Mechanical Turk), by asking annotators whether the model's generation consitutes a plausible knowledge tuple. The authors found the evaluations to outperform not only the baselines, but also the state-of-the-art architectures on the same task by a 51% relative performance increase (with statistical significance).

The paradigm shift from knowledge graph construction from an information extraction task to a text generation task serves as inspiration for this paper. In particular, we leverage transformer models to generate knowledge graphs using a process similar to OpenIE, as well as further analysis into the performance of text generation using existing knowledge tuples.

![](https://i.imgur.com/LN9NaNp.png)

<small> An example generated knowledge graph from ATOMIC's seed knowledge tuples. </small>

## Dependency-Based Construction Task

### Experimental Design
Dataset: [CMU Book Summaries](http://www.cs.cmu.edu/~dbamman/booksummaries.html)

1. Extract knowledge graph using OpenIE.
2. Extract knowledge graph using NER + dependency parsing.
3. Compare extraction similarities.

### Pipeline Architecture

#### SpaCy

It is often be a considerable engineering effort to develop an NLP workflow from scratch that is performant enough to work with large datasets. The open source Python package spaCy solves this issue by providing industry-strength and reproducible NLP workflows over a variety of NLP tasks. In this paper, we use spaCy's dependency parsing and named entity extraction pipelines to leverage reproducible pipelines, as well as clear and helpful abstractions over such NLP tasks.

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