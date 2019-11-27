---
path: "/blog/ml_notes"
date: "2019-11-21"
title: "Machine Learning Concept Glossary"
tags: ['machine learning', 'natural language processing', 'notes']
excerpt: "Notes on Various Topics"
---

# Machine Learning Concept Glossary
> Notes on Various Machine Learning Topics

Getting started in machine learning sometimes feels like drinking water from a firehose (pardon my cliché). The topic has so many academic roots in a lot of different disciplines (bayesian statistics, optimization, and information theory - oh my!) so I decided to keep a personal footnote of various machine learning concepts (namely relating to neural networks and natural language processing) for my own benefit. These notes might not be complete or accurate - if you would like to see an idea to be written about here feel free to shoot me an email!

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
Autoencoders are models that consist of an encoder-model architecture where the encoder takes data and encodes it into a latent representation and the decoder takes a latent representation and re-generates the .

The goal is to learn latent representations (posterior inference over $z$), as well as learning  generation from latent spaces (marginal inference over $x$).

Autoencoders can be modelled using neural networks for both the encoder and decoder mechanisms. However, this can give us a lack of regularity in the latent space (i.e. non-continuous latent space) that makes generation hard for the decoder.

We solve this using a **variational autoencoder**, which is an autoencoder that we *regularize* training for, not only so that we don't overfit but mainly such that the latent space is suitable for generation. We do this by encoding the autoencoder's input as a probability distribution.

In order to train our VAE, we must use backpropogation to compute the gradient of ELBO. However, since the network's nodes represent a stochastic process, we instead model stochastic neurons as having parameters $\sigma$ and $\mu$ that allows us propogate errors meaningfully throughout the network. This is know as the **re-parameterization** trick. 

## Natural Language Processing

### Word Embeddings
Word Embeddings are vectors in some space $\mathbb{R}^{d}$ such that they encode lexical semantics. For example, the vectors of `cat` and `kitten` will have a small vector distance whereas the vectors of `cat` and `chair` will be far apart.

### Cosine Similarity
For vectors $u$ and $v$:

$$ 
\operatorname{cos}(u, v) = \frac{u \cdot v}{|u| \cdot |v|} = \frac{\sum_{i = 1}^{n} u_i v_i}{\sqrt{\sum_{i = 1}^{n} u^2_i} \cdot \sqrt{\sum_{i = 1}^{n} v^2_i}} 
$$

Where the range is $[0, 1]$ and we can define distance as the complement $1 - \operatorname{cos}(u, v)$.

## References
### Variational Inference
- https://arxiv.org/pdf/1601.00670.pdf