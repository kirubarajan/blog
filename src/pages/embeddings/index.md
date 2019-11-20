---
path: "/blog/embeddings"
date: "2019-11-18"
title: "A Gentle Introduction to Word Embeddings"
tags: ['machine learning', 'natural language processing']
excerpt: "Fun with Natural Language Processing's Secret Sauce"
---

# A Gentle Introduction to Word Embeddings
> Fun with Natural  Language Processing’s “Secret Sauce“

Computers don’t understand the nuances of language. It's because they only understand numbers and, as you can imagine, it’s impossible for us to enumerate every single nuance in understanding human language (let alone as numbers). But, we’ve seen a lot of progress in recent years of computers understanding language. So how do these work?  More specifically, how are these system representing words as *numbers*? 

In this post, we’re going to talk about one of the coolest advances in machine learning and natural language processing: *word embeddings*.

## Representation
So how do we represent one of the most basic units of natural language, **words**? If this is the first time you’ve thought about this, you might be tempted to say the appropriate data structure is obviously a string! However, this comes with some design considerations:

1. Your compiler doesn’t understand the contents of strings - it just recognizes the ASCII values that correspond to each symbol. This representation has room for improvement. Recognizing the word `cat` as being `[3, 1, 20]` is not very useful for capturing the *meaning of words*.
2. Strings can have a variable length. If we wanted to give a machine learning model a string, it might truncate (or artificially elongate) values for consistency’s sake and we would lose (or create useless) information.

For a long time, one of best approaches we could do was representing a word as an vector (or array) with all 0s that had 1 in the index corresponding to a specific word. This is called **one-hot encoding**. For example, in the vocabulary `{"I", "am", "a", "cat"}`, the word `I` would correspond to `[1, 0, 0, 0]`, the word `am` as `[0, 1, 0, 0]`, and so forth. We’ll see that word representation has shifted recent from one-hot encoding to something *better*.

### Better Representation
So what can we do about our representation problem? Surprise, surprise: we can turn to linguistics for the answer. Distributional semantics, in particular, holds the key:

> "You shall know a word by the company it keeps." - Firth (1957)

In essence, it makes sense to be defining words in relation to other words. Intuitively, this is easy to see; if I asked you to describe the word “avocado”, you would probably define it in terms of other words like “fruit” and “green” because the meanings of the word are *close*. This idea of word “closeness” gives rise to the notion of placing our words in some kind of space where we can measure their distance.

To be specific, this means these words exist in some *vector spaces* such as $\mathbb{R}^2$. This means every word can be thought as a vector, like with one-hot encoding! This may seem scary, but this is just because we want to mathematically determine the “closeness” between two words. We could define a one dimensional scalar value for each word (e.g. `{"cat": 1}`), but the nuances of language extend far beyond a single dimension. That’s why we place them in higher order dimensions - typically in the tens or hundreds. Our brains can’t really imagine dimensions higher than three, so for the sake of visualization we’ll work in two dimensions for now: the classic $x-y$ plane.

We’ll discuss how to obtain word vectors (hereby referred to as **word embeddings**) in just a little bit. For now, let’s imagine that in our vocabulary, we have the word `“cat”`. Furthermore, let’s imagine that we also have access to a word embedding fairy that gives us the *perfect* vector for each word. 

As such, she gives us the vector `[1, 4]` to represent the word **cat**.

## Word Embeddings
Why do we want to represent a three-letter word as a vector with potentially a vector of hundreds of values? In short, we want to create the embeddings such that the vectors **capture the meaning of a given word**. This can intuitively be visualized as the vectors for similar words being group together. For example, if the vector for `"cat"` is `[1, 4]`, the vector for `"kitten"` would be something like `[2, 4]` whereas the vector for `"dog"` would be close by, for example `[1, 5]`. 

Since words are now vectors, we are also able to perform linear algebra operations on the given language. Although it may feel weird to subtract `dog` from `cat`, it turns out performing such operations tends to be useful for a variety of tasks. For example, the cosine distance (which encodes similarity) between two vectors is a powerful function that is easily applied to tasks involving natural language. For word vectors $u$ and $v$, we can define cosine similarity as:

$$ 
\operatorname{cos}(u, v) = \frac{u \cdot v}{|u| \cdot |v|} = \frac{\sum_{i = 1}^{n} u_i v_i}{\sqrt{\sum_{i = 1}^{n} u^2_i} \cdot \sqrt{\sum_{i = 1}^{n} v^2_i}} 
$$

