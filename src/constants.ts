export enum COMMAND {
    PLACE = "PLACE",
    MOVE = "MOVE",
    LEFT = "LEFT",
    RIGHT = "RIGHT",
    REPORT = "REPORT",
    QUIT = "QUIT"
}

export enum DIRECTION {
    NORTH = "NORTH",
    SOUTH = "SOUTH",
    EAST = "EAST",
    WEST = "WEST"
}

/**
 * List the directions for rotational movement.
 * When rotating to the left or right, the index of the current direction will be used and we can just
 * add or subtract depends on the rotation
 */
export const DIRECTION_LIST: DIRECTION[] = [DIRECTION.NORTH, DIRECTION.EAST, DIRECTION.SOUTH, DIRECTION.WEST]