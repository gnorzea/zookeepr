const fs = require("fs");
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper,
} = require("../lib/zookeepers.js");
const { zookeepers } = require("../data/zookeepers");

jest.mock('fs');

test("filters by query", () => {
    const startingZookeepers = [
        {
            id: "0",
            name: "Kim",
            age: 28,
            favoriteAnimal: "dolphin"
        },
        {
            id: "1",
            name: "Raksha",
            age: 31,
            favoriteAnimal: "penguin"
        },
    ];
    const updatedZookeepers = filterByQuery({ age: 31 }, startingZookeepers);

    expect(updatedZookeepers.length).toEqual(1);
});

test("finds by id", () => {
    const startingZookeepers = [
        {
            id: "0",
            name: "Kim",
            age: 28,
            favoriteAnimal: "dolphin"
        },
        {
            id: "1",
            name: "Raksha",
            age: 31,
            favoriteAnimal: "penguin"
        },
    ];

    const result = findById("1", startingZookeepers);

    expect(result.name).toBe("Raksha");
});

test("creates an Zookeeper object", () => {
    const zookeeper = createNewZookeeper(
        { name: "Darlene", id: "10" },
        zookeepers
    );

    expect(zookeeper.name).toBe("Darlene");
    expect(zookeeper.id).toBe("10");
});

test("validates age", () => {
    const zookeeper = {

        id: "0",
        name: "Kim",
        age: 28,
        favoriteAnimal: "dolphin"
    };

    const invalidZookeeper = {
        id: "1",
        name: "Raksha",
        age: "31",
        favoriteAnimal: "penguin"
    };


    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});