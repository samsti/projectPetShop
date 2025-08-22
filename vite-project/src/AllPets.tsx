import {atom} from "jotai";
import type {Pet} from "./Pet.ts";

export const AllPetsAtom = atom<Pet[]>([]);