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
exports.id = "app/api/subscribe/route";
exports.ids = ["app/api/subscribe/route"];
exports.modules = {

/***/ "(rsc)/./app/api/subscribe/route.js":
/*!************************************!*\
  !*** ./app/api/subscribe/route.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @supabase/supabase-js */ \"(rsc)/./node_modules/@supabase/supabase-js/dist/index.mjs\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\n\nasync function POST(request) {\n    try {\n        const { email } = await request.json();\n        if (!email) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Email is required'\n            }, {\n                status: 400\n            });\n        }\n        // Initialize Supabase client\n        const supabaseUrl = \"https://iehrsxynseegxbobpplz.supabase.co\";\n        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllaHJzeHluc2VlZ3hib2JwcGx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2MjgyNDgsImV4cCI6MjA5MzIwNDI0OH0.14DfVoAhRRDmTZ7S99S8fOmEPD6TLiHPmh-8gPfdPBg\";\n        if (!supabaseUrl || !supabaseKey) {\n            // Return success in development if DB is not connected yet, so UI doesn't break\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: 'Subscribed successfully (Mock)'\n            }, {\n                status: 200\n            });\n        }\n        const supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_1__.createClient)(supabaseUrl, supabaseKey);\n        // Check if email already exists\n        const { data: existingUser } = await supabase.from('subscribers').select('email').eq('email', email).single();\n        if (existingUser) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Already subscribed'\n            }, {\n                status: 409\n            });\n        }\n        // Insert into database\n        await supabase.from('subscribers').insert([\n            {\n                email\n            }\n        ]);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: 'Subscribed successfully'\n        }, {\n            status: 200\n        });\n    } catch (error) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Internal Server Error'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3N1YnNjcmliZS9yb3V0ZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBcUQ7QUFDVjtBQUVwQyxlQUFlRSxLQUFLQyxPQUFPO0lBQ2hDLElBQUk7UUFDRixNQUFNLEVBQUVDLEtBQUssRUFBRSxHQUFHLE1BQU1ELFFBQVFFLElBQUk7UUFFcEMsSUFBSSxDQUFDRCxPQUFPO1lBQ1YsT0FBT0gscURBQVlBLENBQUNJLElBQUksQ0FBQztnQkFBRUMsT0FBTztZQUFvQixHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDekU7UUFFQSw2QkFBNkI7UUFDN0IsTUFBTUMsY0FBY0MsMENBQW9DO1FBQ3hELE1BQU1HLGNBQWNILFFBQVFDLEdBQUcsQ0FBQ0cseUJBQXlCLElBQUlKLGtOQUF5QztRQUV0RyxJQUFJLENBQUNELGVBQWUsQ0FBQ0ksYUFBYTtZQUNoQyxnRkFBZ0Y7WUFDaEYsT0FBT1gscURBQVlBLENBQUNJLElBQUksQ0FBQztnQkFBRVUsU0FBUztZQUFpQyxHQUFHO2dCQUFFUixRQUFRO1lBQUk7UUFDeEY7UUFFQSxNQUFNUyxXQUFXaEIsbUVBQVlBLENBQUNRLGFBQWFJO1FBRTNDLGdDQUFnQztRQUNoQyxNQUFNLEVBQUVLLE1BQU1DLFlBQVksRUFBRSxHQUFHLE1BQU1GLFNBQ2xDRyxJQUFJLENBQUMsZUFDTEMsTUFBTSxDQUFDLFNBQ1BDLEVBQUUsQ0FBQyxTQUFTakIsT0FDWmtCLE1BQU07UUFFVCxJQUFJSixjQUFjO1lBQ2hCLE9BQU9qQixxREFBWUEsQ0FBQ0ksSUFBSSxDQUFDO2dCQUFFQyxPQUFPO1lBQXFCLEdBQUc7Z0JBQUVDLFFBQVE7WUFBSTtRQUMxRTtRQUVBLHVCQUF1QjtRQUN2QixNQUFNUyxTQUFTRyxJQUFJLENBQUMsZUFBZUksTUFBTSxDQUFDO1lBQUM7Z0JBQUVuQjtZQUFNO1NBQUU7UUFFckQsT0FBT0gscURBQVlBLENBQUNJLElBQUksQ0FBQztZQUFFVSxTQUFTO1FBQTBCLEdBQUc7WUFBRVIsUUFBUTtRQUFJO0lBQ2pGLEVBQUUsT0FBT0QsT0FBTztRQUNkLE9BQU9MLHFEQUFZQSxDQUFDSSxJQUFJLENBQUM7WUFBRUMsT0FBTztRQUF3QixHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUM3RTtBQUNGIiwic291cmNlcyI6WyIvVXNlcnMvbWFjc29sdXRpb25zL0Rvd25sb2Fkcy9iYWNrIG5ldyAtIGF0eC9iYWNra3VwcHAgNDQ0NC9hdHgtcmVzZWFyY2gtcGVwdGlkZXMgKDEpL2FwcC9hcGkvc3Vic2NyaWJlL3JvdXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUNsaWVudCB9IGZyb20gJ0BzdXBhYmFzZS9zdXBhYmFzZS1qcyc7XG5pbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcXVlc3QpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IGVtYWlsIH0gPSBhd2FpdCByZXF1ZXN0Lmpzb24oKTtcblxuICAgIGlmICghZW1haWwpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnRW1haWwgaXMgcmVxdWlyZWQnIH0sIHsgc3RhdHVzOiA0MDAgfSk7XG4gICAgfVxuXG4gICAgLy8gSW5pdGlhbGl6ZSBTdXBhYmFzZSBjbGllbnRcbiAgICBjb25zdCBzdXBhYmFzZVVybCA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NVUEFCQVNFX1VSTDtcbiAgICBjb25zdCBzdXBhYmFzZUtleSA9IHByb2Nlc3MuZW52LlNVUEFCQVNFX1NFUlZJQ0VfUk9MRV9LRVkgfHwgcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU1VQQUJBU0VfQU5PTl9LRVk7XG4gICAgXG4gICAgaWYgKCFzdXBhYmFzZVVybCB8fCAhc3VwYWJhc2VLZXkpIHtcbiAgICAgIC8vIFJldHVybiBzdWNjZXNzIGluIGRldmVsb3BtZW50IGlmIERCIGlzIG5vdCBjb25uZWN0ZWQgeWV0LCBzbyBVSSBkb2Vzbid0IGJyZWFrXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBtZXNzYWdlOiAnU3Vic2NyaWJlZCBzdWNjZXNzZnVsbHkgKE1vY2spJyB9LCB7IHN0YXR1czogMjAwIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHN1cGFiYXNlID0gY3JlYXRlQ2xpZW50KHN1cGFiYXNlVXJsLCBzdXBhYmFzZUtleSk7XG5cbiAgICAvLyBDaGVjayBpZiBlbWFpbCBhbHJlYWR5IGV4aXN0c1xuICAgIGNvbnN0IHsgZGF0YTogZXhpc3RpbmdVc2VyIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oJ3N1YnNjcmliZXJzJykgXG4gICAgICAuc2VsZWN0KCdlbWFpbCcpXG4gICAgICAuZXEoJ2VtYWlsJywgZW1haWwpXG4gICAgICAuc2luZ2xlKCk7XG5cbiAgICBpZiAoZXhpc3RpbmdVc2VyKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ0FscmVhZHkgc3Vic2NyaWJlZCcgfSwgeyBzdGF0dXM6IDQwOSB9KTsgXG4gICAgfVxuXG4gICAgLy8gSW5zZXJ0IGludG8gZGF0YWJhc2VcbiAgICBhd2FpdCBzdXBhYmFzZS5mcm9tKCdzdWJzY3JpYmVycycpLmluc2VydChbeyBlbWFpbCB9XSk7XG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBtZXNzYWdlOiAnU3Vic2NyaWJlZCBzdWNjZXNzZnVsbHknIH0sIHsgc3RhdHVzOiAyMDAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdJbnRlcm5hbCBTZXJ2ZXIgRXJyb3InIH0sIHsgc3RhdHVzOiA1MDAgfSk7XG4gIH1cbn0iXSwibmFtZXMiOlsiY3JlYXRlQ2xpZW50IiwiTmV4dFJlc3BvbnNlIiwiUE9TVCIsInJlcXVlc3QiLCJlbWFpbCIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsInN1cGFiYXNlVXJsIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX1NVUEFCQVNFX1VSTCIsInN1cGFiYXNlS2V5IiwiU1VQQUJBU0VfU0VSVklDRV9ST0xFX0tFWSIsIk5FWFRfUFVCTElDX1NVUEFCQVNFX0FOT05fS0VZIiwibWVzc2FnZSIsInN1cGFiYXNlIiwiZGF0YSIsImV4aXN0aW5nVXNlciIsImZyb20iLCJzZWxlY3QiLCJlcSIsInNpbmdsZSIsImluc2VydCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/subscribe/route.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fsubscribe%2Froute&page=%2Fapi%2Fsubscribe%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsubscribe%2Froute.js&appDir=%2FUsers%2Fmacsolutions%2FDownloads%2Fback%20new%20-%20atx%2Fbackkuppp%204444%2Fatx-research-peptides%20(1)%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmacsolutions%2FDownloads%2Fback%20new%20-%20atx%2Fbackkuppp%204444%2Fatx-research-peptides%20(1)&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fsubscribe%2Froute&page=%2Fapi%2Fsubscribe%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsubscribe%2Froute.js&appDir=%2FUsers%2Fmacsolutions%2FDownloads%2Fback%20new%20-%20atx%2Fbackkuppp%204444%2Fatx-research-peptides%20(1)%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmacsolutions%2FDownloads%2Fback%20new%20-%20atx%2Fbackkuppp%204444%2Fatx-research-peptides%20(1)&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_macsolutions_Downloads_back_new_atx_backkuppp_4444_atx_research_peptides_1_app_api_subscribe_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/subscribe/route.js */ \"(rsc)/./app/api/subscribe/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/subscribe/route\",\n        pathname: \"/api/subscribe\",\n        filename: \"route\",\n        bundlePath: \"app/api/subscribe/route\"\n    },\n    resolvedPagePath: \"/Users/macsolutions/Downloads/back new - atx/backkuppp 4444/atx-research-peptides (1)/app/api/subscribe/route.js\",\n    nextConfigOutput,\n    userland: _Users_macsolutions_Downloads_back_new_atx_backkuppp_4444_atx_research_peptides_1_app_api_subscribe_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZzdWJzY3JpYmUlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnN1YnNjcmliZSUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnN1YnNjcmliZSUyRnJvdXRlLmpzJmFwcERpcj0lMkZVc2VycyUyRm1hY3NvbHV0aW9ucyUyRkRvd25sb2FkcyUyRmJhY2slMjBuZXclMjAtJTIwYXR4JTJGYmFja2t1cHBwJTIwNDQ0NCUyRmF0eC1yZXNlYXJjaC1wZXB0aWRlcyUyMCgxKSUyRmFwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9JTJGVXNlcnMlMkZtYWNzb2x1dGlvbnMlMkZEb3dubG9hZHMlMkZiYWNrJTIwbmV3JTIwLSUyMGF0eCUyRmJhY2trdXBwcCUyMDQ0NDQlMkZhdHgtcmVzZWFyY2gtcGVwdGlkZXMlMjAoMSkmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ2dFO0FBQzdJO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvbWFjc29sdXRpb25zL0Rvd25sb2Fkcy9iYWNrIG5ldyAtIGF0eC9iYWNra3VwcHAgNDQ0NC9hdHgtcmVzZWFyY2gtcGVwdGlkZXMgKDEpL2FwcC9hcGkvc3Vic2NyaWJlL3JvdXRlLmpzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9zdWJzY3JpYmUvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9zdWJzY3JpYmVcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3N1YnNjcmliZS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy9tYWNzb2x1dGlvbnMvRG93bmxvYWRzL2JhY2sgbmV3IC0gYXR4L2JhY2trdXBwcCA0NDQ0L2F0eC1yZXNlYXJjaC1wZXB0aWRlcyAoMSkvYXBwL2FwaS9zdWJzY3JpYmUvcm91dGUuanNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fsubscribe%2Froute&page=%2Fapi%2Fsubscribe%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsubscribe%2Froute.js&appDir=%2FUsers%2Fmacsolutions%2FDownloads%2Fback%20new%20-%20atx%2Fbackkuppp%204444%2Fatx-research-peptides%20(1)%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmacsolutions%2FDownloads%2Fback%20new%20-%20atx%2Fbackkuppp%204444%2Fatx-research-peptides%20(1)&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@opentelemetry","vendor-chunks/@supabase","vendor-chunks/tslib","vendor-chunks/iceberg-js"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fsubscribe%2Froute&page=%2Fapi%2Fsubscribe%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsubscribe%2Froute.js&appDir=%2FUsers%2Fmacsolutions%2FDownloads%2Fback%20new%20-%20atx%2Fbackkuppp%204444%2Fatx-research-peptides%20(1)%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmacsolutions%2FDownloads%2Fback%20new%20-%20atx%2Fbackkuppp%204444%2Fatx-research-peptides%20(1)&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();