import readlineSync from "readline-sync"
import config from "./config"
import { COMMAND, DIRECTION } from "./constants"
import { evaluationForMoveCommand, evaluationForPlaceCommand, evaluationForRotationCommand } from "./helper"
import { Robot } from "./interfaces"

const app = () => {
	let command = ""
	let robotPlaced = false
	let robot: Robot = {
		x: 0,
		y: 0,
		direction: DIRECTION.EAST
	}
	const { x, y } = config.table

	console.log("Toy Robot on a Table Commands")
	console.log(`Table size is ${x} by ${y}\n`)
	console.log(`${COMMAND.PLACE} X,Y,DIRECTION(NORTH, SOUTH, EAST, WEST). Starting point is 0,0 SOUTH WEST.`)
	console.log(`${COMMAND.MOVE} robot one point into direction`)
	console.log(`${COMMAND.LEFT} will rotate robot 90° to the left`)
	console.log(`${COMMAND.RIGHT} will rotate robot 90° to the right`)
	console.log(`${COMMAND.REPORT} will show the current point and direction.`)
	console.log(`${COMMAND.QUIT} to close the program.`)
	console.log("\nNote: PLACE the robot first on the table.")


	while(command !== COMMAND.QUIT){
		command = readlineSync.question()
		if(!robotPlaced && command.includes(COMMAND.PLACE)){
			const evaluateFirstPlace = evaluationForPlaceCommand(robot, command, x, y)

			if(!evaluateFirstPlace.error){
				robotPlaced = true
				console.log("Robot now Placed!")
				robot=evaluateFirstPlace.robot
			}
			else {
				console.log(evaluateFirstPlace.error)
			}
			continue
		}
		else if(!robotPlaced && command !== COMMAND.QUIT){
			console.log("Kindly PLACE the robot first.")
			continue
		}

		switch(command){
			case COMMAND.MOVE:{
				const evaluateMove = evaluationForMoveCommand(robot,x, y)
				if(!evaluateMove.error){
					console.log("Robot Moved!")
					robot=evaluateMove.robot
				}
				else {
					console.log(evaluateMove.error)
				}
				break
			}
			case COMMAND.LEFT:
				robot = evaluationForRotationCommand(robot, COMMAND.LEFT)
				console.log("Robot rotated to the left!")
				break
			case COMMAND.RIGHT:
				robot = evaluationForRotationCommand(robot, COMMAND.RIGHT)
				console.log("Robot rotated to the right!")
				break
			case COMMAND.REPORT:
				console.log(`Robot current location is at x:${robot.x},y:${robot.y} and direction is ${robot.direction}`)
				break
			case COMMAND.QUIT:
				break
			default:{
				if(command.includes(COMMAND.PLACE)){
					const evaluatePlace = evaluationForPlaceCommand(robot, command, x, y)

					if(!evaluatePlace.error){
						console.log("Robot Placed!")
						robot=evaluatePlace.robot
					}
					else {
						console.log(evaluatePlace.error)
					}
				}
			}
		}
	}

	console.log("The End")

}

export default app
