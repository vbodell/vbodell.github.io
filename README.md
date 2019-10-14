# Räntan Step Count
## By Victor Bodell

A primitive (partly hard-coded) step count challenge for the people of the
farm Räntan. The actual challenge is found on 
[vbodell.github.io](https://vbodell.github.io).

The only content is a simple `index.html` file and some scripts. Backend uses
firebase. [Jekyll](https://jekyllrb.com) with the minima theme is the website
build.

## Updating for a new challenge
The parameters that need to be set for a new challenge are start- and end-date 
in `_config.yaml`. As well as the destinations and dates 
in `assets/js/util.js`. Also Firebase needs to be cleaned up.

## Todos
- Make a log-in system for users
- Perhaps a register-system to have multiple challenges running
- Secure firebase and don't use development imports.
