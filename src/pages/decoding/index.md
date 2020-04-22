---
path: "/blog/decoding"
date: "2020-04-17"
title: "Decoding Strategies for Text Generation"
tags: ['machine learning']
excerpt: "An Overview of How To *Use* A Trained Language-Model"
---

<div class="notification  is-danger">
Disclaimer: this post is still being written - check back soon for updates!
</div>
<div class="notification is-link">
  There is accompanying code for this blog post, if you would like to re-create the results - check out the <a href="https://github.com/kirubarajan/language_modelling">repository here</a>!
</div>

# Decoding Strategies for Text Generation
> Finding the Humanity in Approximating an NP-Hard Problem

## Introduction
Recently, machine learning models have seen incredible progress towards computers being able to generate text that sounds human. This is an area of research that involves both furthering our understanding of machine intelligence as well as language usage. I think it’s an interesting problem because it once against prompts a long-standing question in machine intelligence: what does it mean to be human?

So how do we make computers sound human? In particular, let’s look at the different ways we can do this once we have a special kind of trained machine learning model known as a **language model**. In its simplest sense, a language model assigns a probability to a sequence of words. As you can imagine, language is infinite and so we can’t possibly know the probability of the phrase “cat in the hat”. However, our machine learning model (by definition) is going to **approximate** this likelihood for us. And, as it turns out, this is a powerful technique that works incredibly well for practical purposes.

### Our Objective

We can use the chain rule in probability to break down a sequence (or sentence) of words into step-by-step calculations. Let's say we are looking for the probability of the phrase "cat in the hat":

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

But how do we get these probabilities to start? That's what the **language model** is for. In essence, a language model’s purpose is to give us $P(w ~|~ c)$, where $w$ is a particular target word (i.e. the next word) and $c$ is the context that precedes the target word. Using a trained model, we can use $P(w ~|~ c)$ to create a distribution of the likelihood for the next word.

Now, we turn our focus to using these probabilities to **create** text. Let's determine what the first word of our generation would be. Similar to the previous example, where we have a $\text{<s>}$ token to signify the beginning of a sequence, we can ask the model what the value of $P(w ~|~ \text{<s>})$ for a variety of different values of $w$. But how do we select what $w$ should be when we're given the probabilities for every possible word? Is it simply the highest value?

More broadly, our goal is to select the words that maximize:

$$
\prod _{i = 0} ^{n} P(w_i ~ | ~ c_0 ~ ... ~ c_{i - 1})
$$

But how do we do this using the model's outputted probabilities? As we will see, this is the million dollar question - literally. 

## Showing NP-Hardness
Before moving on to approaching a solution, it’s worth gaining a little appreciation for how **difficult** this problem truly is. To solve it in its entirety, you would make a million dollars! Literally! The challenges we have with using our machine model to generate text is yet another manifestation of the NP-Complete class of problems (in it’s decision form). If you are unfamiliar, these problems are known to be the toughest problems in computer science. What’s more interesting, is that problems existing in this class can all be **reduced** to one another, implying that they are all in essence the same problem.

Let’s show that our issue of finding the most likely sequence is *just as hard* as the other famous NP-hard problems, like the Traveling Salesman Problem and Knapsack Problem. 

Generating text is akin to the problem of finding the **highest probability sequence** that starts with $\text{<s>}$.
The easiest reduction to see is if we construct a directed graph, starting with $\text{<s>}$, and layers consisting of each word in our vocabulary. Each edge $(u, v)$ will be equal to $P(v ~|~ u)$ where $u$ and $v$ are words. Note that this graph goes on forever, and that we have a $\text{</s>}$ token for ending a sequence. Thus, finding out the most likely sequence of words is equivalent to finding **the longest path** in this graph. 

![](https://i.imgur.com/46XrpAS.jpg)
<small> An illustration of how we "search" for the most probable sequence. </small>

As we know, the longest path problem is famously NP-Hard, which means that trying to maximize

$$
\prod _{i = 0} ^{n} P(w_i ~ | ~ c_0 ~ ... ~ c_{i - 1})
$$

for an entire sequence is thereby also **NP-Hard** since they are equivalent problems. As a result, solving our little text decoding problem in polynomial time could net you [one million dollars](https://en.wikipedia.org/wiki/Millennium_Prize_Problemshttps://en.wikipedia.org/wiki/Millennium_Prize_Problems)! People have tried to do this for a long time with little luck, so let's look into **approximating** this problem instead.
 
## Greedy Decoding
Our first and most intuitive approximation is known as **Greedy Decoding**, where we take the **most probable word** over a vocabulary $V$ for a context $c$ as the next word.

$$
w_i = \operatorname*{arg\, max}_{w \in V} ~ P(w_i ~ | ~ c_0 ~ ... ~ c_{i - 1})
$$

Repeatedly taking the most performing this operation will allow us to create a sentence, one word at a time.

## Beam Search
As with most naive approaches, Greedy Decoding doesn't always produce the best outcomes. This is especially true in certain domains such as translating between different languages, where tokens at the beginning of the sentence may dramatically alter the likehood of its following tokens. This creates the problem of a high-probability token "hiding behind" a low-probability token that preceeds it in the order of the sentence. As a result, Greedy Decoding will forgo the low-probabilty token in favour of another one, regardless of that token's subsequently generated tokens.

One approach that mitigates this problem is **Beam Search**, which is another *greedy* algorithm that approximates the search process by maintaining multiple possible candidates for a path (which each represent a sentence).

## Random Sampling
The last way that we can generate text is to let uncertainy do it's thing and **randomly sample** directly from the distribution of $P(w ~|~ c)$. This might also feels like a naive way to do text generation, but in reality this allows for a good middle-ground between creativity and greediness. In expectation, the strategy tends to produce statistically likely sequences. For machine learning in general, relying on expectation tends to do well for us!

## Distributional Changes
One issue with Random Sampling (and decoding strategies in general) is the lack of control we have over how the signal is used to select candidate words. Fear not, because we have ways of fine-tuning the way our model uses the token probabilities to generate text. One main way is to impose additional behaviour on decoding strategies by **altering the output distribution** of $P(w ~|~ c)$.

### Temperature

### Top-K Sampling

### Top-P Sampling

## Conclusion

So it seems like there are a lot of decoding strategies for generating text. For deciding which to use, it's best to think about what aspect of human language you are trying to capture. If it's an accuracy-maximizing translation task, then Beam Search is the way to go (determinism in selection can be helpful). If you want the expressiveness and character of a chatbot, then random sampling with a distributional change would make the most sense.

Trying to use statical and mathematical tools to decipher what makes text sound human is an interesting avenue of research and lately I've been exploring it in earnest. Check out this project [here](https://github.com/kirubarajan/trick) to see our latest efforts!

<br />

---

<br />

## References
1. [The Curious Case of Neural Text Degeneration](https://arxiv.org/abs/1904.09751)