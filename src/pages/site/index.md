---
path: "/blog/site"
date: "2020-02-21"
title: "About This Website"
tags: ['programming']
excerpt: "How I Build and Use This Site"
---

# About This Website
> How I Build and Use This Site

It's pretty commonplace for computer scientists (and people working in tech) to maintain a website displaying a portfolio and a blog conveying technical thoughts. As you can see, I am no different. In fact, I actually purchased the domain name https://kirubarajan.com back in early high school when we had a teacher strike and I needed something to do.

I've re-built and revamped my personal website so many times (roughly once a year) that it brings me a lot of pleasure to see myself satisfied with this current iteration. So, I decided to write this short blog post describing how I built this site (and why I like it so much for writing).

## About My Previous Websites
My personal website has tracked my own progress in software development.

My first attempt at a website was using a professional Bootstrap template and static hosting. I liked it, but I was a useless high school student, so I thought the professional get-up was overkill. The second iteration of my site in high school was written in Express and Angular (back when it was cool) since I thought of them synonymously with *web development*. I wish I had screenshots but this was before I learned how to use Git. This didn't work out due to technical debt (and I didn't know how to deploy things). 

In the following year, I got pretty into [Meteor](https://www.meteor.com/) for web development due its easy full-stack functionality and I re-wrote my website to use it on the back-end. The MongoDB database ended up storing blog posts as raw HTML and that hurt my brain to think about, so this didn't last. The personal website began becoming useful since switching to a Jekyll website. 

This was mainly because of **dedicated Markdown files** for content management, which I enjoyed the flexibility and structure of.

![screenshot](https://i.imgur.com/RnldAK2.png)

Ultimately, I got rid of this because I wanted to implement my own styling and functionality.

![screenshot](https://i.imgur.com/1vQeBlF.png)

My site began to stabilize my freshman year of university when I re-wrote it in Python. I built a simple website layout in [Bulma](https://bulma.io/) and I wrote a simple file-system parser to read a `/posts` folder of Markdown and render them. This was kind of my attempt of implementing Jekyll in Python. As you can imagine, this didn't work out too well. My second to last implementation was in [Django](https://www.djangoproject.com/) due to its really nice ORM for SQL. Again, this was a little over-kill for a personal website and blog and there was a lot of machinery involved with tweaking UI things. In particular, I couldn't for the life of me get LaTeX rendering to work. 

But this is ultimately what prompted my final and current implementation of my personal website...

## How This Site Is Built

This current website is built using a pretty stable stack of [Gatsby](https://www.gatsbyjs.org/) (using React) on the front-end... and that's it! There is no dedicated back-end. I write my blog posts in seperate Markdown files (with a brief `yaml` header) and I rely on Gatsby to convert them into HTML. I also can use Sass to style my site on top of [Bulma](https://bulma.io/) to get a real nice personal feel. This means I can define custom components like this:

```js
import React from 'react';
import '../styles/styles.sass';

const Nav = () => {
  return (
    <div style={{marginTop: "1rem", marginBottom: "2rem"}}>
      <nav>
        <a href="/"> <span className="tag is-light"> Home </span> </a>
        <a href="/research"> <span className="tag is-light"> Research </span> </a>
        <a href="/consulting"> <span className="tag is-light"> Consulting </span> </a>
        <a href="/teaching"> <span className="tag is-light"> Teaching </span> </a>
        <a href="/blog"> <span style={{marginTop: "0.3rem"}} className="tag is-light"> Blog </span> </a>
      </nav>
    </div>
  )
}

export default Nav;
```

I also like to include semicolons to make it feel like I'm not programming in JavaScript.

Since I've started writing about my research and my experiences in machine learning, I've found the need to write/display mathematical equations and code snippets in my blog posts. And since I'm a stickler, I wanted them to be pretty. I've found some really cool Gatsby plug-ins so that I can write LaTeX in my Markdown files and have them render nicely on the front-end. A good example of this is my post on [my machine learning notes](/blog/ml_notes).

## What's next?
To be honest, I'm not sure. Web development is a relaxing hobby for me (kinda a guilty pleasure), and I definitely do like using my personal website as a way to experiment with different techincal stacks. But I also love using this website setup for editing and writing, invoking my personal touch in each page. 

Will I inevitably re-write this website for another shinier stack? Only time will tell.