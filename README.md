# Toy Robot Challenge

Place a robot on a table. Move it in any direction within the table. The robot will not fall during movement.

==Note: PLACE first the robot to use other commands. QUIT command will always work.==
Point 0,0 is on the SOUTH WEST corner. Out of bounds is negative position and max table dimension(x,y).
Max table config can be found on _src\config.ts_. If config file is edited, build and run to reflect change.

Install, Build and Run

## Installation

> npm install

## Build and Run

> npm run start

#### Build only

> npm run build

#### Run only

> npm run build:run

## Commands

#### PLACE X,Y,DIRECTION

This will place the robot in the table on x,y coordinates and the direction.
If x,y is not within the table, robot will not be placed.

#### MOVE

This will move the robot **one unit on the direction** it is facing.

#### LEFT

This will rotate the direction of the robot to the left. E.g. North -> West

#### RIGHT

This will rotate the direction of the robot to the right. E.g. North -> East

#### REPORT

This will show the current position and direction of the robot.

#### QUIT

The end.

## Run Test

> npm run test

## Lint

#### Check

> npm run lint

#### Fix

> npm run lint
