'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var express = require('express');
var fs = require('fs');
var path = require('path');

(function (MetadataSymbols) {
    MetadataSymbols.ControllerRoutesSymbol = Symbol.for("mvc:controller:routes");
    MetadataSymbols.ControllerRouteMiddlewareSymbol = Symbol.for("mvc:controller:route:middleware");
    MetadataSymbols.ControllerRoutePrefixSymbol = Symbol.for("mvc:controller:routePrefix");
    MetadataSymbols.ControllerRouteParamsSymbol = Symbol.for("mvc:controller:route:params");
    MetadataSymbols.DependencyInjectionTypesSymbol = Symbol.for("mvc:diTypes");
    MetadataSymbols.DependencyServiceTypeSymbol = Symbol.for("mvc:serviceType");
})(exports.MetadataSymbols || (exports.MetadataSymbols = {}));
function addRouteMetadata(target, name, method, route, handler) {
    let existingData = Reflect.getMetadata(exports.MetadataSymbols.ControllerRoutesSymbol, target);
    if (existingData === undefined) {
        existingData = [];
    }
    existingData.push({ method, name, route: route === 'index' ? '' : route, handler });
    Reflect.defineMetadata(exports.MetadataSymbols.ControllerRoutesSymbol, existingData, target);
}
function addMiddleware(target, name, handler) {
    let existingData = Reflect.getMetadata(exports.MetadataSymbols.ControllerRouteMiddlewareSymbol, target, name);
    if (existingData === undefined) {
        existingData = [];
    }
    existingData.push({ handler });
    Reflect.defineMetadata(exports.MetadataSymbols.ControllerRouteMiddlewareSymbol, existingData, target, name);
}
function Middleware(handler, p1, p2) {
    let f = function (target, propertyKey, descriptor) {
        addMiddleware(target.constructor, propertyKey, handler);
        return descriptor;
    };
    return typeof handler === 'object' ? f.apply(undefined, arguments) : f;
}
function HttpGet(route, p1, p2) {
    let f = function (target, propertyKey, descriptor) {
        addRouteMetadata(target.constructor, propertyKey, "get", typeof route === 'string' ? route : propertyKey.replace(/^(.+)Get$/, '$1'), descriptor.value);
        return descriptor;
    };
    return typeof route === 'object' ? f.apply(undefined, arguments) : f;
}
function HttpPost(route, p1, p2) {
    let f = function (target, propertyKey, descriptor) {
        addRouteMetadata(target.constructor, propertyKey, "post", typeof route === 'string' ? route : propertyKey.replace(/^(.+)Post$/, '$1'), descriptor.value);
        return descriptor;
    };
    return typeof route === 'object' ? f.apply(undefined, arguments) : f;
}
function HttpPut(route, p1, p2) {
    let f = function (target, propertyKey, descriptor) {
        addRouteMetadata(target.constructor, propertyKey, "put", typeof route === 'string' ? route : propertyKey.replace(/^(.+)Put$/, '$1'), descriptor.value);
        return descriptor;
    };
    return typeof route === 'object' ? f.apply(undefined, arguments) : f;
}
function HttpPatch(route, p1, p2) {
    let f = function (target, propertyKey, descriptor) {
        addRouteMetadata(target.constructor, propertyKey, "patch", typeof route === 'string' ? route : propertyKey.replace(/^(.+)Patch$/, '$1'), descriptor.value);
        return descriptor;
    };
    return typeof route === 'object' ? f.apply(undefined, arguments) : f;
}
function HttpDelete(route, p1, p2) {
    let f = function (target, propertyKey, descriptor) {
        addRouteMetadata(target.constructor, propertyKey, "delete", typeof route === 'string' ? route : propertyKey.replace(/^(.+)Delete$/, '$1'), descriptor.value);
        return descriptor;
    };
    return typeof route === 'object' ? f.apply(undefined, arguments) : f;
}
function HttpOptions(route, p1, p2) {
    let f = function (target, propertyKey, descriptor) {
        addRouteMetadata(target.constructor, propertyKey, "options", typeof route === 'string' ? route : propertyKey.replace(/^(.+)Options$/, '$1'), descriptor.value);
        return descriptor;
    };
    return typeof route === 'object' ? f.apply(undefined, arguments) : f;
}
function HttpHead(route, p1, p2) {
    let f = function (target, propertyKey, descriptor) {
        addRouteMetadata(target.constructor, propertyKey, "head", typeof route === 'string' ? route : propertyKey.replace(/^(.+)Head$/, '$1'), descriptor.value);
        return descriptor;
    };
    return typeof route === 'object' ? f.apply(undefined, arguments) : f;
}
function Route(target, p1, p2) {
    const routeMethod = function (_target, propertyKey, descriptor) {
        addRouteMetadata(_target.constructor, propertyKey, "all", typeof target === 'string' ? target : propertyKey, descriptor.value);
        return descriptor;
    };
    const routeClass = function (_target) {
        Reflect.defineMetadata(exports.MetadataSymbols.ControllerRoutePrefixSymbol, typeof target === 'string' ? target : _target.name.replace(/Controller$/, ""), _target);
        return _target;
    };
    const f = function () {
        if (arguments.length === 1) {
            return routeClass.apply(undefined, arguments);
        }
        return routeMethod.apply(undefined, arguments);
    };
    return typeof target === 'object' ? f.apply(undefined, arguments) : f;
}
function addParameterMetadata(target, propertyKey, parameterIndex, kind, paramName) {
    let metadata = Reflect.getMetadata(exports.MetadataSymbols.ControllerRouteParamsSymbol, target, propertyKey) || [];
    let params = Reflect.getMetadata("design:paramtypes", target, propertyKey) || [];
    metadata.push({ index: parameterIndex, kind, type: params[parameterIndex], name: paramName });
    Reflect.defineMetadata(exports.MetadataSymbols.ControllerRouteParamsSymbol, metadata, target, propertyKey);
}
function FromBody(name) {
    let f = function (target, propertyKey, parameterIndex) {
        addParameterMetadata(target, propertyKey, parameterIndex, "body", typeof name === 'string' ? name : undefined);
    };
    return typeof name === 'object' ? f.apply(undefined, arguments) : f;
}
function FromForm(name) {
    let f = function (target, propertyKey, parameterIndex) {
        addParameterMetadata(target, propertyKey, parameterIndex, "form", typeof name === 'string' ? name : undefined);
    };
    return typeof name === 'object' ? f.apply(undefined, arguments) : f;
}
function FromHeader(name) {
    let f = function (target, propertyKey, parameterIndex) {
        addParameterMetadata(target, propertyKey, parameterIndex, "header", typeof name === 'string' ? name : undefined);
    };
    return typeof name === 'object' ? f.apply(undefined, arguments) : f;
}
function FromQuery(name) {
    let f = function (target, propertyKey, parameterIndex) {
        addParameterMetadata(target, propertyKey, parameterIndex, "query", typeof name === 'string' ? name : undefined);
    };
    return typeof name === 'object' ? f.apply(undefined, arguments) : f;
}
function FromRoute(name) {
    let f = function (target, propertyKey, parameterIndex) {
        addParameterMetadata(target, propertyKey, parameterIndex, "route", typeof name === 'string' ? name : undefined);
    };
    return typeof name === 'object' ? f.apply(undefined, arguments) : f;
}
function Inject(target) {
    if (Reflect.hasMetadata('design:paramtypes', target)) {
        var types = Reflect.getMetadata('design:paramtypes', target).map((type) => Reflect.hasMetadata(exports.MetadataSymbols.DependencyServiceTypeSymbol, type) ? type : null);
        if (types.some((type) => type !== null)) {
            Reflect.defineMetadata(exports.MetadataSymbols.DependencyInjectionTypesSymbol, types, target);
        }
    }
    return target;
}
function SingletonService(target) {
    Inject(target);
    Reflect.defineMetadata(exports.MetadataSymbols.DependencyServiceTypeSymbol, 'singleton', target);
    return target;
}
function TransientService(target) {
    Inject(target);
    Reflect.defineMetadata(exports.MetadataSymbols.DependencyServiceTypeSymbol, 'transient', target);
    return target;
}