As a result, something interesting we can do is train our word embeddings to create **analogies**. For example, a classic example in the field is using word embeddings to see that  `"king" - "man" = "queen" - "woman"`.  We can even generalize this to fill-in-the-blanks for sentences like “Bill Gates is to Microsoft as `____` is to Apple” by predicting `"Steve Jobs"`. This prediction is relatively straightforward when you have good embeddings and can be computed as:

$$
d = \operatorname*{arg\, max}_{v \in V} ~ \operatorname{cos} (v, ~ a - b + c)
$$

where $s$ is our cosine similarity function from earlier. In the above example, we have that `a = "Bill Gates"`, `b = "Microsoft"`, `c = "Apple"`. Finally, this gives us `d = "Steve Jobs"`. 


### Why Are Word Embeddings "Secret Sauce"?
Analogy generation was a fun result that was discovered by researchers, but this isn't where the true potential of word emebddings lie. Although these ad-hoc analyses are interesting to think about, the real use of word embeddings is to serve as a semantically-aware representation of words for **other downstream tasks**. For example, providing word embeddings to a neural network that powers a chatbot will let it generate sentences that make more sense than if we represented words using a string-to-index mapping. 

The use of pre-trained word embeddings galvanized progress in natural language processing research since representation is often at the root of most machine learning problems. It's hard to think of mathematical grounding for this kind of phenomenon, but intuitively it's clear that better representation of language means that our neural networks can better understand semantics and therefore model language.

It seems like perfect word embeddings will end up being too specific  and are therefore good to be exist. These concerns are true thanks to the curse of dimensionality, but we can actually still approximate very powerful word embeddings that capture semantic meaning by training neural networks using stochastic gradient descent.

But, why neural networks? One previous method of word embedding generation was to perform dimensionality reduction on word co-occurrence matrices (which doesn’t involve deep learning). This procedure captures the intuition behind distributional semantics, but doesn’t have the powerful non-linearity capabilities of neural networks. However, it’s still useful to think about since certain methods of generation word embeddings draw upon this as reference.

