import {Router} from "https://deno.land/x/oak/mod.ts";
import * as planets from "./models/planets.ts";

const router = new Router();

router.get("/", (ctx) => {
    ctx.response.body = `
    {___      {__       {_            {__ __           {_
    {_  {__   {__      {_ ___       {___   {__        {_  ___
    {__  {__  {__     {__ {___        {___           {_   {___
    {__   {__ {__    {___  {___          {___       {__    {___
    {__    {_ {__   {_______ {___         {___     {______  {___
    {__     {_ __  {__        {___ {__    {___    {__        {___
    {__       {__ {__           {___  {__ ___    {__          {___
                        Mission Control API`;

});

router.get("/planets", (ctx) => {
    throw new Error("Sample Error");
    ctx.response.body = planets.getAlllPlanets();
})

export default router;