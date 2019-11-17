---
path: "/embeddings"
date: "2019-11-16"
title: "A Gentle Introduction to Word Embeddings"
tags: ['machine learning', 'natural language processing']
excerpt: "Fun with Natural Language Processing's Secret Sauce"
---

# A Gentle Introduction to Word Embeddings
## Fun with Natural  Language Processing’s “Secret Sauce“

Computers don’t understand the nuances of language. It’s because they only understand numbers and, as you can imagine, it’s impossible for us to enumerate every single nuance in understanding human language (let alone as numbers). But, we’ve seen a lot of progress in recent years of computers understanding language. So how do these work?  More specifically, how are these system representing words as *numbers*? 

In this post, we’re going to talk about one of the biggest advances in natural language processing: *word embeddings*.

## Representation
So how do we represent one of the most basic units of natural language, **words**? If this is the first time you’ve thought about this, you might be tempted to say the appropriate data structure is obviously a string! However, this comes with some design considerations:

1. Your compiler doesn’t understand the contents of the string - it just recognizes the ASCII values that correspond to each letter. This representation is as useful to us as recognizing the word `cat` as being `[3, 1, 20]` - not very useful.
2. Strings can have a variable length. If we wanted to give a machine learning model a string, it might truncate the ending values for consistency’s sake and we would lose important information.

For a long time, one of best approaches we could do was representing a word as an array with all 0s that had 1 in the index corresponding to a specific word. For example, in the vocabulary `{"I", "am", "a", "cat"}`, the word `"I"` would correspond to `[1, 0, 0, 0]`, the word `"am"` as `[0, 1, 0, 0]`, and so forth. 

### Better Representation
So what can we do? Turns out, distributional semantics holds the key:
> You shall know a word by the company it keeps [[Firth, J. R. 1957:11](#)]

In essence, we should be defining words in relation to other words. Intuitively, this makes sense. If I asked you to describe the word “avocado”, you would probably define it in terms of other words like “fruit” and “green”. 

This idea of word similarity gives rise to the notion of placing our words in *vector spaces*. This may seem scary, but in essence want to mathematically determine the “closeness” between two words. We could define a one dimensional scalar value named `distance` that tracks this, but the nuances of language extend far beyond a single dimension. That’s why we place them in higher order dimensions - typically in the tens or hundreds. Our brains can’t really imagine dimensions higher than three, so for the sake of visualization we’ll work in two dimensions for now: the classic x-y plane.

Imagine we have the string `“cat”`. Let’s say we have a perfect word embedding fairy that gives us the vector `[1, 4]` to represent the word **cat**.

## Word Embeddings
Why do we want to represent a three-letter word as a vector with potentially a vector of hundreds of values? In short, we want to create the embeddings such that the vectors **capture the meaning of a given word**. This can intuitively be visualized as the vectors for similar words being group together. For example, if the vector for `"cat"` is `[1, 4]`, the vector for `"kitten"` would be something like `[2, 4]` whereas the vector for `"dog"` would be close by, for example `[1, 5]`. 

Since words are now vectors, we are also able to perform linear algebra operations on the given language. Although it may feel weird to subtract `dog` from `cat`, it turns out performing such operations tends to be useful for a variety of tasks. Calculating the cosine distance (which encodes similarity) between two words is a powerful feature that makes tasks involving natural language a lot easier. For word vectors $A$ and $B$, we can define cosine similarity as:

$$
\frac{\sum_{i = 1}^{n} A_i B_i}{\sqrt{\sum_{i = 1}^{n} A^2_i}\sqrt{\sum_{i = 1}^{n} B^2_i}}
$$

As a result, something interesting we can do is train our word embeddings to create analogies. For example, a classic example in the field is using word embeddings to see that  `"king" - "man" = "queen" - "woman"`.  We can even generalize this to fill-in-the-blanks for sentences like “Bill Gates is to Microsoft as Steve Jobs is to `_______`” by predicting `"Apple"`.

While these ad-hoc analyses are interesting to think about, the real use of word embeddings is to provide computers a semantically-aware representation of words. This is done by providing the word embeddings as *features* to a neural network that performs other “downstream“ tasks. For example, providing word embeddings to a neural network that powers a chatbot will let it generate sentences that make more sense than if we represented words using a string-to-index mapping.

### How Do We Create Word Embeddings?
It seems like perfect word embeddings are too specific and are therefore good to be true. However, we can actually create very powerful word embeddings that capture a lot of semantic meaning using neural networks. Why neural networks? As we’ll see, one previous method of word embedding generation was to perform dimensionality reduction on word co-occurrence matrices (which doesn’t involve deep learning). This procedure captures the intuition behind distributional semantics, but doesn’t have the powerful non-linearity capabilities of neural networks. However, it’s still useful to think about since certain methods of generation word embeddings draw upon this as reference.

However, I would actually like you to forget about pre-neural network methods, for now. It turns out that NLP can be implemented “from scratch“, i.e. purely through statistical and neural means.

A commonly used implementation to generate word embeddings is `word2vec`, which is what we will use as reference in this guide.`word2vec` generates word embeddings through one of two related models. Both models are be trained using different objectives and as such, we can build two simple neural networks that performs the following tasks:

1. **Continuous Bag Of Word**: predicts a given missing word in a sentence/phrase based on context (faster but less specific)
2. **Skip Gram**: given a word, predicts the words that will co-appear near it (slower but works better for infrequent words)

If you notice, they are in essence the inverse of the other. This is good for our intuition of how `word2vec` works to generate word embeddings as both are really good examples of the *distributional hypothesis* from earlier!

You might be wondering: how do we get the word vectors from this process? Turns out the task we’re making the neural network do is a *fake task* that we training the network off of - we actually won’t use the model that’s trained. Instead, the goodies are encoded in the parameters of the neural network layers: the weights and biases of each neuron.

### Implementation
Training word embeddings with a given dataset is easy using `gensim`, a Python package that abstracts the implementation of the `word2vec` neural network. This is the most commonly used Python package for generating word embeddings. 

Some example code:
> todo

## Using Word Embeddings
Let’s use **pre-trained word embeddings** from Google (trained by reading through Google News). Using trusted pre-trained models will allow us to quickly play with word vectors as well as prototype with deep learning faster since such models already been worked well in practice.

> todo 

### Extra: Visualizing Word Embeddings
It would be cool to visualize the word vectors. Sadly, we humans are mostly incapable of visualizing in the 300th dimension.

Instead, we can use a process called **dimensionality reduction** which will allow us to turn our 300 dimensions into regular 2D vectors (without losing too much information) that we can visualize.

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

## Epilogue: why do I think this is cool?
I first read about word embeddings sometime during my freshman year of university. I’m not really sure where/how I learned about it, but I found the idea really enchanting and I was hooked every since.

Word embeddings are a good introduction to neural networks as well as computational linguistics, and it’s what eventually put me on a path through machine learning academia - which has made me a better developer and computer scientist. I decided to pay homage by writing this tutorial. I know lots of good resources about word embeddings exist already, but I wanted to help introduce other burgeoning computer scientists to the wonders of NLP!