const sinon = require("sinon");
const express = require("express");

describe("", () => {
    it("should pass", () => {
        const routerStub = {
            route: sinon.stub().returnsThis(),
            get: sinon.stub().returnsThis(),
            patch: sinon.stub().returnsThis(),
            delete: sinon.stub().returnsThis(),
        };
        sinon.stub(express, "Router").callsFake(() => routerStub);
        require("../users");
        sinon.assert.calledWith(routerStub.route, "/");
        sinon.assert.calledWith(routerStub.route, "/:id");
        sinon.assert.calledWith(routerStub.get, sinon.match.func);
        sinon.assert.calledWith(routerStub.patch, sinon.match.func);
        sinon.assert.calledWith(routerStub.delete, sinon.match.func);
    });
});
