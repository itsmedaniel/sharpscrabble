﻿module Scrabble.Core.Agent

open System

type Agent(playerId:int) =
    let mutable myturn = false
    let mutable tiles = null //empty list of tiles for now?

    //2 players for now
type Player1() =
    inherit Agent(1)

type Player2() =
    inherit Agent(2)
