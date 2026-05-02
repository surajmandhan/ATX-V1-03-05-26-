/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/shopify/route";
exports.ids = ["app/api/shopify/route"];
exports.modules = {

/***/ "(rsc)/./app/api/shopify/route.js":
/*!**********************************!*\
  !*** ./app/api/shopify/route.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\nasync function POST(request) {\n    try {\n        const { query, variables } = await request.json();\n        const domain = \"discount-upsell-test-store.myshopify.com\";\n        const token = \"916f6305420416edd620b15b7b78f35c\";\n        const cleanDomain = domain.replace(/^https?:\\/\\//, '').replace(/\\/$/, '');\n        const isAdminToken = token.startsWith('shpat_');\n        const endpoint = isAdminToken ? `https://${cleanDomain}/admin/api/2024-04/graphql.json` : `https://${cleanDomain}/api/2024-01/graphql.json`;\n        const headerName = isAdminToken ? \"X-Shopify-Access-Token\" : \"X-Shopify-Storefront-Access-Token\";\n        const response = await fetch(endpoint, {\n            method: 'POST',\n            headers: {\n                'Content-Type': 'application/json',\n                [headerName]: token\n            },\n            body: JSON.stringify({\n                query,\n                variables\n            })\n        });\n        const data = await response.json();\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(data);\n    } catch (error) {\n        console.error(\"Proxy API Error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Internal Server Error\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3Nob3BpZnkvcm91dGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBMkM7QUFFcEMsZUFBZUMsS0FBS0MsT0FBTztJQUNoQyxJQUFJO1FBQ0YsTUFBTSxFQUFFQyxLQUFLLEVBQUVDLFNBQVMsRUFBRSxHQUFHLE1BQU1GLFFBQVFHLElBQUk7UUFFL0MsTUFBTUMsU0FBU0MsMENBQTRDO1FBQzNELE1BQU1HLFFBQVFILGtDQUF1RDtRQUVyRSxNQUFNSyxjQUFjTixPQUFPTyxPQUFPLENBQUMsZ0JBQWdCLElBQUlBLE9BQU8sQ0FBQyxPQUFPO1FBRXRFLE1BQU1DLGVBQWVKLE1BQU1LLFVBQVUsQ0FBQztRQUN0QyxNQUFNQyxXQUFXRixlQUNYLENBQUMsUUFBUSxFQUFFRixZQUFZLCtCQUErQixDQUFDLEdBQ3ZELENBQUMsUUFBUSxFQUFFQSxZQUFZLHlCQUF5QixDQUFDO1FBRXZELE1BQU1LLGFBQWFILGVBQ2IsMkJBQ0E7UUFFTixNQUFNSSxXQUFXLE1BQU1DLE1BQU1ILFVBQVU7WUFDckNJLFFBQVE7WUFDUkMsU0FBUztnQkFDUCxnQkFBZ0I7Z0JBQ2hCLENBQUNKLFdBQVcsRUFBRVA7WUFDaEI7WUFDQVksTUFBTUMsS0FBS0MsU0FBUyxDQUFDO2dCQUFFckI7Z0JBQU9DO1lBQVU7UUFDMUM7UUFFQSxNQUFNcUIsT0FBTyxNQUFNUCxTQUFTYixJQUFJO1FBQ2hDLE9BQU9MLHFEQUFZQSxDQUFDSyxJQUFJLENBQUNvQjtJQUUzQixFQUFFLE9BQU9DLE9BQU87UUFDZEMsUUFBUUQsS0FBSyxDQUFDLG9CQUFvQkE7UUFDbEMsT0FBTzFCLHFEQUFZQSxDQUFDSyxJQUFJLENBQUM7WUFBRXFCLE9BQU87UUFBd0IsR0FBRztZQUFFRSxRQUFRO1FBQUk7SUFDN0U7QUFDRiIsInNvdXJjZXMiOlsiL1VzZXJzL21hY3NvbHV0aW9ucy9Eb3dubG9hZHMvYmFjayBuZXcgLSBhdHgvYmFja2t1cHBwIDQ0NDQvYXR4LXJlc2VhcmNoLXBlcHRpZGVzICgxKS9hcHAvYXBpL3Nob3BpZnkvcm91dGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBxdWVyeSwgdmFyaWFibGVzIH0gPSBhd2FpdCByZXF1ZXN0Lmpzb24oKTtcbiAgICBcbiAgICBjb25zdCBkb21haW4gPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TSE9QSUZZX1NUT1JFX0RPTUFJTjtcbiAgICBjb25zdCB0b2tlbiA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NIT1BJRllfU1RPUkVGUk9OVF9BQ0NFU1NfVE9LRU47XG5cbiAgICBjb25zdCBjbGVhbkRvbWFpbiA9IGRvbWFpbi5yZXBsYWNlKC9eaHR0cHM/OlxcL1xcLy8sICcnKS5yZXBsYWNlKC9cXC8kLywgJycpO1xuICAgIFxuICAgIGNvbnN0IGlzQWRtaW5Ub2tlbiA9IHRva2VuLnN0YXJ0c1dpdGgoJ3NocGF0XycpO1xuICAgIGNvbnN0IGVuZHBvaW50ID0gaXNBZG1pblRva2VuIFxuICAgICAgICA/IGBodHRwczovLyR7Y2xlYW5Eb21haW59L2FkbWluL2FwaS8yMDI0LTA0L2dyYXBocWwuanNvbmBcbiAgICAgICAgOiBgaHR0cHM6Ly8ke2NsZWFuRG9tYWlufS9hcGkvMjAyNC0wMS9ncmFwaHFsLmpzb25gO1xuXG4gICAgY29uc3QgaGVhZGVyTmFtZSA9IGlzQWRtaW5Ub2tlbiBcbiAgICAgICAgPyBcIlgtU2hvcGlmeS1BY2Nlc3MtVG9rZW5cIiBcbiAgICAgICAgOiBcIlgtU2hvcGlmeS1TdG9yZWZyb250LUFjY2Vzcy1Ub2tlblwiO1xuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChlbmRwb2ludCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIFtoZWFkZXJOYW1lXTogdG9rZW4sXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBxdWVyeSwgdmFyaWFibGVzIH0pLFxuICAgIH0pO1xuXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oZGF0YSk7XG5cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiUHJveHkgQVBJIEVycm9yOlwiLCBlcnJvcik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiSW50ZXJuYWwgU2VydmVyIEVycm9yXCIgfSwgeyBzdGF0dXM6IDUwMCB9KTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsIlBPU1QiLCJyZXF1ZXN0IiwicXVlcnkiLCJ2YXJpYWJsZXMiLCJqc29uIiwiZG9tYWluIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX1NIT1BJRllfU1RPUkVfRE9NQUlOIiwidG9rZW4iLCJORVhUX1BVQkxJQ19TSE9QSUZZX1NUT1JFRlJPTlRfQUNDRVNTX1RPS0VOIiwiY2xlYW5Eb21haW4iLCJyZXBsYWNlIiwiaXNBZG1pblRva2VuIiwic3RhcnRzV2l0aCIsImVuZHBvaW50IiwiaGVhZGVyTmFtZSIsInJlc3BvbnNlIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJkYXRhIiwiZXJyb3IiLCJjb25zb2xlIiwic3RhdHVzIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/shopify/route.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fshopify%2Froute&page=%2Fapi%2Fshopify%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fshopify%2Froute.js&appDir=%2FUsers%2Fmacsolutions%2FDownloads%2Fback%20new%20-%20atx%2Fbackkuppp%204444%2Fatx-research-peptides%20(1)%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmacsolutions%2FDownloads%2Fback%20new%20-%20atx%2Fbackkuppp%204444%2Fatx-research-peptides%20(1)&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fshopify%2Froute&page=%2Fapi%2Fshopify%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fshopify%2Froute.js&appDir=%2FUsers%2Fmacsolutions%2FDownloads%2Fback%20new%20-%20atx%2Fbackkuppp%204444%2Fatx-research-peptides%20(1)%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmacsolutions%2FDownloads%2Fback%20new%20-%20atx%2Fbackkuppp%204444%2Fatx-research-peptides%20(1)&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_macsolutions_Downloads_back_new_atx_backkuppp_4444_atx_research_peptides_1_app_api_shopify_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/shopify/route.js */ \"(rsc)/./app/api/shopify/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/shopify/route\",\n        pathname: \"/api/shopify\",\n        filename: \"route\",\n        bundlePath: \"app/api/shopify/route\"\n    },\n    resolvedPagePath: \"/Users/macsolutions/Downloads/back new - atx/backkuppp 4444/atx-research-peptides (1)/app/api/shopify/route.js\",\n    nextConfigOutput,\n    userland: _Users_macsolutions_Downloads_back_new_atx_backkuppp_4444_atx_research_peptides_1_app_api_shopify_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZzaG9waWZ5JTJGcm91dGUmcGFnZT0lMkZhcGklMkZzaG9waWZ5JTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGc2hvcGlmeSUyRnJvdXRlLmpzJmFwcERpcj0lMkZVc2VycyUyRm1hY3NvbHV0aW9ucyUyRkRvd25sb2FkcyUyRmJhY2slMjBuZXclMjAtJTIwYXR4JTJGYmFja2t1cHBwJTIwNDQ0NCUyRmF0eC1yZXNlYXJjaC1wZXB0aWRlcyUyMCgxKSUyRmFwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9JTJGVXNlcnMlMkZtYWNzb2x1dGlvbnMlMkZEb3dubG9hZHMlMkZiYWNrJTIwbmV3JTIwLSUyMGF0eCUyRmJhY2trdXBwcCUyMDQ0NDQlMkZhdHgtcmVzZWFyY2gtcGVwdGlkZXMlMjAoMSkmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQzhEO0FBQzNJO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvbWFjc29sdXRpb25zL0Rvd25sb2Fkcy9iYWNrIG5ldyAtIGF0eC9iYWNra3VwcHAgNDQ0NC9hdHgtcmVzZWFyY2gtcGVwdGlkZXMgKDEpL2FwcC9hcGkvc2hvcGlmeS9yb3V0ZS5qc1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvc2hvcGlmeS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3Nob3BpZnlcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3Nob3BpZnkvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvbWFjc29sdXRpb25zL0Rvd25sb2Fkcy9iYWNrIG5ldyAtIGF0eC9iYWNra3VwcHAgNDQ0NC9hdHgtcmVzZWFyY2gtcGVwdGlkZXMgKDEpL2FwcC9hcGkvc2hvcGlmeS9yb3V0ZS5qc1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fshopify%2Froute&page=%2Fapi%2Fshopify%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fshopify%2Froute.js&appDir=%2FUsers%2Fmacsolutions%2FDownloads%2Fback%20new%20-%20atx%2Fbackkuppp%204444%2Fatx-research-peptides%20(1)%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmacsolutions%2FDownloads%2Fback%20new%20-%20atx%2Fbackkuppp%204444%2Fatx-research-peptides%20(1)&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@opentelemetry"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fshopify%2Froute&page=%2Fapi%2Fshopify%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fshopify%2Froute.js&appDir=%2FUsers%2Fmacsolutions%2FDownloads%2Fback%20new%20-%20atx%2Fbackkuppp%204444%2Fatx-research-peptides%20(1)%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmacsolutions%2FDownloads%2Fback%20new%20-%20atx%2Fbackkuppp%204444%2Fatx-research-peptides%20(1)&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();