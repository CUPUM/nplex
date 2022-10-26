# Stores

This directory contains the stores used for application-wide state management. When possible, singleton stores logically
attached to a component should be defined at the said component's `script context="module"` level.

To keep things tidy, organize this directory such that each store is defined in its own file, and grouping stores by
subjects of relevance or app sections should be done using prefixes in filenames, in a manner akin to the organizing
principle found in component directories.
