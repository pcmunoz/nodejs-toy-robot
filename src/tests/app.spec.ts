import readlineSync from "readline-sync"
import app from "../app"

const logSpy = jest.spyOn(console, "log")

describe("Toy Robot on a table", () => {
	it("should call the function and quit", () => {
		const spy = jest.spyOn(readlineSync, "question").mockImplementationOnce(() => "QUIT")
		app()
		expect(logSpy).toHaveBeenCalledWith("The End")
		spy.mockRestore()
	})

	it("should handle command when robot is not placed", () => {
		const spy = jest.spyOn(readlineSync, "question")
			.mockImplementationOnce(() => "MOVE")
			.mockImplementationOnce(() => "QUIT")
		app()
		expect(logSpy).toHaveBeenCalledWith("Kindly PLACE the robot first.")
		expect(logSpy).toHaveBeenCalledWith("The End")
		spy.mockRestore()
	})

	it("should handle wrong PLACE command", () => {
		const spy = jest.spyOn(readlineSync, "question")
			.mockImplementationOnce(() => "PLACE")
			.mockImplementationOnce(() => "QUIT")
		app()
		expect(logSpy).toHaveBeenCalledWith("Kindly PLACE the robot first.")
		expect(logSpy).toHaveBeenCalledWith("The End")
		spy.mockRestore()
	})

	it("should handle right PLACE command", () => {
		const spy = jest.spyOn(readlineSync, "question")
			.mockImplementationOnce(() => "PLACE 0,0,EAST")
			.mockImplementationOnce(() => "QUIT")
		app()
		expect(logSpy).toHaveBeenCalledWith("Robot now Placed!")
		expect(logSpy).toHaveBeenCalledWith("The End")
		spy.mockRestore()
	})

	it("should handle another PLACE command", () => {
		const spy = jest.spyOn(readlineSync, "question")
			.mockImplementationOnce(() => "PLACE 0,0,NORTH")
			.mockImplementationOnce(() => "PLACE")
			.mockImplementationOnce(() => "PLACE 0,0,SOUTH")
			.mockImplementationOnce(() => "QUIT")
		app()
		expect(logSpy).toHaveBeenCalledWith("Robot now Placed!")
		expect(logSpy).toHaveBeenCalledWith("Unable to place robot on the table.")
		expect(logSpy).toHaveBeenCalledWith("Robot Placed!")
		expect(logSpy).toHaveBeenCalledWith("The End")
		spy.mockRestore()
	})

	it("should handle MOVE commands", () => {
		const spy = jest.spyOn(readlineSync, "question")
			.mockImplementationOnce(() => "PLACE 0,0,NORTH")
			.mockImplementationOnce(() => "MOVE")
			.mockImplementationOnce(() => "PLACE 0,0,SOUTH")
			.mockImplementationOnce(() => "MOVE")
			.mockImplementationOnce(() => "QUIT")
		app()
		expect(logSpy).toHaveBeenCalledWith("Robot now Placed!")
		expect(logSpy).toHaveBeenCalledWith("Robot Moved!")
		expect(logSpy).toHaveBeenCalledWith("Robot Placed!")
		expect(logSpy).toHaveBeenCalledWith("Robot cannot move!")
		expect(logSpy).toHaveBeenCalledWith("The End")
		spy.mockRestore()
	})

	it("should handle LEFT and RIGHT commands", () => {
		const spy = jest.spyOn(readlineSync, "question")
			.mockImplementationOnce(() => "PLACE 0,0,NORTH")
			.mockImplementationOnce(() => "LEFT")
			.mockImplementationOnce(() => "REPORT")
			.mockImplementationOnce(() => "RIGHT")
			.mockImplementationOnce(() => "REPORT")
			.mockImplementationOnce(() => "QUIT")
		app()
		expect(logSpy).toHaveBeenCalledWith("Robot now Placed!")
		expect(logSpy).toHaveBeenCalledWith("Robot rotated to the left!")
		expect(logSpy).toHaveBeenCalledWith("Robot current location is at x:0,y:0 and direction is EAST")
		expect(logSpy).toHaveBeenCalledWith("Robot rotated to the right!")
		expect(logSpy).toHaveBeenCalledWith("Robot current location is at x:0,y:0 and direction is NORTH")
		expect(logSpy).toHaveBeenCalledWith("The End")
		spy.mockRestore()
	})

	it("should handle REPORT command", () => {
		const spy = jest.spyOn(readlineSync, "question")
			.mockImplementationOnce(() => "PLACE 0,0,NORTH")
			.mockImplementationOnce(() => "REPORT")
			.mockImplementationOnce(() => "QUIT")
		app()
		expect(logSpy).toHaveBeenCalledWith("Robot now Placed!")
		expect(logSpy).toHaveBeenCalledWith("Robot current location is at x:0,y:0 and direction is NORTH")
		expect(logSpy).toHaveBeenCalledWith("The End")
		spy.mockRestore()
	})
})