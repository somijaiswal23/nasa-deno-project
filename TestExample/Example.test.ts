/**
 * Deno includes:
 * 1. The test runner in the CLI.
 * 2. Assertions in the standard library.
 * 3. Built-in test fixtures with Deno.test().
 */

import { assertEquals, assertNotEquals } from "https://deno.land/std/testing/asserts.ts";

// Short hand notation of writing a test

Deno.test("short example test", () => {
    assertEquals("deno", "deno");
        assertNotEquals({
            runtime:"deno",
        }, {
            runtime: "node",
        });
})

// We can also pass in ignore to let the test know to ignore this test case for some reason.
// for eg: below test will only run if os is linux
 Deno.test({
    name: "example test",
    ignore: Deno.build.os === "linux",
    fn() {
        assertEquals("deno", "deno");
        assertNotEquals({
            runtime:"deno",
        }, {
            runtime: "node",
        });
    },
});

// sanitizeOps is the property used to let the API complete its request. By default its true. 
Deno.test({
    name: "ops leak",
    sanitizeOps: false,
    fn() {
        setTimeout(console.log, 10000);
    },
});

// sanitizeResources let to ignore the sanitiy check for resources.
// for eg: in below example we will get an error that file is not closed without using sanitizeResource as false.
Deno.test({
    name: "resource leak",
    sanitizeResources: false,
    async fn() {
        await Deno.open("./models/planets.ts");
    },
});