But to be clear, I would actually like you to forget about pre-neural network methods, for now. It turns out that NLP can be implemented “from scratch“, i.e. purely through statistical and neural means. (You can read more about this from [Collobert et al.](https://arxiv.org/pdf/1103.0398v1.pdf)).

### How Do We Create Word Embeddings?

So you now know we can generate word embeddings using a neural network. But exactly **how** do we do that? A commonly used implementation to generate word embeddings is called `word2vec`, which is what we will use as reference in this guide. This model was conceptualized at Google around 5 years ago and has gone on to push the state of the art in natural language processing.

The `word2vec` model generates word embeddings through one of two related models. Both models are be trained using different objectives and as such, we can build two simple neural networks that performs the following tasks:

1. **Continuous Bag Of Word**: predicts a given missing word in a sentence/phrase based on context (faster but less specific)
2. **Skip Gram**: given a word, predicts the words that will co-appear near it (slower but works better for infrequent words)


If you notice, they are in essence the inverse of the other. This is good for our intuition of how `word2vec` works to generate word embeddings as both are really good examples of the *distributional hypothesis* from earlier!

A simple implementation of the above objectives would be logistic regression, which is nothing more than a fancy perceptron. You might be wondering: how do we get the word vectors from this process? Turns out what we're actually doing is making the network perform a **fake** that we training the network off of - we actually won’t use the model that’s trained. Instead, the goodies are encoded in the parameters of the neural network layers: the weights and biases of each neuron. The network’s internal representation of different words encodes the embeddings that we are looking for.

## Recent Applications
> TODO: finish this!

Word embeddings are an idea from as early as 2003. In the nearly two decades of this idea existing, there have a been a huge surge in its use. From powering virtually every NLP system at Google to inspiring a slew of new models, here are some recent use applications the ideas behind word embeddings:

### Reccomendation
Spotify, Airbnb, etc.

### Contextualization
BERT, etc.

## Code

### Pre-Trained Word Embeddings
Let’s use **pre-trained word embeddings** from Google (trained by reading through Google News). Using trusted pre-trained models will allow us to quickly play with word vectors as well as prototype with deep learning faster since such models already been worked well in practice.

We first want to run `pip install pymagnitude` to install the embedding format. Then we can download the pre-trained word2vec embeddings using some `wget` magic:

```bash
wget http://magnitude.plasticity.ai/word2vec/light/GoogleNews-vectors-negative300.magnitude
``` 

Finally, we can import the package and start writing queries:

```python
from pymagnitude import Magnitude
vectors = Magnitude("GoogleNews-vectors-negative300.magnitude")

print(vectors.distance("cat", "dog"))
```

There's a lot of great documentation for how you can query the vectories and gain interesting insights available at the GitHub repository for Magnitude [here](https://github.com/plasticityai/magnitude).


### Training Word Embeddings
Training word embeddings with a given dataset is easy using `gensim`, a Python package that abstracts the implementation of the `word2vec` neural network. This is one of the most commonly used Python package for generating word embeddings. 

```python
from gensim.models import Word2Vec
model = Word2Vec(sentences)

print(model)
```

### Extra: Visualizing Word Embeddings with t-SNE
It would be cool to visualize the word vectors. Sadly, we humans are mostly incapable of visualizing in the 300th dimension.

Instead, we can use a process called **dimensionality reduction** which will allow us to turn our 300 dimensions into regular 2D vectors that we can visualize. We will be using an algorithm called t-SNE (t-Distributed Stochastic Neighbouring Entities) to perform our dimensionality reduction from 300 dimensions to 2 dimensions.

You might be wondering how we can find a correspondance of vectors in $\mathbb{R}^{300}$ to vectors in $\mathbb{R}^2$. Why don't we just work with these 2D vectors in the first place? The truth is, these new embeddings (in 2D) actually do lose information. This seems obvious since we are going from a high dimensional space to a lower dimensional space. But more concretely, if we imagine an embedding space as being a distribution of points, we can measure the Kullback-Leiber Divergence of the original vectors and the transformed vectors:

$$
KL(p || q) = \sum_x {~ p(x) \cdot \operatorname{log} ~ \frac{p(x)}{q(x)}}
$$

This is a measure of how "different" two probability distributions are. As a result, minimizing the KL Divergence between the two distributions using gradient descent "learns" us new a representation of the original embeddings such that they preserve information. This is a very powerful result! It helps us build intuition on high-dimensional embeddings for otherwise blackbox systems.

This is a multi-core implementation of t-SNE available [here](https://github.com/DmitryUlyanov/Multicore-TSNE). In my usage, Sci-Kit Learn's implementation of the algorithm is much slower, especially when running on more powerful machines (e.g. Google Colab).

```python
from MulticoreTSNE import MulticoreTSNE as TSNE
from matplotlib import pyplot as plt

embeddings = TSNE(n_jobs=4).fit_transform(vectors)

vis_x = embeddings[:, 0]
vis_y = embeddings[:, 1]

plt.scatter(vis_x, vis_y, c=digits.target, cmap=plt.cm.get_cmap("jet", 10), marker='.')
plt.clim(-0.5, 9.5)

plt.show()
```

### Extra: Gensim Compatibility with Gensim
A lot of natural language processing might use the `gensim` package, which has a different API as the faster `pymagnitude` package we’ve been using. In order to interface with the `pymagnitude` model, we can write a wrapper class to use the same API as the `gensim` model:

```python
class Word2Vec:
	def __init__(self, vectors):
		self.vectors = vectors
		self.layer1_size = self.vectors.dim

	def __getitem__(self, word):
		return self.vectors.query(word)
	
	def __contains__(self, word):
		return word in self.vectors
	
	def dim(self):
		return self.vectors.dim 
```

Using this, we can wrap our magnitude model as follows:

```python
vectors = Magnitude('vectors.magnitude')
w2v = Word2Vec(vectors)
```

And we can access the vector exactly the same as we would with `gensim` as follows:

```python
cat_vector = w2v['cat']
```

This should resolve a lot of compatibility issues if you choose to leverage faster Magnitude embeddings with an existing Gensim codebase. 

## Epilogue: why am I writing about this?
I read about word embeddings sometime during my freshman year of university. I’m not really sure where I learned about it, but I found the idea really enchanting.

Word embeddings are a good introduction to neural networks as well as computational linguistics, and it’s what eventually introduced me to academia - which has made me a better developer and computer scientist. I decided to pay homage by writing this tutorial. I know lots of good resources about word embeddings exist already, but I wanted to help excite others to the wonders of NLP!