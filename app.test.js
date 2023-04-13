//  test for circleCollidesWithRectangle function

describe("circleCollidesWithRectangle", () => {
    const circle = {
        position: { x: 5, y: 5 },
        radius: 2,
        velocity: { x: 1, y: 1 }
    };

    const rectangle = {
        position: { x: 0, y: 0 },
        width: 10,
        height: 10
    };

    it("should return true if the circle and rectangle overlap", () => {
        expect(circleCollidesWithRectangle({ circle, rectangle })).toBe(true);
    });

    it("should return false if the circle and rectangle do not overlap", () => {
        const newCircle = {
            position: { x: 20, y: 20 },
            radius: 2,
            velocity: { x: 1, y: 1 }
        };
        expect(circleCollidesWithRectangle({ circle: newCircle, rectangle })).toBe(false);
    });

    it("should return false if the circle only collides with the rectangle's edges", () => {
        const newCircle = {
            position: { x: 7, y: 0 },
            radius: 2,
            velocity: { x: 1, y: 1 }
        };
        expect(circleCollidesWithRectangle({ circle: newCircle, rectangle })).toBe(false);
    });

    it("should return true if the circle's position is on the edge of the rectangle and moving towards it", () => {
        const newCircle = {
            position: { x: 8, y: 10 },
            radius: 2,
            velocity: { x: -2, y: -2 }
        };
        expect(circleCollidesWithRectangle({ circle: newCircle, rectangle })).toBe(true);
    });

    it("should return true if the circle's position is inside the rectangle and moving away from it", () => {
        const newCircle = {
            position: { x: 3, y: 3 },
            radius: 2,
            velocity: { x: -1, y: -1 }
        };
        expect(circleCollidesWithRectangle({ circle: newCircle, rectangle })).toBe(true);
    });
});

// test for Player 
describe("Player", () => {
    let player;

    beforeEach(() => {
        player = new Player({
            position: { x: 10, y: 10 },
            velocity: { x: 2, y: 2 }
        });
    });

    it("should have the correct initial position, velocity, and radius", () => {
        expect(player.position).toEqual({ x: 10, y: 10 });
        expect(player.velocity).toEqual({ x: 2, y: 2 });
        expect(player.radius).toBe(15);
    });

    it("should draw a yellow circle on the canvas", () => {
        const mockBeginPath = jest.fn();
        const mockArc = jest.fn();
        const mockFillStyle = jest.fn();
        const mockFill = jest.fn();
        const mockClosePath = jest.fn();

        const mockContext = {
            beginPath: mockBeginPath,
            arc: mockArc,
            fillStyle: mockFillStyle,
            fill: mockFill,
            closePath: mockClosePath
        };

        player.draw(mockContext);

        expect(mockBeginPath).toHaveBeenCalledTimes(1);
        expect(mockBeginPath).toHaveBeenCalledWith();
        expect(mockArc).toHaveBeenCalledTimes(1);
        expect(mockArc).toHaveBeenCalledWith(10, 10, 15, 0, Math.PI * 2);
        expect(mockFillStyle).toHaveBeenCalledTimes(1);
        expect(mockFillStyle).toHaveBeenCalledWith("yellow");
        expect(mockFill).toHaveBeenCalledTimes(1);
        expect(mockClosePath).toHaveBeenCalledTimes(1);
    });

    it("should update the player's position", () => {
        player.update();
        expect(player.position).toEqual({ x: 12, y: 12 });
    });
});
