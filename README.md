## Project title

A Test

## Motivation

This project is a Tamagotchi that you should name Darrel...there's no functionality supprting that yet..but you should do it anyway

## Code style

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

## Tech/framework used

<b>Built with</b>
ES6 Vanilla JavaScript

## Features

- User can specify name, favorite games, and favorite foods for tamagotchi
- Tamagotchi is interfaced with through commandline menu

## Installation

npm install && npm start

## API Reference

- Tamagotchi default lifespan and favorite things can be changed in TamagotchiConfig.js

## Tests

- Unit tests currently checking tamagotchi actions and user interactions

## How to use?

Npm run start

### Gameplay

- Tamagotchi lives for 20 game days currently (setable in the config). Each day the Tamagotchi will suffer some sort of daily attrition. 
* +1 Hunger
* +1 Sadness
*	+1 Poo
* -1 Health

- The name of the game is to keep your Tamagotchi alive by playing with it or feeding it.

Feeding
_______
* -3 Hunger
* +1 Mood
* +3 Health
* +2 Poo

Feeding
_______
* +2 Mood
* +2 Health
* +2 Hunger

If the Tamagotchi gets too hungry or too unhealthy it will die. Good ways to kill it include:
* Neglect
* Overfeeding
* Overplaying
During gameplay selecting Get Stats will return the health stats of your Tamagotchi, and selecting Needs Attention shows you which areas of the Tamagotchi's health need you to address. Happy playing.

If the updates get too hectic selecting the clear option in the menu will reset the terminal

## Issues

- Command line interface not working well with status updates from tamagotchi, sometimes if user is scrolling an update will mess up flow of menu
- Need to refactor Tamagotchi class to see if things under Util and Timers could be moved to a utilities file

## License

MIT © [Melvin-Young]()
