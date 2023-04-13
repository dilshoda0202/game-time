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
