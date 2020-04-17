---
path: "/blog/decoding"
date: "2020-04-17"
title: "Decoding Strategies for Text Generation"
tags: ['machine learning']
excerpt: "An Overview of How To *Use* A Trained Language-Model"
---

# Decoding Strategies for Text Generation
> Finding the Humanity in Approximating an NP-Hard Problem

## Introduction
Recently, machine learning models have seen incredible progress towards computers being able to generate text that sounds human. This is an area of research that involves both furthering our understanding of machine intelligence as well as language usage. I think it’s an interesting problem since it once against prompts the long-lasting question of “what does it mean to be human”.

So how do we make computers sound human? In particular, I want to take a look at the different ways we can do this, if we have a trained machine learning model known as a **language model**. In its simplest sense, a language model assigns a probability to a sequence of words. As you can imagine, language is infinite and so we can’t possibly know the probability of the phrase “cat in the hat”. However, our machine learning model by definition is going to **approximate** this for us. And, it turns out that this approximation works incredibly well for practical purposes.

The language model’s goal is give us always be able to give us $P(w|c)$, where $w$ is a particular target word (i.e. the next word) and $c$ is the context that precede the target word. 

## Proving NP-Hardness
Before moving on to approaching a solution, it’s worth gaining a little appreciation for how **difficult** this problem truly is. To solve it in its entirety, you would make a million dollars! Literally! The challenges we have with using our machine model to generate text is yet another manifestation of the NP-Complete class of problems (in it’s decision form). If you are unfamiliar, these problems are known to be the toughest problems in computer science. What’s more interesting, is that problems existing in this class can all be **reduced** to one another, implying that they are in essence the same problem.

Let’s show that our issue of text generation is *just as hard* as the other famous NP-hard problems, like the Traveling Salesman Problem and Knapsack Problem. 

## Greedy Decoding

## Beam Search

## Random Sampling

## Distribution Changes

### Temperature

### Top-K Sampling

### Top-P Sampling

## Conclusion