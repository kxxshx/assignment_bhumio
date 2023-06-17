--  Database Schema (Postgresql)
-- Queries to run after creating database
CREATE DATABASE mydb;
\c mydb; 
DROP TABLE IF EXISTS stocks;
CREATE TABLE stocks (
  "part" text PRIMARY KEY,
  "alt_part" text,
  "name" text,
  "brand" text,
  "model" text,
  "engine" text,
  "car" text,
  "location_a" text,
  "location_a_stock" bigint,
  "location_b" text,
  "location_b_stock" bigint,
  "unit" text,
  "rate" text,
  "value" bigint,
  "remarks" text
);