---
path: "/blog/zsh"
date: "2018-08-15"
title: "Customizing Your Shell (Tutorial)"
tags: ['dev', 'programming']
excerpt: "How to make your zsh config look pretty!"
---

# Your Terminal and You
> A Tutorial to Customizing Your Shell

We all have a love/hate relationship with our CLI, no matter what operating system. Don't even get me started on emacs.

I've started spending hours at work customizing the colour scheme and font/icon option, and I have finally found the one:

![alt text](https://storage.googleapis.com/kirubarajan-site.appspot.com/assets/img/zsh.png "Logo Title Text 1")

Switching my terminal of choice from the native Terminal on macOS to [iTerm](http://iterm2.com) and using Oh My Zsh to manage my zsh configurations allowed me a greater depth to play with. It only involves a few `curls` and `clones` - the total process takes only a few minutes to make the tool you revolve your life around *just right*.

## Steps
1. Install iTerm2 from [this link](http://iterm2.com) or use `brew cask install iterm2`.
2. Open iTerm2 and install Oh My Zsh by curling:
```
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```
3. Open your `~/.zshrc` file (I like using vim with `vim ~/.zshrc`) and add the line:
```
ZSH_THEME="agnoster"
```
4. Install [this font](https://github.com/powerline/fonts/blob/master/Meslo%20Slashed/Meslo%20LG%20M%20Regular%20for%20Powerline.ttf). 
5. Open iTerm (your icons will look funky) and *cmd-i* to open your Preferences. Under Text select your font to be *Meslo LG M Reguar for Powerline*.
6. Clone [this repo](https://github.com/mbadolato/iTerm2-Color-Schemes) using 
```
git clone https://github.com/mbadolato/iTerm2-Color-Schemes
``` 
to save all the schemas somewhere. 
7. Pick your favourite theme from the repo and *cmd-i* to open Preferences and under *Colors* click *Color Presets* import the scheme you like from `iTerm2-Color-Schemes/schemes` (you can also tweak the colors at this tab).
8. Save your present under *General*.


Hopefully this points you in the right direction to customize your CLI to your liking. Reading through the commented out lines in `~/.zshrc` will help you understand what is in your control.