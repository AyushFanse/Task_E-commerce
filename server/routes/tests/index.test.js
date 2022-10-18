const sinon = require("sinon");
const express = require("express");

describe("", () => {
    it("should pass", () => {
        const routerStub = {
            get: sinon.stub().returnsThis(),
        };
        sinon.stub(express, "Router").callsFake(() => routerStub);
        require("../index");
        sinon.assert.calledWith(routerStub.route, "/");
    });
});
