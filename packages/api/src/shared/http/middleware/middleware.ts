import express from 'express';

export interface Middleware {
  handle(): express.Handler
}