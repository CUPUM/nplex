# SQL commands

These files establish the database's structure and various data access constraints in a manner
specificially tied to Supabase's provided features.

Here's some information about what each command file contains, in prescribed order of execution.

## 0: clean.sql

This file is used during dev to return to a clean slate by removing objects in the proper order.

## 1: schema.sql

The schema file establishes the main elements of the db, namely the tables, their columns, and their initial content where applicable.

## 2: misc.sql

You will here find functions and triggers used to automate or facilitate various actions.

## 3: policies.sql

This file describes the row-level-access policies dictating data handling and access rights based on various criteria,
including the queries' auth token and the associated user's role.