# SQL commands

These files establish the database's structure and various data access constraints in a manner
specificially tied to Supabase's provided features. The command files contain interdependent elements and need to be executed in the following prescribed order.

## Contents

### 0: clean.sql

(:warning: For dev usage only) Returns to a clean slate by dropping all specified objects in the proper order. Data will be lost.

### 1: schema.sql

Main schema file establishing the core elements of the db, namely the tables, their columns, and their initial content where applicable.

### 2: misc.sql

Functions and triggers used to automate or facilitate various actions and table data synchronizations.

### 3: policies.sql

Customization of `update` permissions (column/field-level) and definition of row-level-access policies dictating data handling and access rights based on various criteria,
including the querier's auth token and the associated user's role.

## Migrating

The files can either be be updated by hand or generated using a migration tool like `pgAdmin`to mirror modifications applied through Supabase's GUI.