---
path: "/blog/decoding"
date: "2020-04-17"
title: "Decoding Strategies for Text Generation"
tags: ['machine learning']
excerpt: "An Overview of How To *Use* A Trained Language-Model"
---

<div class="notification  is-light">
Disclaimer: this post is still being written - check back soon for updates!
</div>

# Decoding Strategies for Text Generation
> Finding the Humanity in Approximating an NP-Hard Problem

## Introduction
Recently, machine learning models have seen incredible progress towards computers being able to generate text that sounds human. This is an area of research that involves both furthering our understanding of machine intelligence as well as language usage. I think it’s an interesting problem because it once against prompts a long-standing question in machine intelligence: what does it mean to be human?

So how do we make computers sound human? In particular, let’s look at the different ways we can do this once we have a special kind of trained machine learning model known as a **language model**. In its simplest sense, a language model assigns a probability to a sequence of words. As you can imagine, language is infinite and so we can’t possibly know the probability of the phrase “cat in the hat”. However, our machine learning model (by definition) is going to **approximate** this likelihood for us. And, as it turns out, this is a powerful technique that works incredibly well for practical purposes.

Here’s a brief (and oversimplified) explanation for how we use language models to generate text. In essence, a language model’s purpose is to give us $P(w|c)$, where $w$ is a particular target word (i.e. the next word) and $c$ is the context that precedes the target word. Now, we can use the chain rule in probability to break down a sequence (or sentence) of words into step-by-step calculations:

$$
P(\text{cat in the hat}) = P(\text{hat} | \text{the}) \cdot P(\text{the} | \text{in}) \cdot P(\text{in} | \text{cat}) \cdot P(\text{cat} | \text{<START>})
$$

Now, we turn our focus to using these probabilities to **create** text. Let's determine what the first word of our generation would be. Similar to the previous example, where we have a $\text{<START>}$ token to signify the beginning of a sequence, we can ask the model what the value of $P(w | \text{<START>})$ for a variety of different values of $w$. But how do we select what $w$ should be when we're given the probabilities for every possible word? Is it simply the highest value?

More broadly, *how do we select the next word in a sequence, given the probabilities of what following words could be?* As we will see, this is the million dollar question.

## Showing NP-Hardness
Before moving on to approaching a solution, it’s worth gaining a little appreciation for how **difficult** this problem truly is. To solve it in its entirety, you would make a million dollars! Literally! The challenges we have with using our machine model to generate text is yet another manifestation of the NP-Complete class of problems (in it’s decision form). If you are unfamiliar, these problems are known to be the toughest problems in computer science. What’s more interesting, is that problems existing in this class can all be **reduced** to one another, implying that they are in essence the same problem.

Let’s show that our issue of text generation is *just as hard* as the other famous NP-hard problems, like the Traveling Salesman Problem and Knapsack Problem. 

Generating text is akin to the problem of finding the **highest probability sequence** that starts with $\text{<START>}$.
The easiest reduction to see is if we construct a directed graph, starting with $\text{<START>}$, and layers consisting of each word in our vocabulary. Each edge $(u, v)$ will be equal to $P(v | u)$ where $u$ and $v$ are words. Note that this graph goes on forever, and that we have a $\text{<END>}$ token for ending a sequence. Thus, finding out the most likely sequence of words is equivalent to finding **the longest path** in this graph. 

As we know, the longest path problem is **NP-Hard**, which means that trying to maximize

$$
\prod _{i = 0} ^{n} P(w_i | c_i)
$$

for an entire sequence is also NP-Hard, and solving this problem in polynomial time could net you [one million dollars](https://en.wikipedia.org/wiki/Millennium_Prize_Problemshttps://en.wikipedia.org/wiki/Millennium_Prize_Problems). People have tried to do this for a long time with little luck, so let's look into **approximating** this problem instead.
 
## Greedy Decoding

## Beam Search

## Random Sampling

## Distribution Changes

### Temperature

### Top-K Sampling

### Top-P Sampling

## Conclusion

So it seems like there are a lot of decoding strategies for generating text. For deciding which to use, I like to think about what aspect of human language you are trying to capture. If it's the sense-maximizing translation task, then Beam Search is the way to go (determinism can be helpful). If you want the expressiveness and character of a chatbot, then random sampling with a distributional change is the current best.

Trying to use statical and mathematical tools to decipher what it means to be human is an interesting avenue of research and lately I've been exploring it in earnest. Check out this project [here](github.com/kirubarajan/trick) to see our latest efforts!