class DependencyManager {
    constructor() {
        this.instances = new Map();
    }
    getServiceInstance(type) {
        if (Reflect.getMetadata(exports.MetadataSymbols.DependencyServiceTypeSymbol, type) === 'singleton') {
            let instance = this.instances.get(type);
            if (!instance) {
                instance = this.getInstance(type);
                this.instances.set(type, instance);
            }
            return instance;
        }
        else {
            return this.getInstance(type);
        }
    }
    getInstance(ctor) {
        if (!Reflect.hasMetadata(exports.MetadataSymbols.DependencyInjectionTypesSymbol, ctor)) {
            return new ctor;
        }
        let injectTypes = Reflect.getMetadata(exports.MetadataSymbols.DependencyInjectionTypesSymbol, ctor);
        let foundOne = false;
        let params = [];
        for (let i = injectTypes.length - 1; i >= 0; --i) {
            let type = injectTypes[i];
            if (!foundOne) {
                if (type === null) {
                    continue;
                }
                else {
                    foundOne = true;
                }
            }
            params.unshift(type === null ? undefined : this.getServiceInstance(type));
        }
        params.unshift(null);
        return new (Function.prototype.bind.apply(ctor, params));
    }
}
const dm = new DependencyManager();

class Controller {
    constructor() {
    }
    view(arg1, arg2) {
        let viewName = 'index';
        let modelData = undefined;
        if (typeof arg1 === 'object') {
            modelData = arg1;
        }
        else if (typeof arg1 === 'string') {
            viewName = arg1;
            modelData = arg2;
        }
        return Promise.resolve({ type: 'view', name: getControllerName(this.constructor) + '/' + viewName, data: modelData });
    }
    redirect(url) {
        return Promise.resolve({ type: 'redirect', url });
    }
    json(data) {
        return Promise.resolve({ type: 'json', data });
    }
    content(data) {
        return Promise.resolve({ type: 'content', data });
    }
    file(data) {
        return Promise.resolve({ type: 'file', data });
    }
    next(err) {
        return Promise.resolve({ type: 'next', err: err });
    }
}
function handleResult(res, next, result) {
    switch (result.type) {
        case 'next':
            next(result.err);
            break;
        case 'json':
            res.json(result.data);
            break;
        case 'view':
            res.render(result.name, result.data);
            break;
        case 'redirect':
            res.redirect(result.url);
            break;
        case 'content':
            res.end(result.data);
            break;
        case 'file':
            res.end(result.data);
            break;
        default:
            res.end();
            break;
    }
}
function getControllerName(controller) {
    function lcFirst(str) {
        return str.charAt(0).toLowerCase() + str.slice(1);
    }
    return lcFirst(controller.name.replace(/Controller$/, ''));
}

