---
path: "/blog/ml_notes"
date: "2019-11-21"
title: "Machine Learning Concepts"
tags: ['machine learning', 'notes']
excerpt: "My Notes on Various Topics"
---

# Machine Learning Concepts
> My Notes on Various Machine Learning Topics

Getting started in machine learning sometimes feels like drinking water from a firehose (pardon my cliché). The topic has so many academic roots in a lot of different disciplines (bayesian statistics, optimization, and information theory - oh my!) so I decided to keep a personal glossary of various machine learning concepts (namely relating to neural networks and natural language processing) for my own benefit. These notes might not be complete or accurate - if you would like to see an idea to be written about here feel free to shoot me an email!

## Variational Inference
Variational Inference consists of framing inference as an optimization process. For example when we are working with an intractable probability distribution $p$, variational inference has significant gains over Markov-Chain Monte-Carlo estimation. 

For data $x$ and latent variable $z$, we have:
1. Prior: $p(z)$
2. Likelihood: $p(x | z)$
3. Posterior: $p(z | x)$

As a result, we approximate the conditional density of latent variables given observed variables by using optimization methods. For a distribution $p$, we can approximate it with our own distribution $q$ such that we minimize the KL-Divergence between the two distributions:

$$
KL(q || p) = \sum_x {~ q(x) \cdot \operatorname{log} ~ \frac{q(x)}{p(x)}}
$$

### Evidence Lower Bound
We can re-write the KL-Divergence between $q$ and $p(z | x)$ as:

$$
KL[q(z) ~||~ p(z | x)] = \mathop{\mathbb{E}}~[\operatorname{log} q(z)] - \mathop{\mathbb{E}}~[\operatorname{log} p(z | x)]
$$

Then, we can expand the conditional term (and apply the logarithm identities) to get:

$$ 
KL[q(z) ~||~ p(z | x)] = \mathop{\mathbb{E}}~[\operatorname{log} q(z)] - \mathop{\mathbb{E}}~[\operatorname{log} p(z, x)] + \operatorname{log} p(x)
$$

The $\operatorname{log} p(x)$ term makes computing the KL-Divergence intractable, since we assumed $p(x)$ to be intractable. However, we can give a lower bound on this quantity since the KL-Divergence is always at least 0:

$$
\operatorname{log} p(x) \geq  \mathop{\mathbb{E}}~[\operatorname{log} p(z, x)] - \mathop{\mathbb{E}}~[\operatorname{log} q(z)]
$$

We define the L.H.S to be **ELBO**: evidence lower bound. This is equivalent to the negative KL-Divergence plus $\operatorname{log} p(x)$. The nice thing about this is that $\operatorname{log} p(x)$ is a constant with respect to distribution $q$, so we can **minimize the KL-Divergence by maximizing ELBO**, without calculating $p(x)$.

### Variational Autoencoder
Autoencoders are models that consist of an encoder-model architecture where the encoder takes data and encodes it into a latent representation and the decoder takes a latent representation and approximates/re-generates the original data. The goal is to learn latent representations (posterior inference over $z$), as well as learn generation from latent spaces (marginal inference over $x$).

Autoencoders can be modelled using neural networks for both the encoder and decoder mechanisms. However, this can give us a lack of regularity in the latent space (i.e. non-continuous latent space) that makes generation hard for the decoder. We solve this using a **variational autoencoder**, which is an autoencoder that we *regularize* training for, not only so that we don't overfit but mainly so that the latent space is suitable for generation. We do this by encoding the autoencoder's input as a probability distribution.

In order to train our VAE, we must use backpropogation to compute the gradient of ELBO. However, since the network's nodes represent a stochastic process, we instead model stochastic neurons as having parameters $\sigma$ and $\mu$ that allows us propogate errors meaningfully throughout the network. This is know as the **re-parameterization** trick. 

## Natural Language Processing

### N-Gram Language Models
The **Maximum Likelihood Estimation** for an n-gram can be given by the formula:

$$
P(w_t | w_{t - 1}) = \frac{c(w_{t - 1}, w_t)}{c(w_{t - 1})}
$$ 

where $c(w)$ is the frequency of $w$ in the corpus. Sequence generation can be performed by sampling from this distribution.

**Perplexity** is an intrinsic evaluation method for language models that captures information about the entropy within the test set. Perplexity for a given test can can be computed as:

