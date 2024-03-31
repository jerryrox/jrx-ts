# jrx-ts

My personal Typescript library.

# Versions
## 0.2.0
### Changes
- Removed `EventActionT` and `EventActionTT`. Replaced with `EventAction<T1 = void, T2 = void>`.

## 0.1.2
Oops, been too long since last time I made a package 😂
### Changes
- Removed JrxUtils and just renamed individual utils class with Jrx prefix. This is just to make my life easier when creating variant libraries 🤷‍♂️

## 0.1.0
### New features
- Added encode/decode functions for submodels in ModelConverter.
### Changes
- Moved commonly used types to JrxTypes.
- Added tests for ModelConverter.
### Fixes
- Fixed ModelConverter.decodeMap not outputting the correct value.

## 0.0.1
Initial publication!