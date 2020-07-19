import * as log from "https://deno.land/std@0.61.0/log/mod.ts";
import { Application, send } from "https://deno.land/x/oak@v5.0.0/mod.ts";

const app = new Application();
const PORT = 8000;

app.use(async  (ctx, next) => {
    await next();
    const time = ctx.response.headers.get("X-Response-Time");
    log.info(`${ctx.request.method} ${ctx.request.url}: ${time}`);
});

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const delta = Date.now() - start;
    ctx.response.headers.set("X-Response-Time", `${delta}ms`)
});

app.use(async (ctx) => {
    const filePath = ctx.request.url.pathname;
    const fileWhitelist = [
        "/index.html",
        "/images/favicon.png",
        "/javascripts/script.js",
        "/stylesheets/style.css",
    ];
    if(fileWhitelist.includes(filePath)) {
        await send(ctx, filePath, {
            root: `${Deno.cwd()}/public`
        });
    }
}); 

app.use(async (ctx, next) => {
    ctx.response.body = `
    {___      {__       {_            {__ __           {_
    {_  {__   {__      {_ ___       {___   {__        {_  ___
    {__  {__  {__     {__ {___        {___           {_   {___
    {__   {__ {__    {___  {___          {___       {__    {___
    {__    {_ {__   {_______ {___         {___     {______  {___
    {__     {_ __  {__        {___ {__    {___    {__        {___
    {__       {__ {__           {___  {__ ___    {__          {___
                        Mission Control API`;

                        await next();
});

if(import.meta.main) {
    log.info(`Starting server on port ${PORT}...`)
    await app.listen({
        port: PORT,
    });
}