$$
PP(W) = P(w_1, w_2, ... w_n)^{-\frac{1}{n}} = \sqrt[n]{\frac{1}{\Pi_{i = 1}^n P(w_i|w_1, w_2 ... w_{i - 1})}}
$$

This estimate can be approximated using the *Markov Assumption* (for a bi-gram model):

$$
PP(W) = \sqrt[n]{\frac{1}{\Pi_{i = 1}^n P(w_i|w_{i - 1})}}
$$

Perplexity can be thought of as the weighted average branching factor of a language, and generally lower perplexity is better. 

### Word Embeddings
Word Embeddings are vectors in some space $\mathbb{R}^{d}$ such that they encode lexical semantics. For example, the vectors of `cat` and `kitten` will have a small vector distance whereas the vectors of `cat` and `chair` will be far apart.

### Cosine Similarity
For vectors $u$ and $v$:

$$ 
\operatorname{cos}(u, v) = \frac{u \cdot v}{|u| \cdot |v|} = \frac{\sum_{i = 1}^{n} u_i v_i}{\sqrt{\sum_{i = 1}^{n} u^2_i} \cdot \sqrt{\sum_{i = 1}^{n} v^2_i}} 
$$

Where the range is $[0, 1]$ and we can define distance as the complement $1 - \operatorname{cos}(u, v)$.

## Deep Learning
### Recurrent Neural Networks
Recurrent Neural Networks are like vanilla feed-forward networks, except they contain *cycles*, which allow the network to process sequential data. RNNs do this by mantaining a hidden state $h \in \mathbb{R}^{d}$ that is updated at time-step $t$, and is later fed back into the network along with the network's previous output at time-step $t + 1$. The hidden state $h$ lets the network maintain context while processing the sequence. 

Sometimes too much context can be a burden for the network, and results in the **vanishing gradient** problem where errors are propogated too far and tend to zero. This problem is resolved with models that manage context better, namely selectively remembering and forgetting parts of the context. Examples of these models are LSTMs (Long Short Term Memory) and GRUs (Gated Recurrent Units).

### Attention
Given some peice of text, certain words are more important than others and we want our neural network to understand their relative importances accordingly.

## Markov Processes
Markov Processes are systems that are rooted in the **Markov Assumption** which states that given sequential events $X_{n - 1}$, $X_{n - 2}$, ... $X_0$, we have that:

$$
P(X_n | X_{n - 1}, X_{n  - 2} ... X_0) = P(X_n | X_{n - 1})
$$

In other words, our process only depends on the previous state and is **memory-less**.

### Markov Matrices
A Markov Matrix $A$ is a stochastic matrix, which means that the columns of $A$ are probability vectors that model some distribution. In other words, the columns of $A$ sum to 1 and obey the axiom of probability that each entry is non-negative. The reason that these stochastic matrices are called Markov Matrices is because $A$ doesn't change with respect to time. In other words, we have that at time $t$, the probability distribution (across the states represented by the vector) is $A^tu_0$ where $u_0$ is the distribution at time $0$. This is nice because we can easily compute the exponentiation of matrices using diagonalization. 

The steady state distribution $u_\infty$ of $A$ is the distribution of $A^tu_0$ as $t$ tends to $\infty$. This means that $Au_\infty = u_\infty$, which implies that $u_\infty$ is an eigenvector of $A$ that corresponds to an eigenvalue of 1. In fact, the largest eigenvalue $\lambda$ that $A$ can have is 1.

### Perron-Frobenius Theorem
Let $A$ be a square matrix with all non-negative values, with an eigenvalue $\lambda$ such that $|\lambda|$ is maximized. Then, 1) we have that $|\lambda|$ is an eigenvalue of $A$ with a positive eigenvector and 2) the algebric and geometric multiplicity of $|\lambda|$ is 1.

### Spectral Theorem
Let $A$ be a real, symmetric matrix such that $A^T = A$. Then, we have that 1) all the eigenvalues of $A$ are real and 2) there exists an orthonormal basis of eigenvectors for $A$.

-----

## References
### Variational Inference
1. https://arxiv.org/pdf/1601.00670.pdf
2. https://web.stanford.edu/~jurafsky/slp3/
3. https://people.scs.carleton.ca/~maheshwa/courses/3801/Projects17/PF-thm-report.pdf