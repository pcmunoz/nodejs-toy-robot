import { DIRECTION } from "./constants"

export interface Robot {
    x: number,
    y: number,
    direction: DIRECTION
}

export interface EvaluationResult {
    robot: Robot
    error?: string
}