class MvcApp {
}
class Request {
    constructor() { }
}
class Response {
    constructor() { }
}
var routing;
(function (routing) {
    function getParamNames(func) {
        let code = func.toString().replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg, '');
        var result = code.slice(code.indexOf('(') + 1, code.indexOf(')')).match(/([^\s,]+)/g);
        if (result !== null) {
            return Array.prototype.slice.call(result);
        }
        return [];
    }
    function createParamFunction(route, controllerClass) {
        let paramTypes = Reflect.getMetadata("design:paramtypes", controllerClass.prototype, route.name);
        let paramAnnotations = [];
        let params = Reflect.getMetadata(exports.MetadataSymbols.ControllerRouteParamsSymbol, controllerClass.prototype, route.name);
        if (params) {
            params.forEach(p => paramAnnotations[p.index] = p);
        }
        if (paramTypes && paramTypes.length) {
            let paramNames = getParamNames(route.handler);
            let args = paramTypes.map((p, i) => {
                if (p === Request) {
                    return 'req';
                }
                if (p === Response) {
                    return 'res';
                }
                let prefix = p === Number ? '+' : p === Boolean ? '!!' : '';
                if (paramAnnotations[i]) {
                    let name = paramAnnotations[i].name || paramNames[i];
                    switch (paramAnnotations[i].kind) {
                        case 'body':
                            return `req.body`;
                        case 'form':
                            return `req.body && ${prefix}req.body['${name}']`;
                        case 'header':
                            return `${prefix}req.get('${name}')`;
                        case 'query':
                            return `${prefix}req.query['${name}']`;
                        case 'route':
                            return `${prefix}req.params['${name}']`;
                        case 'null':
                        default:
                            return 'null';
                    }
                }
                if (typeof p === 'function' && [Number, String, Boolean, Array].indexOf(p) < 0) {
                    return `dm.getInstance(${p.name})`;
                }
                return `req.params['${paramNames[i]}'] !== undefined ? ${prefix}req.params['${paramNames[i]}'] : ${prefix}req.query['${paramNames[i]}']`;
            });
            return new Function('req', 'res', 'dm', `return [${args.join(', ')}]`);
        }
        return null;
    }
    function setRoutesSingleton(controllerClass, router, dm$$1, debug) {
        let controller;
        controller = dm$$1.getInstance(controllerClass);
        let routes = Reflect.getMetadata(exports.MetadataSymbols.ControllerRoutesSymbol, controllerClass);
        if (!routes) {
            return controller;
        }
        routes.forEach(route => {
            let method = router[route.method];
            let paramFunc = createParamFunction(route, controllerClass);
            let middleware = Reflect.getMetadata(exports.MetadataSymbols.ControllerRouteMiddlewareSymbol, controllerClass, route.name);
            let args = ['/' + route.route, (req, res, next) => {
                    var resultPromise = paramFunc ? route.handler.apply(controller, paramFunc(req, res, dm$$1)) : route.handler.call(controller);
                    if (resultPromise && typeof resultPromise.then === 'function') {
                        resultPromise.then((result) => handleResult(res, next, result));
                    }
                }];
            if (debug) {
                console.log(`  |- ${route.method} /${route.route}`);
            }
            if (Array.isArray(middleware)) {
                middleware.forEach((item, index) => {
                    args.splice(1 + index, 0, item.handler);
                });
            }
            method.apply(router, args);
        });
        return controller;
    }
    function setRoutesTransient(controllerClass, router, dm$$1, debug) {
        let routes = Reflect.getMetadata("controller:routes", controllerClass);
        if (!routes) {
            return;
        }
        routes.forEach(route => {
            let method = router[route.method];
            method.call(router, '/' + route.route, (req, res, next) => {
                let controller = dm$$1.getInstance(controllerClass);
                var resultPromise = route.handler.call(controller);
                if (resultPromise && typeof resultPromise.then === 'function') {
                    resultPromise.then((result) => handleResult(res, next, result));
                }
            });
        });
    }
    const controllerFileMatcher = /([A-Za-z0-9]+)Controller(\.js|\.ts)$/;
    function setup(app, options = {}) {
        let controllerDir = options.controllerDir || path.join(process.cwd(), 'controllers');
        let files = fs.readdirSync(controllerDir);
        let dependencyManager = options.dependencyManager || dm;
        let mvcApp = new MvcApp();
        mvcApp.rootRouter = options.singleRouterToApp ? express.Router() : app;
        mvcApp.controllers = files.filter(file => controllerFileMatcher.test(file)).map(file => {
            let module = require(path.join(controllerDir, file));
            let controllerClass = module[file.replace(/\.js|\.ts/, '')];
            let route = Reflect.getMetadata(exports.MetadataSymbols.ControllerRoutePrefixSymbol, controllerClass);
            if (route === undefined) {
                route = getControllerName(controllerClass);
            }
            if (options.debugRoutes) {
                console.log(`  + ${route}`);
            }
            let router = express.Router({ mergeParams: true });
            let controllerInstance = undefined;
            if (options.transientControllers) {
                setRoutesTransient(controllerClass, router, dependencyManager, options.debugRoutes || false);
            }
            else {
                setRoutesSingleton(controllerClass, router, dependencyManager, options.debugRoutes || false);
            }
            mvcApp.rootRouter.use('/' + route, router);
            return { name: controllerFileMatcher.exec(file)[1], type: controllerClass, instance: controllerInstance };
        });
        return mvcApp;
    }
    routing.setup = setup;
})(routing || (routing = {}));
function setup(app, options = {}) {
    return routing.setup(app, options);
}

require('reflect-metadata');

exports.Middleware = Middleware;
exports.HttpGet = HttpGet;
exports.HttpPost = HttpPost;
exports.HttpPut = HttpPut;
exports.HttpPatch = HttpPatch;
exports.HttpDelete = HttpDelete;
exports.HttpOptions = HttpOptions;
exports.HttpHead = HttpHead;
exports.Route = Route;
exports.FromBody = FromBody;
exports.FromForm = FromForm;
exports.FromHeader = FromHeader;
exports.FromQuery = FromQuery;
exports.FromRoute = FromRoute;
exports.Inject = Inject;
exports.SingletonService = SingletonService;
exports.TransientService = TransientService;
exports.dm = dm;
exports.DependencyManager = DependencyManager;
exports.handleResult = handleResult;
exports.getControllerName = getControllerName;
exports.Controller = Controller;
exports.setup = setup;
exports.MvcApp = MvcApp;
exports.Request = Request;
exports.Response = Response;
