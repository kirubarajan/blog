---
path: "/blog/learning"
date: "2019-11-16"
title: "Learning Machine Learning"
tags: ['machine learning', 'natural language processing']
excerpt: "An Undergraduate Summer in NLP Research"
---

# Learning Machine Learning
> An Undergraduate Summer in NLP Research

This summer, I was excited to finally work with the poster child of computer science: machine learning. I was a summer research assistant at the University of Pennsylvania working in the Natural Language Processing (NLP) Group. Namely, I was working on ChatEval: a scientific framework for evaluating dialogue systems (i.e. deep learning models).

When I first joined the research group, I didn't have a lot of past experience with machine learning. I knew Python and had followed some tutorials on Sci-Kit Learn, but I didn't really feel like I understood what I was doing. This was mainly due to the fact that by aimlessly bouncing around tutorials, I wasn't developing any real domain knowledge on anything that I was modeling. Trying to understand how deep learning work usually pointed me towards intimidating math and notation.

However, with a software engineering background, I was still able to contribute at first to the research group by assisting with implementation. And as such, I was able to learn practical deep learning skills by focusing on one specific domain: natural language. I was able to develop an intuitive and then mathematical understanding of seq2seq models - the type of neural network architecture that recently galvanized incredible progress in neural machine translation and dialogue systems.

### My Work
I am working on an application to assist machine learning researchers called [ChatEval]. As the name implies, the software allows researchers to upload models to perform standardized comparisons and evaluations of different types (e.g. average sentence length). We even use deep learning within the project through the word embeddings of word2vec: an unsupervised learning model that captures "semantic" meaning using vectors. Currently, we are releasing the automatic evaluations from ChatEval as a `pip` package so that other researchers can reproduce our results. 

ChatEval originally started as a `node.js` application that would use `sequelize` as an ORM to access a MySQL database. I figured that down the road, we would need some Python-based API in order to use all the evaluation scrips that the PhD students were developing. So one weekend, I decided to learn the web framework Django (to this day I still use it for my day-to-day web development) in order to have a robust MySQL ORM in addition to the user/authentication framework.

Through the project, I learned a lot about microservice architecture since I had to build one for working with large files of pre-trained word embeddings. Although, the most interesting parts of my work was working with the chatbots themselves. Their responses, at a Turing level, seems to feign cognition. But after enough turns, it became apparent that the neural-based chatbot models rarely outputted a value that made coherent or logical sense. Nonetheless, it was interesting to witness the state of the art neural chatbots. Working with neural chatbots motivated me to start reading literature on seq2seq networks and other neural network based dialogue systems.

### Advice
A lot of friends (who have programming experience) have asked me how to get involved with machine learning. The biggest advice I have is the same for any kind of computer science ecosystem: work your way down the abstraction ladder.

You can do this by first only using machine learning libraries that abstract away most of the computation from you. An example would be the excellent Sci-Kit Learn packages, which can be used to get familiar with the test/train paradigm. Then, you can begin implementing various shallow learning models such as K-Nearest Neighbours and Support Vector Machines. Learning how to manipulate data using a language like Python or R is also an important skill. You can’t train a model without being able to format the data into a format that the model can understand.

Working at an established institution (e.g. university or research lab) is a good way to get your feet wet in deep learning. Even if you can’t immediately contribute to the machine learning aspects of a project, I guarantee that even the most esteemed artificial intelligence experts have gaps in their knowledge. For example, the legendary Ian Goodfellow’s gold-standard deep learning textbook (which has been recommended by Elon Musk) has a website that looks like [this]. I originally got started working on ChatEval by building the REST API that the platform would use and let my peers work on the evaluation microservice.

The jump to deep learning often involves some thought - understanding WHY deep learning excels over standard machine learning will make the learning process a bit easier. For example, knowing the differences between human and machine created features is a good indicator that you understand the importance of neural networks. Here, it is crucial to see neural networks as black boxes while beginning. For this, I am a huge fan of Keras (which abstracts the computational graph of Tensorflow) and its intuitive API for building neural networks. Then, you can start using Tensorflow/Theano directly and delve deeper into the theory of neural networks.

As for domain-specific experience, I found NLP to be an excellent first step into deep learning. This is mainly since words and sentences can be viewed as discrete rather than “continuous” data such as pixel data and time series data (e.g. stock prices). As a result, it is easy to understand and visualize the words as the features for a neural network, unique vector arithmetic for a single word and so forth.

I'm currently using Keras to build projects that I wrap in a Django/Flask application. As a software engineer at heart, I like building things with the end goal of people using it (rather than a `print()` statement with an accuracy that only I need to know).

### Conclusion
My PhD supervisor working on ChatEval told me that NLP is a "gateway drug" to every branch of computer science. I think that's a fantastic way to describe the effect of studying NLP this summer. I was able to branch out and make use of regular expressions (theory), word embeddings (deep learning), dialogue systems (software engineering), language corpuses (data science) etc. 

I’d definitely recommend looking into natural language processing if you’re interested in the intersection between computer science and human interaction. I also recommend taking a look at [ChatEval] - we’re always making new updates!