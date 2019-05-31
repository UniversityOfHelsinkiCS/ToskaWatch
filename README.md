# ToskaWatch

## What?

Toskwatch runs cypress tests against our software in production and sends slack messages if the tests do not pass in the software.

Note that this means that sometimes the tests must be changed.

## Where?

Running in toska machine. You can find the envs there.

## When?

Every 15 minutes

## What is this spam?

WIP problems. If your software is down for 30 minutes you'll get 2 messages and so on. Make sure your software works.

## How do I update toskawatch?

WIP problems. Automatically generates new image from a push. At the writing of this the only way to deploy is by going to toska machine, switch user to toska_user and deploy the new image.