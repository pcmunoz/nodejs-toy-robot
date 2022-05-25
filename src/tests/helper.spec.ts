import { COMMAND, DIRECTION } from "../constants"
import { checkPointIfWithinMax, evaluationForMoveCommand, evaluationForPlaceCommand, evaluationForRotationCommand } from "../helper"
import { Robot } from "../interfaces"

const defaultRobot:Robot = {
	x:0,
	y:0,
	direction: DIRECTION.EAST
}

describe("helpers", () => {
	it("should return true if checkPointIfWithinMax point is within 0 and max point ", () => {
		expect(checkPointIfWithinMax(0,1)).toBeTruthy()
	})

	it("should return false if checkPointIfWithinMax point is less than 0 ", () => {
		expect(checkPointIfWithinMax(-1,1)).toBeFalsy()
	})

	it("should return false if checkPointIfWithinMax point is more than the max point ", () => {
		expect(checkPointIfWithinMax(2,1)).toBeFalsy()
	})

	it("should return result without error if evaluationForPlaceCommand parameters are correct", () => {
		expect(evaluationForPlaceCommand(defaultRobot,"PLACE 0,0,NORTH",0,1)).toEqual(
			{robot: {x: 0, y: 0, direction: DIRECTION.NORTH}}
		)
	})

	it("should return result with error if evaluationForPlaceCommand command parameter is incorrect", () => {
		expect(evaluationForPlaceCommand(defaultRobot,"PLACE 0 0 NORTH",0,1)).toEqual(
			{robot: defaultRobot, error: "Unable to place robot on the table."}
		)
		expect(evaluationForPlaceCommand(defaultRobot,"PLACE00NORTH",0,1)).toEqual(
			{robot: defaultRobot, error: "Unable to place robot on the table."}
		)
	})

	it("should return result with error if evaluationForPlaceCommand command position is invalid", () => {
		expect(evaluationForPlaceCommand(defaultRobot,"PLACE 9, 9 NORTH",5,5)).toEqual(
			{robot: defaultRobot, error: "Unable to place robot on the table."}
		)
	})

	it("should return result without error if evaluationForMoveCommand parameters are correct", () => {
		expect(evaluationForMoveCommand({x:0,y:0,direction: DIRECTION.NORTH},2,1)).toEqual(
			{robot: {x: 0, y: 1, direction: DIRECTION.NORTH}}
		)
		expect(evaluationForMoveCommand({x:0,y:0,direction: DIRECTION.EAST},2,1)).toEqual(
			{robot: {x: 1, y: 0, direction: DIRECTION.EAST}}
		)
		expect(evaluationForMoveCommand({x:0,y:1,direction: DIRECTION.SOUTH},2,1)).toEqual(
			{robot: {x: 0, y: 0, direction: DIRECTION.SOUTH}}
		)
		expect(evaluationForMoveCommand({x:1,y:0,direction: DIRECTION.WEST},2,1)).toEqual(
			{robot: {x: 0, y: 0, direction: DIRECTION.WEST}}
		)
	})

	it("should return result with error if evaluationForMoveCommand position cannot be moved", () => {
		expect(evaluationForMoveCommand({x:2,y:1,direction: DIRECTION.NORTH},2,1)).toEqual(
			{robot: {x: 2, y: 1, direction: DIRECTION.NORTH}, error: "Robot cannot move!"}
		)
	})

	it("should return result without error if evaluationForRotationCommand parameters are correct", () => {
		expect(evaluationForRotationCommand({x:0,y:0,direction: DIRECTION.NORTH}, COMMAND.LEFT)).toEqual(
			{x:0, y:0, direction: DIRECTION.EAST}
		)

		expect(evaluationForRotationCommand({x:0,y:0,direction: DIRECTION.NORTH}, COMMAND.RIGHT)).toEqual(
			{x:0, y:0, direction: DIRECTION.WEST}
		)

		expect(evaluationForRotationCommand({x:0,y:0,direction: DIRECTION.WEST}, COMMAND.LEFT)).toEqual(
			{x:0, y:0, direction: DIRECTION.NORTH}
		)

		expect(evaluationForRotationCommand({x:0,y:0,direction: DIRECTION.WEST}, COMMAND.RIGHT)).toEqual(
			{x:0, y:0, direction: DIRECTION.SOUTH}
		)
	})
})