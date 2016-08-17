"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var ng2_file_upload_1 = require('../../../node_modules/ng2-file-upload');
var template = require('./buildCaseInput.html');
var URL = 'https://evening-anchorage-3159.herokuapp.com/api/';
var BuildCaseInput = (function () {
    function BuildCaseInput(router, http) {
        this.router = router;
        this.http = http;
        this.uploader = new ng2_file_upload_1.FileUploader({ url: URL });
        this.hasBaseDropZoneOver = false;
        this.hasAnotherDropZoneOver = false;
    }
    BuildCaseInput.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
    };
    BuildCaseInput.prototype.fileOverAnother = function (e) {
        this.hasAnotherDropZoneOver = e;
    };
    BuildCaseInput = __decorate([
        core_1.Component({
            selector: 'buildCaseInput',
            directives: [ng2_file_upload_1.FILE_UPLOAD_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES, router_1.ROUTER_DIRECTIVES, common_1.NgClass, common_1.NgStyle],
            template: template
        })
    ], BuildCaseInput);
    return BuildCaseInput;
}());
exports.BuildCaseInput = BuildCaseInput;
//# sourceMappingURL=buildCaseInput.js.map