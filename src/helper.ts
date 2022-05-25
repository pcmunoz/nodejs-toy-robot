import { COMMAND, DIRECTION, DIRECTION_LIST } from "./constants"
import { EvaluationResult, Robot } from "./interfaces"

/**
 * @param point is the point in table
 * @param max is the max value of a point in table
 * @returns boolean
 */
export const checkPointIfWithinMax = (point: number, max: number) => point >= 0 && point <= max

/**
 * @param robot contains the current position and direction of the robot
 * @param command is a string that contains the new position and direction of the robot e.g "PLACE 0,0,NORTH""
 * @param x is the max x-axis of the table
 * @param y  is the max y-axis of the table
 * @returns EvaluationResult
 */
export const evaluationForPlaceCommand = (
	robot: Robot, command: string, x:number, y:number
): EvaluationResult => {
	const location = command.split(" ")

	if(location.length === 2) {
		const position = location[1].split(",")

		if(position.length === 3) {
			const [commandX,commandY,direction] = position
			const parsedX = parseInt(commandX)
			const parsedY = parseInt(commandY)

			if(Object.values(DIRECTION).includes(direction as DIRECTION)
				&& checkPointIfWithinMax(parsedX, x) && checkPointIfWithinMax(parsedY, y)){
				return {
					robot: {
						x: parsedX,
						y: parsedY,
						direction: direction as DIRECTION
					}
				}
			}
		}
	}

	return {
		robot,
		error: "Unable to place robot on the table."
	}
}

/**
 * @param robot contains the position and direction
 * @param x is the max x-axis of the table
 * @param y is the max y-axis of the table
 * @returns EvaluationResult
 */
export const evaluationForMoveCommand = (
	robot: Robot, x: number, y: number
):EvaluationResult => {
	let newRobot = robot
	let outOfBounds = true
	switch(robot.direction){
		case DIRECTION.NORTH: {
			newRobot = {...robot, y: robot.y + 1}
			outOfBounds = !checkPointIfWithinMax(newRobot.y, y)
			break
		}
		case DIRECTION.SOUTH: {
			newRobot = {...robot, y:robot.y - 1}
			outOfBounds = !checkPointIfWithinMax(newRobot.y, y)
			break
		}
		case DIRECTION.WEST: {
			newRobot = {...robot, x: robot.x - 1}
			outOfBounds = !checkPointIfWithinMax(newRobot.x, x)
			break
		}
		case DIRECTION.EAST: {
			newRobot = {...robot, x: robot.x + 1}
			outOfBounds = !checkPointIfWithinMax(newRobot.x, x)
			break
		}
	}

	if(outOfBounds){
		return {
			robot,
			error: "Robot cannot move!"
		}
	}

	return { robot: newRobot }
}

/**
 * @param robot contains the position and direction
 * @param movement to which side to rotate to
 * @returns Robot
 */
export const evaluationForRotationCommand = (
	robot: Robot, movement: COMMAND.LEFT | COMMAND.RIGHT
): Robot => {
	let newIndex = 0
	const currentIndex = DIRECTION_LIST.findIndex((value) =>  value === robot.direction)
	if(movement === COMMAND.LEFT){
		if(currentIndex === 3){
			newIndex = 0
		}
		else {
			newIndex = currentIndex + 1
		}
	}
	else {
		if(currentIndex === 0){
			newIndex = 3
		}
		else{
			newIndex = currentIndex - 1
		}
	}

	return {...robot, direction: DIRECTION_LIST[newIndex]}
}