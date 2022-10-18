const sinon = require("sinon");
const express = require("express");

describe("", () => {
    it("should pass", () => {
        const routerStub = {
            post: sinon.stub().returnsThis(),
        };
        sinon.stub(express, "Router").callsFake(() => routerStub);
        require("../register");
        sinon.assert.calledWith(routerStub.route, "/");
    });
});
