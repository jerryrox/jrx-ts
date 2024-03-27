import { expect, test } from "vitest";
import ModelConverter from "./ModelConverter";

interface ITestSubmodel {
    stringValue: string;
    boolValue: boolean;
}
class TestSubmodelConverter extends ModelConverter<ITestSubmodel> {
    toModel(_: string, data: any): ITestSubmodel {
        return {
            boolValue: this.decodeBool(data.boolValue),
            stringValue: this.decodeString(data.stringValue),
        };
    }

    toPlain(model: ITestSubmodel): Record<string, any> {
        return {
            boolValue: this.encodeBool(model.boolValue),
            stringValue: this.encodeString(model.stringValue),
        };
    }
}

class TestModelFactory {
    private constructor() {} // eslint-disable-line

    static new(fields: ITestModelField): ITestModel {
        const model: ITestModel = {
            ...fields,
        };
        return model;
    }
}
interface ITestModelField {
    id: string;
    boolValue: boolean;
    dateValue: Date;
    floatValue: number;
    intValue: number;
    stringValue: string;
    mapValue: Record<string, string>;
    arrayValue: string[];
    submodelValue: ITestSubmodel;
}
interface ITestModel extends ITestModelField { // eslint-disable-line
    
}
class TestModelConverter extends ModelConverter<ITestModel> {
    
    constructor() {
        super();
        this.subconverters.push(new TestSubmodelConverter());
    }

    toModel(id: string, data: any): ITestModel {
        return TestModelFactory.new({
            id,
            boolValue: this.decodeBool(data.boolValue, true),
            dateValue: this.decodeDate(data.dateValue, new Date("1997-03-27")),
            floatValue: this.decodeFloat(data.floatValue, 2.2),
            intValue: this.decodeInt(data.intValue, 1),
            stringValue: this.decodeString(data.stringValue, "default"),
            mapValue: this.decodeMap(data.mapValue, this.decodeString, this.decodeString, {}),
            arrayValue: this.decodeArray(data.arrayValue, this.decodeString, []),
            submodelValue: this.decodeSubmodel(data.submodelValue, TestSubmodelConverter),
        });
    }

    toPlain(model: ITestModel): Record<string, any> {
        return {
            boolValue: this.encodeBool(model.boolValue),
            dateValue: this.encodeDate(model.dateValue),
            floatValue: this.encodeNumber(model.floatValue),
            intValue: this.encodeNumber(model.intValue),
            stringValue: this.encodeString(model.stringValue),
            mapValue: this.encodeMap(model.mapValue, this.encodeString, this.encodeString),
            arrayValue: this.encodeArray(model.arrayValue, this.encodeString),
            submodelValue: this.encodeSubmodel(model.submodelValue, TestSubmodelConverter),
        };
    }
}

test("Convert to model", () => {
    const converter = new TestModelConverter();
    const data = {
        boolValue: true,
        dateValue: "2021-01-01T00:00:00.000Z",
        floatValue: 1.5,
        intValue: 1,
        stringValue: "test",
        mapValue: { key: "value" },
        arrayValue: ["value"],
        submodelValue: { boolValue: true, stringValue: "test" },
    };
    const model = converter.toModel("id", data);
    expect(model).toEqual({
        id: "id",
        boolValue: true,
        dateValue: new Date("2021-01-01T00:00:00.000Z"),
        floatValue: 1.5,
        intValue: 1,
        stringValue: "test",
        mapValue: { key: "value" },
        arrayValue: ["value"],
        submodelValue: { boolValue: true, stringValue: "test" },
    });
});

test("Convert to plain", () => {
    const converter = new TestModelConverter();
    const model = TestModelFactory.new({
        id: "id",
        boolValue: true,
        dateValue: new Date("2021-01-01T00:00:00.000Z"),
        floatValue: 1.5,
        intValue: 1,
        stringValue: "test",
        mapValue: { key: "value" },
        arrayValue: ["value"],
        submodelValue: { boolValue: true, stringValue: "test" },
    });
    const plain = converter.toPlain(model);
    expect(plain).toEqual({
        boolValue: true,
        dateValue: "2021-01-01T00:00:00.000Z",
        floatValue: 1.5,
        intValue: 1,
        stringValue: "test",
        mapValue: { key: "value" },
        arrayValue: ["value"],
        submodelValue: { boolValue: true, stringValue: "test" },
    });
});

test("Convert to plain with extra", () => {
    const converter = new TestModelConverter();
    const model = TestModelFactory.new({
        id: "id",
        boolValue: true,
        dateValue: new Date("2021-01-01T00:00:00.000Z"),
        floatValue: 1.5,
        intValue: 1,
        stringValue: "test",
        mapValue: { key: "value" },
        arrayValue: ["value"],
        submodelValue: { boolValue: true, stringValue: "test" },
    });
    const plain = converter.toPlainWithExtra(model, { extra: "value" });
    expect(plain).toEqual({
        boolValue: true,
        dateValue: "2021-01-01T00:00:00.000Z",
        floatValue: 1.5,
        intValue: 1,
        stringValue: "test",
        mapValue: { key: "value" },
        arrayValue: ["value"],
        submodelValue: { boolValue: true, stringValue: "test" },
        extra: "value",
    });
});

test("To model safe", () => {
    const converter = new TestModelConverter();
    const model = converter.toModelSafe("id", {});
    expect(model).toBe(undefined);
});